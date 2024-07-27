import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Input, Stack, Sheet, Divider, CircularProgress, useTheme } from '@mui/joy';
import { deepCopy, fetchInitialBoard, isValid, solveBoard } from './helpers';
import { BgCenteredBox } from '../../components/BgCenteredBox';
import { useAlert } from '../../shared/AlertProvider';
import DarkBg from '../../assets/backgrounds/abstract-dark.webp';
import LightBg from '../../assets/backgrounds/abstract.webp'


const SudokuBoard = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const { showAlert } = useAlert();

    const fetchBoard = async () => {
        setLoading(true);
        try {
            const initialBoard = await fetchInitialBoard();
            setBoard(deepCopy(initialBoard));
            setInitialBoard(initialBoard);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching the board:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBoard();
    }, []);


    const handleChange = (row: number, col: number, value: string) => {
        const number = Number(value) || 0;

        if (number >= 0 && number <= 9) {
            if (number > 0 && !isValid(board, row, col, number)) {
                showAlert('danger', 'Invalid Move')
            } else {
                const newBoard = [...board];
                newBoard[row][col] = number;
                setBoard(newBoard);
            }
        } else {
            showAlert('danger', 'Value out of bounds')
        }
    };

    const handleSolve = () => {
        const solvedBoard = solveBoard(initialBoard);
        setBoard(solvedBoard);
        setInitialBoard(solvedBoard)
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
        )
    }

    return (
        <BgCenteredBox bg={isDark ? DarkBg : LightBg}>
            <Stack component={Sheet} variant='outlined' direction='row' spacing={1} alignItems='center' sx={{ my: 2, p: 1, borderRadius: 'md' }}>
                <Typography level="h4" component="h1" gutterBottom>
                    Sudoku Solver
                </Typography>
                <Divider orientation='vertical' />
                <Button size='sm' onClick={fetchBoard}>New</Button>
                <Button size='sm' color='success' onClick={handleSolve} sx={{ marginTop: 2 }}>Solve</Button>
            </Stack>
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
                        {row.map((cell, colIndex) => (
                            <Grid key={`${rowIndex}-${colIndex}`}>
                                {!initialBoard[rowIndex][colIndex] ? (
                                    <Input
                                        type="number"
                                        slotProps={{
                                            input: {
                                                min: 1,
                                                max: 9,
                                                step: 1,
                                            },
                                        }}
                                        value={board[rowIndex][colIndex] === 0 ? '' : board[rowIndex][colIndex]}
                                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                        sx={{
                                            width: 40, height: 40, textAlign: 'center', padding: 0,
                                            '& input[type=number]': {
                                                MozAppearance: 'textfield',
                                                textAlign: 'center',
                                                padding: 0,
                                            },
                                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                WebkitAppearance: 'none',
                                                margin: 0,
                                            },
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'grey.300',
                                            borderRadius: 'sm',
                                            textAlign: 'center',
                                            border: '1px solid'
                                        }}
                                    >
                                        {cell}
                                    </Box>
                                )}
                            </Grid>
                        ))}
                    </Stack>
                ))}
            </Sheet>
        </BgCenteredBox>
    );
};

export default SudokuBoard;
