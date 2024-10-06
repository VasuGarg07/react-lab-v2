import React, { useMemo, useCallback } from 'react';
import { Box, Typography, Input, Textarea, Divider, Grid, FormControl, FormLabel } from '@mui/joy';
import { useInvoice } from './InvoiceContext';

const InvoiceSummary: React.FC<{ onValidStep: (isValid: boolean) => void }> = ({ onValidStep }) => {
    const {
        items,
        taxRate,
        setTaxRate,
        discountRate,
        setDiscountRate,
        notes,
        setNotes,
        currencySymbol
    } = useInvoice();

    const { subtotal, taxAmount, discountAmount, total } = useMemo(() => {
        const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;

        return { subtotal, taxAmount, discountAmount, total };
    }, [items, taxRate, discountRate]);

    const handleTaxRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newTaxRate = Number(e.target.value);
        setTaxRate(newTaxRate);
    }, [setTaxRate]);

    const handleDiscountRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newDiscountRate = Number(e.target.value);
        setDiscountRate(newDiscountRate);
    }, [setDiscountRate]);

    const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    }, [setNotes]);

    // Validate the summary (always valid in this case)
    React.useEffect(() => {
        onValidStep(true);
    }, [onValidStep]);

    return (
        <Box>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={6}>
                    <FormControl>
                        <FormLabel>Tax Rate (%)</FormLabel>
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
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <FormControl>
                        <FormLabel>Discount Rate (%)</FormLabel>
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
                    </FormControl>
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
                <FormControl>
                    <FormLabel>Notes</FormLabel>
                    <Textarea
                        placeholder="Thanks for your business!"
                        value={notes}
                        onChange={handleNotesChange}
                        minRows={3}
                        sx={{ width: '100%' }}
                    />
                </FormControl>
            </Box>
        </Box>
    );
};

export default React.memo(InvoiceSummary);