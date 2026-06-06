import { Archive, BookOpen, Calendar, ChevronLeft, Clock, Edit, FolderInput, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useModal, openAlertDialog, Select } from '@react-lab/ui';
import { formatDate, markdownToHtml } from '@react-lab/shared';
import { useAuthSelector } from '@react-lab/auth';
import BlogCard from '../components/BlogCard';
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
        <div className="max-w-2xl mx-auto space-y-10">
            <Link
                to={notebook ? BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id) : BLOGIFY_ROUTES.DISCOVER}
                className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                {notebook ? `Back to ${notebook.title}` : 'Back'}
            </Link>

            <header className="space-y-6">
                <div className="space-y-4">
                    {blog.isArchived && (
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-600 rounded-full">
                            Archived
                        </span>
                    )}
                    <h1 className="font-serif text-4xl text-stone-900 leading-tight tracking-tight">{blog.title}</h1>
                    {blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs bg-stone-100 text-stone-500 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4 py-4 border-y border-stone-100">
                    <Link to={BLOGIFY_ROUTES.BLOG_AUTHOR(blog.author)} className="flex items-center gap-3 hover:opacity-75 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
                            <img src={generateAvatarUrl(blog.author)} alt={blog.author} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-900">{blog.author}</p>
                            <div className="flex items-center gap-3 text-xs text-stone-400 mt-0.5">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(blog.createdAt)}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime} min read</span>
                            </div>
                        </div>
                    </Link>
                    {isOwner && <OptionsMenu actions={actions} />}
                </div>

                {notebook && (
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_DETAIL(notebook.id)}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100 hover:border-stone-200 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-stone-200 overflow-hidden shrink-0">
                            <img src={notebook.coverImageUrl} alt={notebook.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-stone-400">From notebook</p>
                            <p className="text-sm font-medium text-stone-800 truncate mt-0.5">{notebook.title}</p>
                        </div>
                        <BookOpen className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors" />
                    </Link>
                )}
            </header>

            <article
                className="markdown prose-stone"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(blog.blogContent) as string }}
            />

            {relatedBlogs && relatedBlogs.length > 0 && (
                <section className="space-y-4 pt-8 border-t border-stone-100">
                    <h2 className="font-serif text-xl text-stone-900">More from this notebook</h2>
                    <div className="space-y-3">
                        {relatedBlogs.map(relatedBlog => <BlogCard key={relatedBlog.id} blog={relatedBlog} />)}
                    </div>
                </section>
            )}
        </div>
    );
}
