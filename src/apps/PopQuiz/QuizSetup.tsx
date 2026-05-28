import { Award, Dices, Grid3X3, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/useRedux';
import { QuizCategories } from './quiz.constants';
import { toastService } from '../../shared/toastr';
import { setName, setQuizConfig } from '../../store/quizSlice';
import { Select } from '@react-lab/ui';
import { GameMode } from '../../shared/constants';
import { useQuizQuestions } from './useQuizQuestions';

export default function QuizSetup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.quiz.name);

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const { refetch, isLoading } = useQuizQuestions({
        category,
        difficulty,
        enabled: false,
    });

    const difficultyOptions = Object.values(GameMode).map(mode => ({
        value: mode,
        label: mode.charAt(0).toUpperCase() + mode.slice(1)
    }));

    const categoryOptions = QuizCategories.map(cat => ({
        value: cat.value.toString(),
        label: cat.category
    }));

    const handleSubmit = async () => {
        if (!name.trim()) {
            toastService.error("Please enter your name");
            return;
        }

        if (!difficulty) {
            toastService.error("Please select a difficulty level");
            return;
        }

        if (!category) {
            toastService.error("Please select a category");
            return;
        }

        try {
            const result = await refetch();

            if (result.isError) {
                toastService.error("Failed to fetch quiz questions. Please try again.");
                return;
            }

            if (!result.data?.results?.length) {
                toastService.error("No questions found for this configuration");
                return;
            }

            dispatch(setQuizConfig({
                category,
                difficulty,
                questions: result.data.results
            }));

            navigate('/quizzo/play');
        } catch (error) {
            toastService.error("Failed to fetch quiz questions. Please try again.");
        }
    };

    const handleNameChange = (value: string) => {
        dispatch(setName(value));
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                Quiz Settings
            </h2>

            <div className="w-full max-w-sm space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
                        <User size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Player Name"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed placeholder-neutral-400 dark:placeholder-neutral-500"
                    />
                </div>

                <Select
                    options={difficultyOptions}
                    value={difficulty}
                    onChange={setDifficulty}
                    placeholder="Choose Difficulty Level"
                    icon={<Award size={18} className="text-neutral-500 dark:text-neutral-400" />}
                    disabled={isLoading}
                    required
                />

                <Select
                    options={categoryOptions}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select the Category"
                    icon={<Grid3X3 size={18} className="text-neutral-500 dark:text-neutral-400" />}
                    disabled={isLoading}
                    required
                />

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:ring-offset-0"
                >
                    {isLoading ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <Dices size={18} />
                            <span>Begin!</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}