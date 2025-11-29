import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '../../../../components/ModalContext';
import { useAppSelector } from '../../../../store/useRedux';
import StepProgress from '../../FormPublic/StepProgress';
import StepRenderer from '../../FormPublic/StepRenderer';

export default function PreviewDialog() {
    const { close } = useModal();
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState<Record<string, unknown>>({});

    const handleChange = (fieldKey: string, value: unknown) => {
        setResponses((prev) => ({ ...prev, [fieldKey]: value }));
    };

    const handleNext = () => {
        if (currentStep < formConfig.steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const step = formConfig.steps[currentStep];

    // Empty state
    if (formConfig.steps.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                    Add some steps to preview your form.
                </p>
                <button
                    onClick={close}
                    className="px-4 py-2 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col overflow-auto">
            {/* Form Title */}
            <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {formConfig.title}
                </h4>
                {formConfig.description && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        {formConfig.description}
                    </p>
                )}
            </div>

            {/* Progress */}
            {formConfig.steps.length > 1 && (
                <div className="mb-6">
                    <StepProgress
                        currentStep={currentStep}
                        totalSteps={formConfig.steps.length}
                    />
                </div>
            )}

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto min-h-0 pb-4">
                {step && (
                    <StepRenderer
                        step={step}
                        responses={responses}
                        errors={{}}
                        onChange={handleChange}
                    />
                )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>

                {currentStep < formConfig.steps.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={close}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
}