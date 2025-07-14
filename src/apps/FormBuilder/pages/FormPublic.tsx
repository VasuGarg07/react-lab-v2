import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPublicForm } from '../helpers/fb.service';
import { cn } from '@/shared/cn';
import { useFormResponseStore } from '../helpers/useFormRender';
import FormRenderer from '../components/form-render/FormRenderer';
import { Form } from '../helpers/fb.types';

const FormPublic: React.FC = () => {
    const { shareUrl } = useParams<{ shareUrl: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Form | null>(null);

    // Form response store
    const {
        formConfig,
        submitError,
        setFormConfig
    } = useFormResponseStore();

    // Fetch form on mount
    useEffect(() => {
        const loadForm = async () => {
            if (!shareUrl) {
                setError('Invalid form URL');
                setIsLoading(false);
                return;
            }

            // If we already have the same form loaded, don't fetch again
            if (form && form.shareUrl === shareUrl) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const fetchedForm = await getPublicForm(shareUrl);
                if (fetchedForm) {
                    setForm(fetchedForm);
                    // Only set form config if it's a different form or first time
                    if (!formConfig || formConfig.title !== fetchedForm.title) {
                        setFormConfig(fetchedForm);
                    }
                    setError(null);
                } else {
                    setError('Form not found or unavailable');
                }
            } catch (err) {
                console.error('Failed to fetch form:', err);
                setError('Failed to load form. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        loadForm();
    }, [shareUrl, setFormConfig]); // Removed formConfig from dependencies

    // Loading state
    if (isLoading) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading form...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !shareUrl) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {!shareUrl ? 'Invalid Url' : 'Form Not Available'}
                    </h2>
                    {shareUrl && (<>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className={cn(
                                "px-6 py-2 bg-blue-600 text-white rounded-lg",
                                "hover:bg-blue-700 transition-colors duration-200"
                            )}
                        >
                            Try Again
                        </button>
                    </>)}
                </div>
            </div>
        );
    }

    // Main form render
    if (!formConfig) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">No form configuration available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Error display */}
            {submitError && (
                <div className="fixed top-4 right-4 z-50 max-w-md">
                    <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-red-500 text-xl mr-2">⚠️</span>
                            <div>
                                <p className="font-semibold">Submission Error</p>
                                <p className="text-sm">{submitError}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <FormRenderer
                shareUrl={shareUrl}
                formConfig={formConfig}
                className="py-4"
            />
        </div>
    );
};

export default FormPublic;