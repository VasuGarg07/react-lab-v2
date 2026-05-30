export const SUDOKU_SIZE = 9;
export const BOX_SIZE = 3;
export const MIN_VALUE = 1;
export const MAX_VALUE = 9;

export const SUDOKU_API_URL =
    'https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution}}}';

export const QUERY_CONFIG = {
    staleTime: 0,
    gcTime: 0,
    retry: 3,
    retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 30000),
};

export const SOLVE_STEP_MIN_MS = 0;
export const SOLVE_STEP_MAX_MS = 200;
export const SOLVE_STEP_DEFAULT_MS = 40;

export const emptyBoard = (): number[][] =>
    Array.from({ length: SUDOKU_SIZE }, () => Array(SUDOKU_SIZE).fill(0));
