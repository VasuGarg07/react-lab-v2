import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import type { FormSection } from '../helpers/types';
import FieldRenderer from './FieldRenderer';

interface SectionRendererProps {
    section: FormSection;
    responses: Record<string, unknown>;
    errors: Record<string, string>;
    onChange: (fieldKey: string, value: unknown) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

export default function SectionRenderer({ section, responses, errors, onChange, isExpanded, onToggle }: SectionRendererProps) {
    const totalFields = section.fields.length;
    const answeredFields = section.fields.filter((field) => {
        const value = responses[field.key];
        if (value == null || value === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
    }).length;

    const isComplete = answeredFields === totalFields;
    const hasAnswers = answeredFields > 0;

    return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-6 rounded-lg flex items-center justify-center text-xs font-medium ${isComplete ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : hasAnswers ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>
                        {isComplete ? <Check className="w-4 h-4" strokeWidth={3} /> : <span>{answeredFields}/{totalFields}</span>}
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{section.title}</span>
                </div>
                {isExpanded ? <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500" /> : <ChevronRight className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />}
            </button>

            {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-neutral-100 dark:border-neutral-700/50">
                    {section.description && <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{section.description}</p>}
                    <div className="space-y-5">
                        {section.fields.map((field) => (
                            <FieldRenderer key={field.key} field={field} value={responses[field.key]} onChange={(value) => onChange(field.key, value)} error={errors[field.key]} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
