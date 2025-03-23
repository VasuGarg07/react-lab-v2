import { deepCopy, fetchInitialBoard, isValid, solveBoard } from '@/apps/Sudoku/sudoku.utils';
import SudokuHeader from '@/apps/Sudoku/SudokuHeader';
import { toastService } from '@/shared/toastr';
import React, { useCallback, useEffect, useState } from 'react';

interface CellProps {
    cell: number,
    onChange: (value: string) => void,
    editable: boolean
}

// Memoized cell component to optimize rendering
const GridCell = React.memo<CellProps>(({ cell, onChange, editable }) => (
    editable ? (
        <input
            type="number"
            value={cell === 0 ? '' : cell}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 text-center rounded-md border border-neutral-300 dark:border-neutral-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="1"
            max="9"
        />
    ) : (
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 font-medium">
            {cell !== 0 ? cell : ''}
        </div>
    )
));

const SudokuBoard: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBoard = useCallback(async () => {
        setLoading(true);
        try {
            const initialBoard = await fetchInitialBoard();
            setBoard(deepCopy(initialBoard));
            setInitialBoard(initialBoard);
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
        <div className="relative w-full max-w-lg mx-auto p-4 flex items-center justify-center">
            <SudokuHeader
                onNewGame={fetchBoard}
                onHint={giveHint}
                onSolve={handleSolve}
            />

            <div className="w-fit mx-auto bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-xl p-4 shadow-md border border-neutral-100 dark:border-neutral-700">
                <div className="flex flex-col items-center gap-1">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-1">
                            {row.map((_, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`
                      ${rowIndex % 3 === 2 && rowIndex < 8 ? 'mb-1' : ''}
                      ${colIndex % 3 === 2 && colIndex < 8 ? 'mr-1' : ''}
                    `}
                                >
                                    <GridCell
                                        cell={board[rowIndex][colIndex]}
                                        onChange={(value) => handleChange(rowIndex, colIndex, value)}
                                        editable={!initialBoard[rowIndex][colIndex]}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SudokuBoard;