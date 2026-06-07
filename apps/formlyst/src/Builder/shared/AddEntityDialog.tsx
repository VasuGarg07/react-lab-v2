import { useState } from 'react';
import { Layers, Grid3X3, ToggleLeft } from 'lucide-react';
import { useModal, TextInput, Select } from '@react-lab/ui';
import { FIELD_TYPE_OPTIONS, ENTITY_COLORS } from '../../helpers/constants';
import type { EntityType, FieldType } from '../../helpers/types';

interface AddEntityDialogProps {
    entityType: Exclude<EntityType, 'form'>;
    onAdd: (title: string, fieldType?: FieldType) => void;
}

const ENTITY_LABELS: Record<Exclude<EntityType, 'form'>, { singular: string; placeholder: string; icon: typeof Layers }> = {
    step: { singular: 'Step', placeholder: 'e.g., Personal Information', icon: Layers },
    section: { singular: 'Section', placeholder: 'e.g., Contact Details', icon: Grid3X3 },
    field: { singular: 'Field', placeholder: 'e.g., Email Address', icon: ToggleLeft },
};

export default function AddEntityDialog({ entityType, onAdd }: AddEntityDialogProps) {
    const { close } = useModal();
    const [title, setTitle] = useState('');
    const [fieldType, setFieldType] = useState<FieldType>('text');

    const labels = ENTITY_LABELS[entityType];
    const colors = ENTITY_COLORS[entityType];
    const Icon = labels.icon;
    const isField = entityType === 'field';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        if (isField) onAdd(title.trim(), fieldType); else onAdd(title.trim());
        close();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-5">
                <div className={`grid place-items-center w-10 h-10 rounded-xl ${colors.bg} ${colors.text} shrink-0`}>
                    <Icon className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div>
                    <h3 className="font-display text-lg font-bold text-ink leading-tight">Add {labels.singular}</h3>
                    <p className="text-sm text-neutral-500">Create a new {labels.singular.toLowerCase()} for your form.</p>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <TextInput
                    label={`${labels.singular} ${isField ? 'Label' : 'Title'}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={labels.placeholder}
                    autoFocus
                />
                {isField && (
                    <Select
                        label="Field Type"
                        options={FIELD_TYPE_OPTIONS}
                        value={fieldType}
                        onChange={(val) => setFieldType(val as FieldType)}
                    />
                )}
            </div>

            <div className="flex gap-3">
                <button type="button" onClick={close} className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                    Cancel
                </button>
                <button type="submit" disabled={!title.trim()} className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl bg-plum hover:bg-plum-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Add {labels.singular}
                </button>
            </div>
        </form>
    );
}
