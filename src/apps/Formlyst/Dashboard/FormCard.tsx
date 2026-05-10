import { useNavigate } from 'react-router';
import { MoreVertical, Edit, Copy, Trash2, BarChart3, ToggleLeft, ToggleRight, Share2 } from 'lucide-react';
import type { Form } from '../helpers/types';
import { formatDate } from '../helpers/utils';
import { useModal } from '../../../components/ModalContext';
import ShareDialog from './ShareDialog';
import Dropdown from '../../../ui/Dropdown';

interface FormCardProps {
    form: Form;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

export default function FormCard({ form, onDuplicate, onDelete, onToggleStatus }: FormCardProps) {
    const navigate = useNavigate();
    const modal = useModal();

    const stepCount = form.steps.length;
    const fieldCount = form.steps.reduce(
        (sum, step) => sum + step.sections.reduce((sSum, sec) => sSum + sec.fields.length, 0),
        0
    );

    const handleShare = () => {
        modal.open(<ShareDialog formTitle={form.title} shareUrl={form.shareUrl} />);
    };

    return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {form.title}
                    </h3>
                    {form.description && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1.5">
                            {form.description}
                        </p>
                    )}
                </div>

                <span
                    className={`
                        shrink-0 px-2 py-0.5 text-xs font-medium rounded-full
                        ${form.isActive
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
                        }
                    `}
                >
                    {form.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                <span>{stepCount} {stepCount === 1 ? 'step' : 'steps'}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                <span>{fieldCount} {fieldCount === 1 ? 'field' : 'fields'}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                <span>{form.responseCount} {form.responseCount === 1 ? 'response' : 'responses'}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-700">
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    Updated {formatDate(form.updatedAt)}
                </span>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => navigate(`/formlyst/${form.id}/edit`)}
                        className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </button>

                    <button
                        onClick={handleShare}
                        className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                        title="Share"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => navigate(`/formlyst/${form.id}/responses`)}
                        className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                        title="View Responses"
                    >
                        <BarChart3 className="w-4 h-4" />
                    </button>

                    <Dropdown
                        trigger={
                            <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        }
                        items={[
                            {
                                label: form.isActive ? 'Deactivate' : 'Activate',
                                icon: form.isActive ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />,
                                onClick: () => onToggleStatus(form.id),
                            },
                            {
                                label: 'Duplicate',
                                icon: <Copy className="w-4 h-4" />,
                                onClick: () => onDuplicate(form.id),
                            },
                            {
                                label: 'Delete',
                                icon: <Trash2 className="w-4 h-4" />,
                                onClick: () => onDelete(form.id),
                                destructive: true,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}