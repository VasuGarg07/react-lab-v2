import React from 'react';
import { motion } from 'framer-motion';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Pokemon, Stats } from '@/apps/Pokeverse/helpers/model.types';
import { StatsRadar } from './PokemonUI';

interface StatBarProps {
    stat: Stats;
    primaryType: string;
    index: number;
}

const StatBar: React.FC<StatBarProps> = ({ stat, primaryType, index }) => {
    // Calculate percentage for the bar width (max base stat is 255)
    const percentage = Math.min((stat.value / 255) * 100, 100);

    // Format stat name
    const formatStatName = (name: string) => {
        switch (name) {
            case 'hp': return 'HP';
            case 'attack': return 'Attack';
            case 'defense': return 'Defense';
            case 'special-attack': return 'Sp. Atk';
            case 'special-defense': return 'Sp. Def';
            case 'speed': return 'Speed';
            default: return name;
        }
    };

    return (
        <motion.div
            className="mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">{formatStatName(stat.name)}</span>
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{stat.value}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: TYPE_COLORS[primaryType] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                />
            </div>
        </motion.div>
    );
};

interface StatsSectionProps {
    pokemon: Pokemon;
}

const StatsSection: React.FC<StatsSectionProps> = ({ pokemon }) => {
    const primaryType = pokemon.types[0];

    // Calculate total base stats
    const totalBaseStats = pokemon.stats.reduce((sum, stat) => sum + stat.value, 0);

    return (
        <div className="w-full text-gray-800 dark:text-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Base Stats</h3>

            <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Stat Bars */}
                <div className="space-y-1">
                    {pokemon.stats.map((stat, index) => (
                        <StatBar
                            key={stat.name}
                            stat={stat}
                            primaryType={primaryType}
                            index={index}
                        />
                    ))}

                    <motion.div
                        className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <span className="font-medium text-gray-800 dark:text-gray-200">Total</span>
                        <span
                            className="font-bold text-lg"
                            style={{ color: TYPE_COLORS[primaryType] }}
                        >
                            {totalBaseStats}
                        </span>
                    </motion.div>
                </div>

                {/* Right Column: Radar Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white/50 dark:bg-white/5 backdrop-blur-[10px] rounded-xl p-4 shadow-sm"
                >
                    <StatsRadar stats={pokemon.stats} primaryType={primaryType} />
                </motion.div>
            </div>
        </div>
    );
};

export default StatsSection;