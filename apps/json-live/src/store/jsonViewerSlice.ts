import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JsonValue } from '../json.utilities';

export interface JsonViewerState {
    parsedJson: JsonValue | null;
    currentPath: string[];
}

const initialState: JsonViewerState = {
    parsedJson: null,
    currentPath: [],
};

const jsonViewerSlice = createSlice({
    name: 'jsonViewer',
    initialState,
    reducers: {
        setParsedJson(state, action: PayloadAction<JsonValue | null>) {
            state.parsedJson = action.payload;
            state.currentPath = [];
        },
        navigateToPath(state, action: PayloadAction<string[]>) {
            state.currentPath = action.payload;
        },
        navigateToBreadcrumb(state, action: PayloadAction<number>) {
            const index = action.payload;
            state.currentPath = index === -1 ? [] : state.currentPath.slice(0, index + 1);
        },
    },
});

export const { setParsedJson, navigateToPath, navigateToBreadcrumb } = jsonViewerSlice.actions;
export default jsonViewerSlice.reducer;
