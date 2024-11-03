import React, { useCallback, useEffect, useState } from 'react';
import { useTheme, Snackbar, CircularProgress } from '@mui/joy';
import { BgCenteredBox } from '@/shared/components/BgCenteredBox';
import { Controls } from '@/components/Sudoku/Controls';
import { GameBoard } from '@/components/Sudoku/Gameboard';
import { deepCopy, fetchInitialBoard, isValid, solveBoard } from '@/components/Sudoku/helpers';

const darkBg = '/backgrounds/abstract-dark.webp';
const lightBg = '/backgrounds/abstract.webp';

type Board = number[][];

type SnackbarState = {
    open: boolean;
    message: string;
    color: 'danger' | 'warning' | 'success';
};

const loadingStyles = {
    circularProgress: {
        my: 2,
        "--CircularProgress-size": "120px",
        "--CircularProgress-trackThickness": "12px",
        "--CircularProgress-progressThickness": "12px"
    }
};

const SudokuBoard: React.FC = () => {
    const [board, setBoard] = useState<Board>([]);
    const [initialBoard, setInitialBoard] = useState<Board>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        color: 'success'
    });

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const showSnackbar = (message: string, color: 'danger' | 'warning' | 'success') => {
        setSnackbar({
            open: true,
            message,
            color
        });
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const fetchBoard = useCallback(async () => {
        setLoading(true);
        try {
            const initialBoard = await fetchInitialBoard();
            setBoard(deepCopy(initialBoard));
            setInitialBoard(initialBoard);
        } catch (error) {
            console.error('Error fetching the board:', error);
            showSnackbar('Error fetching the board', 'danger');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoard();
    }, [fetchBoard]);

    const giveHint = useCallback(() => {
        if (board.length === 0) return;

        let emptyCellCount = 0;
        let selectedCell = null;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    emptyCellCount++;
                    if (Math.random() < 1 / emptyCellCount) {
                        selectedCell = { row, col };
                    }
                }
            }
        }

        if (!selectedCell) return;

        const solvedBoard = solveBoard(initialBoard);
        const newBoard = deepCopy(board);
        newBoard[selectedCell.row][selectedCell.col] = solvedBoard[selectedCell.row][selectedCell.col];
        setBoard(newBoard);
        showSnackbar('Hint provided!', 'success');
    }, [board, initialBoard]);

    const handleChange = useCallback((row: number, col: number, value: string) => {
        const number = Number(value) || 0;

        if (number >= 1 && number <= 9) {
            if (!isValid(board, row, col, number)) {
                showSnackbar('Invalid Move', 'danger');
            } else {
                setBoard(prevBoard => {
                    const newBoard = [...prevBoard];
                    newBoard[row][col] = number;
                    return newBoard;
                });
            }
        } else if (value !== '') {
            showSnackbar('Value must be between 1 and 9', 'warning');
        }
    }, [board]);

    const handleSolve = () => {
        const solvedBoard = solveBoard(initialBoard);
        setBoard(solvedBoard);
        setInitialBoard(solvedBoard);
        showSnackbar('Puzzle solved!', 'success');
    };

    if (loading) {
        return (
            <BgCenteredBox bg={isDark ? darkBg : lightBg}>
                <CircularProgress
                    color="danger"
                    size="lg"
                    value={64}
                    sx={loadingStyles.circularProgress}
                />
            </BgCenteredBox>
        );
    }

    return (
        <BgCenteredBox bg={isDark ? darkBg : lightBg}>
            <Controls
                onNew={fetchBoard}
                onHint={giveHint}
                onSolve={handleSolve}
            />
            <GameBoard
                board={board}
                initialBoard={initialBoard}
                onCellChange={handleChange}
            />
            <Snackbar
                variant="solid"
                color={snackbar.color}
                autoHideDuration={3000}
                open={snackbar.open}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                {snackbar.message}
            </Snackbar>
        </BgCenteredBox>
    );
};

export default SudokuBoard;