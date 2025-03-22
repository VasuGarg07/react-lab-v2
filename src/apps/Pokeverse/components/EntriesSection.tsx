import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { motion } from 'framer-motion';
import React from 'react';

interface EntriesSectionProps {
    flavorTexts: string[];
    primaryType: string;
}

const EntriesSection: React.FC<EntriesSectionProps> = ({ flavorTexts, primaryType }) => {
    const accentColor = TYPE_COLORS[primaryType];

    return (
        <div className="w-full text-neutral-800 dark:text-neutral-100">

            {/* Entry Counter */}
            <div className="flex items-center justify-end mb-2">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {flavorTexts.length} entries
                </span>
            </div>

            {/* Entries Column */}
            <div className="space-y-3">
                {flavorTexts.map((text, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0.8 }}
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.2 }
                        }}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-200 bg-white dark:bg-neutral-800 border-l-4 shadow-sm`}
                        style={{ borderColor: accentColor }}
                    >
                        <p className="text-base italic leading-relaxed">
                            {text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EntriesSection;