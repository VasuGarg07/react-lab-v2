import { Clock, Edit, Trash2, Archive, FolderInput } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { BLOGIFY_ROUTES, type Blog } from '../helpers/blog.constants';
import { calculateReadTime, truncateContent } from '../helpers/blog.utils';
import { formatRelativeTime } from '@react-lab/shared';
import { useAuthSelector } from '@react-lab/auth';
import OptionsMenu, { type MenuAction } from './OptionsMenu';
import { useModal, openAlertDialog, Select } from '@react-lab/ui';
import { useDeleteBlog, useArchiveBlog, useMoveBlog } from '../hooks/useBlogMutations';
import { useUserNotebooks } from '../hooks/useBlogQuery';

interface BlogCardProps {
    blog: Blog;
    variant?: 'default' | 'featured';
    notebookCover?: string;
}

export default function BlogCard({ blog, variant = 'default', notebookCover }: BlogCardProps) {
    const user = useAuthSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const deleteMutation = useDeleteBlog();
    const archiveMutation = useArchiveBlog();
    const moveMutation = useMoveBlog();
    const [moveTargetNotebook, setMoveTargetNotebook] = useState('');

    const { data: notebooksData } = useUserNotebooks(1, 100);

    const isOwner = user?.id === blog.userId;
    const readTime = calculateReadTime(blog.blogContent);
    const coverImage = notebookCover ?? null;
    const notebooks = notebooksData?.data ?? [];

    const handleEdit = () => navigate(BLOGIFY_ROUTES.BLOG_EDIT(blog.id));

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete blog',
            message: `Are you sure you want to delete "${blog.title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            onConfirm: () => deleteMutation.mutate(blog.id),
        });
    };

    const handleArchive = () => archiveMutation.mutate(blog.id);

    const handleMoveClick = () => {
        setMoveTargetNotebook('');
        modal.open(
            <div className="py-2">
                <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-1">Move blog</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">Select a notebook to move this blog to</p>
                <Select
                    label="Target Notebook"
                    options={notebooks.filter(n => n.id !== blog.notebookId).map(n => ({ label: n.title, value: n.id }))}
                    value={moveTargetNotebook}
                    onChange={setMoveTargetNotebook}
                    placeholder="Choose notebook..."
                />
                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={modal.close}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                        Cancel
                    </button>
                    <button type="button"
                        onClick={() => {
                            if (moveTargetNotebook) {
                                moveMutation.mutate({ blogId: blog.id, notebookId: moveTargetNotebook }, { onSuccess: modal.close });
                            }
                        }}
                        disabled={!moveTargetNotebook}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        Move
                    </button>
                </div>
            </div>
        );
    };

    const actions: MenuAction[] = [
        { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: handleEdit },
        { label: 'Move to...', icon: <FolderInput className="w-4 h-4" />, onClick: handleMoveClick },
        { label: blog.isArchived ? 'Unarchive' : 'Archive', icon: <Archive className="w-4 h-4" />, onClick: handleArchive },
        { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, onClick: handleDelete, variant: 'danger' as const },
    ];

    const cover = coverImage ? (
        <img src={coverImage} alt="" className="w-full h-full object-cover" />
    ) : (
        <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-800">
            <span className="font-serif text-2xl text-stone-300 dark:text-stone-600 select-none">
                {blog.title.charAt(0).toUpperCase()}
            </span>
        </div>
    );

    if (variant === 'featured') {
        return (
            <div className="w-56 shrink-0 relative group">
                <Link to={BLOGIFY_ROUTES.BLOG_DETAIL(blog.id)}>
                    <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 relative">
                        {coverImage
                            ? <img src={coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            : <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800">
                                <span className="font-serif text-5xl text-stone-400 dark:text-stone-500 select-none">
                                    {blog.title.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        }
                        <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            {blog.tags[0] && (
                                <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded-full">
                                    {blog.tags[0]}
                                </span>
                            )}
                            <h3 className="font-serif font-semibold text-white mt-2 leading-snug line-clamp-2 text-sm">{blog.title}</h3>
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-white/60">
                                <span>{blog.author}</span>
                                <span>·</span>
                                <Clock className="w-3 h-3" />
                                <span>{readTime} min</span>
                            </div>
                        </div>
                    </div>
                </Link>
                {isOwner && (
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <OptionsMenu actions={actions} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex gap-3 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 transition-colors group relative">
            <Link to={BLOGIFY_ROUTES.BLOG_DETAIL(blog.id)} className="flex gap-3 flex-1 min-w-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 self-center">{cover}</div>
                <div className="flex-1 min-w-0 py-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 mb-1.5">
                        <span className="font-medium text-stone-600 dark:text-stone-400">{blog.author}</span>
                        <span>·</span>
                        <span>{formatRelativeTime(blog.createdAt)}</span>
                    </div>
                    <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug text-[15px] group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                        {blog.title}
                    </h3>
                    <p className="text-xs text-stone-400 dark:text-stone-500 line-clamp-1 mt-1 leading-relaxed">
                        {truncateContent(blog.blogContent, 80)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />{readTime} min
                        </span>
                        {blog.tags[0] && (
                            <span className="px-2 py-0.5 text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded-full">
                                {blog.tags[0]}
                            </span>
                        )}
                        {blog.isArchived && (
                            <span className="px-2 py-0.5 text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-full">
                                Archived
                            </span>
                        )}
                    </div>
                </div>
            </Link>
            {isOwner && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity self-start pt-1">
                    <OptionsMenu actions={actions} />
                </div>
            )}
        </div>
    );
}
