import { useEffect, useState, type RefObject } from "react";
import { PASSAGES } from "../data/passages";

// ============================================================================
// TEXT WRAPPING
// ============================================================================

export function wrapTextToLines(text: string, charsPerLine: number): string[] {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\n/g, " ");
  const tokens = normalized.split(/(\s+)/);

  const lines: string[] = [];
  let currentLine = "";

  for (const token of tokens) {
    // Handle extremely long tokens (rare edge case)
    if (token.length > charsPerLine) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      // Break long token into chunks
      for (let i = 0; i < token.length; i += charsPerLine) {
        lines.push(token.slice(i, i + charsPerLine));
      }
      continue;
    }

    // Try to fit token on current line
    if ((currentLine + token).length <= charsPerLine) {
      currentLine += token;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = token.trimStart(); // Remove leading whitespace
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

export function computeLineStarts(lines: string[]): number[] {
  const starts: number[] = [];
  let position = 0;
  
  for (const line of lines) {
    starts.push(position);
    position += line.length;
  }
  
  return starts;
}

// ============================================================================
// TEXT STREAM GENERATION
// ============================================================================

function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Start mid-paragraph at word boundary
function randomStartSlice(text: string, minRemaining = 600): string {
  if (text.length <= minRemaining) return text;

  const maxStart = text.length - minRemaining;
  let start = Math.floor(Math.random() * maxStart);

  // Move to next word boundary
  while (start < text.length && text[start] !== " ") {
    start++;
  }

  return text.slice(Math.min(start + 1, text.length));
}

function joinText(a: string, b: string): string {
  if (!a) return b;

  const lastChar = a[a.length - 1];
  const firstChar = b[0];

  // Add space after sentence-ending punctuation
  if (lastChar === "." || lastChar === "?" || lastChar === "!") {
    return a + " " + b;
  }

  // Already has spacing
  if (lastChar === " " || firstChar === " ") {
    return a + b;
  }

  // Default: add single space
  return a + " " + b;
}

export function generateTypingStream(targetChars = 4800): string {
  let prevId: string | null = null;

  const pickPassage = (): string => {
    let passage = randomItem(PASSAGES);
    
    // Avoid same passage twice in a row
    if (PASSAGES.length > 1) {
      while (passage.id === prevId) {
        passage = randomItem(PASSAGES);
      }
    }
    
    prevId = passage.id;
    return normalizeText(passage.text);
  };

  let buffer = randomStartSlice(pickPassage());

  while (buffer.length < targetChars) {
    buffer = joinText(buffer, pickPassage());
  }

  return buffer;
}

// ============================================================================
// METRICS CALCULATION
// ============================================================================

export function calcFinalMetrics(
  expected: string,
  typed: string[],
  durationSec: number,
  errors: number
) {
  const typedCount = typed.filter(Boolean).length;
  const correctCount = typed.reduce((acc, ch, i) => {
    return ch && ch === expected[i] ? acc + 1 : acc;
  }, 0);

  // WPM calculation: (characters / 5) / minutes
  const minutes = Math.max(durationSec / 60, 1 / 60);
  const grossWpm = Math.max(0, Math.floor(typedCount / 5 / minutes));
  
  // Accuracy percentage
  const accuracy = typedCount === 0 
    ? 100 
    : Math.round((correctCount / typedCount) * 100);

  return { wpm: grossWpm, accuracy, errors };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

export function useCharsPerLine(
  containerRef: RefObject<HTMLDivElement | null>
): number {
  const [charsPerLine, setCharsPerLine] = useState(50);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create measurement probe
    const probe = document.createElement("span");
    probe.textContent = "0";
    probe.style.cssText = `
      visibility: hidden;
      position: absolute;
      white-space: nowrap;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 20px;
    `;
    document.body.appendChild(probe);

    const computeCharsPerLine = () => {
      const containerWidth = container.getBoundingClientRect().width;
      const charWidth = probe.getBoundingClientRect().width || 12;
      
      // Account for padding and ensure minimum width
      const padding = 88;
      const usableWidth = Math.max(240, containerWidth - padding);
      const chars = Math.max(20, Math.floor(usableWidth / charWidth));
      
      setCharsPerLine(chars);
    };

    computeCharsPerLine();

    const resizeObserver = new ResizeObserver(computeCharsPerLine);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      document.body.removeChild(probe);
    };
  }, [containerRef]);

  return charsPerLine;
}