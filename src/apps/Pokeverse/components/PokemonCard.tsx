import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Pokemon } from '@/apps/Pokeverse/helpers/model.types';

interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const [isHovered, setIsHovered] = useState(false);
    const primaryType = pokemon.types[0];

    return (
        <motion.div
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full h-full"
        >
            <div
                className="w-full h-full relative overflow-hidden rounded-2xl border dark:border-white/15 border-black/15 flex flex-col bg-white dark:bg-black"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Gradient */}
                <div
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-40'}`}
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${TYPE_COLORS[primaryType]}40, transparent 70%)`
                    }}
                />

                {/* Pokemon Number */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
                    <Sparkles
                        size={18}
                        fill={TYPE_COLORS[primaryType]}
                        color={TYPE_COLORS[primaryType]}
                    />
                    <span
                        className="text-lg font-bold font-mono"
                        style={{ color: TYPE_COLORS[primaryType] }}
                    >
                        #{pokemon.id.toString().padStart(3, '0')}
                    </span>
                </div>

                {/* Pokemon Image */}
                <motion.div
                    animate={isHovered ? { scale: 1.15, y: -10 } : { scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative z-[2] flex-1 flex items-center justify-center mt-5"
                >
                    <img
                        src={pokemon.sprites.other['home'].front_default}
                        alt={pokemon.name}
                        className={`w-3/4 h-3/4 object-contain transition-all duration-300 ${isHovered
                            ? 'drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                            : 'drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]'
                            }`}
                    />
                </motion.div>

                {/* Info Panel */}
                <div
                    className={`p-2 m-4 rounded-lg backdrop-blur-md border-t dark:border-white/10 border-black/10 transition-all duration-300 h-[120px] relative overflow-hidden ${isHovered
                        ? 'dark:bg-white/10 bg-black/[0.03]'
                        : 'dark:bg-black/60 bg-white/80'
                        }`}
                >
                    {/* Shine effect overlay */}
                    <div
                        className={`absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full ${isHovered ? 'animate-shine' : ''
                            }`}
                    />

                    <h3
                        className={`text-2xl uppercase font-['Kanit'] tracking-wider text-center mb-4 transition-all duration-300 dark:text-white text-black ${isHovered ? 'text-shadow' : ''
                            }`}
                        style={{
                            textShadow: isHovered ? `0 0 20px ${TYPE_COLORS[primaryType]}80` : 'none'
                        }}
                    >
                        {pokemon.name}
                    </h3>

                    <div className="flex justify-center gap-2">
                        {pokemon.types.map(type => (
                            <span
                                key={type}
                                className="px-3 py-1 rounded-full text-white text-sm uppercase tracking-wider border border-white/20 font-['Montserrat'] transition-all duration-300"
                                style={{ backgroundColor: TYPE_COLORS[type] }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Global styles for animations */}
            <style>
                {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50%, 100% { transform: translateX(100%); }
          }
          
          .animate-shine {
            animation: shine 2s infinite linear;
          }
        `}
            </style>
        </motion.div>
    );
};

export default PokemonCard;