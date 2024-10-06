import React, { useEffect, useState } from 'react';
import { Typography, Input, Select, Option, FormControl, FormLabel, FormHelperText, Grid } from '@mui/joy';
import { useInvoice } from './InvoiceContext';
import { CurrencyOptions } from './helpers';

interface DetailsProps {
    onValidStep: (isValid: boolean) => void;
}

const Details: React.FC<DetailsProps> = ({ onValidStep }) => {
    const { currentDate, dueDate, setDueDate, invoiceNumber, currency, setCurrency } = useInvoice();
    const [dueDateError, setDueDateError] = useState<string | null>(null);
    const [dueDateTouched, setDueDateTouched] = useState(false);

    useEffect(() => {
        validateForm();
    }, [dueDate, currency]);

    const validateForm = () => {
        let isValid = true;

        // Validate Due Date
        if (!dueDate) {
            setDueDateError('Due date is required');
            isValid = false;
        } else {
            const selectedDate = new Date(dueDate);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);  // Reset time to start of day

            if (selectedDate <= currentDate) {
                setDueDateError('Due date must be after today');
                isValid = false;
            } else if (selectedDate > maxDate) {
                setDueDateError('Due date cannot be more than a year from now');
                isValid = false;
            } else {
                setDueDateError(null);
            }
        }

        onValidStep(isValid);
    };

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
        setDueDateTouched(true);
    };

    const today = new Date();
    today.setDate(today.getDate() + 1);  // Set to tomorrow
    const minDate = today.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);  // Set to one year from now
    const maxDateString = maxDate.toISOString().split('T')[0];

    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={12} sm={6}>
                <Typography level="body-md">
                    <strong>Current Date:</strong> {currentDate}
                </Typography>
            </Grid>
            <Grid xs={12} sm={6}>
                <Typography level="body-md">
                    <strong>Invoice ID:</strong> {invoiceNumber}
                </Typography>
            </Grid>
            <Grid xs={12} sm={6}>
                <FormControl error={dueDateTouched && !!dueDateError}>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={handleDueDateChange}
                        onBlur={() => setDueDateTouched(true)}
                        slotProps={{
                            input: {
                                min: minDate,
                                max: maxDateString,
                            },
                        }}
                    />
                    {dueDateTouched && dueDateError && <FormHelperText>{dueDateError}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
                <FormControl>
                    <FormLabel>Currency</FormLabel>
                    <Select
                        value={currency}
                        onChange={(_, value) => setCurrency(value as string)}
                    >
                        {CurrencyOptions.map((option) => (
                            <Option key={option.value} value={option.value}>{option.label}</Option>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Details;