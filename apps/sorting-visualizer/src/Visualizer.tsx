import { useEffect, useRef, useState } from 'react';
import { Algorithms, type SortingState } from './algorithms.data';
import {
    bubbleSort, cocktailSort, heapSort, insertionSort,
    mergeSort, quickSort, selectionSort, shellSort,
} from './algorithms';
import CodePreview from './CodePreview';
import ControlPanel from './ControlPanel';
import Visualization from './Visualization';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

const algorithmMap = {
    bubbleSort, selectionSort, insertionSort, mergeSort,
    quickSort, heapSort, cocktailSort, shellSort,
};

const EMPTY_STATE: SortingState = { comparing: [], swapping: [], pivot: [], sorted: [], current: [] };

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];


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
        try {
            const fn = algorithmMap[algorithm as keyof typeof algorithmMap];
            if (fn) await fn([...array], setArray, animationSpeed, isSorting, { current: { comparisons: 0, swaps: 0, arrayAccesses: 0 } }, setSortingState);
        } catch (e) {
            console.error(e);
        } finally {
            setSorting(false);
            isSorting.current = false;
            setSortingState(prev => ({
                ...prev,
                sorted: Array.from({ length: array.length }, (_, i) => i),
                comparing: [], swapping: [], pivot: [], current: [],
            }));
        }
    };

    const stopSorting = () => {
        isSorting.current = false;
        setSorting(false);
        setSortingState(EMPTY_STATE);
    };

    return (
        <div className="min-h-screen bg-base">

            {/* Header — macOS app toolbar */}
            <header className="sticky top-0 z-20 border-b border-border backdrop-blur-xl bg-surface/80">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <h1 className="text-[1rem] font-semibold text-text tracking-tight">
                        Sorting Visualizer
                    </h1>
                    <div className="flex items-center gap-0.5">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                title={label}
                                className="w-8 h-8 rounded-lg flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-white/8 transition-all"
                            >
                                <img src={icon} alt={label} className="w-4 h-4 icon-subtext" />
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="max-w-4xl mx-auto px-4 py-5 flex flex-col gap-4">
                <ControlPanel
                    algorithm={algorithm}
                    setAlgorithm={(v) => { setAlgorithm(v); setSortingState(EMPTY_STATE); }}
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

                <Visualization
                    array={array}
                    sortingState={sortingState}
                    description={Algorithms[algorithm].description}
                />

                <CodePreview info={Algorithms[algorithm]} />

                <footer className="pb-4 text-center text-xs text-mauve">
                    © {new Date().getFullYear()} Vasu Garg
                </footer>
            </div>

        </div>
    );
}
