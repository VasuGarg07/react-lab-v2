export const REM = 16;
export const SQ_SIZE = 3 * REM;

export interface MiniBoardProps {
    board: string[][];
    onPlay: (boardIndex: string, rowIndex: number, colIndex: number) => void;
    boardIndex: string;
}

export const createEmptyBoard = (): string[][] => Array(3).fill(null).map(() => Array(3).fill(' '));
export const createSuperBoard = (): string[][][][] => Array(3).fill(null).map(() => Array(3).fill(null).map(createEmptyBoard))

export const checkWinner = (board: string[][]): string | null => {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
        if (board[0][i] !== ' ' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
    }
    if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
    return null;
};


export const Instructions = [
    "Player 'X' starts by marking any cell in any small board.",
    "Players take turns marking cells.",
    "The next move must be made in the small board corresponding to the last marked cell.",
    "If the corresponding small board is won or full, choose any available cell.",
    "Win a small board by getting three marks in a row.",
    "Win the game by winning three small boards in a row on the overall grid"
]

export const BoxShadow = `
    0px 0px 2.2px rgba(0, 0, 0, 0.028),
    0px 0px 5.3px rgba(0, 0, 0, 0.04),
    0px 0px 10px rgba(0, 0, 0, 0.05),
    0px 0px 17.9px rgba(0, 0, 0, 0.06),
    0px 0px 33.4px rgba(0, 0, 0, 0.072),
    0px 0px 80px rgba(0, 0, 0, 0.1)
`;

export const InsetBoxShadow = `
    inset 0px 0px 2.2px rgba(0, 0, 0, 0.034),
    inset 0px 0px 5.3px rgba(0, 0, 0, 0.048),
    inset 0px 0px 10px rgba(0, 0, 0, 0.06),
    inset 0px 0px 17.9px rgba(0, 0, 0, 0.072),
    inset 0px 0px 33.4px rgba(0, 0, 0, 0.086),
    inset 0px 0px 80px rgba(0, 0, 0, 0.12)
`;

// Random Move Function: 

export const Timeout = 10;

export const makeRandomMove = (
    boards: string[][][][],
    winners: (string | null)[][],
    nextBoard: string | null,
): { bIndex: string, rIndex: number, cIndex: number } | undefined => {
    const playableBoards = getPlayableBoards(winners, nextBoard);
    if (playableBoards.length === 0) return;

    const [bigRow, bigCol] = playableBoards[Math.floor(Math.random() * playableBoards.length)];
    const board = boards[bigRow][bigCol];
    const emptyCells: [number, number][] = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                emptyCells.push([i, j]);
            }
        }
    }

    if (emptyCells.length === 0) return;

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return { bIndex: `${bigRow}-${bigCol}`, rIndex: row, cIndex: col };
};

export const getPlayableBoards = (winners: (string | null)[][], nextBoard: string | null): [number, number][] => {
    const boardsToPlay: [number, number][] = [];
    if (nextBoard) {
        const [bigRow, bigCol] = nextBoard.split('-').map(Number);
        if (!winners[bigRow][bigCol]) {
            boardsToPlay.push([bigRow, bigCol]);
        }
    } else {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!winners[i][j]) {
                    boardsToPlay.push([i, j]);
                }
            }
        }
    }
    return boardsToPlay;
};

export const BOARD_COLOR = '#DBF4AD';
export const COLOR_O = '#00A6FB';
export const COLOR_X = '#F71735';