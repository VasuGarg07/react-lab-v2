import { FormFieldset, FormInput, FormTextarea } from '@/ui/FormComponents';
import React, { useCallback, useEffect, useState } from 'react';
import { FORM_LIMITS } from '../../helpers/fb.constants';
import { useFormActions, useFormConfig, useNavigation } from '../../helpers/useFormEngine';
import FBAddButton from './FBAddButton';
import FBEntityCard from './FBEntityCard';

interface FBStepProps {
    stepKey: string;
    stepIndex: number;
}

const FBStep: React.FC<FBStepProps> = ({
    stepKey,
    stepIndex,
}) => {
    const formConfig = useFormConfig();
    const { updateStep, addSection, removeSection } = useFormActions();
    const { navigateToSection } = useNavigation();

    // Find the step data
    const step = formConfig.steps.find(s => s.key === stepKey);

    if (!step) {
        return null;
    }

    // Local state for inputs
    const [localTitle, setLocalTitle] = useState(step.title || '');
    const [localDescription, setLocalDescription] = useState(step.description || '');
    const [localKey, setLocalKey] = useState(step.key || '');

    // Sync local state with store when step data changes
    useEffect(() => {
        setLocalTitle(step.title || '');
        setLocalDescription(step.description || '');
        setLocalKey(step.key || '');
    }, [step.title, step.description, step.key]);

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
        const finalTitle = localTitle.trim() || `Step ${stepIndex + 1}`;
        updateStep(stepKey, { title: finalTitle });
    }, [localTitle, stepIndex, stepKey, updateStep]);

    const handleDescriptionBlur = useCallback(() => {
        updateStep(stepKey, { description: localDescription.trim() });
    }, [localDescription, stepKey, updateStep]);

    const handleKeyBlur = useCallback(() => {
        const finalKey = localKey.trim();
        if (finalKey && finalKey !== step.key) {
            updateStep(stepKey, { key: finalKey });
        }
    }, [localKey, step.key, stepKey, updateStep]);

    const handleAddSection = useCallback((title: string) => {
        addSection(stepKey, title);
    }, [stepKey, addSection]);

    const handleSectionClick = useCallback((sectionKey: string) => {
        navigateToSection(stepKey, sectionKey);
    }, [stepKey, navigateToSection]);

    const handleRemoveSection = useCallback((sectionKey: string) => {
        removeSection(stepKey, sectionKey);
    }, [stepKey, removeSection]);

    return (
        <div className='w-full bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6'>
            {/* Step Settings */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Step Settings
                </h3>
                <FormFieldset legend="Step Settings">
                    <div className="space-y-4">
                        <FormInput
                            label="Step Title"
                            type='text'
                            value={localTitle}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            placeholder="Enter step title"
                            inputClassName="font-medium"
                        />

                        <FormTextarea
                            label="Step Description"
                            value={localDescription}
                            onChange={handleDescriptionChange}
                            onBlur={handleDescriptionBlur}
                            placeholder="Enter step description (optional)"
                            rows={2}
                        />

                        <FormInput
                            label="Step Key"
                            type='text'
                            value={localKey}
                            onChange={handleKeyChange}
                            onBlur={handleKeyBlur}
                            placeholder="step_key"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
                            Used for JSON responses and API integration
                        </p>
                    </div>
                </FormFieldset>
            </div>

            {/* Sections */}
            <div className="border-t border-gray-200 dark:border-zinc-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Sections
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {step.sections.length} of {FORM_LIMITS.MAX_SECTIONS_PER_STEP}
                    </span>
                </div>

                {/* Sections List */}
                <div className="space-y-3">
                    {step.sections.map((section, index) => (
                        <FBEntityCard
                            key={section.key}
                            type="section"
                            title={section.title}
                            subtitle={section.description}
                            badge={`Section ${index + 1}`}
                            onClick={() => handleSectionClick(section.key)}
                            onRemove={() => handleRemoveSection(section.key)}
                            removeTitle="Delete Section"
                            removeMessage={`Are you sure you want to delete "${section.title}"? This will permanently remove the section and all its fields.`}
                        />
                    ))}

                    {/* Empty State */}
                    {step.sections.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p className="text-sm">No sections added yet.</p>
                            <p className="text-xs mt-1">Create your first section to get started.</p>
                        </div>
                    )}
                </div>

                {/* Add Section Button */}
                <div className="mt-4">
                    <FBAddButton
                        label="Add Section"
                        entityType="section"
                        onClick={handleAddSection}
                        disabled={step.sections.length >= FORM_LIMITS.MAX_SECTIONS_PER_STEP}
                    />
                </div>
            </div>
        </div>
    );
};

export default FBStep;