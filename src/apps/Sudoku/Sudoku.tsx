import { CheckCircle2, Lightbulb, RotateCcw, Square, X } from 'lucide-react';
import { useEffect } from 'react';
import {
    BOX_SIZE,
    SOLVE_STEP_DEFAULT_MS,
    SOLVE_STEP_MAX_MS,
    SOLVE_STEP_MIN_MS,
    SUDOKU_SIZE,
} from './sudoku.constants';
import SudokuCell from './SudokuCell';
import { useSudoku } from './useSudoku';
import VirtualNumpad from './VirtualNumpad';

const ARROW_KEY_DELTAS: Record<string, [number, number]> = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
};

const CLEAR_KEYS = new Set(['Backspace', 'Delete', '0', ' ']);

export default function Sudoku() {
    const sudoku = useSudoku();

    useKeyboardInput(sudoku);

    if (sudoku.error) {
        return <ErrorScreen message={sudoku.error.message} onRetry={sudoku.newGame} />;
    }

    if (sudoku.isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen w-full bg-stone-50 dark:bg-neutral-950 flex flex-col">
            <Header
                isSolving={sudoku.solvingState.active}
                onHint={sudoku.giveHint}
                onSolve={sudoku.solvePuzzle}
                onNewGame={sudoku.newGame}
                onCancelSolve={sudoku.cancelSolve}
                onSpeedChange={sudoku.setSolveSpeed}
            />

            {sudoku.isComplete && !sudoku.solvingState.active && <CompletionBanner />}

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-xl">
                    <SudokuBoard sudoku={sudoku} />
                    <KeyboardHint />
                </div>
            </div>

            <NumpadInput sudoku={sudoku} />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Keyboard input
// ---------------------------------------------------------------------------

function useKeyboardInput(sudoku: ReturnType<typeof useSudoku>) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!sudoku.selectedCell) return;
            if (sudoku.solvingState.active) return;

            const { row, col } = sudoku.selectedCell;

            if (handleArrowKey(e, row, col, sudoku.selectCell)) return;
            if (!sudoku.isEditable(row, col)) return;
            if (handleDigitKey(e, row, col, sudoku.updateCell)) return;
            handleClearKey(e, row, col, sudoku.updateCell);
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [sudoku]);
}

function handleArrowKey(
    e: KeyboardEvent,
    row: number,
    col: number,
    selectCell: (row: number, col: number) => void,
): boolean {
    const delta = ARROW_KEY_DELTAS[e.key];
    if (!delta) return false;

    const newRow = clamp(row + delta[0], 0, SUDOKU_SIZE - 1);
    const newCol = clamp(col + delta[1], 0, SUDOKU_SIZE - 1);

    if (newRow !== row || newCol !== col) {
        selectCell(newRow, newCol);
        e.preventDefault();
    }
    return true;
}

function handleDigitKey(
    e: KeyboardEvent,
    row: number,
    col: number,
    updateCell: (row: number, col: number, value: string) => void,
): boolean {
    if (!/^[1-9]$/.test(e.key)) return false;
    updateCell(row, col, e.key);
    return true;
}

function handleClearKey(
    e: KeyboardEvent,
    row: number,
    col: number,
    updateCell: (row: number, col: number, value: string) => void,
): boolean {
    if (!CLEAR_KEYS.has(e.key)) return false;
    updateCell(row, col, '');
    return true;
}

const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

interface HeaderProps {
    isSolving: boolean;
    onHint: () => void;
    onSolve: () => void;
    onNewGame: () => void;
    onCancelSolve: () => void;
    onSpeedChange: (speedMs: number) => void;
}

function Header({ isSolving, onHint, onSolve, onNewGame, onCancelSolve, onSpeedChange }: HeaderProps) {
    return (
        <div className="sticky top-0 z-20 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-stone-200 dark:border-neutral-800">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
                <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    Sudoku
                </h1>

                {isSolving ? (
                    <CancelSolveButton onCancel={onCancelSolve} />
                ) : (
                    <ActionButtons onHint={onHint} onSolve={onSolve} onNewGame={onNewGame} />
                )}
            </div>

            {isSolving && <SpeedSlider onChange={onSpeedChange} />}
        </div>
    );
}

function ActionButtons({
    onHint,
    onSolve,
    onNewGame,
}: {
    onHint: () => void;
    onSolve: () => void;
    onNewGame: () => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <ToolbarButton onClick={onHint} icon={<Lightbulb size={14} />}>
                Hint
            </ToolbarButton>
            <ToolbarButton onClick={onSolve} icon={<Square size={14} />}>
                Solve
            </ToolbarButton>
            <ToolbarButton onClick={onNewGame} icon={<RotateCcw size={14} />} primary>
                New game
            </ToolbarButton>
        </div>
    );
}

function CancelSolveButton({ onCancel }: { onCancel: () => void }) {
    return (
        <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 hover:bg-red-700 text-white transition focus:outline-none focus:ring-2 focus:ring-red-500/30"
        >
            <X size={14} />
            Stop
        </button>
    );
}

