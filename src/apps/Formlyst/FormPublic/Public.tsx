import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Loader2, FileX } from 'lucide-react';
import { usePublicForm } from '../hooks/useFormQueries';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import { loadForm, setResponse, nextStep, prevStep } from '../../../store/formRendererSlice';
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

    // Load form into Redux when fetched
    useEffect(() => {
        if (form) {
            dispatch(loadForm(form));
            setViewState('form');
        }
    }, [form, dispatch]);

    // Handle loading/error states
    useEffect(() => {
        if (isLoading) {
            setViewState('loading');
        } else if (error || (form && !form.isActive)) {
            setViewState('error');
        }
    }, [isLoading, error, form]);

    const currentStep = formConfig?.steps[currentStepIndex];

    // Validate current step
    const validateStep = (): boolean => {
        if (!currentStep) return false;

        const newErrors: Record<string, string> = {};

        for (const section of currentStep.sections) {
            for (const field of section.fields) {
                if (field.required) {
                    const value = responses[field.key];
                    const isEmpty =
                        value == null ||
                        value === '' ||
                        (Array.isArray(value) && value.length === 0);

                    if (isEmpty) {
                        newErrors[field.key] = 'This field is required';
                    }
                }

                // Type-specific validation
                if (field.type === 'text' && field.validation) {
                    const value = responses[field.key] as string;
                    if (value) {
                        if (field.validation.minLength && value.length < field.validation.minLength) {
                            newErrors[field.key] = `Minimum ${field.validation.minLength} characters`;
                        }
                        if (field.validation.maxLength && value.length > field.validation.maxLength) {
                            newErrors[field.key] = `Maximum ${field.validation.maxLength} characters`;
                        }
                        if (field.validation.regex) {
                            const regex = new RegExp(field.validation.regex);
                            if (!regex.test(value)) {
                                newErrors[field.key] = 'Invalid format';
                            }
                        }
                    }
                }

                if (field.type === 'number' && field.validation) {
                    const value = responses[field.key] as number;
                    if (value != null) {
                        if (field.validation.minValue != null && value < field.validation.minValue) {
                            newErrors[field.key] = `Minimum value is ${field.validation.minValue}`;
                        }
                        if (field.validation.maxValue != null && value > field.validation.maxValue) {
                            newErrors[field.key] = `Maximum value is ${field.validation.maxValue}`;
                        }
                    }
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (fieldKey: string, value: unknown) => {
        dispatch(setResponse({ key: fieldKey, value }));
        // Clear error when user types
        if (errors[fieldKey]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[fieldKey];
                return next;
            });
        }
    };

    const handleNext = () => {
        if (validateStep()) {
            const isLastStep = currentStepIndex === (formConfig?.steps.length ?? 1) - 1;
            if (isLastStep) {
                // Navigate to review page
                navigate(`/formlyst/fill/${shareUrl}/review`);
            } else {
                dispatch(nextStep());
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleBack = () => {
        dispatch(prevStep());
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Loading State
    if (viewState === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading form...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (viewState === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                        <FileX className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                    </div>
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Form Unavailable
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        This form is no longer accepting responses or doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    // Form State
    if (!formConfig || !currentStep) return null;

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-8">
            <div className="max-w-xl mx-auto">
                {/* Form Title */}
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                        {formConfig.title}
                    </h1>
                    {formConfig.description && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {formConfig.description}
                        </p>
                    )}
                </div>

                {/* Step Progress */}
                {formConfig.steps.length > 1 && (
                    <div className="mb-4">
                        <StepProgress
                            currentStep={currentStepIndex}
                            totalSteps={formConfig.steps.length}
                        />
                    </div>
                )}

                {/* Current Step */}
                <StepRenderer
                    step={currentStep}
                    responses={responses}
                    errors={errors}
                    onChange={handleFieldChange}
                />

                {/* Navigation */}
                <FormNav
                    currentStep={currentStepIndex}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            </div>
        </div>
    );
}