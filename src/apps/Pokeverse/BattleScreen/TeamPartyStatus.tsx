import type { BattlePokemon } from "../helpers/types";

interface TeamPartyStatusProps {
    team: BattlePokemon[];
    playerName: string;
    isOpponent: boolean;
}

export default function TeamPartyStatus({ team, playerName, isOpponent }: TeamPartyStatusProps) {
    const aliveCount = team.filter(p => p.currentHP > 0).length;

    return (
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/20 dark:border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase">
                    {playerName}
                </p>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    {aliveCount}/{team.length}
                </p>
            </div>

            {/* Pokemon Icons - Wrapping Flexbox */}
            <div className={`flex flex-wrap gap-1.5 ${isOpponent ? 'justify-end' : 'justify-start'}`}>
                {team.map((pokemon, idx) => (
                    <div
                        key={idx}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 ${pokemon.currentHP > 0
                                ? 'border-green-400 pokemon-ready shadow-md shadow-green-400/20'
                                : 'border-red-400 pokemon-loading shadow-md shadow-red-400/20'
                            } bg-white/50 dark:bg-black/30 hover:scale-110 transition-transform duration-200 cursor-pointer`}
                        title={`${pokemon.name} - ${pokemon.currentHP}/${pokemon.calculatedStats.hp} HP`}
                    >
                        <img
                            src={pokemon.frontSprite}
                            alt={pokemon.name}
                            className="w-full h-full object-contain scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}