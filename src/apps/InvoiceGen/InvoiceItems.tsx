import React from 'react';
import { Box, Button, IconButton, Input, Grid, Typography } from '@mui/joy';
import { Plus, Trash2 } from 'lucide-react';
import { useInvoice } from './InvoiceContext';

const InvoiceItems: React.FC = () => {
    const { items, setItems, currencySymbol } = useInvoice();

    const handleItemChange = (index: number, field: string, value: string | number) => {
        const newItems = [...items];
        if (field === 'quantity') {
            newItems[index] = { ...newItems[index], [field]: Math.max(1, parseInt(value as string) || 1) };
        } else {
            newItems[index] = { ...newItems[index], [field]: value };
        }
        setItems(newItems);
    };

    const handleItemDelete = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemAdd = () => {
        setItems([...items, { name: '', description: '', quantity: 1, price: 0 }]);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Grid container spacing={1} sx={{ mb: 1, fontWeight: 'bold', display: { xs: 'none', sm: 'flex' } }}>
                <Grid sm={6}>Item</Grid>
                <Grid sm={3}>Quantity</Grid>
                <Grid sm={3}>Price</Grid>
            </Grid>
            {items.map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid xs={12} sm={6}>
                            <Typography level="body-sm" sx={{ mb: 1, display: { sm: 'none' } }}>Item</Typography>
                            <Input
                                placeholder="Item name"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid xs={6} sm={3}>
                            <Typography level="body-sm" sx={{ mb: 1, display: { sm: 'none' } }}>Quantity</Typography>
                            <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                slotProps={{
                                    input: {
                                        min: 1,
                                        step: 1,
                                    },
                                }}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid xs={6} sm={3}>
                            <Typography level="body-sm" sx={{ mb: 1, display: { sm: 'none' } }}>Price</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                    startDecorator={currencySymbol}
                                    slotProps={{
                                        input: {
                                            min: "0",
                                        },
                                    }}
                                    sx={{ width: '100%', mr: 1 }}
                                />
                                <IconButton
                                    variant="solid"
                                    color="danger"
                                    onClick={() => handleItemDelete(index)}
                                    size="sm"
                                >
                                    <Trash2 />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid xs={12} sm={9}>
                            <Input
                                placeholder="Item description"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <Button
                onClick={handleItemAdd}
                sx={{ mt: 1 }}
                startDecorator={<Plus />}
            >
                Add Item
            </Button>
        </Box>
    );
};

export default InvoiceItems;