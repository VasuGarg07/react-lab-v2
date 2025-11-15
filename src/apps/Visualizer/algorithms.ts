export const ArraySize = [10, 20, 25, 30, 40, 50];
export const TimeDuration = [400, 500, 600, 750, 800, 1000];

export interface AlgoInfo {
    name: string;
    description: string;
    spaceComplexity: string;
    timeComplexity: string;
    caption: string;
}

export interface SortingStats {
    comparisons: number;
    swaps: number;
    arrayAccesses: number;
    startTime?: number;
    endTime?: number;
}

export interface SortingState {
    comparing: number[];
    swapping: number[];
    pivot: number[];
    sorted: number[];
    current: number[];
}

export const Algorithms: Record<string, AlgoInfo> = {
    bubbleSort: {
        name: "Bubble Sort",
        description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "The array is nearly sorted or small in size."
    },
    selectionSort: {
        name: "Selection Sort",
        description: "Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "Memory space is limited and simplicity is preferred over performance."
    },
    insertionSort: {
        name: "Insertion Sort",
        description: "Builds the sorted array one item at a time by comparisons and shifting elements.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "Dealing with small datasets or continuously sorting incoming data."
    },
    mergeSort: {
        name: "Merge Sort",
        description: "Divides the array into halves, sorts them and then merges them back together.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        caption: "Stable sorting is required and O(n log n) performance is needed regardless of input."
    },
    quickSort: {
        name: "Quick Sort",
        description: "Selects a 'pivot' element and partitions the array around the pivot.",
        timeComplexity: "O(n log n) average, O(n²) worst case",
        spaceComplexity: "O(log n)",
        caption: "Average-case performance is critical and the data doesn't have many duplicates."
    },
    heapSort: {
        name: "Heap Sort",
        description: "Builds a max heap from the array and repeatedly extracts the maximum element.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        caption: "Guaranteed O(n log n) performance with minimal space usage is required."
    },
    cocktailSort: {
        name: "Cocktail Sort",
        description: "A variation of bubble sort that sorts in both directions on each pass through the list.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "Elements at the beginning and end of the list need to be moved quickly."
    },
    shellSort: {
        name: "Shell Sort",
        description: "Generalizes insertion sort by allowing the exchange of items that are far apart.",
        timeComplexity: "O(n log n) to O(n²)",
        spaceComplexity: "O(1)",
        caption: "Better performance than simple quadratic algorithms is needed with O(1) space."
    }
};

// Helper function to update stats and state
const updateStats = (
    stats: React.MutableRefObject<SortingStats>,
    type: 'comparison' | 'swap' | 'access'
) => {
    switch (type) {
        case 'comparison':
            stats.current.comparisons++;
            break;
        case 'swap':
            stats.current.swaps++;
            break;
        case 'access':
            stats.current.arrayAccesses++;
            break;
    }
};

const updateState = (
    setState: React.Dispatch<React.SetStateAction<SortingState>>,
    newState: Partial<SortingState>
) => {
    setState(prev => ({ ...prev, ...newState }));
};

export const bubbleSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>
) => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!isSorting.current) return;

            // Highlight comparing elements
            updateState(setState, { comparing: [j, j + 1], swapping: [] });
            updateStats(stats, 'comparison');
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            if (arrayCopy[j] > arrayCopy[j + 1]) {
                // Highlight swapping elements
                updateState(setState, { swapping: [j, j + 1], comparing: [] });

                let temp = arrayCopy[j];
                arrayCopy[j] = arrayCopy[j + 1];
                arrayCopy[j + 1] = temp;

                updateStats(stats, 'swap');
                setArray([...arrayCopy]);
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
        // Mark element as sorted
        updateState(setState, {
            sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
            comparing: [],
            swapping: []
        });
    }

    // Mark all as sorted
    updateState(setState, {
        sorted: Array.from({ length: n }, (_, i) => i),
        comparing: [],
        swapping: []
    });
};

