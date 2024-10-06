import React, { useState, useCallback, useEffect } from 'react';
import { Box, Input, Stack, Textarea, Typography, FormControl, FormLabel, FormHelperText } from '@mui/joy';
import { useInvoice } from './InvoiceContext';

interface BillingData {
    name: string;
    email: string;
    address: string;
}

interface BillingSectionProps {
    title: string;
    initialData: BillingData;
    onUpdate: (data: BillingData) => void;
}

const BillingSection: React.FC<BillingSectionProps> = React.memo(({ title, initialData, onUpdate }) => {
    const [data, setData] = useState<BillingData>(initialData);
    const [errors, setErrors] = useState<Partial<BillingData>>({});

    const validateField = useCallback((field: keyof BillingData, value: string) => {
        switch (field) {
            case 'name':
                return value.trim() !== '' ? '' : 'Name is required';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
            case 'address':
                return ''; // Address is now optional
            default:
                return '';
        }
    }, []);

    const handleChange = useCallback((field: keyof BillingData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }, [validateField]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (Object.values(errors).every(error => error === '')) {
                onUpdate(data);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [data, errors, onUpdate]);

    return (
        <Stack spacing={1} width="100%">
            <Typography
                level="title-lg"
                sx={{
                    color: 'primary.main',
                    mb: 2,
                }}
            >
                {title}
            </Typography>
            <FormControl error={!!errors.name}>
                <FormLabel>Full Name</FormLabel>
                <Input
                    placeholder="Enter full name"
                    value={data.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
            </FormControl>
            <FormControl error={!!errors.email}>
                <FormLabel>Email Address</FormLabel>
                <Input
                    placeholder="Enter email address"
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
            </FormControl>
            <FormControl>
                <FormLabel>Billing Address (Optional)</FormLabel>
                <Textarea
                    placeholder="Enter billing address (optional)"
                    value={data.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    minRows={3}
                />
            </FormControl>
        </Stack>
    );
});

const BillingInfo: React.FC<{ onValidStep: (isValid: boolean) => void }> = ({ onValidStep }) => {
    const { billTo, setBillTo, billFrom, setBillFrom } = useInvoice();

    const handleUpdateBillTo = useCallback((data: BillingData) => {
        setBillTo(data);
    }, [setBillTo]);

    const handleUpdateBillFrom = useCallback((data: BillingData) => {
        setBillFrom(data);
    }, [setBillFrom]);

    useEffect(() => {
        const isValid =
            billTo.name !== '' && billTo.email !== '' &&
            billFrom.name !== '' && billFrom.email !== '';
        onValidStep(isValid);
    }, [billTo, billFrom, onValidStep]);

    return (
        <Stack sx={{ width: '100%' }}
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="space-between"
        >
            <Box sx={{ width: { xs: '100%', md: '48%' } }}>
                <BillingSection title="Bill to:" initialData={billTo} onUpdate={handleUpdateBillTo} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '48%' } }}>
                <BillingSection title="Bill from:" initialData={billFrom} onUpdate={handleUpdateBillFrom} />
            </Box>
        </Stack>
    );
};

export default BillingInfo;