import { useState, useEffect } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import type { FormStep } from '../helpers/types';
import SectionRenderer from './SectionRenderer';

interface StepRendererProps {
    step: FormStep;
    responses: Record<string, unknown>;
    errors: Record<string, string>;
    onChange: (fieldKey: string, value: unknown) => void;
}

export default function StepRenderer({ step, responses, errors, onChange }: StepRendererProps) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

    useEffect(() => {
        const firstIncomplete = step.sections.find((section) => {
            const requiredFields = section.fields.filter((f) => f.required);
            return requiredFields.some((f) => {
                const value = responses[f.key];
                if (value == null || value === '') return true;
                if (Array.isArray(value) && value.length === 0) return true;
                return false;
            });
        });

        if (firstIncomplete) setExpandedSections(new Set([firstIncomplete.key]));
        else if (step.sections.length > 0) setExpandedSections(new Set([step.sections[0].key]));
    }, [step.key]);

    const toggleSection = (sectionKey: string) => {
        setExpandedSections((prev) => {
            const next = new Set(prev);
            if (next.has(sectionKey)) next.delete(sectionKey); else next.add(sectionKey);
            return next;
        });
    };

    const allExpanded = expandedSections.size === step.sections.length;

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{step.title}</h2>
                <div className="flex items-center justify-between">
                    {step.description && <p className="text-sm text-neutral-500 dark:text-neutral-400">{step.description}</p>}
                    {step.sections.length > 1 && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setExpandedSections(allExpanded ? new Set() : new Set(step.sections.map((s) => s.key)))}
                                className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                            >
                                <ChevronsUpDown className="w-3.5 h-3.5" />
                                {allExpanded ? 'Collapse all' : 'Expand all'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {step.sections.map((section) => (
                    <SectionRenderer
                        key={section.key}
                        section={section}
                        responses={responses}
                        errors={errors}
                        onChange={onChange}
                        isExpanded={expandedSections.has(section.key)}
                        onToggle={() => toggleSection(section.key)}
                    />
                ))}
            </div>
        </div>
    );
}
