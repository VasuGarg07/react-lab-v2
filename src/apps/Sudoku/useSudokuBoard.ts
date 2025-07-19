import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useReducer } from 'react';
import { isValid, solveBoard } from './sudoku.utils';
import { toastService } from '@/shared/toastr';

// Types
interface SudokuState {
    currentBoard: number[][];
    selectedCell: { row: number; col: number } | null;
    isComplete: boolean;
}

type SudokuAction =
    | { type: 'SET_BOARD'; payload: number[][] }
    | { type: 'UPDATE_CELL'; payload: { row: number; col: number; value: number } }
    | { type: 'SELECT_CELL'; payload: { row: number; col: number } | null }
    | { type: 'CLEAR_CELL'; payload: { row: number; col: number } }
    | { type: 'SET_COMPLETE'; payload: boolean };

// Optimized deep copy
const deepCopy = (arr: number[][]): number[][] =>
    arr.map(row => [...row]);

// Check if board is complete
const isBoardComplete = (board: number[][]): boolean => {
    return board.every(row => row.every(cell => cell !== 0));
};

// Sudoku reducer for better state management
const sudokuReducer = (state: SudokuState, action: SudokuAction): SudokuState => {
    switch (action.type) {
        case 'SET_BOARD':
            return {
                ...state,
                currentBoard: action.payload,
                isComplete: isBoardComplete(action.payload),
            };

        case 'UPDATE_CELL': {
            const { row, col, value } = action.payload;
            const newBoard = deepCopy(state.currentBoard);
            newBoard[row][col] = value;

            return {
                ...state,
                currentBoard: newBoard,
                isComplete: isBoardComplete(newBoard),
            };
        }

        case 'CLEAR_CELL': {
            const { row, col } = action.payload;
            const newBoard = deepCopy(state.currentBoard);
            newBoard[row][col] = 0;

            return {
                ...state,
                currentBoard: newBoard,
                isComplete: false,
            };
        }

        case 'SELECT_CELL':
            return {
                ...state,
                selectedCell: action.payload,
            };

        case 'SET_COMPLETE':
            return {
                ...state,
                isComplete: action.payload,
            };

        default:
            return state;
    }
};

// Custom hook for Sudoku API
export const useSudokuAPI = () => {
    const queryClient = useQueryClient();

    const fetchSudokuBoard = async (): Promise<number[][]> => {
        const response = await fetch(
            'https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}'
        );

        if (!response.ok) {
            throw new Error('Failed to fetch Sudoku board');
        }

        const data = await response.json();
        const board = data?.newboard?.grids?.[0]?.value;

        if (!board || !Array.isArray(board)) {
            throw new Error('Invalid board data received');
        }

        return board;
    };

    const boardQuery = useQuery({
        queryKey: ['sudoku-board'],
        queryFn: fetchSudokuBoard,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    const newGame = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['sudoku-board'] });
    }, [queryClient]);

    return {
        ...boardQuery,
        newGame,
    };
};

// Main Sudoku board hook
export const useSudokuBoard = () => {
    const { data: initialBoard, isLoading, error, newGame } = useSudokuAPI();

    const [state, dispatch] = useReducer(sudokuReducer, {
        currentBoard: [],
        selectedCell: null,
        isComplete: false,
    });

    // Initialize board when data is fetched
    useMemo(() => {
        if (initialBoard) {
            dispatch({ type: 'SET_BOARD', payload: deepCopy(initialBoard) });
        }
    }, [initialBoard]);

    // Memoize solved board to avoid recalculation
    const solvedBoard = useMemo(() => {
        return initialBoard ? solveBoard(initialBoard) : [];
    }, [initialBoard]);

    const updateCell = useCallback((row: number, col: number, value: string) => {
        if (!initialBoard) return;

        const numValue = Number(value);

        if (value === '') {
            dispatch({ type: 'CLEAR_CELL', payload: { row, col } });
            return;
        }

        if (numValue < 1 || numValue > 9) {
            toastService.error("Value must be between 1 and 9");
            return;
        }

        if (!isValid(state.currentBoard, row, col, numValue)) {
            toastService.error("Invalid move - number already exists in row, column, or box");
            return;
        }

        dispatch({ type: 'UPDATE_CELL', payload: { row, col, value: numValue } });
    }, [state.currentBoard, initialBoard]);

    const selectCell = useCallback((row: number, col: number) => {
        dispatch({ type: 'SELECT_CELL', payload: { row, col } });
    }, []);

    const giveHint = useCallback(() => {
        if (!initialBoard || state.currentBoard.length === 0) return;

        // Find all empty cells
        const emptyCells: Array<{ row: number; col: number }> = [];

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (state.currentBoard[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length === 0) {
            toastService.info("No empty cells for hints!");
            return;
        }

        // Randomly select an empty cell (truly uniform)
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomIndex];
        const hintValue = solvedBoard[row][col];

        dispatch({ type: 'UPDATE_CELL', payload: { row, col, value: hintValue } });
        dispatch({ type: 'SELECT_CELL', payload: { row, col } });
    }, [state.currentBoard, initialBoard, solvedBoard]);

    const solvePuzzle = useCallback(() => {
        if (!initialBoard) return;

        dispatch({ type: 'SET_BOARD', payload: deepCopy(solvedBoard) });
    }, [initialBoard, solvedBoard]);

    const isEditable = useCallback((row: number, col: number) => {
        return initialBoard ? !initialBoard[row][col] : false;
    }, [initialBoard]);

    return {
        // State
        board: state.currentBoard,
        selectedCell: state.selectedCell,
        isComplete: state.isComplete,
        isLoading,
        error,

        // Actions
        updateCell,
        selectCell,
        giveHint,
        solvePuzzle,
        newGame,
        isEditable,
    };
};