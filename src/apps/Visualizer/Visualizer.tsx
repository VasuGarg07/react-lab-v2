import { useEffect, useRef, useState } from 'react';
import { Algorithms, type SortingState } from './algorithms.data';
import {
    bubbleSort, cocktailSort, heapSort, insertionSort,
    mergeSort, quickSort, selectionSort, shellSort,
} from './algorithms';
import CodePreview from './CodePreview';
import ControlPanel from './ControlPanel';
import Visualization from './Visualization';

const algorithmMap = {
    bubbleSort, selectionSort, insertionSort, mergeSort,
    quickSort, heapSort, cocktailSort, shellSort
};

const EMPTY_STATE: SortingState = { comparing: [], swapping: [], pivot: [], sorted: [], current: [] };

export default function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [arraySize, setArraySize] = useState(30);
    const [animationSpeed, setAnimationSpeed] = useState(500);
    const [algorithm, setAlgorithm] = useState('bubbleSort');
    const [sorting, setSorting] = useState(false);
    const [sortingState, setSortingState] = useState<SortingState>(EMPTY_STATE);

    const isSorting = useRef(false);

    const generateArray = () => {
        const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 5);
        setArray(newArray);
        setSortingState(EMPTY_STATE);
    };

    useEffect(() => { generateArray(); }, [arraySize]);

    const startSorting = async () => {
        if (sorting) return;
        setSorting(true);
        isSorting.current = true;

        const stats = { comparisons: 0, swaps: 0, arrayAccesses: 0 };

        try {
            const fn = algorithmMap[algorithm as keyof typeof algorithmMap];
            if (fn) await fn([...array], setArray, animationSpeed, isSorting, { current: stats }, setSortingState);
        } catch (e) {
            console.error(e);
        } finally {
            setSorting(false);
            isSorting.current = false;
            setSortingState(prev => ({
                ...prev,
                sorted: Array.from({ length: array.length }, (_, i) => i),
                comparing: [], swapping: [], pivot: [], current: []
            }));
        }
    };

    const stopSorting = () => {
        isSorting.current = false;
        setSorting(false);
        setSortingState(EMPTY_STATE);
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-4">
            <div className="max-w-5xl mx-auto">
                <header className="mb-3">
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Sorting Visualizer</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                        Interactive algorithm visualization
                    </p>
                </header>

                <ControlPanel
                    algorithm={algorithm}
                    setAlgorithm={(value) => { setAlgorithm(value); setSortingState(EMPTY_STATE); }}
                    arraySize={arraySize}
                    setArraySize={setArraySize}
                    animationSpeed={animationSpeed}
                    setAnimationSpeed={setAnimationSpeed}
                    onNewArray={generateArray}
                    onReset={() => setSortingState(EMPTY_STATE)}
                    sorting={sorting}
                    startSorting={startSorting}
                    stopSorting={stopSorting}
                />

                <Visualization array={array} sortingState={sortingState} />

                <CodePreview info={Algorithms[algorithm]} />
            </div>
        </div>
    );
}