import { Hash, RotateCcw, User } from 'lucide-react';
import Logo from '/pokemon.png';
import { CardGrid } from './CardGrid';
import { useAppDispatch, useAppSelector } from './store/useRedux';
import { resetGame } from './store/pokeMemorySlice';

export default function GameBoard() {
    const dispatch = useAppDispatch();
    const { name, turns } = useAppSelector((state) => state.pokeMemory);

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <img src={Logo} alt="Logo" className="w-32" />
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Memory Game</h1>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">Match all the pairs to win!</p>
                    </div>

                    <span className="grow" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex-1 sm:flex-initial">
                                <User size={16} className="text-neutral-500 dark:text-neutral-400" />
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">Player</span>
                                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{name}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex-1 sm:flex-initial">
                                <Hash size={16} className="text-blue-600 dark:text-blue-400" />
                                <span className="text-xs text-blue-600 dark:text-blue-400">Turns</span>
                                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{turns}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => dispatch(resetGame())}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-0 shadow-sm w-full sm:w-auto"
                        >
                            <RotateCcw size={16} />
                            <span>Restart Game</span>
                        </button>
                    </div>
                </div>
            </div>

            <CardGrid />
        </div>
    );
}
