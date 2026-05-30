import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice';
import battleReducer from './battleSlice';

export const store = configureStore({
    reducer: {
        pokedex: pokedexReducer,
        battle: battleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
