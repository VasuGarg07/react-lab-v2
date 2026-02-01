// ============================================================================
// STATE MANAGEMENT - Typing Test Engine
// ============================================================================

export type Phase = "idle" | "ready" | "running" | "finished";

export type TypingState = {
  phase: Phase;
  expected: string;
  lines: string[];
  lineStarts: number[];
  cursor: number;
  typed: string[];
  errors: number;
  lockAfterError: boolean;
  activeLine: number;
  durationSec: number;
  remainingSec: number;
  startedAtMs: number | null;
  isIdle: boolean;
  idleSinceMs: number | null;
  idleAccumMs: number;
  lastTypeAtMs: number | null;
  finishedAtMs: number | null;
};

export type InitPayload = {
  expected: string;
  lines: string[];
  lineStarts: number[];
  durationSec?: number;
};

export type Action =
  | { type: "INIT"; payload: InitPayload }
  | { type: "START"; nowMs: number }
  | { type: "TICK"; nowMs: number }
  | { type: "TYPE_CHAR"; ch: string; nowMs: number }
  | { type: "BACKSPACE"; nowMs: number }
  | { type: "RESET" };

export function initialTypingState(): TypingState {
  return {
    phase: "idle",
    expected: "",
    lines: [],
    lineStarts: [],
    cursor: 0,
    typed: [],
    errors: 0,
    lockAfterError: false,
    activeLine: 0,
    durationSec: 300,
    remainingSec: 300,
    startedAtMs: null,
    isIdle: false,
    idleSinceMs: null,
    idleAccumMs: 0,
    lastTypeAtMs: null,
    finishedAtMs: null,
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Binary search to find which line the cursor is on
function computeActiveLine(cursor: number, lineStarts: number[]): number {
  if (lineStarts.length === 0) return 0;
  if (cursor < lineStarts[0]) return 0;
  
  let lo = 0;
  let hi = lineStarts.length - 1;
  let result = 0;
  
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1; // Unsigned right shift for performance
    if (lineStarts[mid] <= cursor) {
      result = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  
  return result;
}

// Calculate effective elapsed time excluding idle periods
function effectiveElapsedMs(state: TypingState, nowMs: number): number {
  if (state.startedAtMs === null) return 0;
  
  const rawElapsed = nowMs - state.startedAtMs;
  const currentIdleTime = state.isIdle && state.idleSinceMs 
    ? nowMs - state.idleSinceMs 
    : 0;
  const totalPausedTime = state.idleAccumMs + currentIdleTime;
  
  return Math.max(0, rawElapsed - totalPausedTime);
}

// ============================================================================
// REDUCER - Main State Machine
// ============================================================================

export function reducer(state: TypingState, action: Action): TypingState {
  switch (action.type) {
    case "INIT": {
      const durationSec = action.payload.durationSec ?? 300;
      return {
        ...initialTypingState(),
        phase: "ready",
        expected: action.payload.expected,
        lines: action.payload.lines,
        lineStarts: action.payload.lineStarts,
        durationSec,
        remainingSec: durationSec,
      };
    }

    case "RESET":
      return initialTypingState();

    case "START": {
      if (state.phase !== "ready") return state;
      return {
        ...state,
        phase: "running",
        startedAtMs: action.nowMs,
        lastTypeAtMs: action.nowMs,
      };
    }

    case "TICK": {
      if (state.phase !== "running" || state.startedAtMs === null) return state;

      const lastActivityMs = state.lastTypeAtMs ?? state.startedAtMs;
      const idleThresholdMs = 3000;
      const shouldIdle = !state.isIdle && (action.nowMs - lastActivityMs >= idleThresholdMs);

      let next = state;
      if (shouldIdle) {
        next = { ...next, isIdle: true, idleSinceMs: action.nowMs };
      }

      const elapsedSec = Math.floor(effectiveElapsedMs(next, action.nowMs) / 1000);
      const remaining = clamp(next.durationSec - elapsedSec, 0, next.durationSec);

      if (remaining === 0) {
        return { 
          ...next, 
          remainingSec: 0, 
          phase: "finished", 
          finishedAtMs: action.nowMs, 
          isIdle: false 
        };
      }
      
      return { ...next, remainingSec: remaining };
    }

    case "TYPE_CHAR": {
      if (state.phase === "ready" || state.phase !== "running") return state;

      // Resume from idle
      let next = state;
      if (next.isIdle && next.idleSinceMs !== null) {
        next = {
          ...next,
          isIdle: false,
          idleAccumMs: next.idleAccumMs + (action.nowMs - next.idleSinceMs),
          idleSinceMs: null,
        };
      }

      const i = next.cursor;
      if (i >= next.expected.length) {
        return { ...next, phase: "finished", finishedAtMs: action.nowMs };
      }

      const expectedCh = next.expected[i];
      const ch = action.ch;

      // Lock mechanism: prevent consecutive errors
      if (next.lockAfterError && ch !== expectedCh) {
        return { ...next, lastTypeAtMs: action.nowMs };
      }

      const isWrong = ch !== expectedCh;
      const newTyped = [...next.typed];
      newTyped[i] = ch;

      const newCursor = i + 1;
      const newErrors = next.errors + (isWrong ? 1 : 0);
      const lockAfterError = isWrong;
      const activeLine = computeActiveLine(newCursor, next.lineStarts);
      const finished = newCursor >= next.expected.length;

      return {
        ...next,
        typed: newTyped,
        cursor: newCursor,
        errors: newErrors,
        lockAfterError,
        activeLine,
        phase: finished ? "finished" : next.phase,
        finishedAtMs: finished ? action.nowMs : next.finishedAtMs,
        lastTypeAtMs: action.nowMs,
      };
    }

    case "BACKSPACE": {
      if (state.phase !== "running") return state;

      // Resume from idle
      let next = state;
      if (next.isIdle && next.idleSinceMs !== null) {
        next = {
          ...next,
          isIdle: false,
          idleAccumMs: next.idleAccumMs + (action.nowMs - next.idleSinceMs),
          idleSinceMs: null,
        };
      }

      if (next.cursor === 0) return { ...next, lastTypeAtMs: action.nowMs };

      const newCursor = next.cursor - 1;
      const newTyped = [...next.typed];
      newTyped[newCursor] = "";

      // Check if previous character is an error (for lock mechanism)
      const prevIdx = newCursor - 1;
      const lockAfterError =
        prevIdx >= 0 && 
        newTyped[prevIdx] !== "" && 
        newTyped[prevIdx] !== next.expected[prevIdx];

      const activeLine = computeActiveLine(newCursor, next.lineStarts);

      return {
        ...next,
        cursor: newCursor,
        typed: newTyped,
        lockAfterError,
        activeLine,
        lastTypeAtMs: action.nowMs,
      };
    }

    default:
      return state;
  }
}