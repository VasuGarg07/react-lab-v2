import { Clock, Database, Lightbulb, TrendingUp } from 'lucide-react';
import { Algorithms } from './algorithms';

interface AlgorithmInfoProps {
    algorithm: string;
}

export default function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
    const info = Algorithms[algorithm as keyof typeof Algorithms];

    if (!info) {
        return (
            <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Algorithm information not available.</p>
            </div>
        );
    }

    const getComplexityColor = (complexity: string) => {
        if (complexity.includes('O(n²)')) {
            return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
        }
        if (complexity.includes('O(n log n)')) {
            return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
        }
        if (complexity.includes('O(n)')) {
            return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
        }
        if (complexity.includes('O(1)')) {
            return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
        }
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
    };

    const getMetadata = () => {
        const meta = {
            category: 'Unknown',
            performance: 'Medium',
            stability: 'Depends' as 'Stable' | 'Unstable' | 'Depends',
        };

        switch (algorithm) {
            case 'bubbleSort':
            case 'selectionSort':
                meta.category = 'Simple Sorts';
                meta.performance = 'Poor';
                meta.stability = algorithm === 'bubbleSort' ? 'Stable' : 'Unstable';
                break;
            case 'insertionSort':
                meta.category = 'Simple Sorts';
                meta.performance = 'Good for Small Data';
                meta.stability = 'Stable';
                break;
            case 'mergeSort':
                meta.category = 'Divide & Conquer';
                meta.performance = 'Excellent';
                meta.stability = 'Stable';
                break;
            case 'quickSort':
                meta.category = 'Divide & Conquer';
                meta.performance = 'Excellent (Average)';
                meta.stability = 'Unstable';
                break;
            case 'heapSort':
                meta.category = 'Tree-based';
                meta.performance = 'Excellent';
                meta.stability = 'Unstable';
                break;
            case 'cocktailSort':
                meta.category = 'Bubble Sort Variant';
                meta.performance = 'Poor';
                meta.stability = 'Stable';
                break;
            case 'shellSort':
                meta.category = 'Insertion Sort Variant';
                meta.performance = 'Good';
                meta.stability = 'Unstable';
                break;
        }

        return meta;
    };

    const metadata = getMetadata();

    const indicators = [
        {
            icon: TrendingUp,
            label: 'Performance',
            value: metadata.performance,
            color: metadata.performance.includes('Excellent')
                ? 'text-emerald-600 dark:text-emerald-400'
                : metadata.performance.includes('Good')
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-red-600 dark:text-red-400'
        },
        {
            icon: Database,
            label: 'Category',
            value: metadata.category,
            color: 'text-blue-600 dark:text-blue-400'
        },
        {
            icon: Lightbulb,
            label: 'Stability',
            value: metadata.stability,
            color: metadata.stability === 'Stable'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-amber-600 dark:text-amber-400'
        }
    ];

    return (
        <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
            {/* Header */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-3">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {info.name}
                </h2>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {info.description}
                </p>
            </div>

            {/* Complexity Cards */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className={`p-2 rounded-lg border ${getComplexityColor(info.timeComplexity)}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                        <Clock size={12} />
                        <h3 className="text-xs font-medium">Time</h3>
                    </div>
                    <p className="text-sm font-mono font-semibold">{info.timeComplexity}</p>
                </div>

                <div className={`p-2 rounded-lg border ${getComplexityColor(info.spaceComplexity)}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                        <Database size={12} />
                        <h3 className="text-xs font-medium">Space</h3>
                    </div>
                    <p className="text-sm font-mono font-semibold">{info.spaceComplexity}</p>
                </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 gap-1.5 mb-3">
                {indicators.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                        <div className="flex items-center gap-2">
                            <indicator.icon size={12} className={indicator.color} />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{indicator.label}</span>
                        </div>
                        <span className={`text-xs font-medium ${indicator.color}`}>{indicator.value}</span>
                    </div>
                ))}
            </div>

            {/* Best Use Case */}
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-1.5 mb-1">
                    <Lightbulb size={12} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xs font-medium text-blue-800 dark:text-blue-300">Best Used When</h3>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {info.caption}
                </p>
            </div>
        </div>
    );
}