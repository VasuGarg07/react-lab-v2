import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CurrencyOptions } from './helpers';

interface BillingInfo {
    name: string;
    email: string;
    address: string;
}

interface InvoiceState {
    currentDate: string;
    dueDate: string;
    invoiceNumber: string;
    currency: string;
    currencySymbol: string;
    billTo: BillingInfo;
    billFrom: BillingInfo;
    items: Array<{ name: string; description: string; quantity: number; price: number }>;
    taxRate: number;
    discountRate: number;
    notes: string;
}

type InvoiceAction =
    | { type: 'SET_DUE_DATE'; payload: string }
    | { type: 'SET_CURRENCY'; payload: string }
    | { type: 'UPDATE_BILL_TO'; payload: Partial<BillingInfo> }
    | { type: 'UPDATE_BILL_FROM'; payload: Partial<BillingInfo> }
    | { type: 'SET_ITEMS'; payload: Array<{ name: string; description: string; quantity: number; price: number }> }
    | { type: 'SET_TAX_RATE'; payload: number }
    | { type: 'SET_DISCOUNT_RATE'; payload: number }
    | { type: 'SET_NOTES'; payload: string };

const initialState: InvoiceState = {
    currentDate: new Date().toLocaleDateString(),
    dueDate: '',
    invoiceNumber: '1',
    currency: 'USD',
    currencySymbol: '$',
    billTo: { name: '', email: '', address: '' },
    billFrom: { name: '', email: '', address: '' },
    items: [{ name: '', description: '', quantity: 1, price: 0 }],
    taxRate: 0,
    discountRate: 0,
    notes: '',
};

function invoiceReducer(state: InvoiceState, action: InvoiceAction): InvoiceState {
    switch (action.type) {
        case 'SET_DUE_DATE':
            return { ...state, dueDate: action.payload };
        case 'SET_CURRENCY':
            const newSymbol = CurrencyOptions.find(option => option.value === action.payload)?.symbol || '$';
            return { ...state, currency: action.payload, currencySymbol: newSymbol };
        case 'UPDATE_BILL_TO':
            return { ...state, billTo: { ...state.billTo, ...action.payload } };
        case 'UPDATE_BILL_FROM':
            return { ...state, billFrom: { ...state.billFrom, ...action.payload } };
        case 'SET_ITEMS':
            return { ...state, items: action.payload };
        case 'SET_TAX_RATE':
            return { ...state, taxRate: action.payload };
        case 'SET_DISCOUNT_RATE':
            return { ...state, discountRate: action.payload };
        case 'SET_NOTES':
            return { ...state, notes: action.payload };
        default:
            return state;
    }
}

interface InvoiceContextType extends InvoiceState {
    dispatch: React.Dispatch<InvoiceAction>;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoice = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoice must be used within an InvoiceProvider');
    }
    return context;
};

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(invoiceReducer, initialState);

    return (
        <InvoiceContext.Provider value={{ ...state, dispatch }}>
            {children}
        </InvoiceContext.Provider>
    );
};