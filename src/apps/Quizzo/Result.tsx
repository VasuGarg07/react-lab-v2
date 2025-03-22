import React from "react";
import { useQuizContext } from "@/apps/Quizzo/Quiz.context";

const Result: React.FC = () => {
  const { name, score, resetGame } = useQuizContext();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Quiz Complete!
        </h2>
        <div className="inline-block bg-amber-500 dark:bg-yellow-500 rounded-xl p-6 shadow-md">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-white mb-1 animate-fadeIn">
              {score}
            </div>
            <div className="text-sm text-gray-100">
              Final Score
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-500 dark:bg-cyan-600 transition-all duration-1000 ease-out"
          style={{ width: `${(score / 10) * 100}%` }} // Assuming max score is 10
        ></div>
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-lg shadow transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
      >
        Try Again, {name}
      </button>
    </div>
  );
};

export default Result;