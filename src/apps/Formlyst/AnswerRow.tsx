import type { FormField } from './helpers/types';

function formatValue(field: FormField, value: unknown): string {
    if (value == null || value === '') return '—';

    switch (field.type) {
        case 'boolean':
            return value ? 'Yes' : 'No';
        case 'multi_select':
            return Array.isArray(value) && value.length > 0 ? value.join(', ') : '—';
        case 'range':
            return `${value} / ${field.max}`;
        default:
            return String(value);
    }
}

interface AnswerRowProps {
    field: FormField;
    value: unknown;
}

export default function AnswerRow({ field, value }: AnswerRowProps) {
    const isEmpty = value == null || value === '' || (Array.isArray(value) && value.length === 0);

    return (
        <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="sm:w-1/3 shrink-0">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-0.5">*</span>}
                </span>
            </div>
            <div className="sm:flex-1">
                <span
                    className={`text-sm ${
                        isEmpty
                            ? 'text-neutral-400 dark:text-neutral-500 italic'
                            : 'text-neutral-900 dark:text-neutral-100'
                    }`}
                >
                    {formatValue(field, value)}
                </span>
            </div>
        </div>
    );
}