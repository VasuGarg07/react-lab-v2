// components/ExpenseForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../contexts/ModalProvider';
import { Expense } from '../helpers/types';
import { Categories, generateId } from '../helpers/utilities';
import { addExpense, editExpense } from '../store/expenseSlice';
import { Autocomplete, Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { IndianRupee } from 'lucide-react';

interface ExpenseFormProps {
    expense?: Expense;
    budgetId: string
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, budgetId }) => {
    const [name, setName] = useState(expense?.name || '');
    const [category, setCategory] = useState(expense?.category || '');
    const [date, setDate] = useState(expense?.date || '');
    const [amount, setAmount] = useState(expense?.amount || 0);
    const [error, setError] = useState<boolean>(false)

    const dispatch = useDispatch();
    const { hideModal } = useModal();

    const handleSubmit = () => {
        if (!name || !amount || !category || !date) {
            setError(true);
            return;
        }

        setError(false);
        const expenseData: Expense = {
            id: expense ? expense.id : generateId(),
            budgetId,
            name,
            category,
            date,
            amount,
        };

        if (expense) {
            dispatch(editExpense(expenseData));
        } else {
            dispatch(addExpense(expenseData));
        }
        hideModal();
    };

    return (
        <Stack spacing={1} useFlexGap sx={{ p: 2 }}>
            <FormControl error={error}>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Groceries" variant="outlined" color={error ? 'danger' : 'neutral'} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl error={error}>
                <FormLabel>Category</FormLabel>
                <Autocomplete
                    placeholder="Food"
                    color={error ? 'danger' : 'neutral'}
                    options={Categories}
                    value={category}
                    onChange={(_, newValue) => newValue && setCategory(newValue)}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    freeSolo
                />
            </FormControl>
            <FormControl error={error}>
                <FormLabel>Amount</FormLabel>
                <Input placeholder="1000" variant="outlined" color={error ? 'danger' : 'neutral'} onChange={(e) => setAmount(+(e.target.value))}
                    startDecorator={<IndianRupee size={16} />} />
            </FormControl>
            <FormControl error={error}>
                <FormLabel>Date</FormLabel>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
            <Stack spacing={2} direction='row' justifyContent='center' sx={{ width: 1, mt: 1 }}>
                <Button onClick={hideModal} variant="soft" color='danger' sx={{ width: 0.5 }}>Cancel</Button>
                <Button onClick={handleSubmit} variant="solid" color='primary' sx={{ width: 0.5 }}>{expense ? 'Update' : 'Add'} Expense</Button>
            </Stack>
        </Stack>
    );
};

export default ExpenseForm;
