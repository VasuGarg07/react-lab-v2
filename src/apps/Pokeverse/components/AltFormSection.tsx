import { Box, Sheet, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { AltForm } from '@/apps/Pokeverse/helpers/model.types';
import { getOfficialImage } from '@/apps/Pokeverse/helpers/utilities';

interface AltFormProps {
    varieties: AltForm[];
    primaryType: string
}

const AltFormsSection = ({ varieties, primaryType }: AltFormProps) => {
    const navigate = useNavigate();
    const accentColor = TYPE_COLORS[primaryType];

    const handleAltFormClick = (id: number) => {
        navigate(`/pokeverse/pokedex/${id}`);
    };

    return (
        <Box>

            {/* Varieties Grid */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                },
                gap: 2, mt: 2
            }}>
                {varieties.map((variety, index) => (
                    <Sheet
                        key={variety.name}
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.1 }
                        }}
                        whileHover={{ y: -5 }}
                        variant="soft"
                        onClick={() => handleAltFormClick(variety.id)}
                        sx={{
                            p: 2,
                            borderRadius: 'xl',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            position: 'relative',
                            aspectRatio: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            transition: 'all 0.2s',
                            boxShadow: 'sm',
                            '&:hover': {
                                bgcolor: `${accentColor}15`,
                            }
                        }}
                    >
                        {/* Background Gradient */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `radial-gradient(circle at center, ${accentColor}50 0%, transparent 70%)`,
                                opacity: 0.5
                            }}
                        />

                        {/* Pokemon Image */}
                        <motion.img
                            src={getOfficialImage(variety.id)}
                            alt={variety.name}
                            style={{
                                width: '80%',
                                height: '80%',
                                objectFit: 'contain',
                                position: 'relative',
                                display: 'block',
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        />

                        {/* Alt Form Name */}
                        <Typography
                            level="body-sm"
                            sx={{
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                position: 'relative',
                                zIndex: 1,
                                mb: 1,
                                maxWidth: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {variety.name}
                        </Typography>
                    </Sheet>
                ))}
            </Box>

            {varieties.length === 0 && (
                <Sheet
                    variant="soft"
                    sx={{
                        p: 3,
                        borderRadius: 'xl',
                        textAlign: 'center'
                    }}
                >
                    <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
                        No alternate forms available for this Pokémon
                    </Typography>
                </Sheet>
            )}
        </Box>
    );
};

export default AltFormsSection;