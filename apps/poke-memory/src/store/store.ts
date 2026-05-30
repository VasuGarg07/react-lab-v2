import { configureStore } from '@reduxjs/toolkit';
import pokeMemoryReducer from './pokeMemorySlice';

export const store = configureStore({
    reducer: {
        pokeMemory: pokeMemoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
