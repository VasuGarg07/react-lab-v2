import { ChevronLeft } from "lucide-react";
import type { BattlePokemon } from "../helpers/types";

interface SwitchPanelProps {
    team: BattlePokemon[];
    activeIndex: number;
    onSwitch: (index: number) => void;
    onBack: () => void;
}

export default function SwitchPanel({ team, activeIndex, onSwitch, onBack }: SwitchPanelProps) {
    return (
        <div
            className="rounded-2xl shadow-xl overflow-hidden"
            style={{
                background: 'linear-gradient(160deg, #f8efdc 0%, #e8d9be 100%)',
                border: '3px solid #a8926a',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-2 border-b-2"
                style={{ borderColor: '#a8926a', background: 'linear-gradient(90deg, #c8a870, #b8986a)' }}
            >
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#f8efdc' }}>Switch Pokémon</span>
                <button
                    onClick={onBack}
                    className="flex items-center gap-0.5 text-[11px] font-black uppercase transition-opacity hover:opacity-70"
                    style={{ color: '#f8efdc' }}
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back
                </button>
            </div>

            {/* Pokémon list */}
            <div className="p-3 space-y-1.5 max-h-56 overflow-y-auto">
                {team.map((pokemon, index) => {
                    const isActive = index === activeIndex;
                    const isFainted = pokemon.currentHP <= 0;
                    const hpPct = Math.max(0, (pokemon.currentHP / pokemon.calculatedStats.hp) * 100);
                    const hpColor = hpPct > 50 ? '#2ea02e' : hpPct > 20 ? '#d08000' : '#c03020';
                    const disabled = isActive || isFainted;
                    return (
                        <button
                            key={index}
                            onClick={() => !disabled && onSwitch(index)}
                            disabled={disabled}
                            className="w-full text-left p-2 rounded-xl border-2 transition-all duration-100 flex items-center gap-2.5"
                            style={{
                                background: isActive
                                    ? 'linear-gradient(135deg, #d0e8f8, #c0d8f0)'
                                    : isFainted
                                    ? '#d8cfc0'
                                    : 'linear-gradient(135deg, #f0e8d8, #e0d0b8)',
                                borderColor: isActive ? '#4a80c0' : isFainted ? '#a09080' : '#b8a08a',
                                opacity: isFainted ? 0.5 : 1,
                                cursor: disabled ? 'default' : 'pointer',
                                boxShadow: !disabled ? '0 2px 0 rgba(0,0,0,0.15)' : 'none',
                            }}
                        >
                            {/* Sprite */}
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ background: '#d8d0b8' }}>
                                <img
                                    src={pokemon.frontSprite}
                                    alt={pokemon.name}
                                    className={`w-full h-full object-contain ${isFainted ? 'grayscale' : ''}`}
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            </div>
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <p className="text-xs font-black uppercase truncate" style={{ color: '#2a1a08' }}>{pokemon.name}</p>
                                    {isActive && (
                                        <span className="text-[9px] font-black px-1.5 rounded-full shrink-0" style={{ background: '#2860c0', color: '#d0e8ff' }}>ON</span>
                                    )}
                                    {isFainted && (
                                        <span className="text-[9px] font-black px-1.5 rounded-full shrink-0" style={{ background: '#8a1a1a', color: '#ffd0d0' }}>KO</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#c8b08a', border: '1px solid #a08060' }}>
                                        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${hpPct}%`, backgroundColor: hpColor }} />
                                    </div>
                                    <span className="text-[9px] tabular-nums shrink-0 font-bold" style={{ color: '#7a5a38' }}>
                                        {pokemon.currentHP}/{pokemon.calculatedStats.hp}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
