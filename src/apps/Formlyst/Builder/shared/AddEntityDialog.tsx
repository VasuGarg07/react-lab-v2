import { useState } from 'react';
import { useModal } from '../../../../components/ModalContext';
import { FIELD_TYPE_OPTIONS, ENTITY_COLORS } from '../../helpers/constants';
import type { EntityType, FieldType } from '../../helpers/types';
import TextInput from '../../../../ui/TextInput';
import Select from '../../../../ui/Select';

interface AddEntityDialogProps {
    entityType: Exclude<EntityType, 'form'>;
    onAdd: (title: string, fieldType?: FieldType) => void;
}

const ENTITY_LABELS: Record<Exclude<EntityType, 'form'>, { singular: string; placeholder: string }> = {
    step: { singular: 'Step', placeholder: 'e.g., Personal Information' },
    section: { singular: 'Section', placeholder: 'e.g., Contact Details' },
    field: { singular: 'Field', placeholder: 'e.g., Email Address' },
};

export default function AddEntityDialog({ entityType, onAdd }: AddEntityDialogProps) {
    const { close } = useModal();
    const [title, setTitle] = useState('');
    const [fieldType, setFieldType] = useState<FieldType>('text');

    const labels = ENTITY_LABELS[entityType];
    const colors = ENTITY_COLORS[entityType];
    const isField = entityType === 'field';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (isField) {
            onAdd(title.trim(), fieldType);
        } else {
            onAdd(title.trim());
        }
        close();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Add {labels.singular}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
                Create a new {labels.singular.toLowerCase()} for your form
            </p>

            <div className="space-y-4 mb-6">
                {/* Title Input */}
                <TextInput
                    label={`${labels.singular} ${isField ? 'Label' : 'Title'}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={labels.placeholder}
                    autoFocus
                />

                {/* Field Type Selector (only for fields) */}
                {isField && (
                    <Select
                        label="Field Type"
                        options={FIELD_TYPE_OPTIONS}
                        value={fieldType}
                        onChange={(val) => setFieldType(val as FieldType)}
                    />
                )}
            </div>

            {/* Type Indicator */}
            <div className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${colors.bg}`}>
                <div className={`w-2 h-2 rounded-full ${colors.text} bg-current`} />
                <span className={`text-xs font-medium ${colors.text}`}>
                    {labels.singular}
                </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={close}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Add {labels.singular}
                </button>
            </div>
        </form>
    );
}