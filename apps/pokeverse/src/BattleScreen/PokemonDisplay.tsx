import type { BattlePokemon } from "../helpers/types";

interface PokemonDisplayProps {
    pokemon: BattlePokemon;
    isOpponent: boolean;
}

export default function PokemonDisplay({ pokemon, isOpponent }: PokemonDisplayProps) {
    const hpPct = Math.max(0, (pokemon.currentHP / pokemon.calculatedStats.hp) * 100);
    const hpColor = hpPct > 50 ? '#2ea02e' : hpPct > 20 ? '#d08000' : '#c03020';
    const fainted = pokemon.currentHP <= 0;

    return (
        <div className={`flex ${isOpponent ? 'flex-row-reverse' : 'flex-row'} items-end gap-1.5 sm:gap-2`}>
            <div
                className="rounded-2xl px-2.5 py-2 sm:px-3 sm:py-2.5 shadow-xl"
                style={{
                    background: 'linear-gradient(160deg, #f8efdc 0%, #e8d9be 100%)',
                    border: '3px solid #a8926a',
                    minWidth: 120,
                    maxWidth: 175,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
            >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-[11px] sm:text-xs font-black uppercase tracking-wide truncate" style={{ color: '#2a1a08' }}>
                        {pokemon.name}
                    </p>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-lg shrink-0"
                        style={{ background: '#2a1a08', color: '#f8efdc' }}>
                        Lv{pokemon.level}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-black tracking-wider shrink-0" style={{ color: '#7a5a38' }}>HP</span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: 8, background: '#c8b08a', border: '2px solid #a08060' }}>
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${hpPct}%`, backgroundColor: hpColor, boxShadow: `0 1px 4px ${hpColor}90` }}
                        />
                    </div>
                </div>
                <p className="text-right text-[10px] tabular-nums font-bold" style={{ color: '#5a4028' }}>
                    <span style={{ color: fainted ? '#c03020' : '#2a1a08' }}>{fainted ? '0' : pokemon.currentHP}</span>
                    <span style={{ color: '#9a8060' }}> / {pokemon.calculatedStats.hp}</span>
                </p>
            </div>

            <div className="relative shrink-0 self-end">
                <img
                    src={isOpponent ? pokemon.frontSprite : (pokemon.backSprite ?? pokemon.frontSprite)}
                    alt={pokemon.name}
                    className="transition-all duration-300 drop-shadow-2xl"
                    style={{
                        width: isOpponent ? 90 : 110,
                        height: isOpponent ? 90 : 110,
                        imageRendering: 'pixelated',
                        objectFit: 'contain',
                        filter: fainted ? 'grayscale(1) opacity(0.3)' : undefined,
                    }}
                />
                {fainted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span
                            className="text-[11px] font-black uppercase px-2 py-0.5 rounded-lg"
                            style={{
                                background: '#7f1d1d',
                                color: '#fca5a5',
                                transform: 'rotate(-18deg)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                            }}
                        >
                            Fainted
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
