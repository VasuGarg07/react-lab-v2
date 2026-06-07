import { useNavigate } from 'react-router';
import { MoreVertical, Edit, Copy, Trash2, BarChart3, ToggleLeft, ToggleRight, Share2, Layers, ToggleLeft as FieldIcon, Inbox } from 'lucide-react';
import { useState } from 'react';
import type { Form } from '../helpers/types';
import { formatDate } from '../helpers/utils';
import { useModal } from '@react-lab/ui';
import ShareDialog from './ShareDialog';

interface FormCardProps {
    form: Form;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

export default function FormCard({ form, onDuplicate, onDelete, onToggleStatus }: FormCardProps) {
    const navigate = useNavigate();
    const modal = useModal();
    const [menuOpen, setMenuOpen] = useState(false);

    const stepCount = form.steps.length;
    const fieldCount = form.steps.reduce(
        (sum, step) => sum + step.sections.reduce((sSum, sec) => sSum + sec.fields.length, 0), 0
    );

    const handleShare = () => modal.open(<ShareDialog formTitle={form.title} shareUrl={form.shareUrl} />);

    const stats = [
        { icon: Layers, value: stepCount, label: stepCount === 1 ? 'step' : 'steps' },
        { icon: FieldIcon, value: fieldCount, label: fieldCount === 1 ? 'field' : 'fields' },
        { icon: Inbox, value: form.responseCount, label: form.responseCount === 1 ? 'response' : 'responses' },
    ];

    return (
        <div className="group relative flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200">
            {/* Accent rail — plum when active, muted otherwise */}
            <span className={`absolute inset-x-0 top-0 h-1 ${form.isActive ? 'bg-linear-to-r from-plum to-violet-500' : 'bg-neutral-200'}`} />

            <button
                onClick={() => navigate(`/${form.id}/edit`)}
                className="text-left p-5 pt-6 flex-1"
            >
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-bold text-ink leading-snug line-clamp-1 group-hover:text-plum transition-colors">
                        {form.title}
                    </h3>
                    <span className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold rounded-full ${
                        form.isActive ? 'bg-success-50 text-success' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${form.isActive ? 'bg-success' : 'bg-neutral-400'}`} />
                        {form.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>

                <p className="text-sm text-neutral-500 line-clamp-2 min-h-10">
                    {form.description || 'No description'}
                </p>

                <div className="flex items-center gap-4 mt-4">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <span key={label} className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                            <Icon className="w-3.5 h-3.5 text-neutral-400" strokeWidth={2} />
                            <span className="font-bold text-ink tabular-nums">{value}</span> {label}
                        </span>
                    ))}
                </div>
            </button>

            <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-100 bg-neutral-50/50">
                <span className="text-xs text-neutral-400">Updated {formatDate(form.updatedAt)}</span>

                <div className="flex items-center gap-0.5">
                    <button onClick={handleShare} className="p-2 text-neutral-400 hover:text-plum hover:bg-plum/8 rounded-lg transition-colors" title="Share">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => navigate(`/${form.id}/responses`)} className="p-2 text-neutral-400 hover:text-plum hover:bg-plum/8 rounded-lg transition-colors" title="View Responses">
                        <BarChart3 className="w-4 h-4" />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                            className="p-2 text-neutral-400 hover:text-ink hover:bg-neutral-100 rounded-lg transition-colors"
                            title="More"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 bottom-full mb-1 w-44 bg-white border border-neutral-200 rounded-xl shadow-lift py-1.5 z-10 scale-in origin-bottom-right">
                                <button onClick={() => navigate(`/${form.id}/edit`)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-ink transition-colors">
                                    <Edit className="w-4 h-4 text-neutral-400" />Edit
                                </button>
                                <button onClick={() => onToggleStatus(form.id)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-ink transition-colors">
                                    {form.isActive ? <ToggleLeft className="w-4 h-4 text-neutral-400" /> : <ToggleRight className="w-4 h-4 text-neutral-400" />}
                                    {form.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button onClick={() => onDuplicate(form.id)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-ink transition-colors">
                                    <Copy className="w-4 h-4 text-neutral-400" />Duplicate
                                </button>
                                <div className="my-1 border-t border-neutral-100" />
                                <button onClick={() => onDelete(form.id)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                    <Trash2 className="w-4 h-4" />Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
