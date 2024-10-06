import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, Input } from '@mui/joy';
import { Plus, Trash2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useInvoice } from './InvoiceContext';

const InvoiceItems: React.FC<{ onValidStep: (isValid: boolean) => void }> = ({ onValidStep }) => {
    const { items, setItems, currencySymbol } = useInvoice();
    const [errors, setErrors] = useState<string[]>([]);

    const validateItems = useCallback(() => {
        const newErrors = items.map(item => {
            if (!item.name.trim()) {
                return 'Item name is required';
            }
            if (!item.quantity) {
                return 'Quantity is required';
            }
            if (item.price <= 0) {
                return 'Price must be greater than 0';
            }
            return '';
        });
        setErrors(newErrors);
        const isValid = newErrors.every(error => !error);
        onValidStep(isValid);
        return isValid;
    }, [items, onValidStep]);

    const handleItemChange = useCallback((index: number, field: keyof typeof items[0], value: string | number) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    }, [items, setItems]);

    const handleItemAdd = useCallback(() => {
        setItems([...items, { name: '', description: '', quantity: 1, price: 0 }]);
    }, [items, setItems]);

    const handleItemDelete = useCallback((index: number) => {
        setItems(items.filter((_, i) => i !== index));
    }, [items, setItems]);

    useEffect(() => {
        validateItems();
    }, [items, validateItems]);

    return (
        <Box sx={{ mb: 2 }}>
            {items.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        mb: 4,
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 'sm',
                        bgcolor: 'background.level1', // Adding background color
                        '&:hover': {
                            bgcolor: 'background.level2', // Slightly darker on hover
                        },
                    }}
                >
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid xs={12} sm={6}>
                            <FormControl>
                                <FormLabel>Item Name</FormLabel>
                                <Input
                                    placeholder="Enter item name"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                    sx={{ width: '100%' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={6} sm={3}>
                            <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <Input
                                    placeholder="Enter quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    sx={{ width: '100%' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={6} sm={3}>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Enter price"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                    startDecorator={currencySymbol}
                                    slotProps={{
                                        input: {
                                            min: 0,
                                            step: 0.01,
                                        },
                                    }}
                                    sx={{ width: '100%' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12}>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    placeholder="Item description (optional)"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    sx={{ width: '100%' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            {items.length > 1 && (
                                <Button
                                    variant="solid"
                                    color="danger"
                                    onClick={() => handleItemDelete(index)}
                                    startDecorator={<Trash2 />}
                                >
                                    Delete Item
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    {errors[index] && (
                        <FormHelperText sx={{ color: 'danger.500', mt: 1 }}>
                            {errors[index]}
                        </FormHelperText>
                    )}
                </Box>
            ))}
            <Button
                onClick={handleItemAdd}
                startDecorator={<Plus />}
                sx={{ mt: 2 }}
            >
                Add Item
            </Button>
        </Box>
    );
};

export default React.memo(InvoiceItems);