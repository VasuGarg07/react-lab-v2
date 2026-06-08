import type { InvoiceState } from './types';

export const money = (symbol: string, amount: number) =>
    `${symbol} ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

export interface Totals {
    subtotal: number;
    discountAmt: number;
    taxAmt: number;
    grand: number;
}

export const computeTotals = (invoice: InvoiceState): Totals => {
    const subtotal = invoice.items.reduce(
        (sum, it) => sum + it.quantity * it.price,
        0,
    );
    const discountAmt = (subtotal * invoice.discount) / 100;
    const taxable = subtotal - discountAmt;
    const taxAmt = (taxable * invoice.tax_rate) / 100;
    const grand = taxable + taxAmt;
    return { subtotal, discountAmt, taxAmt, grand };
};

/** Format a yyyy-mm-dd value into a readable date, e.g. "12 Jun 2026". */
export const formatDate = (iso: string): string => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return `${d} ${months[m - 1]} ${y}`;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const validateInvoice = (invoice: InvoiceState): string[] => {
    const errors: string[] = [];

    if (!invoice.invoice_id.trim()) errors.push('Invoice number is required.');
    if (!invoice.current_date) errors.push('Date of issue is required.');
    if (!invoice.due_date) errors.push('Due date is required.');

    const party = (label: string, p: InvoiceState['billing_from']) => {
        if (!p.name.trim()) errors.push(`${label}: name is required.`);
        if (!p.email.trim()) errors.push(`${label}: email is required.`);
        else if (!isEmail(p.email)) errors.push(`${label}: email is invalid.`);
        if (!p.address.trim()) errors.push(`${label}: address is required.`);
        if (!p.phone_number.trim()) errors.push(`${label}: phone number is required.`);
    };
    party('From', invoice.billing_from);
    party('Bill to', invoice.billing_to);

    if (invoice.items.length === 0) errors.push('Add at least one line item.');
    invoice.items.forEach((it, i) => {
        if (!it.name.trim()) errors.push(`Item ${i + 1}: description is required.`);
        if (it.quantity <= 0) errors.push(`Item ${i + 1}: quantity must be at least 1.`);
        if (it.price < 0) errors.push(`Item ${i + 1}: price cannot be negative.`);
    });

    return errors;
};

let seq = 0;
export const uid = () => `it_${Date.now().toString(36)}_${(seq++).toString(36)}`;
