import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Trash2, FileText, Loader2, Globe, Monitor, Smartphone, Calendar, Clock } from 'lucide-react';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { useFormById, useResponseById } from '../hooks/useFormQueries';
import { useDeleteResponse } from '../hooks/useFormMutations';
import { formatDate } from '../helpers/utils';
import AppHeader from '../components/AppHeader';
import type { FormField } from '../helpers/types';

export default function ResponseDetail() {
    const { id, responseId } = useParams<{ id: string; responseId: string }>();
    const navigate = useNavigate();
    const modal = useModal();

    const { data: form, isLoading: formLoading } = useFormById(id);
    const { data: response, isLoading: responseLoading } = useResponseById(responseId);
    const deleteResponse = useDeleteResponse(id!);

    const isLoading = formLoading || responseLoading;

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const getDeviceInfo = () => {
        const ua = response?.userAgent?.toLowerCase() || '';
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return { icon: Smartphone, label: 'Mobile' };
        return { icon: Monitor, label: 'Desktop' };
    };

    const formatValue = (field: FormField, value: unknown): string => {
        if (value == null || value === '') return '—';
        switch (field.type) {
            case 'boolean': return value ? 'Yes' : 'No';
            case 'multi_select': return Array.isArray(value) ? value.join(', ') : String(value);
            case 'range': return`${value} / ${field.max}`;
            default: return String(value);
        }
    };

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete Response',
            message: 'This will permanently delete this response. This action cannot be undone.',
            confirmText: 'Delete',
            onConfirm: () => {
                deleteResponse.mutate(responseId!, { onSuccess: () => navigate(`/${id}/responses`) });
            },
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

    if (!form || !response) {
        return (
            <div className="min-h-screen bg-canvas">
                <AppHeader />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <h2 className="font-display text-lg font-bold text-ink mb-2">Response not found</h2>
                    <p className="text-sm text-neutral-500 mb-4">This response doesn't exist or has been deleted.</p>
                    <button onClick={() => navigate(`/${id}/responses`)} className="text-sm font-semibold text-plum hover:underline">← Back to Responses</button>
                </div>
            </div>
        );
    }

    const DeviceIcon = getDeviceInfo().icon;

    return (
        <div className="min-h-screen bg-canvas">
            <AppHeader />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 fade-up">
                <button onClick={() => navigate(`/${id}/responses`)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-ink mb-5 transition-colors">
                    <ArrowLeft className="w-4 h-4" />Responses
                </button>
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-plum mb-1">Response detail</p>
                        <h1 className="font-display text-2xl font-bold text-ink truncate">{form.title}</h1>
                    </div>
                    <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-colors shrink-0">
                        <Trash2 className="w-4 h-4" /><span className="hidden sm:inline">Delete</span>
                    </button>
                </div>

                <div className="bg-white border border-neutral-200 rounded-2xl p-4 mb-6 shadow-card">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Calendar, label: 'Date', value: formatDate(response.submittedAt) },
                            { icon: Clock, label: 'Time', value: formatTime(response.submittedAt) },
                            { icon: DeviceIcon, label: 'Device', value: getDeviceInfo().label },
                            { icon: Globe, label: 'IP Address', value: response.ipAddress || 'Unknown' },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-plum/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-plum" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-neutral-500">{label}</p>
                                    <p className="text-sm font-bold text-ink truncate">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {form.steps.map((step) => (
                        <div key={step.key}>
                            <h2 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />{step.title}
                            </h2>
                            <div className="space-y-4">
                                {step.sections.map((section) => (
                                    <div key={section.key} className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                                        <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                                            <h3 className="text-sm font-medium text-neutral-700">{section.title}</h3>
                                        </div>
                                        <div className="divide-y divide-neutral-100">
                                            {section.fields.map((field) => {
                                                const value = response.responses[field.key];
                                                const isEmpty = value == null || value === '';
                                                return (
                                                    <div key={field.key} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                                        <div className="sm:w-1/3 shrink-0">
                                                            <span className="text-sm text-neutral-500">
                                                                {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                                                            </span>
                                                        </div>
                                                        <div className="sm:flex-1">
                                                            <span className={`text-sm ${isEmpty ? 'text-neutral-400 italic' : 'text-neutral-900 '}`}>
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
