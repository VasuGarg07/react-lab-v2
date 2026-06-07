import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Download, Trash2, FileText, Loader2, Inbox, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { useFormById, useResponses } from '../hooks/useFormQueries';
import { useDeleteResponse, useDeleteAllResponses } from '../hooks/useFormMutations';
import { downloadJson, downloadXml } from '../helpers/utils';
import AppHeader from '../components/AppHeader';
import ResponseCard from './ResponseCard';

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

    const handleExportJson = () => { if (!responses || !form) return; downloadJson(`${form.title}-responses`, responses); setExportMenuOpen(false); };
    const handleExportXml = () => { if (!responses || !form) return; downloadXml(`${form.title}-responses`, responses, form); setExportMenuOpen(false); };

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-canvas">
                <AppHeader />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-8 h-8 text-plum animate-spin" />
                </div>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="min-h-screen bg-canvas">
                <AppHeader />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <h2 className="font-display text-lg font-bold text-ink mb-2">Form not found</h2>
                    <p className="text-sm text-neutral-500 mb-4">The form you're looking for doesn't exist or has been deleted.</p>
                    <button onClick={() => navigate('/')} className="text-sm font-semibold text-plum hover:underline">← Back to Dashboard</button>
                </div>
            </div>
        );
    }

    const count = responses?.length ?? 0;

    return (
        <div className="min-h-screen bg-canvas">
            <AppHeader />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 fade-up">
                <button onClick={() => navigate('/')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-ink mb-5 transition-colors">
                    <ArrowLeft className="w-4 h-4" />Dashboard
                </button>

                <div className="flex items-start justify-between gap-4 mb-7">
                    <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-plum mb-1">Responses</p>
                        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink truncate">{form.title}</h1>
                        <p className="text-sm text-neutral-500 mt-1">
                            <span className="font-bold text-ink tabular-nums">{count}</span> {count === 1 ? 'response' : 'responses'} collected
                        </p>
                    </div>

                    {count > 0 && (
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="relative">
                                <button onClick={() => setExportMenuOpen(!exportMenuOpen)} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-ink hover:border-neutral-300 transition-colors">
                                    <Download className="w-4 h-4" /><span className="hidden sm:inline">Export</span><ChevronDown className="w-4 h-4" />
                                </button>
                                {exportMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setExportMenuOpen(false)} />
                                        <div className="absolute right-0 mt-2 w-44 bg-white border border-neutral-200 rounded-xl shadow-lift py-1.5 z-20 scale-in origin-top-right">
                                            <button onClick={handleExportJson} className="w-full px-3 py-2 text-sm text-left text-neutral-600 hover:bg-neutral-50 hover:text-ink transition-colors">Export as JSON</button>
                                            <button onClick={handleExportXml} className="w-full px-3 py-2 text-sm text-left text-neutral-600 hover:bg-neutral-50 hover:text-ink transition-colors">Export as XML</button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <button onClick={handleDeleteAll} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-colors">
                                <Trash2 className="w-4 h-4" /><span className="hidden sm:inline">Delete All</span>
                            </button>
                        </div>
                    )}
                </div>

                {count > 0 ? (
                    <div className="space-y-3">
                        {responses!.map((response, index) => (
                            <ResponseCard
                                key={response.id}
                                response={response}
                                formConfig={form}
                                index={responses!.length - index}
                                onDelete={handleDeleteResponse}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center shadow-card">
                        <div className="w-16 h-16 rounded-2xl bg-plum/10 grid place-items-center mx-auto mb-4">
                            <Inbox className="w-7 h-7 text-plum" strokeWidth={1.75} />
                        </div>
                        <h3 className="font-display text-lg font-bold text-ink mb-1.5">No responses yet</h3>
                        <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">Share your form to start collecting responses.</p>
                        <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/fill/${form.shareUrl}`)} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl bg-plum text-white hover:bg-plum-600 transition-colors">
                            Copy Share Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
