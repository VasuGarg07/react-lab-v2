import { useEffect } from 'react';
import { SUDOKU_SIZE } from './sudoku.constants';
import { useSudoku } from './useSudoku';
import { SudokuHeader } from './SudokuHeader';
import { SudokuBoard } from './SudokuBoard';
import { SudokuFooter } from './SudokuFooter';
import { CompletionBanner, ErrorScreen, LoadingScreen } from './SudokuScreens';
import VirtualNumpad from './VirtualNumpad';

const ARROW_DELTAS: Record<string, [number, number]> = {
    ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1],
};
const CLEAR_KEYS = new Set(['Backspace', 'Delete', '0', ' ']);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function Sudoku() {
    const sudoku = useSudoku();

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!sudoku.selectedCell || sudoku.solvingState.active) return;
            const { row, col } = sudoku.selectedCell;
            const delta = ARROW_DELTAS[e.key];
            if (delta) {
                const nr = clamp(row + delta[0], 0, SUDOKU_SIZE - 1);
                const nc = clamp(col + delta[1], 0, SUDOKU_SIZE - 1);
                if (nr !== row || nc !== col) { sudoku.selectCell(nr, nc); e.preventDefault(); }
                return;
            }
            if (!sudoku.isEditable(row, col)) return;
            if (/^[1-9]$/.test(e.key)) { sudoku.updateCell(row, col, e.key); return; }
            if (CLEAR_KEYS.has(e.key)) sudoku.updateCell(row, col, '');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [sudoku]);

    if (sudoku.error) return <ErrorScreen message={(sudoku.error as Error).message} onRetry={sudoku.newGame} />;
    if (sudoku.isLoading) return <LoadingScreen />;

    return (
        <div className="h-dvh w-full flex flex-col" style={{ backgroundColor: '#F9F9ED' }}>
            <SudokuHeader
                isSolving={sudoku.solvingState.active}
                onHint={sudoku.giveHint}
                onSolve={sudoku.solvePuzzle}
                onNewGame={sudoku.newGame}
                onCancelSolve={sudoku.cancelSolve}
                onSpeedChange={sudoku.setSolveSpeed}
            />

            {sudoku.isComplete && !sudoku.solvingState.active && <CompletionBanner />}

            <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full" style={{ maxWidth: 'min(560px, calc(100vh - 160px))' }}>
                    <SudokuBoard sudoku={sudoku} />
                </div>
            </div>

            <VirtualNumpad
                onNumberSelect={(num) => {
                    if (!sudoku.selectedCell) return;
                    sudoku.updateCell(sudoku.selectedCell.row, sudoku.selectedCell.col, String(num));
                }}
                onClear={() => {
                    if (!sudoku.selectedCell) return;
                    sudoku.updateCell(sudoku.selectedCell.row, sudoku.selectedCell.col, '');
                }}
                disabled={!sudoku.selectedCell || sudoku.solvingState.active ||
                    !!(sudoku.selectedCell && !sudoku.isEditable(sudoku.selectedCell.row, sudoku.selectedCell.col))}
            />

            <SudokuFooter />
        </div>
    );
}
