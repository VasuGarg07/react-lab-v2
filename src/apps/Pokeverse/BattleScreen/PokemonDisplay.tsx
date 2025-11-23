import type { BattlePokemon } from "../helpers/types";
import { TYPE_COLORS } from "../helpers/constants";

interface PokemonDisplayProps {
    pokemon: BattlePokemon;
    playerName: string;
    isOpponent: boolean;
}

const getTypeGradient = (types: string[]) => {
    const color1 = TYPE_COLORS[types[0]] || '#A8A878';
    const color2 = types[1] ? TYPE_COLORS[types[1]] : color1;
    return `linear-gradient(135deg, ${color1}50, ${color2}50)`;
};

export default function PokemonDisplay({ pokemon, isOpponent }: PokemonDisplayProps) {
    const hpPercentage = (pokemon.currentHP / pokemon.calculatedStats.hp) * 100;

    return (
        <div
            className="rounded-xl border-2 border-neutral-700 dark:border-neutral-600 p-4 shadow-lg"
            style={{ background: getTypeGradient(pokemon.types) }}
        >
            <div className={`flex items-center gap-4 ${isOpponent ? 'flex-row-reverse' : ''}`}>
                {/* Pokemon Sprite */}
                <div className="shrink-0">
                    <div className="relative">
                        <img
                            src={isOpponent ? pokemon.frontSprite : pokemon.backSprite}
                            alt={pokemon.name}
                            className="w-32 h-32 object-contain drop-shadow-lg"
                        />
                    </div>
                </div>

                {/* Pokemon Info */}
                <div className="flex-1 min-w-0">
                    {/* Name & Level */}
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-wide">
                            {pokemon.name}
                        </h3>
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 bg-white/50 dark:bg-black/30 px-2 py-0.5 rounded-full">
                            Lv.{pokemon.level}
                        </span>
                    </div>

                    {/* Types */}
                    <div className="flex gap-1.5 mb-3">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className="px-2.5 py-0.5 text-xs font-bold rounded-full text-white uppercase shadow-sm"
                                style={{ backgroundColor: TYPE_COLORS[type] }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>

                    {/* HP Bar */}
                    <div className="bg-neutral-900/20 dark:bg-black/30 rounded-lg p-2 backdrop-blur-sm">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-medium text-neutral-900 dark:text-white">HP</span>
                            <span className="font-bold text-neutral-900 dark:text-white">
                                {pokemon.currentHP} / {pokemon.calculatedStats.hp}
                            </span>
                        </div>
                        <div className="h-2.5 bg-neutral-300 dark:bg-neutral-700 rounded-full overflow-hidden border border-neutral-400 dark:border-neutral-600">
                            <div
                                className={`h-full transition-all duration-500 ${hpPercentage > 50
                                    ? 'bg-green-500'
                                    : hpPercentage > 20
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                    }`}
                                style={{ width: `${hpPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}