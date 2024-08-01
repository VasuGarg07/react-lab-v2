import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../contexts/ModalProvider';
import { ExpenseCategories, generateId, IncomeCategories } from '../helpers/utilities';
import { Autocomplete, Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { IndianRupee } from 'lucide-react';
import { Transaction } from '../helpers/types';
import { addTransaction, editTransaction } from '../store/transactionSlice';

interface TransactionFormProps {
    transactionType: 'expense' | 'income';
    transaction?: Transaction;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transactionType, transaction }) => {
    const [name, setName] = useState(transaction?.name || '');
    const [category, setCategory] = useState(transaction?.category || '');
    const [date, setDate] = useState(transaction?.date || '');
    const [amount, setAmount] = useState(transaction?.amount || 0);
    const [note, setNote] = useState(transaction?.note || '');
    const [error, setError] = useState<boolean>(false);

    const dispatch = useDispatch();
    const { hideModal } = useModal();

    useEffect(() => {
        if (transaction) {
            setName(transaction.name);
            setCategory(transaction.category);
            setDate(transaction.date);
            setAmount(transaction.amount);
            setNote(transaction.note || '');
        }
    }, [transaction]);

    const handleSubmit = () => {
        if (!name || !amount || !category || !date) {
            setError(true);
            return;
        }

        setError(false);
        const transactionData: Transaction = {
            id: transaction ? transaction.id : generateId(),
            name,
            type: transactionType,
            category,
            date,
            amount,
            note,
        };

        if (transaction) {
            dispatch(editTransaction(transactionData));
        } else {
            dispatch(addTransaction(transactionData));
        }
        hideModal();
    };

    const categories = transactionType === 'income' ? IncomeCategories : ExpenseCategories;

    return (
        <Stack spacing={1} useFlexGap sx={{ p: 2 }}>
            <FormControl error={error}>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder={transactionType === 'income' ? 'Salary' : 'Groceries'}
                    variant="outlined"
                    color={error ? 'danger' : 'neutral'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl error={error}>
                <FormLabel>Category</FormLabel>
                <Autocomplete
                    placeholder="Select Category"
                    color={error ? 'danger' : 'neutral'}
                    options={categories}
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
                <Input
                    placeholder="1000"
                    variant="outlined"
                    color={error ? 'danger' : 'neutral'}
                    value={amount}
                    onChange={(e) => setAmount(+(e.target.value))}
                    startDecorator={<IndianRupee size={16} />}
                />
            </FormControl>
            <FormControl error={error}>
                <FormLabel>Date</FormLabel>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Note</FormLabel>
                <Input
                    placeholder="Optional note"
                    variant="outlined"
                    color={error ? 'danger' : 'neutral'}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </FormControl>
            <Stack spacing={2} direction='row' justifyContent='center' sx={{ width: 1, mt: 1 }}>
                <Button onClick={hideModal} variant="soft" color='danger' sx={{ width: 0.5 }}>Cancel</Button>
                <Button onClick={handleSubmit} variant="solid" color='primary' sx={{ width: 0.5 }}>
                    {transaction ? 'Update' : 'Add'} {transactionType === 'income' ? 'Income' : 'Expense'}
                </Button>
            </Stack>
        </Stack>
    );
};

export default TransactionForm;
