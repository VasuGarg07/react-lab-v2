import React, { useState, useEffect, useRef } from 'react';
import { Box, Divider, Sheet, Stack, useColorScheme } from '@mui/joy';
import ControlPanel from './ControlPanel';
import Bar from './Bar';
import {
    randomIntFromInterval,
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    getMaxOfArray,
    TimeDuration,
    ArraySize
} from './helpers';

const SortingVisualizer: React.FC = () => {
    const { mode } = useColorScheme();
    const [array, setArray] = useState<number[]>([]);
    const [max, setMax] = useState<number>(0);
    const [algorithm, setAlgorithm] = useState<string>('Bubble Sort');
    const [arraySize, setArraySize] = useState<number>(ArraySize[0]);
    const [animationSpeed, setAnimationSpeed] = useState<number>(TimeDuration[0]);
    const isSorting = useRef(false);

    useEffect(() => {
        resetArray();
    }, [arraySize]);

    const resetArray = () => {
        if (isSorting.current) stopSorting();
        const newArray: number[] = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(randomIntFromInterval(5, 500));
        }
        setArray(newArray);
        setMax(getMaxOfArray(newArray));
    };

    const stopSorting = () => {
        isSorting.current = false;
    };

    const sortArray = async () => {
        if (isSorting.current) return;
        isSorting.current = true;
        switch (algorithm) {
            case 'Bubble Sort':
                await bubbleSort(array, setArray, animationSpeed, isSorting);
                break;
            case 'Selection Sort':
                await selectionSort(array, setArray, animationSpeed, isSorting);
                break;
            case 'Insertion Sort':
                await insertionSort(array, setArray, animationSpeed, isSorting);
                break;
            case 'Merge Sort':
                await mergeSort(array, setArray, animationSpeed, isSorting);
                break;
            case 'Quick Sort':
                await quickSort(array, setArray, animationSpeed, isSorting);
                break;
            default:
                break;
        }
        isSorting.current = false;
    };

    return (
        <Box sx={{
            minHeight: 'calc(100vh - 52px)',
            background: mode === 'dark'
                ? 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
                : 'linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 50%, #edf2f7 100%)',
        }}>
            <ControlPanel
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                arraySize={arraySize}
                setArraySize={setArraySize}
                animationSpeed={animationSpeed}
                setAnimationSpeed={setAnimationSpeed}
                resetArray={resetArray}
                sortArray={sortArray}
                stopSorting={stopSorting}
            />
            <Divider />
            <Sheet sx={{
                width: 'calc(100% - 32px)',
                maxWidth: 800,
                p: 2, my: 2, mx: 'auto',
                borderRadius: 16,
                boxShadow: 'xl',
                height: (max + 32)
            }}>
                <Stack direction='row' justifyContent="center" height={1}>
                    {array.map((value, idx) => (
                        <Bar
                            key={idx}
                            width={`calc(100% / ${arraySize}) `}
                            height={value}
                            animationSpeed={animationSpeed}
                        />
                    ))}
                </Stack>
            </Sheet>
        </Box>
    );
};

export default SortingVisualizer;
