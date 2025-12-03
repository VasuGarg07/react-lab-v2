import { useParams, Link, useNavigate } from 'react-router';
import { ChevronLeft, PenLine, Globe, Lock, Edit, Trash2 } from 'lucide-react';
import { useAppSelector } from '../../../store/useRedux';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { generateAvatarUrl } from '../helpers/blog.utils';
import { useNotebook, useBlogsByNotebook } from '../hooks/useBlogQuery';
import { useDeleteNotebook } from '../hooks/useBlogMutations';
import { usePagination } from '../hooks/usePagination';
import BlogGallery from '../components/BlogGallery';
import { formatDate } from '../../../shared/utilities';
import OptionsMenu, { type MenuAction } from '../components/OptionsMenu';
import { useModal } from '../../../components/ModalContext';
import { openAlertDialog } from '../../../ui/AlertDialog';

export default function NotebookDetail() {
    const { notebookId } = useParams<{ notebookId: string }>();
    const user = useAppSelector(state => state.auth.user);
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
    const isLoading = notebookLoading;

    const handleEdit = () => {
        navigate(BLOGIFY_ROUTES.NOTEBOOK_EDIT(notebook!.id));
    };

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete Notebook',
            message: (
                <div className="space-y-2">
                    <p>Are you sure you want to delete "{notebook?.title}"?</p>
                    <p className="text-red-600 dark:text-red-400 font-medium">
                        This will delete {blogCount} {blogCount === 1 ? 'blog' : 'blogs'} inside this notebook!
                    </p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => {
                deleteMutation.mutate(notebookId!, {
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!notebook) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Notebook not found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    This notebook may have been deleted or doesn't exist.
                </p>
                <Link
                    to={BLOGIFY_ROUTES.DISCOVER}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Go to Discover
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Link */}
            <Link
                to={isOwner ? BLOGIFY_ROUTES.LIBRARY : BLOGIFY_ROUTES.DISCOVER}
                className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                {isOwner ? 'Back to Library' : 'Back to Discover'}
            </Link>

            {/* Notebook Header */}
            <header className="space-y-4">
                {/* Cover Image */}
                <div className="aspect-video w-full max-w-2xl rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                    <img
                        src={notebook.coverImageUrl}
                        alt={notebook.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                {notebook.title}
                            </h1>
                            <span title={notebook.isPublic ? 'Public' : 'Private'}>
                                {notebook.isPublic ? (
                                    <Globe className="w-4 h-4 text-neutral-400" />
                                ) : (
                                    <Lock className="w-4 h-4 text-neutral-400" />
                                )}
                            </span>
                        </div>

                        {notebook.description && (
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl">
                                {notebook.description}
                            </p>
                        )}

                        {/* Author */}
                        <Link
                            to={BLOGIFY_ROUTES.NOTEBOOK_AUTHOR(notebook.author)}
                            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                                <img
                                    src={generateAvatarUrl(notebook.author)}
                                    alt={notebook.author}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                    {notebook.author}
                                </span>
                                <span className="text-neutral-500 dark:text-neutral-400 ml-2">
                                    · {formatDate(notebook.createdAt)}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Owner Actions */}
                    {isOwner && (
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                to={BLOGIFY_ROUTES.WRITE}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                            >
                                <PenLine className="w-4 h-4" />
                                <span className="hidden sm:inline">Write</span>
                            </Link>
                            <OptionsMenu actions={actions} />
                        </div>
                    )}
                </div>
            </header>

            {/* Blogs Section */}
            <section className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Blogs ({blogCount})
                </h2>

                <BlogGallery
                    blogs={blogs}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    isLoading={blogsLoading}
                    emptyMessage="No blogs in this notebook yet"
                    emptyDescription={isOwner ? "Start writing your first blog" : "Check back later"}
                />
            </section>
        </div>
    );
}