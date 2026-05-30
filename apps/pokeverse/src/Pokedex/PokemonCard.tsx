import { Sparkles } from 'lucide-react';
import { TYPE_COLORS, getHomeSprite } from '../helpers/constants';
import { formatPokemonId } from '../helpers/utilities';
import type { Pokemon } from '../helpers/types';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const primaryType = pokemon.types[0];
    const typeColor = TYPE_COLORS[primaryType];

    return (
        <div className="relative w-full h-full group">
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/15 bg-white transition-transform duration-300 dark:border-white/15 dark:bg-black group-hover:scale-102 group-hover:shadow-lg">
                <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-80"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${typeColor}40, transparent 70%)` }}
                />

                <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
                    <Sparkles size={18} fill={typeColor} color={typeColor} />
                    <span className="font-mono text-lg font-bold" style={{ color: typeColor }}>
                        {formatPokemonId(pokemon.id)}
                    </span>
                </div>

                <div className="relative z-10 mt-5 flex flex-1 items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                    <img
                        src={getHomeSprite(pokemon.id)}
                        alt={pokemon.name}
                        className="h-3/4 w-3/4 object-contain transition-all duration-300 drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(0,0,0,0.6)]"
                    />
                </div>

                <div className="relative m-4 rounded-xl border border-neutral-200 dark:border-white/10 p-3 backdrop-blur-md transition-all duration-300 bg-white/5 group-hover:-translate-y-1">
                    <h3
                        className="relative mb-2 text-center text-lg font-bold uppercase tracking-wide text-neutral-900 transition-transform duration-300 dark:text-white group-hover:scale-105"
                        style={{ color: typeColor }}
                    >
                        {pokemon.name}
                    </h3>

                    <div className="relative flex flex-wrap justify-center gap-2">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className="inline-flex items-center gap-1 rounded-full border border-white/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5"
                                style={{ backgroundColor: TYPE_COLORS[type] }}
                            >
                                <span className="h-2 w-2 rounded-full bg-white/80" />
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
