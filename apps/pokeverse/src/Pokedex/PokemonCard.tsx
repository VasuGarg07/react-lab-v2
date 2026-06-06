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
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-silver/40 bg-white transition-transform duration-300 group-hover:scale-102 group-hover:shadow-lg">
                <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-80"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${typeColor}40, transparent 70%)` }}
                />

                <div className="absolute top-3 right-3 z-10">
                    <span className="font-mono text-xs font-bold" style={{ color: typeColor }}>
                        {formatPokemonId(pokemon.id)}
                    </span>
                </div>

                <div className="relative z-10 mt-5 flex flex-1 items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                    <img
                        src={getHomeSprite(pokemon.id)}
                        alt={pokemon.name}
                        className="h-3/4 w-3/4 object-contain transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-md"
                    />
                </div>

                <div className="relative m-3 rounded-xl border border-silver/20 p-2.5 transition-all duration-300 bg-chalk/60 group-hover:-translate-y-1">
                    <h3
                        className="relative mb-1.5 text-center text-sm font-black uppercase tracking-wide truncate transition-transform duration-300 group-hover:scale-105"
                        style={{ color: typeColor }}
                    >
                        {pokemon.name}
                    </h3>

                    <div className="relative flex flex-wrap justify-center gap-1">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                                style={{ backgroundColor: TYPE_COLORS[type] }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
