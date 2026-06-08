import { useMemo, useState } from 'react';
import { AlertCircle, Download, Eye, Loader2 } from 'lucide-react';
import type { InvoiceState } from './types';
import { computeTotals, money, uid, validateInvoice } from './helpers';
import { generateInvoicePdf } from './api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FormPane } from './components/FormPane';
import { PreviewPane } from './components/PreviewPane';

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const plusDays = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return iso(d);
};

const initialInvoice: InvoiceState = {
    invoice_id: 'INV-0001',
    current_date: iso(today),
    due_date: plusDays(14),
    currency: 'USD',
    currency_symbol: '$',
    billing_from: {
        name: 'Atelier Studio',
        email: 'hello@atelier.studio',
        address: '24 Maker Lane\nBrooklyn, NY 11201',
        phone_number: '+1 (555) 018-2204',
    },
    billing_to: {
        name: 'Northwind Co.',
        email: 'accounts@northwind.co',
        address: '900 Market St\nSan Francisco, CA 94103',
        phone_number: '+1 (555) 442-9981',
    },
    items: [
        { id: uid(), name: 'Brand identity system', description: 'Logo, palette, type scale', quantity: 1, price: 2400 },
        { id: uid(), name: 'Landing page design', description: 'Desktop + mobile', quantity: 2, price: 650 },
    ],
    tax_rate: 8,
    discount: 5,
    notes: 'Payment due within 14 days via bank transfer. Thank you!',
};

export default function App() {
    const [invoice, setInvoice] = useState<InvoiceState>(initialInvoice);
    const [busy, setBusy] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const totals = useMemo(() => computeTotals(invoice), [invoice]);

    const handleGenerate = async () => {
        const problems = validateInvoice(invoice);
        setErrors(problems);
        if (problems.length) return;

        setBusy(true);
        try {
            await generateInvoicePdf(invoice);
        } catch (e) {
            setErrors([e instanceof Error ? e.message : 'Failed to generate invoice.']);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="flex min-h-dvh flex-col bg-paper">
            <Header />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
                {/* Intro */}
                <div className="mb-6 fade-rise">
                    <h1 className="font-display text-2xl font-700 tracking-tight text-ink sm:text-3xl">
                        Build a print-ready invoice
                    </h1>
                    <p className="mt-1 max-w-xl text-sm text-muted">
                        Fill in the details, watch the live preview, and download a polished PDF —
                        rendered server-side, no account needed.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,520px)_1fr]">
                    {/* Form */}
                    <div className="fade-rise">
                        <FormPane invoice={invoice} setInvoice={setInvoice} />

                        {errors.length > 0 && (
                            <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 p-4">
                                <div className="flex items-center gap-2 text-sm font-600 text-danger">
                                    <AlertCircle size={16} /> Please fix the following:
                                </div>
                                <ul className="mt-2 list-disc space-y-0.5 pl-7 text-xs text-danger/90">
                                    {errors.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-card p-4 shadow-sm">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                                    Total due
                                </p>
                                <p className="font-display text-2xl font-700 tabular-nums text-ink">
                                    {money(invoice.currency_symbol, totals.grand)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleGenerate}
                                disabled={busy}
                                className="inline-flex items-center gap-2 rounded-xl bg-bronze px-5 py-3 text-sm font-600 text-card transition-colors hover:bg-bronze-hover disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {busy ? (
                                    <Loader2 size={16} className="spin" />
                                ) : (
                                    <Download size={16} />
                                )}
                                {busy ? 'Generating…' : 'Download PDF'}
                            </button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="hidden lg:block">
                        <div className="sticky top-6">
                            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-faint">
                                <Eye size={14} /> Live preview
                            </div>
                            <div className="rounded-2xl bg-panel p-4 sm:p-6">
                                <PreviewPane invoice={invoice} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
