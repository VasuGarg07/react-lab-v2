import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Slider,
    FormControl,
    Typography,
    Input,
    FormLabel,
    Stack,
    Tooltip
} from '@mui/joy';
import { Info } from 'lucide-react';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';

const LoanInputs: React.FC = () => {
    const { loanParams, updateLoanParams } = useLoan();
    const { homeValue, downPayment, loanAmount, interestRate, loanTenure, extraPayment = 0 } = loanParams;

    // Generic handler for slider changes
    const handleSliderChange = (paramName: keyof typeof loanParams) => (_: Event, newValue: number | number[]) => {
        const value = newValue as number;
        updateLoanParams({ [paramName]: value });
    };

    // Handler for number input changes
    const handleInputChange = (paramName: keyof typeof loanParams) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value) && value >= 0) {
            updateLoanParams({ [paramName]: value });
        }
    };

    // Define input field configurations for cleaner rendering
    const inputFields = [
        {
            id: 'homeValue',
            label: 'Home Value',
            value: homeValue,
            min: 10_00_000,
            max: 100_00_000,
            step: 50_000,
            format: formatCurrency,
            marks: [
                { value: 10_00_000, label: '₹10M' },
                { value: 100_00_000, label: '₹100M' }
            ]
        },
        {
            id: 'downPayment',
            label: 'Down Payment',
            value: downPayment,
            min: 0,
            max: homeValue,
            step: 50_000,
            format: formatCurrency,
            marks: [
                { value: 0, label: '₹0M' },
                { value: homeValue, label: '₹' + (homeValue / 100000).toFixed(1) + 'M' }
            ]
        },
        {
            id: 'loanAmount',
            label: 'Loan Amount',
            value: loanAmount,
            min: 0,
            max: homeValue,
            step: 50_000,
            format: formatCurrency,
            marks: [
                { value: 0, label: '₹0M' },
                { value: homeValue, label: '₹' + (homeValue / 100000).toFixed(1) + 'M' }
            ]
        },
        {
            id: 'interestRate',
            label: 'Interest Rate',
            value: interestRate,
            min: 2,
            max: 18,
            step: 0.1,
            format: (value: number) => `${value}%`,
            marks: [
                { value: 2, label: '2%' },
                { value: 18, label: '18%' }
            ]
        },
        {
            id: 'loanTenure',
            label: 'Loan Tenure',
            value: loanTenure,
            min: 5,
            max: 25,
            step: 1,
            format: (value: number) => `${value} Years`,
            marks: [
                { value: 5, label: '5 Years' },
                { value: 25, label: '25 Years' }
            ]
        }
    ];

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-lg" sx={{ mb: 3 }}>
                    Loan Parameters
                </Typography>

                <Stack spacing={4}>
                    {/* Map through the input fields array to render sliders */}
                    {inputFields.map((field) => (
                        <FormControl key={field.id}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                                <Typography level="body-sm" sx={{ fontWeight: 500 }}>
                                    {field.format(field.value)}
                                </Typography>
                            </Box>
                            <Slider
                                id={field.id}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                value={field.value}
                                onChange={handleSliderChange(field.id as keyof typeof loanParams)}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => field.format(value)}
                                marks={field.marks}
                                sx={{
                                    px: '12px',
                                    '& .MuiSlider-markLabel': {
                                        fontSize: '0.75rem',
                                        transform: 'translateX(0)'
                                    },
                                    '& .MuiSlider-markLabelActive': {
                                        color: 'text.primary'
                                    },
                                    '& .MuiSlider-markLabel[data-index="1"]': {
                                        left: 'unset !important',
                                        right: '0%'
                                    }
                                }}
                            />
                        </FormControl>
                    ))}

                    {/* Extra Monthly Payment */}
                    <FormControl>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormLabel htmlFor="extraPayment" sx={{ mr: 1 }}>Extra Monthly Payment</FormLabel>
                                <Tooltip
                                    title="Making additional monthly payments will reduce your loan term and save on total interest."
                                    placement="top"
                                    variant="outlined"
                                >
                                    <Info size={16} color="#6f7882" />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Input
                            id="extraPayment"
                            type="number"
                            value={extraPayment}
                            onChange={handleInputChange('extraPayment')}
                            slotProps={{
                                input: {
                                    min: 0,
                                    step: 1000,
                                },
                            }}
                            startDecorator="₹"
                            sx={{ mt: 1 }}
                        />
                    </FormControl>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default LoanInputs;