import { BookOpen, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { BLOGIFY_ROUTES, type Notebook } from '../helpers/blog.constants';
import { useAuthSelector } from '@react-lab/auth';
import OptionsMenu, { type MenuAction } from './OptionsMenu';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { useDeleteNotebook } from '../hooks/useBlogMutations';

interface NotebookCardProps {
    notebook: Notebook;
    showAuthor?: boolean;
}

export default function NotebookCard({ notebook, showAuthor = true }: NotebookCardProps) {
    const user = useAuthSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const deleteMutation = useDeleteNotebook();

    const isOwner = user?.id === notebook.userId;

    const handleEdit = () => navigate(BLOGIFY_ROUTES.NOTEBOOK_EDIT(notebook.id));

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete notebook',
            message: (
                <div className="space-y-2">
                    <p>Are you sure you want to delete"{notebook.title}"?</p>
                    <p className="text-red-600 font-medium">
                        This will also delete all blogs inside this notebook.
                    </p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => deleteMutation.mutate(notebook.id, {
                onSuccess: () => navigate(BLOGIFY_ROUTES.LIBRARY),
            }),
        });
    };

    const actions: MenuAction[] = [
        { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: handleEdit },
        { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, onClick: handleDelete, variant: 'danger' as const },
    ];

    return (
        <div className="relative group">
            <Link to={BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id)}>
                <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-200 relative">
                    {notebook.coverImageUrl ? (
                        <img src={notebook.coverImageUrl} alt={notebook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="font-serif text-4xl text-stone-400 select-none">
                                {notebook.title.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                            <BookOpen className="w-4 h-4 text-stone-900" />
                        </div>
                    </div>
                </div>
                <div className="mt-2.5 px-0.5">
                    <h3 className="font-serif text-sm font-medium text-stone-900 truncate leading-snug">
                        {notebook.title}
                    </h3>
                    {showAuthor && (
                        <p className="text-xs text-stone-400 mt-0.5 truncate">{notebook.author}</p>
                    )}
                </div>
            </Link>
            {isOwner && (
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <OptionsMenu actions={actions} />
                </div>
            )}
        </div>
    );
}
