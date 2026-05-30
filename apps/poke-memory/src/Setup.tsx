import { useState } from 'react';
import { Gamepad2, Zap, Puzzle, Skull, User } from 'lucide-react';
import { setName, setDifficulty, setCards, setGameState } from './store/pokeMemorySlice';
import { useAppDispatch } from './store/useRedux';
import { toastService } from '@react-lab/shared';
import { getPairCountForDifficulty, loadCards } from './pokememory.utilities';
import Pokemon from '/pokemon.png';

const DIFFICULTY_OPTIONS = [
    { value: 'easy', label: 'Easy', icon: Zap, color: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700', ring: 'ring-emerald-400' },
    { value: 'medium', label: 'Medium', icon: Puzzle, color: 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700', ring: 'ring-amber-400' },
    { value: 'hard', label: 'Hard', icon: Skull, color: 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700', ring: 'ring-red-400' },
] as const;

export default function Setup() {
    const dispatch = useAppDispatch();
    const [playerName, setPlayerName] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerName.trim()) { toastService.error('Please enter your name'); return; }
        if (!selectedDifficulty) { toastService.error('Please select a difficulty level'); return; }

        const pairCount = getPairCountForDifficulty(selectedDifficulty);
        dispatch(setName(playerName));
        dispatch(setDifficulty(selectedDifficulty));
        dispatch(setCards(loadCards(pairCount)));
        dispatch(setGameState('playing'));
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <img src={Pokemon} alt="Memory Game Logo" className="w-48 object-contain" />
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Memory Game</h1>
                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                        Challenge your mind! Match pairs and test your concentration.
                    </p>
                    <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700" />

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Player Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-neutral-400" />
                                </div>
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Select Difficulty
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {DIFFICULTY_OPTIONS.map(({ value, label, icon: Icon, color, ring }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setSelectedDifficulty(value)}
                                        className={`
                                            relative px-3 py-2.5 rounded-lg text-sm font-medium flex flex-col items-center gap-1.5
                                            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
                                            ${selectedDifficulty === value
                                                ? `${color} text-white ring-2 ${ring}`
                                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                            }
                                        `}
                                    >
                                        <Icon size={20} />
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 flex items-center justify-center gap-2"
                        >
                            <Gamepad2 size={20} />
                            <span>Start Game</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
