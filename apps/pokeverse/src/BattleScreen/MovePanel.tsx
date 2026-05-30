import type { BattlePokemon } from "../helpers/types";
import { TYPE_COLORS } from "../helpers/constants";
import { MoveLeft } from "lucide-react";

interface MovePanelProps {
    moves: BattlePokemon['selectedMoves'];
    onSelect: (index: number) => void;
    onBack: () => void;
}

export default function MovePanel({ moves, onSelect, onBack }: MovePanelProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-700 dark:border-neutral-600 p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase">Choose Move</h3>
                <button onClick={onBack} className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium">
                    <MoveLeft />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {moves.map((move, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(index)}
                        className="text-left p-3 rounded-lg transition-all duration-200 border-2 hover:scale-105"
                        style={{ backgroundColor: `${TYPE_COLORS[move.type]}20`, borderColor: TYPE_COLORS[move.type] }}
                    >
                        <p className="text-sm font-bold text-neutral-900 dark:text-white mb-0.5 uppercase">{move.name}</p>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="px-1.5 py-0.5 rounded text-white font-bold" style={{ backgroundColor: TYPE_COLORS[move.type] }}>
                                {move.type}
                            </span>
                            <span className="text-neutral-600 dark:text-neutral-400 font-medium">{move.power}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
