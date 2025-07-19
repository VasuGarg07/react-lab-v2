import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { BillingInfo, InvoiceItem, Invoice } from '@/apps/InvoEase/invoice.types';
import { CurrencyOptions, generateCompactId } from '@/apps/InvoEase/invoice.utils';

interface InvoiceState {
    // Form data
    currentDate: string;
    dueDate: string;
    invoiceNumber: string;
    currency: string;
    currencySymbol: string;
    billTo: BillingInfo;
    billFrom: BillingInfo;
    items: InvoiceItem[];
    taxRate: number;
    discountRate: number;
    notes: string;
}

interface InvoiceActions {
    // Basic setters
    setDueDate: (date: string) => void;
    setInvoiceNumber: (number: string) => void;
    setCurrency: (currency: string) => void;
    setBillTo: (info: Partial<BillingInfo>) => void;
    setBillFrom: (info: Partial<BillingInfo>) => void;
    setTaxRate: (rate: number) => void;
    setDiscountRate: (rate: number) => void;
    setNotes: (notes: string) => void;

    // Item management
    addItem: () => void;
    removeItem: (index: number) => void;
    updateItem: (index: number, field: keyof InvoiceItem, value: string | number) => void;
    setItems: (items: InvoiceItem[]) => void;

    // Utility
    resetForm: () => void;
    getInvoiceData: () => Invoice;
}

type InvoiceStore = InvoiceState & InvoiceActions;

// Initial state
const initialState: InvoiceState = {
    currentDate: new Date().toLocaleDateString(),
    dueDate: '',
    invoiceNumber: generateCompactId(),
    currency: 'USD',
    currencySymbol: '$',
    billTo: { name: '', email: '', address: '' },
    billFrom: { name: '', email: '', address: '' },
    items: [{ name: '', description: '', quantity: 1, price: 0 }],
    taxRate: 0,
    discountRate: 0,
    notes: '',
};

const useInvoiceStore = create<InvoiceStore>()(
    subscribeWithSelector((set, get) => ({
        ...initialState,

        // Basic setters with shallow merging for objects
        setDueDate: (date) => set({ dueDate: date }),
        setInvoiceNumber: (number) => set({ invoiceNumber: number }),

        setCurrency: (currency) => {
            const currencyOption = CurrencyOptions.find(option => option.value === currency);
            const currencySymbol = currencyOption?.symbol || '$';
            set({ currency, currencySymbol });
        },

        setBillTo: (info) => set((state) => ({
            billTo: { ...state.billTo, ...info }
        })),

        setBillFrom: (info) => set((state) => ({
            billFrom: { ...state.billFrom, ...info }
        })),

        setTaxRate: (rate) => set({ taxRate: Math.max(0, Math.min(100, rate)) }),
        setDiscountRate: (rate) => set({ discountRate: Math.max(0, Math.min(100, rate)) }),
        setNotes: (notes) => set({ notes }),

        // Item management
        addItem: () => set((state) => ({
            items: [...state.items, { name: '', description: '', quantity: 1, price: 0 }]
        })),

        removeItem: (index) => set((state) => ({
            items: state.items.length > 1 ? state.items.filter((_, i) => i !== index) : state.items
        })),

        updateItem: (index, field, value) => set((state) => ({
            items: state.items.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        })),

        setItems: (items) => set({ items }),

        // Utility functions
        resetForm: () => set({ ...initialState, invoiceNumber: generateCompactId() }),

        getInvoiceData: (): Invoice => {
            const state = get();
            return {
                currentDate: state.currentDate,
                dueDate: state.dueDate,
                invoiceNumber: state.invoiceNumber,
                currency: state.currency,
                currencySymbol: state.currencySymbol,
                billTo: state.billTo,
                billFrom: state.billFrom,
                items: state.items,
                taxRate: state.taxRate,
                discountRate: state.discountRate,
                notes: state.notes,
            };
        },
    }))
);

