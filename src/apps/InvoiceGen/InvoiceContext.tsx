import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CurrencyOptions } from './helpers';

interface InvoiceItem {
    name: string;
    description: string;
    quantity: number;
    price: number;
}

interface InvoiceContextType {
    currentDate: string;
    dueDate: string;
    setDueDate: (date: string) => void;
    invoiceNumber: string;
    currency: string;
    setCurrency: (currency: string) => void;
    currencySymbol: string;
    setCurrencySymbol: (symbol: string) => void;
    billTo: { name: string; email: string; address: string };
    setBillTo: (billTo: { name: string; email: string; address: string }) => void;
    billFrom: { name: string; email: string; address: string };
    setBillFrom: (billFrom: { name: string; email: string; address: string }) => void;
    items: InvoiceItem[];
    setItems: (items: InvoiceItem[]) => void;
    taxRate: number;
    setTaxRate: (rate: number) => void;
    discountRate: number;
    setDiscountRate: (rate: number) => void;
    notes: string;
    setNotes: (notes: string) => void;
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
    const [currentDate] = useState(new Date().toLocaleDateString());
    const [dueDate, setDueDate] = useState('');
    const [invoiceNumber] = useState('1');
    const [currency, setCurrency] = useState('USD');
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [billTo, setBillTo] = useState({ name: '', email: '', address: '' });
    const [billFrom, setBillFrom] = useState({ name: '', email: '', address: '' });
    const [items, setItems] = useState<InvoiceItem[]>([{ name: '', description: '', quantity: 1, price: 0 }]);
    const [taxRate, setTaxRate] = useState(0);
    const [discountRate, setDiscountRate] = useState(0);
    const [notes, setNotes] = useState('');

    return (
        <InvoiceContext.Provider value={{
            currentDate, dueDate, setDueDate, invoiceNumber,
            billTo, setBillTo, billFrom, setBillFrom, items, setItems,
            taxRate, setTaxRate, discountRate, setDiscountRate, notes, setNotes,
            currency,
            setCurrency: (newCurrency: string) => {
                setCurrency(newCurrency);
                const newSymbol = CurrencyOptions.find(option => option.value === newCurrency)?.symbol || '$';
                setCurrencySymbol(newSymbol);
            },
            currencySymbol,
            setCurrencySymbol,

        }}>
            {children}
        </InvoiceContext.Provider>
    );
};