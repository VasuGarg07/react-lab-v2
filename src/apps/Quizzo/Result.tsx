import { useQuizStore } from './quizStore';

const Result = () => {
  const { name, score, quizConfig, resetGame } = useQuizStore();

  const totalQuestions = quizConfig?.questions?.length || 10;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 60) return "Good effort! 👍";
    if (percentage >= 50) return "Not bad! 📚";
    return "Keep trying! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "bg-green-500 dark:bg-green-600";
    if (percentage >= 60) return "bg-amber-500 dark:bg-yellow-500";
    return "bg-red-500 dark:bg-red-600";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Quiz Complete!
        </h2>

        <div className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
          {getScoreMessage()}
        </div>

        <div className={`inline-block ${getScoreColor()} rounded-xl px-6 py-3 shadow-md`}>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-white mb-1">
              {score}/{totalQuestions}
            </div>
            <div className="text-sm text-neutral-100 mb-2">
              Final Score
            </div>
            <div className="text-lg font-semibold text-white">
              {percentage}%
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs bg-neutral-100 dark:bg-neutral-700 h-3 rounded-full overflow-hidden">
        <div
          className={`h-full ${getScoreColor()} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-lg shadow transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
      >
        {name ? `Try Again, ${name}` : 'Play Again'}
      </button>
    </div>
  );
};

export default Result;