import React from 'react';
import { Box, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getOfficialImage, getRandomColor } from '../helpers/utilities';
import { EvolutionDetails } from '../helpers/model.types';
import { useNavigate } from 'react-router-dom';

interface Props {
    evolution: EvolutionDetails;
}
// Generate random pastel colors for gradients


const EvolutionStage = ({ pokemon }: { pokemon: EvolutionDetails }) => {
    const [color1] = React.useState(getRandomColor());
    const [color2] = React.useState(getRandomColor());
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Box
                sx={{
                    width: { xs: '80px', sm: '100px', md: '120px' },
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                        cursor: "pointer"
                    }
                }}
                onClick={() => navigate("/pokeverse/pokedex/" + pokemon.id)}
            >
                <Box
                    sx={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: 'sm',
                        display: 'flex',  // Added flex display
                        alignItems: 'center',  // Center vertically
                        justifyContent: 'center',  // Center horizontally
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: `radial-gradient(circle at top left, ${color1}, ${color2})`,
                            opacity: 0.3,
                        }
                    }}
                >
                    <motion.img
                        src={getOfficialImage(pokemon.id)}
                        alt={pokemon.name}
                        style={{
                            width: '90%',
                            height: '90%',
                            objectFit: 'contain',
                            position: 'relative',  // Changed from absolute
                            display: 'block',  // Added display block
                        }}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    />
                </Box>
                <Typography
                    level="body-sm"
                    sx={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {pokemon.name}
                </Typography>
            </Box>
        </motion.div>
    );
};


const EvolutionArrow = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            px: { xs: 0.5, sm: 1, md: 2 },
        }}
    >
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                animate={{
                    x: [0, 5, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <ArrowRight
                    size={20}
                />
            </motion.div>
        </motion.div>
    </Box>
);

const EvolutionBranch = ({ evolution }: Props) => {
    const hasMultipleEvolutions = evolution.evolvesTo.length > 1;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EvolutionStage pokemon={evolution} />

            {evolution.evolvesTo.length > 0 && (
                <>
                    <EvolutionArrow />
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: { xs: 1, sm: 2 },
                        }}
                    >
                        {evolution.evolvesTo.map((evo) => (
                            <Box
                                key={evo.id}
                                sx={{
                                    zIndex: 1,
                                    bgcolor: 'background.surface',
                                    padding: hasMultipleEvolutions ? '4px' : 0,
                                    borderRadius: 'lg',
                                }}
                            >
                                <EvolutionBranch evolution={evo} />
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

const EvolutionChain = ({ evolution }: Props) => {
    return (
        <Box
            sx={{
                width: '100%',
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.surface',
                borderRadius: 'lg',
                boxShadow: 'sm',
                overflow: 'auto',
                my: 1
            }}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    minWidth: 'min-content',
                }}
            >
                <EvolutionBranch evolution={evolution} />
            </Box>
        </Box>
    );
};

export default EvolutionChain;