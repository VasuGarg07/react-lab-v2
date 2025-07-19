import React, { useMemo } from 'react';
import { Algorithms } from './algorithms';
import { Clock, Database, Lightbulb, TrendingUp } from 'lucide-react';

interface AlgorithmInfoProps {
    algorithm: string;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
    const info = useMemo(() => Algorithms[algorithm as keyof typeof Algorithms], [algorithm]);

    // Get complexity color coding
    const getComplexityColor = useMemo(() => (complexity: string) => {
        if (complexity.includes('O(n²)')) {
            return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
        }
        if (complexity.includes('O(n log n)')) {
            return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
        }
        if (complexity.includes('O(n)')) {
            return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
        }
        if (complexity.includes('O(1)')) {
            return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
        }
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }, []);

    // Get algorithm category and performance indicators
    const algorithmMetadata = useMemo(() => {

        let category = 'Unknown';
        let performance = 'Medium';
        let stability = 'Depends';

        switch (algorithm) {
            case 'bubbleSort':
            case 'selectionSort':
                category = 'Simple Sorts';
                performance = 'Poor';
                stability = algorithm === 'bubbleSort' ? 'Stable' : 'Unstable';
                break;
            case 'insertionSort':
                category = 'Simple Sorts';
                performance = 'Good for Small Data';
                stability = 'Stable';
                break;
            case 'mergeSort':
                category = 'Divide & Conquer';
                performance = 'Excellent';
                stability = 'Stable';
                break;
            case 'quickSort':
                category = 'Divide & Conquer';
                performance = 'Excellent (Average)';
                stability = 'Unstable';
                break;
            case 'heapSort':
                category = 'Tree-based';
                performance = 'Excellent';
                stability = 'Unstable';
                break;
            case 'cocktailSort':
                category = 'Bubble Sort Variant';
                performance = 'Poor';
                stability = 'Stable';
                break;
            case 'shellSort':
                category = 'Insertion Sort Variant';
                performance = 'Good';
                stability = 'Unstable';
                break;
        }

        return { category, performance, stability };
    }, [algorithm, info]);

    const performanceIndicators = useMemo(() => [
        {
            icon: TrendingUp,
            label: 'Performance',
            value: algorithmMetadata.performance,
            color: algorithmMetadata.performance.includes('Excellent')
                ? 'text-green-600 dark:text-green-400'
                : algorithmMetadata.performance.includes('Good')
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-red-600 dark:text-red-400'
        },
        {
            icon: Database,
            label: 'Category',
            value: algorithmMetadata.category,
            color: 'text-blue-600 dark:text-blue-400'
        },
        {
            icon: Lightbulb,
            label: 'Stability',
            value: algorithmMetadata.stability,
            color: algorithmMetadata.stability === 'Stable'
                ? 'text-green-600 dark:text-green-400'
                : 'text-orange-600 dark:text-orange-400'
        }
    ], [algorithmMetadata]);

    if (!info) {
        return (
            <div className="p-6 rounded-xl backdrop-blur-sm bg-white dark:bg-neutral-800 shadow-sm">
                <p className="text-neutral-500 dark:text-neutral-400">Algorithm information not available.</p>
            </div>
        );
    }

    return (
        <div className='p-4 rounded-lg backdrop-blur-sm bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700'>
            {/* Header */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-3 mb-4">
                <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    {info.name}
                </h2>
                <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {info.description}
                </p>
            </div>

            {/* Complexity Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`p-3 rounded-md border ${getComplexityColor(info.timeComplexity)}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                        <Clock size={12} />
                        <h3 className="text-xs font-medium">Time</h3>
                    </div>
                    <p className="text-sm font-mono font-bold">{info.timeComplexity}</p>
                </div>

                <div className={`p-3 rounded-md border ${getComplexityColor(info.spaceComplexity)}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                        <Database size={12} />
                        <h3 className="text-xs font-medium">Space</h3>
                    </div>
                    <p className="text-sm font-mono font-bold">{info.spaceComplexity}</p>
                </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 gap-2 mb-4">
                {performanceIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-neutral-50 dark:bg-neutral-700/50">
                        <div className="flex items-center gap-2">
                            <indicator.icon size={12} className={indicator.color} />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{indicator.label}</span>
                        </div>
                        <span className={`text-xs font-medium ${indicator.color}`}>{indicator.value}</span>
                    </div>
                ))}
            </div>

            {/* Best Use Case */}
            <div className="p-3 rounded-md bg-gradient-to-r from-green-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-green-100 dark:border-violet-800">
                <div className="flex items-center gap-1.5 mb-1">
                    <Lightbulb size={12} className="text-green-600 dark:text-violet-300" />
                    <h3 className="text-xs font-medium text-green-800 dark:text-violet-300">Best Used When</h3>
                </div>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {info.caption}
                </p>
            </div>

            {/* Algorithm Tips */}
            {algorithm === 'quickSort' && (
                <div className="mt-3 p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-xs text-yellow-800 dark:text-yellow-300">
                        💡 Performance depends on pivot selection. Random pivots help avoid worst-case scenarios.
                    </p>
                </div>
            )}

            {algorithm === 'mergeSort' && (
                <div className="mt-3 p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                        💡 Guaranteed O(n log n) performance, ideal for worst-case scenarios but uses more memory.
                    </p>
                </div>
            )}

            {(algorithm === 'bubbleSort' || algorithm === 'selectionSort' || algorithm === 'insertionSort') && (
                <div className="mt-3 p-2 rounded-md bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                    <p className="text-xs text-orange-800 dark:text-orange-300">
                        💡 Great for learning concepts, but not recommended for large datasets in production.
                    </p>
                </div>
            )}
        </div>
    );
};

export default React.memo(AlgorithmInfo);