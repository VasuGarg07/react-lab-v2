import { Box, Sheet, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { Crown, Dumbbell, EyeOff, Heart, Ruler, Scale, Target, TreePine } from 'lucide-react';
import React from 'react';
import { REGION_DATA, TYPE_COLORS } from '../helpers/constant';
import { Pokemon } from '../helpers/model.types';
import { formatString } from '../helpers/utilities';

interface ChipProps {
    ability: string;
    color: string;
    isHidden?: boolean
}

const AbilitiyChip: React.FC<ChipProps> = ({ ability, color, isHidden }) => {

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 2,
                py: 1,
                boxShadow: 'sm',
                borderRadius: 'lg',
                background: `${color}24`,
                '&:hover': { boxShadow: 'md' },
            }}
        >
            <Typography level="body-sm" sx={{
                mr: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                {formatString(ability)}
                {isHidden && (
                    <EyeOff size={12} color={color} />
                )}
            </Typography>
        </Box>
    );
}


interface InfoSectionProps {
    pokemon: Pokemon;
}

const InfoSection = ({ pokemon }: InfoSectionProps) => {
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
        <Box component={motion.div} layout>
            {/* Quick Stats Grid */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(3, 1fr)',
                },
                gap: 2,
                my: 1
            }}>
                {statsCards.map(({ icon: Icon, label, value }) => (
                    <Sheet
                        key={label}
                        component={motion.div}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        variant="soft"
                        sx={{
                            p: 2,
                            borderRadius: 'lg',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1,
                            textAlign: 'center',
                            transition: 'all 0.2s',
                            borderBottom: '2px solid',
                            borderColor: accentColor
                        }}
                    >
                        <Icon size={24} color={accentColor} />
                        <Box>
                            <Typography level="body-xs" sx={{ color: 'text.secondary' }}>
                                {label}
                            </Typography>
                            <Typography level="body-lg" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                                {value}
                            </Typography>
                        </Box>
                    </Sheet>
                ))}
            </Box>

            {/* Generation & Genre */}
            <Sheet
                variant="soft"
                sx={{
                    p: 2,
                    borderRadius: 'lg',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: `2px solid ${accentColor}`,
                    gap: 2
                }}
            >
                <Crown size={24} color={accentColor} />
                <Box>
                    <Typography level="body-xs" sx={{ color: 'text.secondary' }}>Generation {pokemon.generation}</Typography>
                    <Typography level="body-lg" fontWeight="bold">
                        {REGION_DATA[pokemon.generation - 1].name}
                    </Typography>
                </Box>
                <Box sx={{ height: '24px', width: '1px', bgcolor: 'divider', mx: 2 }} />
                <Typography level="body-lg" sx={{ textTransform: 'capitalize' }}>
                    {pokemon.genre}
                </Typography>
            </Sheet>

            {/* Abilities */}
            <Sheet
                variant="soft"
                sx={{
                    p: 2,
                    borderRadius: 'lg',
                    borderBottom: `2px solid ${accentColor}`,
                }}
            >
                <Typography level="title-md" sx={{ mb: 2 }}>Abilities</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {pokemon.abilities.map((ability, index) => (
                        <AbilitiyChip key={index} ability={ability.name} color={accentColor} isHidden={ability.isHidden} />
                    ))}
                </Box>
            </Sheet>
        </Box>
    );
};

export default InfoSection;