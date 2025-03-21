import MiniBoard from '@/apps/SuperTicTacToe/MiniBoard';
import Sidebar from '@/apps/SuperTicTacToe/Sidebar';
import StartGamePopup from '@/apps/SuperTicTacToe/StartGamePopup';
import {
    checkWinner,
    COLOR_O,
    COLOR_X,
    createEmptyBoard,
    createSuperBoard,
    makeRandomMove,
    TIMEOUT
} from '@/apps/SuperTicTacToe/tictactoe.helpers';
import React, { useEffect, useRef, useState } from 'react';

const SuperTicTacToe: React.FC = () => {
    const [boards, setBoards] = useState<string[][][][]>(createSuperBoard());
    const [winners, setWinners] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [nextBoard, setNextBoard] = useState<string | null>(null);
    const [gameWinner, setGameWinner] = useState<string | null>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(TIMEOUT);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!gameStarted) return;
        if (gameWinner) return; // Stop timer if the game is over

        if (timer === 0) {
            const move = makeRandomMove(boards, winners, nextBoard);
            if (move) {
                const { bIndex, rIndex, cIndex } = move;
                handlePlay(bIndex, rIndex, cIndex);
            }
            setTimer(TIMEOUT); // Reset timer for the next player
        }

        timeoutRef.current = setTimeout(() => setTimer(timer - 1), 1000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [timer, gameWinner, gameStarted, boards, winners, nextBoard]);

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
        setTimer(TIMEOUT); // Reset timer for the next player
    };

    const renderBoard = (bigRow: number, bigCol: number) => {
        const cell = winners[bigRow][bigCol];

        // If this mini-board has been won by X or O
        if (cell === 'X' || cell === 'O') {
            return (
                <div key={`${bigRow}-${bigCol}`} className="flex-1 p-1.5">
                    <div className="rounded-xl p-4 shadow-sm dark:shadow-lg backdrop-blur-md bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex items-center justify-center w-full aspect-square rounded-lg text-8xl font-bold select-none"
                            style={{ color: cell === 'X' ? COLOR_X : COLOR_O }}
                        >
                            {cell}
                        </div>
                    </div>
                </div>
            );
        }

        // If this mini-board is still playable
        const isPlayable = !gameWinner && (!nextBoard || nextBoard === `${bigRow}-${bigCol}`);

        return (
            <div key={`${bigRow}-${bigCol}`} className="flex-1 p-1.5">
                <div className={`rounded-xl p-4 shadow-sm dark:shadow-lg backdrop-blur-sm flex items-center justify-center h-full ${isPlayable
                    ? 'bg-gradient-to-t from-amber-300/80 to-amber-100/80 dark:from-violet-700/40 dark:to-violet-600/40 border-amber-200/70 dark:border-violet-500/50'
                    : 'bg-neutral-100 dark:bg-neutral-800'
                    }`}>
                    <MiniBoard
                        board={boards[bigRow][bigCol]}
                        onPlay={handlePlay}
                        boardIndex={`${bigRow}-${bigCol}`}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background elements similar to AuthWrapper */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black z-0" />

            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl z-0" />
            <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-pink-400/20 dark:bg-pink-600/15 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-1/4 right-1/6 w-60 h-60 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl z-0" />

            {/* Game content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-6">
                <StartGamePopup isOpen={!gameStarted} onStart={handleStartGame} />

                <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start">
                    {/* Game board */}
                    <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
                        <div className="bg-gradient-to-br from-emarald-300 via-green-200 to-lime-100 dark:from-blue-950/70 dark:via-indigo-950/70 dark:to-purple-950/70 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-indigo-100/50 dark:border-indigo-800/30">
                            <div className="grid grid-cols-3 gap-2 w-full aspect-square relative">
                                {/* Subtle decorative elements */}
                                <div className="absolute -z-10 top-1/4 -left-6 w-12 h-12 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-xl"></div>
                                <div className="absolute -z-10 bottom-1/3 -right-6 w-16 h-16 bg-violet-300/30 dark:bg-violet-500/20 rounded-full blur-xl"></div>

                                {Array(3).fill(null).map((_, i) =>
                                    Array(3).fill(null).map((_, j) => renderBoard(i, j))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full max-w-sm">
                        <Sidebar
                            gameWinner={gameWinner}
                            currentPlayer={currentPlayer}
                            timer={timer}
                            handleRestartGame={handleRestartGame}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperTicTacToe;