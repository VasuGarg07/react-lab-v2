export const ArraySize = [10, 20, 25, 30, 40, 50];
export const TimeDuration = [400, 500, 600, 750, 800, 1000];

export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getMaxOfArray = (array: number[]): number => {
    return Math.max(...array);
};


export const bubbleSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>
) => {
    const arrayCopy = [...array];
    for (let i = 0; i < arrayCopy.length; i++) {
        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
            if (!isSorting.current) return;

            if (arrayCopy[j] > arrayCopy[j + 1]) {
                let temp = arrayCopy[j];
                arrayCopy[j] = arrayCopy[j + 1];
                arrayCopy[j + 1] = temp;
                setArray([...arrayCopy]);
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
    }
};

export const selectionSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>
) => {
    const arrayCopy = [...array];
    for (let i = 0; i < arrayCopy.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arrayCopy.length; j++) {
            if (!isSorting.current) return;
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            if (arrayCopy[j] < arrayCopy[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            const temp = arrayCopy[i];
            arrayCopy[i] = arrayCopy[minIdx];
            arrayCopy[minIdx] = temp;
            setArray([...arrayCopy]);
        }
    }
};

export const insertionSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>
) => {
    const arrayCopy = [...array];
    for (let i = 1; i < arrayCopy.length; i++) {
        let key = arrayCopy[i];
        let j = i - 1;
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        while (j >= 0 && arrayCopy[j] > key) {
            if (!isSorting.current) return;
            await new Promise(resolve => setTimeout(resolve, animationSpeed));

            arrayCopy[j + 1] = arrayCopy[j];
            setArray([...arrayCopy]);

            j = j - 1;
        }

        arrayCopy[j + 1] = key;
        setArray([...arrayCopy]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
};

export const mergeSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    left = 0,
    right = array.length - 1
) => {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    await mergeSort(array, setArray, animationSpeed, isSorting, left, middle);
    await mergeSort(array, setArray, animationSpeed, isSorting, middle + 1, right);
    await merge(array, setArray, animationSpeed, isSorting, left, middle, right);
    setArray([...array]);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
};

const merge = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    left: number,
    middle: number,
    right: number
) => {
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArray.length && j < rightArray.length) {
        if (!isSorting.current) return;
        if (leftArray[i] <= rightArray[j]) {
            array[k++] = leftArray[i++];
        } else {
            array[k++] = rightArray[j++];
        }
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
    while (i < leftArray.length) {
        if (!isSorting.current) return;
        array[k++] = leftArray[i++];
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
    while (j < rightArray.length) {
        if (!isSorting.current) return;
        array[k++] = rightArray[j++];
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
};

export const quickSort = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    low = 0,
    high = array.length - 1
) => {
    if (low < high) {
        const pivotIndex = await partition(array, setArray, animationSpeed, isSorting, low, high);
        if (pivotIndex) {
            await quickSort(array, setArray, animationSpeed, isSorting, low, pivotIndex - 1);
            await quickSort(array, setArray, animationSpeed, isSorting, pivotIndex + 1, high);
        }
    }
};

const partition = async (
    array: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    animationSpeed: number,
    isSorting: React.MutableRefObject<boolean>,
    low: number,
    high: number
) => {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (!isSorting.current) return;
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            setArray([...array]);
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setArray([...array]);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    return i + 1;
};
