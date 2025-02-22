import React, { useMemo } from 'react';
import { Box, Typography, Sheet, Grid, Divider, Table } from '@mui/joy';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';

const Preview: React.FC = () => {
    const { currentDate, dueDate, invoiceNumber, currency, billTo, billFrom, items, taxRate, discountRate, notes, currencySymbol } = useInvoice();

    const { subtotal, taxAmount, discountAmount, total } = useMemo(() => {
        const subtotal = items.reduce((sum, item) => sum + Number(item.quantity) * item.price, 0);
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;
        return { subtotal, taxAmount, discountAmount, total };
    }, [items, taxRate, discountRate]);

    const formatCurrency = (amount: number) => `${currencySymbol}${amount.toFixed(2)}`;

    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 'sm',
                fontSize: 'sm',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #ddd',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography level="h4" sx={{ mb: 1, color: '#000' }}>Invoice</Typography>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid xs={6}>
                    <Typography level="body-xs" sx={{ color: '#555' }}>Date: {currentDate}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>Due: {dueDate}</Typography>
                </Grid>
                <Grid xs={6} sx={{ textAlign: 'right' }}>
                    <Typography level="body-xs" sx={{ color: '#555' }}>Invoice #: {invoiceNumber}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>Currency: {currency}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid xs={6}>
                    <Typography level="body-sm" fontWeight="bold" sx={{ color: '#000' }}>Bill To:</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>{billTo.name}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>{billTo.email}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>{billTo.address}</Typography>
                </Grid>
                <Grid xs={6} sx={{ textAlign: 'right' }}>
                    <Typography level="body-sm" fontWeight="bold" sx={{ color: '#000' }}>Bill From:</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>{billFrom.name}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>{billFrom.email}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>{billFrom.address}</Typography>
                </Grid>
            </Grid>
            <Table
                aria-label="Invoice items"
                sx={{
                    mb: 2,
                    '& th': { fontWeight: 'bold', backgroundColor: '#f0f0f0', fontSize: 'xs', color: '#000' },
                    '& td': { fontSize: 'xs', color: '#000' },
                    '& td, & th': { p: 1, whiteSpace: 'nowrap' },
                    '& tr:nth-of-type(even)': { backgroundColor: '#f9f9f9' },
                    borderCollapse: 'collapse',
                    border: '1px solid #ddd',
                }}
            >
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{formatCurrency(item.price)}</td>
                            <td>{formatCurrency(Number(item.quantity) * item.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 0.5, textAlign: 'right' }}>
                    <Typography level="body-xs" sx={{ color: '#555' }}>Subtotal:</Typography>
                    <Typography level="body-xs" sx={{ color: '#000' }}>{formatCurrency(subtotal)}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>Tax ({taxRate}%):</Typography>
                    <Typography level="body-xs" sx={{ color: '#000' }}>{formatCurrency(taxAmount)}</Typography>
                    <Typography level="body-xs" sx={{ color: '#555' }}>Discount ({discountRate}%):</Typography>
                    <Typography level="body-xs" sx={{ color: '#000' }}>{formatCurrency(discountAmount)}</Typography>
                    <Divider sx={{ gridColumn: '1 / -1', my: 0.5 }} />
                    <Typography level="body-sm" fontWeight="bold" sx={{ color: '#000' }}>Total:</Typography>
                    <Typography level="body-sm" fontWeight="bold" sx={{ color: '#000' }}>{formatCurrency(total)}</Typography>
                </Box>
            </Box>
            <Box>
                <Typography level="body-sm" fontWeight="bold" sx={{ color: '#000' }}>Notes:</Typography>
                <Typography level="body-xs" sx={{ color: '#555' }}>{notes || "Thank you for your business!"}</Typography>
            </Box>
        </Sheet>
    );
};

export default Preview;
