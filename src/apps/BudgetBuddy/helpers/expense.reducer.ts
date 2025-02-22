import { Transaction } from "@/apps/BudgetBuddy/helpers/expense.constants";

export interface BudgetState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

export type Action =
    | { type: 'FETCH_TRANSACTIONS'; payload: Transaction[] }
    | { type: 'ADD_TRANSACTION'; payload: Transaction }
    | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
    | { type: 'DELETE_TRANSACTION'; payload: string }
    | { type: 'CLEAR_ALL_TRANSACTIONS' }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean };

export const initialState: BudgetState = {
    transactions: [],
    loading: false,
    error: null,
};

export const budgetReducer = (state: BudgetState, action: Action): BudgetState => {
    switch (action.type) {
        case 'FETCH_TRANSACTIONS':
            return { ...state, transactions: action.payload, loading: false, error: null };
        case 'ADD_TRANSACTION':
            return { ...state, transactions: [action.payload, ...state.transactions] };
        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map((t) =>
                    t.id === action.payload.id ? action.payload : t
                ),
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter((t) => t.id !== action.payload),
            };
        case 'CLEAR_ALL_TRANSACTIONS':
            return {
                ...state,
                transactions: []
            }
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};