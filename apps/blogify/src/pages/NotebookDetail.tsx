import { useParams, Link, useNavigate } from 'react-router';
import { ChevronLeft, PenLine, Globe, Lock, Edit, Trash2, BookText } from 'lucide-react';
import { useAuthSelector } from '@react-lab/auth';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { generateAvatarUrl } from '../helpers/blog.utils';
import { useNotebook, useBlogsByNotebook } from '../hooks/useBlogQuery';
import { useDeleteNotebook } from '../hooks/useBlogMutations';
import { usePagination } from '../hooks/usePagination';
import PieceRow from '../components/PieceRow';
import { formatDate } from '@react-lab/shared';
import OptionsMenu, { type MenuAction } from '../components/OptionsMenu';
import { useModal, openAlertDialog, Pagination } from '@react-lab/ui';

export default function NotebookDetail() {
    const { notebookId } = useParams<{ notebookId: string }>();
    const user = useAuthSelector(state => state.auth.user);
    const navigate = useNavigate();
    const modal = useModal();
    const { currentPage, setPage } = usePagination();

    const { data: notebook, isLoading: notebookLoading } = useNotebook(notebookId!);
    const { data: blogsData, isLoading: blogsLoading } = useBlogsByNotebook(notebookId!, currentPage, 12);
    const deleteMutation = useDeleteNotebook();

    const blogs = blogsData?.data ?? [];
    const totalPages = blogsData?.pagination.totalPages ?? 1;
    const blogCount = blogsData?.pagination.totalItems ?? 0;
    const isOwner = user?.id === notebook?.userId;

    const handleDelete = () => {
        openAlertDialog(modal, {
            title: 'Delete notebook',
            message: (
                <div className="space-y-2">
                    <p>Are you sure you want to delete “{notebook?.title}”?</p>
                    <p className="text-red-600 font-medium">
                        This will delete {blogCount} {blogCount === 1 ? 'blog' : 'blogs'} inside this notebook.
                    </p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => deleteMutation.mutate(notebookId!, { onSuccess: () => navigate(BLOGIFY_ROUTES.LIBRARY) }),
        });
    };

    const actions: MenuAction[] = [
        { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: () => navigate(BLOGIFY_ROUTES.NOTEBOOK_EDIT(notebook!.id)) },
        { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, onClick: handleDelete, variant: 'danger' as const },
    ];

    if (notebookLoading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="w-7 h-7 border-2 border-stone-200 border-t-navy rounded-full animate-spin" />
            </div>
        );
    }

    if (!notebook) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 text-center">
                <p className="font-serif text-2xl text-stone-800 mb-2">Notebook not found</p>
                <p className="text-sm text-stone-400 mb-6">This notebook may have been deleted or doesn't exist.</p>
                <Link to={BLOGIFY_ROUTES.DISCOVER} className="text-sm font-semibold text-navy hover:underline underline-offset-4">
                    Go to Discover
                </Link>
            </div>
        );
    }

    const startIndex = (currentPage - 1) * 12;

    return (
        <div className="max-w-4xl mx-auto space-y-10 fade-up">
            <Link
                to={isOwner ? BLOGIFY_ROUTES.LIBRARY : BLOGIFY_ROUTES.DISCOVER}
                className="inline-flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                {isOwner ? 'Library' : 'Discover'}
            </Link>

            {/* Volume header — bound cover beside the title block */}
            <header className="grid sm:grid-cols-[200px_1fr] gap-7 items-start">
                {/* The bound cover */}
                <div className="relative aspect-4/5 rounded-r-lg rounded-l-sm book-shadow mx-auto sm:mx-0 w-44 sm:w-full">
                    <div className="book-pages absolute right-0 top-1.5 bottom-1.5 w-2.5 rounded-r-sm" />
                    <div className="absolute inset-0 right-2 rounded-r-md rounded-l-sm overflow-hidden bg-stone-300">
                        {notebook.coverImageUrl
                            ? <img src={notebook.coverImageUrl} alt={notebook.title} className="w-full h-full object-cover" />
                            : <div className="w-full h-full grid place-items-center bg-onyx"><span className="font-serif text-6xl text-beige/80">{notebook.title.charAt(0).toUpperCase()}</span></div>}
                        <div className="absolute inset-y-0 left-0 w-6 bg-linear-to-r from-black/40 to-transparent" />
                        <div className="absolute inset-y-0 left-3 w-px bg-white/15" />
                    </div>
                </div>

                {/* Title block */}
                <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-navy mb-2.5">
                        {notebook.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {notebook.isPublic ? 'Public notebook' : 'Private notebook'}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight">{notebook.title}</h1>

                    {notebook.description && (
                        <p className="text-stone-500 leading-relaxed mt-3">{notebook.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-5">
                        <Link to={BLOGIFY_ROUTES.NOTEBOOK_AUTHOR(notebook.author)} className="inline-flex items-center gap-2 hover:opacity-75 transition-opacity">
                            <div className="w-7 h-7 rounded-full bg-stone-200 overflow-hidden">
                                <img src={generateAvatarUrl(notebook.author)} alt={notebook.author} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-semibold text-stone-700">{notebook.author}</span>
                        </Link>
                        <span className="text-stone-300">·</span>
                        <span className="text-sm text-stone-400">{formatDate(notebook.createdAt)}</span>
                        <span className="text-stone-300">·</span>
                        <span className="inline-flex items-center gap-1 text-sm text-stone-400">
                            <BookText className="w-3.5 h-3.5" />{blogCount} {blogCount === 1 ? 'piece' : 'pieces'}
                        </span>
                    </div>

                    {isOwner && (
                        <div className="flex items-center gap-2 mt-6">
                            <Link
                                to={BLOGIFY_ROUTES.WRITE}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy text-white text-sm font-bold hover:bg-navy-600 transition-colors"
                            >
                                <PenLine className="w-4 h-4" /> Add a piece
                            </Link>
                            <OptionsMenu actions={actions} />
                        </div>
                    )}
                </div>
            </header>

            {/* Table of contents */}
            <section className="pt-8 border-t border-stone-200">
                <div className="flex items-baseline gap-2.5 mb-2">
                    <h2 className="font-serif text-2xl font-semibold text-stone-900">Contents</h2>
                    <span className="text-sm text-stone-400 tabular-nums">{blogCount}</span>
                </div>

                {blogsLoading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-7 h-7 border-2 border-stone-200 border-t-navy rounded-full animate-spin" />
                    </div>
                ) : blogs.length > 0 ? (
                    <>
                        <div>
                            {blogs.map((blog, i) => <PieceRow key={blog.id} blog={blog} index={startIndex + i + 1} />)}
                        </div>
                        {totalPages > 1 && (
                            <div className="mt-6">
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <p className="font-serif text-lg text-stone-700 mb-1">No pieces yet</p>
                        <p className="text-sm text-stone-400">{isOwner ? 'Add your first piece to this notebook.' : 'Check back later.'}</p>
                    </div>
                )}
            </section>
        </div>
    );
}
