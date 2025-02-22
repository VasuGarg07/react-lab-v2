import { Box, Sheet, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';

interface GalleryImage {
    label: string;
    url: string;
}

interface GallerySectionProps {
    id: number;
    primaryType: string;
}

const GallerySection = ({ id, primaryType }: GallerySectionProps) => {
    const accentColor = TYPE_COLORS[primaryType];

    const galleryImages: Record<string, GalleryImage[]> = {
        "Official Artwork": [
            {
                label: "Regular Form",
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            },
            {
                label: "✨ Shiny Form",
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
            }
        ],
        "3D Render": [
            {
                label: "Regular Form",
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
            },
            {
                label: "✨ Shiny Form",
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`
            }
        ],
        // "Game Sprites": [
        //     {
        //         label: "Regular Form",
        //         url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        //     },
        //     {
        //         label: "✨ Shiny Form",
        //         url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
        //     }
        // ]
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            mt: 2
        }}>
            {Object.entries(galleryImages).map(([category, images]) => (
                <Box key={category}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2
                    }}>
                        <ImageIcon size={24} color={accentColor} />
                        <Typography level="h3">{category}</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'center'
                    }}>
                        {images.map((image) => (
                            <Sheet
                                key={image.label}
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                variant="soft"
                                sx={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    p: 3,
                                    borderRadius: 'xl',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: 'sm',
                                    aspectRatio: '1',
                                }}
                            >
                                <motion.img
                                    src={image.url}
                                    alt={`${category} ${image.label}`}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        maxWidth: '90%',
                                        maxHeight: '90%',
                                        objectFit: 'contain',
                                        padding: '2rem',
                                        zIndex: 2,
                                        position: 'relative'
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: `radial-gradient(circle at center, ${accentColor}40 0%, ${accentColor}20 30%, transparent 70%)`,
                                        opacity: image.label.includes('✨') ? 0.9 : 0.6,
                                        zIndex: 1
                                    }}
                                />

                                <Typography
                                    level="body-sm"
                                    sx={{
                                        mt: 2,
                                        textAlign: 'center',
                                        color: 'text.secondary'
                                    }}
                                >
                                    {image.label}
                                </Typography>
                            </Sheet>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default GallerySection;