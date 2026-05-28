import { shuffleArray } from "@react-lab/shared";
import { useAppSelector } from "../../store/useRedux";
import QuestionCard from "./QuestionCard";
import { useState, useEffect } from "react";

export default function QuizBoard() {
    const { name, score, currentQuestion, quizConfig } = useAppSelector((state) => state.quiz);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    const questions = quizConfig?.questions || [];
    const currentQuestionData = questions[currentQuestion];

    useEffect(() => {
        if (currentQuestionData) {
            const options = shuffleArray([
                currentQuestionData.correct_answer,
                ...currentQuestionData.incorrect_answers,
            ]);
            setShuffledOptions(options);
        }
    }, [currentQuestionData]);

    if (!questions.length) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-center">
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        No questions available. Please start a new quiz.
                    </p>
                </div>
            </div>
        );
    }

    if (!currentQuestionData) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-center">
                    <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Loading question...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-full space-y-3">
            <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100">
                Welcome, {name}!
            </h2>

            <div className="flex flex-row flex-wrap justify-center gap-2">
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
                    Score: {score}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
                    {currentQuestionData.category}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
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
}