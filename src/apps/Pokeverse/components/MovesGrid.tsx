import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Move } from '@/apps/Pokeverse/helpers/model.types';

interface MovesSectionProps {
    moves: Move[];
    primaryType: string;
}

const MovesSection: React.FC<MovesSectionProps> = ({ moves, primaryType }) => {
    const accentColor = TYPE_COLORS[primaryType];

    return (
        <div className="w-full text-neutral-800 dark:text-neutral-100">
            {/* Header */}
            <div className="flex justify-end items-center mb-6">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {moves.length} moves
                </span>
            </div>

            {/* Moves Grid */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {moves.map((move, index) => (
                    <motion.div
                        key={move.name}
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
                        className={`p-4 rounded-xl cursor-pointer flex items-center justify-between transition-all duration-200 border-2 hover:bg-[${accentColor}15]`}
                        style={{ borderColor: accentColor }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = `${accentColor}15`;
                            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                            e.currentTarget.style.boxShadow = '';
                        }}
                    >
                        <span className="text-base capitalize font-medium">
                            {move.name.replace('-', ' ')}
                        </span>

                        <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRight
                                size={20}
                                color={accentColor}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MovesSection;