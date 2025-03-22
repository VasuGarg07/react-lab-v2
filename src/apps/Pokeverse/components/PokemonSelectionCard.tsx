import React from 'react';
import { motion } from 'framer-motion';
import { GRADIENTS } from '@/apps/Pokeverse/helpers/constant';
import { getOfficialImage } from '@/apps/Pokeverse/helpers/utilities';
import { cn } from '@/shared/cn';

interface PokemonSelectionCardProps {
    id: number;
    name: string;
    isSelected: boolean;
    isPlayer1: boolean;
    onClick: () => void;
}

export const PokemonSelectionCard: React.FC<PokemonSelectionCardProps> = ({
    id,
    name,
    isSelected,
    isPlayer1,
    onClick,
}) => {
    const selectedGradient = isPlayer1 ? GRADIENTS.blue : GRADIENTS.ruby;
    const gradientBg = `linear-gradient(145deg, ${selectedGradient.from}, ${selectedGradient.to})`;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                'cursor-pointer flex flex-col items-center justify-center text-center rounded-xl shadow-sm transition-all duration-300 overflow-hidden',
                isSelected
                    ? 'text-white'
                    : 'bg-neutral-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100',
                'hover:shadow-md'
            )}
            style={{
                background: isSelected ? gradientBg : undefined,
            }}
        >
            <img
                src={getOfficialImage(id)}
                alt={name}
                loading="lazy"
                className={cn(
                    'w-full h-full object-contain transition duration-300 p-4',
                    isSelected ? 'brightness-110' : ''
                )}
            />
            <p
                className={cn(
                    'text-lg font-medium capitalize px-2 pt-2 py-4 w-full truncate transition-all',
                    isSelected ? 'text-white drop-shadow-md font-bold' : 'dark:text-gray-200 text-gray-800'
                )}
            >
                {name}
            </p>
        </motion.div>
    );
};
