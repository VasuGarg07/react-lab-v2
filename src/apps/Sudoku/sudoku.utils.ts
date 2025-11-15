import { SUDOKU_SIZE, BOX_SIZE, MIN_VALUE, MAX_VALUE } from './sudoku.constants';

/**
 * Creates a deep copy of a 2D array
 */
export const deepCopy = (arr: number[][]): number[][] => arr.map(row => [...row]);

/**
 * Checks if placing a number at a given position is valid
 */
export const isValid = (
    board: number[][],
    row: number,
    col: number,
    num: number
): boolean => {
    const startRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
    const startCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;

    // Check row and column
    for (let i = 0; i < SUDOKU_SIZE; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    for (let i = 0; i < BOX_SIZE; i++) {
        for (let j = 0; j < BOX_SIZE; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
};

/**
 * Solves a Sudoku board using backtracking
 */
export const solveBoard = (problemBoard: number[][]): number[][] => {
    const solve = (board: number[][]): boolean => {
        for (let row = 0; row < SUDOKU_SIZE; row++) {
            for (let col = 0; col < SUDOKU_SIZE; col++) {
                if (board[row][col] === 0) {
                    for (let num = MIN_VALUE; num <= MAX_VALUE; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const newBoard = deepCopy(problemBoard);
    solve(newBoard);
    return newBoard;
};

/**
 * Checks if the board is complete (no empty cells)
 */
export const isBoardComplete = (board: number[][]): boolean => {
    return board.every(row => row.every(cell => cell !== 0));
};

/**
 * Finds all empty cells in the board
 */
export const findEmptyCells = (board: number[][]): Array<{ row: number; col: number }> => {
    const emptyCells: Array<{ row: number; col: number }> = [];

    for (let row = 0; row < SUDOKU_SIZE; row++) {
        for (let col = 0; col < SUDOKU_SIZE; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    return emptyCells;
};
