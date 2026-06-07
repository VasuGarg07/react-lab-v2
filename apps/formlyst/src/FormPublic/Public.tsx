import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Loader2, FileX, Sparkles } from 'lucide-react';
import { usePublicForm } from '../hooks/useFormQueries';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { loadForm, setResponse, nextStep, prevStep } from '../store/formRendererSlice';
import StepProgress from './StepProgress';
import StepRenderer from './StepRenderer';
import FormNav from './FormNav';

type ViewState = 'loading' | 'form' | 'error';

export default function Public() {
    const { shareUrl } = useParams<{ shareUrl: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: form, isLoading, error } = usePublicForm(shareUrl);
    const { formConfig, responses, currentStepIndex } = useAppSelector((state) => state.formRenderer);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [viewState, setViewState] = useState<ViewState>('loading');

    useEffect(() => {
        if (form) { dispatch(loadForm(form)); setViewState('form'); }
    }, [form, dispatch]);

    useEffect(() => {
        if (isLoading) setViewState('loading');
        else if (error || (form && !form.isActive)) setViewState('error');
    }, [isLoading, error, form]);

    const currentStep = formConfig?.steps[currentStepIndex];

    const validateStep = (): boolean => {
        if (!currentStep) return false;
        const newErrors: Record<string, string> = {};

        for (const section of currentStep.sections) {
            for (const field of section.fields) {
                if (field.required) {
                    const value = responses[field.key];
                    const isEmpty = value == null || value === '' || (Array.isArray(value) && value.length === 0);
                    if (isEmpty) newErrors[field.key] = 'This field is required';
                }

                if (field.type === 'text' && field.validation) {
                    const value = responses[field.key] as string;
                    if (value) {
                        if (field.validation.minLength && value.length < field.validation.minLength)
                            newErrors[field.key] = `Minimum ${field.validation.minLength} characters`;
                        if (field.validation.maxLength && value.length > field.validation.maxLength)
                            newErrors[field.key] = `Maximum ${field.validation.maxLength} characters`;
                        if (field.validation.regex && !new RegExp(field.validation.regex).test(value))
                            newErrors[field.key] = 'Invalid format';
                    }
                }

                if (field.type === 'number' && field.validation) {
                    const value = responses[field.key] as number;
                    if (value != null) {
                        if (field.validation.minValue != null && value < field.validation.minValue)
                            newErrors[field.key] = `Minimum value is ${field.validation.minValue}`;
                        if (field.validation.maxValue != null && value > field.validation.maxValue)
                            newErrors[field.key] = `Maximum value is ${field.validation.maxValue}`;
                    }
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (fieldKey: string, value: unknown) => {
        dispatch(setResponse({ key: fieldKey, value }));
        if (errors[fieldKey]) setErrors((prev) => { const next = { ...prev }; delete next[fieldKey]; return next; });
    };

    const handleNext = () => {
        if (validateStep()) {
            const isLastStep = currentStepIndex === (formConfig?.steps.length ?? 1) - 1;
            if (isLastStep) navigate(`/fill/${shareUrl}/review`);
            else { dispatch(nextStep()); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        }
    };

    const handleBack = () => { dispatch(prevStep()); setErrors({}); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    if (viewState === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-canvas">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-plum animate-spin" />
                    <p className="text-sm text-neutral-500">Loading form…</p>
                </div>
            </div>
        );
    }

    if (viewState === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-card grid place-items-center mx-auto mb-4">
                        <FileX className="w-7 h-7 text-neutral-400" />
                    </div>
                    <h1 className="font-display text-xl font-bold text-ink mb-2">Form Unavailable</h1>
                    <p className="text-sm text-neutral-500">This form is no longer accepting responses or doesn't exist.</p>
                </div>
            </div>
        );
    }

    if (!formConfig || !currentStep) return null;

    return (
        <div className="min-h-screen bg-canvas">
            {/* Slim brand bar */}
            <div className="h-1 bg-linear-to-r from-plum via-violet-500 to-plum" />
            <div className="px-4 py-10 sm:py-14">
                <div className="max-w-xl mx-auto fade-up">
                    <div className="flex items-center justify-center gap-2 mb-6 text-neutral-400">
                        <Sparkles className="w-3.5 h-3.5 text-plum" />
                        <span className="text-xs font-bold uppercase tracking-[0.18em]">Formlyst</span>
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="font-display text-3xl font-bold text-ink mb-1.5 text-balance">{formConfig.title}</h1>
                        {formConfig.description && <p className="text-sm text-neutral-500 max-w-md mx-auto">{formConfig.description}</p>}
                    </div>

                    {formConfig.steps.length > 1 && (
                        <div className="mb-6">
                            <StepProgress currentStep={currentStepIndex} totalSteps={formConfig.steps.length} />
                        </div>
                    )}

                    <StepRenderer step={currentStep} responses={responses} errors={errors} onChange={handleFieldChange} />
                    <FormNav currentStep={currentStepIndex} onBack={handleBack} onNext={handleNext} />
                </div>
            </div>
        </div>
    );
}
