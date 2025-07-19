import React, { useEffect, useRef } from 'react';
import { useSudokuBoard } from './useSudokuBoard';
import SudokuHeader from './SudokuHeader';

interface CellProps {
    cell: number;
    onChange: (value: string) => void;
    editable: boolean;
    selected: boolean;
    onSelect: () => void;
    row: number;
    col: number;
}

const GridCell = React.memo<CellProps>(({
    cell,
    onChange,
    editable,
    selected,
    onSelect,
    row,
    col
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selected && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selected]);

    const getBgClass = () => {
        const isEvenBlock = Math.floor(row / 3) % 2 === Math.floor(col / 3) % 2;
        if (!editable) {
            return isEvenBlock
                ? 'bg-neutral-100 dark:bg-neutral-700'
                : 'bg-neutral-200 dark:bg-neutral-600';
        }
        return isEvenBlock
            ? 'bg-white dark:bg-neutral-800'
            : 'bg-neutral-50 dark:bg-neutral-700';
    };

    return (
        <div
            onClick={onSelect}
            className={`
        w-full h-full flex items-center justify-center
        ${getBgClass()}
        ${selected ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 z-10' : ''}
        ${editable
                    ? 'border border-neutral-200 dark:border-neutral-700'
                    : 'border border-neutral-300 dark:border-neutral-600 font-medium'}
        rounded-md text-center transition-all
        ${editable && selected ? 'scale-105' : ''}
      `}
        >
            {editable ? (
                <input
                    ref={inputRef}
                    type="number"
                    value={cell === 0 ? '' : cell}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-full text-center bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-neutral-900 dark:text-white"
                    min="1"
                    max="9"
                    inputMode="numeric"
                    aria-label={`Row ${row + 1}, Column ${col + 1}`}
                />
            ) : (
                <span className="text-neutral-800 dark:text-neutral-200">
                    {cell !== 0 ? cell : ''}
                </span>
            )}
        </div>
    );
});

const SudokuBoard: React.FC = () => {
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
    } = useSudokuBoard();

    if (error) {
        return (
            <div className="relative h-[calc(100vh-54px)] w-full flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                    <h2 className="text-xl font-bold text-red-600 mb-4">
                        Failed to load Sudoku puzzle
                    </h2>
                    <p className="text-gray-600 mb-4">{error.message}</p>
                    <button
                        onClick={newGame}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="relative h-[calc(100vh-54px)] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-black z-0" />
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl z-0" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl z-0" />

                <div className="relative z-10 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-lg mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
            <SudokuHeader
                onNewGame={newGame}
                onHint={giveHint}
                onSolve={solvePuzzle}
            />

            {isComplete && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 font-medium text-center">
                        🎉 Congratulations! Puzzle completed!
                    </p>
                </div>
            )}

            <div className="w-full sm:w-fit mx-auto bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-xl p-2 sm:p-4 shadow-md border border-neutral-100 dark:border-neutral-700">
                <div className="grid grid-cols-9 gap-[2px] sm:gap-1 aspect-square">
                    {board.map((row, rowIndex) => (
                        row.map((_, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`
                  aspect-square
                  ${rowIndex % 3 === 2 && rowIndex < 8 ? 'border-b border-neutral-400 dark:border-neutral-500' : ''}
                  ${colIndex % 3 === 2 && colIndex < 8 ? 'border-r border-neutral-400 dark:border-neutral-500' : ''}
                `}
                            >
                                <GridCell
                                    cell={board[rowIndex][colIndex]}
                                    onChange={(value) => updateCell(rowIndex, colIndex, value)}
                                    editable={isEditable(rowIndex, colIndex)}
                                    selected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                                    onSelect={() => selectCell(rowIndex, colIndex)}
                                    row={rowIndex}
                                    col={colIndex}
                                />
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SudokuBoard;
