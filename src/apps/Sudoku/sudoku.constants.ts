export const SUDOKU_SIZE = 9;
export const BOX_SIZE = 3;
export const MIN_VALUE = 1;
export const MAX_VALUE = 9;

export const SUDOKU_API_URL = 'https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}';

export const QUERY_CONFIG = {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
};