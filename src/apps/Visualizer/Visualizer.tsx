import { useEffect, useRef, useState } from 'react';
import AlgorithmInfo from './AlgorithmInfo';
import {
    bubbleSort,
    cocktailSort,
    heapSort,
    insertionSort,
    mergeSort,
    quickSort,
    selectionSort,
    shellSort,
    type SortingState,
    type SortingStats
} from './algorithms';
import ControlPanel from './ControlPanel';
import Statistics from './Statistics';
import Visualization from './Visualization';

const algorithmMap = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort,
    cocktailSort,
    shellSort
};

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

export default function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [arraySize, setArraySize] = useState(30);
    const [animationSpeed, setAnimationSpeed] = useState(500);
    const [algorithm, setAlgorithm] = useState("bubbleSort");
    const [sorting, setSorting] = useState(false);

    const [sortingState, setSortingState] = useState<SortingState>({
        comparing: [],
        swapping: [],
        pivot: [],
        sorted: [],
        current: []
    });

    const stats = useRef<SortingStats>({
        comparisons: 0,
        swaps: 0,
        arrayAccesses: 0
    });

    const isSorting = useRef(false);

    const generateNewArray = () => {
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
    };

    const resetStats = () => {
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
    };

    useEffect(() => {
        generateNewArray();
    }, [arraySize]);

    const startSorting = async () => {
        if (sorting) return;

        setSorting(true);
        isSorting.current = true;

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
            stats.current.endTime = Date.now();
            setSorting(false);
            isSorting.current = false;

            setSortingState(prev => ({
                ...prev,
                sorted: Array.from({ length: array.length }, (_, i) => i),
                comparing: [],
                swapping: [],
                pivot: [],
                current: []
            }));
        }
    };

    const stopSorting = () => {
        isSorting.current = false;
        setSorting(false);
        stats.current.endTime = Date.now();

        setSortingState({
            comparing: [],
            swapping: [],
            pivot: [],
            sorted: [],
            current: []
        });
    };

    const algorithmName = algorithmNames[algorithm] || 'Unknown Algorithm';

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-3">
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Sorting Visualizer
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                        Interactive algorithm visualization with real-time statistics
                    </p>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <Statistics
                        stats={stats.current}
                        isActive={sorting}
                        algorithmName={algorithmName}
                    />

                    <AlgorithmInfo algorithm={algorithm} />
                </div>
            </div>
        </div>
    );
}