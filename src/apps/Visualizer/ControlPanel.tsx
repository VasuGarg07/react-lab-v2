import { ArraySize, TimeDuration } from '@/apps/Visualizer/algorithms';
import { Button, Option, Select, Stack, Typography } from '@mui/joy';
import React from 'react';

interface ControlPanelProps {
    algorithm: string;
    setAlgorithm: (value: string) => void;
    arraySize: number;
    setArraySize: (value: number) => void;
    animationSpeed: number;
    setAnimationSpeed: (value: number) => void;
    resetArray: () => void;
    sortArray: () => void;
    stopSorting: () => void; // New prop for stopping the sorting
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    algorithm,
    setAlgorithm,
    arraySize,
    setArraySize,
    animationSpeed,
    setAnimationSpeed,
    resetArray,
    sortArray,
    stopSorting // Destructure the new prop
}) => {
    const handleAlgorithmChange = (_: any, newValue: string | null) => {
        if (newValue) {
            stopSorting();
            setAlgorithm(newValue);
        }
    };

    const handleArraySizeChange = (_: any, newValue: number | null) => {
        if (newValue) {
            stopSorting();
            setArraySize(newValue);
        }
    };

    const handleAnimationSpeedChange = (_: any, newValue: number | null) => {
        if (newValue) {
            stopSorting();
            setAnimationSpeed(newValue);
        }
    };

    return (
        <Stack direction='row' p={2} spacing={1}>
            <Typography level='h2' fontFamily={'Kanit'}>Sorting Visualizer</Typography>
            <span className='spacer' />

            <Button onClick={resetArray}>Generate</Button>
            <Select value={algorithm} onChange={handleAlgorithmChange}>
                <Option value="Bubble Sort">Bubble Sort</Option>
                <Option value="Selection Sort">Selection Sort</Option>
                <Option value="Insertion Sort">Insertion Sort</Option>
                <Option value="Merge Sort">Merge Sort</Option>
                <Option value="Quick Sort">Quick Sort</Option>
            </Select>
            <Select value={arraySize} onChange={handleArraySizeChange}>
                {ArraySize.map((e, i) => (
                    <Option key={i} value={e}>{e}</Option>
                ))}
            </Select>
            <Select value={animationSpeed} onChange={handleAnimationSpeedChange}>
                {TimeDuration.map((e, i) => (
                    <Option key={i} value={e}>{e / 1000}s</Option>
                ))}
            </Select>
            <Button onClick={sortArray}>Sort</Button>
            <Button onClick={stopSorting}>Stop</Button>
        </Stack>
    );
};

export default ControlPanel;
