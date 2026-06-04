import { useMemo } from 'react';
import { useTheme } from '@react-lab/ui';
import type { SortingState } from './algorithms.data';

const COLORS = {
    sorted:    '#10b981',
    pivot:     '#a855f7',
    swapping:  '#ef4444',
    comparing: '#f59e0b',
    current:   '#06b6d4',
};

const LEGEND = [
    { color: '#94a3b8',        label: 'Unsorted' },
    { color: COLORS.comparing, label: 'Comparing' },
    { color: COLORS.swapping,  label: 'Swapping' },
    { color: COLORS.pivot,     label: 'Pivot' },
    { color: COLORS.current,   label: 'Current' },
    { color: COLORS.sorted,    label: 'Sorted' },
] as const;

interface VisualizationProps {
    array: number[];
    sortingState: SortingState;
    description: string;
}

export default function Visualization({ array, sortingState, description }: VisualizationProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const defaultColor = isDark ? '#334155' : '#94a3b8';

    // Convert arrays to Sets once per render — O(1) lookup vs O(n) .includes()
    const sortedSet    = useMemo(() => new Set(sortingState.sorted),    [sortingState.sorted]);
    const pivotSet     = useMemo(() => new Set(sortingState.pivot),     [sortingState.pivot]);
    const swappingSet  = useMemo(() => new Set(sortingState.swapping),  [sortingState.swapping]);
    const comparingSet = useMemo(() => new Set(sortingState.comparing), [sortingState.comparing]);
    const currentSet   = useMemo(() => new Set(sortingState.current),   [sortingState.current]);

    const getBarColor = (index: number): string => {
        if (sortedSet.has(index))    return COLORS.sorted;
        if (pivotSet.has(index))     return COLORS.pivot;
        if (swappingSet.has(index))  return COLORS.swapping;
        if (comparingSet.has(index)) return COLORS.comparing;
        if (currentSet.has(index))   return COLORS.current;
        return defaultColor;
    };

    const maxValue = Math.max(...array, 1);

    return (
        <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-4 flex flex-col gap-3">

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {LEGEND.map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">{label}</span>
                    </div>
                ))}
            </div>

            {/* Bars */}
            <div className="h-64 sm:h-80 flex items-end gap-px rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-950 p-2">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className="flex-1 rounded-t-sm"
                        style={{
                            height: `${Math.max((value / maxValue) * 100, 2)}%`,
                            backgroundColor: getBarColor(index),
                            minWidth: '1px',
                            transition: 'background-color 120ms ease, height 120ms ease',
                        }}
                    />
                ))}
            </div>

            <p className="text-center text-xs text-neutral-400 dark:text-neutral-500">{description}</p>
        </div>
    );
}
