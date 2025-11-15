import { Play, Pause, RefreshCw, RotateCcw } from 'lucide-react';
import Select from '../../ui/Select';
import Slider from '../../ui/Slider';

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

export default function ControlPanel({
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
}: ControlPanelProps) {
    const algorithmOptions = [
        { value: 'bubbleSort', label: 'Bubble Sort' },
        { value: 'selectionSort', label: 'Selection Sort' },
        { value: 'insertionSort', label: 'Insertion Sort' },
        { value: 'cocktailSort', label: 'Cocktail Sort' },
        { value: 'shellSort', label: 'Shell Sort' },
        { value: 'mergeSort', label: 'Merge Sort' },
        { value: 'quickSort', label: 'Quick Sort' },
        { value: 'heapSort', label: 'Heap Sort' },
    ];

    const handleGenerateArray = () => {
        generateNewArray();
        resetStats();
    };

    const handleAlgorithmChange = (value: string) => {
        setAlgorithm(value);
        resetStats();
    };

    return (
        <div className="mb-4 p-4 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col space-y-4">
                {/* Algorithm Selection */}
                <div className="w-full">
                    <Select
                        options={algorithmOptions}
                        value={algorithm}
                        onValueChange={handleAlgorithmChange}
                        label="Algorithm"
                        disabled={sorting}
                    />
                </div>

                {/* Configuration Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Slider
                        label="Array Size"
                        value={arraySize}
                        min={10}
                        max={100}
                        step={1}
                        onChange={setArraySize}
                        disabled={sorting}
                    />

                    <Slider
                        label="Animation Speed (ms)"
                        value={animationSpeed}
                        min={10}
                        max={1000}
                        step={10}
                        onChange={setAnimationSpeed}
                        disabled={sorting}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    {/* Array Controls */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleGenerateArray}
                            disabled={sorting}
                            className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                        >
                            <RefreshCw size={14} className="mr-1.5" />
                            <span>New Array</span>
                        </button>

                        <button
                            onClick={resetStats}
                            disabled={sorting}
                            className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:ring-offset-0"
                        >
                            <RotateCcw size={14} className="mr-1.5" />
                            <span>Reset</span>
                        </button>
                    </div>

                    {/* Main Action Button */}
                    <button
                        onClick={sorting ? stopSorting : startSorting}
                        className={`flex items-center justify-center px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 ${sorting
                            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500/30'
                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/30'
                            }`}
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
            </div>
        </div>
    );
}