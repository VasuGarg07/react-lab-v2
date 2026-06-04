import { shuffleArray } from '@react-lab/shared';
import { useQuiz } from './QuizContext';
import QuestionCard from './QuestionCard';
import { useState, useEffect } from 'react';

export default function QuizBoard() {
    const { state } = useQuiz();
    const { name, score, currentQuestion, quizConfig } = state;
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    const questions = quizConfig?.questions || [];
    const currentQuestionData = questions[currentQuestion];

    useEffect(() => {
        if (currentQuestionData) {
            setShuffledOptions(shuffleArray([
                currentQuestionData.correct_answer,
                ...currentQuestionData.incorrect_answers,
            ]));
        }
    }, [currentQuestionData]);

    if (!questions.length) {
        return <p className="text-sm text-violet-400 dark:text-[#7c7a96] text-center py-8">No questions available. Please start a new quiz.</p>;
    }

    if (!currentQuestionData) {
        return (
            <div className="flex flex-col items-center gap-2 py-8">
                <div className="h-7 w-7 border-2 border-game-bright border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-violet-400 dark:text-[#7c7a96]">Loading question…</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-indigo-950 dark:text-violet-100">{name}</span>
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-game-accent/15 text-game-accent dark:text-game-bright border border-game-accent/25">
                        {score} pts
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-violet-100 dark:bg-[#2d2a3e] text-violet-500 dark:text-[#7c7a96]">
                        {currentQuestion + 1} / {questions.length}
                    </span>
                </div>
            </div>

            <div className="h-1 w-full bg-violet-100 dark:bg-[#2d2a3e] rounded-full overflow-hidden">
                <div
                    className="h-full bg-game-accent rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
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
