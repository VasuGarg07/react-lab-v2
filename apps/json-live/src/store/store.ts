import { configureStore } from '@reduxjs/toolkit';
import jsonViewerReducer from './jsonViewerSlice';

export const store = configureStore({
    reducer: {
        jsonViewer: jsonViewerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
