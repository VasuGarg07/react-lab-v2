import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Download, Trash2, FileText, Loader2, Inbox, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '../../../components/ModalContext';
import { useFormById, useResponses } from '../hooks/useFormQueries';
import { useDeleteResponse, useDeleteAllResponses } from '../hooks/useFormMutations';
import { downloadJson, downloadXml } from '../helpers/utils';
import ResponseCard from './ResponseCard';
import { openAlertDialog } from '../../../ui/AlertDialog';

export default function Responses() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const modal = useModal();
    const [exportMenuOpen, setExportMenuOpen] = useState(false);

    const { data: form, isLoading: formLoading } = useFormById(id);
    const { data: responses, isLoading: responsesLoading } = useResponses(id);
    const deleteResponse = useDeleteResponse(id!);
    const deleteAllResponses = useDeleteAllResponses(id!);

    const isLoading = formLoading || responsesLoading;

    const handleExportJson = () => {
        if (!responses || !form) return;
        downloadJson(`${form.title}-responses`, responses);
        setExportMenuOpen(false);
    };

    const handleExportXml = () => {
        if (!responses || !form) return;
        downloadXml(`${form.title}-responses`, responses, form);
        setExportMenuOpen(false);
    };

    const handleDeleteResponse = (responseId: string) => {
        openAlertDialog(modal, {
            title: 'Delete Response',
            message: 'This will permanently delete this response. This action cannot be undone.',
            confirmText: 'Delete',
            onConfirm: () => deleteResponse.mutate(responseId),
        });
    };

    const handleDeleteAll = () => {
        openAlertDialog(modal, {
            title: 'Delete All Responses',
            message: `This will permanently delete all ${responses?.length || 0} responses. This action cannot be undone.`,
            confirmText: 'Delete All',
            onConfirm: () => deleteAllResponses.mutate(),
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading responses...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (!form) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                <div className="text-center">
                    <FileText className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Form not found
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        The form you're looking for doesn't exist or has been deleted.
                    </p>
                    <button
                        onClick={() => navigate('/formlyst')}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    {/* Back button */}
                    <button
                        onClick={() => navigate('/formlyst')}
                        className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                                {form.title}
                            </h1>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {responses?.length || 0} {responses?.length === 1 ? 'response' : 'responses'} collected
                            </p>
                        </div>

                        {/* Actions */}
                        {responses && responses.length > 0 && (
                            <div className="flex items-center gap-2">
                                {/* Export dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setExportMenuOpen(!exportMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Export
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {exportMenuOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setExportMenuOpen(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-20">
                                                <button
                                                    onClick={handleExportJson}
                                                    className="w-full px-4 py-2 text-sm text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                                >
                                                    Export as JSON
                                                </button>
                                                <button
                                                    onClick={handleExportXml}
                                                    className="w-full px-4 py-2 text-sm text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                                >
                                                    Export as XML
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Delete all */}
                                <button
                                    onClick={handleDeleteAll}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-red-200 dark:border-red-900/50 bg-white dark:bg-neutral-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete All
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Response List */}
                {responses && responses.length > 0 ? (
                    <div className="space-y-3">
                        {responses.map((response, index) => (
                            <ResponseCard
                                key={response.id}
                                response={response}
                                formConfig={form}
                                index={responses.length - index}
                                onDelete={handleDeleteResponse}
                            />
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-4">
                            <Inbox className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            No responses yet
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
                            Share your form to start collecting responses. They'll appear here once submitted.
                        </p>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `${window.location.origin}/formlyst/fill/${form.shareUrl}`
                                );
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            Copy Share Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}