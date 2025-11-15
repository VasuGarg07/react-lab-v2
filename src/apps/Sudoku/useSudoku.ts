import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  deepCopy,
  isValid,
  solveBoard,
  isBoardComplete,
  findEmptyCells
} from './sudoku.utils';
import { SUDOKU_API_URL, QUERY_CONFIG, MIN_VALUE, MAX_VALUE } from './sudoku.constants';
import { toastService } from '../../shared/toastr';

interface SelectedCell {
  row: number;
  col: number;
}

/**
 * Custom hook for fetching Sudoku boards from API
 */
const useSudokuAPI = () => {
  const queryClient = useQueryClient();

  const fetchSudokuBoard = async (): Promise<number[][]> => {
    const response = await fetch(SUDOKU_API_URL);

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
    ...QUERY_CONFIG,
  });

  const newGame = () => {
    queryClient.invalidateQueries({ queryKey: ['sudoku-board'] });
  };

  return {
    ...boardQuery,
    newGame,
  };
};

/**
 * Main Sudoku game hook
 */
export function useSudoku() {
  const { data: initialBoard, isLoading, error, newGame } = useSudokuAPI();

  const [currentBoard, setCurrentBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize board when data is fetched
  useEffect(() => {
    if (initialBoard) {
      setCurrentBoard(deepCopy(initialBoard));
      setIsComplete(false);
      setSelectedCell(null);
    }
  }, [initialBoard]);

  const solvedBoard = initialBoard ? solveBoard(initialBoard) : [];

  const updateCell = (row: number, col: number, value: string) => {
    if (!initialBoard) return;

    const numValue = Number(value);

    if (value === '') {
      const newBoard = deepCopy(currentBoard);
      newBoard[row][col] = 0;
      setCurrentBoard(newBoard);
      setIsComplete(false);
      return;
    }

    if (numValue < MIN_VALUE || numValue > MAX_VALUE) {
      toastService.error("Value must be between 1 and 9");
      return;
    }

    if (!isValid(currentBoard, row, col, numValue)) {
      // toastService.error("Invalid move - number already exists in row, column, or box");
      return;
    }

    const newBoard = deepCopy(currentBoard);
    newBoard[row][col] = numValue;
    setCurrentBoard(newBoard);
    setIsComplete(isBoardComplete(newBoard));
  };

  const selectCell = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const giveHint = () => {
    if (!initialBoard || currentBoard.length === 0) return;

    const emptyCells = findEmptyCells(currentBoard);

    if (emptyCells.length === 0) {
      toastService.info("No empty cells for hints!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    const hintValue = solvedBoard[row][col];

    const newBoard = deepCopy(currentBoard);
    newBoard[row][col] = hintValue;
    setCurrentBoard(newBoard);
    setSelectedCell({ row, col });
    setIsComplete(isBoardComplete(newBoard));
  };

  const solvePuzzle = () => {
    if (!initialBoard) return;

    setCurrentBoard(deepCopy(solvedBoard));
    setIsComplete(true);
  };

  const isEditable = (row: number, col: number): boolean => {
    return initialBoard ? !initialBoard[row][col] : false;
  };

  return {
    // State
    board: currentBoard,
    selectedCell,
    isComplete,
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
}