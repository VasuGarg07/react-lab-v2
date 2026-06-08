export interface BillingInfo {
    name: string;
    email: string;
    address: string;
    phone_number: string;
}

export interface InvoiceItem {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
}

export interface InvoiceState {
    invoice_id: string;
    current_date: string;
    due_date: string;
    currency: string;
    currency_symbol: string;
    billing_from: BillingInfo;
    billing_to: BillingInfo;
    items: InvoiceItem[];
    tax_rate: number;
    discount: number;
    notes: string;
}

export interface Currency {
    code: string;
    symbol: string;
    label: string;
}

export const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
    { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
];
