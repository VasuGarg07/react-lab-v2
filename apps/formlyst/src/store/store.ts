import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@react-lab/auth';
import formBuilderReducer from './formBuilderSlice';
import formRendererReducer from './formRendererSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        formBuilder: formBuilderReducer,
        formRenderer: formRendererReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
