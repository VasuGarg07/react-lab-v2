import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    bubbleSort,
    insertionSort,
    mergeSort,
    quickSort,
    selectionSort
} from './algorithms';

import Dialog from '@/ui/Dialog';
import AlgorithmInfo from './AlgorithmInfo';
import ControlPanel from './ControlPanel';
import Visualization from './Visualization';
import AboutVisualizer from './AboutVisualizer';

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
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-black z-0" />

            {/* Decorative blurred circles */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl z-0" />
            <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-pink-400/20 dark:bg-pink-600/15 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-1/4 right-1/6 w-60 h-60 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl z-0" />

            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-30 dark:opacity-40 z-0"
                style={{
                    background: 'linear-gradient(120deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)',
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 px-4 py-6 max-w-5xl mx-auto rounded-xl">
                {/* Header */}
                <header className="flex justify-between items-center mb-3 text-neutral-800 dark:text-neutral-100">
                    <h1 className="text-2xl font-bold">Sorting Visualizer</h1>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setInfoOpen(true)}
                            className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
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