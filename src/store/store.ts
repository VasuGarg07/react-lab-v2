import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import jsonViewerReducer from './jsonViewerSlice';
import quizReducer from './quizSlice';
import pokeMemoryReducer from './pokeMemorySlice';
import pokedexSliceReducer from './pokedexSlice';
import battleSliceReducer from './battleSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        jsonViewer: jsonViewerReducer,
        quiz: quizReducer,
        pokeMemory: pokeMemoryReducer,
        pokedex: pokedexSliceReducer,
        battle: battleSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
