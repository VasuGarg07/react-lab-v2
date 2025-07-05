import React, { useState, useCallback, useEffect } from 'react';
import { useFormConfig, useFormActions, useNavigation } from '../../helpers/useFormEngine';
import { FormFieldset, FormInput, FormTextarea } from '@/ui/FormComponents';
import { FieldType } from '../../helpers/fb.types';
import FBAddButton from './FBAddButton';
import { FORM_LIMITS } from '../../helpers/fb.constants';
import FBEntityCard from './FBEntityCard';

interface FBSectionProps {
    stepKey: string;
    sectionKey: string;
    sectionIndex: number;
}

const FBSection: React.FC<FBSectionProps> = ({
    stepKey,
    sectionKey,
    sectionIndex
}) => {
    const formConfig = useFormConfig();
    const { updateSection, addField, removeField } = useFormActions();
    const { navigateToField } = useNavigation();

    // Find the section data
    const step = formConfig.steps.find(s => s.key === stepKey);
    if (!step) return null;

    const section = step?.sections.find(s => s.key === sectionKey);
    if (!section) return null;

    // Local state for inputs
    const [localTitle, setLocalTitle] = useState(section.title || '');
    const [localDescription, setLocalDescription] = useState(section.description || '');
    const [localKey, setLocalKey] = useState(section.key || '');

    // Sync local state with store when section data changes
    useEffect(() => {
        setLocalTitle(section.title || '');
        setLocalDescription(section.description || '');
        setLocalKey(section.key || '');
    }, [section.title, section.description, section.key]);

    const handleTitleChange = useCallback((value: string) => {
        setLocalTitle(value);
    }, []);

    const handleDescriptionChange = useCallback((value: string) => {
        setLocalDescription(value);
    }, []);

    const handleKeyChange = useCallback((value: string) => {
        setLocalKey(value);
    }, []);

    const handleTitleBlur = useCallback(() => {
        const finalTitle = localTitle.trim() || `Section ${sectionIndex + 1}`;
        updateSection(stepKey, sectionKey, { title: finalTitle });
    }, [localTitle, sectionIndex, stepKey, sectionKey, updateSection]);

    const handleDescriptionBlur = useCallback(() => {
        updateSection(stepKey, sectionKey, { description: localDescription.trim() });
    }, [localDescription, stepKey, sectionKey, updateSection]);

    const handleKeyBlur = useCallback(() => {
        const finalKey = localKey.trim();
        if (finalKey && finalKey !== section.key) {
            updateSection(stepKey, sectionKey, { key: finalKey });
        }
    }, [localKey, section.key, stepKey, sectionKey, updateSection]);

    const handleAddField = useCallback((title: string, fieldType?: FieldType) => {
        addField(stepKey, sectionKey, fieldType || 'text', title);
    }, [stepKey, sectionKey, addField]);

    const handleFieldClick = useCallback((fieldKey: string) => {
        navigateToField(stepKey, sectionKey, fieldKey);
    }, [stepKey, sectionKey, navigateToField]);

    const handleRemoveField = useCallback((fieldKey: string) => {
        removeField(stepKey, sectionKey, fieldKey);
    }, [stepKey, sectionKey, removeField]);

    // Field type display helper
    const getFieldTypeDisplay = (fieldType: string) => {
        const typeMap: Record<string, string> = {
            text: 'Text',
            number: 'Number',
            select: 'Select',
            multi_select: 'Multi-Select',
            boolean: 'Yes/No',
            range: 'Range'
        };
        return typeMap[fieldType] || fieldType;
    };

    return (
        <div className='w-full bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6'>
            {/* Section Settings */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Section Settings
                </h3>
                <FormFieldset legend="Section Settings">
                    <div className="space-y-4">
                        <FormInput
                            label="Section Title"
                            type='text'
                            value={localTitle}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            placeholder="Enter section title"
                            inputClassName="font-medium"
                        />

                        <FormTextarea
                            label="Section Description"
                            value={localDescription}
                            onChange={handleDescriptionChange}
                            onBlur={handleDescriptionBlur}
                            placeholder="Enter section description (optional)"
                            rows={2}
                        />

                        <FormInput
                            label="Section Key"
                            type='text'
                            value={localKey}
                            onChange={handleKeyChange}
                            onBlur={handleKeyBlur}
                            placeholder="section_key"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
                            Used for JSON responses and API integration
                        </p>
                    </div>
                </FormFieldset>
            </div>

            {/* Fields */}
            <div className="border-t border-gray-200 dark:border-zinc-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Fields
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {section.fields.length} of {FORM_LIMITS.MAX_FIELDS_PER_SECTION}
                    </span>
                </div>

                {/* Fields List */}
                <div className="space-y-3">
                    {section.fields.map((field, index) => (
                        <FBEntityCard
                            key={field.key}
                            type="field"
                            title={field.label}
                            subtitle={`${getFieldTypeDisplay(field.type)} ${field.required ? '• Required' : ''}`}
                            badge={`Field ${index + 1}`}
                            onClick={() => handleFieldClick(field.key)}
                            onRemove={() => handleRemoveField(field.key)}
                            removeTitle="Delete Field"
                            removeMessage={`Are you sure you want to delete "${field.label}"?`}
                        />
                    ))}

                    {/* Empty State */}
                    {section.fields.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p className="text-sm">No fields added yet.</p>
                            <p className="text-xs mt-1">Create your first field to get started.</p>
                        </div>
                    )}
                </div>

                {/* Add Field Button */}
                <div className="mt-4">
                    <FBAddButton
                        label="Add Field"
                        entityType="field"
                        onClick={handleAddField}
                        disabled={section.fields.length >= FORM_LIMITS.MAX_FIELDS_PER_SECTION}
                    />
                </div>
            </div>
        </div>
    );
};

export default FBSection;