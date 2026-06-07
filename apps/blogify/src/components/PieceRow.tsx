import { Clock } from 'lucide-react';
import { Link } from 'react-router';
import { BLOGIFY_ROUTES, type Blog } from '../helpers/blog.constants';
import { calculateReadTime, truncateContent } from '../helpers/blog.utils';
import { formatRelativeTime } from '@react-lab/shared';
import { useAuthSelector } from '@react-lab/auth';
import OptionsMenu, { type MenuAction } from './OptionsMenu';
import { useModal, openAlertDialog, Select } from '@react-lab/ui';
import { useArchiveBlog, useDeleteBlog, useMoveBlog } from '../hooks/useBlogMutations';
import { useUserNotebooks } from '../hooks/useBlogQuery';
import { useState } from 'react';
import { Edit, Archive, FolderInput, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';

interface PieceRowProps {
    blog: Blog;
    /** 1-based index shown as a table-of-contents number. */
    index?: number;
    showExcerpt?: boolean;
}

/**
 * A blog rendered as a line in a table of contents:
 *   01 — Title ································· author · 5 min
 * The editorial "piece inside a notebook" unit.
 */
export default function PieceRow({ blog, index, showExcerpt = true }: PieceRowProps) {
    const user = useAuthSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const deleteMutation = useDeleteBlog();
    const archiveMutation = useArchiveBlog();
    const moveMutation = useMoveBlog();
    const [moveTarget, setMoveTarget] = useState('');
    const { data: notebooksData } = useUserNotebooks(1, 100);

    const isOwner = user?.id === blog.userId;
    const readTime = calculateReadTime(blog.blogContent);
    const notebooks = notebooksData?.data ?? [];

    const handleMoveClick = () => {
        setMoveTarget('');
        modal.open(
            <div className="py-2">
                <h3 className="font-serif text-lg text-stone-900 mb-1">Move blog</h3>
                <p className="text-sm text-stone-500 mb-4">Select a notebook to move this blog to</p>
                <Select
                    label="Target Notebook"
                    options={notebooks.filter(n => n.id !== blog.notebookId).map(n => ({ label: n.title, value: n.id }))}
                    value={moveTarget}
                    onChange={setMoveTarget}
                    placeholder="Choose notebook..."
                />
                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={modal.close}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors">
                        Cancel
                    </button>
                    <button type="button"
                        onClick={() => { if (moveTarget) moveMutation.mutate({ blogId: blog.id, notebookId: moveTarget }, { onSuccess: modal.close }); }}
                        disabled={!moveTarget}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-onyx text-beige hover:opacity-90 transition-opacity disabled:opacity-40">
                        Move
                    </button>
                </div>
            </div>
        );
    };

    const actions: MenuAction[] = [
        { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: () => navigate(BLOGIFY_ROUTES.BLOG_EDIT(blog.id)) },
        { label: 'Move to...', icon: <FolderInput className="w-4 h-4" />, onClick: handleMoveClick },
        { label: blog.isArchived ? 'Unarchive' : 'Archive', icon: <Archive className="w-4 h-4" />, onClick: () => archiveMutation.mutate(blog.id) },
        {
            label: 'Delete', icon: <Trash2 className="w-4 h-4" />, variant: 'danger' as const,
            onClick: () => openAlertDialog(modal, {
                title: 'Delete blog',
                message: `Are you sure you want to delete “${blog.title}”? This action cannot be undone.`,
                confirmText: 'Delete',
                onConfirm: () => deleteMutation.mutate(blog.id),
            }),
        },
    ];

    return (
        <div className="group relative flex items-baseline gap-4 py-4 border-b border-stone-200/70 last:border-0 hover:border-stone-300 transition-colors">
            {index !== undefined && (
                <span className="font-serif text-sm text-stone-400 tabular-nums shrink-0 w-7 pt-0.5 group-hover:text-navy transition-colors">
                    {String(index).padStart(2, '0')}
                </span>
            )}

            <Link to={BLOGIFY_ROUTES.BLOG_DETAIL(blog.id)} className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 leading-snug truncate group-hover:text-navy transition-colors">
                        {blog.title}
                    </h3>
                    <span className="hidden sm:flex items-center gap-1 text-xs text-stone-400 shrink-0 tabular-nums">
                        <Clock className="w-3 h-3" />{readTime} min
                    </span>
                </div>
                {showExcerpt && (
                    <p className="text-sm text-stone-500 line-clamp-1 mt-1 leading-relaxed">
                        {truncateContent(blog.blogContent, 110)}
                    </p>
                )}
                <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-400">
                    <span className="font-medium text-stone-600">{blog.author}</span>
                    <span>·</span>
                    <span>{formatRelativeTime(blog.createdAt)}</span>
                    {blog.tags[0] && (
                        <>
                            <span>·</span>
                            <span className="text-navy font-medium">#{blog.tags[0]}</span>
                        </>
                    )}
                    {blog.isArchived && (
                        <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-medium">Draft</span>
                    )}
                </div>
            </Link>

            {isOwner && (
                <div className="shrink-0 self-start opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <OptionsMenu actions={actions} />
                </div>
            )}
        </div>
    );
}
