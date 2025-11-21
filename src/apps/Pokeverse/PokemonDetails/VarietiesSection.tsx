import { useNavigate } from 'react-router';
import { Shuffle } from 'lucide-react';
import type { Pokemon } from '../helpers/types';
import { formatString, formatPokemonId } from '../helpers/utilities';
import { getOfficialSprite } from '../helpers/constants';

interface VarietiesSectionProps {
    pokemon: Pokemon;
}

export default function VarietiesSection({ pokemon }: VarietiesSectionProps) {
    const navigate = useNavigate();

    if (!pokemon.varieties || pokemon.varieties.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                <Shuffle className="w-12 h-12 mx-auto mb-3 text-neutral-400 dark:text-neutral-600" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    No alternate forms available
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pokemon.varieties.map((variety) => (
                <button
                    key={variety.id}
                    onClick={() => navigate(`/pokeverse/pokedex/${variety.id}`)}
                    className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
                >
                    {/* Image */}
                    <div className="relative aspect-square mb-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg overflow-hidden">
                        <img
                            src={getOfficialSprite(variety.id)}
                            alt={variety.name}
                            className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {formatPokemonId(variety.id)}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 capitalize truncate">
                            {formatString(variety.name)}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
}