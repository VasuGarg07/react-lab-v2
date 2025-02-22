// Constants
export const REM = 16;
export const SQ_SIZE = 3 * REM;
export const TIMEOUT = 10;

// Colors
export const BOARD_COLOR = '#DBF4AD';
export const COLOR_O = '#00A6FB';
export const COLOR_X = '#F71735';

// Box Shadows
export const BOX_SHADOW = `
    0px 0px 2.2px rgba(0, 0, 0, 0.028),
    0px 0px 5.3px rgba(0, 0, 0, 0.04),
    0px 0px 10px rgba(0, 0, 0, 0.05),
    0px 0px 17.9px rgba(0, 0, 0, 0.06),
    0px 0px 33.4px rgba(0, 0, 0, 0.072),
    0px 0px 80px rgba(0, 0, 0, 0.1)
`;

export const INSET_BOX_SHADOW = `
    inset 0px 0px 2.2px rgba(0, 0, 0, 0.034),
    inset 0px 0px 5.3px rgba(0, 0, 0, 0.048),
    inset 0px 0px 10px rgba(0, 0, 0, 0.06),
    inset 0px 0px 17.9px rgba(0, 0, 0, 0.072),
    inset 0px 0px 33.4px rgba(0, 0, 0, 0.086),
    inset 0px 0px 80px rgba(0, 0, 0, 0.12)
`;

// Instructions
export const INSTRUCTIONS = [
    "Player 'X' starts by marking any cell in any small board.",
    "Players take turns marking cells.",
    "The next move must be made in the small board corresponding to the last marked cell.",
    "If the corresponding small board is won or full, choose any available cell.",
    "Win a small board by getting three marks in a row.",
    "Win the game by winning three small boards in a row on the overall grid."
];

// Board Types
export interface MiniBoardProps {
    board: string[][];
    onPlay: (boardIndex: string, rowIndex: number, colIndex: number) => void;
    boardIndex: string;
}

// Board Initialization Functions
export const createEmptyBoard = (): string[][] =>
    Array(3).fill(null).map(() => Array(3).fill(' '));

export const createSuperBoard = (): string[][][][] =>
    Array(3).fill(null).map(() => Array(3).fill(null).map(createEmptyBoard));

// Winner Checking Logic
export const checkWinner = (board: string[][]): string | null => {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
        // Check columns
        if (board[0][i] !== ' ' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }
    // Check diagonals
    if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }
    return null;
};

// AI: Make a Random Move
export const makeRandomMove = (
    boards: string[][][][],
    winners: (string | null)[][],
    nextBoard: string | null
): { bIndex: string; rIndex: number; cIndex: number } | undefined => {
    const playableBoards = getPlayableBoards(winners, nextBoard);
    if (playableBoards.length === 0) return;

    // Select a random playable board
    const [bigRow, bigCol] = playableBoards[Math.floor(Math.random() * playableBoards.length)];
    const board = boards[bigRow][bigCol];

    // Find empty cells in the selected board
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                emptyCells.push([i, j]);
            }
        }
    }

    if (emptyCells.length === 0) return;

    // Select a random empty cell
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return { bIndex: `${bigRow}-${bigCol}`, rIndex: row, cIndex: col };
};

// Get Playable Boards Based on Game Rules
export const getPlayableBoards = (
    winners: (string | null)[][],
    nextBoard: string | null
): [number, number][] => {
    const playableBoards: [number, number][] = [];

    // If a specific board is assigned to play next, check if it's available
    if (nextBoard) {
        const [bigRow, bigCol] = nextBoard.split('-').map(Number);
        if (!winners[bigRow][bigCol]) {
            playableBoards.push([bigRow, bigCol]);
        }
    } else {
        // If not, any board without a winner is playable
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!winners[i][j]) {
                    playableBoards.push([i, j]);
                }
            }
        }
    }
    return playableBoards;
};
