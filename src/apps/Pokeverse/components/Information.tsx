import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Dumbbell, EyeOff, Heart, Ruler, Scale, Target, TreePine } from 'lucide-react';
import { REGION_DATA, TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Pokemon } from '@/apps/Pokeverse/helpers/model.types';
import { formatString } from '@/shared/utilities';

interface ChipProps {
    ability: string;
    color: string;
    isHidden?: boolean;
}

const AbilityChip: React.FC<ChipProps> = ({ ability, color, isHidden }) => {
    return (
        <div
            className="inline-flex items-center px-2 py-1 shadow-sm rounded-lg transition-shadow duration-200 hover:shadow-md"
            style={{ background: `${color}24` }}
        >
            <div className="text-sm mr-1 flex items-center gap-1">
                {formatString(ability)}
                {isHidden && (
                    <EyeOff size={12} color={color} />
                )}
            </div>
        </div>
    );
};

interface InfoSectionProps {
    pokemon: Pokemon;
}

const InfoSection: React.FC<InfoSectionProps> = ({ pokemon }) => {
    const primaryType = pokemon.types[0];
    const accentColor = TYPE_COLORS[primaryType];

    const statsCards = [
        { icon: Scale, label: 'Weight', value: pokemon.weight },
        { icon: Ruler, label: 'Height', value: pokemon.height },
        { icon: Dumbbell, label: 'Base Exp', value: pokemon.baseExp },
        { icon: Heart, label: 'Base Happiness', value: pokemon.baseHappiness },
        { icon: Target, label: 'Capture Rate', value: pokemon.captureRate },
        { icon: TreePine, label: 'Habitat', value: pokemon.habitat || 'Unknown' },
    ];

    return (
        <motion.div layout className="text-neutral-800 dark:text-neutral-100">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 my-1">
                {statsCards.map(({ icon: Icon, label, value }) => (
                    <motion.div
                        key={label}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-2 rounded-lg flex flex-col items-center gap-1 text-center transition-all duration-200 bg-neutral-100 dark:bg-neutral-800/50"
                        style={{ borderBottom: `2px solid ${accentColor}` }}
                    >
                        <Icon size={24} color={accentColor} />
                        <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {label}
                            </p>
                            <p className="text-lg font-bold capitalize">
                                {value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Generation & Genre */}
            <div
                className="p-2 my-2 rounded-lg flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/50"
                style={{ borderBottom: `2px solid ${accentColor}` }}
            >
                <Crown size={24} color={accentColor} />
                <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Generation {pokemon.generation}</p>
                    <p className="text-lg font-bold">
                        {REGION_DATA[pokemon.generation - 1].name}
                    </p>
                </div>
                <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-600 mx-2" />
                <p className="text-lg capitalize">
                    {pokemon.genre}
                </p>
            </div>

            {/* Abilities */}
            <div
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/50"
                style={{ borderBottom: `2px solid ${accentColor}` }}
            >
                <p className="text-base font-medium mb-2">Abilities</p>
                <div className="flex flex-wrap gap-1">
                    {pokemon.abilities.map((ability, index) => (
                        <AbilityChip key={index} ability={ability.name} color={accentColor} isHidden={ability.isHidden} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default InfoSection;