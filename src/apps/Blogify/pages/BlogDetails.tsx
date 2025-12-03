import { Archive, BookOpen, Calendar, ChevronLeft, Clock, Edit, FolderInput, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useModal } from '../../../components/ModalContext';
import { formatDate, markdownToHtml } from '../../../shared/utilities';
import { useAppSelector } from '../../../store/useRedux';
import { openAlertDialog } from '../../../ui/AlertDialog';
import Select from '../../../ui/Select';
import BlogCard from '../components/BlogCard';
import OptionsMenu, { type MenuAction } from '../components/OptionsMenu';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { calculateReadTime, generateAvatarUrl } from '../helpers/blog.utils';
import { useArchiveBlog, useDeleteBlog, useMoveBlog } from '../hooks/useBlogMutations';
import { useBlog, useNotebook, useRelatedBlogs, useUserNotebooks } from '../hooks/useBlogQuery';

export default function BlogDetail() {
    const { blogId } = useParams<{ blogId: string }>();
    const user = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const [moveTargetNotebook, setMoveTargetNotebook] = useState('');

    const { data: blog, isLoading: blogLoading } = useBlog(blogId!);
    const { data: relatedBlogs } = useRelatedBlogs(blogId!);
    const { data: notebook } = useNotebook(blog?.notebookId!);
    const { data: notebooksData } = useUserNotebooks(1, 100);

    const deleteMutation = useDeleteBlog();
    const archiveMutation = useArchiveBlog();
    const moveMutation = useMoveBlog();

    const isOwner = user?.id === blog?.userId;
    const readTime = blog ? calculateReadTime(blog.blogContent) : 0;
    const notebooks = notebooksData?.data ?? [];

    const handleEdit = () => {
        navigate(BLOGIFY_ROUTES.BLOG_EDIT(blog!.id));
    };

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete Blog',
            message: `Are you sure you want to delete "${blog?.title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            onConfirm: () => {
                deleteMutation.mutate(blogId!, {
                    onSuccess: () => {
                        navigate(BLOGIFY_ROUTES.LIBRARY);
                    },
                });
            },
        });
    };

    const handleArchive = () => {
        archiveMutation.mutate(blogId!);
    };

    const handleMoveClick = () => {
        modal.open(
            <div className="py-2">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Move Blog
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Select a notebook to move this blog to
                </p>
                <Select
                    label="Target Notebook"
                    options={notebooks
                        .filter(n => n.id !== blog?.notebookId)
                        .map(n => ({ label: n.title, value: n.id }))}
                    value={moveTargetNotebook}
                    onChange={setMoveTargetNotebook}
                    placeholder="Choose notebook..."
                />
                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={modal.close}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (moveTargetNotebook) {
                                moveMutation.mutate(
                                    { blogId: blogId!, notebookId: moveTargetNotebook },
                                    {
                                        onSuccess: () => {
                                            modal.close();
                                            setMoveTargetNotebook('');
                                        },
                                    }
                                );
                            }
                        }}
                        disabled={!moveTargetNotebook}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Move
                    </button>
                </div>
            </div>
        );
    };

    const actions: MenuAction[] = [
        {
            label: 'Edit',
            icon: <Edit className="w-4 h-4" />,
            onClick: handleEdit,
        },
        {
            label: 'Move to...',
            icon: <FolderInput className="w-4 h-4" />,
            onClick: handleMoveClick,
        },
        {
            label: blog?.isArchived ? 'Unarchive' : 'Archive',
            icon: <Archive className="w-4 h-4" />,
            onClick: handleArchive,
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: handleDelete,
            variant: 'danger' as const,
        },
    ];

    if (blogLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Blog not found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    This blog may have been deleted or doesn't exist.
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
        <div className="space-y-8">
            {/* Back Link */}
            <Link
                to={notebook ? BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id) : BLOGIFY_ROUTES.DISCOVER}
                className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                {notebook ? `Back to ${notebook.title}` : 'Back'}
            </Link>

            {/* Blog Header */}
            <header className="space-y-4">
                {/* Title */}
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {blog.title}
                </h1>

                {/* Tags */}
                {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg"
                            >
                                {tag}
                            </span>
                        ))}
                        {blog.isArchived && (
                            <span className="px-3 py-1 text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg">
                                Draft
                            </span>
                        )}
                    </div>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                    {/* Author Info */}
                    <Link
                        to={BLOGIFY_ROUTES.BLOG_AUTHOR(blog.author)}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                            <img
                                src={generateAvatarUrl(blog.author)}
                                alt={blog.author}
                                className="w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                {blog.author}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDate(blog.createdAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {readTime} min read
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Owner Actions */}
                    {isOwner && <OptionsMenu actions={actions} />}
                </div>

                {/* Notebook Link */}
                {notebook && (
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id)}
                        className="inline-flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                            <img
                                src={notebook.coverImageUrl}
                                alt={notebook.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">From notebook</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                                {notebook.title}
                            </p>
                        </div>
                        <BookOpen className="w-5 h-5 text-neutral-400" />
                    </Link>
                )}
            </header>

            {/* Blog Content */}
            <article
                className="markdown"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(blog.blogContent) }}
            />

            {/* Related Blogs */}
            {relatedBlogs && relatedBlogs.length > 0 && (
                <section className="space-y-4 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Related Blogs
                    </h2>
                    <div className="space-y-3">
                        {relatedBlogs.map(relatedBlog => (
                            <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}