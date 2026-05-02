import { BOX_SIZE, MAX_VALUE, MIN_VALUE, SUDOKU_SIZE } from './sudoku.constants';

export const cloneBoard = (board: number[][]): number[][] =>
    board.map(row => [...row]);

export const isFilled = (board: number[][]): boolean =>
    board.every(row => row.every(cell => cell !== 0));

export const findEmptyCells = (board: number[][]): Array<{ row: number; col: number }> => {
    const empty: Array<{ row: number; col: number }> = [];
    for (let row = 0; row < SUDOKU_SIZE; row++) {
        for (let col = 0; col < SUDOKU_SIZE; col++) {
            if (board[row][col] === 0) {
                empty.push({ row, col });
            }
        }
    }
    return empty;
};

const boxStart = (index: number): number =>
    Math.floor(index / BOX_SIZE) * BOX_SIZE;

const sameRowOrColumnHasNumber = (
    board: number[][],
    row: number,
    col: number,
    num: number,
): boolean => {
    for (let i = 0; i < SUDOKU_SIZE; i++) {
        const inSameRow = i !== col && board[row][i] === num;
        const inSameCol = i !== row && board[i][col] === num;
        if (inSameRow || inSameCol) return true;
    }
    return false;
};

const sameBoxHasNumber = (
    board: number[][],
    row: number,
    col: number,
    num: number,
): boolean => {
    const startRow = boxStart(row);
    const startCol = boxStart(col);

    for (let r = startRow; r < startRow + BOX_SIZE; r++) {
        for (let c = startCol; c < startCol + BOX_SIZE; c++) {
            const isSelf = r === row && c === col;
            if (!isSelf && board[r][c] === num) return true;
        }
    }
    return false;
};

export const conflictsWithPeers = (
    board: number[][],
    row: number,
    col: number,
    num: number,
): boolean => {
    if (num === 0) return false;
    if (sameRowOrColumnHasNumber(board, row, col, num)) return true;
    if (sameBoxHasNumber(board, row, col, num)) return true;
    return false;
};

export const findConflicts = (board: number[][]): Set<string> => {
    const conflicts = new Set<string>();

    for (let row = 0; row < SUDOKU_SIZE; row++) {
        for (let col = 0; col < SUDOKU_SIZE; col++) {
            const value = board[row]?.[col] ?? 0;
            if (value === 0) continue;
            if (conflictsWithPeers(board, row, col, value)) {
                conflicts.add(`${row},${col}`);
            }
        }
    }
    return conflicts;
};

export const isSolved = (board: number[][]): boolean =>
    isFilled(board) && findConflicts(board).size === 0;

const canPlaceWithoutConflict = (
    board: number[][],
    row: number,
    col: number,
    num: number,
): boolean => {
    for (let i = 0; i < SUDOKU_SIZE; i++) {
        if (board[row][i] === num) return false;
        if (board[i][col] === num) return false;
    }
    const startRow = boxStart(row);
    const startCol = boxStart(col);
    for (let r = startRow; r < startRow + BOX_SIZE; r++) {
        for (let c = startCol; c < startCol + BOX_SIZE; c++) {
            if (board[r][c] === num) return false;
        }
    }
    return true;
};

export const solveBoard = (problemBoard: number[][]): number[][] => {
    const board = cloneBoard(problemBoard);

    const recurse = (): boolean => {
        for (let row = 0; row < SUDOKU_SIZE; row++) {
            for (let col = 0; col < SUDOKU_SIZE; col++) {
                if (board[row][col] !== 0) continue;

                for (let num = MIN_VALUE; num <= MAX_VALUE; num++) {
                    if (!canPlaceWithoutConflict(board, row, col, num)) continue;

                    board[row][col] = num;
                    if (recurse()) return true;
                    board[row][col] = 0;
                }
                return false;
            }
        }
        return true;
    };

    recurse();
    return board;
};

/**
 * Generator-based solver. Yields one mutation at a time so the UI can
 * animate the search at its own pace (the consumer pulls the next step
 * after a delay). A plain recursive solver finishes synchronously and
 * the UI never sees the intermediate states.
 */
export type SolveStep =
    | { kind: 'try'; row: number; col: number; num: number }
    | { kind: 'commit'; row: number; col: number; num: number }
    | { kind: 'backtrack'; row: number; col: number };

export type SolveYield = { board: number[][]; step: SolveStep };

export function* solveBoardSteps(
    problemBoard: number[][],
): Generator<SolveYield, number[][], void> {
    const board = cloneBoard(problemBoard);

    function* recurse(): Generator<SolveYield, boolean, void> {
        for (let row = 0; row < SUDOKU_SIZE; row++) {
            for (let col = 0; col < SUDOKU_SIZE; col++) {
                if (board[row][col] !== 0) continue;

                for (let num = MIN_VALUE; num <= MAX_VALUE; num++) {
                    if (!canPlaceWithoutConflict(board, row, col, num)) continue;

                    board[row][col] = num;
                    yield { board, step: { kind: 'try', row, col, num } };

                    const succeeded: boolean = yield* recurse();
                    if (succeeded) {
                        yield { board, step: { kind: 'commit', row, col, num } };
                        return true;
                    }

                    board[row][col] = 0;
                    yield { board, step: { kind: 'backtrack', row, col } };
                }
                return false;
            }
        }
        return true;
    }

    yield* recurse();
    return board;
}