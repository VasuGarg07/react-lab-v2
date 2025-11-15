import { useState } from 'react';
import { Lightbulb, PlayCircle, RotateCcw, Keyboard } from 'lucide-react';
import { useSudoku } from './useSudoku';
import SudokuCell from './SudokuCell';
import VirtualNumpad from './VirtualNumpad';

export default function Sudoku() {
    const {
        board,
        selectedCell,
        isComplete,
        isLoading,
        error,
        updateCell,
        selectCell,
        giveHint,
        solvePuzzle,
        newGame,
        isEditable,
    } = useSudoku();

    const [useNumpad, setUseNumpad] = useState(true);

    const handleNumpadInput = (num: number) => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        if (isEditable(row, col)) {
            updateCell(row, col, num.toString());
        }
    };

    const handleClearCell = () => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        if (isEditable(row, col)) {
            updateCell(row, col, '');
        }
    };

    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950">
                <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg max-w-md">
                    <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-3">
                        Failed to load Sudoku puzzle
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        {error.message}
                    </p>
                    <button
                        onClick={newGame}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 shadow-sm"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading puzzle...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 flex flex-col">
            {/* Floating Header Controls */}
            <div className="sticky top-0 z-20 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 p-3 shadow-sm">
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            Sudoku Solver
                        </h2>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                                onClick={newGame}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                            >
                                <RotateCcw size={14} />
                                <span>New</span>
                            </button>

                            <button
                                onClick={giveHint}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:ring-offset-0"
                            >
                                <Lightbulb size={14} />
                                <span>Hint</span>
                            </button>

                            <button
                                onClick={solvePuzzle}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-0"
                            >
                                <PlayCircle size={14} />
                                <span>Solve</span>
                            </button>

                            <button
                                onClick={() => setUseNumpad(!useNumpad)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${useNumpad
                                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-500/30'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:ring-blue-500/30'
                                    }`}
                            >
                                <Keyboard size={14} />
                                <span>Numpad</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {isComplete && (
                <div className="sticky top-[61px] z-10 w-full bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800 p-2">
                    <p className="text-emerald-800 dark:text-emerald-200 font-medium text-center text-sm">
                        🎉 Congratulations! Puzzle completed!
                    </p>
                </div>
            )}

            {/* Game Board */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-xl">
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-3 shadow-lg border border-neutral-200 dark:border-neutral-700">
                        <div className="grid grid-cols-9 gap-px aspect-square bg-neutral-400 dark:bg-neutral-600 rounded-lg overflow-hidden">
                            {board.map((row, rowIndex) =>
                                row.map((_, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`
                      ${rowIndex % 3 === 2 && rowIndex < 8 ? 'border-b-2 border-neutral-500 dark:border-neutral-400' : ''}
                      ${colIndex % 3 === 2 && colIndex < 8 ? 'border-r-2 border-neutral-500 dark:border-neutral-400' : ''}
                    `}
                                    >
                                        <SudokuCell
                                            value={board[rowIndex][colIndex]}
                                            onChange={(value) => updateCell(rowIndex, colIndex, value)}
                                            editable={isEditable(rowIndex, colIndex)}
                                            selected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                                            onSelect={() => selectCell(rowIndex, colIndex)}
                                            row={rowIndex}
                                            col={colIndex}
                                            useNumpad={useNumpad}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Virtual Numpad */}
            {useNumpad && (
                <div className="sticky bottom-0 z-20">
                    <VirtualNumpad
                        onNumberSelect={handleNumpadInput}
                        onClear={handleClearCell}
                        disabled={!selectedCell || (selectedCell && !isEditable(selectedCell.row, selectedCell.col))}
                    />
                </div>
            )}
        </div>
    );
}