import { Box, CircularProgress, Grid, Input, Sheet, Stack, useTheme } from '@mui/joy';
import React, { useCallback, useEffect, useState } from 'react';
import { BgCenteredBox } from '../../components/BgCenteredBox';
import { useAlert } from '../../shared/AlertProvider';
import { deepCopy, fetchInitialBoard, isValid, solveBoard } from './helpers';
import SudokuHeader from './SudokuHeader';
import DarkBg from '/backgrounds/abstract-dark.webp';
import LightBg from '/backgrounds/abstract.webp';

const inputStyles = {
    width: 40,
    height: 40,
    textAlign: 'center',
    padding: 0,
    '& input[type=number]': {
        MozAppearance: 'textfield',
        textAlign: 'center',
        padding: 0,
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
};

const boxStyles = {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey.300',
    borderRadius: 'sm',
    textAlign: 'center',
    border: '1px solid',
};

const GridCell = React.memo(({ cell, onChange, editable }: { cell: number, onChange: any, editable: boolean }) => (
    editable ? (
        <Input
            type="number"
            value={cell === 0 ? '' : cell}
            onChange={onChange}
            sx={inputStyles}
        />
    ) : (
        <Box sx={boxStyles}>
            {cell}
        </Box>
    )
));


const SudokuBoard: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const { alert: showAlert } = useAlert();

    const fetchBoard = useCallback(async () => {
        setLoading(true);
        try {
            const initialBoard = await fetchInitialBoard();
            setBoard(deepCopy(initialBoard));
            setInitialBoard(initialBoard);
        } catch (error) {
            console.error('Error fetching the board:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoard(); // Dependency array is empty because `fetchBoard` is memoized and doesn't change.
    }, [fetchBoard]);

    const giveHint = useCallback(() => {
        if (board.length === 0) return;

        let emptyCellCount = 0;
        let selectedCell = null;

        // Loop through the board to find and randomly select an empty cell
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    emptyCellCount++;
                    // Randomly select this cell with probability 1/emptyCellCount
                    if (Math.random() < 1 / emptyCellCount) {
                        selectedCell = { row, col };
                    }
                }
            }
        }

        if (!selectedCell) return; // No empty cells to give a hint

        // Solve the board to get the solution only after selecting the cell
        const solvedBoard = solveBoard(initialBoard);

        // Update the board with the hint
        const newBoard = deepCopy(board);
        newBoard[selectedCell.row][selectedCell.col] = solvedBoard[selectedCell.row][selectedCell.col];
        setBoard(newBoard);
    }, [board, initialBoard]);

    const handleChange = useCallback((row: number, col: number, value: string) => {
        const number = Number(value) || 0;

        if (number >= 1 && number <= 9) {
            if (!isValid(board, row, col, number)) {
                showAlert('Invalid Move', 'danger');
            } else {
                setBoard(prevBoard => {
                    const newBoard = [...prevBoard];
                    newBoard[row][col] = number;
                    return newBoard;
                });
            }
        } else {
            showAlert('Value out of bounds', 'warning');
        }
    }, [board, showAlert]);

    const handleSolve = () => {
        const solvedBoard = solveBoard(initialBoard);
        setBoard(solvedBoard);
        setInitialBoard(solvedBoard);
    };

    if (loading) {
        return (
            <BgCenteredBox bg={isDark ? DarkBg : LightBg}>
                <CircularProgress
                    color="danger"
                    size="lg"
                    value={64}
                    sx={{
                        my: 2,
                        "--CircularProgress-size": "120px",
                        "--CircularProgress-trackThickness": "12px",
                        "--CircularProgress-progressThickness": "12px"
                    }} />
            </BgCenteredBox>
        );
    }

    return (
        <BgCenteredBox bg={isDark ? DarkBg : LightBg}>
            <SudokuHeader
                onNewGame={fetchBoard}
                onHint={giveHint}
                onSolve={handleSolve}
            />
            <Sheet
                color='neutral'
                variant='outlined'
                sx={{
                    borderRadius: 'md',
                    boxShadow: 'lg',
                    p: 2,
                }}>
                {board.map((row, rowIndex) => (
                    <Stack key={rowIndex} spacing={1} sx={{ mb: 1 }} direction='row' alignItems='center' justifyContent='center'>
                        {row.map((_, colIndex) => (
                            <Grid key={`${rowIndex}-${colIndex}`}>
                                <GridCell
                                    cell={board[rowIndex][colIndex]}
                                    onChange={(e: any) => handleChange(rowIndex, colIndex, e.target.value)}
                                    editable={!initialBoard[rowIndex][colIndex]}
                                />
                            </Grid>
                        ))}
                    </Stack>
                ))}
            </Sheet>
        </BgCenteredBox>
    );
};

export default SudokuBoard;
