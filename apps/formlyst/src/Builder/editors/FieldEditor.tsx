import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/useRedux';
import { updateField } from '../../store/formBuilderSlice';
import { ENTITY_COLORS, FIELD_TYPE_OPTIONS, LIMITS } from '../../helpers/constants';
import type { FormField, FieldType } from '../../helpers/types';
import { TextInput, Select, Switch, NumberInput } from '@react-lab/ui';

interface FieldEditorProps { stepKey: string; sectionKey: string; fieldKey: string; }

export default function FieldEditor({ stepKey, sectionKey, fieldKey }: FieldEditorProps) {
    const dispatch = useAppDispatch();
    const { formConfig } = useAppSelector((state) => state.formBuilder);
    const step = formConfig.steps.find((s) => s.key === stepKey);
    const section = step?.sections.find((s) => s.key === sectionKey);
    const field = section?.fields.find((f) => f.key === fieldKey);

    const [localLabel, setLocalLabel] = useState(field?.label || '');
    const [localRequired, setLocalRequired] = useState(field?.required || false);

    useEffect(() => {
        if (field) { setLocalLabel(field.label); setLocalRequired(field.required); }
    }, [field?.key]);

    if (!step || !section || !field) return <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">Field not found</div>;

    const handleUpdate = (updates: Partial<FormField>) => dispatch(updateField({ stepKey, sectionKey, fieldKey, updates }));

    const handleLabelBlur = () => {
        if (localLabel.trim() !== field.label) handleUpdate({ label: localLabel.trim() || 'Untitled Field' });
    };
    const handleRequiredChange = (checked: boolean) => { setLocalRequired(checked); handleUpdate({ required: checked }); };

    const handleTypeChange = (newType: FieldType) => {
        const baseUpdate: Partial<FormField> = { type: newType };
        if (newType === 'select' || newType === 'multi_select') (baseUpdate as any).options = [];
        if (newType === 'range') { (baseUpdate as any).min = LIMITS.RANGE_MIN; (baseUpdate as any).max = LIMITS.RANGE_MAX; }
        if (newType === 'text') (baseUpdate as any).validation = {};
        if (newType === 'number') (baseUpdate as any).validation = {};
        handleUpdate(baseUpdate);
    };

    const colors = ENTITY_COLORS.field;

    return (
        <div className="space-y-6">
            <div className={`flex items-center gap-3 p-4 rounded-lg ${colors.bg}`}>
                <div className={`w-2 h-2 rounded-full bg-current ${colors.text}`} />
                <span className={`text-sm font-medium ${colors.text}`}>Field Settings</span>
            </div>

            <div className="space-y-4">
                <TextInput label="Field Label" value={localLabel} onChange={(e) => setLocalLabel(e.target.value)} onBlur={handleLabelBlur} placeholder="Enter field label" />
                <Select label="Field Type" options={FIELD_TYPE_OPTIONS} value={field.type} onChange={(val) => handleTypeChange(val as FieldType)} />
                <Switch label="Required field" checked={localRequired} onChange={handleRequiredChange} />
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">Type Settings</h3>

                {field.type === 'text' && <TextFieldSettings field={field} onUpdate={handleUpdate} />}
                {field.type === 'number' && <NumberFieldSettings field={field} onUpdate={handleUpdate} />}
                {field.type === 'select' && <SelectFieldSettings field={field} onUpdate={handleUpdate} maxOptions={LIMITS.MAX_SELECT_OPTIONS} />}
                {field.type === 'multi_select' && <SelectFieldSettings field={field} onUpdate={handleUpdate} maxOptions={LIMITS.MAX_MULTI_SELECT_OPTIONS} />}
                {field.type === 'range' && <RangeFieldSettings field={field} onUpdate={handleUpdate} />}
                {field.type === 'boolean' && <p className="text-sm text-neutral-500 dark:text-neutral-400">No additional settings for Yes/No fields.</p>}
            </div>
        </div>
    );
}

function TextFieldSettings({ field, onUpdate }: { field: FormField & { type: 'text' }; onUpdate: (u: Partial<FormField>) => void }) {
    const validation = field.validation || {};
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <NumberInput label="Min Length" value={validation.minLength ?? ''} onChange={(val) => onUpdate({ validation: { ...validation, minLength: val === '' ? undefined : val } } as any)} min={1} max={LIMITS.TEXT_MAX_LENGTH} placeholder="No min" />
                <NumberInput label="Max Length" value={validation.maxLength ?? ''} onChange={(val) => onUpdate({ validation: { ...validation, maxLength: val === '' ? undefined : val } } as any)} min={1} max={LIMITS.TEXT_MAX_LENGTH} placeholder="No max" />
            </div>
            <TextInput label="Regex Pattern (Advanced)" value={validation.regex || ''} onChange={(e) => onUpdate({ validation: { ...validation, regex: e.target.value || undefined } } as any)} placeholder="e.g., ^[a-zA-Z]+$" />
        </div>
    );
}

function NumberFieldSettings({ field, onUpdate }: { field: FormField & { type: 'number' }; onUpdate: (u: Partial<FormField>) => void }) {
    const validation = field.validation || {};
    return (
        <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Min Value" value={validation.minValue ?? ''} onChange={(val) => onUpdate({ validation: { ...validation, minValue: val === '' ? undefined : val } } as any)} min={LIMITS.NUMBER_MIN} max={LIMITS.NUMBER_MAX} placeholder="No min" />
            <NumberInput label="Max Value" value={validation.maxValue ?? ''} onChange={(val) => onUpdate({ validation: { ...validation, maxValue: val === '' ? undefined : val } } as any)} min={LIMITS.NUMBER_MIN} max={LIMITS.NUMBER_MAX} placeholder="No max" />
        </div>
    );
}

function SelectFieldSettings({ field, onUpdate, maxOptions }: { field: FormField & { type: 'select' | 'multi_select' }; onUpdate: (u: Partial<FormField>) => void; maxOptions: number }) {
    const [newOption, setNewOption] = useState('');
    const options = field.options || [];

    const handleAddOption = () => {
        if (newOption.trim() && options.length < maxOptions) { onUpdate({ options: [...options, newOption.trim()] } as any); setNewOption(''); }
    };
    const handleRemoveOption = (index: number) => onUpdate({ options: options.filter((_, i) => i !== index) } as any);
    const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); handleAddOption(); } };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Options ({options.length}/{maxOptions})</label>
                {options.length > 0 && (
                    <div className="space-y-2 mb-3">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                                <span className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">{option}</span>
                                <button onClick={() => handleRemoveOption(index)} className="p-1 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                )}
                {options.length < maxOptions && (
                    <div className="flex items-center gap-2">
                        <input type="text" value={newOption} onChange={(e) => setNewOption(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type option and press Enter" className="flex-1 px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                        <button onClick={handleAddOption} disabled={!newOption.trim()} className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                )}
            </div>
        </div>
    );
}

function RangeFieldSettings({ field, onUpdate }: { field: FormField & { type: 'range' }; onUpdate: (u: Partial<FormField>) => void }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Min Value" value={field.min} onChange={(val) => onUpdate({ min: val === '' ? LIMITS.RANGE_MIN : val } as any)} min={LIMITS.RANGE_MIN} max={LIMITS.RANGE_MAX} />
            <NumberInput label="Max Value" value={field.max} onChange={(val) => onUpdate({ max: val === '' ? LIMITS.RANGE_MAX : val } as any)} min={LIMITS.RANGE_MIN} max={LIMITS.RANGE_MAX} />
        </div>
    );
}
