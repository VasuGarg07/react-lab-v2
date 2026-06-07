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
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-neutral-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`min-w-9 h-7 px-1.5 rounded-lg flex items-center justify-center text-xs font-bold tabular-nums ${isComplete ? 'bg-success-50 text-success' : hasAnswers ? 'bg-plum/10 text-plum' : 'bg-neutral-100 text-neutral-500'}`}>
                        {isComplete ? <Check className="w-4 h-4" strokeWidth={3} /> : <span>{answeredFields}/{totalFields}</span>}
                    </div>
                    <span className="text-sm font-semibold text-ink">{section.title}</span>
                </div>
                {isExpanded ? <ChevronDown className="w-5 h-5 text-neutral-400" /> : <ChevronRight className="w-5 h-5 text-neutral-400" />}
            </button>

            {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
                    {section.description && <p className="text-sm text-neutral-500 mb-4">{section.description}</p>}
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
