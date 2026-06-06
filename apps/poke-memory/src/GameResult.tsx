import { Trophy, RotateCcw, Star } from 'lucide-react';
import { usePoke } from './PokeContext';

export default function Result() {
    const { state, dispatch } = usePoke();
    const { name, turns } = state;

    const getRating = () => {
        if (turns <= 12) return { stars: 3, label: 'Perfect memory!' };
        if (turns <= 20) return { stars: 2, label: 'Great job!' };
        return { stars: 1, label: 'Keep practising!' };
    };

    const { stars, label } = getRating();

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-white rounded-3xl border border-lavgrey/20 shadow-2xl overflow-hidden">

                {/* Victory banner */}
                <div className="flex flex-col items-center justify-center py-8 gap-4 bg-indigo">
                    <img src="/pikachu.png" alt="Pikachu" className="h-32 object-contain drop-shadow-xl" />
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map((s) => (
                            <Star
                                key={s}
                                size={28}
                                className={s <= stars ? 'text-punch fill-punch drop-shadow' : 'text-white/20'}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-6 flex flex-col items-center gap-5">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Trophy size={20} className="text-punch" />
                            <h2 className="text-2xl font-black text-indigo">You Won!</h2>
                        </div>
                        <p className="text-sm font-bold text-lavgrey">{label}</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3">
                        <div className="flex flex-col items-center py-3 rounded-2xl bg-indigo/6 border border-indigo/15">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-lavgrey">Player</span>
                            <span className="text-base font-black text-indigo truncate max-w-full px-2">{name}</span>
                        </div>
                        <div className="flex flex-col items-center py-3 rounded-2xl bg-punch/8 border border-punch/20">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-lavgrey">Turns</span>
                            <span className="text-2xl font-black text-punch">{turns}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => dispatch({ type: 'RESET_GAME' })}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white bg-punch hover:bg-flagred shadow-lg active:scale-95 transition-all"
                    >
                        <RotateCcw size={16} />
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
}
