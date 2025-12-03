import { Clock, Edit, Trash2, Archive, FolderInput } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { BLOGIFY_ROUTES, type Blog } from '../helpers/blog.constants';
import { calculateReadTime, truncateContent } from '../helpers/blog.utils';
import { formatRelativeTime } from '../../../shared/utilities';
import { useAppSelector } from '../../../store/useRedux';
import OptionsMenu, { type MenuAction } from './OptionsMenu';
import { useModal } from '../../../components/ModalContext';
import { openAlertDialog } from '../../../ui/AlertDialog';
import { useDeleteBlog, useArchiveBlog, useMoveBlog } from '../hooks/useBlogMutations';
import { useUserNotebooks } from '../hooks/useBlogQuery';
import Select from '../../../ui/Select';

interface BlogCardProps {
    blog: Blog;
    variant?: 'default' | 'featured';
    notebookCover?: string;
}

export default function BlogCard({ blog, variant = 'default', notebookCover }: BlogCardProps) {
    const user = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const deleteMutation = useDeleteBlog();
    const archiveMutation = useArchiveBlog();
    const moveMutation = useMoveBlog();
    const [moveTargetNotebook, setMoveTargetNotebook] = useState('');

    const { data: notebooksData } = useUserNotebooks(1, 100);

    const isOwner = user?.id === blog.userId;
    const readTime = calculateReadTime(blog.blogContent);
    const coverImage = notebookCover || 'https://placehold.co/400x400/e5e5e5/737373?text=Blog';
    const notebooks = notebooksData?.data ?? [];

    const handleEdit = () => {
        navigate(BLOGIFY_ROUTES.BLOG_EDIT(blog.id));
    };

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete Blog',
            message: `Are you sure you want to delete "${blog.title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            onConfirm: () => deleteMutation.mutate(blog.id),
        });
    };

    const handleArchive = () => {
        archiveMutation.mutate(blog.id);
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
                        .filter(n => n.id !== blog.notebookId)
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
                                    { blogId: blog.id, notebookId: moveTargetNotebook },
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
            label: blog.isArchived ? 'Unarchive' : 'Archive',
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

    // Featured variant - large card with overlay
    if (variant === 'featured') {
        return (
            <div className="w-80 shrink-0 relative group">
                <Link to={BLOGIFY_ROUTES.BLOG_DETAIL(blog.id)}>
                    <div className="aspect-4/3 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700 relative">
                        <img
                            src={coverImage}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            {blog.tags[0] && (
                                <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                                    {blog.tags[0]}
                                </span>
                            )}
                            <h3 className="font-semibold mt-2 line-clamp-2">{blog.title}</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
                                <span>{blog.author}</span>
                                <span>·</span>
                                <span>{readTime} min</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Options Menu */}
                {isOwner && (
                    <div className="absolute top-2 right-2 z-10">
                        <OptionsMenu actions={actions} />
                    </div>
                )}
            </div>
        );
    }

    // Default variant - horizontal card
    return (
        <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm transition-all duration-200 group relative">
            <Link to={BLOGIFY_ROUTES.BLOG_DETAIL(blog.id)} className="flex gap-4 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                    {/* Author & Date */}
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">
                            {blog.author}
                        </span>
                        <span>·</span>
                        <span>{formatRelativeTime(blog.createdAt)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                        {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1.5">
                        {truncateContent(blog.blogContent, 120)}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime} min
                        </span>
                        {blog.tags[0] && (
                            <span className="px-2 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-md">
                                {blog.tags[0]}
                            </span>
                        )}
                        {blog.isArchived && (
                            <span className="px-2 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-md">
                                Draft
                            </span>
                        )}
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="w-28 h-28 rounded-lg bg-neutral-100 dark:bg-neutral-700 overflow-hidden shrink-0">
                    <img
                        src={coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            {/* Options Menu */}
            {isOwner && (
                <div className="absolute top-2 right-2">
                    <OptionsMenu actions={actions} />
                </div>
            )}
        </div>
    );
}