// expenseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../helpers/types';

interface ExpenseState {
    items: Expense[];
}

const initialState: ExpenseState = {
    items: [],
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.items.push(action.payload);
        },
        editExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.items.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(expense => expense.id !== action.payload);
        },
    },
});

export const { addExpense, editExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
