import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Trash2, FileText, Loader2, Globe, Monitor, Smartphone, Calendar, Clock } from 'lucide-react';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { useFormById, useResponseById } from '../hooks/useFormQueries';
import { useDeleteResponse } from '../hooks/useFormMutations';
import { formatDate } from '../helpers/utils';
import type { FormField } from '../helpers/types';

export default function ResponseDetail() {
    const { id, responseId } = useParams<{ id: string; responseId: string }>();
    const navigate = useNavigate();
    const modal = useModal();

    const { data: form, isLoading: formLoading } = useFormById(id);
    const { data: response, isLoading: responseLoading } = useResponseById(responseId);
    const deleteResponse = useDeleteResponse(id!);

    const isLoading = formLoading || responseLoading;

    // Format time from ISO string
    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    // Detect device from user agent
    const getDeviceInfo = () => {
        const ua = response?.userAgent?.toLowerCase() || '';
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
            return { icon: Smartphone, label: 'Mobile' };
        }
        return { icon: Monitor, label: 'Desktop' };
    };

    // Format field value for display
    const formatValue = (field: FormField, value: unknown): string => {
        if (value == null || value === '') return '—';

        switch (field.type) {
            case 'boolean':
                return value ? 'Yes' : 'No';
            case 'multi_select':
                return Array.isArray(value) ? value.join(', ') : String(value);
            case 'range':
                return `${value} / ${field.max}`;
            default:
                return String(value);
        }
    };

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete Response',
            message: 'This will permanently delete this response. This action cannot be undone.',
            confirmText: 'Delete',
            onConfirm: () => {
                deleteResponse.mutate(responseId!, {
                    onSuccess: () => navigate(`/formlyst/${id}/responses`),
                });
            },
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading response...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (!form || !response) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                <div className="text-center">
                    <FileText className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Response not found
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        This response doesn't exist or has been deleted.
                    </p>
                    <button
                        onClick={() => navigate(`/formlyst/${id}/responses`)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        ← Back to Responses
                    </button>
                </div>
            </div>
        );
    }

    const DeviceIcon = getDeviceInfo().icon;

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(`/formlyst/${id}/responses`)}
                        className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Responses
                    </button>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                                {form.title}
                            </h1>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Response Details
                            </p>
                        </div>

                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-red-200 dark:border-red-900/50 bg-white dark:bg-neutral-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </div>

                {/* Metadata Card */}
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Date</p>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {formatDate(response.submittedAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Time</p>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {formatTime(response.submittedAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                <DeviceIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Device</p>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {getDeviceInfo().label}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                <Globe className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">IP Address</p>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {response.ipAddress || 'Unknown'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Responses by Step */}
                <div className="space-y-6">
                    {form.steps.map((step) => (
                        <div key={step.key}>
                            {/* Step Header */}
                            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                                {step.title}
                            </h2>

                            {/* Sections */}
                            <div className="space-y-4">
                                {step.sections.map((section) => (
                                    <div
                                        key={section.key}
                                        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden"
                                    >
                                        {/* Section Header */}
                                        <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                                            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                {section.title}
                                            </h3>
                                        </div>

                                        {/* Fields */}
                                        <div className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
                                            {section.fields.map((field) => {
                                                const value = response.responses[field.key];
                                                const isEmpty = value == null || value === '';

                                                return (
                                                    <div
                                                        key={field.key}
                                                        className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
                                                    >
                                                        <div className="sm:w-1/3 shrink-0">
                                                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                                                {field.label}
                                                                {field.required && (
                                                                    <span className="text-red-500 ml-0.5">*</span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="sm:flex-1">
                                                            <span
                                                                className={`text-sm ${isEmpty
                                                                    ? 'text-neutral-400 dark:text-neutral-500 italic'
                                                                    : 'text-neutral-900 dark:text-neutral-100'
                                                                    }`}
                                                            >
                                                                {formatValue(field, value)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}