import { BarChart3, Clock, ArrowUpDown, Activity } from 'lucide-react';
import type { SortingStats } from './algorithms';

interface StatisticsProps {
    stats: SortingStats;
    isActive: boolean;
    algorithmName: string;
}

export default function Statistics({ stats, isActive, algorithmName }: StatisticsProps) {
    const getElapsedTime = () => {
        if (!stats.startTime) return 0;
        const endTime = stats.endTime || Date.now();
        return endTime - stats.startTime;
    };

    const formatTime = (ms: number) => {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(1)}s`;
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const elapsedTime = getElapsedTime();

    return (
        <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <BarChart3 size={14} />
                        Statistics
                    </h3>
                    {isActive && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            Sorting
                        </div>
                    )}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {algorithmName}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
                {/* Comparisons */}
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <ArrowUpDown size={12} className="text-blue-600 dark:text-blue-400" />
                        <h4 className="text-xs font-medium text-blue-800 dark:text-blue-300">
                            Comparisons
                        </h4>
                    </div>
                    <p className="text-base font-bold text-blue-900 dark:text-blue-100">
                        {formatNumber(stats.comparisons)}
                    </p>
                </div>

                {/* Swaps */}
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Activity size={12} className="text-red-600 dark:text-red-400" />
                        <h4 className="text-xs font-medium text-red-800 dark:text-red-300">
                            Swaps
                        </h4>
                    </div>
                    <p className="text-base font-bold text-red-900 dark:text-red-100">
                        {formatNumber(stats.swaps)}
                    </p>
                </div>

                {/* Array Accesses */}
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <BarChart3 size={12} className="text-purple-600 dark:text-purple-400" />
                        <h4 className="text-xs font-medium text-purple-800 dark:text-purple-300">
                            Accesses
                        </h4>
                    </div>
                    <p className="text-base font-bold text-purple-900 dark:text-purple-100">
                        {formatNumber(stats.arrayAccesses)}
                    </p>
                </div>

                {/* Time */}
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Clock size={12} className="text-emerald-600 dark:text-emerald-400" />
                        <h4 className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                            Time
                        </h4>
                    </div>
                    <p className="text-base font-bold text-emerald-900 dark:text-emerald-100">
                        {formatTime(elapsedTime)}
                    </p>
                </div>
            </div>


            {/* Reset indicator */}
            {!isActive && stats.comparisons === 0 && stats.swaps === 0 && (
                <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                    Statistics will appear when sorting begins
                </div>
            )}
        </div>
    );
}