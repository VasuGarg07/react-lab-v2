import { Lightbulb, RotateCcw, Square, X } from 'lucide-react';
import { SOLVE_STEP_DEFAULT_MS, SOLVE_STEP_MAX_MS, SOLVE_STEP_MIN_MS } from './sudoku.constants';

interface HeaderProps {
    isSolving: boolean;
    onHint: () => void;
    onSolve: () => void;
    onNewGame: () => void;
    onCancelSolve: () => void;
    onSpeedChange: (speedMs: number) => void;
}

export function SudokuHeader({ isSolving, onHint, onSolve, onNewGame, onCancelSolve, onSpeedChange }: HeaderProps) {
    return (
        <header
            className="shrink-0 w-full backdrop-blur-md border-b"
            style={{ backgroundColor: 'rgba(249,249,237,0.88)', borderColor: '#D9DBF1' }}
        >
            <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-2.5">
                    <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#4a5080' }}>
                        Sudoku
                    </h1>
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase hidden sm:inline" style={{ color: '#8E9DCC' }}>
                        React Lab
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {isSolving ? (
                        <CancelButton onCancel={onCancelSolve} />
                    ) : (
                        <>
                            <ActionBtn onClick={onHint} icon={<Lightbulb size={13} />}>Hint</ActionBtn>
                            <ActionBtn onClick={onSolve} icon={<Square size={13} />}>Solve</ActionBtn>
                            <ActionBtn onClick={onNewGame} icon={<RotateCcw size={13} />} primary>New Game</ActionBtn>
                        </>
                    )}
                </div>
            </div>

            {isSolving && (
                <div className="max-w-2xl mx-auto px-5 pb-2.5 flex items-center gap-3">
                    <span className="text-xs font-medium w-8 text-right" style={{ color: '#8E9DCC' }}>Slow</span>
                    <input
                        type="range"
                        min={SOLVE_STEP_MIN_MS}
                        max={SOLVE_STEP_MAX_MS}
                        defaultValue={SOLVE_STEP_DEFAULT_MS}
                        onChange={(e) => onSpeedChange(SOLVE_STEP_MAX_MS - Number(e.target.value))}
                        className="flex-1 slider-lavender"
                    />
                    <span className="text-xs font-medium w-8" style={{ color: '#8E9DCC' }}>Fast</span>
                </div>
            )}
        </header>
    );
}

function CancelButton({ onCancel }: { onCancel: () => void }) {
    return (
        <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition focus:outline-none"
            style={{ backgroundColor: '#7D84B2', color: '#ffffff' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4a5080')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#7D84B2')}
        >
            <X size={13} />
            Stop solving
        </button>
    );
}

interface ActionBtnProps {
    onClick: () => void;
    icon: React.ReactNode;
    children: React.ReactNode;
    primary?: boolean;
}

function ActionBtn({ onClick, icon, children, primary }: ActionBtnProps) {
    if (primary) {
        return (
            <button
                onClick={onClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition focus:outline-none"
                style={{ backgroundColor: '#DBF4A7', color: '#4a5080', border: '1px solid #c8e890' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cded95')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#DBF4A7')}
            >
                {icon}
                <span>{children}</span>
            </button>
        );
    }
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition focus:outline-none"
            style={{ color: '#7D84B2', borderColor: '#D9DBF1', backgroundColor: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D9DBF1')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
            {icon}
            <span>{children}</span>
        </button>
    );
}
