import type { BillingInfo, InvoiceItem, InvoiceState } from '../types';
import { CURRENCIES } from '../types';
import { uid } from '../helpers';
import { Field, TextArea } from './Field';
import { LineItems } from './LineItems';

interface Props {
    invoice: InvoiceState;
    setInvoice: React.Dispatch<React.SetStateAction<InvoiceState>>;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="rounded-2xl border border-hairline bg-card p-5 shadow-sm">
        <h2 className="mb-4 font-display text-base font-600 text-ink">{title}</h2>
        {children}
    </section>
);

const PartyFields = ({
    party,
    onChange,
}: {
    party: BillingInfo;
    onChange: (patch: Partial<BillingInfo>) => void;
}) => (
    <div className="space-y-2.5">
        <Field
            placeholder="Name / company"
            value={party.name}
            onChange={(e) => onChange({ name: e.target.value })}
        />
        <Field
            type="email"
            placeholder="Email"
            value={party.email}
            onChange={(e) => onChange({ email: e.target.value })}
        />
        <TextArea
            rows={2}
            placeholder="Address"
            value={party.address}
            onChange={(e) => onChange({ address: e.target.value })}
        />
        <Field
            placeholder="Phone number"
            value={party.phone_number}
            onChange={(e) => onChange({ phone_number: e.target.value })}
        />
    </div>
);

export const FormPane = ({ invoice, setInvoice }: Props) => {
    const set = (patch: Partial<InvoiceState>) =>
        setInvoice((prev) => ({ ...prev, ...patch }));

    const setParty = (key: 'billing_from' | 'billing_to') => (patch: Partial<BillingInfo>) =>
        setInvoice((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

    const setItem = (id: string, patch: Partial<InvoiceItem>) =>
        setInvoice((prev) => ({
            ...prev,
            items: prev.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
        }));

    const addItem = () =>
        setInvoice((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    id: uid(),
                    name: '',
                    description: '',
                    quantity: 1,
                    price: 0,
                },
            ],
        }));

    const removeItem = (id: string) =>
        setInvoice((prev) => ({
            ...prev,
            items: prev.items.filter((it) => it.id !== id),
        }));

    return (
        <div className="space-y-5">
            <Section title="Invoice details">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field
                        label="Invoice number"
                        placeholder="INV-0001"
                        value={invoice.invoice_id}
                        onChange={(e) => set({ invoice_id: e.target.value })}
                    />
                    <label className="block">
                        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-faint">
                            Currency
                        </span>
                        <select
                            value={invoice.currency}
                            onChange={(e) => {
                                const c = CURRENCIES.find((x) => x.code === e.target.value)!;
                                set({ currency: c.code, currency_symbol: c.symbol });
                            }}
                            className="w-full rounded-lg border border-hairline bg-card px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-bronze focus:ring-2 focus:ring-bronze/20"
                        >
                            {CURRENCIES.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.symbol} · {c.code} — {c.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Field
                        label="Date of issue"
                        type="date"
                        value={invoice.current_date}
                        onChange={(e) => set({ current_date: e.target.value })}
                    />
                    <Field
                        label="Due date"
                        type="date"
                        value={invoice.due_date}
                        onChange={(e) => set({ due_date: e.target.value })}
                    />
                </div>
            </Section>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Section title="From">
                    <PartyFields party={invoice.billing_from} onChange={setParty('billing_from')} />
                </Section>
                <Section title="Bill to">
                    <PartyFields party={invoice.billing_to} onChange={setParty('billing_to')} />
                </Section>
            </div>

            <Section title="Line items">
                <LineItems
                    items={invoice.items}
                    symbol={invoice.currency_symbol}
                    onChange={setItem}
                    onAdd={addItem}
                    onRemove={removeItem}
                />
            </Section>

            <Section title="Totals & notes">
                <div className="grid grid-cols-2 gap-3">
                    <Field
                        label="Discount (%)"
                        type="number"
                        min={0}
                        max={100}
                        step="0.01"
                        value={invoice.discount}
                        onChange={(e) =>
                            set({ discount: Math.min(100, Math.max(0, Number(e.target.value))) })
                        }
                    />
                    <Field
                        label="Tax rate (%)"
                        type="number"
                        min={0}
                        max={100}
                        step="0.01"
                        value={invoice.tax_rate}
                        onChange={(e) =>
                            set({ tax_rate: Math.min(100, Math.max(0, Number(e.target.value))) })
                        }
                    />
                </div>
                <div className="mt-3">
                    <TextArea
                        label="Notes"
                        rows={3}
                        placeholder="Payment terms, thank-you note…"
                        value={invoice.notes}
                        onChange={(e) => set({ notes: e.target.value })}
                    />
                </div>
            </Section>
        </div>
    );
};
