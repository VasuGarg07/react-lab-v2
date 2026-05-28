/**
 * Sudoku state. Composed of three smaller hooks:
 *   useSudokuBoard      — fetches the puzzle, holds the working board, derives conflicts and the solved board.
 *   useCellSelection    — what the user has selected, and the "peer" / "same number" cells driven by that selection.
 *   useSolveAnimation   — drives the animated backtracking solver.
 * useSudoku() wires them together for the component.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toastService } from '@react-lab/shared';
import {
    BOX_SIZE,
    QUERY_CONFIG,
    SOLVE_STEP_DEFAULT_MS,
    SUDOKU_API_URL,
    SUDOKU_SIZE,
    emptyBoard,
} from './sudoku.constants';
import {
    cloneBoard,
    findConflicts,
    findEmptyCells,
    isSolved,
    solveBoard,
    solveBoardSteps,
} from './sudoku.utils';

interface ApiBoard {
    value: number[][];
    solution?: number[][];
}

interface CellPosition {
    row: number;
    col: number;
}

// ---------------------------------------------------------------------------
// useSudokuBoard
// ---------------------------------------------------------------------------

const fetchSudokuBoard = async (): Promise<ApiBoard> => {
    const response = await fetch(SUDOKU_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch Sudoku board');
    }
    const data = await response.json();
    const grid = data?.newboard?.grids?.[0];
    if (!grid?.value || !Array.isArray(grid.value)) {
        throw new Error('Invalid board data received');
    }
    return { value: grid.value, solution: grid.solution };
};

function useSudokuBoard() {
    const queryClient = useQueryClient();
    const { data: apiBoard, isLoading, error } = useQuery({
        queryKey: ['sudoku-board'],
        queryFn: fetchSudokuBoard,
        ...QUERY_CONFIG,
    });

    const initialBoard = apiBoard?.value;
    const [currentBoard, setCurrentBoard] = useState<number[][]>(emptyBoard);

    useEffect(() => {
        if (initialBoard) {
            setCurrentBoard(cloneBoard(initialBoard));
        }
    }, [initialBoard]);

    const solvedBoard = useMemo(() => {
        if (!initialBoard) return [];
        if (apiBoard?.solution) return apiBoard.solution;
        return solveBoard(initialBoard);
    }, [initialBoard, apiBoard?.solution]);

    const conflictCells = useMemo(
        () => findConflicts(currentBoard),
        [currentBoard],
    );

    const isComplete = useMemo(() => isSolved(currentBoard), [currentBoard]);

    const isEditable = useCallback((row: number, col: number): boolean => {
        if (!initialBoard) return false;
        return initialBoard[row][col] === 0;
    }, [initialBoard]);

    const setCellValue = useCallback((row: number, col: number, value: string) => {
        setCurrentBoard(prev => {
            const next = cloneBoard(prev);
            if (value === '') {
                next[row][col] = 0;
                return next;
            }
            const num = Number(value);
            if (Number.isInteger(num) && num >= 1 && num <= 9) {
                next[row][col] = num;
                return next;
            }
            return prev;
        });
    }, []);

    const newGame = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['sudoku-board'] });
    }, [queryClient]);

    return {
        currentBoard,
        setCurrentBoard,
        solvedBoard,
        conflictCells,
        isComplete,
        isLoading,
        error,
        isEditable,
        setCellValue,
        newGame,
    };
}

// ---------------------------------------------------------------------------
// useCellSelection
// ---------------------------------------------------------------------------

const isInSameBox = (
    a: CellPosition,
    b: CellPosition,
): boolean => {
    const sameBoxRow = Math.floor(a.row / BOX_SIZE) === Math.floor(b.row / BOX_SIZE);
    const sameBoxCol = Math.floor(a.col / BOX_SIZE) === Math.floor(b.col / BOX_SIZE);
    return sameBoxRow && sameBoxCol;
};

const isPeerOf = (target: CellPosition, candidate: CellPosition): boolean => {
    if (target.row === candidate.row && target.col === candidate.col) return false;
    if (target.row === candidate.row) return true;
    if (target.col === candidate.col) return true;
    return isInSameBox(target, candidate);
};

function useCellSelection(currentBoard: number[][]) {
    const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);

    const selectCell = useCallback((row: number, col: number) => {
        setSelectedCell({ row, col });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedCell(null);
    }, []);

    const { peerCells, sameNumberCells } = useMemo(() => {
        const peers = new Set<string>();
        const sameNumber = new Set<string>();

        if (!selectedCell) {
            return { peerCells: peers, sameNumberCells: sameNumber };
        }

        const selectedValue = currentBoard[selectedCell.row][selectedCell.col];

        for (let row = 0; row < SUDOKU_SIZE; row++) {
            for (let col = 0; col < SUDOKU_SIZE; col++) {
                const candidate = { row, col };
                if (isPeerOf(selectedCell, candidate)) {
                    peers.add(`${row},${col}`);
                }
                const sharesNumber =
                    selectedValue !== 0 &&
                    currentBoard[row][col] === selectedValue &&
                    !(row === selectedCell.row && col === selectedCell.col);
                if (sharesNumber) {
                    sameNumber.add(`${row},${col}`);
                }
            }
        }

        return { peerCells: peers, sameNumberCells: sameNumber };
    }, [selectedCell, currentBoard]);

    return { selectedCell, selectCell, clearSelection, peerCells, sameNumberCells };
}

// ---------------------------------------------------------------------------
// useSolveAnimation
// ---------------------------------------------------------------------------

interface SolvingState {
    active: boolean;
    speedMs: number;
    currentStep?: { row: number; col: number; kind: 'try' | 'backtrack' };
}

function useSolveAnimation(
    currentBoard: number[][],
    setCurrentBoard: (board: number[][]) => void,
) {
    const [solvingState, setSolvingState] = useState<SolvingState>({
        active: false,
        speedMs: SOLVE_STEP_DEFAULT_MS,
    });

    // The animation loop reads these via ref so changes don't require
    // re-creating the running setTimeout chain.
    const cancelRef = useRef(false);
    const speedRef = useRef(SOLVE_STEP_DEFAULT_MS);

    const reset = useCallback(() => {
        cancelRef.current = false;
        speedRef.current = SOLVE_STEP_DEFAULT_MS;
        setSolvingState({ active: false, speedMs: SOLVE_STEP_DEFAULT_MS });
    }, []);

    const start = useCallback(() => {
        if (solvingState.active) return;

        cancelRef.current = false;
        setSolvingState(prev => ({ ...prev, active: true, currentStep: undefined }));

        const generator = solveBoardSteps(currentBoard);

        const tick = () => {
            if (cancelRef.current) {
                setSolvingState(prev => ({ ...prev, active: false, currentStep: undefined }));
                return;
            }

            const result = generator.next();
            if (result.done) {
                setSolvingState(prev => ({ ...prev, active: false, currentStep: undefined }));
                return;
            }

            const { board, step } = result.value;
            setCurrentBoard(cloneBoard(board));

            if (step.kind === 'try' || step.kind === 'backtrack') {
                setSolvingState(prev => ({
                    ...prev,
                    currentStep: { row: step.row, col: step.col, kind: step.kind },
                }));
            }

            setTimeout(tick, speedRef.current);
        };

        tick();
    }, [currentBoard, setCurrentBoard, solvingState.active]);

    const cancel = useCallback(() => {
        cancelRef.current = true;
    }, []);

    const setSpeed = useCallback((speedMs: number) => {
        speedRef.current = speedMs;
        setSolvingState(prev => ({ ...prev, speedMs }));
    }, []);

    return { solvingState, start, cancel, setSpeed, reset };
}

// ---------------------------------------------------------------------------
// useSudoku — public hook
// ---------------------------------------------------------------------------

export function useSudoku() {
    const board = useSudokuBoard();
    const selection = useCellSelection(board.currentBoard);
    const animation = useSolveAnimation(board.currentBoard, board.setCurrentBoard);

    useEffect(() => {
        if (board.currentBoard) {
            selection.clearSelection();
            animation.reset();
        }
        // We only want to reset selection + animation when a NEW puzzle arrives,
        // which is signalled by the board being replaced wholesale (not on
        // every cell edit). Watching board.solvedBoard captures that without
        // triggering on user edits.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board.solvedBoard]);

    const updateCell = useCallback((row: number, col: number, value: string) => {
        if (animation.solvingState.active) return;
        if (!board.isEditable(row, col)) return;
        board.setCellValue(row, col, value);
    }, [animation.solvingState.active, board]);

    const selectCell = useCallback((row: number, col: number) => {
        if (animation.solvingState.active) return;
        selection.selectCell(row, col);
    }, [animation.solvingState.active, selection]);

    const giveHint = useCallback(() => {
        if (animation.solvingState.active) return;

        const empty = findEmptyCells(board.currentBoard);
        if (empty.length === 0) {
            toastService.info('No empty cells to hint');
            return;
        }

        const target = empty[Math.floor(Math.random() * empty.length)];
        const hintValue = board.solvedBoard[target.row][target.col];

        board.setCellValue(target.row, target.col, String(hintValue));
        selection.selectCell(target.row, target.col);
    }, [animation.solvingState.active, board, selection]);

    const solvePuzzle = useCallback(() => {
        selection.clearSelection();
        animation.start();
    }, [animation, selection]);

    return {
        board: board.currentBoard,
        selectedCell: selection.selectedCell,
        peerCells: selection.peerCells,
        sameNumberCells: selection.sameNumberCells,
        conflictCells: board.conflictCells,
        solvingState: animation.solvingState,
        isComplete: board.isComplete,
        isLoading: board.isLoading,
        error: board.error,

        updateCell,
        selectCell,
        giveHint,
        solvePuzzle,
        cancelSolve: animation.cancel,
        setSolveSpeed: animation.setSpeed,
        newGame: board.newGame,
        isEditable: board.isEditable,
    };
}