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
    const teamLabel = String.fromCharCode(65 + teamIndex); // A, B, C, D, E

    // Calculate optimal grid layout (columns >= rows)
    const teamSize = teamIds.length;
    const cols = Math.ceil(Math.sqrt(teamSize));

    const colorClasses = {
        blue: {
            border: 'border-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            badge: 'from-blue-500 to-blue-600',
            text: 'text-blue-600 dark:text-blue-400',
            glow: 'shadow-blue-500/50',
        },
        red: {
            border: 'border-red-500',
            bg: 'bg-red-50 dark:bg-red-900/20',
            badge: 'from-red-500 to-red-600',
            text: 'text-red-600 dark:text-red-400',
            glow: 'shadow-red-500/50',
        },
    };

    const colors = colorClasses[playerColor];

    return (
        <button
            onClick={onSelect}
            disabled={isRevealed}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                ? `${colors.border} ${colors.bg} shadow-lg`
                : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
                } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
        >
            {/* Team Label Badge - Redesigned */}
            <div className="mb-3 flex items-center justify-between">
                <div className={`px-3 py-1 bg-linear-to-r ${colors.badge} rounded-lg shadow-md`}>
                    <span className="text-white font-bold text-sm">Team {teamLabel}</span>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    {teamIds.length} Pokémon
                </span>
            </div>

            {/* Team Grid - Dynamic Columns */}
            <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
                {teamIds.map((pokemonId, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden"
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            className={`relative w-full h-full transition-transform duration-500 ${isRevealed ? 'transform-[rotateY(180deg)]' : ''
                                }`}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Card Back - Custom Image */}
                            <div
                                className="absolute inset-0 bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 p-2"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <img
                                    src="/battle-cardback.png"
                                    alt="Hidden card"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Card Front - Pokemon */}
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-white dark:bg-neutral-900"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                }}
                            >
                                <img
                                    src={getOfficialSprite(pokemonId)}
                                    alt={`Pokemon ${pokemonId}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Indicator */}
            {isSelected && !isRevealed && (
                <div
                    className={`absolute inset-0 border-4 ${colors.border} rounded-xl pointer-events-none animate-pulse`}
                />
            )}
        </button>
    );
}