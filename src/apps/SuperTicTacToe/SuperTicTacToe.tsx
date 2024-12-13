import { Box, Card, Grid, useTheme } from '@mui/joy';
import React, { useEffect, useRef, useState } from 'react';
import { BgCenteredBox } from '../../components/BgCenteredBox';
import MiniBoard from './MiniBoard';
import Sidebar from './Sidebar';
import StartGamePopup from './StartGamePopup';
import { BoxShadow, checkWinner, COLOR_O, COLOR_X, createEmptyBoard, createSuperBoard, InsetBoxShadow, Instructions, makeRandomMove, REM, SQ_SIZE, Timeout } from './helpers';
import DarkBg from '/backgrounds/abstract-dark.webp';
import LightBg from '/backgrounds/abstract.webp';

const SuperTicTacToe: React.FC = () => {
    const [boards, setBoards] = useState<string[][][][]>(createSuperBoard());
    const [winners, setWinners] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [nextBoard, setNextBoard] = useState<string | null>(null);
    const [gameWinner, setGameWinner] = useState<string | null>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(Timeout);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isDark = useTheme().palette.mode === 'dark';

    useEffect(() => {
        if (!gameStarted) return;
        if (gameWinner) return; // Stop timer if the game is over
        if (timer === 0) {
            const move = makeRandomMove(boards, winners, nextBoard);
            if (move) {
                const { bIndex, rIndex, cIndex } = move;
                handlePlay(bIndex, rIndex, cIndex)
            }
            setTimer(Timeout); // Reset timer for the next player
        }
        timeoutRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [timer, gameWinner, gameStarted]);

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const handleRestartGame = () => {
        setBoards(Array(3).fill(null).map(() => Array(3).fill(null).map(createEmptyBoard)));
        setWinners(Array(3).fill(null).map(() => Array(3).fill(null)));
        setCurrentPlayer('X');
        setNextBoard(null);
        setGameWinner(null);
        setTimer(10); // Reset timer
        setGameStarted(false); // Show the popup again
    };


    const handlePlay = (boardIndex: string, rowIndex: number, colIndex: number) => {
        const [bigRow, bigCol] = boardIndex.split('-').map(Number);

        // Return early if the game has a winner, the board is already won, or it's not the turn for this board
        if (gameWinner || winners[bigRow][bigCol] || (nextBoard && nextBoard !== `${bigRow}-${bigCol}`)) return;

        // Update the boards with the new move
        const newBoards = boards.map((boardRow, i) =>
            boardRow.map((board, j) =>
                i === bigRow && j === bigCol
                    ? board.map((boardRow, row) =>
                        boardRow.map((cell, col) =>
                            row === rowIndex && col === colIndex && cell === ' ' ? currentPlayer : cell
                        )
                    )
                    : board
            )
        );

        // Check for a winner in the updated board
        const boardWinner = checkWinner(newBoards[bigRow][bigCol]);

        // Update the winners with the new board winner
        const newWinners = winners.map((winnerRow, i) =>
            winnerRow.map((winner, j) => (i === bigRow && j === bigCol ? boardWinner : winner))
        );

        // Check for a winner in the overall game
        const superWinner = checkWinner(newWinners as string[][]);

        // Update state with new values
        setBoards(newBoards);
        setWinners(newWinners);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setNextBoard(newWinners[rowIndex][colIndex] ? null : `${rowIndex}-${colIndex}`);
        setGameWinner(superWinner);
        setTimer(Timeout); // Reset timer for the next player
    };

    const renderBoard = (bigRow: number, bigCol: number) => {
        let cell = winners[bigRow][bigCol];
        if (cell === 'X') {
            return (
                <Grid xs={4} key={`${bigRow}-${bigCol}`}>
                    <Box
                        sx={{
                            boxShadow: BoxShadow,
                            padding: 2,
                            borderRadius: 16,
                            backdropFilter: 'blur(16px)',
                        }}
                    >
                        <Card
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                color: COLOR_X,
                                width: (3 * SQ_SIZE) + (2 * REM),
                                height: (3 * SQ_SIZE) + (2 * REM),
                                fontSize: '8rem',
                                borderRadius: 'lg',
                                userSelect: 'none',
                            }}
                        >
                            {cell}
                        </Card>
                    </Box>
                </Grid>
            )
        }

        if (cell === 'O') {
            return (
                <Grid xs={4} key={`${bigRow}-${bigCol}`}>
                    <Box
                        sx={{
                            boxShadow: BoxShadow,
                            padding: 2,
                            borderRadius: 16,
                            backdropFilter: 'blur(16px)',
                        }}
                    >
                        <Card
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                color: COLOR_O,
                                width: (3 * SQ_SIZE) + (2 * REM),
                                height: (3 * SQ_SIZE) + (2 * REM),
                                fontSize: '8rem',
                                borderRadius: 'lg',
                                userSelect: 'none',
                            }}
                        >
                            {cell}
                        </Card>
                    </Box>
                </Grid>
            )
        }

        const isPlayable = !gameWinner && (!nextBoard || nextBoard === `${bigRow}-${bigCol}`);

        return (
            <Grid xs={4} key={`${bigRow}-${bigCol}`}>
                <Box
                    sx={{
                        boxShadow: BoxShadow,
                        padding: 2,
                        borderRadius: 16,
                        background: isPlayable ? 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)' : 'transparent',
                    }}
                >
                    <MiniBoard
                        board={boards[bigRow][bigCol]}
                        onPlay={handlePlay}
                        boardIndex={`${bigRow}-${bigCol}`}
                    />
                </Box>
            </Grid>
        )
    };


    return (
        <BgCenteredBox bg={isDark ? DarkBg : LightBg}>
            <StartGamePopup open={!gameStarted} onStart={handleStartGame} />
            <Grid container spacing={4} width={1}>
                <Grid>
                    <Grid container spacing={2} justifyContent="center"
                        sx={{
                            boxShadow: InsetBoxShadow,
                            padding: 2,
                            borderRadius: 24,
                            width: 15 * SQ_SIZE,
                            height: 15 * SQ_SIZE,
                            margin: 'auto'
                        }}>
                        {Array(3)
                            .fill(null)
                            .map((_, i) =>
                                Array(3)
                                    .fill(null)
                                    .map((_, j) => renderBoard(i, j))
                            )}
                    </Grid>
                </Grid>
                <Grid flex={1} p={2}>
                    <Sidebar
                        gameWinner={gameWinner}
                        currentPlayer={currentPlayer}
                        timer={timer}
                        handleRestartGame={handleRestartGame}
                        Instructions={Instructions}
                        COLOR_X={COLOR_X}
                        COLOR_O={COLOR_O}
                    />

                </Grid>
            </Grid>
        </BgCenteredBox>
    );
};



export default SuperTicTacToe;
