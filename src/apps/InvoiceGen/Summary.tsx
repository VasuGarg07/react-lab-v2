import React, { useState, useEffect } from 'react';
import { Box, Typography, Input, Textarea, Divider, Grid } from '@mui/joy';
import { useInvoice } from './InvoiceContext';

const InvoiceSummary: React.FC = () => {
    const { items, taxRate, setTaxRate, discountRate, setDiscountRate, notes, setNotes, currencySymbol } = useInvoice();
    const [subtotal, setSubtotal] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newSubtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const newTaxAmount = newSubtotal * (taxRate / 100);
        const newDiscountAmount = newSubtotal * (discountRate / 100);
        const newTotal = newSubtotal + newTaxAmount - newDiscountAmount;

        setSubtotal(newSubtotal);
        setTaxAmount(newTaxAmount);
        setDiscountAmount(newDiscountAmount);
        setTotal(newTotal);
    }, [items, taxRate, discountRate]);

    const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTaxRate = Number(e.target.value);
        setTaxRate(newTaxRate);
    };

    const handleDiscountRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDiscountRate = Number(e.target.value);
        setDiscountRate(newDiscountRate);
    };

    return (
        <Box>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={6}>
                    <Typography level="body-sm">Tax:</Typography>
                    <Input
                        type="number"
                        value={taxRate}
                        onChange={handleTaxRateChange}
                        endDecorator="%"
                        slotProps={{
                            input: {
                                step: 0.1,
                                min: 0,
                                max: 100,
                            },
                        }}
                    />
                </Grid>
                <Grid xs={6}>
                    <Typography level="body-sm">Discount:</Typography>
                    <Input
                        type="number"
                        value={discountRate}
                        onChange={handleDiscountRateChange}
                        endDecorator="%"
                        slotProps={{
                            input: {
                                step: 0.1,
                                min: 0,
                                max: 100,
                            },
                        }}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography level="body-md">Subtotal:</Typography>
                    <Typography level="body-md">{currencySymbol}{subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography level="body-md">Tax Amount:</Typography>
                    <Typography level="body-md">{currencySymbol}{taxAmount.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography level="body-md">Discount Amount:</Typography>
                    <Typography level="body-md">{currencySymbol}{discountAmount.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography level="title-md">Total:</Typography>
                    <Typography level="title-md">{currencySymbol}{total.toFixed(2)}</Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography level="body-md" sx={{ mb: 1 }}>Notes:</Typography>
                <Textarea
                    placeholder="Thanks for your business!"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    minRows={3}
                    sx={{ width: '100%' }}
                />
            </Box>
        </Box>
    );
};

export default InvoiceSummary;