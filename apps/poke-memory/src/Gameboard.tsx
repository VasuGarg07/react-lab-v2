import { Hash, RotateCcw, LogOut } from 'lucide-react';
import Logo from '/pokemon.png';
import { CardGrid } from './CardGrid';
import { usePoke } from './PokeContext';
import { loadCards, getPairCountForDifficulty } from './pokememory.utilities';

export default function GameBoard() {
    const { state, dispatch } = usePoke();
    const { name, turns, difficulty } = state;

    const handleRestart = () => {
        const pairCount = getPairCountForDifficulty(difficulty);
        dispatch({ type: 'SET_CARDS',      payload: loadCards(pairCount) });
        dispatch({ type: 'SET_GAME_STATE', payload: 'playing' });
    };

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">

            {/* Action strip */}
            <div className="bg-indigo rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">

                {/* Logo — hidden on xs to save space */}
                <img src={Logo} alt="Logo" className="hidden xs:block h-9 object-contain shrink-0" />

                {/* Player */}
                <div className="flex flex-col leading-tight min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-lavgrey">Playing as</span>
                    <span className="text-sm font-black text-white truncate">{name}</span>
                </div>

                {/* Turns badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/8 border border-white/15 shrink-0">
                    <Hash size={12} className="text-lavgrey" />
                    <span className="text-[10px] font-bold text-lavgrey">Turns</span>
                    <span className="text-sm font-black text-white">{turns}</span>
                </div>

                {/* Actions — push to right */}
                <div className="ml-auto flex gap-2 shrink-0">
                    <button
                        onClick={handleRestart}
                        title="Restart"
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                    >
                        <RotateCcw size={13} />
                        <span className="hidden sm:inline">Restart</span>
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'RESET_GAME' })}
                        title="Quit"
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-punch text-white border border-flagred hover:bg-flagred transition-colors"
                    >
                        <LogOut size={13} />
                        <span className="hidden sm:inline">Quit</span>
                    </button>
                </div>
            </div>

            <CardGrid />
        </div>
    );
}
