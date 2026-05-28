import { useState } from 'react';
import { Check } from 'lucide-react';
import { useModal, LoadingButton } from '@react-lab/ui';
import { TEMPLATES, type FormTemplate } from '../helpers/templates';

interface TemplateDialogProps {
    onCreate: (template: FormTemplate) => void;
    isLoading?: boolean;
}

export default function TemplateDialog({ onCreate, isLoading }: TemplateDialogProps) {
    const { close } = useModal();
    const [selected, setSelected] = useState<string>('blank');

    const handleCreate = () => {
        const template = TEMPLATES.find(t => t.id === selected);
        if (template) {
            setSelected('blank');
            onCreate(template);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Create New Form
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
                Start with a template or build from scratch
            </p>

            {/* Templates */}
            <div className="space-y-2 mb-5">
                {TEMPLATES.map((template) => {
                    const isSelected = selected === template.id;

                    return (
                        <button
                            key={template.id}
                            onClick={() => setSelected(template.id)}
                            className={`
                w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors duration-200
                ${isSelected
                                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
                                    : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                }
              `}
                        >
                            <div
                                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${isSelected
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-neutral-300 dark:border-neutral-600'
                                    }
                `}
                            >
                                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                                    {template.name}
                                </div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {template.description}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={close}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <LoadingButton
                    onClick={handleCreate}
                    isLoading={isLoading}
                    loadingText="Creating..."
                    className="flex-1"
                >
                    Create
                </LoadingButton>
            </div>
        </div>
    );
}