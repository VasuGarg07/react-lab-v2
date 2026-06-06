import { useNavigate } from 'react-router';
import { Shuffle } from 'lucide-react';
import type { Pokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';
import { getOfficialSprite } from '../helpers/constants';

export default function VarietiesSection({ pokemon }: { pokemon: Pokemon }) {
    const navigate = useNavigate();

    if (!pokemon.varieties || pokemon.varieties.length === 0) {
        return (
            <div className="p-8 bg-white rounded-xl border border-silver/40 text-center">
                <Shuffle className="w-10 h-10 mx-auto mb-3 text-silver" />
                <p className="text-sm text-smoke">No alternate forms available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pokemon.varieties.map((variety) => (
                <button
                    key={variety.id}
                    onClick={() => navigate(`/pokedex/${variety.id}`)}
                    className="group p-4 bg-white rounded-xl border border-silver/40 hover:border-silver hover:shadow-md transition-all duration-200"
                >
                    <div className="relative aspect-square mb-3 bg-chalk rounded-lg overflow-hidden">
                        <img
                            src={getOfficialSprite(variety.id)}
                            alt={variety.name}
                            className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm font-bold text-shadow capitalize truncate">{formatString(variety.name)}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}
