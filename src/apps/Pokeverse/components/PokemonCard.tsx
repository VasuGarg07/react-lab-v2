import { keyframes } from '@emotion/react';
import { Box, Card, Chip, Typography, useColorScheme } from '@mui/joy';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { TYPE_COLORS } from '../helpers/constant';
import { Pokemon } from '../helpers/model.types';

interface PokemonCardProps {
    pokemon: Pokemon;
}

const shine = keyframes`
  0% { transform: translateX(-100%); }
  50%, 100% { transform: translateX(100%); }
`;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { mode } = useColorScheme();
    const primaryType = pokemon.types[0];
    const isDark = mode === 'dark';

    console.log(pokemon)

    return (
        <motion.div
            transition={{ type: "spring", stiffness: 300 }}
            style={{ position: 'relative' }}
        >
            <Card
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    width: '100%',
                    height: '100%',
                    background: isDark ? '#000000' : '#ffffff',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
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
                            radial-gradient(circle at 50% 0%, ${TYPE_COLORS[primaryType]}40, transparent 70%)
                        `,
                        opacity: isHovered ? 0.8 : 0.4,
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

                {/* Pokemon Image */}
                <motion.div
                    animate={isHovered ?
                        { scale: 1.15, y: -10 } :
                        { scale: 1, y: 0 }
                    }
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                >
                    <Box
                        component="img"
                        src={pokemon.sprites.other['home'].front_default}
                        alt={pokemon.name}
                        sx={{
                            width: '75%',
                            height: '75%',
                            objectFit: 'contain',
                            filter: isHovered ?
                                'drop-shadow(0 0 30px rgba(255,255,255,0.2))' :
                                'drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
                            transition: 'filter 0.3s ease',
                        }}
                    />
                </motion.div>

                {/* Info Panel */}
                <Box
                    sx={{
                        padding: 2,
                        background: isHovered ?
                            (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)') :
                            (isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)'),
                        backdropFilter: 'blur(10px)',
                        borderTop: '1px solid',
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        height: '120px',
                        borderRadius: 'md',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '200%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            animation: isHovered ? `${shine} 2s infinite linear` : 'none',
                        }
                    }}
                >
                    <Typography
                        level="h3"
                        sx={{
                            textTransform: 'uppercase',
                            fontFamily: 'Kanit',
                            letterSpacing: 1,
                            textAlign: 'center',
                            color: isDark ? '#ffffff' : '#000000',
                            mb: 2,
                            fontSize: '1.5rem',
                            textShadow: isHovered ?
                                `0 0 20px ${TYPE_COLORS[primaryType]}80` :
                                'none',
                            transition: 'text-shadow 0.3s ease',
                        }}
                    >
                        {pokemon.name}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                        }}
                    >
                        {pokemon.types.map(type => (
                            <Chip
                                key={type}
                                variant="solid"
                                size="md"
                                sx={{
                                    background: TYPE_COLORS[type],
                                    color: '#ffffff',
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    fontFamily: 'Montserrat',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: TYPE_COLORS[type],
                                    },
                                }}
                            >
                                {type}
                            </Chip>
                        ))}
                    </Box>
                </Box>
            </Card>
        </motion.div>
    );
};

export default PokemonCard;