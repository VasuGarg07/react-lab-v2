import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
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
    sorting,
    startSorting,
    stopSorting,
}) => {
    const algorithmOptions = [
        { value: 'bubbleSort', label: 'Bubble Sort' },
        { value: 'selectionSort', label: 'Selection Sort' },
        { value: 'insertionSort', label: 'Insertion Sort' },
        { value: 'mergeSort', label: 'Merge Sort' },
        { value: 'quickSort', label: 'Quick Sort' },
    ];

    return (
        <div className="mb-6 p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 shadow-sm">
            <div className="flex flex-col space-y-6">
                {/* Algorithm Select - First */}
                <div className="w-full">
                    <Select
                        options={algorithmOptions}
                        value={algorithm}
                        onValueChange={setAlgorithm}
                        label="Algorithm"
                        disabled={sorting}
                    />
                </div>

                {/* Sliders - Second */}
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                    <div className="flex-1">
                        <Slider
                            value={arraySize}
                            onValueChange={setArraySize}
                            min={10}
                            max={100}
                            step={1}
                            label="Array Size"
                            valueLabel={arraySize.toString()}
                            disabled={sorting}
                        />
                    </div>

                    <div className="flex-1">
                        <Slider
                            value={animationSpeed}
                            onValueChange={setAnimationSpeed}
                            min={10}
                            max={1000}
                            step={10}
                            label="Animation Speed"
                            valueLabel={`${animationSpeed}ms`}
                            disabled={sorting}
                        />
                    </div>
                </div>

                {/* Buttons - Third */}
                <div className="flex flex-row justify-end space-x-4">
                    <button
                        onClick={generateNewArray}
                        disabled={sorting}
                        className={`flex items-center justify-center h-10 px-4 rounded-md transition-colors
                            ${sorting
                                ? 'opacity-50 cursor-not-allowed'
                                : 'text-gray-800 dark:text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                            }
                        `}
                    >
                        <RefreshCw size={16} className="mr-2" />
                        <span className="text-gray-800 dark:text-white">New Array</span>
                    </button>
                    <button
                        onClick={sorting ? stopSorting : startSorting}
                        className={`flex items-center justify-center h-10 px-4 rounded-md text-white transition-colors ${sorting
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-blue-500 hover:bg-blue-600'
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
};

export default ControlPanel;