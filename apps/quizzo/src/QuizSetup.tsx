import { Award, ChevronDown, Dices, Grid3X3, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuiz } from './QuizContext';
import { QuizCategories } from './quiz.constants';
import { toastService } from '@react-lab/shared';
import { useQuizQuestions } from './useQuizQuestions';

const GameModes = ['easy', 'medium', 'hard'];

const fieldClass =
    'w-full pl-10 pr-4 py-2.5 rounded-lg text-sm appearance-none ' +
    'bg-violet-50 dark:bg-[#0f0e17] ' +
    'border border-violet-200 dark:border-[#2d2a3e] ' +
    'text-indigo-950 dark:text-violet-100 ' +
    'placeholder:text-violet-400 dark:placeholder:text-[#7c7a96] ' +
    'focus:outline-none focus:ring-2 focus:ring-game-accent/30 focus:border-game-accent ' +
    'transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

export default function QuizSetup() {
    const navigate = useNavigate();
    const { state, dispatch } = useQuiz();
    const name = state.name;

    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const { refetch, isLoading } = useQuizQuestions({ category, difficulty, enabled: false });

    const handleSubmit = async () => {
        if (!name.trim())  { toastService.error('Please enter your name'); return; }
        if (!difficulty)   { toastService.error('Please select a difficulty level'); return; }
        if (!category)     { toastService.error('Please select a category'); return; }
        try {
            const result = await refetch();
            if (result.isError || !result.data?.results?.length) {
                toastService.error(result.isError ? 'Failed to fetch questions. Try again.' : 'No questions found.');
                return;
            }
            dispatch({ type: 'SET_CONFIG', payload: { category, difficulty, questions: result.data.results } });
            navigate('/quizzo/play');
        } catch {
            toastService.error('Failed to fetch quiz questions. Please try again.');
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-violet-400 dark:text-[#7c7a96] mb-1">
                    Ready to play?
                </p>
                <h2 className="text-xl font-bold text-indigo-950 dark:text-violet-100">Quiz Setup</h2>
            </div>

            <div className="flex flex-col gap-3">
                <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 dark:text-[#7c7a96] pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        disabled={isLoading}
                        className={fieldClass}
                    />
                </div>

                <div className="relative">
                    <Award size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 dark:text-[#7c7a96] pointer-events-none z-10" />
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} disabled={isLoading} className={`${fieldClass} pr-9`}>
                        <option value="" disabled>Difficulty level</option>
                        {GameModes.map(mode => (
                            <option key={mode} value={mode}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 dark:text-[#7c7a96] pointer-events-none" />
                </div>

                <div className="relative">
                    <Grid3X3 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 dark:text-[#7c7a96] pointer-events-none z-10" />
                    <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={isLoading} className={`${fieldClass} pr-9`}>
                        <option value="" disabled>Select category</option>
                        {QuizCategories.map(cat => (
                            <option key={cat.value} value={cat.value.toString()}>{cat.category}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 dark:text-[#7c7a96] pointer-events-none" />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-game-accent hover:bg-violet-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <><div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Loading questions…</>
                ) : (
                    <><Dices size={16} /> Start Quiz</>
                )}
            </button>
        </div>
    );
}
