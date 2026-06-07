import { Pencil } from 'lucide-react';
import type { FormSection, FormField } from '../helpers/types';

interface ReviewSectionProps {
    section: FormSection;
    responses: Record<string, unknown>;
    onEdit: () => void;
}

export default function ReviewSection({ section, responses, onEdit }: ReviewSectionProps) {
    const formatValue = (field: FormField, value: unknown): string => {
        if (value == null || value === '') return '—';
        switch (field.type) {
            case 'boolean': return value ? 'Yes' : 'No';
            case 'multi_select': return Array.isArray(value) && value.length > 0 ? value.join(', ') : '—';
            case 'range': return`${value} / ${field.max}`;
            default: return String(value);
        }
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card">
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                <h3 className="text-sm font-bold text-ink">{section.title}</h3>
                <button type="button" onClick={onEdit} className="flex items-center gap-1.5 text-xs font-bold text-plum hover:text-plum-600 transition-colors">
                    <Pencil className="w-3 h-3" />Edit
                </button>
            </div>

            <div className="divide-y divide-neutral-100">
                {section.fields.map((field) => {
                    const value = responses[field.key];
                    const isEmpty = value == null || value === '' || (Array.isArray(value) && value.length === 0);
                    return (
                        <div key={field.key} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <div className="sm:w-1/3 shrink-0">
                                <span className="text-sm text-neutral-500">
                                    {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                                </span>
                            </div>
                            <div className="sm:flex-1">
                                <span className={`text-sm ${isEmpty ? 'text-neutral-400 italic' : 'text-neutral-900 '}`}>
                                    {formatValue(field, value)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
