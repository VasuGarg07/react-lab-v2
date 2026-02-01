import type { Phase } from "../libs/engine";
import { formatTime } from "../libs/typings";

type HeaderProps = {
  phase: Phase;
  remainingSec: number;
  isIdle: boolean;
  onStart: () => void;
  onReset: () => void;
};

export function Header({
  phase,
  remainingSec,
  isIdle,
  onStart,
  onReset,
}: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      {/* Title and description */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Typing Master
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Click anywhere in the text area below and start typing to begin
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Timer */}
        <div className="rounded-xl bg-white dark:bg-slate-800 px-4 py-2.5 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">
            Time
          </div>
          <div className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">
            {formatTime(remainingSec)}
          </div>
        </div>

        {/* Paused indicator */}
        {phase === "running" && isIdle && (
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-sm font-medium text-amber-900 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800">
            ⏸ Paused
          </div>
        )}

        {/* Start button */}
        <button
          className="rounded-xl bg-slate-900 dark:bg-slate-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] transition-all duration-150 shadow-sm"
          disabled={phase !== "ready"}
          onClick={onStart}
        >
          {phase === "idle" ? "Loading..." : "Start Test"}
        </button>

        {/* Reset button */}
        <button
          className="rounded-xl bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 ring-1 ring-slate-900/5 dark:ring-white/10 active:scale-[0.97] transition-all duration-150 shadow-sm"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}