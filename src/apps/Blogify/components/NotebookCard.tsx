import { BookOpen, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { BLOGIFY_ROUTES, type Notebook } from '../helpers/blog.constants';
import { useAppSelector } from '../../../store/useRedux';
import OptionsMenu, { type MenuAction } from './OptionsMenu';
import { useModal } from '../../../components/ModalContext';
import { openAlertDialog } from '../../../ui/AlertDialog';
import { useDeleteNotebook } from '../hooks/useBlogMutations';

interface NotebookCardProps {
    notebook: Notebook;
    showAuthor?: boolean;
}

export default function NotebookCard({ notebook, showAuthor = true }: NotebookCardProps) {
    const user = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const deleteMutation = useDeleteNotebook();

    const isOwner = user?.id === notebook.userId;

    const handleEdit = () => {
        navigate(BLOGIFY_ROUTES.NOTEBOOK_EDIT(notebook.id));
    };

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete Notebook',
            message: (
                <div className="space-y-2">
                    <p>Are you sure you want to delete "{notebook.title}"?</p>
                    <p className="text-red-600 dark:text-red-400 font-medium">
                        This will also delete all blogs inside this notebook!
                    </p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => {
                deleteMutation.mutate(notebook.id, {
                    onSuccess: () => {
                        navigate(BLOGIFY_ROUTES.LIBRARY);
                    },
                });
            },
        });
    };

    const actions: MenuAction[] = [
        {
            label: 'Edit',
            icon: <Edit className="w-4 h-4" />,
            onClick: handleEdit,
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: handleDelete,
            variant: 'danger' as const,
        },
    ];

    return (
        <div className={`max-w-80 shrink-0 relative group`}>
            <Link to={BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id)}>
                {/* Cover Image */}
                <div className="aspect-square rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 shadow-md group-hover:shadow-xl transition-all duration-300 relative">
                    <img
                        src={notebook.coverImageUrl}
                        alt={notebook.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover overlay with icon */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-100 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <BookOpen className="w-5 h-5 text-neutral-900" />
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="mt-3 space-y-1">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                        {notebook.title}
                    </h3>
                    {showAuthor && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                            {notebook.author}
                        </p>
                    )}
                </div>
            </Link>

            {/* Options Menu */}
            {isOwner && (
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <OptionsMenu actions={actions} />
                </div>
            )}
        </div>
    );
}