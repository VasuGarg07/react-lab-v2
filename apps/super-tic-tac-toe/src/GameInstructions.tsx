import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { Instructions } from './ttt.helpers';

interface SidebarProps {
    gameWinner: string | null;
    currentPlayer: 'X' | 'O';
    timer: number;
    handleRestartGame: () => void;
}

const GameInstructions = ({
    gameWinner,
    currentPlayer,
    timer,
    handleRestartGame
}: SidebarProps) => {
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="flex flex-col w-full h-auto sm:h-full p-4 sm:p-5 rounded-lg bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700 gap-4">

            {/* Title */}
            <h1 className="text-center text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Super Tic-Tac-Toe
            </h1>

            {/* Game Status */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        Current Player
                    </p>
                    <div className="flex items-center gap-2">
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm
                            ${currentPlayer === 'X'
                                ? 'bg-red-500 text-white'
                                : 'bg-blue-500 text-white'
                            }
                        `}>
                            {currentPlayer}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 items-end">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        Time Left
                    </p>
                    <p className={`
                        text-2xl font-bold tabular-nums
                        ${timer <= 5 ? 'text-red-500' : 'text-neutral-900 dark:text-neutral-100'}
                    `}>
                        {timer}s
                    </p>
                </div>
            </div>

            {/* Restart Button */}
            <button
                onClick={handleRestartGame}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium rounded-lg text-sm transition-all duration-200 shadow-sm border border-neutral-200 dark:border-neutral-600"
            >
                <RotateCcw size={18} />
                <span>Restart Game</span>
            </button>

            {/* Winner Display */}
            {gameWinner && (
                <div className={`
                    text-center p-3 rounded-lg font-bold text-base border-2
                    ${gameWinner === 'X'
                        ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900'
                        : 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900'
                    }
                `}>
                    Player {gameWinner} Wins!
                </div>
            )}

            {/* Instructions Toggle (Mobile) */}
            <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex sm:hidden items-center justify-between gap-2 py-2.5 px-4 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg text-sm transition-all duration-200 border border-neutral-200 dark:border-neutral-700"
            >
                <span>How to Play</span>
                {showInstructions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Instructions */}
            <div className={`${!showInstructions ? 'hidden sm:block' : 'block'}`}>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-2">
                    How to Play:
                </h3>
                <ol className="list-decimal ml-4 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    {Instructions.map((instruction, i) => (
                        <li key={i} className="leading-relaxed">
                            {instruction}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default GameInstructions;
