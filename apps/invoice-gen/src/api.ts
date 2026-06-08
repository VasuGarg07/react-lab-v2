import type { InvoiceState } from './types';

const API_BASE =
    import.meta.env.VITE_INVOICE_API ?? 'http://localhost:8000';

const toPayload = (invoice: InvoiceState) => ({
    invoice_id: invoice.invoice_id,
    current_date: invoice.current_date,
    due_date: invoice.due_date,
    currency: invoice.currency,
    currency_symbol: invoice.currency_symbol,
    billing_to: invoice.billing_to,
    billing_from: invoice.billing_from,
    items: invoice.items.map((it) => ({
        name: it.name,
        description: it.description,
        quantity: it.quantity,
        price: it.price,
    })),
    tax_rate: invoice.tax_rate,
    discount: invoice.discount,
    notes: invoice.notes,
});

export const generateInvoicePdf = async (invoice: InvoiceState): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/invoice/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toPayload(invoice)),
    });

    if (!res.ok) {
        let detail = `Request failed (${res.status})`;
        try {
            const body = await res.json();
            if (body?.detail) {
                detail = Array.isArray(body.detail)
                    ? body.detail.map((d: { msg?: string }) => d.msg).join(', ')
                    : String(body.detail);
            }
        } catch {
            /* non-JSON error body — keep the status message */
        }
        throw new Error(detail);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.invoice_id || 'draft'}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
};
