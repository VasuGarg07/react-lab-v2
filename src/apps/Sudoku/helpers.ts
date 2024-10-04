export const deepCopy = (arr: number[][]) => JSON.parse(JSON.stringify(arr));

export const fetchInitialBoard = async () => {
    try {
        const response = await fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}');
        if (!response.ok) {
            throw new Error('Failed to fetch board');
        }
        const data = await response.json();
        return data?.newboard?.grids?.[0]?.value ?? []; // Safely access the response and provide a fallback
    } catch (error) {
        console.error('Error fetching the board:', error);
        return []; // Return an empty array or handle appropriately in the calling function
    }
};

export const isValid = (board: number[][], row: number, col: number, num: number) => {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false; // Check row and column in a single loop
        }
    }

    // Check the 3x3 box
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
};

export const solveBoard = (problemBoard: number[][]) => {
    const solve = (board: number[][]) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false; // No valid number found, return to backtrack
                }
            }
        }
        return true; // Solution found
    };

    // Clone the problem board instead of using JSON.parse
    const newBoard = problemBoard.map(row => [...row]);
    solve(newBoard);
    return newBoard;
};

