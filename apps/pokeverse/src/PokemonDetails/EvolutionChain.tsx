import { useNavigate } from 'react-router';
import { ArrowRight, GitBranch } from 'lucide-react';
import type { Pokemon, EvolutionDetails } from '../helpers/types';
import { formatString, formatPokemonId } from '../helpers/utilities';
import { getOfficialSprite } from '../helpers/constants';

function EvolutionCard({
    evolution,
    currentId,
    isCompact = false,
}: {
    evolution: EvolutionDetails;
    currentId: number;
    isCompact?: boolean;
}) {
    const navigate = useNavigate();
    const isCurrent = evolution.id === currentId;

    return (
        <button
            onClick={() => navigate(`/pokeverse/pokedex/${evolution.id}`)}
            className={`group relative rounded-xl border-2 transition-all duration-200 ${isCompact ? 'p-2' : 'p-3'} ${isCurrent
                ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}
        >
            <div className={`relative mx-auto mb-2 bg-neutral-50 dark:bg-neutral-700 rounded-lg overflow-hidden ${isCompact ? 'w-16 h-16' : 'w-20 h-20'}`}>
                <img
                    src={getOfficialSprite(evolution.id)}
                    alt={evolution.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="space-y-1">
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{formatPokemonId(evolution.id)}</p>
                <p className={`font-semibold text-neutral-900 dark:text-neutral-100 capitalize truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {formatString(evolution.name)}
                </p>
            </div>
        </button>
    );
}

function renderHorizontalStage(evolution: EvolutionDetails, currentId: number, depth: number = 0) {
    const hasMultipleEvolutions = evolution.evolvesTo.length > 1;

    return (
        <div className="flex items-center gap-3">
            <div className="shrink-0">
                <EvolutionCard evolution={evolution} currentId={currentId} />
            </div>
            {evolution.evolvesTo.length > 0 && (
                <>
                    <ArrowRight className="shrink-0 w-6 h-6 text-neutral-400 dark:text-neutral-600" />
                    {hasMultipleEvolutions ? (
                        <div className="flex flex-col gap-3">
                            {evolution.evolvesTo.map((nextEvo) => (
                                <div key={nextEvo.id} className="flex items-center gap-3">
                                    {renderHorizontalStage(nextEvo, currentId, depth + 1)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        renderHorizontalStage(evolution.evolvesTo[0], currentId, depth + 1)
                    )}
                </>
            )}
        </div>
    );
}

export default function EvolutionChain({ pokemon }: { pokemon: Pokemon }) {
    if (!pokemon.evolutionChain) {
        return (
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                <GitBranch className="w-12 h-12 mx-auto mb-3 text-neutral-400 dark:text-neutral-600" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">No evolution data available</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Evolution Chain</h3>
            </div>
            <div className="overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar-track]:dark:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:dark:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                {renderHorizontalStage(pokemon.evolutionChain, pokemon.id)}
            </div>
        </div>
    );
}
