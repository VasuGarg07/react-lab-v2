import type { SortingState, SortingStats } from './algorithms.data';

type SetArray = React.Dispatch<React.SetStateAction<number[]>>;
type SetState = React.Dispatch<React.SetStateAction<SortingState>>;
type StatsRef = React.MutableRefObject<SortingStats>;
type SortingRef = React.MutableRefObject<boolean>;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const patch = (setState: SetState, partial: Partial<SortingState>) =>
    setState(prev => ({ ...prev, ...partial }));

export const bubbleSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState
) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!isSorting.current) return;
            patch(setState, { comparing: [j, j + 1], swapping: [] });
            stats.current.comparisons++;
            await delay(speed);

            if (arr[j] > arr[j + 1]) {
                patch(setState, { swapping: [j, j + 1], comparing: [] });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                stats.current.swaps++;
                setArray([...arr]);
                await delay(speed);
            }
        }
        patch(setState, {
            sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
            comparing: [], swapping: []
        });
    }
    patch(setState, { sorted: Array.from({ length: n }, (_, i) => i), comparing: [], swapping: [] });
};

export const selectionSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState
) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        patch(setState, { current: [i], comparing: [], swapping: [] });

        for (let j = i + 1; j < n; j++) {
            if (!isSorting.current) return;
            patch(setState, { comparing: [minIdx, j] });
            stats.current.comparisons++;
            await delay(speed);
            if (arr[j] < arr[minIdx]) minIdx = j;
        }

        if (minIdx !== i) {
            patch(setState, { swapping: [i, minIdx], comparing: [] });
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            stats.current.swaps++;
            setArray([...arr]);
            await delay(speed);
        }
        patch(setState, {
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            swapping: [], current: []
        });
    }
};

export const insertionSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState
) => {
    const arr = [...array];
    const n = arr.length;
    patch(setState, { sorted: [0] });

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        patch(setState, { current: [i], comparing: [], swapping: [] });
        await delay(speed);

        while (j >= 0 && arr[j] > key) {
            if (!isSorting.current) return;
            patch(setState, { comparing: [j, j + 1] });
            stats.current.comparisons++;
            await delay(speed);
            arr[j + 1] = arr[j];
            stats.current.swaps++;
            setArray([...arr]);
            j--;
        }

        arr[j + 1] = key;
        setArray([...arr]);
        patch(setState, {
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            current: [], comparing: []
        });
        await delay(speed);
    }
};

export const mergeSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState,
    left = 0, right = array.length - 1
) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSort(array, setArray, speed, isSorting, stats, setState, left, mid);
    await mergeSort(array, setArray, speed, isSorting, stats, setState, mid + 1, right);

    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (!isSorting.current) return;
        patch(setState, {
            comparing: [left + i, mid + 1 + j],
            current: Array.from({ length: right - left + 1 }, (_, idx) => left + idx)
        });
        stats.current.comparisons++;
        array[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
        stats.current.arrayAccesses++;
        setArray([...array]);
        await delay(speed);
    }

    while (i < leftArr.length) {
        if (!isSorting.current) return;
        array[k++] = leftArr[i++];
        stats.current.arrayAccesses++;
        setArray([...array]);
        await delay(speed);
    }

    while (j < rightArr.length) {
        if (!isSorting.current) return;
        array[k++] = rightArr[j++];
        stats.current.arrayAccesses++;
        setArray([...array]);
        await delay(speed);
    }

    patch(setState, { comparing: [], current: [] });
};

export const quickSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState,
    low = 0, high = array.length - 1
) => {
    if (low >= high) return;

    const pivot = array[high];
    let i = low - 1;
    patch(setState, { pivot: [high] });

    for (let j = low; j < high; j++) {
        if (!isSorting.current) return;
        patch(setState, { comparing: [j], pivot: [high] });
        stats.current.comparisons++;
        await delay(speed);

        if (array[j] < pivot) {
            i++;
            patch(setState, { swapping: [i, j], pivot: [high] });
            [array[i], array[j]] = [array[j], array[i]];
            stats.current.swaps++;
            setArray([...array]);
            await delay(speed);
        }
    }

    patch(setState, { swapping: [i + 1, high], pivot: [] });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    stats.current.swaps++;
    setArray([...array]);
    await delay(speed);

    const pivotIdx = i + 1;
    patch(setState, { swapping: [], comparing: [] });
    await quickSort(array, setArray, speed, isSorting, stats, setState, low, pivotIdx - 1);
    await quickSort(array, setArray, speed, isSorting, stats, setState, pivotIdx + 1, high);
};

