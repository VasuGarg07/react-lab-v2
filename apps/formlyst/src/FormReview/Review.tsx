import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, RefreshCw, FileX } from 'lucide-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { goToStep, resetForm } from '../store/formRendererSlice';
import { useSubmitResponse } from '../hooks/useFormMutations';
import ReviewSection from './ReviewSection';
import { LoadingButton } from '@react-lab/ui';

type ViewState = 'review' | 'success';

export default function Review() {
    const { shareUrl } = useParams<{ shareUrl: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { formConfig, responses } = useAppSelector((state) => state.formRenderer);
    const submitMutation = useSubmitResponse(shareUrl!);
    const [viewState, setViewState] = useState<ViewState>('review');

    if (!formConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-card grid place-items-center mx-auto mb-4">
                        <FileX className="w-7 h-7 text-neutral-400" />
                    </div>
                    <h1 className="font-display text-xl font-bold text-ink mb-2">No Form Data</h1>
                    <p className="text-sm text-neutral-500 mb-4">Please fill out the form before reviewing.</p>
                    <button onClick={() => navigate(`/fill/${shareUrl}`)} className="text-sm font-semibold text-plum hover:underline">← Go to Form</button>
                </div>
            </div>
        );
    }

    const handleEdit = (stepIndex: number) => { dispatch(goToStep(stepIndex)); navigate(`/fill/${shareUrl}`); };
    const handleBack = () => navigate(`/fill/${shareUrl}`);
    const handleSubmit = () => submitMutation.mutate(responses, { onSuccess: () => setViewState('success') });
    const handleSubmitAnother = () => { dispatch(resetForm()); navigate(`/fill/${shareUrl}`); };

    if (viewState === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
                <div className="text-center max-w-sm fade-up">
                    <div className="w-20 h-20 rounded-2xl bg-success-50 grid place-items-center mx-auto mb-5">
                        <CheckCircle className="w-9 h-9 text-success" strokeWidth={2} />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-ink mb-2">Thank you!</h1>
                    <p className="text-sm text-neutral-500 mb-6">Your response has been submitted successfully.</p>
                    <button onClick={handleSubmitAnother} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-plum hover:bg-plum-600 text-white transition-colors">
                        <RefreshCw className="w-4 h-4" />Submit Another Response
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-canvas">
            <div className="h-1 bg-linear-to-r from-plum via-violet-500 to-plum" />
            <div className="px-4 py-10 sm:py-14">
                <div className="max-w-xl mx-auto fade-up">
                    <div className="text-center mb-8">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-plum mb-2">Almost done</p>
                        <h1 className="font-display text-3xl font-bold text-ink mb-1">Review your answers</h1>
                        <p className="text-sm text-neutral-500">Check everything looks right before submitting.</p>
                    </div>

                    <div className="space-y-6">
                        {formConfig.steps.map((step, stepIndex) => (
                            <div key={step.key}>
                                <h2 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-plum" />{step.title}
                                </h2>
                            <div className="space-y-3">
                                {step.sections.map((section) => (
                                    <ReviewSection key={section.key} section={section} responses={responses} onEdit={() => handleEdit(stepIndex)} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-8">
                    <button type="button" onClick={handleBack} disabled={submitMutation.isPending} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 transition-all duration-200">
                        <ArrowLeft className="w-4 h-4" />Back
                    </button>
                    <LoadingButton onClick={handleSubmit} isLoading={submitMutation.isPending} loadingText="Submitting..." fullWidth className="flex-1 py-3 rounded-xl">
                        Submit
                    </LoadingButton>
                </div>

                    {submitMutation.isError && <p className="mt-4 text-sm text-red-500 text-center">Failed to submit. Please try again.</p>}
                </div>
            </div>
        </div>
    );
}
