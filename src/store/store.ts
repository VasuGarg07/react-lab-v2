import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import quizReducer from './quizSlice';
import pokedexSliceReducer from './pokedexSlice';
import battleSliceReducer from './battleSlice';
import formBuilderSliceReducer from './formBuilderSlice';
import formRendererSliceReducer from './formRendererSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        quiz: quizReducer,
        pokedex: pokedexSliceReducer,
        battle: battleSliceReducer,
        formBuilder: formBuilderSliceReducer,
        formRenderer: formRendererSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