const heapify = async (
    arr: number[], n: number, i: number,
    setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState
) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    patch(setState, { current: [i] });

    if (left < n) {
        patch(setState, { comparing: [largest, left] });
        stats.current.comparisons++;
        await delay(speed / 2);
        if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
        patch(setState, { comparing: [largest, right] });
        stats.current.comparisons++;
        await delay(speed / 2);
        if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
        patch(setState, { swapping: [i, largest], comparing: [] });
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        stats.current.swaps++;
        setArray([...arr]);
        await delay(speed);
        await heapify(arr, n, largest, setArray, speed, isSorting, stats, setState);
    }

    patch(setState, { current: [], comparing: [], swapping: [] });
};

export const heapSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState
) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(arr, n, i, setArray, speed, isSorting, stats, setState);

    for (let i = n - 1; i > 0; i--) {
        if (!isSorting.current) return;
        patch(setState, { swapping: [0, i] });
        [arr[0], arr[i]] = [arr[i], arr[0]];
        stats.current.swaps++;
        setArray([...arr]);
        await delay(speed);
        patch(setState, {
            sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
            swapping: []
        });
        await heapify(arr, i, 0, setArray, speed, isSorting, stats, setState);
    }

    patch(setState, { sorted: Array.from({ length: n }, (_, i) => i), comparing: [], swapping: [] });
};

export const cocktailSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState
) => {
    const arr = [...array];
    const n = arr.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;
    const sortedIndices: number[] = [];

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            if (!isSorting.current) return;
            patch(setState, { comparing: [i, i + 1] });
            stats.current.comparisons++;
            await delay(speed);

            if (arr[i] > arr[i + 1]) {
                patch(setState, { swapping: [i, i + 1], comparing: [] });
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                stats.current.swaps++;
                setArray([...arr]);
                swapped = true;
                await delay(speed);
            }
        }

        if (!swapped) break;
        sortedIndices.push(end);
        patch(setState, { sorted: [...sortedIndices], swapping: [], comparing: [] });
        end--;
        swapped = false;

        for (let i = end - 1; i >= start; i--) {
            if (!isSorting.current) return;
            patch(setState, { comparing: [i, i + 1] });
            stats.current.comparisons++;
            await delay(speed);

            if (arr[i] > arr[i + 1]) {
                patch(setState, { swapping: [i, i + 1], comparing: [] });
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                stats.current.swaps++;
                setArray([...arr]);
                swapped = true;
                await delay(speed);
            }
        }

        sortedIndices.push(start);
        patch(setState, { sorted: [...sortedIndices], swapping: [], comparing: [] });
        start++;
    }

    patch(setState, { sorted: Array.from({ length: n }, (_, i) => i), comparing: [], swapping: [] });
};

export const shellSort = async (
    array: number[], setArray: SetArray, speed: number,
    isSorting: SortingRef, stats: StatsRef, setState: SetState
) => {
    const arr = [...array];
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        patch(setState, {
            current: Array.from({ length: Math.ceil(n / gap) }, (_, i) => i * gap).filter(i => i < n)
        });
        await delay(speed);

        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;

            patch(setState, { comparing: [j - gap, j] });
            stats.current.comparisons++;
            await delay(speed);

            while (j >= gap && arr[j - gap] > temp) {
                if (!isSorting.current) return;
                patch(setState, { swapping: [j - gap, j] });
                arr[j] = arr[j - gap];
                stats.current.swaps++;
                setArray([...arr]);
                await delay(speed);
                j -= gap;

                if (j >= gap) {
                    patch(setState, { comparing: [j - gap, j] });
                    stats.current.comparisons++;
                    await delay(speed);
                }
            }

            arr[j] = temp;
            setArray([...arr]);
        }

        patch(setState, { current: [], comparing: [], swapping: [] });
    }

    patch(setState, { sorted: Array.from({ length: n }, (_, i) => i), comparing: [], swapping: [] });
};