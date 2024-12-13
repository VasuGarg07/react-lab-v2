import React from 'react';
import { Box, Card, Typography, useTheme } from '@mui/joy';
import { motion } from 'framer-motion';
import { GRADIENTS } from '../helpers/constant';
import { getOfficialImage } from '../helpers/utilities';

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
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const selectedGradient = isPlayer1 ? GRADIENTS.blue : GRADIENTS.ruby;

    return (
        <Card
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                background: isSelected
                    ? `linear-gradient(145deg, ${selectedGradient.from}, ${selectedGradient.to})`
                    : isDark
                        ? 'rgba(40, 40, 40, 0.8)'
                        : 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <Box
                component="img"
                src={getOfficialImage(id)}
                alt={name}
                loading="lazy"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: isSelected ? 'brightness(1.2)' : 'none',
                    transition: 'filter 0.3s ease-in-out',
                }}
            />
            <Typography
                level="body-lg"
                sx={{
                    textTransform: 'capitalize',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    color: isSelected ? '#fff' : isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                    textShadow: isSelected ? '0px 0px 5px rgba(0,0,0,0.5)' : 'none',
                    transition: 'color 0.3s ease-in-out, text-shadow 0.3s ease-in-out',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: 'calc(100% - 16px)'
                }}
            >
                {name}
            </Typography>
        </Card>
    );
};
