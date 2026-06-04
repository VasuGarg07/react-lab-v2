import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { JsonValue } from './json.utilities';

interface JsonState {
    parsedJson: JsonValue | null;
    currentPath: string[];
}

const initial: JsonState = { parsedJson: null, currentPath: [] };

type Action =
    | { type: 'SET_JSON'; payload: JsonValue | null }
    | { type: 'NAVIGATE_TO'; payload: string[] }
    | { type: 'BREADCRUMB'; payload: number };

function reducer(state: JsonState, action: Action): JsonState {
    switch (action.type) {
        case 'SET_JSON':
            return { parsedJson: action.payload, currentPath: [] };
        case 'NAVIGATE_TO':
            return { ...state, currentPath: action.payload };
        case 'BREADCRUMB':
            return { ...state, currentPath: action.payload === -1 ? [] : state.currentPath.slice(0, action.payload + 1) };
    }
}

interface JsonContextValue { state: JsonState; dispatch: React.Dispatch<Action>; }
const JsonContext = createContext<JsonContextValue | null>(null);

export function JsonProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initial);
    return <JsonContext.Provider value={{ state, dispatch }}>{children}</JsonContext.Provider>;
}

export function useJson() {
    const ctx = useContext(JsonContext);
    if (!ctx) throw new Error('useJson must be inside JsonProvider');
    return ctx;
}
