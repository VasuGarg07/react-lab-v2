import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { cn } from '@/shared/cn';
import { ChevronLeft } from 'lucide-react';
import { FormField, FormStep } from '../helpers/fb.types';
import {
    useResponseUI,
    useFormResponseStore
} from '../helpers/useFormRender';
import { toastService } from '@/shared/toastr';
import { submitFormResponse } from '../helpers/fb.service';

const FormReview: React.FC = () => {
    const { shareUrl } = useParams<{ shareUrl: string }>();
    const navigate = useNavigate();
    const {
        formConfig,
        responses,
        resetForm
    } = useFormResponseStore();

    const { isSubmitting, setSubmitting, setSubmitError } = useResponseUI();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [_, setSubmissionId] = useState<string | null>(null);

    // Format field value based on field type
    const formatFieldValue = (field: FormField, value: any): string => {
        if (value === undefined || value === null || value === '') {
            return '—'; // Empty state
        }

        switch (field.type) {
            case 'text':
            case 'number':
            case 'select':
                return String(value);

            case 'multi_select':
                if (Array.isArray(value)) {
                    return value.length > 0 ? value.join(', ') : '—';
                }
                return String(value);

            case 'boolean':
                return value === true ? 'Yes' : value === false ? 'No' : '—';

            case 'range':
                return `${value} (${field.min}-${field.max})`;

            default:
                return String(value);
        }
    };

    // Flatten all fields from all sections in a step
    const getFlattenedFields = (step: FormStep): FormField[] => {
        return step.sections.flatMap(section => section.fields);
    };

    const handleEdit = () => {
        navigate(`/formlyst-public/${shareUrl}`);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!shareUrl || !formConfig) {
            toastService.error('Form configuration not available');
            return;
        }

        // Validate all required fields across all steps
        const allRequiredFields: string[] = [];
        formConfig.steps.forEach(step => {
            step.sections.forEach(section => {
                section.fields.forEach(field => {
                    if (field.required) {
                        allRequiredFields.push(field.key);
                    }
                });
            });
        });

        // Check validation
        const missingFields = allRequiredFields.filter(fieldKey => {
            const value = responses[fieldKey];
            return value === undefined || value === null || value === '' ||
                (Array.isArray(value) && value.length === 0);
        });

        if (missingFields.length > 0) {
            toastService.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const responseId = await submitFormResponse(shareUrl, responses);
            toastService.success('Form submitted successfully!');
            setIsSubmitted(true);
            setSubmissionId(responseId);
        } catch (err) {
            console.error('Failed to submit response:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to submit form. Please try again.';
            setSubmitError(errorMessage);
            toastService.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    // Reset form to start over
    const handleStartOver = () => {
        resetForm();
        handleEdit();
    };

    if (!formConfig) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">No form data available</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    if (!formConfig.steps || formConfig.steps.length === 0) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">No form data available</p>
                    <button
                        onClick={handleEdit}
                        className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                        Go back to form
                    </button>
                </div>
            </div>
        );
    }

    // Success state (after submission)
    if (isSubmitted) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-green-500 text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        Thank You!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Your form has been submitted successfully.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleStartOver}
                            className={cn(
                                "px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg",
                                "hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                            )}
                        >
                            Submit Another Response
                        </button>
                        <button
                            onClick={() => window.close()}
                            className={cn(
                                "px-6 py-2 bg-blue-600 text-white rounded-lg",
                                "hover:bg-blue-700 transition-colors duration-200"
                            )}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-54px)] w-full max-w-4xl mx-auto p-4 sm:p-6">
            {/* Header */}
            <div className="mb-4">
                <button
                    onClick={handleEdit}
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg font-medium mb-3",
                        "border border-gray-200 dark:border-gray-700",
                        "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        "hover:text-gray-900 dark:hover:text-white transition-colors"
                    )}
                >
                    <ChevronLeft className="size-4" />
                    Edit Form
                </button>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Review Your Responses
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-md">
                    Please review your answers before submitting the form: <span className="font-medium">{formConfig.title}</span>
                </p>
            </div>

            {/* Form Responses */}
            <div className="space-y-3 mb-4">
                {formConfig.steps.map((step, stepIndex) => {
                    const flattenedFields = getFlattenedFields(step);

                    // Skip empty steps
                    if (flattenedFields.length === 0) {
                        return null;
                    }

                    return (
                        <div
                            key={step.key}
                            className={cn(
                                "bg-white dark:bg-gray-800 rounded-2xl shadow-sm",
                                "border border-gray-200 dark:border-gray-700"
                            )}
                        >
                            {/* Card Header */}
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full size-8 flex items-center justify-center">
                                        {stepIndex + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {step.title}
                                        </h3>
                                        {step.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {step.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Card Content - Fields Table */}
                            <div className="p-6">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {flattenedFields.map(field => (
                                                <tr key={field.key} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                    <td className="py-4 pr-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-2/5">
                                                        <div className="flex items-center gap-2">
                                                            {field.label}
                                                            {field.required && (
                                                                <span className="text-red-500 text-xs">*</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-sm text-gray-900 dark:text-gray-100 w-3/5">
                                                        <div className="break-words">
                                                            {formatFieldValue(field, responses[field.key])}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Action Footer */}
            <div className={cn(
                "bg-white dark:bg-gray-800 rounded-2xl shadow-sm",
                "border border-gray-200 dark:border-gray-700",
                "flex flex-col sm:flex-row items-center justify-between gap-4",
                "px-4 py-3"
            )}>
                <button
                    onClick={handleEdit}
                    className={cn(
                        "px-4 py-2 rounded-lg font-medium",
                        "border border-gray-200 dark:border-gray-700",
                        "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                        "hover:text-gray-900 dark:hover:text-white transition-colors"
                    )}
                >
                    Edit Form
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={cn(
                        "px-4 py-2 rounded-lg font-medium",
                        "bg-blue-600 hover:bg-blue-700 text-white",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "shadow-sm hover:shadow-md transition-all",
                    )}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                </button>
            </div>
        </div>
    );
};

export default FormReview;