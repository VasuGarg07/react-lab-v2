import { useEffect, useRef, useState } from 'react';
import {
    checkWinner,
    createEmptyBoard,
    createSuperBoard,
    makeRandomMove,
    TIMEOUT
} from './ttt.helpers';
import MiniBoard from './Miniboard';
import StartGamePopup from './StartGamePopup';
import GameInstructions from './GameInstructions';

const SuperTicTacToe = () => {
    const [boards, setBoards] = useState<string[][][][]>(createSuperBoard());
    const [winners, setWinners] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [nextBoard, setNextBoard] = useState<string | null>(null);
    const [gameWinner, setGameWinner] = useState<string | null>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(TIMEOUT);
    const timeoutRef = useRef<any | null>(null);

    useEffect(() => {
        if (!gameStarted) return;
        if (gameWinner) return;

        if (timer === 0) {
            const move = makeRandomMove(boards, winners, nextBoard);
            if (move) {
                const { bIndex, rIndex, cIndex } = move;
                handlePlay(bIndex, rIndex, cIndex);
            }
            setTimer(TIMEOUT);
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
        setTimer(TIMEOUT);
        setGameStarted(false);
    };

    const handlePlay = (boardIndex: string, rowIndex: number, colIndex: number) => {
        const [bigRow, bigCol] = boardIndex.split('-').map(Number);

        if (gameWinner || winners[bigRow][bigCol] || (nextBoard && nextBoard !== `${bigRow}-${bigCol}`)) return;

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

        const boardWinner = checkWinner(newBoards[bigRow][bigCol]);

        const newWinners = winners.map((winnerRow, i) =>
            winnerRow.map((winner, j) => (i === bigRow && j === bigCol ? boardWinner : winner))
        );

        const superWinner = checkWinner(newWinners as string[][]);

        setBoards(newBoards);
        setWinners(newWinners);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setNextBoard(newWinners[rowIndex][colIndex] ? null : `${rowIndex}-${colIndex}`);
        setGameWinner(superWinner);
        setTimer(TIMEOUT);
    };

    const renderBoard = (bigRow: number, bigCol: number) => {
        const cell = winners[bigRow][bigCol];

        // Won board - show large X or O
        if (cell === 'X' || cell === 'O') {
            return (
                <div key={`${bigRow}-${bigCol}`} className="aspect-square p-1">
                    <div className={`
                        rounded-lg flex items-center justify-center w-full h-full
                        ${cell === 'X'
                            ? 'bg-red-100 dark:bg-red-950/50 border-2 border-red-300 dark:border-red-800'
                            : 'bg-blue-100 dark:bg-blue-950/50 border-2 border-blue-300 dark:border-blue-800'
                        }
                    `}>
                        <span className={`
                            text-6xl sm:text-7xl md:text-8xl font-bold
                            ${cell === 'X' ? 'text-red-500' : 'text-blue-500'}
                        `}>
                            {cell}
                        </span>
                    </div>
                </div>
            );
        }

        // Active/playable board
        const isPlayable = !gameWinner && (!nextBoard || nextBoard === `${bigRow}-${bigCol}`);

        return (
            <div key={`${bigRow}-${bigCol}`} className="aspect-square p-1">
                <div className={`
                    rounded-lg p-2 sm:p-3 h-full
                    transition-all duration-200
                    ${isPlayable
                        ? 'bg-violet-50 dark:bg-neutral-900 border-2 border-violet-300 dark:border-violet-800 shadow-sm'
                        : 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'
                    }
                `}>
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
        <>
            <StartGamePopup isOpen={!gameStarted} onStart={handleStartGame} />

            {/* Small screen warning - hidden on sm and above */}
            <div className="block sm:hidden w-full p-4">
                <div className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                        Please view on a larger screen (640px+) for the best experience.
                    </p>
                </div>
            </div>

            {/* Main game - hidden below sm */}
            <div className="hidden sm:flex w-full max-w-7xl mx-auto p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">

                    {/* Game Board */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-2xl">
                            <div className="bg-white dark:bg-neutral-800 rounded-xl p-3 sm:p-4 shadow-md border border-neutral-200 dark:border-neutral-700">
                                <div className="grid grid-cols-3 gap-2 w-full aspect-square">
                                    {Array(3).fill(null).map((_, i) =>
                                        Array(3).fill(null).map((_, j) => renderBoard(i, j))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 lg:shrink-0">
                        <GameInstructions
                            gameWinner={gameWinner}
                            currentPlayer={currentPlayer}
                            timer={timer}
                            handleRestartGame={handleRestartGame}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuperTicTacToe;