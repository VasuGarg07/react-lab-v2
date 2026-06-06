import { getOfficialSprite } from "../helpers/constants";

interface TeamCardProps {
    teamIds: number[];
    teamIndex: number;
    isSelected: boolean;
    isRevealed: boolean;
    onSelect: () => void;
    playerColor: 'blue' | 'red';
}

export default function TeamCard({
    teamIds,
    teamIndex,
    isSelected,
    isRevealed,
    onSelect,
    playerColor,
}: TeamCardProps) {
    const teamLabel = String.fromCharCode(65 + teamIndex);
    const teamSize = teamIds.length;
    const cols = Math.ceil(Math.sqrt(teamSize));

    const colorClasses = {
        blue: {
            border: 'border-azure',
            bg: 'bg-azure/5',
            badge: 'from-azure to-cobalt',
            text: 'text-azure',
            glow: 'shadow-azure/30',
        },
        red: {
            border: 'border-crimson',
            bg: 'bg-crimson/5',
            badge: 'from-crimson to-ruby',
            text: 'text-crimson',
            glow: 'shadow-crimson/30',
        },
    };

    const colors = colorClasses[playerColor];

    return (
        <button
            onClick={onSelect}
            disabled={isRevealed}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                ? `${colors.border} ${colors.bg} shadow-lg ${colors.glow}`
                : 'border-silver/40 hover:border-silver/70'
                } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
        >
            <div className="mb-3 flex items-center justify-between">
                <div className={`px-3 py-1 bg-linear-to-r ${colors.badge} rounded-lg shadow-md`}>
                    <span className="text-white font-bold text-sm">Team {teamLabel}</span>
                </div>
                <span className="text-xs text-smoke font-medium">{teamIds.length} Pokémon</span>
            </div>

            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {teamIds.map((pokemonId, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-square bg-chalk rounded-lg overflow-hidden"
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            className={`relative w-full h-full transition-transform duration-500 ${isRevealed ? 'transform-[rotateY(180deg)]' : ''}`}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div
                                className="absolute inset-0 bg-linear-to-br from-silver/20 to-silver/30 p-2"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <img src="/battle-cardback.png" alt="Hidden card" className="w-full h-full object-contain" />
                            </div>
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-white"
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                <img src={getOfficialSprite(pokemonId)} alt={`Pokemon ${pokemonId}`} className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isSelected && !isRevealed && (
                <div className={`absolute inset-0 border-4 ${colors.border} rounded-xl pointer-events-none animate-pulse`} />
            )}
        </button>
    );
}
