import QuestionCard from "@/apps/Quizzo/QuestionCard";
import { shuffleArray } from "@/shared/utilities";
import { useMemo } from "react";
import { useQuizStore } from './quizStore';

const Board = () => {
  const { name, score, currentQuestion, quizConfig } = useQuizStore();

  const questions = quizConfig?.questions || [];
  const currentQuestionData = questions[currentQuestion];

  // Memoize shuffled options to prevent re-shuffling on every render
  const shuffledOptions = useMemo(() => {
    if (!currentQuestionData) return [];

    return shuffleArray([
      currentQuestionData.correct_answer,
      ...currentQuestionData.incorrect_answers,
    ]);
  }, [currentQuestionData]);

  // Handle case where no questions are available
  if (!questions.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            No questions available. Please start a new quiz.
          </p>
        </div>
      </div>
    );
  }

  // Handle case where current question index is out of bounds
  if (!currentQuestionData) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <h2 className="text-xl capitalize text-neutral-800 dark:text-neutral-100">
        Welcome! {name}
      </h2>

      <div className="flex flex-row flex-wrap justify-center gap-2">
        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
          Score: {score}
        </span>
        <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full">
          {currentQuestionData.category}
        </span>
        <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
          {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <QuestionCard
        question={currentQuestionData}
        options={shuffledOptions}
        questionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
      />
    </div>
  );
};

export default Board;