// Memoized selectors to prevent unnecessary recalculations
export const useInvoiceCalculations = () => {
    const items = useInvoiceStore((state) => state.items);
    const taxRate = useInvoiceStore((state) => state.taxRate);
    const discountRate = useInvoiceStore((state) => state.discountRate);
    const currencySymbol = useInvoiceStore((state) => state.currencySymbol);

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = subtotal * (taxRate / 100);
    const discountAmount = subtotal * (discountRate / 100);
    const total = subtotal + taxAmount - discountAmount;

    return {
        subtotal,
        taxAmount,
        discountAmount,
        total,
        formatCurrency: (amount: number) => `${currencySymbol}${amount.toFixed(2)}`
    };
};

// Selective subscriptions for specific form sections
export const useBillingInfo = () => {
    const billTo = useInvoiceStore((state) => state.billTo);
    const billFrom = useInvoiceStore((state) => state.billFrom);
    const setBillTo = useInvoiceStore((state) => state.setBillTo);
    const setBillFrom = useInvoiceStore((state) => state.setBillFrom);

    return { billTo, billFrom, setBillTo, setBillFrom };
};

export const useInvoiceDetails = () => {
    const currentDate = useInvoiceStore((state) => state.currentDate);
    const dueDate = useInvoiceStore((state) => state.dueDate);
    const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);
    const currency = useInvoiceStore((state) => state.currency);
    const currencySymbol = useInvoiceStore((state) => state.currencySymbol);
    const setDueDate = useInvoiceStore((state) => state.setDueDate);
    const setInvoiceNumber = useInvoiceStore((state) => state.setInvoiceNumber);
    const setCurrency = useInvoiceStore((state) => state.setCurrency);

    return {
        currentDate,
        dueDate,
        invoiceNumber,
        currency,
        currencySymbol,
        setDueDate,
        setInvoiceNumber,
        setCurrency,
    };
};

export const useInvoiceItems = () => {
    const items = useInvoiceStore((state) => state.items);
    const currencySymbol = useInvoiceStore((state) => state.currencySymbol);
    const addItem = useInvoiceStore((state) => state.addItem);
    const removeItem = useInvoiceStore((state) => state.removeItem);
    const updateItem = useInvoiceStore((state) => state.updateItem);
    const setItems = useInvoiceStore((state) => state.setItems);

    return {
        items,
        currencySymbol,
        addItem,
        removeItem,
        updateItem,
        setItems,
    };
};

export const useInvoiceSummary = () => {
    const taxRate = useInvoiceStore((state) => state.taxRate);
    const discountRate = useInvoiceStore((state) => state.discountRate);
    const notes = useInvoiceStore((state) => state.notes);
    const setTaxRate = useInvoiceStore((state) => state.setTaxRate);
    const setDiscountRate = useInvoiceStore((state) => state.setDiscountRate);
    const setNotes = useInvoiceStore((state) => state.setNotes);

    return {
        taxRate,
        discountRate,
        notes,
        setTaxRate,
        setDiscountRate,
        setNotes,
    };
};

// Form validation helpers
export const useFormValidation = () => {
    const billTo = useInvoiceStore((state) => state.billTo);
    const billFrom = useInvoiceStore((state) => state.billFrom);
    const dueDate = useInvoiceStore((state) => state.dueDate);
    const items = useInvoiceStore((state) => state.items);

    const hasValidBillTo = billTo.name.trim() !== '' && billTo.email.trim() !== '';
    const hasValidBillFrom = billFrom.name.trim() !== '' && billFrom.email.trim() !== '';
    const hasValidDueDate = dueDate !== '';
    const hasValidItems = items.every(item =>
        item.name.trim() !== '' && item.quantity > 0 && item.price > 0
    );

    return {
        isValid: hasValidBillTo && hasValidBillFrom && hasValidDueDate && hasValidItems,
        sectionValidation: {
            details: hasValidDueDate,
            billing: hasValidBillTo && hasValidBillFrom,
            items: hasValidItems,
            summary: true, // Always valid
        }
    };
};

export default useInvoiceStore;