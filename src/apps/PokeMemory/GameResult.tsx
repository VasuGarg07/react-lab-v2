import { Trophy, RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/useRedux';
import { resetGame } from '../../store/pokeMemorySlice';

export default function Result() {
    const dispatch = useAppDispatch();
    const { name, turns } = useAppSelector((state) => state.pokeMemory);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 flex justify-center items-center bg-neutral-50 dark:bg-neutral-800">
                        <img
                            src="/pikachu.png"
                            alt="Victory"
                            className="max-w-full h-auto"
                        />
                    </div>

                    <div className="md:w-1/2 p-6 flex flex-col justify-center items-center">
                        <div className="mb-4">
                            <Trophy size={48} className="text-amber-500 mx-auto" />
                        </div>

                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-4">
                            Congratulations!
                        </h2>

                        <div className="text-center mb-4 space-y-2">
                            <p className="text-neutral-700 dark:text-neutral-300">
                                Amazing job, <span className="font-semibold text-blue-600 dark:text-blue-400">{name}</span>!
                            </p>
                            <p className="text-neutral-700 dark:text-neutral-300">
                                You completed the game in <span className="font-bold text-blue-600 dark:text-blue-400">{turns}</span> turns.
                            </p>
                        </div>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-6">
                            Your memory skills are impressive. Can you beat your own record?
                        </p>

                        <button
                            onClick={() => dispatch(resetGame())}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                        >
                            <RotateCcw size={20} />
                            <span>Play Again</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}