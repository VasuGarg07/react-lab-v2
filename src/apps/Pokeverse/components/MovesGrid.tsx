import { Box, Sheet, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Move } from '@/apps/Pokeverse/helpers/model.types';

interface MovesSectionProps {
    moves: Move[];
    primaryType: string
}

const MovesSection = ({ moves, primaryType }: MovesSectionProps) => {
    const accentColor = TYPE_COLORS[primaryType];

    return (
        <Box>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mb: 3
            }}>
                <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    {moves.length} moves
                </Typography>
            </Box>

            {/* Moves Grid */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                },
                gap: 2
            }}>
                {moves.map((move, index) => (
                    <Sheet
                        key={move.name}
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.05 }
                        }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        variant="plain"
                        sx={{
                            p: 2,
                            borderRadius: 'lg',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '2px solid',
                            borderColor: accentColor,
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: `${accentColor}15`,
                                boxShadow: 'xs'
                            }
                        }}
                    >
                        <Typography
                            level="body-md"
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 500
                            }}
                        >
                            {move.name.replace('-', ' ')}
                        </Typography>

                        <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRight
                                size={20}
                                color={accentColor}
                            />
                        </motion.div>
                    </Sheet>
                ))}
            </Box>
        </Box>
    );
};

export default MovesSection;