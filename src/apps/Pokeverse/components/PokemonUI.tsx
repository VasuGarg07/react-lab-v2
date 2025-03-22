import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Scale, Sparkles, TreePine } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Pokemon, Stats } from '@/apps/Pokeverse/helpers/model.types';

interface ImageCardProps {
    pokemon: Pokemon;
}

export const ImageCard: React.FC<ImageCardProps> = ({ pokemon }) => {
    const primaryType = pokemon.types[0];

    return (
        <div className="relative aspect-square mb-12 rounded-[30px] overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/30 dark:border-white/10 max-w-[400px] mx-auto text-neutral-800 dark:text-neutral-100">
            {/* Background Gradient */}
            <div
                className="absolute top-0 left-0 w-full h-full opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${TYPE_COLORS[primaryType]}40, transparent 100%)`
                }}
            />
            {/* Pokemon Number */}
            <div className="absolute top-4 right-4 z-[3] flex items-center gap-2">
                <Sparkles
                    size={18}
                    fill={TYPE_COLORS[primaryType]}
                    color={TYPE_COLORS[primaryType]}
                />
                <span
                    className="text-[1.2rem] font-mono font-bold"
                    style={{ color: TYPE_COLORS[primaryType] }}
                >
                    #{pokemon.id.toString().padStart(3, '0')}
                </span>
            </div>

            <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="absolute w-[90%] h-[90%] left-[5%] top-[5%] object-contain"
            />
        </div>
    );
};

// ===== Type Badge with Animation =====
interface TypeBadgeProps {
    type: string;
    color: string;
}

export const AnimatedTypeBadge: React.FC<TypeBadgeProps> = ({ type, color }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <div
            className="px-6 py-1.5 rounded-[30px] text-white capitalize text-[0.9rem] font-semibold tracking-[0.5px] flex items-center gap-1"
            style={{
                backgroundColor: color,
                boxShadow: `0 4px 20px ${color}66`
            }}
        >
            {type}
        </div>
    </motion.div>
);

interface StatsRadarProps {
    stats: Stats[];
    primaryType: string;
}

const StatLabels: Record<string, string> = {
    'hp': "HP",
    'attack': "ATK",
    'defense': "DEF",
    'special-attack': "SPL ATK",
    'special-defense': "SPL DEF",
    'speed': "SPD"
};

export const StatsRadar: React.FC<StatsRadarProps> = ({ stats, primaryType }) => {
    const chartData = stats.map(stat => ({
        subject: StatLabels[stat.name],
        value: stat.value,
        fullMark: 255
    }));

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid gridType="polygon" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                            fill: 'var(--text-secondary, #666)',
                            fontSize: 14
                        }}
                    />
                    <Tooltip />
                    <Radar
                        name="Base Stat"
                        dataKey="value"
                        stroke={TYPE_COLORS[primaryType]}
                        fill={TYPE_COLORS[primaryType]}
                        fillOpacity={0.2}
                        strokeWidth={2}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

interface QuickStatsProps {
    pokemon: Pokemon;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ pokemon }) => {
    const primaryType = pokemon.types[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-[10px] mt-2 text-neutral-800 dark:text-neutral-100"
        >
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1" style={{ color: TYPE_COLORS[primaryType] }}>
                    <Heart size={20} />
                    <div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">Base Happiness</p>
                        <p className="text-sm font-bold">{pokemon.baseHappiness}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1" style={{ color: TYPE_COLORS[primaryType] }}>
                    <Scale size={20} />
                    <div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">Weight</p>
                        <p className="text-sm font-bold">{pokemon.weight}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1" style={{ color: TYPE_COLORS[primaryType] }}>
                    <Dumbbell size={20} />
                    <div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">Base Exp</p>
                        <p className="text-sm font-bold">{pokemon.baseExp}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1" style={{ color: TYPE_COLORS[primaryType] }}>
                    <TreePine size={20} />
                    <div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">Habitat</p>
                        <p className="text-sm font-bold capitalize">
                            {pokemon.habitat || 'Unknown'}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};