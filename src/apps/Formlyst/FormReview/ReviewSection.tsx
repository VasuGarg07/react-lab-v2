import { Pencil } from 'lucide-react';
import type { FormSection } from '../helpers/types';
import AnswerRow from '../AnswerRow';

interface ReviewSectionProps {
    section: FormSection;
    responses: Record<string, unknown>;
    onEdit: () => void;
}

export default function ReviewSection({ section, responses, onEdit }: ReviewSectionProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
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

            <div className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
                {section.fields.map((field) => (
                    <AnswerRow key={field.key} field={field} value={responses[field.key]} />
                ))}
            </div>
        </div>
    );
}