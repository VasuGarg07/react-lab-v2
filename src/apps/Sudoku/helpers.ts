export const fetchInitialBoard = async () => {
    const response = await fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}');
    const data = await response.json();
    return data.newboard.grids[0].value; // Adjust according to the structure of your API response
};

export const isValid = (board: number[][], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
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
                    return false;
                }
            }
        }
        return true;
    };

    const newBoard = problemBoard.map(row => [...row]);
    solve(newBoard);
    return newBoard;
};

