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
        return <p className="text-sm text-deep/50 text-center py-8">No questions available. Please start a new quiz.</p>;
    }

    if (!currentQuestionData) {
        return (
            <div className="flex flex-col items-center gap-2 py-8">
                <div className="h-6 w-6 border-2 border-cerulean border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-deep/50">Loading question…</p>
            </div>
        );
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="flex flex-col gap-4 w-full">

            {/* Player row */}
            <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-deep">{name}</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-cerulean">
                        {score} pts
                    </span>
                    <span className="text-xs text-deep/40 tabular-nums">
                        {currentQuestion + 1} / {questions.length}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-0.5 w-full bg-mist rounded-full overflow-hidden">
                <div
                    className="h-full bg-cerulean rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
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
