import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, FileText, Loader2, Search, LayoutGrid, FileStack, Radio, Inbox } from 'lucide-react';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { useForms } from '../hooks/useFormQueries';
import { useCreateForm, useDeleteForm, useDuplicateForm, useToggleFormStatus } from '../hooks/useFormMutations';
import AppHeader from '../components/AppHeader';
import FormCard from './FormCard';
import TemplateDialog from './TemplateDialog';
import type { FormTemplate } from '../helpers/templates';

type Filter = 'all' | 'active' | 'inactive';

export default function Dashboard() {
    const navigate = useNavigate();
    const modal = useModal();
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<Filter>('all');

    const { data: forms, isLoading, error } = useForms();
    const createForm = useCreateForm();
    const deleteForm = useDeleteForm();
    const duplicateForm = useDuplicateForm();
    const toggleStatus = useToggleFormStatus();

    const handleCreate = (template: FormTemplate) => {
        createForm.mutate(template.config, {
            onSuccess: (form) => { modal.close(); navigate(`/${form.id}/edit`); },
        });
    };

    const handleDelete = (id: string) => {
        openAlertDialog(modal, {
            title: 'Delete Form',
            message: 'This will permanently delete the form and all its responses. This action cannot be undone.',
            confirmText: 'Delete',
            onConfirm: () => deleteForm.mutate(id),
        });
    };

    const openTemplateDialog = () => modal.open(<TemplateDialog onCreate={handleCreate} isLoading={createForm.isPending} />);

    const stats = useMemo(() => {
        const list = forms ?? [];
        return {
            total: list.length,
            active: list.filter((f) => f.isActive).length,
            responses: list.reduce((sum, f) => sum + (f.responseCount ?? 0), 0),
        };
    }, [forms]);

    const visibleForms = useMemo(() => {
        let list = forms ?? [];
        if (filter !== 'all') list = list.filter((f) => (filter === 'active' ? f.isActive : !f.isActive));
        const q = query.trim().toLowerCase();
        if (q) list = list.filter((f) => f.title.toLowerCase().includes(q) || (f.description ?? '').toLowerCase().includes(q));
        return list;
    }, [forms, filter, query]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-canvas">
                <AppHeader />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-6 h-6 text-plum animate-spin" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-canvas">
                <AppHeader />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <p className="text-neutral-600 mb-3">Unable to load forms</p>
                    <button onClick={() => window.location.reload()} className="text-sm font-semibold text-plum hover:underline">Try again</button>
                </div>
            </div>
        );
    }

    const hasForms = (forms?.length ?? 0) > 0;
    const STAT_CARDS = [
        { label: 'Forms', value: stats.total, icon: FileStack },
        { label: 'Active', value: stats.active, icon: Radio },
        { label: 'Responses', value: stats.responses, icon: Inbox },
    ];

    return (
        <div className="min-h-screen bg-canvas">
            <AppHeader />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 fade-up">
                {/* Hero */}
                <section className="relative overflow-hidden rounded-3xl bg-ink text-white p-6 sm:p-8 mb-8">
                    <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-plum/30 blur-3xl pointer-events-none" />
                    <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Workspace</p>
                            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">Your forms</h1>
                            <p className="text-sm text-white/60 mt-2">
                                {hasForms ? 'Build, share, and collect — all in one place.' : 'Create your first form to start collecting responses.'}
                            </p>
                        </div>
                        <button
                            onClick={openTemplateDialog}
                            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl bg-plum text-white hover:bg-plum-600 shadow-pop transition-colors shrink-0"
                        >
                            <Plus className="w-4 h-4" />New Form
                        </button>
                    </div>

                    {hasForms && (
                        <div className="relative grid grid-cols-3 gap-3 mt-8 max-w-md">
                            {STAT_CARDS.map(({ label, value, icon: Icon }) => (
                                <div key={label} className="rounded-2xl bg-white/6 border border-white/10 p-3.5">
                                    <Icon className="w-4 h-4 text-white/50 mb-2" strokeWidth={2} />
                                    <p className="font-display text-2xl font-bold tabular-nums leading-none">{value}</p>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50 mt-1.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {hasForms ? (
                    <>
                        {/* Toolbar: search + filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search forms…"
                                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-white text-ink placeholder:text-neutral-400 focus:outline-none focus:border-plum focus:ring-2 focus:ring-plum/15 transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 border border-neutral-200 w-fit">
                                {(['all', 'active', 'inactive'] as Filter[]).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                                            filter === f ? 'bg-white text-ink shadow-sm' : 'text-neutral-500 hover:text-ink'
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {visibleForms.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {visibleForms.map((form) => (
                                    <FormCard
                                        key={form.id}
                                        form={form}
                                        onDuplicate={(id) => duplicateForm.mutate(id)}
                                        onDelete={handleDelete}
                                        onToggleStatus={(id) => toggleStatus.mutate(id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-100 grid place-items-center mb-3">
                                    <LayoutGrid className="w-5 h-5 text-neutral-400" />
                                </div>
                                <p className="text-sm font-semibold text-ink">No forms match your search</p>
                                <p className="text-sm text-neutral-500 mt-1">Try a different term or filter.</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-card grid place-items-center mb-5">
                            <FileText className="w-7 h-7 text-plum" strokeWidth={1.75} />
                        </div>
                        <h2 className="font-display text-xl font-bold text-ink mb-1.5">No forms yet</h2>
                        <p className="text-sm text-neutral-500 mb-6 max-w-xs">
                            Create your first form to start collecting responses.
                        </p>
                        <button
                            onClick={openTemplateDialog}
                            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl bg-plum text-white hover:bg-plum-600 shadow-pop transition-colors"
                        >
                            <Plus className="w-4 h-4" />Create Form
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
