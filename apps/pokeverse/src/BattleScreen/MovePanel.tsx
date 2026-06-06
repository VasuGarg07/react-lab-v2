import type { BattlePokemon } from "../helpers/types";
import { TYPE_COLORS } from "../helpers/constants";
import { ChevronLeft } from "lucide-react";

interface MovePanelProps {
    moves: BattlePokemon['selectedMoves'];
    onSelect: (index: number) => void;
    onBack: () => void;
}

export default function MovePanel({ moves, onSelect, onBack }: MovePanelProps) {
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
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#f8efdc' }}>Choose a Move</span>
                <button
                    onClick={onBack}
                    className="flex items-center gap-0.5 text-[11px] font-black uppercase transition-opacity hover:opacity-70"
                    style={{ color: '#f8efdc' }}
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back
                </button>
            </div>

            {/* Move grid */}
            <div className="p-3 grid grid-cols-2 gap-2">
                {moves.map((move, index) => {
                    const color = TYPE_COLORS[move.type] || '#A8A878';
                    return (
                        <button
                            key={index}
                            onClick={() => onSelect(index)}
                            className="text-left p-2.5 rounded-xl border-2 transition-all duration-100 hover:brightness-95 active:scale-95"
                            style={{
                                background: `${color}20`,
                                borderColor: `${color}80`,
                                boxShadow: `0 2px 0 ${color}40`,
                            }}
                        >
                            <p className="text-xs font-black uppercase mb-1.5 truncate" style={{ color: '#2a1a08' }}>
                                {move.name.replace(/-/g, ' ')}
                            </p>
                            <div className="flex items-center justify-between gap-1">
                                <span
                                    className="text-[9px] font-black px-1.5 py-0.5 rounded-lg text-white uppercase"
                                    style={{ backgroundColor: color }}
                                >
                                    {move.type}
                                </span>
                                <span className="text-[10px] font-bold" style={{ color: '#7a5a38' }}>
                                    {move.power} pw
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
