import type { SortingState } from './algorithms';

interface VisualizationProps {
    array: number[];
    sortingState: SortingState;
}

export default function Visualization({ array, sortingState }: VisualizationProps) {
    const maxValue = Math.max(...array);
    const minValue = Math.min(...array);

    const getBarColor = (index: number) => {
        // Priority order: sorted > pivot > swapping > comparing > current > default
        if (sortingState.sorted.includes(index)) {
            return 'bg-emerald-500 border-emerald-600';
        }
        if (sortingState.pivot.includes(index)) {
            return 'bg-purple-500 border-purple-600';
        }
        if (sortingState.swapping.includes(index)) {
            return 'bg-red-500 border-red-600';
        }
        if (sortingState.comparing.includes(index)) {
            return 'bg-amber-500 border-amber-600';
        }
        if (sortingState.current.includes(index)) {
            return 'bg-cyan-500 border-cyan-600';
        }
        return 'bg-blue-500 border-blue-600';
    };

    const getBarHeight = (value: number) => {
        return Math.max((value / maxValue) * 85, 5); // Minimum 5% height, max 85%
    };

    return (
        <div className="p-3 mb-3 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
            {/* Color Legend */}
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
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
                    <div className="w-3 h-3 bg-emerald-500 rounded border border-emerald-600"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">Sorted</span>
                </div>
            </div>

            {/* Array Visualization */}
            <div className="h-[280px] flex items-end justify-center gap-px p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className={`flex-1 rounded-sm border transition-all duration-200 ${getBarColor(index)}`}
                        style={{
                            height: `${getBarHeight(value)}%`,
                            minHeight: '4px',
                        }}
                    />
                ))}
            </div>

            {/* Array info */}
            <div className="mt-3 text-center text-xs text-neutral-600 dark:text-neutral-400">
                {array.length} elements • Range: {minValue}–{maxValue}
            </div>
        </div>
    );
}