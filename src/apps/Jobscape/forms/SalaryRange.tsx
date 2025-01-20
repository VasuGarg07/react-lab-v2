import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Slider from '@mui/joy/Slider';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { IJob } from '../helpers/job.types';

interface SalaryRangeSliderProps {
    control: Control<IJob>;
    errors: FieldErrors<IJob>;
}

const SalaryRangeSlider: React.FC<SalaryRangeSliderProps> = ({ control, errors }) => {
    const formatSalary = (value: number) => {
        if (value >= 1000000) {
            return `${(value / 100000).toFixed(1)}L`;
        }
        return `${(value / 100000).toFixed(1)}L`;
    };

    const stringToNumberArray = (value: string | undefined): [number, number] => {
        if (!value) return [1000000, 1500000]; // default values

        // Handle both formats: "3L - 5L" and "300000 - 500000"
        const [start, end] = value.split(' - ');

        const convertToNumber = (val: string): number => {
            if (val.endsWith('L')) {
                return parseFloat(val.replace('L', '')) * 100000;
            }
            return parseFloat(val);
        };

        return [convertToNumber(start), convertToNumber(end)];
    };

    const numberArrayToString = (values: number[]): string => {
        return `${formatSalary(values[0])} - ${formatSalary(values[1])}`;
    };

    return (
        <Controller
            name="salaryRange"
            control={control}
            defaultValue="10L - 15L"
            render={({ field }) => (
                <FormControl required error={!!errors.salaryRange}>
                    <FormLabel>Salary Range</FormLabel>
                    <Box sx={{ p: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
                            <Typography level="title-sm"> Range Value: </Typography>
                            <Typography level="title-sm" fontWeight='bold'>
                                {formatSalary(stringToNumberArray(field.value)[0])} -                                {formatSalary(stringToNumberArray(field.value)[1])}
                            </Typography>
                        </Box>
                        <Slider
                            value={stringToNumberArray(field.value)}
                            min={100000}  // 1L
                            max={10000000}  // 1Cr
                            step={100000}  // 1L steps
                            onChange={(_, value) => {
                                const numberArray = Array.isArray(value) ? value : [value, value];
                                field.onChange(numberArrayToString(numberArray));
                            }}
                            valueLabelDisplay="auto"
                            valueLabelFormat={formatSalary}
                            marks={[
                                { value: 100000, label: '1L' },
                                { value: 2500000, label: '25L' },
                                { value: 5000000, label: '50L' },
                                { value: 7500000, label: '75L' },
                                { value: 10000000, label: '1Cr' },
                            ]}
                        />

                    </Box>
                    {errors.salaryRange && (
                        <FormHelperText>{errors.salaryRange.message}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default SalaryRangeSlider;