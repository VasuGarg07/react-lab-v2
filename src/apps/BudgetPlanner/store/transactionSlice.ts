// transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../helpers/types';

interface TransactionState {
    items: Transaction[];
}

const initialState: TransactionState = {
    items: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.items.push(action.payload);
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.items.findIndex(Transaction => Transaction.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteTransaction: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(Transaction => Transaction.id !== action.payload);
        },
    },
});

export const { addTransaction, editTransaction, deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
