import type { InvoiceState } from '../types';
import { computeTotals, formatDate, money } from '../helpers';

const C = {
    accent: '#185FA5',
    ink: '#1A1F29',
    muted: '#6B7280',
    faint: '#9AA1AC',
    hairline: '#E6E8EC',
    panel: '#F7F8FA',
    white: '#FFFFFF',
};

const dash = (v: string) => v.trim() || '—';

export const PreviewPane = ({ invoice }: { invoice: InvoiceState }) => {
    const { subtotal, discountAmt, taxAmt, grand } = computeTotals(invoice);
    const sym = invoice.currency_symbol;
    const { billing_from: frm, billing_to: to } = invoice;

    const fromLines = frm.address.split('\n').filter(Boolean);
    const toLines = [to.email, ...to.address.split('\n').filter(Boolean), to.phone_number];

    return (
        <div
            className="mx-auto w-full max-w-160 bg-white px-8 py-9 shadow-lift sm:px-10"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: C.ink }}
        >
            <div className="flex items-start justify-between gap-6">
                <div>
                    <div className="text-[19px] font-bold leading-tight" style={{ color: C.ink }}>
                        {dash(frm.name)}
                    </div>
                    <div className="mt-1 text-[9px]" style={{ color: C.muted }}>
                        {dash(frm.email)} · {dash(frm.phone_number)}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-bold tracking-wide" style={{ color: C.accent }}>
                        INVOICE
                    </div>
                    <div className="text-[17px] font-bold leading-tight" style={{ color: C.ink }}>
                        {dash(invoice.invoice_id)}
                    </div>
                </div>
            </div>

            <div className="mt-3 h-0.75 w-full" style={{ backgroundColor: C.accent }} />
            <div
                className="mt-5 grid grid-cols-[1.45fr_1.45fr_0.9fr] rounded-md"
                style={{ backgroundColor: C.panel }}
            >
                <Party label="FROM" name={frm.name} lines={fromLines} pad="pl-3.5 pr-2.5 py-3.5" />
                <Party label="BILL TO" name={to.name} lines={toLines} pad="px-2.5 py-3.5" />
                <div className="pr-3.5 pl-2.5 py-3.5">
                    <Meta label="DATE OF ISSUE" value={formatDate(invoice.current_date)} />
                    <div className="mt-2">
                        <Meta label="DUE DATE" value={formatDate(invoice.due_date)} />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div
                    className="grid grid-cols-[1fr_2.5rem_4.5rem_4.5rem] gap-2 rounded-t-xs px-3 py-2 text-[9px] font-bold tracking-wide"
                    style={{ backgroundColor: C.accent, color: C.white }}
                >
                    <span>DESCRIPTION</span>
                    <span className="text-right">QTY</span>
                    <span className="text-right">UNIT PRICE</span>
                    <span className="text-right">AMOUNT</span>
                </div>
                {invoice.items.map((it, i) => (
                    <div
                        key={it.id}
                        className="grid grid-cols-[1fr_2.5rem_4.5rem_4.5rem] items-start gap-2 px-3 py-2.5 text-[10px]"
                        style={{
                            backgroundColor: i % 2 === 1 ? C.panel : C.white,
                            borderBottom: `0.5px solid ${C.hairline}`,
                        }}
                    >
                        <span>
                            <span className="block" style={{ color: C.ink }}>
                                {dash(it.name)}
                            </span>
                            {it.description && (
                                <span className="block text-[8.5px]" style={{ color: C.faint }}>
                                    {it.description}
                                </span>
                            )}
                        </span>
                        <span className="text-right tabular-nums" style={{ color: C.ink }}>
                            {it.quantity}
                        </span>
                        <span className="text-right tabular-nums" style={{ color: C.ink }}>
                            {money(sym, it.price)}
                        </span>
                        <span className="text-right tabular-nums" style={{ color: C.ink }}>
                            {money(sym, it.quantity * it.price)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-2 ml-auto w-full max-w-65 space-y-1 pr-3 text-[10px]">
                <SummaryRow label="Subtotal" value={money(sym, subtotal)} />
                <SummaryRow
                    label={`Discount (${invoice.discount}%)`}
                    value={`− ${money(sym, discountAmt)}`}
                />
                <SummaryRow label={`Tax (${invoice.tax_rate}%)`} value={`+ ${money(sym, taxAmt)}`} />
            </div>

            <div
                className="mt-2 flex items-center justify-end gap-8 rounded-md px-4 py-2.5"
                style={{ backgroundColor: C.accent, color: C.white }}
            >
                <span className="text-[11px] font-bold tracking-wide">TOTAL DUE</span>
                <span className="text-[13px] font-bold tabular-nums">{money(sym, grand)}</span>
            </div>

            <div className="mt-6 pt-3" style={{ borderTop: `0.5px solid ${C.hairline}` }}>
                <div className="text-[8.5px] font-bold tracking-wide" style={{ color: C.faint }}>
                    NOTES
                </div>
                <div className="mt-1 text-[9px]" style={{ color: C.muted }}>
                    {invoice.notes.trim() || 'Thank you for your business.'}
                </div>
            </div>
        </div>
    );
};

const Party = ({
    label,
    name,
    lines,
    pad,
}: {
    label: string;
    name: string;
    lines: string[];
    pad: string;
}) => (
    <div className={pad}>
        <div className="text-[8.5px] font-bold tracking-wide" style={{ color: C.faint }}>
            {label}
        </div>
        <div className="mt-1.5 text-[11px] font-bold" style={{ color: C.ink }}>
            {dash(name)}
        </div>
        {lines.filter(Boolean).map((l, i) => (
            <div key={i} className="text-[9px] leading-snug" style={{ color: C.muted }}>
                {l}
            </div>
        ))}
    </div>
);

const Meta = ({ label, value }: { label: string; value: string }) => (
    <div>
        <div className="text-[8.5px] font-bold tracking-wide" style={{ color: C.faint }}>
            {label}
        </div>
        <div className="mt-0.5 text-[9.5px]" style={{ color: C.ink }}>
            {value}
        </div>
    </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span style={{ color: C.muted }}>{label}</span>
        <span className="tabular-nums" style={{ color: C.ink }}>
            {value}
        </span>
    </div>
);
