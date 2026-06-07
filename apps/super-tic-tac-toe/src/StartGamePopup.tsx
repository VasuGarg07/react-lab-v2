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
                    <h2 className="text-2xl font-bold tracking-tight text-ink leading-tight">
                        Super Tic-Tac-Toe
                    </h2>
                    <p className="text-sm text-slate-600 mt-1.5">
                        Win three mini-boards in a row to claim the grid.
                    </p>
                </div>

                {/* Player legend */}
                <div className="flex gap-3">
                    <div className="flex-1 flex items-center gap-3 rounded-md bg-x-400/15 ring-1 ring-x-400/45 px-3 py-2.5">
                        <span className="text-xl font-bold text-x-500">X</span>
                        <div>
                            <p className="text-[10px] font-medium text-slate-600 leading-none mb-0.5">Player One</p>
                            <p className="text-xs font-bold text-x-500">Goes first</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center gap-3 rounded-md bg-o-500/12 ring-1 ring-o-500/40 px-3 py-2.5">
                        <span className="text-xl font-bold text-o-500">O</span>
                        <div>
                            <p className="text-[10px] font-medium text-slate-600 leading-none mb-0.5">Player Two</p>
                            <p className="text-xs font-bold text-o-500">Goes second</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-slate-400/70 to-transparent" />

                {/* Rules */}
                <div>
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-3">Rules</p>
                    <ol className="space-y-2">
                        {Instructions.map((instruction, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <span className="shrink-0 w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center bg-slate-900 text-white mt-px">
                                    {i + 1}
                                </span>
                                <span className="text-sm text-slate-700 leading-relaxed">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* CTA */}
                <div className="pt-1">
                    <button
                        onClick={() => { close(); onStart(); }}
                        className="w-full py-2.5 rounded-md text-sm font-bold bg-ink hover:bg-fern text-white transition-colors duration-200 tracking-wide"
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
