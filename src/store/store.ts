import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import formBuilderSliceReducer from './formBuilderSlice';
import formRendererSliceReducer from './formRendererSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        formBuilder: formBuilderSliceReducer,
        formRenderer: formRendererSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
