import type { InvoiceState } from '../types';
import { computeTotals, formatDate, money } from '../helpers';

const dash = (v: string) => v.trim() || '—';

export const PreviewPane = ({ invoice }: { invoice: InvoiceState }) => {
    const { subtotal, discountAmt, taxAmt, grand } = computeTotals(invoice);
    const sym = invoice.currency_symbol;
    const { billing_from: frm, billing_to: to } = invoice;

    return (
        <div className="mx-auto w-full max-w-[640px] rounded-sm bg-white p-8 text-ink shadow-lift sm:p-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h1 className="font-display text-2xl font-700 leading-tight text-ink">
                        {dash(frm.name)}
                    </h1>
                    <p className="mt-1 text-xs text-muted">
                        {dash(frm.email)} · {dash(frm.phone_number)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[11px] font-700 uppercase tracking-[0.2em] text-bronze">
                        Invoice
                    </p>
                    <p className="font-display text-lg font-600">{dash(invoice.invoice_id)}</p>
                </div>
            </div>

            <div className="mt-4 h-[3px] w-full bg-bronze" />

            {/* Parties + meta */}
            <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-md bg-panel sm:grid-cols-[1fr_1fr_0.7fr]">
                <Party label="From" name={frm.name} lines={frm.address.split('\n').filter(Boolean)} />
                <Party
                    label="Bill to"
                    name={to.name}
                    lines={[to.email, ...to.address.split('\n').filter(Boolean), to.phone_number]}
                />
                <div className="bg-panel p-4">
                    <Meta label="Date of issue" value={formatDate(invoice.current_date)} />
                    <div className="mt-3">
                        <Meta label="Due date" value={formatDate(invoice.due_date)} />
                    </div>
                </div>
            </div>

            {/* Items */}
            <div className="mt-6 overflow-hidden rounded-md">
                <div className="grid grid-cols-[1fr_3rem_5rem_5rem] gap-2 bg-bronze px-3 py-2 text-[10px] font-700 uppercase tracking-wider text-white">
                    <span>Description</span>
                    <span className="text-right">Qty</span>
                    <span className="text-right">Unit</span>
                    <span className="text-right">Amount</span>
                </div>
                {invoice.items.map((it, i) => (
                    <div
                        key={it.id}
                        className={`grid grid-cols-[1fr_3rem_5rem_5rem] items-start gap-2 border-b border-hairline px-3 py-2.5 text-xs ${
                            i % 2 === 1 ? 'bg-panel/60' : 'bg-white'
                        }`}
                    >
                        <span>
                            <span className="block font-medium text-ink">{dash(it.name)}</span>
                            {it.description && (
                                <span className="block text-[11px] text-faint">{it.description}</span>
                            )}
                        </span>
                        <span className="text-right tabular-nums">{it.quantity}</span>
                        <span className="text-right tabular-nums">{money(sym, it.price)}</span>
                        <span className="text-right tabular-nums">
                            {money(sym, it.quantity * it.price)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-4 ml-auto w-full max-w-[280px] space-y-1.5 text-xs">
                <SummaryRow label="Subtotal" value={money(sym, subtotal)} />
                <SummaryRow
                    label={`Discount (${invoice.discount}%)`}
                    value={`− ${money(sym, discountAmt)}`}
                />
                <SummaryRow label={`Tax (${invoice.tax_rate}%)`} value={`+ ${money(sym, taxAmt)}`} />
            </div>

            <div className="mt-3 flex items-center justify-between rounded-md bg-bronze px-4 py-3 text-white">
                <span className="text-xs font-700 uppercase tracking-wider">Total due</span>
                <span className="font-display text-lg font-700 tabular-nums">
                    {money(sym, grand)}
                </span>
            </div>

            {/* Notes */}
            <div className="mt-6 border-t border-hairline pt-3">
                <p className="text-[10px] font-700 uppercase tracking-wider text-faint">Notes</p>
                <p className="mt-1 text-xs text-muted">
                    {invoice.notes.trim() || 'Thank you for your business.'}
                </p>
            </div>
        </div>
    );
};

const Party = ({ label, name, lines }: { label: string; name: string; lines: string[] }) => (
    <div className="bg-panel p-4">
        <p className="text-[10px] font-700 uppercase tracking-wider text-faint">{label}</p>
        <p className="mt-1.5 text-sm font-600 text-ink">{dash(name)}</p>
        {lines.filter(Boolean).map((l, i) => (
            <p key={i} className="text-[11px] leading-relaxed text-muted">
                {l}
            </p>
        ))}
    </div>
);

const Meta = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-[10px] font-700 uppercase tracking-wider text-faint">{label}</p>
        <p className="mt-0.5 text-xs text-ink">{value}</p>
    </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums text-ink">{value}</span>
    </div>
);
