import { Archive, BookOpen, Calendar, ChevronLeft, Clock, Edit, FolderInput, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useModal, openAlertDialog, Select } from '@react-lab/ui';
import { formatDate, markdownToHtml } from '@react-lab/shared';
import { useAuthSelector } from '@react-lab/auth';
import PieceRow from '../components/PieceRow';
import OptionsMenu, { type MenuAction } from '../components/OptionsMenu';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { calculateReadTime, generateAvatarUrl } from '../helpers/blog.utils';
import { useArchiveBlog, useDeleteBlog, useMoveBlog } from '../hooks/useBlogMutations';
import { useBlog, useNotebook, useRelatedBlogs, useUserNotebooks } from '../hooks/useBlogQuery';

export default function BlogDetails() {
    const { blogId } = useParams<{ blogId: string }>();
    const user = useAuthSelector(state => state.auth.user);
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

    const handleEdit = () => navigate(BLOGIFY_ROUTES.BLOG_EDIT(blog!.id));

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete blog',
            message: `Are you sure you want to delete"${blog?.title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            onConfirm: () => deleteMutation.mutate(blogId!, { onSuccess: () => navigate(BLOGIFY_ROUTES.LIBRARY) }),
        });
    };

    const handleArchive = () => archiveMutation.mutate(blogId!);

    const handleMoveClick = () => {
        setMoveTargetNotebook('');
        modal.open(
            <div className="py-2">
                <h3 className="font-serif text-lg text-stone-900 mb-1">Move blog</h3>
                <p className="text-sm text-stone-500 mb-4">Select a notebook to move this blog to</p>
                <Select
                    label="Target Notebook"
                    options={notebooks.filter(n => n.id !== blog?.notebookId).map(n => ({ label: n.title, value: n.id }))}
                    value={moveTargetNotebook}
                    onChange={setMoveTargetNotebook}
                    placeholder="Choose notebook..."
                />
                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={modal.close}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors">
                        Cancel
                    </button>
                    <button type="button"
                        onClick={() => {
                            if (moveTargetNotebook) {
                                moveMutation.mutate({ blogId: blogId!, notebookId: moveTargetNotebook }, { onSuccess: modal.close });
                            }
                        }}
                        disabled={!moveTargetNotebook}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        Move
                    </button>
                </div>
            </div>
        );
    };

    const actions: MenuAction[] = [
        { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: handleEdit },
        { label: 'Move to...', icon: <FolderInput className="w-4 h-4" />, onClick: handleMoveClick },
        { label: blog?.isArchived ? 'Unarchive' : 'Archive', icon: <Archive className="w-4 h-4" />, onClick: handleArchive },
        { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, onClick: handleDelete, variant: 'danger' as const },
    ];

    if (blogLoading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="w-7 h-7 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 text-center">
                <p className="font-serif text-xl text-stone-800 mb-2">Blog not found</p>
                <p className="text-sm text-stone-400 mb-6">This blog may have been deleted or doesn't exist.</p>
                <Link to={BLOGIFY_ROUTES.DISCOVER} className="text-sm text-stone-600 underline underline-offset-4 hover:text-stone-900 transition-colors">
                    Go to Discover
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-10 fade-up">
            <Link
                to={notebook ? BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id) : BLOGIFY_ROUTES.DISCOVER}
                className="inline-flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                {notebook ? notebook.title : 'Discover'}
            </Link>

            <header className="text-center">
                {/* Kicker — the notebook this piece belongs to */}
                {notebook && (
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-navy hover:gap-2.5 transition-all mb-4"
                    >
                        <BookOpen className="w-3.5 h-3.5" /> {notebook.title}
                    </Link>
                )}

                {blog.isArchived && (
                    <div className="mb-3">
                        <span className="inline-flex px-2.5 py-1 text-xs font-bold bg-stone-100 text-stone-500 rounded-full">Draft</span>
                    </div>
                )}

                <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 leading-[1.08] tracking-tight text-balance">
                    {blog.title}
                </h1>

                {/* Byline */}
                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link to={BLOGIFY_ROUTES.BLOG_AUTHOR(blog.author)} className="inline-flex items-center gap-2.5 hover:opacity-75 transition-opacity">
                        <div className="w-9 h-9 rounded-full bg-stone-200 overflow-hidden">
                            <img src={generateAvatarUrl(blog.author)} alt={blog.author} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-stone-800">{blog.author}</span>
                    </Link>
                    <span className="text-stone-300">·</span>
                    <span className="inline-flex items-center gap-1 text-sm text-stone-400"><Calendar className="w-3.5 h-3.5" />{formatDate(blog.createdAt)}</span>
                    <span className="text-stone-300">·</span>
                    <span className="inline-flex items-center gap-1 text-sm text-stone-400"><Clock className="w-3.5 h-3.5" />{readTime} min</span>
                    {isOwner && <OptionsMenu actions={actions} />}
                </div>

                {blog.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-5">
                        {blog.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium bg-stone-100 text-stone-600 rounded-full">#{tag}</span>
                        ))}
                    </div>
                )}
            </header>

            <hr className="border-stone-200" />

            <article
                className="markdown"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(blog.blogContent) as string }}
            />

            {relatedBlogs && relatedBlogs.length > 0 && (
                <section className="pt-8 border-t border-stone-200">
                    <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-2">More from this notebook</h2>
                    <div>
                        {relatedBlogs.map((relatedBlog, i) => <PieceRow key={relatedBlog.id} blog={relatedBlog} index={i + 1} showExcerpt={false} />)}
                    </div>
                </section>
            )}
        </div>
    );
}
