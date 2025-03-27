import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';
import { COLOR_O, COLOR_X, Instructions } from './tictactoe.helpers';

interface SidebarProps {
    gameWinner: string | null;
    currentPlayer: 'X' | 'O';
    timer: number;
    handleRestartGame: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    gameWinner,
    currentPlayer,
    timer,
    handleRestartGame
}) => {
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="flex flex-col w-full h-auto sm:h-full p-3 sm:p-6 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-md border border-neutral-100 dark:border-neutral-700 space-y-3 sm:space-y-5">
            {/* Title */}
            <h1 className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-fuchsia-500 dark:to-pink-500 bg-clip-text text-transparent">
                SUPER TIC TAC TOE
            </h1>

            {/* Game Status Panel */}
            <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-neutral-100/80 dark:bg-neutral-700/50">
                <div>
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Current Player
                    </p>
                    <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold shadow-sm"
                        style={{
                            backgroundColor: currentPlayer === 'X' ? COLOR_X : COLOR_O,
                            color: currentPlayer === 'X' ? '#000' : '#fff'
                        }}
                    >
                        {currentPlayer}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Time Left
                    </p>
                    <p className={`text-lg sm:text-xl font-semibold ${timer <= 5 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {timer}s
                    </p>
                </div>
            </div>

            {/* Controls Row - Mobile Layout */}
            <div className="flex sm:flex-col gap-2">
                {/* Restart Button */}
                <button
                    onClick={handleRestartGame}
                    className="flex flex-1 sm:flex-none items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:w-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-600/30 dark:hover:bg-indigo-600/50 text-indigo-700 dark:text-indigo-300 font-medium rounded-xl text-sm sm:text-base transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
                >
                    <Gamepad2 size={20} />
                    <span>Restart</span>
                </button>

                {/* Instructions Toggle (Mobile Only) */}
                <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="flex flex-1 sm:hidden items-center justify-center gap-1 py-2 px-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700/50 dark:hover:bg-neutral-700/70 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl text-sm transition-all"
                >
                    <span>Instructions</span>
                    {showInstructions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>

            {/* Winner Display */}
            {gameWinner && (
                <div
                    className="text-center p-2 sm:p-3 rounded-md font-bold text-base sm:text-lg bg-neutral-100/80 dark:bg-neutral-700/50"
                    style={{ color: gameWinner === 'X' ? COLOR_X : COLOR_O }}
                >
                    Player {gameWinner} wins the game!
                </div>
            )}

            {/* Instructions - Always visible on desktop, toggleable on mobile */}
            <div className={`${!showInstructions ? 'hidden sm:block' : ''}`}>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1 sm:mb-2">
                    How to Play:
                </h3>
                <ol className="list-decimal ml-4 sm:ml-5 space-y-1 sm:space-y-2">
                    {Instructions.map((instruction, i) => (
                        <li key={i} className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                            {instruction}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Sidebar;