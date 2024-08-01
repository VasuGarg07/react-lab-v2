// components/BudgetForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget, editBudget } from '../store/budgetSlice';
import { Budget } from '../helpers/types';
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { useModal } from '../contexts/ModalProvider';
import { IndianRupee } from 'lucide-react';
import { generateId } from '../helpers/utilities';

interface BudgetFormProps {
    budget?: Budget;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ budget }) => {
    const [title, setTitle] = useState(budget?.title || '');
    const [description, setDescription] = useState(budget?.description || '');
    const [startDate, setStartDate] = useState(budget?.startDate || '');
    const [endDate, setEndDate] = useState(budget?.endDate || '');
    const [amount, setAmount] = useState(budget?.amount || 0);
    const [error, setError] = useState<boolean>(false)

    const dispatch = useDispatch();
    const { hideModal } = useModal();

    const isStartAfterEnd = (): boolean => {
        const start = new Date(`${startDate}T00:00:00`).getTime();
        const end = new Date(`${endDate}23:59:59`).getTime();
        return start >= end;
    }

    const handleSubmit = () => {

        if (!title || !amount || !startDate || !endDate || isStartAfterEnd()) {
            setError(true);
            return;
        }

        setError(false);
        const budgetData: Budget = {
            id: budget ? budget.id : generateId(),
            title,
            description,
            startDate,
            endDate,
            amount,
            expenses: budget ? budget.expenses : [],
        };

        if (budget) {
            dispatch(editBudget(budgetData));
        } else {
            dispatch(addBudget(budgetData));
        }
        hideModal();
    };

    return (
        <Stack spacing={1} useFlexGap sx={{ p: 2 }}>
            <FormControl error={error}>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Monthly Budget" variant="outlined" color={error ? 'danger' : 'neutral'} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl error={error}>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Budget for January" variant="outlined" color={error ? 'danger' : 'neutral'} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl error={error}>
                <FormLabel>Amount</FormLabel>
                <Input placeholder="1000" variant="outlined" color={error ? 'danger' : 'neutral'} onChange={(e) => setAmount(+(e.target.value))}
                    startDecorator={<IndianRupee size={16} />} />
            </FormControl>
            <Stack direction="row" spacing={2}>
                <FormControl error={error}>
                    <FormLabel>Start Date</FormLabel>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </FormControl>
                <FormControl error={error}>
                    <FormLabel>End Date</FormLabel>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </FormControl>
            </Stack>
            <Stack spacing={2} direction='row' justifyContent='center' sx={{ width: 1, mt: 1 }}>
                <Button onClick={hideModal} variant="soft" color='danger' sx={{ width: 0.5 }}>Cancel</Button>
                <Button onClick={handleSubmit} variant="solid" color='primary' sx={{ width: 0.5 }}>{budget ? 'Update' : 'Add'} Budget</Button>
            </Stack>
        </Stack >
    );
};

export default BudgetForm;