export const selectionSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>
) => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        updateState(setState, { current: [i], comparing: [], swapping: [] });

        for (let j = i + 1; j < n; j++) {
            if (!isSorting.current) return;

            updateState(setState, { comparing: [minIdx, j] });
            updateStats(stats, 'comparison');
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            if (arrayCopy[j] < arrayCopy[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            updateState(setState, { swapping: [i, minIdx], comparing: [] });

            const temp = arrayCopy[i];
            arrayCopy[i] = arrayCopy[minIdx];
            arrayCopy[minIdx] = temp;

            updateStats(stats, 'swap');
            setArray([...arrayCopy]);
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }

        updateState(setState, {
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            swapping: [],
            current: []
        });
    }
};

export const insertionSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>
) => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    updateState(setState, { sorted: [0] });

    for (let i = 1; i < n; i++) {
        let key = arrayCopy[i];
        let j = i - 1;

        updateState(setState, { current: [i], comparing: [], swapping: [] });
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        while (j >= 0 && arrayCopy[j] > key) {
            if (!isSorting.current) return;

            updateState(setState, { comparing: [j, j + 1] });
            updateStats(stats, 'comparison');
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            arrayCopy[j + 1] = arrayCopy[j];
            updateStats(stats, 'swap');
            setArray([...arrayCopy]);

            j = j - 1;
        }

        arrayCopy[j + 1] = key;
        setArray([...arrayCopy]);

        updateState(setState, {
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            current: [],
            comparing: []
        });
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
};

export const mergeSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>,
    left = 0,
    right = array.length - 1
) => {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);
    await mergeSort(array, setArray, animationSpeed, isSorting, stats, setState, left, middle);
    await mergeSort(array, setArray, animationSpeed, isSorting, stats, setState, middle + 1, right);
    await merge(array, setArray, animationSpeed, isSorting, stats, setState, left, middle, right);
};

const merge = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>,
    left: number,
    middle: number,
    right: number
) => {
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        if (!isSorting.current) return;

        updateState(setState, {
            comparing: [left + i, middle + 1 + j],
            current: Array.from({ length: right - left + 1 }, (_, idx) => left + idx)
        });
        updateStats(stats, 'comparison');

        if (leftArray[i] <= rightArray[j]) {
            array[k++] = leftArray[i++];
        } else {
            array[k++] = rightArray[j++];
        }

        updateStats(stats, 'access');
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    while (i < leftArray.length) {
        if (!isSorting.current) return;
        array[k++] = leftArray[i++];
        updateStats(stats, 'access');
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    while (j < rightArray.length) {
        if (!isSorting.current) return;
        array[k++] = rightArray[j++];
        updateStats(stats, 'access');
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    updateState(setState, { comparing: [], current: [] });
};

export const quickSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>,
    low = 0,
    high = array.length - 1
) => {
    if (low < high) {
        const pivotIndex = await partition(array, setArray, animationSpeed, isSorting, stats, setState, low, high);
        if (pivotIndex !== undefined) {
            await quickSort(array, setArray, animationSpeed, isSorting, stats, setState, low, pivotIndex - 1);
            await quickSort(array, setArray, animationSpeed, isSorting, stats, setState, pivotIndex + 1, high);
        }
    }
};

const partition = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>,
    low: number,
    high: number
) => {
    const pivot = array[high];
    let i = low - 1;

    updateState(setState, { pivot: [high] });

    for (let j = low; j < high; j++) {
        if (!isSorting.current) return;

        updateState(setState, { comparing: [j], pivot: [high] });
        updateStats(stats, 'comparison');
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        if (array[j] < pivot) {
            i++;
            updateState(setState, { swapping: [i, j], pivot: [high] });

            [array[i], array[j]] = [array[j], array[i]];
            updateStats(stats, 'swap');
            setArray([...array]);
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
    }

    updateState(setState, { swapping: [i + 1, high], pivot: [] });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    updateStats(stats, 'swap');
    setArray([...array]);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));

    updateState(setState, { swapping: [], comparing: [] });
    return i + 1;
};

export const heapSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>
) => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arrayCopy, n, i, setArray, animationSpeed, isSorting, stats, setState);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        if (!isSorting.current) return;

        updateState(setState, { swapping: [0, i] });

        // Move current root to end
        [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
        updateStats(stats, 'swap');
        setArray([...arrayCopy]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        updateState(setState, {
            sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
            swapping: []
        });

        // Call heapify on the reduced heap
        await heapify(arrayCopy, i, 0, setArray, animationSpeed, isSorting, stats, setState);
    }

    updateState(setState, {
        sorted: Array.from({ length: n }, (_, i) => i),
        comparing: [],
        swapping: []
    });
};

