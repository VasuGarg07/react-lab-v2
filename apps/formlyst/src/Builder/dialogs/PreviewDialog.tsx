import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '@react-lab/ui';
import { useAppSelector } from '../../store/useRedux';
import StepProgress from '../../FormPublic/StepProgress';
import StepRenderer from '../../FormPublic/StepRenderer';

export default function PreviewDialog() {
    const { close } = useModal();
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState<Record<string, unknown>>({});

    const handleChange = (fieldKey: string, value: unknown) => setResponses((prev) => ({ ...prev, [fieldKey]: value }));

    const step = formConfig.steps[currentStep];

    if (formConfig.steps.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-neutral-500 mb-4">Add some steps to preview your form.</p>
                <button onClick={close} className="px-4 py-2 text-sm font-medium rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors">Close</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col overflow-auto">
            <div className="text-center mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-2 text-[11px] font-bold uppercase tracking-wider rounded-full bg-plum/10 text-plum">Preview</span>
                <h4 className="font-display text-xl font-bold text-ink">{formConfig.title}</h4>
                {formConfig.description && <p className="text-sm text-neutral-500 mt-1">{formConfig.description}</p>}
            </div>

            {formConfig.steps.length > 1 && (
                <div className="mb-6">
                    <StepProgress currentStep={currentStep} totalSteps={formConfig.steps.length} />
                </div>
            )}

            <div className="flex-1 overflow-y-auto min-h-0 pb-4">
                {step && <StepRenderer step={step} responses={responses} errors={{}} onChange={handleChange} />}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                <button onClick={() => setCurrentStep((p) => p - 1)} disabled={currentStep === 0} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft className="w-4 h-4" />Back
                </button>

                {currentStep < formConfig.steps.length - 1 ? (
                    <button onClick={() => setCurrentStep((p) => p + 1)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                        Next<ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button onClick={close} className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">Done</button>
                )}
            </div>
        </div>
    );
}
