import { MoveLeft } from "lucide-react";
import type { BattlePokemon } from "../helpers/types";

interface SwitchPanelProps {
    team: BattlePokemon[];
    activeIndex: number;
    onSwitch: (index: number) => void;
    onBack: () => void;
}

export default function SwitchPanel({ team, activeIndex, onSwitch, onBack }: SwitchPanelProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-700 dark:border-neutral-600 p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase">Switch Pokémon</h3>
                <button onClick={onBack} className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium">
                    <MoveLeft />
                </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
                {team.map((pokemon, index) => {
                    const isActive = index === activeIndex;
                    const isFainted = pokemon.currentHP <= 0;
                    const hpPercentage = (pokemon.currentHP / pokemon.calculatedStats.hp) * 100;

                    return (
                        <button
                            key={index}
                            onClick={() => !isActive && !isFainted && onSwitch(index)}
                            disabled={isActive || isFainted}
                            className={`w-full text-left p-2 rounded-lg transition-all duration-200 border ${isActive
                                ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500'
                                : isFainted
                                    ? 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 opacity-50 cursor-not-allowed'
                                    : 'bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-600 rounded-lg overflow-hidden shrink-0">
                                    <img src={pokemon.frontSprite} alt={pokemon.name} className={`w-full h-full object-contain ${isFainted ? 'grayscale' : ''}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">{pokemon.name} {isActive && '★'}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${hpPercentage > 50 ? 'bg-green-500' : hpPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                style={{ width: `${hpPercentage}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap font-medium">{pokemon.currentHP}/{pokemon.calculatedStats.hp}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
