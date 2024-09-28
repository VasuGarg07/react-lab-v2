import React from 'react';
import { Box, Typography, Table } from '@mui/joy';
import { useInvoice } from './InvoiceContext';

const Preview: React.FC = () => {
    const { currentDate, dueDate, invoiceNumber, currency, billTo, billFrom, items, taxRate, discountRate, notes } = useInvoice();

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        return subtotal + taxAmount - discountAmount;
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography level="h4" sx={{ mb: 2 }}>Invoice Preview</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                    <Typography level="body-sm">Date: {currentDate}</Typography>
                    <Typography level="body-sm">Due Date: {dueDate}</Typography>
                </Box>
                <Box>
                    <Typography level="body-sm">Invoice Number: {invoiceNumber}</Typography>
                    <Typography level="body-sm">Currency: {currency}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                    <Typography level="body-md" fontWeight="bold">Bill To:</Typography>
                    <Typography level="body-sm">{billTo.name}</Typography>
                    <Typography level="body-sm">{billTo.email}</Typography>
                    <Typography level="body-sm">{billTo.address}</Typography>
                </Box>
                <Box>
                    <Typography level="body-md" fontWeight="bold">Bill From:</Typography>
                    <Typography level="body-sm">{billFrom.name}</Typography>
                    <Typography level="body-sm">{billFrom.email}</Typography>
                    <Typography level="body-sm">{billFrom.address}</Typography>
                </Box>
            </Box>
            <Table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Quantity</th>
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
                            <td>{item.price}</td>
                            <td>{(item.quantity * item.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Box sx={{ mt: 2 }}>
                <Typography>Subtotal: {calculateSubtotal().toFixed(2)}</Typography>
                <Typography>Tax ({taxRate}%): {(calculateSubtotal() * taxRate / 100).toFixed(2)}</Typography>
                <Typography>Discount ({discountRate}%): {(calculateSubtotal() * discountRate / 100).toFixed(2)}</Typography>
                <Typography fontWeight="bold">Total: {calculateTotal().toFixed(2)}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography level="body-md" fontWeight="bold">Notes:</Typography>
                <Typography level="body-sm">{notes}</Typography>
            </Box>
        </Box>
    );
};

export default Preview;