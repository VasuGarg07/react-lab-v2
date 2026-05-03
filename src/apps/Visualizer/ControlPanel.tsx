import { Play, Pause, RefreshCw, RotateCcw } from 'lucide-react';
import Select from '../../ui/Select';
import Slider from '../../ui/Slider';

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

interface ControlPanelProps {
    algorithm: string;
    setAlgorithm: (value: string) => void;
    arraySize: number;
    setArraySize: (size: number) => void;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    onNewArray: () => void;
    onReset: () => void;
    sorting: boolean;
    startSorting: () => void;
    stopSorting: () => void;
}

export default function ControlPanel({
    algorithm, setAlgorithm,
    arraySize, setArraySize,
    animationSpeed, setAnimationSpeed,
    onNewArray, onReset,
    sorting, startSorting, stopSorting,
}: ControlPanelProps) {
    return (
        <div className="mb-4 p-4 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col space-y-4">
                <Select
                    options={algorithmOptions}
                    value={algorithm}
                    onValueChange={setAlgorithm}
                    label="Algorithm"
                    disabled={sorting}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Slider
                        label="Array Size"
                        value={arraySize} min={10} max={100} step={1}
                        onChange={setArraySize} disabled={sorting}
                    />
                    <Slider
                        label="Animation Speed (ms)"
                        value={animationSpeed} min={10} max={1000} step={10}
                        onChange={setAnimationSpeed} disabled={sorting}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex gap-2">
                        <button
                            onClick={onNewArray}
                            disabled={sorting}
                            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw size={14} className="mr-1.5" /> New Array
                        </button>
                        <button
                            onClick={onReset}
                            disabled={sorting}
                            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RotateCcw size={14} className="mr-1.5" /> Reset
                        </button>
                    </div>

                    <button
                        onClick={sorting ? stopSorting : startSorting}
                        className={`flex items-center px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all shadow-sm ${
                            sorting ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {sorting
                            ? <><Pause size={16} className="mr-2" /> Stop</>
                            : <><Play size={16} className="mr-2" /> Start</>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}