import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JsonValue } from "../apps/JsonLive/json.utilities";

export type InputMode = "text" | "file" | "url";

export interface JsonViewerState {
    parsedJson: any;
    currentPath: string[];
}

const initialState: JsonViewerState = {
    parsedJson: null,
    currentPath: [],
};

const jsonViewerSlice = createSlice({
    name: "jsonViewer",
    initialState,
    reducers: {
        setParsedJson(state, action: PayloadAction<JsonValue | null>) {
            state.parsedJson = action.payload as JsonValue | null;
            state.currentPath = []; // reset navigation when new JSON is loaded
        },
        setCurrentPath(state, action: PayloadAction<string[]>) {
            state.currentPath = action.payload;
        },
        navigateToPath(state, action: PayloadAction<string[]>) {
            state.currentPath = action.payload;
        },
        navigateToBreadcrumb(state, action: PayloadAction<number>) {
            const index = action.payload;

            if (index === -1) {
                state.currentPath = [];
            } else {
                state.currentPath = state.currentPath.slice(0, index + 1);
            }
        },
        resetNavigation(state) {
            state.currentPath = [];
        },
    },
});

export const {
    setParsedJson,
    setCurrentPath,
    navigateToPath,
    navigateToBreadcrumb,
    resetNavigation,
} = jsonViewerSlice.actions;

export default jsonViewerSlice.reducer;
