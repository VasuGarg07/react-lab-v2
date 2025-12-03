import { BookOpen, FilePen, FileText, Plus, Trash2, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useAppSelector } from '../../../store/useRedux';
import BlogGallery from '../components/BlogGallery';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { generateAvatarUrl } from '../helpers/blog.utils';
import { useUserBlogs, useUserNotebooks } from '../hooks/useBlogQuery';
import { useDeleteAllBlogs, useDeleteArchivedBlogs } from '../hooks/useBlogMutations';
import { usePagination } from '../hooks/usePagination';
import NotebooksGrid from '../components/NotebooksGrid';
import { useModal } from '../../../components/ModalContext';
import { openAlertDialog } from '../../../ui/AlertDialog';

type Tab = 'notebooks' | 'blogs';

export default function MyLibrary() {
    const user = useAppSelector(state => state.auth.user);
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

    const stats = [
        { label: 'Notebooks', value: notebookCount, icon: BookOpen },
        { label: 'Published', value: blogCount - draftCount, icon: FileText },
        { label: 'Drafts', value: draftCount, icon: FilePen },
    ];

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: 'notebooks', label: 'Notebooks', count: notebookCount },
        { id: 'blogs', label: 'Blogs', count: blogCount },
    ];

    const handleDeleteAll = () => {
        openAlertDialog(modal, {
            title: 'Delete All Blogs',
            message: (
                <div className="space-y-2">
                    <p>Are you sure you want to delete ALL your blogs?</p>
                    <p className="text-red-600 dark:text-red-400 font-medium">
                        This will permanently delete {blogCount} {blogCount === 1 ? 'blog' : 'blogs'}!
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        This action cannot be undone.
                    </p>
                </div>
            ),
            confirmText: 'Delete All',
            onConfirm: () => {
                deleteAllMutation.mutate();
                setShowSettings(false);
            },
        });
    };

    const handleDeleteArchived = () => {
        openAlertDialog(modal, {
            title: 'Delete Archived Blogs',
            message: (
                <div className="space-y-2">
                    <p>Delete all your archived/draft blogs?</p>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        This will delete {draftCount} {draftCount === 1 ? 'draft' : 'drafts'}.
                    </p>
                </div>
            ),
            confirmText: 'Delete Drafts',
            onConfirm: () => {
                deleteArchivedMutation.mutate();
                setShowSettings(false);
            },
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                        <img
                            src={generateAvatarUrl(user?.username || 'User')}
                            alt={user?.username}
                            className="w-full h-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                            Your Library
                        </h1>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {user?.username}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">New Notebook</span>
                    </Link>
                </div>
            </header>

            {/* Settings Panel */}
            {showSettings && (
                <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-3">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Bulk Actions
                    </h3>
                    <button
                        onClick={handleDeleteArchived}
                        disabled={draftCount === 0}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                        <Trash2 className="w-4 h-4" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Delete Archived Blogs</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Remove {draftCount} draft{draftCount !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        disabled={blogCount === 0}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                        <Trash2 className="w-4 h-4" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Delete All Blogs</p>
                            <p className="text-xs text-red-500 dark:text-red-400/80">
                                Permanently delete all {blogCount} blog{blogCount !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </button>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-center"
                        >
                            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-2">
                                <Icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                            </div>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                {stat.value}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-neutral-200 dark:border-neutral-700">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.id
                            ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
                            : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                            }`}
                    >
                        {tab.label}
                        <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-md ${activeTab === tab.id
                            ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
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