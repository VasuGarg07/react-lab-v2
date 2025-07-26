import { create } from 'zustand';
import { JsonValue } from './json.utilities';

export type InputMode = 'text' | 'file' | 'url';

interface JsonViewerState {
    // Only truly shared state
    parsedJson: JsonValue | null;
    currentPath: string[];

    // Actions
    setParsedJson: (json: JsonValue | null) => void;
    setCurrentPath: (path: string[]) => void;
    navigateToPath: (path: string[]) => void;
    navigateToBreadcrumb: (index: number) => void;
    resetNavigation: () => void;
}

export const useJsonViewerStore = create<JsonViewerState>((set, get) => ({
    // Initial state - only navigation and parsed data
    parsedJson: null,
    currentPath: [],

    // Actions
    setParsedJson: (parsedJson) => set({
        parsedJson,
        currentPath: [] // Reset navigation when new JSON is loaded
    }),

    setCurrentPath: (currentPath) => set({ currentPath }),

    navigateToPath: (path) => set({ currentPath: path }),

    navigateToBreadcrumb: (index) => {
        const { currentPath } = get();
        if (index === -1) {
            set({ currentPath: [] });
        } else {
            set({ currentPath: currentPath.slice(0, index + 1) });
        }
    },

    resetNavigation: () => set({ currentPath: [] }),
}));