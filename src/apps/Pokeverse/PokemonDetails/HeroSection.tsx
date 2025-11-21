import { ArrowLeft } from "lucide-react";
import { getHomeSprite, TYPE_COLORS } from "../helpers/constants";
import type { Pokemon } from "../helpers/types";
import { formatPokemonId } from "../helpers/utilities";
import { useNavigate } from "react-router";

export default function HeroSection({ pokemon }: { pokemon: Pokemon }) {
    const primaryType = pokemon.types[0];
    const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;
    const navigate = useNavigate();

    return (
        <div
            className="relative py-8 px-4"
            style={{
                background: `linear-gradient(135deg, ${typeColor}15 0%, ${typeColor}30 100%)`,
            }}
        >
            {/* Back Button */}
            <button
                onClick={() => navigate('/pokeverse/pokedex')}
                className="absolute top-3 left-3 p-2 rounded-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
                <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </button>

            {/* Hero Content */}
            <div className="max-w-4xl mx-auto text-center space-y-4">
                {/* Pokemon Image */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
                    <img
                        src={getHomeSprite(pokemon.id)}
                        alt={pokemon.name}
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Pokemon Name & ID */}
                <div className="space-y-1">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        {formatPokemonId(pokemon.id)}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 capitalize">
                        {pokemon.name}
                    </h1>
                </div>

                {/* Type Badges */}
                <div className="flex items-center justify-center gap-2">
                    {pokemon.types.map((type) => (
                        <span
                            key={type}
                            className="px-3 py-1.5 rounded-full text-sm font-semibold text-white capitalize shadow-md"
                            style={{ backgroundColor: TYPE_COLORS[type] }}
                        >
                            {type}
                        </span>
                    ))}
                </div>

                {/* Genre */}
                {pokemon.genre && (
                    <p className="text-base text-neutral-700 dark:text-neutral-300 italic">
                        {pokemon.genre}
                    </p>
                )}
            </div>
        </div>
    );
}