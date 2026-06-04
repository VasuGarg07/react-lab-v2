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
            navigate('/quizzo/result');
        } else {
            dispatch({ type: 'NEXT_QUESTION' });
            setSelected('');
        }
    };

    const handleQuit = () => {
        dispatch({ type: 'RESET' });
        navigate('/quizzo');
    };

    const OPTION_LABELS = ['A', 'B', 'C', 'D'];

    const optionClass = (state: string) => {
        const base = 'min-h-11 px-3 py-2 rounded-lg border text-sm font-medium text-left focus:outline-none disabled:cursor-not-allowed';
        if (state === 'correct') return `${base} bg-emerald-50 dark:bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-400`;
        if (state === 'wrong')   return `${base} bg-red-50 dark:bg-red-500/15 border-red-500 text-red-700 dark:text-red-400`;
        if (state === 'dim')     return `${base} bg-violet-50 dark:bg-[#0f0e17] border-violet-100 dark:border-[#2d2a3e]/50 text-violet-300 dark:text-[#7c7a96] opacity-50`;
        return `${base} bg-violet-50 dark:bg-[#0f0e17] border-violet-200 dark:border-[#2d2a3e] text-indigo-900 dark:text-violet-100 hover:border-game-accent hover:text-game-accent dark:hover:text-game-bright`;
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <div>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-violet-400 dark:text-[#7c7a96] mb-1.5">
                    {question.difficulty}
                </span>
                <p className="text-sm leading-relaxed text-indigo-900 dark:text-violet-100"
                    dangerouslySetInnerHTML={{ __html: question.question }} />
            </div>

            <div className="grid grid-cols-2 gap-2">
                {options.map((option, index) => (
                    <button
                        key={`${option}-${index}`}
                        onClick={() => handleCheck(option)}
                        disabled={!!selected}
                        className={optionClass(getState(option))}
                    >
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 mr-1.5">
                            {OPTION_LABELS[index]}
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: option }} />
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleQuit}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-red-300 dark:border-red-400/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                    <X size={15} /> Quit
                </button>
                <button
                    onClick={handleNext}
                    disabled={!selected}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold bg-game-accent hover:bg-violet-600 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    {questionNumber >= totalQuestions ? 'Finish' : 'Next'}
                    <ChevronRight size={15} />
                </button>
            </div>
        </div>
    );
}
