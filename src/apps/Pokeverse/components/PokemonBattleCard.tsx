import { Box, Card, Chip, LinearProgress, Stack, Typography, useColorScheme } from "@mui/joy";
import { motion } from "framer-motion";
import { BattlePokemon } from "@/apps/Pokeverse/helpers/battle.types";
import { TYPE_COLORS } from "@/apps/Pokeverse/helpers/constant";
import { getOfficialImage } from "@/apps/Pokeverse/helpers/utilities";

interface PokemonBattleCardProps {
    pokemon: BattlePokemon,
    isOpponent?: boolean
}

const PokemonBattleCard = ({ pokemon, isOpponent = false }: PokemonBattleCardProps) => {
    const { mode } = useColorScheme();
    const isDark = mode === 'dark';

    const firstColor = TYPE_COLORS[pokemon.types[0]];
    const secondColor = TYPE_COLORS[pokemon.types[1]];

    return (
        <Card
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 'lg',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                background: isDark ? '#000000' : '#ffffff',
                boxShadow: 'md',
                maxWidth: 500,
                ...(isOpponent ? { marginLeft: 'auto' } : { marginRight: 'auto' })
            }}
        >
            {/* Background Gradient */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `
                            radial-gradient(circle at ${isOpponent ? '0%' : '100%'} 50%, ${firstColor}66, transparent 70%)
                        `,
                    opacity: 0.8,
                    transition: 'opacity 0.3s ease',
                }}
            />

            <Stack
                direction={isOpponent ? 'row-reverse' : 'row'}
                spacing={3}
                alignItems="center"
                sx={{ position: 'relative' }}
            >
                <Box sx={{ flex: '1 1 60%' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography
                            level="h3"
                            sx={{
                                textTransform: 'uppercase',
                                background: `linear-gradient(135deg, ${firstColor}, ${secondColor ? secondColor : firstColor})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {pokemon.name}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                            {pokemon.types.map(type => (
                                <Chip
                                    key={type}
                                    size="sm"
                                    sx={{
                                        background: TYPE_COLORS[type],
                                        textTransform: 'capitalize',
                                        borderRadius: '4px'
                                    }}
                                >
                                    {type}
                                </Chip>
                            ))}
                        </Stack>
                    </Stack>

                    <Box sx={{ mb: 2, position: 'relative' }}>
                        <LinearProgress
                            determinate
                            thickness={8}
                            value={(pokemon.currentHP / pokemon.maxHP) * 100}
                            sx={{
                                '--LinearProgress-radius': '8px',
                                '--LinearProgress-progressRadius': '6px',
                                bgcolor: 'background.level2',
                                borderRadius: '8px',
                                '& .MuiLinearProgress-bar': {
                                    transition: 'transform 0.3s ease-in-out',
                                    background: `linear-gradient(90deg, 
                                        ${pokemon.currentHP / pokemon.maxHP > 0.5 ? '#2ECC71' :
                                            pokemon.currentHP / pokemon.maxHP > 0.2 ? '#F1C40F' : '#E74C3C'} 0%,
                                        ${pokemon.currentHP / pokemon.maxHP > 0.5 ? '#27AE60' :
                                            pokemon.currentHP / pokemon.maxHP > 0.2 ? '#F39C12' : '#C0392B'} 100%)`
                                }
                            }}
                        />
                        <Typography
                            level="body-sm"
                            sx={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'text.tertiary',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                        >
                            {pokemon.currentHP}/{pokemon.maxHP}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        flex: '0 0 auto',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: '-20px',
                            background: `radial-gradient(circle, ${firstColor}20 0%, transparent 70%)`,
                            zIndex: 0
                        }
                    }}
                >
                    <motion.img
                        src={getOfficialImage(pokemon.id)}
                        alt={pokemon.name}
                        style={{
                            width: 180,
                            height: 180,
                            objectFit: 'contain',
                            position: 'relative',
                            zIndex: 1,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                        }}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </Box>
            </Stack>
        </Card>
    );
}

export default PokemonBattleCard;