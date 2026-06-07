import { BookOpen, FilePen, FileText, Plus, Trash2, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useAuthSelector } from '@react-lab/auth';
import BlogGallery from '../components/BlogGallery';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { generateAvatarUrl } from '../helpers/blog.utils';
import { useUserBlogs, useUserNotebooks } from '../hooks/useBlogQuery';
import { useDeleteAllBlogs, useDeleteArchivedBlogs } from '../hooks/useBlogMutations';
import { usePagination } from '../hooks/usePagination';
import NotebooksGrid from '../components/NotebooksGrid';
import { useModal, openAlertDialog } from '@react-lab/ui';

type Tab = 'notebooks' | 'blogs';

export default function MyLibrary() {
    const user = useAuthSelector(state => state.auth.user);
    const [activeTab, setActiveTab] = useState<Tab>('notebooks');
    const [showSettings, setShowSettings] = useState(false);
    const modal = useModal();

    const { currentPage: notebookPage, setPage: setNotebookPage } = usePagination();
    const { currentPage: blogPage, setPage: setBlogPage } = usePagination();

    const { data: notebooksData, isLoading: notebooksLoading } = useUserNotebooks(notebookPage, 12);
    const { data: blogsData, isLoading: blogsLoading } = useUserBlogs(blogPage, 10);

    const deleteAllMutation = useDeleteAllBlogs();
    const deleteArchivedMutation = useDeleteArchivedBlogs();

    const notebooks = notebooksData?.data ?? [];
    const blogs = blogsData?.data ?? [];
    const notebookCount = notebooksData?.pagination.totalItems ?? 0;
    const blogCount = blogsData?.pagination.totalItems ?? 0;
    const draftCount = blogs.filter(b => b.isArchived).length;

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: 'notebooks', label: 'Notebooks', count: notebookCount },
        { id: 'blogs', label: 'Blogs', count: blogCount },
    ];

    const handleDeleteAll = () => {
        openAlertDialog(modal, {
            title: 'Delete all blogs',
            message: (
                <div className="space-y-2">
                    <p>Are you sure you want to delete ALL your blogs?</p>
                    <p className="text-red-600 font-medium">
                        This will permanently delete {blogCount} {blogCount === 1 ? 'blog' : 'blogs'}.
                    </p>
                    <p className="text-sm text-stone-500">This action cannot be undone.</p>
                </div>
            ),
            confirmText: 'Delete all',
            onConfirm: () => { deleteAllMutation.mutate(); setShowSettings(false); },
        });
    };

    const handleDeleteArchived = () => {
        openAlertDialog(modal, {
            title: 'Delete archived blogs',
            message: (
                <div className="space-y-2">
                    <p>Delete all your archived/draft blogs?</p>
                    <p className="text-stone-600">
                        This will delete {draftCount} {draftCount === 1 ? 'draft' : 'drafts'}.
                    </p>
                </div>
            ),
            confirmText: 'Delete drafts',
            onConfirm: () => { deleteArchivedMutation.mutate(); setShowSettings(false); },
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden ring-2 ring-stone-100">
                        <img src={generateAvatarUrl(user?.username || 'User')} alt={user?.username} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs text-stone-400 mb-0.5">Your library</p>
                        <h1 className="font-serif text-xl text-stone-900 leading-tight">{user?.username}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`p-2 rounded-xl transition-colors ${showSettings ? 'bg-stone-200 text-stone-900 ' : 'bg-stone-100 text-stone-500 hover:bg-stone-200 '}`}
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 text-stone-50 text-xs font-medium hover:bg-stone-700 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">New notebook</span>
                    </Link>
                </div>
            </header>

            {showSettings && (
                <div className="p-4 rounded-2xl bg-white border border-stone-100 space-y-2">
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-3">Bulk actions</p>
                    <button
                        onClick={handleDeleteArchived}
                        disabled={draftCount === 0}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-left"
                    >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Delete archived blogs</p>
                            <p className="text-xs text-stone-400 mt-0.5">Remove {draftCount} {draftCount === 1 ? 'draft' : 'drafts'}</p>
                        </div>
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        disabled={blogCount === 0}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-left"
                    >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Delete all blogs</p>
                            <p className="text-xs text-red-400 mt-0.5">Permanently remove all {blogCount} {blogCount === 1 ? 'blog' : 'blogs'}</p>
                        </div>
                    </button>
                </div>
            )}

            <div className="grid grid-cols-3 gap-px bg-stone-200 rounded-2xl overflow-hidden border border-stone-200">
                {[
                    { label: 'Notebooks', value: notebookCount, icon: BookOpen },
                    { label: 'Published', value: blogCount - draftCount, icon: FileText },
                    { label: 'Drafts', value: draftCount, icon: FilePen },
                ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="py-5 px-4 bg-white text-center">
                        <p className="font-serif text-3xl font-semibold text-stone-900 tabular-nums">{value}</p>
                        <div className="flex items-center justify-center gap-1.5 mt-1.5">
                            <Icon className="w-3.5 h-3.5 text-navy" strokeWidth={2} />
                            <p className="text-xs font-semibold text-stone-500">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-0 border-b border-stone-200">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 -mb-px transition-colors ${
                            activeTab === tab.id
                                ? 'border-navy text-stone-900'
                                : 'border-transparent text-stone-400 hover:text-stone-700'
                        }`}
                    >
                        {tab.label}
                        <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                            activeTab === tab.id
                                ? 'bg-navy text-white'
                                : 'bg-stone-100 text-stone-500'
                        }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {activeTab === 'notebooks' && (
                <NotebooksGrid
                    notebooks={notebooks}
                    currentPage={notebookPage}
                    totalPages={notebooksData?.pagination.totalPages ?? 1}
                    onPageChange={setNotebookPage}
                    isLoading={notebooksLoading}
                />
            )}
            {activeTab === 'blogs' && (
                <BlogGallery
                    blogs={blogs}
                    currentPage={blogPage}
                    totalPages={blogsData?.pagination.totalPages ?? 1}
                    onPageChange={setBlogPage}
                    isLoading={blogsLoading}
                    emptyMessage="No blogs yet"
                    emptyDescription="Select a notebook and start writing"
                />
            )}
        </div>
    );
}
