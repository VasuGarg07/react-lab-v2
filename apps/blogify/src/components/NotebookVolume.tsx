import { BookOpen, Edit, Globe, Lock, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { BLOGIFY_ROUTES, type Notebook } from '../helpers/blog.constants';
import { useAuthSelector } from '@react-lab/auth';
import OptionsMenu, { type MenuAction } from './OptionsMenu';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { useDeleteNotebook } from '../hooks/useBlogMutations';

interface NotebookVolumeProps {
    notebook: Notebook;
    showAuthor?: boolean;
}

/**
 * A notebook rendered as a bound volume — cover face, a dark spine on the left,
 * fore-edge "pages" on the right. The core metaphor of the app: a notebook is a
 * book that composes many blog pieces together.
 */
export default function NotebookVolume({ notebook, showAuthor = true }: NotebookVolumeProps) {
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
                    <p>Are you sure you want to delete “{notebook.title}”?</p>
                    <p className="text-red-600 font-medium">This will also delete all blogs inside this notebook.</p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => deleteMutation.mutate(notebook.id, { onSuccess: () => navigate(BLOGIFY_ROUTES.LIBRARY) }),
        });
    };

    const actions: MenuAction[] = [
        { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: handleEdit },
        { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, onClick: handleDelete, variant: 'danger' as const },
    ];

    return (
        <div className="relative group w-full">
            <Link to={BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id)} className="block">
                {/* The volume */}
                <div className="relative aspect-4/5 rounded-r-lg rounded-l-sm book-shadow transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:-rotate-1">
                    {/* fore-edge pages peeking on the right */}
                    <div className="book-pages absolute right-0 top-1.5 bottom-1.5 w-2 rounded-r-sm" />

                    {/* cover */}
                    <div className="absolute inset-0 right-1.5 rounded-r-md rounded-l-sm overflow-hidden bg-stone-300">
                        {notebook.coverImageUrl ? (
                            <img
                                src={notebook.coverImageUrl}
                                alt={notebook.title}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full grid place-items-center bg-onyx">
                                <span className="font-serif text-5xl text-beige/80 select-none">
                                    {notebook.title.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}

                        {/* ink wash for legibility + spine shading */}
                        <div className="absolute inset-0 bg-linear-to-t from-onyx/85 via-onyx/15 to-transparent" />
                        <div className="absolute inset-y-0 left-0 w-5 bg-linear-to-r from-black/40 to-transparent" />
                        {/* spine seam */}
                        <div className="absolute inset-y-0 left-2.5 w-px bg-white/15" />

                        {/* title block on the cover */}
                        <div className="absolute inset-x-0 bottom-0 p-4 pl-5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-beige/70 mb-1.5">
                                {notebook.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                Notebook
                            </span>
                            <h3 className="font-serif text-lg font-semibold text-beige leading-tight line-clamp-3 drop-shadow-sm">
                                {notebook.title}
                            </h3>
                        </div>

                        {/* hover affordance */}
                        <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-beige/95 text-onyx text-xs font-bold shadow-lg">
                                <BookOpen className="w-3.5 h-3.5" /> Open
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            {showAuthor && (
                <p className="mt-3 px-0.5 text-xs font-medium text-stone-500 truncate">
                    by <span className="text-stone-700">{notebook.author}</span>
                </p>
            )}

            {isOwner && (
                <div className="absolute top-2 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <OptionsMenu actions={actions} />
                </div>
            )}
        </div>
    );
}
