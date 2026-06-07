import { useState } from 'react';
import { Check, FilePlus2, Mail, MessageSquareHeart, CalendarCheck, Briefcase } from 'lucide-react';
import { useModal, LoadingButton } from '@react-lab/ui';
import { TEMPLATES, type FormTemplate } from '../helpers/templates';

interface TemplateDialogProps {
    onCreate: (template: FormTemplate) => void;
    isLoading?: boolean;
}

const TEMPLATE_ICONS: Record<string, typeof Mail> = {
    blank: FilePlus2,
    contact: Mail,
    feedback: MessageSquareHeart,
    registration: CalendarCheck,
    application: Briefcase,
};

export default function TemplateDialog({ onCreate, isLoading }: TemplateDialogProps) {
    const { close } = useModal();
    const [selected, setSelected] = useState<string>('blank');

    const handleCreate = () => {
        const template = TEMPLATES.find(t => t.id === selected);
        if (template) { setSelected('blank'); onCreate(template); }
    };

    return (
        <div>
            <h3 className="font-display text-xl font-bold text-ink mb-1">Create New Form</h3>
            <p className="text-sm text-neutral-500 mb-5">Start from a template or a blank canvas.</p>

            <div className="space-y-2 mb-6 max-h-[50vh] overflow-y-auto -mx-1 px-1">
                {TEMPLATES.map((template) => {
                    const isSelected = selected === template.id;
                    const Icon = TEMPLATE_ICONS[template.id] ?? FilePlus2;
                    return (
                        <button
                            key={template.id}
                            onClick={() => setSelected(template.id)}
                            className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-150 ${
                                isSelected
                                    ? 'border-plum bg-plum/5 ring-2 ring-plum/15'
                                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                            }`}
                        >
                            <div className={`grid place-items-center w-10 h-10 rounded-xl shrink-0 transition-colors ${
                                isSelected ? 'bg-plum text-white' : 'bg-neutral-100 text-neutral-500'
                            }`}>
                                <Icon className="w-4.5 h-4.5" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm text-ink">{template.name}</div>
                                <div className="text-xs text-neutral-500 mt-0.5">{template.description}</div>
                            </div>
                            <div className={`grid place-items-center w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                                isSelected ? 'border-plum bg-plum' : 'border-neutral-300'
                            }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="flex gap-3">
                <button type="button" onClick={close} disabled={isLoading} className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors disabled:opacity-50">
                    Cancel
                </button>
                <LoadingButton onClick={handleCreate} isLoading={isLoading} loadingText="Creating..." className="flex-1 rounded-xl! font-semibold!">
                    Create Form
                </LoadingButton>
            </div>
        </div>
    );
}
