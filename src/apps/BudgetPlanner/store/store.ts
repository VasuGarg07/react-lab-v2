// store.ts
import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';

const store = configureStore({
    reducer: {
        expenses: transactionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
