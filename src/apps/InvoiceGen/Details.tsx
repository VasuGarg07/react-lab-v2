import React from 'react';
import { Box, Typography, Input, Select, Option } from '@mui/joy';
import { useInvoice } from './InvoiceContext';
import { CurrencyOptions } from './helpers';

const Details: React.FC = () => {
    const { currentDate, dueDate, setDueDate, invoiceNumber, currency, setCurrency } = useInvoice();

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                <Typography level="body-sm">Current Date: {currentDate}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography level="body-sm" sx={{ mr: 1 }}>Due Date:</Typography>
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        sx={{ width: '150px' }}
                    />
                </Box>
            </Box>
            <Box>
                <Typography level="body-sm">Invoice Number: {invoiceNumber}</Typography>
                <Select
                    value={currency}
                    onChange={(_, value) => setCurrency(value as string)}
                    sx={{ mt: 1, width: '200px' }}
                >
                    {CurrencyOptions.map((option) => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                </Select>
            </Box>
        </Box>
    );
};

export default Details;