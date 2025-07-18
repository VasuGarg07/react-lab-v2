import React, { useCallback, useMemo } from 'react';
import { Play, Pause, RefreshCw, RotateCcw } from 'lucide-react';
import Select from '@/ui/Select';
import Slider from '@/ui/Slider';

interface ControlPanelProps {
    algorithm: string;
    setAlgorithm: (value: string) => void;
    arraySize: number;
    setArraySize: (size: number) => void;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    generateNewArray: () => void;
    resetStats: () => void;
    sorting: boolean;
    startSorting: () => void;
    stopSorting: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    algorithm,
    setAlgorithm,
    arraySize,
    setArraySize,
    animationSpeed,
    setAnimationSpeed,
    generateNewArray,
    resetStats,
    sorting,
    startSorting,
    stopSorting,
}) => {
    // Memoized algorithm options with color-coded difficulty
    const algorithmOptions = useMemo(() => [
        { value: 'bubbleSort', label: '🔴 Bubble Sort', description: 'O(n²) - Beginner' },
        { value: 'selectionSort', label: '🔴 Selection Sort', description: 'O(n²) - Beginner' },
        { value: 'insertionSort', label: '🔴 Insertion Sort', description: 'O(n²) - Beginner' },
        { value: 'cocktailSort', label: '🟡 Cocktail Sort', description: 'O(n²) - Intermediate' },
        { value: 'shellSort', label: '🟡 Shell Sort', description: 'O(n log n) - Intermediate' },
        { value: 'mergeSort', label: '🟢 Merge Sort', description: 'O(n log n) - Advanced' },
        { value: 'quickSort', label: '🟢 Quick Sort', description: 'O(n log n) avg - Advanced' },
        { value: 'heapSort', label: '🟢 Heap Sort', description: 'O(n log n) - Advanced' },
    ], []);

    // Memoized slider configurations
    const arraySizeMarks = useMemo(() => [
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 75, label: '75' },
        { value: 100, label: '100' }
    ], []);

    const speedMarks = useMemo(() => [
        { value: 10, label: 'Fast' },
        { value: 250, label: '' },
        { value: 500, label: 'Normal' },
        { value: 750, label: '' },
        { value: 1000, label: 'Slow' }
    ], []);

    // Memoized format functions
    const formatArraySize = useCallback((value: number) => `${value} elements`, []);
    const formatSpeed = useCallback((value: number) => `${value}ms`, []);

    // Memoized handlers
    const handleGenerateArray = useCallback(() => {
        generateNewArray();
        resetStats();
    }, [generateNewArray, resetStats]);

    const handleAlgorithmChange = useCallback((value: string) => {
        setAlgorithm(value);
        resetStats();
    }, [setAlgorithm, resetStats]);

    // Get algorithm difficulty color
    const getAlgorithmDifficulty = useMemo(() => {
        const option = algorithmOptions.find(opt => opt.value === algorithm);
        if (option?.label.includes('🔴')) return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
        if (option?.label.includes('🟡')) return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
        if (option?.label.includes('🟢')) return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
        return 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800';
    }, [algorithm, algorithmOptions]);

    return (
        <div className={`mb-4 p-4 rounded-lg backdrop-blur-sm shadow-sm border ${getAlgorithmDifficulty}`}>
            <div className="flex flex-col space-y-4">
                {/* Algorithm Selection */}
                <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                        <div className="flex-1">
                            <Select
                                options={algorithmOptions}
                                value={algorithm}
                                onValueChange={handleAlgorithmChange}
                                label="Algorithm"
                                disabled={sorting}
                            />
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 sm:pb-1">
                            {algorithmOptions.find(opt => opt.value === algorithm)?.description}
                        </div>
                    </div>
                </div>

                {/* Configuration Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Slider
                            id="array-size-slider"
                            label="Array Size"
                            value={arraySize}
                            min={10}
                            max={100}
                            step={1}
                            format={formatArraySize}
                            marks={arraySizeMarks}
                            onChange={setArraySize}
                            primaryColor="bg-blue-500"
                            secondaryColor="bg-neutral-200 dark:bg-neutral-700"
                        />
                    </div>

                    <div>
                        <Slider
                            id="animation-speed-slider"
                            label="Animation Speed"
                            value={animationSpeed}
                            min={10}
                            max={1000}
                            step={10}
                            format={formatSpeed}
                            marks={speedMarks}
                            onChange={setAnimationSpeed}
                            primaryColor="bg-green-500"
                            secondaryColor="bg-neutral-200 dark:bg-neutral-700"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    {/* Array Controls */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleGenerateArray}
                            disabled={sorting}
                            className={`flex items-center justify-center h-8 px-3 rounded-md text-sm transition-all duration-200
                                ${sorting
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'text-neutral-800 dark:text-white bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 hover:scale-105'
                                }
                            `}
                        >
                            <RefreshCw size={14} className="mr-1.5" />
                            <span>New Array</span>
                        </button>

                        <button
                            onClick={resetStats}
                            disabled={sorting}
                            className={`flex items-center justify-center h-8 px-3 rounded-md text-sm transition-all duration-200
                                ${sorting
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'text-orange-800 dark:text-orange-200 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 hover:scale-105'
                                }
                            `}
                        >
                            <RotateCcw size={14} className="mr-1.5" />
                            <span>Reset</span>
                        </button>
                    </div>

                    {/* Main Action Button */}
                    <button
                        onClick={sorting ? stopSorting : startSorting}
                        className={`flex items-center justify-center h-10 px-6 rounded-md text-white font-medium text-sm transition-all duration-200 transform hover:scale-105 ${sorting
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-blue-500 hover:bg-blue-600'
                            } shadow-md`}
                    >
                        {sorting ? (
                            <>
                                <Pause size={16} className="mr-2" />
                                Stop
                            </>
                        ) : (
                            <>
                                <Play size={16} className="mr-2" />
                                Start
                            </>
                        )}
                    </button>
                </div>

                {/* Performance Hint */}
                {!sorting && (
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center border-t border-neutral-200 dark:border-neutral-700 pt-3">
                        💡 Try different array sizes and speeds to better understand algorithm behavior
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ControlPanel);