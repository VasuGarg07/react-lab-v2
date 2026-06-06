import { ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuiz } from './QuizContext';
import { QuizCategories } from './quiz.constants';
import { toastService } from '@react-lab/shared';
import { useQuizQuestions } from './useQuizQuestions';

const GameModes = ['easy', 'medium', 'hard'];

const fieldClass =
    'w-full px-3 py-2.5 rounded-lg text-sm appearance-none ' +
    'bg-mist/50 border border-frost ' +
    'text-deep placeholder:text-deep/40 ' +
    'focus:outline-none focus:ring-2 focus:ring-cerulean/30 focus:border-cerulean ' +
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
            navigate('/play');
        } catch {
            toastService.error('Failed to fetch quiz questions. Please try again.');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cerulean/70 mb-1">
                    Let's play
                </p>
                <h2 className="text-2xl font-bold text-deep tracking-tight">Set up your quiz</h2>
            </div>

            <div className="flex flex-col gap-3">
                <div>
                    <label className="block text-xs font-semibold text-deep/50 uppercase tracking-wider mb-1.5">Your name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        disabled={isLoading}
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-deep/50 uppercase tracking-wider mb-1.5">Difficulty</label>
                    <div className="relative">
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} disabled={isLoading} className={`${fieldClass} pr-9`}>
                            <option value="" disabled>Select difficulty</option>
                            {GameModes.map(mode => (
                                <option key={mode} value={mode}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-deep/40 pointer-events-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-deep/50 uppercase tracking-wider mb-1.5">Category</label>
                    <div className="relative">
                        <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={isLoading} className={`${fieldClass} pr-9`}>
                            <option value="" disabled>Select category</option>
                            {QuizCategories.map(cat => (
                                <option key={cat.value} value={cat.value.toString()}>{cat.category}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-deep/40 pointer-events-none" />
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-cerulean hover:bg-deep text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <><Loader2 size={15} className="animate-spin" /> Loading questions</>
                ) : (
                    'Start Quiz'
                )}
            </button>
        </div>
    );
}
