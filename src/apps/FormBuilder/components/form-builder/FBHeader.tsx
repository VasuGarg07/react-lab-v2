import React, { useState, useCallback, useEffect } from 'react';
import { useFormConfig, useFormActions, useNavigation } from '../../helpers/useFormEngine';
import { FormFieldset, FormInput, FormTextarea } from '@/ui/FormComponents';
import { FORM_LIMITS } from '../../helpers/fb.constants';
import FBAddButton from './FBAddButton';
import FBEntityCard from './FBEntityCard';

const FBHeader: React.FC = () => {
    const formConfig = useFormConfig();
    const { updateForm, removeStep } = useFormActions();
    const { addStep } = useFormActions();
    const { navigateToStep: navToStep } = useNavigation();

    // Local state for inputs
    const [localTitle, setLocalTitle] = useState(formConfig.title || '');
    const [localDescription, setLocalDescription] = useState(formConfig.description || '');

    // Sync local state with store when formConfig changes
    useEffect(() => {
        setLocalTitle(formConfig.title || '');
        setLocalDescription(formConfig.description || '');
    }, [formConfig.title, formConfig.description]);

    const handleTitleChange = useCallback((value: string) => {
        setLocalTitle(value);
    }, []);

    const handleDescriptionChange = useCallback((value: string) => {
        setLocalDescription(value);
    }, []);

    const handleTitleBlur = useCallback(() => {
        const finalTitle = localTitle.trim() || 'Untitled Form';
        updateForm({ title: finalTitle });
    }, [localTitle, updateForm]);

    const handleDescriptionBlur = useCallback(() => {
        updateForm({ description: localDescription.trim() });
    }, [localDescription, updateForm]);

    const handleAddStep = useCallback((title: string) => {
        addStep(title);
    }, [addStep]);

    const handleStepClick = useCallback((stepKey: string) => {
        navToStep(stepKey);
    }, [navToStep]);

    const handleRemoveStep = useCallback((stepKey: string) => {
        removeStep(stepKey);
    }, [removeStep]);

    return (
        <div className='w-full bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-4'>
            {/* Form Settings */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Form Settings
                </h3>
                <FormFieldset legend="Form Settings">
                    <FormInput
                        label="Form Title"
                        type='text'
                        value={localTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        placeholder="Enter form title"
                        className="mb-4"
                        inputClassName="text-md font-bold"
                    />

                    <FormTextarea
                        label="Form Description"
                        value={localDescription}
                        onChange={handleDescriptionChange}
                        onBlur={handleDescriptionBlur}
                        placeholder="Enter form description (optional)"
                        rows={3}
                    />
                </FormFieldset>
            </div>

            {/* Steps Section */}
            <div className="border-t border-gray-200 dark:border-zinc-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Steps
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formConfig.steps.length} of {FORM_LIMITS.MAX_STEPS}
                    </span>
                </div>

                {/* Steps List */}
                <div className="space-y-3">
                    {formConfig.steps.map((step, index) => (
                        <FBEntityCard
                            key={step.key}
                            type="step"
                            title={step.title}
                            subtitle={step.description}
                            badge={`Step ${index + 1}`}
                            onClick={() => handleStepClick(step.key)}
                            onRemove={() => handleRemoveStep(step.key)}
                            removeTitle="Delete Step"
                            removeMessage={`Are you sure you want to delete "${step.title}"? This will permanently remove the step and all its sections.`}
                        />
                    ))}

                    {/* Empty State */}
                    {formConfig.steps.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p className="text-sm">No steps added yet.</p>
                            <p className="text-xs mt-1">Create your first step to get started.</p>
                        </div>
                    )}
                </div>

                {/* Add Step Button */}
                <div className="mt-4">
                    <FBAddButton
                        label="Add Step"
                        entityType="step"
                        onClick={handleAddStep}
                        disabled={formConfig.steps.length >= FORM_LIMITS.MAX_STEPS}
                    />
                </div>
            </div>
        </div>
    );
};

export default FBHeader;