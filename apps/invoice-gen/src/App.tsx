import { useCallback, useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, Download, Eye, Loader2 } from 'lucide-react';
import type { InvoiceState } from './types';
import { computeTotals, money, uid, validateStep } from './helpers';
import { generateInvoicePdf } from './api';
import { useUnloadGuard } from './useUnloadGuard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FormPane, STEPS } from './components/FormPane';
import { Stepper } from './components/Stepper';
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

const STEP_TITLES = [
    'Invoice details',
    'Who it is from & to',
    'Line items',
    'Totals & notes',
];

export default function App() {
    const [invoice, setInvoiceRaw] = useState<InvoiceState>(initialInvoice);
    const [step, setStep] = useState(0);
    const [busy, setBusy] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [dirty, setDirty] = useState(false);

    useUnloadGuard(dirty);

    const setInvoice = useCallback<React.Dispatch<React.SetStateAction<InvoiceState>>>((action) => {
        setDirty(true);
        setInvoiceRaw(action);
    }, []);

    const totals = useMemo(() => computeTotals(invoice), [invoice]);
    const isLast = step === STEPS.length - 1;

    const goToStep = (index: number) => {
        setErrors([]);
        setStep(index);
    };

    const goNext = () => {
        const problems = validateStep(STEPS[step].key, invoice);
        setErrors(problems);
        if (problems.length === 0) setStep((s) => Math.min(STEPS.length - 1, s + 1));
    };

    const handleGenerate = async () => {
        const firstBad = STEPS.findIndex((s) => validateStep(s.key, invoice).length > 0);
        if (firstBad !== -1) {
            setStep(firstBad);
            setErrors(validateStep(STEPS[firstBad].key, invoice));
            return;
        }
        setErrors([]);

        setBusy(true);
        try {
            await generateInvoicePdf(invoice);
            setDirty(false);
        } catch (e) {
            setErrors([e instanceof Error ? e.message : 'Failed to generate invoice.']);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-paper">
            <Header />

            <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 overflow-hidden px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,520px)_1fr]">
                <div className="flex min-h-0 flex-col">
                    <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-hairline bg-card shadow-card">
                        <div className="border-b border-hairline px-5 py-4">
                            <Stepper
                                steps={STEPS}
                                current={step}
                                onSelect={(i) => (i <= step ? goToStep(i) : goNext())}
                            />
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                            <h2 className="mb-4 font-display text-lg font-semibold text-ink">
                                {STEP_TITLES[step]}
                            </h2>

                            <FormPane invoice={invoice} setInvoice={setInvoice} step={step} />

                            {errors.length > 0 && (
                                <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 p-4">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-danger">
                                        <AlertCircle size={16} /> Please fix the following:
                                    </div>
                                    <ul className="mt-2 list-disc space-y-0.5 pl-7 text-xs text-danger/90">
                                        {errors.map((e, i) => (
                                            <li key={i}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-hairline px-5 py-4">
                            <button
                                type="button"
                                onClick={() => goToStep(Math.max(0, step - 1))}
                                disabled={step === 0}
                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-panel disabled:invisible"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-faint">
                                        Total due
                                    </p>
                                    <p className="font-display text-lg font-bold tabular-nums text-ink">
                                        {money(invoice.currency_symbol, totals.grand)}
                                    </p>
                                </div>

                                {isLast ? (
                                    <button
                                        type="button"
                                        onClick={handleGenerate}
                                        disabled={busy}
                                        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-card transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {busy ? <Loader2 size={16} className="spin" /> : <Download size={16} />}
                                        {busy ? 'Generating…' : 'Download PDF'}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={goNext}
                                        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-card transition-colors hover:bg-accent-hover"
                                    >
                                        Next <ArrowRight size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden min-h-0 lg:flex lg:flex-col">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-faint">
                        <Eye size={14} /> Live preview
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl bg-panel p-4 sm:p-6">
                        <PreviewPane invoice={invoice} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
