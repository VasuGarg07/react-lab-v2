import { ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { Question } from './quiz.constants';
import { useQuiz } from './QuizContext';
import { toastService } from '@react-lab/shared';

interface QuestionProps {
    question: Question;
    options: string[];
    questionNumber: number;
    totalQuestions: number;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuestionCard({ question, options, questionNumber, totalQuestions }: QuestionProps) {
    const navigate = useNavigate();
    const { dispatch } = useQuiz();
    const [selected, setSelected] = useState('');

    const getState = (option: string) => {
        if (!selected) return 'idle';
        if (option === question.correct_answer) return 'correct';
        if (option === selected) return 'wrong';
        return 'dim';
    };

    const handleCheck = (option: string) => {
        if (selected) return;
        setSelected(option);
        if (option === question.correct_answer) dispatch({ type: 'INCREMENT_SCORE' });
    };

    const handleNext = () => {
        if (!selected) { toastService.error('Please select an option first'); return; }
        if (questionNumber >= totalQuestions) {
            navigate('/result');
        } else {
            dispatch({ type: 'NEXT_QUESTION' });
            setSelected('');
        }
    };

    const handleQuit = () => {
        dispatch({ type: 'RESET' });
        navigate('/');
    };

    const optionClass = (state: string) => {
        const base = 'w-full px-4 py-2.5 rounded-lg border text-sm text-left focus:outline-none disabled:cursor-not-allowed transition-colors flex items-start gap-3';
        if (state === 'correct') return `${base} bg-teal-50 border-teal-500 text-teal-800`;
        if (state === 'wrong')   return `${base} bg-red-50 border-red-400 text-red-700`;
        if (state === 'dim')     return `${base} border-frost/40 text-deep/25 bg-transparent`;
        return `${base} border-frost bg-mist/30 text-deep hover:border-cerulean hover:bg-cerulean/5`;
    };

    return (
        <div className="flex flex-col gap-3 w-full">

            {/* Question */}
            <div>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-cerulean/60 mb-1.5">
                    {question.difficulty}
                </span>
                <p className="text-sm leading-relaxed text-deep"
                    dangerouslySetInnerHTML={{ __html: question.question }} />
            </div>

            {/* Options — stacked full-width */}
            <div className="flex flex-col gap-1.5">
                {options.map((option, index) => (
                    <button
                        key={`${option}-${index}`}
                        onClick={() => handleCheck(option)}
                        disabled={!!selected}
                        className={optionClass(getState(option))}
                    >
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider opacity-50 mt-0.5 w-4">
                            {OPTION_LABELS[index]}
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: option }} />
                    </button>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
                <button
                    onClick={handleQuit}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-deep/15 text-deep/50 hover:border-red-300 hover:text-red-500 transition-colors"
                >
                    <X size={14} />
                    Quit
                </button>
                <button
                    onClick={handleNext}
                    disabled={!selected}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold bg-cerulean hover:bg-deep text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    {questionNumber >= totalQuestions ? 'Finish' : 'Next'}
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}
