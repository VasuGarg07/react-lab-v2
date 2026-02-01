import { useEffect, useReducer, useRef, useState } from "react";
import { initialTypingState, reducer } from "./libs/engine";
import {
  generateTypingStream,
  wrapTextToLines,
  computeLineStarts,
  useCharsPerLine,
  calcFinalMetrics,
} from "./libs/typings";
import { Header } from "./components/Header";
import { TextWindow } from "./components/TextWindow";
import { CaptureInput } from "./components/CaptureInput";
import { ResultsModal } from "./components/ResultsModal";
import { MobileWarning } from "./components/MobileWarning";

export default function TypingMaster() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const charsPerLine = useCharsPerLine(containerRef);
  
  const [state, dispatch] = useReducer(reducer, undefined, initialTypingState);
  const [focusKey, setFocusKey] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ wpm: 0, accuracy: 0, errors: 0 });

  // Initialize new typing stream
  const initNewStream = () => {
    const text = generateTypingStream(5200);
    const lines = wrapTextToLines(text, charsPerLine);
    const lineStarts = computeLineStarts(lines);

    dispatch({
      type: "INIT",
      payload: {
        expected: lines.join(""),
        lines,
        lineStarts,
        durationSec: 300,
      },
    });
  };

  // Initialize on mount and when charsPerLine changes
  useEffect(() => {
    initNewStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charsPerLine]);

  // Timer tick
  useEffect(() => {
    if (state.phase !== "running") return;
    
    const intervalId = setInterval(() => {
      dispatch({ type: "TICK", nowMs: Date.now() });
    }, 200);

    return () => clearInterval(intervalId);
  }, [state.phase]);

  // Handle test completion
  useEffect(() => {
    if (state.phase !== "finished") return;

    const metrics = calcFinalMetrics(
      state.expected,
      state.typed,
      state.durationSec,
      state.errors
    );

    setResults(metrics);
    setShowResults(true);
  }, [state.phase, state.expected, state.typed, state.durationSec, state.errors]);

  // Handlers
  const handleStart = () => {
    dispatch({ type: "START", nowMs: Date.now() });
    setFocusKey((k) => k + 1);
  };

  const handleReset = () => {
    initNewStream();
    setFocusKey((k) => k + 1);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    initNewStream();
    setFocusKey((k) => k + 1);
  };

  const enabled = state.phase === "ready" || state.phase === "running";

  return (
    <>
      <MobileWarning />
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12" ref={containerRef}>
          <Header
            phase={state.phase}
            remainingSec={state.remainingSec}
            isIdle={state.isIdle}
            onStart={handleStart}
            onReset={handleReset}
          />

          {/* Main typing area */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-lg ring-1 ring-slate-900/5 dark:ring-white/10 transition-colors duration-200">
            <CaptureInput
              enabled={enabled}
              focusKey={focusKey}
              onStart={(nowMs) => {
                if (state.phase === "ready") {
                  dispatch({ type: "START", nowMs });
                }
              }}
              onChar={(ch, nowMs) => dispatch({ type: "TYPE_CHAR", ch, nowMs })}
              onBackspace={(nowMs) => dispatch({ type: "BACKSPACE", nowMs })}
            />

            <TextWindow
              lines={state.lines}
              lineStarts={state.lineStarts}
              activeLine={state.activeLine}
              cursor={state.cursor}
              typed={state.typed}
              expected={state.expected}
              windowSize={7}
            />

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                💡 <span className="font-medium">Tip:</span> Focus on accuracy first—speed will follow naturally
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Test pauses automatically after 3 seconds of inactivity
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            <ResultsModal
              wpm={results.wpm}
              accuracy={results.accuracy}
              errors={results.errors}
              onClose={handleCloseResults}
            />
          </div>
        </div>
      )}
    </>
  );
}