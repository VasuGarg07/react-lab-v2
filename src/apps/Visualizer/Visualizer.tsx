import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    bubbleSort,
    insertionSort,
    mergeSort,
    quickSort,
    selectionSort
} from './algorithms';

import AppBackground from '@/components/AppBackground';
import Dialog from '@/ui/Dialog';
import AboutVisualizer from './AboutVisualizer';
import AlgorithmInfo from './AlgorithmInfo';
import ControlPanel from './ControlPanel';
import Visualization from './Visualization';

const SortingVisualizer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [arraySize, setArraySize] = useState(30);
    const [animationSpeed, setAnimationSpeed] = useState(500);
    const [algorithm, setAlgorithm] = useState("bubbleSort");
    const [sorting, setSorting] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const isSorting = useRef(false);

    useEffect(() => {
        generateNewArray();
    }, [arraySize]);

    const generateNewArray = () => {
        const newArray = Array.from({ length: arraySize }, () =>
            Math.floor(Math.random() * 100) + 5
        );
        setArray(newArray);
    };

    const startSorting = async () => {
        if (sorting) return;

        setSorting(true);
        isSorting.current = true;

        switch (algorithm) {
            case "bubbleSort":
                await bubbleSort(array, setArray, animationSpeed, isSorting);
                break;
            case "selectionSort":
                await selectionSort(array, setArray, animationSpeed, isSorting);
                break;
            case "insertionSort":
                await insertionSort(array, setArray, animationSpeed, isSorting);
                break;
            case "mergeSort":
                await mergeSort([...array], setArray, animationSpeed, isSorting);
                break;
            case "quickSort":
                await quickSort([...array], setArray, animationSpeed, isSorting);
                break;
            default:
                break;
        }

        setSorting(false);
        isSorting.current = false;
    };

    const stopSorting = () => {
        isSorting.current = false;
        setSorting(false);
    };

    return (
        <div className='relative min-h-screen overflow-hidden'>
            <AppBackground />

            {/* Main content */}
            <div className="relative z-10 px-4 py-6 max-w-5xl mx-auto rounded-xl">
                {/* Header */}
                <header className="flex justify-between items-center mb-3 text-neutral-800 dark:text-neutral-100">
                    <h1 className="text-2xl font-bold">Sorting Visualizer</h1>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setInfoOpen(true)}
                            className='p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors'
                            aria-label="Information"
                        >
                            <Info size={20} />
                        </button>
                    </div>
                </header>

                {/* Controls */}
                <ControlPanel
                    algorithm={algorithm}
                    setAlgorithm={setAlgorithm}
                    arraySize={arraySize}
                    setArraySize={setArraySize}
                    animationSpeed={animationSpeed}
                    setAnimationSpeed={setAnimationSpeed}
                    generateNewArray={generateNewArray}
                    sorting={sorting}
                    startSorting={startSorting}
                    stopSorting={stopSorting}
                />

                {/* Visualization */}
                <Visualization array={array} />

                {/* Algorithm Info */}
                <AlgorithmInfo algorithm={algorithm} />

                {/* Info Dialog */}
                <Dialog
                    isOpen={infoOpen}
                    onClose={() => setInfoOpen(false)}
                    title="About Sorting Visualizer"
                    position="center"
                    size="md"
                >
                    <AboutVisualizer />
                </Dialog>
            </div>
        </div>
    );
};

export default SortingVisualizer;