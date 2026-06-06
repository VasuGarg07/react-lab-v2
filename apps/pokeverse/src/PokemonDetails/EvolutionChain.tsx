import { useNavigate } from 'react-router';
import { ArrowRight, GitBranch } from 'lucide-react';
import type { Pokemon, EvolutionDetails } from '../helpers/types';
import { formatString } from '../helpers/utilities';
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
            onClick={() => navigate(`/pokedex/${evolution.id}`)}
            className={`group relative rounded-xl border-2 transition-all duration-200 ${isCompact ? 'p-2' : 'p-3'} ${isCurrent
                ? 'border-crimson bg-crimson/5'
                : 'border-silver/40 bg-white hover:border-silver hover:shadow-sm'
                }`}
        >
            <div className={`relative mx-auto mb-2 rounded-lg overflow-hidden ${isCompact ? 'w-16 h-16' : 'w-20 h-20'}`}>
                <img
                    src={getOfficialSprite(evolution.id)}
                    alt={evolution.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="space-y-0.5">
                <p className={`font-bold text-shadow capitalize truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
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
                    <ArrowRight className="shrink-0 w-5 h-5 text-silver" />
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
            <div className="p-8 bg-white rounded-xl border border-silver/40 text-center">
                <GitBranch className="w-10 h-10 mx-auto mb-3 text-silver" />
                <p className="text-sm text-smoke">No evolution data available</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-xl border border-silver/40">
            <div className="flex items-center gap-2 mb-4">
                <GitBranch className="w-4 h-4 text-smoke" />
                <h3 className="text-xs font-black uppercase tracking-wider text-smoke">Evolution Chain</h3>
            </div>
            <div className="overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-chalk [&::-webkit-scrollbar-thumb]:bg-silver [&::-webkit-scrollbar-thumb]:rounded-full">
                {renderHorizontalStage(pokemon.evolutionChain, pokemon.id)}
            </div>
        </div>
    );
}
