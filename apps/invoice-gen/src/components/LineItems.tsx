import { Plus, Trash2 } from 'lucide-react';
import type { InvoiceItem } from '../types';
import { money } from '../helpers';
import { Field } from './Field';

interface Props {
    items: InvoiceItem[];
    symbol: string;
    onChange: (id: string, patch: Partial<InvoiceItem>) => void;
    onAdd: () => void;
    onRemove: (id: string) => void;
}

export const LineItems = ({ items, symbol, onChange, onAdd, onRemove }: Props) => (
    <div className="space-y-3">
        {items.map((it, i) => (
            <div
                key={it.id}
                className="rounded-xl border border-hairline bg-panel/60 p-3"
            >
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                        Item {i + 1}
                    </span>
                    <button
                        type="button"
                        onClick={() => onRemove(it.id)}
                        disabled={items.length === 1}
                        title="Remove item"
                        className="grid h-7 w-7 place-items-center rounded-md text-faint transition-colors hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>

                <div className="space-y-2">
                    <Field
                        placeholder="Description (e.g. Website design)"
                        value={it.name}
                        onChange={(e) => onChange(it.id, { name: e.target.value })}
                    />
                    <Field
                        placeholder="Detail (optional)"
                        value={it.description}
                        onChange={(e) => onChange(it.id, { description: e.target.value })}
                    />
                    <div className="flex items-end gap-2">
                        <Field
                            label="Qty"
                            type="number"
                            min={1}
                            className="w-20"
                            value={it.quantity}
                            onChange={(e) =>
                                onChange(it.id, { quantity: Math.max(0, Number(e.target.value)) })
                            }
                        />
                        <Field
                            label="Unit price"
                            type="number"
                            min={0}
                            step="0.01"
                            className="flex-1"
                            value={it.price}
                            onChange={(e) =>
                                onChange(it.id, { price: Math.max(0, Number(e.target.value)) })
                            }
                        />
                        <div className="pb-2 text-right">
                            <span className="block text-[11px] font-semibold uppercase tracking-wider text-faint">
                                Amount
                            </span>
                            <span className="font-mono text-sm font-medium text-ink tabular-nums">
                                {money(symbol, it.quantity * it.price)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ))}

        <button
            type="button"
            onClick={onAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-accent/40 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
        >
            <Plus size={16} /> Add line item
        </button>
    </div>
);
