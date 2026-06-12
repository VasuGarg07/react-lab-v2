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

export const todayIso = (): string => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const validateParty = (label: string, p: InvoiceState['billing_from']): string[] => {
    const errors: string[] = [];
    if (!p.name.trim()) errors.push(`${label}: name is required.`);
    if (!p.email.trim()) errors.push(`${label}: email is required.`);
    else if (!isEmail(p.email)) errors.push(`${label}: email is invalid.`);
    if (!p.address.trim()) errors.push(`${label}: address is required.`);
    if (!p.phone_number.trim()) errors.push(`${label}: phone number is required.`);
    return errors;
};

export const validateStep = (key: string, invoice: InvoiceState): string[] => {
    const errors: string[] = [];

    switch (key) {
        case 'details':
            if (!invoice.invoice_id.trim()) errors.push('Invoice number is required.');
            if (!invoice.current_date) errors.push('Date of issue is required.');
            else if (invoice.current_date > todayIso())
                errors.push('Date of issue cannot be in the future.');
            if (!invoice.due_date) errors.push('Due date is required.');
            else if (invoice.current_date && invoice.due_date < invoice.current_date)
                errors.push('Due date cannot precede the date of issue.');
            break;

        case 'parties':
            errors.push(...validateParty('From', invoice.billing_from));
            errors.push(...validateParty('Bill to', invoice.billing_to));
            break;

        case 'items':
            if (invoice.items.length === 0) errors.push('Add at least one line item.');
            invoice.items.forEach((it, i) => {
                if (!it.name.trim()) errors.push(`Item ${i + 1}: description is required.`);
                if (it.quantity <= 0) errors.push(`Item ${i + 1}: quantity must be at least 1.`);
                if (it.price < 0) errors.push(`Item ${i + 1}: price cannot be negative.`);
            });
            break;

        case 'totals':
            if (invoice.discount < 0 || invoice.discount > 100)
                errors.push('Discount must be between 0 and 100%.');
            if (invoice.tax_rate < 0 || invoice.tax_rate > 100)
                errors.push('Tax rate must be between 0 and 100%.');
            break;
    }

    return errors;
};

let seq = 0;
export const uid = () => `it_${Date.now().toString(36)}_${(seq++).toString(36)}`;
