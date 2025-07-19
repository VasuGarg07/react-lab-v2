import React, { useMemo } from 'react';
import { BarChart3, Clock, ArrowUpDown, Activity } from 'lucide-react';
import { SortingStats } from './algorithms';

interface StatisticsProps {
    stats: SortingStats;
    isActive: boolean;
    algorithmName: string;
}

const Statistics: React.FC<StatisticsProps> = ({ stats, isActive, algorithmName }) => {
    const elapsedTime = useMemo(() => {
        if (!stats.startTime) return 0;
        const endTime = stats.endTime || Date.now();
        return endTime - stats.startTime;
    }, [stats.startTime, stats.endTime]);

    const formatTime = (ms: number) => {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(1)}s`;
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const getEfficiencyColor = (comparisons: number, arraySize: number) => {
        const ratio = comparisons / (arraySize * arraySize);
        if (ratio < 0.1) return 'text-green-600 dark:text-green-400';
        if (ratio < 0.5) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const efficiencyColor = useMemo(() => {
        if (stats.comparisons === 0) return 'text-neutral-600 dark:text-neutral-400';
        // Estimate array size from comparison count (rough approximation)
        const estimatedSize = Math.sqrt(stats.comparisons);
        return getEfficiencyColor(stats.comparisons, estimatedSize);
    }, [stats.comparisons]);

    return (
        <div className="p-4 rounded-lg backdrop-blur-sm bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-3 mb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                        <BarChart3 size={16} />
                        Statistics
                    </h3>
                    {isActive && (
                        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            Sorting
                        </div>
                    )}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {algorithmName}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Comparisons */}
                <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <ArrowUpDown size={12} className="text-blue-600 dark:text-blue-400" />
                        <h4 className="text-xs font-medium text-blue-800 dark:text-blue-300">
                            Comparisons
                        </h4>
                    </div>
                    <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                        {formatNumber(stats.comparisons)}
                    </p>
                </div>

                {/* Swaps */}
                <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Activity size={12} className="text-red-600 dark:text-red-400" />
                        <h4 className="text-xs font-medium text-red-800 dark:text-red-300">
                            Swaps
                        </h4>
                    </div>
                    <p className="text-lg font-bold text-red-900 dark:text-red-100">
                        {formatNumber(stats.swaps)}
                    </p>
                </div>

                {/* Array Accesses */}
                <div className="p-3 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <BarChart3 size={12} className="text-purple-600 dark:text-purple-400" />
                        <h4 className="text-xs font-medium text-purple-800 dark:text-purple-300">
                            Accesses
                        </h4>
                    </div>
                    <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                        {formatNumber(stats.arrayAccesses)}
                    </p>
                </div>

                {/* Time */}
                <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Clock size={12} className="text-green-600 dark:text-green-400" />
                        <h4 className="text-xs font-medium text-green-800 dark:text-green-300">
                            Time
                        </h4>
                    </div>
                    <p className="text-lg font-bold text-green-900 dark:text-green-100">
                        {formatTime(elapsedTime)}
                    </p>
                </div>
            </div>

            {/* Efficiency Metrics */}
            {stats.comparisons > 0 && (
                <div className="p-3 rounded-md bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600">
                    <h4 className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                        Efficiency
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">Swap Rate:</span>
                            <span className={`font-medium ${stats.swaps === 0 ? 'text-green-600 dark:text-green-400' :
                                stats.swaps / stats.comparisons < 0.5 ? 'text-yellow-600 dark:text-yellow-400' :
                                    'text-red-600 dark:text-red-400'}`}>
                                {stats.comparisons > 0 ? `${((stats.swaps / stats.comparisons) * 100).toFixed(1)}%` : '0%'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">Ops/sec:</span>
                            <span className={`font-medium ${efficiencyColor}`}>
                                {elapsedTime > 0 ? Math.round((stats.comparisons + stats.swaps) / (elapsedTime / 1000)) : 0}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset indicator */}
            {!isActive && stats.comparisons === 0 && stats.swaps === 0 && (
                <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                    Statistics will appear when sorting begins
                </div>
            )}
        </div>
    );
};

export default React.memo(Statistics);