import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Option,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Typography
} from '@mui/joy';
import { ReceiptText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { EXPENSE_TYPES, INCOME_TYPES, Transaction } from '../helpers/expense.constants';

interface TransactionFormProps {
    mode: 'add' | 'edit';
    onClose: () => void;
    transaction?: Transaction;
    onAdd: ((transaction: Transaction) => Promise<boolean>)
    onEdit: ((id: string, transaction: Transaction) => Promise<boolean>)
}

const TransactionForm: React.FC<TransactionFormProps> = ({
    mode,
    transaction,
    onClose,
    onAdd,
    onEdit
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense' as 'income' | 'expense',
        category: '',
        date: new Date().getTime(),
        description: ''
    });

    useEffect(() => {
        if (mode === 'edit' && transaction) {
            setFormData({
                title: transaction.title,
                amount: transaction.amount.toString(),
                type: transaction.type,
                category: transaction.category,
                date: transaction.date,
                description: transaction.description || ''
            });
        }
    }, [mode, transaction]);

    const handleChange = (field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleDateChange = (value: string | null) => {
        if (value) {
            setFormData(prev => ({
                ...prev,
                date: new Date(value).getTime()
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const transactionData = {
                ...formData,
                amount: parseFloat(formData.amount),
                date: formData.date / 1000
            };

            const success = mode === 'add' ? await onAdd(transactionData) : await onEdit(transaction!.id!, transactionData);
            if (success) {
                onClose();
            }
        } catch (error) {
            console.error('Failed to submit transaction:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <ReceiptText size={24} />
                <Typography level="h4" component="h2">
                    {mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}
                </Typography>
            </Stack>

            <Divider sx={{ mb: 1 }} />

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <FormControl required>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={formData.title}
                            onChange={handleChange('title')}
                            placeholder="Enter title"
                        />
                    </FormControl>

                    <Stack direction="row" spacing={2}>
                        <FormControl required sx={{ flex: 1 }}>
                            <FormLabel>Amount</FormLabel>
                            <Input
                                type="number"
                                value={formData.amount}
                                onChange={handleChange('amount')}
                                placeholder="Enter amount"
                                slotProps={{
                                    input: {
                                        step: '0.01',
                                        min: '0',
                                        max: '999999999'
                                    }
                                }}
                            />
                        </FormControl>

                        <FormControl required sx={{ flex: 1 }}>
                            <FormLabel>Date</FormLabel>
                            <Input
                                type="date"
                                value={new Date(formData.date).toISOString().split('T')[0]}
                                onChange={e => handleDateChange(e.target.value)}
                                slotProps={{
                                    input: {
                                        max: new Date().toISOString().split('T')[0]
                                    }
                                }}
                            />
                        </FormControl>
                    </Stack>

                    <FormControl required>
                        <FormLabel>Type</FormLabel>
                        <RadioGroup
                            orientation="horizontal"
                            value={formData.type}
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    type: e.target.value as 'income' | 'expense',
                                    category: ''
                                }));
                            }}
                        >
                            <Radio value="expense" label="Expense" />
                            <Radio value="income" label="Income" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl required>
                        <FormLabel>Category</FormLabel>
                        <Select
                            value={formData.category}
                            placeholder="Select Cateogory"
                            required
                            onChange={(_, value) => {
                                if (value) {
                                    setFormData(prev => ({ ...prev, category: value }));
                                }
                            }}
                        >
                            {(formData.type === 'expense' ? EXPENSE_TYPES : INCOME_TYPES).map(category => (
                                <Option key={category.name} value={category.name}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={formData.description}
                            onChange={handleChange('description')}
                            placeholder="Enter description (optional)"
                        />
                    </FormControl>

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={onClose}
                            disabled={isLoading}
                            sx={{ flex: 1, maxWidth: 120 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={isLoading}
                            sx={{ flex: 1, maxWidth: 120 }}
                        >
                            {mode === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </>
    );
};

export default TransactionForm;