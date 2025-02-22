import { Box, Sheet, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { StatsRadar } from '@/apps/Pokeverse/components/PokemonUI';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Pokemon } from '@/apps/Pokeverse/helpers/model.types';

interface StatsSectionProps {
    pokemon: Pokemon;
}

const StatsSection = ({ pokemon }: StatsSectionProps) => {
    const primaryType = pokemon.types[0];
    const accentColor = TYPE_COLORS[primaryType];

    return (
        <Box>
            {/* Stats Display */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4,
                mt: 2
            }}>
                {/* Bar Charts */}
                <Sheet
                    variant="soft"
                    sx={{
                        p: 3,
                        borderRadius: 'xl',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        boxShadow: 'sm',
                    }}
                >
                    {pokemon.stats.map((stat) => (
                        <Box key={stat.name}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1
                            }}>
                                <Typography
                                    level="body-md"
                                    sx={{
                                        textTransform: 'capitalize',
                                        fontWeight: 500
                                    }}
                                >
                                    {stat.name.replace('-', ' ')}
                                </Typography>
                                <Typography
                                    level="body-md"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {stat.value}
                                </Typography>
                            </Box>
                            <Box sx={{
                                height: '8px',
                                bgcolor: 'background.level2',
                                borderRadius: 'lg',
                                overflow: 'hidden'
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stat.value / 255) * 100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    style={{
                                        height: '100%',
                                        backgroundColor: accentColor,
                                        transformOrigin: 'left'
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}

                    {/* Total Stats */}
                    <Box sx={{
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography
                                level="body-lg"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Total
                            </Typography>
                            <Typography
                                level="body-lg"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {pokemon.stats.reduce((sum, stat) => sum + stat.value, 0)}
                            </Typography>
                        </Box>
                    </Box>
                </Sheet>

                {/* Radar Chart */}
                <Sheet
                    variant="soft"
                    sx={{
                        p: 3,
                        borderRadius: 'xl',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'sm'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <StatsRadar
                            stats={pokemon.stats}
                            primaryType={pokemon.types[0]}
                        />
                    </motion.div>
                </Sheet>
            </Box>
        </Box>
    );
};

export default StatsSection;