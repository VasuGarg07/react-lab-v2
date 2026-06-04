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

            {/* Game action strip — garnet bg, full-width */}
            <div
                className="rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3 shadow-md"
                style={{ background: 'linear-gradient(135deg, #6B0504 0%, #A3320B 100%)' }}
            >
                <img src={Logo} alt="Logo" className="h-10 object-contain drop-shadow" />

                {/* Player name */}
                <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Playing as</span>
                    <span className="text-base font-black text-white">{name}</span>
                </div>

                {/* Turns badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
                    <Hash size={14} className="text-sun" />
                    <span className="text-xs font-bold text-white/60">Turns</span>
                    <span className="text-sm font-black text-white">{turns}</span>
                </div>

                <div className="ml-auto flex gap-2">
                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/15 text-white border border-white/20 hover:bg-white/25 transition-colors"
                    >
                        <RotateCcw size={13} />
                        Restart
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'RESET_GAME' })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-ink/30 text-white border border-ink/20 hover:bg-ink/50 transition-colors"
                    >
                        <LogOut size={13} />
                        Quit
                    </button>
                </div>
            </div>

            <CardGrid />
        </div>
    );
}
