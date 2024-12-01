import { Box, Sheet, Typography, useColorScheme } from '@mui/joy';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Scale, Sparkles, TreePine } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TYPE_COLORS } from '../helpers/constant';
import { Pokemon, Stats } from '../helpers/model.types';

export const ImageCard = ({ pokemon }: { pokemon: Pokemon }) => {

    const { mode } = useColorScheme();
    const isDarkMode = mode === 'dark';
    const primaryType = pokemon.types[0];

    return (
        <Box sx={{
            position: 'relative',
            aspectRatio: '1',
            mb: 3,
            borderRadius: '30px',
            overflow: 'hidden',
            bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
            maxWidth: 400,
            mx: 'auto'
        }}>
            {/* Background Gradient */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `
            radial-gradient(circle at 50% 50%, ${TYPE_COLORS[primaryType]}40, transparent 100%)
        `,
                    opacity: 1,
                    transition: 'opacity 0.3s ease',
                }}
            />
            {/* Pokemon Number */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                }}
            >
                <Sparkles
                    size={18}
                    fill={TYPE_COLORS[primaryType]}
                    color={TYPE_COLORS[primaryType]}
                />
                <Typography
                    level="title-lg"
                    sx={{
                        color: TYPE_COLORS[primaryType],
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}
                >
                    #{pokemon.id.toString().padStart(3, '0')}
                </Typography>
            </Box>

            <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                style={{
                    position: 'absolute',
                    width: '90%',
                    height: '90%',
                    left: '5%',
                    top: '5%',
                    objectFit: 'contain'
                }}
            />
        </Box>
    )
}


// ===== Type Badge with Animation =====
interface TypeBadgeProps {
    type: string;
    color: string;
}

export const AnimatedTypeBadge = ({ type, color }: TypeBadgeProps) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <Box
            sx={{
                px: 3,
                py: 1.5,
                borderRadius: '30px',
                bgcolor: color,
                color: 'white',
                textTransform: 'capitalize',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: `0 4px 20px ${color}66`,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}
        >
            {type}
        </Box>
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
}

export const StatsRadar = ({ stats, primaryType }: StatsRadarProps) => {
    const chartData = stats.map(stat => ({
        subject: StatLabels[stat.name],
        value: stat.value,
        fullMark: 255
    }));

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid gridType="polygon" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                            fill: 'text.secondary',
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
        </Box>
    );
};


export const QuickStats = ({ pokemon }: { pokemon: Pokemon }) => {
    const { mode } = useColorScheme();
    const isDarkMode = mode === 'dark';
    const primaryType = pokemon.types[0];

    return (
        <Sheet
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
                p: 2,
                borderRadius: 'xl',
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(10px)',
                mt: 2
            }}
        >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: TYPE_COLORS[primaryType]
                }}>
                    <Heart size={20} />
                    <Box>
                        <Typography level="body-xs">Base Happiness</Typography>
                        <Typography level="body-md" fontWeight="bold">{pokemon.baseHappiness}</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: TYPE_COLORS[primaryType]
                }}>
                    <Scale size={20} />
                    <Box>
                        <Typography level="body-xs">Weight</Typography>
                        <Typography level="body-md" fontWeight="bold">{pokemon.weight}</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: TYPE_COLORS[primaryType]
                }}>
                    <Dumbbell size={20} />
                    <Box>
                        <Typography level="body-xs">Base Exp</Typography>
                        <Typography level="body-md" fontWeight="bold">{pokemon.baseExp}</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: TYPE_COLORS[primaryType]
                }}>
                    <TreePine size={20} />
                    <Box>
                        <Typography level="body-xs">Habitat</Typography>
                        <Typography level="body-md" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                            {pokemon.habitat || 'Unknown'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Sheet>
    );
}