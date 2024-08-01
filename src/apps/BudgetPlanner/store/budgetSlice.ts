// budgetSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../helpers/types';

interface BudgetState {
    items: Budget[];
}

const initialState: BudgetState = {
    items: [],
};

const budgetsSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        addBudget: (state, action: PayloadAction<Budget>) => {
            state.items.push(action.payload);
        },
        editBudget: (state, action: PayloadAction<Budget>) => {
            const index = state.items.findIndex(budget => budget.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteBudget: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(budget => budget.id !== action.payload);
        },
    },
});

export const { addBudget, editBudget, deleteBudget } = budgetsSlice.actions;

export default budgetsSlice.reducer;
