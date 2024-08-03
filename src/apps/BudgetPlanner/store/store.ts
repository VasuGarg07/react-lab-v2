// store.ts
import { configureStore } from '@reduxjs/toolkit';
import budgetsReducer from './budgetSlice';
import expensesReducer from './expenseSlice';

const store = configureStore({
    reducer: {
        budgets: budgetsReducer,
        expenses: expensesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
