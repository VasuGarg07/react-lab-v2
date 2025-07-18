import { Info } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    bubbleSort,
    insertionSort,
    mergeSort,
    quickSort,
    selectionSort,
    heapSort,
    cocktailSort,
    shellSort,
    SortingStats,
    SortingState
} from './algorithms';

import Dialog from '@/ui/Dialog';
import AboutVisualizer from './AboutVisualizer';
import AlgorithmInfo from './AlgorithmInfo';
import ControlPanel from './ControlPanel';
import Visualization from './Visualization';
import Statistics from './Statistics';

const SortingVisualizer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [arraySize, setArraySize] = useState(30);
    const [animationSpeed, setAnimationSpeed] = useState(500);
    const [algorithm, setAlgorithm] = useState("bubbleSort");
    const [sorting, setSorting] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    // Sorting state for visualization
    const [sortingState, setSortingState] = useState<SortingState>({
        comparing: [],
        swapping: [],
        pivot: [],
        sorted: [],
        current: []
    });

    // Statistics tracking
    const stats = useRef<SortingStats>({
        comparisons: 0,
        swaps: 0,
        arrayAccesses: 0
    });

    const isSorting = useRef(false);

    // Memoized array generation function
    const generateNewArray = useCallback(() => {
        const newArray = Array.from({ length: arraySize }, () =>
            Math.floor(Math.random() * 100) + 5
        );
        setArray(newArray);
        setSortingState({
            comparing: [],
            swapping: [],
            pivot: [],
            sorted: [],
            current: []
        });
    }, [arraySize]);

    // Reset statistics
    const resetStats = useCallback(() => {
        stats.current = {
            comparisons: 0,
            swaps: 0,
            arrayAccesses: 0
        };
        setSortingState({
            comparing: [],
            swapping: [],
            pivot: [],
            sorted: [],
            current: []
        });
    }, []);

    // Generate new array when size changes
    useEffect(() => {
        generateNewArray();
    }, [generateNewArray]);

    // Memoized algorithm mapping
    const algorithmMap = useMemo(() => ({
        bubbleSort,
        selectionSort,
        insertionSort,
        mergeSort,
        quickSort,
        heapSort,
        cocktailSort,
        shellSort
    }), []);

    // Start sorting function
    const startSorting = useCallback(async () => {
        if (sorting) return;

        setSorting(true);
        isSorting.current = true;

        // Reset stats and start timer
        stats.current = {
            comparisons: 0,
            swaps: 0,
            arrayAccesses: 0,
            startTime: Date.now()
        };

        try {
            const sortFunction = algorithmMap[algorithm as keyof typeof algorithmMap];

            if (sortFunction) {
                await sortFunction(
                    [...array],
                    setArray,
                    animationSpeed,
                    isSorting,
                    stats,
                    setSortingState
                );
            }
        } catch (error) {
            console.error('Sorting error:', error);
        } finally {
            // End timer and mark as complete
            stats.current.endTime = Date.now();
            setSorting(false);
            isSorting.current = false;

            // Mark all elements as sorted
            setSortingState(prev => ({
                ...prev,
                sorted: Array.from({ length: array.length }, (_, i) => i),
                comparing: [],
                swapping: [],
                pivot: [],
                current: []
            }));
        }
    }, [sorting, algorithm, array, animationSpeed, algorithmMap]);

    // Stop sorting function
    const stopSorting = useCallback(() => {
        isSorting.current = false;
        setSorting(false);
        stats.current.endTime = Date.now();

        // Clear all visual states
        setSortingState({
            comparing: [],
            swapping: [],
            pivot: [],
            sorted: [],
            current: []
        });
    }, []);

    // Memoized algorithm name for display
    const algorithmName = useMemo(() => {
        const algorithmNames: Record<string, string> = {
            bubbleSort: 'Bubble Sort',
            selectionSort: 'Selection Sort',
            insertionSort: 'Insertion Sort',
            mergeSort: 'Merge Sort',
            quickSort: 'Quick Sort',
            heapSort: 'Heap Sort',
            cocktailSort: 'Cocktail Sort',
            shellSort: 'Shell Sort'
        };
        return algorithmNames[algorithm] || 'Unknown Algorithm';
    }, [algorithm]);

    return (
        <div className="relative px-4 py-4 max-w-6xl mx-auto">
            {/* Header */}
            <header className="flex justify-between items-center mb-4 text-neutral-800 dark:text-neutral-100">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Sorting Visualizer
                    </h1>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                        Interactive algorithm visualization with real-time statistics
                    </p>
                </div>
                <button
                    onClick={() => setInfoOpen(true)}
                    className='p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors'
                    aria-label="Information"
                >
                    <Info size={20} />
                </button>
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
                resetStats={resetStats}
                sorting={sorting}
                startSorting={startSorting}
                stopSorting={stopSorting}
            />

            {/* Visualization */}
            <Visualization
                array={array}
                sortingState={sortingState}
            />

            {/* Statistics and Algorithm Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Statistics */}
                <Statistics
                    stats={stats.current}
                    isActive={sorting}
                    algorithmName={algorithmName}
                />

                {/* Algorithm Info */}
                <AlgorithmInfo algorithm={algorithm} />
            </div>

            {/* Info Dialog */}
            <Dialog
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
                title="About Sorting Visualizer"
                size="md"
            >
                <AboutVisualizer />
            </Dialog>
        </div>
    );
};

export default SortingVisualizer;