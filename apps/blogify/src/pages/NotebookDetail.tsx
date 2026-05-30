import { useParams, Link, useNavigate } from 'react-router';
import { ChevronLeft, PenLine, Globe, Lock, Edit, Trash2 } from 'lucide-react';
import { useAuthSelector } from '@react-lab/auth';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { generateAvatarUrl } from '../helpers/blog.utils';
import { useNotebook, useBlogsByNotebook } from '../hooks/useBlogQuery';
import { useDeleteNotebook } from '../hooks/useBlogMutations';
import { usePagination } from '../hooks/usePagination';
import BlogGallery from '../components/BlogGallery';
import { formatDate } from '@react-lab/shared';
import OptionsMenu, { type MenuAction } from '../components/OptionsMenu';
import { useModal, openAlertDialog } from '@react-lab/ui';

export default function NotebookDetail() {
    const { notebookId } = useParams<{ notebookId: string }>();
    const user = useAuthSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const { currentPage, setPage } = usePagination();

    const { data: notebook, isLoading: notebookLoading } = useNotebook(notebookId!);
    const { data: blogsData, isLoading: blogsLoading } = useBlogsByNotebook(notebookId!, currentPage, 10);
    const deleteMutation = useDeleteNotebook();

    const blogs = blogsData?.data ?? [];
    const totalPages = blogsData?.pagination.totalPages ?? 1;
    const blogCount = blogsData?.pagination.totalItems ?? 0;
    const isOwner = user?.id === notebook?.userId;

    const handleEdit = () => navigate(BLOGIFY_ROUTES.NOTEBOOK_EDIT(notebook!.id));

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete notebook',
            message: (
                <div className="space-y-2">
                    <p>Are you sure you want to delete "{notebook?.title}"?</p>
                    <p className="text-red-600 dark:text-red-400 font-medium">
                        This will delete {blogCount} {blogCount === 1 ? 'blog' : 'blogs'} inside this notebook.
                    </p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => deleteMutation.mutate(notebookId!, { onSuccess: () => navigate(BLOGIFY_ROUTES.LIBRARY) }),
        });
    };

    const actions: MenuAction[] = [
        { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: handleEdit },
        { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, onClick: handleDelete, variant: 'danger' as const },
    ];

    if (notebookLoading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="w-7 h-7 border-2 border-stone-200 dark:border-stone-700 border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin" />
            </div>
        );
    }

    if (!notebook) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 text-center">
                <p className="font-serif text-xl text-stone-800 dark:text-stone-200 mb-2">Notebook not found</p>
                <p className="text-sm text-stone-400 dark:text-stone-500 mb-6">This notebook may have been deleted or doesn't exist.</p>
                <Link to={BLOGIFY_ROUTES.DISCOVER} className="text-sm text-stone-600 dark:text-stone-400 underline underline-offset-4 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                    Go to Discover
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Link
                to={isOwner ? BLOGIFY_ROUTES.LIBRARY : BLOGIFY_ROUTES.DISCOVER}
                className="inline-flex items-center gap-1 text-sm text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                {isOwner ? 'Back to library' : 'Back to discover'}
            </Link>

            <header className="space-y-6">
                <div className="aspect-21/9 w-full rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <img src={notebook.coverImageUrl} alt={notebook.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                            <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 leading-tight">{notebook.title}</h1>
                            <span title={notebook.isPublic ? 'Public' : 'Private'} className="shrink-0">
                                {notebook.isPublic
                                    ? <Globe className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                                    : <Lock className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                                }
                            </span>
                        </div>

                        {notebook.description && (
                            <p className="text-stone-500 dark:text-stone-400 leading-relaxed">{notebook.description}</p>
                        )}

                        <Link to={BLOGIFY_ROUTES.NOTEBOOK_AUTHOR(notebook.author)} className="inline-flex items-center gap-2.5 hover:opacity-75 transition-opacity">
                            <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                                <img src={generateAvatarUrl(notebook.author)} alt={notebook.author} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{notebook.author}</span>
                            <span className="text-stone-300 dark:text-stone-600">·</span>
                            <span className="text-sm text-stone-400 dark:text-stone-500">{formatDate(notebook.createdAt)}</span>
                        </Link>
                    </div>

                    {isOwner && (
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                to={BLOGIFY_ROUTES.WRITE}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-medium hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
                            >
                                <PenLine className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Write</span>
                            </Link>
                            <OptionsMenu actions={actions} />
                        </div>
                    )}
                </div>
            </header>

            <section className="space-y-4 pt-6 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-baseline gap-2">
                    <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">Blogs</h2>
                    <span className="text-sm text-stone-400 dark:text-stone-500">{blogCount}</span>
                </div>
                <BlogGallery
                    blogs={blogs}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    isLoading={blogsLoading}
                    emptyMessage="No blogs yet"
                    emptyDescription={isOwner ? 'Start writing your first blog' : 'Check back later'}
                />
            </section>
        </div>
    );
}
