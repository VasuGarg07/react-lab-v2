import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getOfficialImage, getRandomColor } from '@/apps/Pokeverse/helpers/utilities';
import { EvolutionDetails } from '@/apps/Pokeverse/helpers/model.types';
import { useNavigate } from 'react-router';

interface Props {
    evolution: EvolutionDetails;
}

const EvolutionStage: React.FC<{ pokemon: EvolutionDetails }> = ({ pokemon }) => {
    const [color1] = useState(getRandomColor());
    const [color2] = useState(getRandomColor());
    const navigate = useNavigate();

    // Create gradient CSS variable dynamically
    const gradientStyle = {
        '--gradient-bg': `radial-gradient(circle at top left, ${color1}, ${color2})`,
    } as React.CSSProperties;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className="flex flex-col items-center gap-4 relative cursor-pointer w-20 sm:w-24 md:w-32"
                onClick={() => navigate("/pokeverse/pokedex/" + pokemon.id)}
            >
                <div
                    className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-sm flex items-center justify-center"
                    style={gradientStyle}
                >
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{ background: 'var(--gradient-bg)' }}
                    />
                    <motion.img
                        src={getOfficialImage(pokemon.id)}
                        alt={pokemon.name}
                        className="w-[90%] h-[90%] object-contain relative block"
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    />
                </div>
                <p className="text-neutral-800 dark:text-neutral-100 text-xs sm:text-sm capitalize text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {pokemon.name}
                </p>
            </div>
        </motion.div>
    );
};

const EvolutionArrow: React.FC = () => (
    <div className="flex items-center px-0.5 sm:px-1 md:px-2">
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                animate={{
                    x: [0, 5, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className='text-neutral-800 dark:text-neutral-100'
            >
                <ArrowRight size={20} />
            </motion.div>
        </motion.div>
    </div>
);

const EvolutionBranch: React.FC<Props> = ({ evolution }) => {
    const hasMultipleEvolutions = evolution.evolvesTo.length > 1;

    return (
        <div className="flex items-center">
            <EvolutionStage pokemon={evolution} />

            {evolution.evolvesTo.length > 0 && (
                <>
                    <EvolutionArrow />
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                        {evolution.evolvesTo.map((evo) => (
                            <div
                                key={evo.id}
                                className={`z-10 bg-white dark:bg-gray-800 rounded-lg ${hasMultipleEvolutions ? 'p-1' : 'p-0'}`}
                            >
                                <EvolutionBranch evolution={evo} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const EvolutionChain: React.FC<Props> = ({ evolution }) => {
    return (
        <div className="w-full p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-auto my-1">
            <div className="inline-flex min-w-min">
                <EvolutionBranch evolution={evolution} />
            </div>
        </div>
    );
};

export default EvolutionChain;