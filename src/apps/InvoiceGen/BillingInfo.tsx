import { Box, Input, Stack, Textarea, Typography } from '@mui/joy';
import React from 'react';
import { useInvoice } from './InvoiceContext';

const BillingInfo: React.FC = () => {
    const { billTo, setBillTo, billFrom, setBillFrom } = useInvoice();

    const BillingSection = ({ title, data, setData }: {
        title: string;
        data: typeof billTo;
        setData: (data: typeof billTo) => void;
    }) => (
        <Stack spacing={1} width="100%">
            <Typography level="title-md">{title}</Typography>
            <Input
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Input
                placeholder="Email address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Textarea
                placeholder="Billing address"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                minRows={3}
            />
        </Stack>
    );

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
                justifyContent="space-between"
            >
                <BillingSection title="Bill to:" data={billTo} setData={setBillTo} />
                <BillingSection title="Bill from:" data={billFrom} setData={setBillFrom} />
            </Stack>
        </Box>
    );
};

export default BillingInfo;