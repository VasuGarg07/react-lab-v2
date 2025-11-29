import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, RefreshCw, FileX } from 'lucide-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import { goToStep, resetForm } from '../../../store/formRendererSlice';
import { useSubmitResponse } from '../hooks/useFormMutations';
import ReviewSection from './ReviewSection';
import LoadingButton from '../../../ui/LoadingButton';

type ViewState = 'review' | 'success';

export default function Review() {
    const { shareUrl } = useParams<{ shareUrl: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { formConfig, responses } = useAppSelector((state) => state.formRenderer);
    const submitMutation = useSubmitResponse(shareUrl!);
    const [viewState, setViewState] = useState<ViewState>('review');

    // Redirect if no form loaded (user navigated directly)
    if (!formConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                        <FileX className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                    </div>
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        No Form Data
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        Please fill out the form before reviewing.
                    </p>
                    <button
                        onClick={() => navigate(`/formlyst/fill/${shareUrl}`)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        ← Go to Form
                    </button>
                </div>
            </div>
        );
    }

    const handleEdit = (stepIndex: number) => {
        dispatch(goToStep(stepIndex));
        navigate(`/formlyst/fill/${shareUrl}`);
    };

    const handleBack = () => {
        navigate(`/formlyst/fill/${shareUrl}`);
    };

    const handleSubmit = () => {
        submitMutation.mutate(responses, {
            onSuccess: () => {
                setViewState('success');
            },
        });
    };

    const handleSubmitAnother = () => {
        dispatch(resetForm());
        navigate(`/formlyst/fill/${shareUrl}`);
    };

    // Success State
    if (viewState === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Thank You!
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                        Your response has been submitted successfully.
                    </p>
                    <button
                        onClick={handleSubmitAnother}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Submit Another Response
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-8">
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                        Review Your Answers
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Please review your responses before submitting
                    </p>
                </div>

                {/* Steps & Sections */}
                <div className="space-y-6">
                    {formConfig.steps.map((step, stepIndex) => (
                        <div key={step.key}>
                            {/* Step Header */}
                            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                                {step.title}
                            </h2>

                            {/* Sections */}
                            <div className="space-y-3">
                                {step.sections.map((section) => (
                                    <ReviewSection
                                        key={section.key}
                                        section={section}
                                        responses={responses}
                                        onEdit={() => handleEdit(stepIndex)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 pt-8">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={submitMutation.isPending}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    <LoadingButton
                        onClick={handleSubmit}
                        isLoading={submitMutation.isPending}
                        loadingText="Submitting..."
                        fullWidth
                        className="flex-1 py-3 rounded-xl"
                    >
                        Submit
                    </LoadingButton>
                </div>

                {/* Submit Error */}
                {submitMutation.isError && (
                    <p className="mt-4 text-sm text-red-500 text-center">
                        Failed to submit. Please try again.
                    </p>
                )}
            </div>
        </div>
    );
}