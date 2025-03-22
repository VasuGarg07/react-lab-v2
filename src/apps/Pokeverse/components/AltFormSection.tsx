import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { AltForm } from '@/apps/Pokeverse/helpers/model.types';
import { getOfficialImage } from '@/apps/Pokeverse/helpers/utilities';

interface AltFormProps {
    varieties: AltForm[];
    primaryType: string;
}

const AltFormsSection = ({ varieties, primaryType }: AltFormProps) => {
    const navigate = useNavigate();
    const accentColor = TYPE_COLORS[primaryType];

    const handleAltFormClick = (id: number) => {
        navigate(`/pokeverse/pokedex/${id}`);
    };

    return (
        <div>
            {/* Varieties Grid */}
            <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {varieties.map((variety, index) => (
                    <motion.div
                        key={variety.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.1 }
                        }}
                        whileHover={{ y: -5 }}
                        onClick={() => handleAltFormClick(variety.id)}
                        className={`relative flex flex-col items-center justify-end p-4 rounded-xl cursor-pointer overflow-hidden aspect-square shadow-sm transition-all duration-200 dark:bg-white/10 bg-black/5 hover:shadow-md hover:[${accentColor}15]`}
                    >
                        {/* Background Gradient */}
                        <div
                            className="absolute inset-0 opacity-50"
                            style={{
                                background: `radial-gradient(circle at center, ${accentColor}50 0%, transparent 70%)`
                            }}
                        />

                        {/* Pokemon Image */}
                        <motion.img
                            src={getOfficialImage(variety.id)}
                            alt={variety.name}
                            className="relative w-4/5 h-4/5 object-contain block"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        />

                        {/* Alt Form Name */}
                        <p className="relative z-10 mb-1 text-sm capitalize text-center truncate w-full dark:text-neutral-200 text-neutral-800">
                            {variety.name}
                        </p>
                    </motion.div>
                ))}
            </div>

            {varieties.length === 0 && (
                <div className="p-6 rounded-xl text-center bg-black/5 dark:bg-white/10">
                    <p className="text-lg text-neutral-500 dark:text-neutral-400">
                        No alternate forms available for this Pokémon
                    </p>
                </div>
            )}
        </div>
    );
};

export default AltFormsSection;