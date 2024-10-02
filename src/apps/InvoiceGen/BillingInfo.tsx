import { Box, Input, Stack, Textarea, Typography } from '@mui/joy';
import React, { useCallback } from 'react';
import { useInvoice } from './InvoiceContext';

const BillingInfo: React.FC = () => {
    const { billTo, billFrom, dispatch } = useInvoice();

    const BillingSection = ({ title, data, type }: {
        title: string;
        data: { name: string; email: string; address: string };
        type: 'UPDATE_BILL_TO' | 'UPDATE_BILL_FROM';
    }) => {
        const handleChange = useCallback((field: 'name' | 'email' | 'address', value: string) => {
            dispatch({ type, payload: { [field]: value } });
        }, [dispatch, type]);

        return (
            <Stack spacing={1} width="100%">
                <Typography level="title-md">{title}</Typography>
                <Input
                    placeholder="Full Name"
                    value={data.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <Input
                    placeholder="Email address"
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <Textarea
                    placeholder="Billing address"
                    value={data.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    minRows={3}
                />
            </Stack>
        );
    };

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
                justifyContent="space-between"
            >
                <BillingSection title="Bill to:" data={billTo} type="UPDATE_BILL_TO" />
                <BillingSection title="Bill from:" data={billFrom} type="UPDATE_BILL_FROM" />
            </Stack>
        </Box>
    );
};

export default BillingInfo;