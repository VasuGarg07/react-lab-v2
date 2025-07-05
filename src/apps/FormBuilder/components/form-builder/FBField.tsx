import { cn } from '@/shared/cn';
import { FormInput, FormNumberInput, FormSwitch } from '@/ui/FormComponents';
import { Plus, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { VALIDATION_LIMITS } from '../../helpers/fb.constants';
import { useFormActions, useFormConfig } from '../../helpers/useFormEngine';

interface FBFieldProps {
    stepKey: string;
    sectionKey: string;
    fieldKey: string;
}

const FBField: React.FC<FBFieldProps> = ({
    stepKey,
    sectionKey,
    fieldKey
}) => {
    const formConfig = useFormConfig();
    const { updateField, addOption, removeOption, updateOption } = useFormActions();

    // Find the field data
    const step = formConfig.steps.find(s => s.key === stepKey);
    if (!step) return null;

    const section = step.sections.find(s => s.key === sectionKey);
    if (!section) return null;

    const field = section.fields.find(f => f.key === fieldKey);
    if (!field) return null;

    // Local state for inputs
    const [localLabel, setLocalLabel] = useState(field.label || '');
    const [localKey, setLocalKey] = useState(field.key || '');
    const [newOption, setNewOption] = useState('');

    // Sync local state with store when field data changes
    useEffect(() => {
        setLocalLabel(field.label || '');
        setLocalKey(field.key || '');
    }, [field.label, field.key]);

    const handleLabelChange = useCallback((value: string) => {
        setLocalLabel(value);
    }, []);

    const handleKeyChange = useCallback((value: string) => {
        setLocalKey(value);
    }, []);

    const handleLabelBlur = useCallback(() => {
        const finalLabel = localLabel.trim() || 'Untitled Field';
        updateField(stepKey, sectionKey, fieldKey, { label: finalLabel });
    }, [localLabel, stepKey, sectionKey, fieldKey, updateField]);

    const handleKeyBlur = useCallback(() => {
        const finalKey = localKey.trim();
        if (finalKey && finalKey !== field.key) {
            updateField(stepKey, sectionKey, fieldKey, { key: finalKey });
        }
    }, [localKey, field.key, stepKey, sectionKey, fieldKey, updateField]);

    const handleRequiredChange = useCallback((checked: boolean) => {
        updateField(stepKey, sectionKey, fieldKey, { required: checked });
    }, [stepKey, sectionKey, fieldKey, updateField]);

    const handleValidationChange = useCallback((property: string, value: any) => {
        if (field.type === 'text') {
            updateField(stepKey, sectionKey, fieldKey, {
                validation: { ...field.validation, [property]: value }
            });
        } else if (field.type === 'number') {
            updateField(stepKey, sectionKey, fieldKey, {
                validation: { ...field.validation, [property]: value }
            });
        }
    }, [stepKey, sectionKey, fieldKey, updateField, field]);

    const handleRangeChange = useCallback((property: string, value: number) => {
        updateField(stepKey, sectionKey, fieldKey, { [property]: value });
    }, [stepKey, sectionKey, fieldKey, updateField]);

    const handleAddOption = useCallback(() => {
        if (newOption.trim()) {
            addOption(stepKey, sectionKey, fieldKey, newOption.trim());
            setNewOption('');
        }
    }, [stepKey, sectionKey, fieldKey, addOption, newOption]);

    const handleRemoveOption = useCallback((optionIndex: number) => {
        removeOption(stepKey, sectionKey, fieldKey, optionIndex);
    }, [stepKey, sectionKey, fieldKey, removeOption]);

    const handleUpdateOption = useCallback((optionIndex: number, newValue: string) => {
        updateOption(stepKey, sectionKey, fieldKey, optionIndex, newValue);
    }, [stepKey, sectionKey, fieldKey, updateOption]);


    return (
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Field Settings
                </span>
                {field.required && (
                    <span className="text-xs text-red-600">*</span>
                )}
            </div>

            {/* Field Configuration */}
            <div className="space-y-4">
                {/* Label */}
                <FormInput
                    label="Label"
                    type='text'
                    value={localLabel}
                    onChange={handleLabelChange}
                    onBlur={handleLabelBlur}
                    placeholder="Enter field label"
                />

                {/* Key */}
                <FormInput
                    label="Key"
                    type='text'
                    value={localKey}
                    onChange={handleKeyChange}
                    onBlur={handleKeyBlur}
                    placeholder="field_key"
                />

                {/* Required */}
                <FormSwitch
                    label="Required"
                    checked={field.required}
                    onChange={handleRequiredChange}
                />

                {/* Validations */}
                <div>
                    {/* Text Field Validations */}
                    {field.type === 'text' && (
                        <div className="grid grid-cols-2 gap-3">
                            <FormNumberInput
                                label="Min Length"
                                value={(field as any).validation?.minLength || ''}
                                onChange={(value) => handleValidationChange('minLength', value)}
                                placeholder="0"
                                min={VALIDATION_LIMITS.NUMBER_MIN_VALUE}
                                max={VALIDATION_LIMITS.NUMBER_MAX_VALUE}
                            />
                            <FormNumberInput
                                label="Max Length"
                                value={(field as any).validation?.maxLength || ''}
                                onChange={(value) => handleValidationChange('maxLength', value)}
                                min={VALIDATION_LIMITS.NUMBER_MIN_VALUE}
                                max={VALIDATION_LIMITS.NUMBER_MAX_VALUE}
                            />
                        </div>
                    )}

                    {/* Number Field Validations */}
                    {field.type === 'number' && (
                        <div className="grid grid-cols-2 gap-3">
                            <FormNumberInput
                                label="Min Value"
                                value={(field as any).validation?.minValue || ''}
                                onChange={(value) => handleValidationChange('minValue', value)}
                                placeholder="0"
                            />
                            <FormNumberInput
                                label="Max Value"
                                value={(field as any).validation?.maxValue || ''}
                                onChange={(value) => handleValidationChange('maxValue', value)}
                                placeholder="100"
                            />
                        </div>
                    )}

                    {/* Range Field Settings */}
                    {field.type === 'range' && (
                        <div className="grid grid-cols-2 gap-3">
                            <FormNumberInput
                                label="Min Value"
                                value={(field as any).min || 1}
                                onChange={(value) => handleRangeChange('min', value)}
                                min={1}
                                max={100}
                            />
                            <FormNumberInput
                                label="Max Value"
                                value={(field as any).max || 100}
                                onChange={(value) => handleRangeChange('max', value)}
                                min={1}
                                max={100}
                            />
                        </div>
                    )}

                    {/* Select/Multi-Select Options */}
                    {(field.type === 'select' || field.type === 'multi_select') && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Options
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {field.options?.length || 0} options
                                </span>
                            </div>

                            {/* Options List */}
                            {field.options && field.options.length > 0 && (
                                <div className="space-y-2">
                                    {field.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-zinc-700 rounded-lg border border-gray-200 dark:border-zinc-600"
                                        >
                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono min-w-[20px]">
                                                {index + 1}.
                                            </span>
                                            <FormInput
                                                label=""
                                                type='text'
                                                value={option}
                                                onChange={(value) => handleUpdateOption(index, value)}
                                                placeholder="Option text"
                                                className="flex-1"
                                                inputClassName="bg-white dark:bg-zinc-800 text-sm"
                                            />
                                            <button
                                                onClick={() => handleRemoveOption(index)}
                                                className={cn(
                                                    "p-1.5 rounded-md",
                                                    "text-red-600 dark:text-red-400",
                                                    "hover:bg-red-50 dark:hover:bg-red-950/20",
                                                    "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                                )}
                                                title="Remove option"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add New Option */}
                            <div className="flex items-end gap-2">
                                <FormInput
                                    label="Add new option"
                                    type='text'
                                    value={newOption}
                                    onChange={setNewOption}
                                    placeholder="Enter option text"
                                    className="flex-1"
                                />
                                <button
                                    onClick={handleAddOption}
                                    disabled={!newOption.trim()}
                                    className={cn(
                                        "p-2 rounded-lg",
                                        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
                                        "text-white",
                                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600",
                                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                    )}
                                    title="Add option"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            {/* Empty State */}
                            {(!field.options || field.options.length === 0) && (
                                <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                                    No options added yet. Add your first option above.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FBField;