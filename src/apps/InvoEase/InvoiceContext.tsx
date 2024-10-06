import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CurrencyOptions, generateCompactId } from './helpers';

interface BillingInfo {
    name: string;
    email: string;
    address: string;
}

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
    setInvoiceNumber: (number: string) => void;
    currency: string;
    setCurrency: (currency: string) => void;
    currencySymbol: string;
    billTo: BillingInfo;
    setBillTo: (info: BillingInfo) => void;
    billFrom: BillingInfo;
    setBillFrom: (info: BillingInfo) => void;
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
    const [invoiceNumber, setInvoiceNumber] = useState(generateCompactId());
    const [currency, setCurrency] = useState('USD');
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [billTo, setBillTo] = useState<BillingInfo>({ name: '', email: '', address: '' });
    const [billFrom, setBillFrom] = useState<BillingInfo>({ name: '', email: '', address: '' });
    const [items, setItems] = useState<InvoiceItem[]>([{ name: '', description: '', quantity: 1, price: 0 }]);
    const [taxRate, setTaxRate] = useState(0);
    const [discountRate, setDiscountRate] = useState(0);
    const [notes, setNotes] = useState('');

    const handleSetCurrency = (newCurrency: string) => {
        setCurrency(newCurrency);
        const newSymbol = CurrencyOptions.find(option => option.value === newCurrency)?.symbol || '$';
        setCurrencySymbol(newSymbol);
    };

    return (
        <InvoiceContext.Provider value={{
            currentDate,
            dueDate,
            setDueDate,
            invoiceNumber,
            setInvoiceNumber,
            currency,
            setCurrency: handleSetCurrency,
            currencySymbol,
            billTo,
            setBillTo,
            billFrom,
            setBillFrom,
            items,
            setItems,
            taxRate,
            setTaxRate,
            discountRate,
            setDiscountRate,
            notes,
            setNotes,
        }}>
            {children}
        </InvoiceContext.Provider>
    );
};