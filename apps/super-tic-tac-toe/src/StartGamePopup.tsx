import { useEffect } from 'react';
import { useModal } from '@react-lab/ui';
import { Instructions } from './ttt.helpers';

interface StartGamePopupProps {
    isOpen: boolean;
    onStart: () => void;
}

const StartGamePopup = ({ isOpen, onStart }: StartGamePopupProps) => {
    const { open, close } = useModal();

    useEffect(() => {
        if (!isOpen) {
            close();
            return;
        }

        open(
            <div className="space-y-5">
                {/* Header */}
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-500 mb-1">
                        React Lab
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                        Super Tic‑Tac‑Toe
                    </h2>
                    <p className="text-sm text-slate-400 mt-1.5">
                        Win three mini‑boards in a row to claim the grid.
                    </p>
                </div>

                {/* Player legend */}
                <div className="flex gap-3">
                    <div className="flex-1 flex items-center gap-3 rounded-md bg-amber-500/8 ring-1 ring-amber-500/25 px-3 py-2.5">
                        <span className="text-xl font-bold text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]">X</span>
                        <div>
                            <p className="text-[10px] text-slate-500 leading-none mb-0.5">Player One</p>
                            <p className="text-xs font-semibold text-amber-300/80">Goes first</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center gap-3 rounded-md bg-violet-500/8 ring-1 ring-violet-500/25 px-3 py-2.5">
                        <span className="text-xl font-bold text-violet-300 drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]">O</span>
                        <div>
                            <p className="text-[10px] text-slate-500 leading-none mb-0.5">Player Two</p>
                            <p className="text-xs font-semibold text-violet-300/80">Goes second</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent" />

                {/* Rules */}
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-3">Rules</p>
                    <ol className="space-y-2">
                        {Instructions.map((instruction, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <span className="shrink-0 w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center bg-slate-800 text-slate-400 mt-px">
                                    {i + 1}
                                </span>
                                <span className="text-sm text-slate-300 leading-relaxed">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* CTA */}
                <div className="pt-1">
                    <button
                        onClick={() => { close(); onStart(); }}
                        className="w-full py-2.5 rounded-md text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors duration-200 tracking-wide"
                    >
                        Start Game
                    </button>
                </div>
            </div>,
            false
        );
    }, [isOpen, open, close]);

    return null;
};

export default StartGamePopup;
