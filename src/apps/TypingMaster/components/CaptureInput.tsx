import { useEffect, useRef } from "react";

type CaptureInputProps = {
  enabled: boolean;
  focusKey?: number;
  onStart: (nowMs: number) => void;
  onChar: (ch: string, nowMs: number) => void;
  onBackspace: (nowMs: number) => void;
};

export function CaptureInput({
  enabled,
  focusKey,
  onStart,
  onChar,
  onBackspace,
}: CaptureInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Focus on mount and when enabled changes
  useEffect(() => {
    if (enabled) {
      textareaRef.current?.focus();
    }
  }, [enabled]);

  // Focus when focusKey changes (for reset/restart)
  useEffect(() => {
    if (enabled) {
      textareaRef.current?.focus();
    }
  }, [focusKey, enabled]);

  const handleFocus = () => {
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!enabled) return;

    const now = Date.now();
    const key = e.key.toLowerCase();

    // Block paste shortcuts
    if ((e.ctrlKey || e.metaKey) && key === "v") {
      e.preventDefault();
      return;
    }
    
    if (e.shiftKey && key === "insert") {
      e.preventDefault();
      return;
    }

    // Notify start on first meaningful key
    onStart(now);

    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      onBackspace(now);
      return;
    }

    // Ignore modifier keys and multi-character keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;

    e.preventDefault();
    onChar(e.key, now);
  };

  return (
    <div onClick={handleFocus} className="relative cursor-text">
      <textarea
        ref={textareaRef}
        className="absolute left-0 top-0 h-0 w-0 opacity-0 pointer-events-none"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        tabIndex={enabled ? 0 : -1}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onKeyDown={handleKeyDown}
        aria-label="Typing test input"
      />
    </div>
  );
}