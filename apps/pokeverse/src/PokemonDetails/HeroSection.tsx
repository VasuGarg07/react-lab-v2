import { getHomeSprite, TYPE_COLORS } from "../helpers/constants";
import type { Pokemon } from "../helpers/types";
import { formatPokemonId } from "../helpers/utilities";

export default function HeroSection({ pokemon }: { pokemon: Pokemon }) {
    const primaryType = pokemon.types[0];
    const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

    return (
        <div
            className="relative py-10 px-4 text-center"
            style={{ background: `linear-gradient(135deg, ${typeColor}18 0%, ${typeColor}35 100%)` }}
        >
            <div className="max-w-4xl mx-auto space-y-4">
                <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
                    <img
                        src={getHomeSprite(pokemon.id)}
                        alt={pokemon.name}
                        className="w-full h-full object-contain drop-shadow-xl"
                    />
                </div>

                <div className="space-y-1">
                    <p className="text-xs font-mono font-bold text-smoke">
                        {formatPokemonId(pokemon.id)}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-black text-shadow capitalize tracking-tight">
                        {pokemon.name}
                    </h1>
                </div>

                <div className="flex items-center justify-center gap-2">
                    {pokemon.types.map((type) => (
                        <span
                            key={type}
                            className="px-3 py-1 rounded-full text-sm font-bold text-white capitalize shadow-sm"
                            style={{ backgroundColor: TYPE_COLORS[type] }}
                        >
                            {type}
                        </span>
                    ))}
                </div>

                {pokemon.genre && (
                    <p className="text-sm text-smoke italic">{pokemon.genre}</p>
                )}
            </div>
        </div>
    );
}
