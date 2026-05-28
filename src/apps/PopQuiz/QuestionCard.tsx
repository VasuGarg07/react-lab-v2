import { ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { Question } from './quiz.constants';
import { incrementScore, nextQuestion, resetQuiz } from '../../store/quizSlice';
import { useAppDispatch } from '../../store/useRedux';
import { toastService } from '@react-lab/shared';

interface QuestionProps {
    question: Question;
    options: string[];
    questionNumber: number;
    totalQuestions: number;
}

export default function QuestionCard({ question, options, questionNumber, totalQuestions }: QuestionProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string>('');

    const getSelectionState = (option: string) => {
        if (!selected) return '';
        if (selected === option && selected === question.correct_answer) return 'correct';
        if (selected === option && selected !== question.correct_answer) return 'wrong';
        if (option === question.correct_answer) return 'correct';
        return '';
    };

    const handleCheck = (option: string) => {
        if (selected) return;

        setSelected(option);
        if (option === question.correct_answer) {
            dispatch(incrementScore());
        }
    };

    const handleNext = () => {
        if (!selected) {
            toastService.error("Please select an option first");
            return;
        }

        if (questionNumber >= totalQuestions) {
            navigate('/quizzo/result');
        } else {
            dispatch(nextQuestion());
            setSelected('');
        }
    };

    const handleQuit = () => {
        dispatch(resetQuiz());
        navigate('/quizzo');
    };

    return (
        <div className="flex flex-col p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm w-full">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Question {questionNumber} of {totalQuestions}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 capitalize">
                    {question.difficulty}
                </span>
            </div>

            <div
                className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: question.question }}
            />

            <div className="grid grid-cols-2 gap-2 mb-4">
                {options.map((option, index) => {
                    const selectionState = getSelectionState(option);
                    return (
                        <button
                            key={`${option}-${index}`}
                            onClick={() => handleCheck(option)}
                            disabled={!!selected}
                            dangerouslySetInnerHTML={{ __html: option }}
                            className={`
                min-h-12 p-3 rounded-lg border font-medium text-sm transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-0
                disabled:cursor-not-allowed 
                ${selectionState === 'correct'
                                    ? 'bg-emerald-500 hover:bg-emerald-500 text-white border-emerald-500'
                                    : ''
                                }
                ${selectionState === 'wrong'
                                    ? 'bg-red-500 hover:bg-red-500 text-white border-red-500'
                                    : ''
                                }
                ${!selected
                                    ? 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 focus:ring-blue-500/30'
                                    : ''
                                }
              `}
                        />
                    );
                })}
            </div>

            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700 my-3"></div>

            <div className="flex gap-3">
                <button
                    onClick={handleQuit}
                    className="flex items-center justify-center gap-2 px-4 py-2 flex-1 bg-white dark:bg-neutral-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-lg border border-red-200 dark:border-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-0"
                >
                    <X size={18} />
                    <span>Quit</span>
                </button>

                <button
                    onClick={handleNext}
                    disabled={!selected}
                    className="flex items-center justify-center gap-2 px-4 py-2 flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 shadow-sm"
                >
                    <span>{questionNumber >= totalQuestions ? 'Finish' : 'Next'}</span>
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}