import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Download, Trash2, Calendar, MapPin } from 'lucide-react';
import { toastService } from '@/shared/toastr';
import { cn } from '@/shared/cn';
import { Form, FormResponse } from '../helpers/fb.types';
import { deleteAllResponses, getFormById, getFormResponses } from '../helpers/fb.service';
import { FileUtils } from '../helpers/fb.utils';
import AlertDialog from '@/ui/AlertDialog';

// Custom hook for form and responses data
const useFormResponses = (formId: string | undefined) => {
    const [form, setForm] = useState<Form | null>(null);
    const [responses, setResponses] = useState<FormResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!formId) {
            setError('Form ID not provided');
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [formData, responsesData] = await Promise.all([
                    getFormById(formId),
                    getFormResponses(formId)
                ]);

                setForm(formData);
                setResponses(responsesData);
            } catch (err) {
                console.error('Failed to load form responses:', err);
                setError('Failed to load form responses');
                toastService.error('Failed to load form responses');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [formId]);

    const handleDeleteAll = async () => {
        if (!formId) return;

        try {
            const result = await deleteAllResponses(formId);
            setResponses([]);
            toastService.success(`${result.deletedCount} responses deleted successfully`);
        } catch (error) {
            console.error('Failed to delete all responses:', error);
            toastService.error('Failed to delete all responses');
        }
    };

    return { form, responses, loading, error, handleDeleteAll };
};

const FormResponses: React.FC = () => {
    const { formId } = useParams<{ formId: string }>();
    const navigate = useNavigate();
    const { form, responses, loading, error, handleDeleteAll } = useFormResponses(formId);

    // Create field key to label mapping and keys array from form configuration
    const { fieldLabels, allFieldKeys } = useMemo(() => {
        if (!form) return { fieldLabels: {}, allFieldKeys: [] };

        const labels: Record<string, string> = {};
        const keys: string[] = [];

        form.steps.forEach(step => {
            step.sections.forEach(section => {
                section.fields.forEach(field => {
                    labels[field.key] = field.label;
                    keys.push(field.key);
                });
            });
        });

        return { fieldLabels: labels, allFieldKeys: keys };
    }, [form]);

    // Format response value
    const formatValue = (value: any): string => {
        if (value === null || value === undefined || value === '') return '—';

        if (Array.isArray(value)) {
            return value.length > 0 ? value.join(', ') : '—';
        }

        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        return String(value);
    };

    // Export responses as CSV
    const handleExportCSV = () => {
        if (!form || responses.length === 0) {
            toastService.error('No responses to export');
            return;
        }

        // Prepare headers
        const headers = [
            'Response ID',
            'Submitted At',
            'IP Address',
            ...allFieldKeys.map(key => fieldLabels[key] || key)
        ];

        // Prepare data
        const csvData = responses.map(response => ({
            'Response ID': response.id,
            'Submitted At': FileUtils.formatDate(response.submittedAt),
            'IP Address': response.ipAddress,
            ...allFieldKeys.reduce((acc, key) => ({
                ...acc,
                [fieldLabels[key] || key]: formatValue(response.responses[key])
            }), {})
        }));

        const filename = `${form.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_responses`;
        FileUtils.saveCsv(filename, csvData, headers);
        toastService.success('Responses exported successfully');
    };

    if (loading) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading responses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative min-h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/formlyst')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Forms
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-54px)] w-full max-w-7xl mx-auto p-4 sm:p-6">
            {/* Header */}
            <div className="mb-4">
                <button
                    onClick={() => navigate('/formlyst')}
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg font-medium mb-4",
                        "border border-gray-200 dark:border-gray-700 text-sm",
                        "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        "hover:text-gray-900 dark:hover:text-white transition-colors"
                    )}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Forms
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {form?.title || 'Form Responses'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {responses.length} {responses.length === 1 ? 'response' : 'responses'}
                        </p>
                    </div>

                    {responses.length > 0 && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Download className="h-4 w-4" />
                                Export CSV
                            </button>
                            <AlertDialog
                                trigger={
                                    <button className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
                                        <Trash2 className="h-4 w-4" />
                                        Delete All
                                    </button>
                                }
                                title="Delete All Responses"
                                message={`Are you sure you want to delete all ${responses.length} responses? This action cannot be undone.`}
                                onConfirm={handleDeleteAll}
                                confirmLabel="Delete All"
                                cancelLabel="Cancel"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            {responses.length === 0 ? (
                <div className={cn(
                    "bg-white dark:bg-gray-800 rounded-2xl shadow-sm",
                    "border border-gray-200 dark:border-gray-700",
                    "text-center py-16"
                )}>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No responses yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Share your form to start collecting responses
                    </p>
                    <button
                        onClick={() => navigate(`/formlyst/${formId}/edit`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Form
                    </button>
                </div>
            ) : (
                <div className={cn(
                    "bg-white dark:bg-gray-800 rounded-2xl shadow-sm",
                    "border border-gray-200 dark:border-gray-700",
                    "overflow-hidden"
                )}>
                    {/* Table Header */}
                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Form Responses
                        </h3>
                    </div>

                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Submitted
                                        </div>
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            Location
                                        </div>
                                    </th>
                                    {allFieldKeys.map(key => (
                                        <th key={key} className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            {fieldLabels[key]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {responses.map((response) => (
                                    <tr key={response.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {FileUtils.formatDate(response.submittedAt)}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(response.submittedAt).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {response.ipAddress}
                                            </div>
                                        </td>
                                        {allFieldKeys.map(key => (
                                            <td key={key} className="px-3 py-2">
                                                <div className="text-sm text-gray-900 dark:text-white max-w-48 truncate">
                                                    {formatValue(response.responses[key])}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormResponses;