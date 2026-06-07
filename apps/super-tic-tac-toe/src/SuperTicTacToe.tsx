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
import { Smartphone } from 'lucide-react';

const SuperTicTacToe = () => {
    const [boards, setBoards] = useState<string[][][][]>(createSuperBoard());
    const [winners, setWinners] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [nextBoard, setNextBoard] = useState<string | null>(null);
    const [gameWinner, setGameWinner] = useState<string | null>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(TIMEOUT);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!gameStarted || gameWinner) return;

        if (timer === 0) {
            const move = makeRandomMove(boards, winners, nextBoard);
            if (move) {
                const { bIndex, rIndex, cIndex } = move;
                handlePlay(bIndex, rIndex, cIndex);
            }
            setTimer(TIMEOUT);
            return;
        }

        timeoutRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [timer, gameWinner, gameStarted, boards, winners, nextBoard]);

    const handleStartGame = () => setGameStarted(true);

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
                    ? board.map((row, r) =>
                        row.map((cell, c) =>
                            r === rowIndex && c === colIndex && cell === ' ' ? currentPlayer : cell
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

    const renderSuperBoard = () => {
        const cells: React.ReactNode[] = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const winner = winners[i][j];
                const isPlayable = !gameWinner && (!nextBoard || nextBoard === `${i}-${j}`) && !winner;
                const pulseClass = isPlayable
                    ? currentPlayer === 'X' ? 'pulse-active-x' : 'pulse-active-o'
                    : '';

                const cellNode = winner ? (
                    <div key={`cell-${i}-${j}`} className="relative flex items-center justify-center">
                        <span
                            className={`symbol-in select-none font-bold leading-none text-[clamp(2.5rem,8vw,5rem)]
                                ${winner === 'X' ? 'text-x-500' : 'text-o-500'}
                            `}
                        >
                            {winner}
                        </span>
                    </div>
                ) : (
                    <div key={`cell-${i}-${j}`} className={`relative ${pulseClass}`}>
                        <MiniBoard
                            board={boards[i][j]}
                            onPlay={handlePlay}
                            boardIndex={`${i}-${j}`}
                            isPlayable={isPlayable}
                            currentPlayer={currentPlayer}
                        />
                    </div>
                );

                cells.push(cellNode);

                // Vertical dividers (after col 0 and col 1)
                if (j < 2) {
                    cells.push(
                        <div key={`v-${i}-${j}`} className="board-line-v" />
                    );
                }
            }

            // Horizontal dividers (after row 0 and row 1)
            if (i < 2) {
                for (let k = 0; k < 5; k++) {
                    cells.push(
                        <div key={`h-${i}-${k}`} className={k % 2 === 0 ? 'board-line-h' : ''} />
                    );
                }
            }
        }

        return cells;
    };

    return (
        <>
            <StartGamePopup isOpen={!gameStarted} onStart={handleStartGame} />

            {/* Portrait / small screen gate */}
            <div className="landscape-gate fixed inset-0 z-40 flex-col items-center justify-center gap-4 bg-[#F4F4F7] px-8 text-center">
                <Smartphone size={40} className="text-slate-400" />
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    Rotate your device to landscape<br />for the best experience.
                </p>
            </div>

            {/* Main game — landscape only */}
            <div className="game-root fixed inset-0 items-stretch overflow-hidden">

                {/* Header bar */}
                <header className="absolute top-0 left-0 right-0 flex items-center px-4 sm:px-6 py-2 z-10">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">
                        Super Tic-Tac-Toe
                    </span>
                </header>

                {/* Content: board left, panel right */}
                <div className="flex h-full w-full items-center justify-center gap-12 px-6 sm:px-10 lg:px-16 pt-8 pb-4">

                    {/* Super board */}
                    <div className="shrink-0 flex items-center justify-center">
                        <div
                            className="board-grid"
                            style={{
                                width: 'min(76vh, 62vw)',
                                height: 'min(76vh, 62vw)',
                            }}
                        >
                            {renderSuperBoard()}
                        </div>
                    </div>

                    {/* Right panel */}
                    <div className="shrink-0 w-56 sm:w-64 lg:w-72 h-full">
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
