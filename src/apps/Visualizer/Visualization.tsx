import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SortingState } from './algorithms';

interface VisualizationProps {
    array: number[];
    sortingState: SortingState;
}

const Visualization: React.FC<VisualizationProps> = ({
    array,
    sortingState
}) => {
    const maxValue = useMemo(() => Math.max(...array), [array]);

    const getBarColor = useMemo(() => (index: number) => {
        // Priority order: sorted > pivot > swapping > comparing > current > default
        if (sortingState.sorted.includes(index)) {
            return 'bg-green-500 border-green-600'; // Sorted - Green
        }
        if (sortingState.pivot.includes(index)) {
            return 'bg-purple-500 border-purple-600'; // Pivot - Purple
        }
        if (sortingState.swapping.includes(index)) {
            return 'bg-red-500 border-red-600'; // Swapping - Red
        }
        if (sortingState.comparing.includes(index)) {
            return 'bg-amber-500 border-amber-600'; // Comparing - Amber
        }
        if (sortingState.current.includes(index)) {
            return 'bg-cyan-500 border-cyan-600'; // Current/Active - Cyan
        }
        return 'bg-blue-500 border-blue-600'; // Default - Blue
    }, [sortingState]);

    const getBarHeight = useMemo(() => (value: number) => {
        return Math.max((value / maxValue) * 85, 5); // Minimum 5% height, max 85%
    }, [maxValue]);

    return (
        <div className="p-4 mb-4 rounded-lg backdrop-blur-sm bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
            {/* Color Legend */}
            <div className="mb-3 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-blue-500 rounded border border-blue-600"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">Unsorted</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-amber-500 rounded border border-amber-600"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">Comparing</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded border border-red-600"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">Swapping</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-purple-500 rounded border border-purple-600"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">Pivot</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-cyan-500 rounded border border-cyan-600"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-green-500 rounded border border-green-600"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">Sorted</span>
                </div>
            </div>

            {/* Array Visualization */}
            <div className="h-[280px] flex items-end justify-center gap-px p-3 bg-neutral-50 dark:bg-neutral-900 rounded-md">
                {array.map((value, index) => (
                    <motion.div
                        key={index}
                        className={`flex-1 rounded-sm ${getBarColor(index)}`}
                        style={{
                            height: `${getBarHeight(value)}%`,
                            minHeight: '4px',
                        }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: 1,
                            height: `${getBarHeight(value)}%`,
                            scale: sortingState.swapping.includes(index) ? 1.05 : 1
                        }}
                        transition={{
                            duration: 0.2,
                            scale: { duration: 0.15 }
                        }}
                    />
                ))}
            </div>

            {/* Array info */}
            <div className="mt-3 text-center text-xs text-neutral-600 dark:text-neutral-400">
                {array.length} elements • Range: {Math.min(...array)}-{Math.max(...array)}
            </div>
        </div>
    );
};

export default React.memo(Visualization);