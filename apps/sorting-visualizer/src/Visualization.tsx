import type { SortingState } from './algorithms.data';

const LEGEND = [
    { color: 'bg-blue-500 border-blue-600', label: 'Unsorted' },
    { color: 'bg-amber-500 border-amber-600', label: 'Comparing' },
    { color: 'bg-red-500 border-red-600', label: 'Swapping' },
    { color: 'bg-purple-500 border-purple-600', label: 'Pivot' },
    { color: 'bg-cyan-500 border-cyan-600', label: 'Current' },
    { color: 'bg-emerald-500 border-emerald-600', label: 'Sorted' },
];

const barColor = (index: number, state: SortingState) => {
    if (state.sorted.includes(index)) return 'bg-emerald-500 border-emerald-600';
    if (state.pivot.includes(index)) return 'bg-purple-500 border-purple-600';
    if (state.swapping.includes(index)) return 'bg-red-500 border-red-600';
    if (state.comparing.includes(index)) return 'bg-amber-500 border-amber-600';
    if (state.current.includes(index)) return 'bg-cyan-500 border-cyan-600';
    return 'bg-blue-500 border-blue-600';
};

interface VisualizationProps {
    array: number[];
    sortingState: SortingState;
}

export default function Visualization({ array, sortingState }: VisualizationProps) {
    const maxValue = Math.max(...array);
    const minValue = Math.min(...array);

    return (
        <div className="p-3 mb-3 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
                {LEGEND.map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded border ${color}`} />
                        <span className="text-neutral-700 dark:text-neutral-300">{label}</span>
                    </div>
                ))}
            </div>

            <div className="h-70 flex items-end justify-center gap-px p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className={`flex-1 rounded-sm border transition-all duration-200 ${barColor(index, sortingState)}`}
                        style={{ height: `${Math.max((value / maxValue) * 85, 5)}%`, minHeight: '4px' }}
                    />
                ))}
            </div>

            <div className="mt-3 text-center text-xs text-neutral-600 dark:text-neutral-400">
                {array.length} elements • Range: {minValue}–{maxValue}
            </div>
        </div>
    );
}