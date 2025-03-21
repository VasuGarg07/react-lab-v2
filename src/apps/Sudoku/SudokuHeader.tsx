import { Lightbulb, PlayCircle, RotateCcw } from 'lucide-react';
import React from 'react';

interface SudokuHeaderProps {
    onNewGame: () => Promise<void>;
    onHint: () => void;
    onSolve: () => void;
}

const SudokuHeader: React.FC<SudokuHeaderProps> = ({ onNewGame, onHint, onSolve }) => {
    return (
        <div className="w-full rounded-xl p-3 mb-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-sm border border-neutral-100 dark:border-neutral-700">
            <div className="flex flex-col items-center justify-between w-full gap-3">
                <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    Sudoku Solver
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={onNewGame}
                        className="flex items-center gap-1.5 py-1.5 px-2.5 text-sm font-medium rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-neutral-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700/20 transition-colors"
                    >
                        <RotateCcw size={16} />
                        <span>New Game</span>
                    </button>

                    <button
                        onClick={onHint}
                        className="flex items-center gap-1.5 py-1.5 px-2.5 text-sm font-medium rounded-lg border border-amber-200 dark:border-amber-800/50 bg-white dark:bg-neutral-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                    >
                        <Lightbulb size={16} />
                        <span>Hint</span>
                    </button>

                    <button
                        onClick={onSolve}
                        className="flex items-center gap-1.5 py-1.5 px-2.5 text-sm font-medium rounded-lg border border-emerald-200 dark:border-emerald-800/50 bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    >
                        <PlayCircle size={16} />
                        <span>Solve</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SudokuHeader;