const heapify = async (
    array: number[],
    n: number,
    i: number,
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>
) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    updateState(setState, { current: [i] });

    if (left < n) {
        updateState(setState, { comparing: [largest, left] });
        updateStats(stats, 'comparison');
        await new Promise(resolve => setTimeout(resolve, animationSpeed / 2));

        if (array[left] > array[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        updateState(setState, { comparing: [largest, right] });
        updateStats(stats, 'comparison');
        await new Promise(resolve => setTimeout(resolve, animationSpeed / 2));

        if (array[right] > array[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        updateState(setState, { swapping: [i, largest], comparing: [] });

        [array[i], array[largest]] = [array[largest], array[i]];
        updateStats(stats, 'swap');
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        await heapify(array, n, largest, setArray, animationSpeed, isSorting, stats, setState);
    }

    updateState(setState, { current: [], comparing: [], swapping: [] });
};

export const cocktailSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>
) => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;

    while (swapped) {
        swapped = false;

        // Forward pass
        for (let i = start; i < end; i++) {
            if (!isSorting.current) return;

            updateState(setState, { comparing: [i, i + 1] });
            updateStats(stats, 'comparison');
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            if (arrayCopy[i] > arrayCopy[i + 1]) {
                updateState(setState, { swapping: [i, i + 1], comparing: [] });

                [arrayCopy[i], arrayCopy[i + 1]] = [arrayCopy[i + 1], arrayCopy[i]];
                updateStats(stats, 'swap');
                setArray([...arrayCopy]);
                swapped = true;
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }

        if (!swapped) break;

        updateState(setState, {
            sorted: [...(setState as any).sorted || [], end],
            swapping: [],
            comparing: []
        });
        end--;

        swapped = false;

        // Backward pass
        for (let i = end - 1; i >= start; i--) {
            if (!isSorting.current) return;

            updateState(setState, { comparing: [i, i + 1] });
            updateStats(stats, 'comparison');
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            if (arrayCopy[i] > arrayCopy[i + 1]) {
                updateState(setState, { swapping: [i, i + 1], comparing: [] });

                [arrayCopy[i], arrayCopy[i + 1]] = [arrayCopy[i + 1], arrayCopy[i]];
                updateStats(stats, 'swap');
                setArray([...arrayCopy]);
                swapped = true;
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }

        updateState(setState, {
            sorted: [start, ...(setState as any).sorted || []],
            swapping: [],
            comparing: []
        });
        start++;
    }

    updateState(setState, {
        sorted: Array.from({ length: n }, (_, i) => i),
        comparing: [],
        swapping: []
    });
};

export const shellSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    stats: React.MutableRefObject<SortingStats>,
    setState: React.Dispatch<React.SetStateAction<SortingState>>
) => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Highlight current gap elements
        updateState(setState, {
            current: Array.from({ length: Math.ceil(n / gap) }, (_, i) => i * gap).filter(i => i < n)
        });
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        for (let i = gap; i < n; i++) {
            let temp = arrayCopy[i];
            let j = i;

            updateState(setState, { comparing: [j - gap, j] });
            updateStats(stats, 'comparison');
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            while (j >= gap && arrayCopy[j - gap] > temp) {
                if (!isSorting.current) return;

                updateState(setState, { swapping: [j - gap, j] });

                arrayCopy[j] = arrayCopy[j - gap];
                updateStats(stats, 'swap');
                setArray([...arrayCopy]);
                await new Promise(resolve => setTimeout(resolve, animationSpeed));

                j -= gap;

                if (j >= gap) {
                    updateState(setState, { comparing: [j - gap, j] });
                    updateStats(stats, 'comparison');
                    await new Promise(resolve => setTimeout(resolve, animationSpeed));
                }
            }

            arrayCopy[j] = temp;
            setArray([...arrayCopy]);
        }

        updateState(setState, { current: [], comparing: [], swapping: [] });
    }

    updateState(setState, {
        sorted: Array.from({ length: n }, (_, i) => i),
        comparing: [],
        swapping: []
    });
};