import { useMemo } from 'react';
import type { SortingState } from './algorithms.data';

const COLORS = {
    sorted:    '#22c55e',
    pivot:     '#a855f7',
    swapping:  '#ef4444',
    comparing: '#eab308',
    current:   '#06b6d4',
    default:   '#3f4257',
};

const LEGEND = [
    { color: COLORS.default,   label: 'Unsorted' },
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
        return COLORS.default;
    };

    const maxValue = Math.max(...array, 1);

    return (
        <div className="rounded-xl bg-base overflow-hidden shadow-sm border border-border">

            {/* Title bar */}
            <div className="flex items-center px-4 py-2.5 bg-surface border-b border-white/6">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-xs font-medium text-mauve">visualization</span>
                </div>
                <div className="w-13.5" />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-4 pt-3">
                {LEGEND.map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                        <span className="text-xs text-text">{label}</span>
                    </div>
                ))}
            </div>

            {/* Bars */}
            <div className="h-64 sm:h-80 flex items-end gap-px p-4 pt-3">
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

            {/* Status bar */}
            <div className="px-4 py-2 bg-overlay border-t border-white/5">
                <p className="text-center text-xs text-subtext font-mono">{description}</p>
            </div>
        </div>
    );
}
