import { deepCopy, fetchInitialBoard, isValid, solveBoard } from '@/apps/Sudoku/sudoku.utils';
import SudokuHeader from '@/apps/Sudoku/SudokuHeader';
import { toastService } from '@/shared/toastr';
import React, { useCallback, useEffect, useState, useRef } from 'react';

interface CellProps {
    cell: number,
    onChange: (value: string) => void,
    editable: boolean,
    selected: boolean,
    onSelect: () => void,
    row: number,
    col: number
}

// Memoized cell component to optimize rendering
const GridCell = React.memo<CellProps>(({ cell, onChange, editable, selected, onSelect, row, col }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selected && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selected]);

    // Determine color classes based on position for better visual grouping
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
    const [board, setBoard] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);


    const fetchBoard = useCallback(async () => {
        setLoading(true);
        try {
            const initialBoard = await fetchInitialBoard();
            setBoard(deepCopy(initialBoard));
            setInitialBoard(initialBoard);
            setSelectedCell(null);
        } catch (error) {
            console.error('Error fetching the board:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoard();
    }, [fetchBoard]);

    const giveHint = useCallback(() => {
        if (board.length === 0) return;

        let emptyCellCount = 0;
        let selectedCell = null;

        // Loop through the board to find and randomly select an empty cell
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    emptyCellCount++;
                    // Randomly select this cell with probability 1/emptyCellCount
                    if (Math.random() < 1 / emptyCellCount) {
                        selectedCell = { row, col };
                    }
                }
            }
        }

        if (!selectedCell) return; // No empty cells to give a hint

        // Solve the board to get the solution only after selecting the cell
        const solvedBoard = solveBoard(initialBoard);

        // Update the board with the hint
        const newBoard = deepCopy(board);
        newBoard[selectedCell.row][selectedCell.col] = solvedBoard[selectedCell.row][selectedCell.col];
        setBoard(newBoard);
    }, [board, initialBoard]);

    const handleChange = useCallback((row: number, col: number, value: string) => {
        const number = Number(value) || 0;

        if (number >= 1 && number <= 9) {
            if (!isValid(board, row, col, number)) {
                toastService.error("Invalid move");
            } else {
                setBoard(prevBoard => {
                    const newBoard = [...prevBoard];
                    newBoard[row][col] = number;
                    return newBoard;
                });
            }
        } else if (value === '') {
            // Allow clearing the cell
            setBoard(prevBoard => {
                const newBoard = [...prevBoard];
                newBoard[row][col] = 0;
                return newBoard;
            });
        } else {
            toastService.error("Value out of bounds");
        }
    }, [board]);

    const handleSolve = () => {
        const solvedBoard = solveBoard(initialBoard);
        setBoard(solvedBoard);
        setInitialBoard(solvedBoard);
    };

    const handleCellSelect = (row: number, col: number) => {
        setSelectedCell({ row, col });
    };

    if (loading) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background elements */}
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
                onNewGame={fetchBoard}
                onHint={giveHint}
                onSolve={handleSolve}
            />

            <div className="w-full sm:w-fit mx-auto bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-xl p-2 sm:p-4 shadow-md border border-neutral-100 dark:border-neutral-700">
                <div className="grid grid-cols-9 gap-[2px] sm:gap-1 aspect-square">
                    {board.map((row, rowIndex) => (
                        <>
                            {row.map((_, colIndex) => (
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
                                        onChange={(value) => handleChange(rowIndex, colIndex, value)}
                                        editable={!initialBoard[rowIndex][colIndex]}
                                        selected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                                        onSelect={() => handleCellSelect(rowIndex, colIndex)}
                                        row={rowIndex}
                                        col={colIndex}
                                    />
                                </div>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SudokuBoard;