type ResultsModalProps = {
  wpm: number;
  accuracy: number;
  errors: number;
  onClose: () => void;
};

export function ResultsModal({
  wpm,
  accuracy,
  errors,
  onClose,
}: ResultsModalProps) {
  return (
    <div className="animate-in fade-in duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Test Complete!
        </h2>
        <div className="text-3xl">🎉</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* WPM */}
        <div className="rounded-xl bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 text-center ring-1 ring-blue-200/50 dark:ring-blue-700/50">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
            WPM
          </div>
          <div className="text-3xl font-bold tabular-nums text-blue-900 dark:text-blue-100">
            {wpm}
          </div>
        </div>

        {/* Accuracy */}
        <div className="rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 text-center ring-1 ring-emerald-200/50 dark:ring-emerald-700/50">
          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
            Accuracy
          </div>
          <div className="text-3xl font-bold tabular-nums text-emerald-900 dark:text-emerald-100">
            {accuracy}%
          </div>
        </div>

        {/* Errors */}
        <div className="rounded-xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800/20 dark:to-slate-700/20 p-4 text-center ring-1 ring-slate-200/50 dark:ring-slate-600/50">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
            Errors
          </div>
          <div className="text-3xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {errors}
          </div>
        </div>
      </div>

      {/* Performance message */}
      <div className="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-center text-slate-600 dark:text-slate-300">
          {accuracy >= 95 && wpm >= 60 && "🌟 Excellent work! You're a typing master!"}
          {accuracy >= 95 && wpm < 60 && "✨ Great accuracy! Keep practicing to boost your speed."}
          {accuracy >= 85 && accuracy < 95 && "👍 Good job! Focus on accuracy for better results."}
          {accuracy < 85 && "💪 Keep practicing! Slow down for better accuracy."}
        </p>
      </div>

      <button
        className="w-full rounded-xl bg-slate-900 dark:bg-slate-700 px-4 py-3 text-white font-medium hover:bg-slate-800 dark:hover:bg-slate-600 active:scale-[0.98] transition-all duration-150"
        onClick={onClose}
      >
        Try Again
      </button>
    </div>
  );
}