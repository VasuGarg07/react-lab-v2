import React from 'react';
import { motion } from 'framer-motion';

interface VisualizationProps {
    array: number[];
    activeIndices?: number[]; // Indices being compared or swapped
}

const Visualization: React.FC<VisualizationProps> = ({
    array,
    activeIndices = []
}) => {
    return (
        <div
            className="p-6 mb-6 rounded-xl backdrop-blur-sm bg-white dark:bg-neutral-900 shadow-sm h-[400px]"
        >
            <div className="flex items-end justify-center h-full gap-px">
                {array.map((value, index) => (
                    <motion.div
                        key={index}
                        className={`w-full ${activeIndices.includes(index)
                            ? 'bg-amber-500' // Highlight active bars
                            : 'bg-blue-500'
                            }`}
                        style={{
                            height: `${value}%`,
                        }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: `${value}%` }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Visualization;