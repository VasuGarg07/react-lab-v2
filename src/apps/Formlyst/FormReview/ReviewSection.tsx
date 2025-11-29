import { Pencil } from 'lucide-react';
import type { FormSection, FormField } from '../helpers/types';

interface ReviewSectionProps {
    section: FormSection;
    responses: Record<string, unknown>;
    onEdit: () => void;
}

export default function ReviewSection({ section, responses, onEdit }: ReviewSectionProps) {
    // Format field value for display
    const formatValue = (field: FormField, value: unknown): string => {
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
    };

    return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {section.title}
                </h3>
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                    <Pencil className="w-3 h-3" />
                    Edit
                </button>
            </div>

            {/* Fields */}
            <div className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
                {section.fields.map((field) => {
                    const value = responses[field.key];
                    const isEmpty = value == null || value === '' || (Array.isArray(value) && value.length === 0);

                    return (
                        <div
                            key={field.key}
                            className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
                        >
                            <div className="sm:w-1/3 shrink-0">
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {field.label}
                                    {field.required && <span className="text-red-500 ml-0.5">*</span>}
                                </span>
                            </div>
                            <div className="sm:flex-1">
                                <span
                                    className={`text-sm ${isEmpty
                                            ? 'text-neutral-400 dark:text-neutral-500 italic'
                                            : 'text-neutral-900 dark:text-neutral-100'
                                        }`}
                                >
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