function SpeedSlider({ onChange }: { onChange: (speedMs: number) => void }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sliderValue = Number(e.target.value);
        const speedMs = SOLVE_STEP_MAX_MS - sliderValue;
        onChange(speedMs);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 pb-3 flex items-center gap-3">
            <span className="text-xs text-stone-500 dark:text-stone-400 w-12 text-right">Slow</span>
            <input
                type="range"
                min={SOLVE_STEP_MIN_MS}
                max={SOLVE_STEP_MAX_MS}
                defaultValue={SOLVE_STEP_DEFAULT_MS}
                onChange={handleChange}
                className="flex-1 accent-blue-600"
            />
            <span className="text-xs text-stone-500 dark:text-stone-400 w-12">Fast</span>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Board
// ---------------------------------------------------------------------------

function SudokuBoard({ sudoku }: { sudoku: ReturnType<typeof useSudoku> }) {
    const boxes = Array.from({ length: BOX_SIZE * BOX_SIZE }, (_, i) => i);

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-2 border border-stone-200 dark:border-neutral-800">
            <div className="grid grid-cols-3 aspect-square border-2 border-stone-700 dark:border-stone-300 rounded-md overflow-hidden">
                {boxes.map(boxIndex => (
                    <BoxOfNine key={boxIndex} boxIndex={boxIndex} sudoku={sudoku} />
                ))}
            </div>
        </div>
    );
}

interface BoxOfNineProps {
    boxIndex: number;
    sudoku: ReturnType<typeof useSudoku>;
}

function BoxOfNine({ boxIndex, sudoku }: BoxOfNineProps) {
    const boxRow = Math.floor(boxIndex / BOX_SIZE);
    const boxCol = boxIndex % BOX_SIZE;
    const cells = Array.from({ length: BOX_SIZE * BOX_SIZE }, (_, i) => i);

    return (
        <div className="grid grid-cols-3 border border-stone-700 dark:border-stone-300">
            {cells.map(cellIndex => {
                const localRow = Math.floor(cellIndex / BOX_SIZE);
                const localCol = cellIndex % BOX_SIZE;
                const row = boxRow * BOX_SIZE + localRow;
                const col = boxCol * BOX_SIZE + localCol;
                return (
                    <CellWithBorder
                        key={`${row},${col}`}
                        row={row}
                        col={col}
                        sudoku={sudoku}
                    />
                );
            })}
        </div>
    );
}

interface CellWithBorderProps {
    row: number;
    col: number;
    sudoku: ReturnType<typeof useSudoku>;
}

function CellWithBorder({ row, col, sudoku }: CellWithBorderProps) {
    const key = `${row},${col}`;
    const isSelected =
        sudoku.selectedCell?.row === row && sudoku.selectedCell?.col === col;

    const solveStep = getSolveStep(sudoku.solvingState.currentStep, row, col);

    return (
        <div className="border border-stone-200 dark:border-neutral-700">
            <SudokuCell
                value={sudoku.board[row][col]}
                editable={sudoku.isEditable(row, col)}
                selected={isSelected}
                isPeer={sudoku.peerCells.has(key)}
                isSameNumber={sudoku.sameNumberCells.has(key)}
                hasConflict={sudoku.conflictCells.has(key)}
                solveStep={solveStep}
                onSelect={() => sudoku.selectCell(row, col)}
                row={row}
                col={col}
            />
        </div>
    );
}

function getSolveStep(
    currentStep: { row: number; col: number; kind: 'try' | 'backtrack' } | undefined,
    row: number,
    col: number,
): 'try' | 'backtrack' | null {
    if (!currentStep) return null;
    if (currentStep.row !== row || currentStep.col !== col) return null;
    return currentStep.kind;
}

// ---------------------------------------------------------------------------
// Smaller pieces
// ---------------------------------------------------------------------------

function CompletionBanner() {
    return (
        <div className="w-full bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800 py-2">
            <p className="flex items-center justify-center gap-2 text-sm text-emerald-800 dark:text-emerald-200">
                <CheckCircle2 size={16} />
                <span>Solved.</span>
            </p>
        </div>
    );
}

function KeyboardHint() {
    return (
        <p className="hidden md:block text-center text-xs text-stone-500 dark:text-stone-500 mt-3">
            Click a cell, then type a digit. Arrow keys to navigate. Backspace to clear.
        </p>
    );
}

function NumpadInput({ sudoku }: { sudoku: ReturnType<typeof useSudoku> }) {
    const isCellEditable = sudoku.selectedCell
        ? sudoku.isEditable(sudoku.selectedCell.row, sudoku.selectedCell.col)
        : false;

    const isDisabled =
        !sudoku.selectedCell ||
        sudoku.solvingState.active ||
        !isCellEditable;

    const handleNumberSelect = (num: number) => {
        if (!sudoku.selectedCell) return;
        sudoku.updateCell(sudoku.selectedCell.row, sudoku.selectedCell.col, String(num));
    };

    const handleClear = () => {
        if (!sudoku.selectedCell) return;
        sudoku.updateCell(sudoku.selectedCell.row, sudoku.selectedCell.col, '');
    };

    return (
        <VirtualNumpad
            onNumberSelect={handleNumberSelect}
            onClear={handleClear}
            disabled={isDisabled}
        />
    );
}

function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-stone-50 dark:bg-neutral-950">
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-xl border border-stone-200 dark:border-neutral-800 max-w-md">
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                    Couldn't load puzzle
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                    {message}
                </p>
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}

function LoadingScreen() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-stone-50 dark:bg-neutral-950">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-stone-600 dark:text-stone-400">Loading puzzle…</p>
            </div>
        </div>
    );
}

interface ToolbarButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    children: React.ReactNode;
    primary?: boolean;
}

function ToolbarButton({ onClick, icon, children, primary }: ToolbarButtonProps) {
    const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500/30';

    const primaryClasses = 'bg-blue-600 hover:bg-blue-700 text-white';
    const secondaryClasses = 'bg-stone-100 dark:bg-neutral-800 hover:bg-stone-200 dark:hover:bg-neutral-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-neutral-700';

    const variantClasses = primary ? primaryClasses : secondaryClasses;

    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
            {icon}
            <span>{children}</span>
        </button>
    );
}