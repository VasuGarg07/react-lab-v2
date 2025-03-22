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
        <div className="flex flex-col gap-8 mt-4">
            {Object.entries(galleryImages).map(([category, images]) => (
                <div key={category}>
                    <div className="flex items-center gap-4 mb-4">
                        <ImageIcon size={24} color={accentColor} />
                        <h3 className="text-xl font-semibold dark:text-white text-neutral-800">{category}</h3>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-center">
                        {images.map((image) => (
                            <motion.div
                                key={image.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full max-w-[400px] p-6 rounded-xl overflow-hidden relative shadow-sm dark:bg-white/10 bg-black/5 aspect-square"
                            >
                                <motion.img
                                    src={image.url}
                                    alt={`${category} ${image.label}`}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-[90%] max-h-[90%] object-contain p-8 relative z-10 mx-auto"
                                />

                                <div
                                    className="absolute inset-0 z-0"
                                    style={{
                                        background: `radial-gradient(circle at center, ${accentColor}40 0%, ${accentColor}20 30%, transparent 70%)`,
                                        opacity: image.label.includes('✨') ? 0.9 : 0.6,
                                    }}
                                />

                                <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400 relative z-10">
                                    {image.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GallerySection;