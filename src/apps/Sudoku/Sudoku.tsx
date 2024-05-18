import { useEffect, useState } from 'react';
import Background from '../../assets/sudoku.png';
import { Box, Grid, Typography, Button, Input, Stack, Sheet, Divider } from '@mui/joy';
import { fetchInitialBoard, solveBoard } from './helpers';

const deepCopy = (arr: number[][]) => JSON.parse(JSON.stringify(arr));

const SudokuBoard = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBoard = async () => {
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
        console.log(initialBoard, initialBoard[row][col], value)
        const newBoard = [...board];
        newBoard[row][col] = parseInt(value) || 0;
        setBoard(newBoard);
    };

    const handleSolve = () => {
        const solvedBoard = solveBoard(board);
        setBoard(solvedBoard);
        setInitialBoard(solvedBoard)
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 53px)',
                padding: 2,
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Stack component={Sheet} direction='row' spacing={1} alignItems='center' sx={{ my: 2, p: 1, borderRadius: 'md' }}>
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
        </Box>
    );
};

export default SudokuBoard;
