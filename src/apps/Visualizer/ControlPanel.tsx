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

    // Array size slider marks
    const arraySizeMarks = [
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 75, label: '75' },
        { value: 100, label: '100' }
    ];

    // Animation speed slider marks
    const speedMarks = [
        { value: 10, label: 'Fast' },
        { value: 250, label: '' },
        { value: 500, label: '' },
        { value: 750, label: '' },
        { value: 1000, label: 'Slow' }
    ];

    // Format functions for sliders
    const formatArraySize = (value: number) => `${value} elements`;
    const formatSpeed = (value: number) => `${value}ms`;

    return (
        <div className="mb-6 p-6 rounded-xl backdrop-blur-sm bg-white dark:bg-neutral-800 shadow-sm">
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

                    <div className="flex-1">
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

                {/* Buttons - Third */}
                <div className="flex flex-row justify-end space-x-4">
                    <button
                        onClick={generateNewArray}
                        disabled={sorting}
                        className={`flex items-center justify-center h-10 px-4 rounded-md transition-colors
                            ${sorting
                                ? 'opacity-50 cursor-not-allowed'
                                : 'text-neutral-800 dark:text-white bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                            }
                        `}
                    >
                        <RefreshCw size={16} className="mr-2" />
                        <span className="text-neutral-800 dark:text-white">New Array</span>
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