import { useState } from 'react';
import { Search } from 'lucide-react';
import { usePagination } from '../hooks/usePagination';
import NotebookGallery from '../components/NotebookGallery';
import BlogGallery from '../components/BlogGallery';
import { useBlogs, useNotebooks } from '../hooks/useBlogQuery';

type Tab = 'notebooks' | 'blogs';
type SearchScope = 'all' | 'notebooks' | 'blogs';

export default function Discover() {
    const [activeTab, setActiveTab] = useState<Tab>('notebooks');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchScope, setSearchScope] = useState<SearchScope>('all');

    const { currentPage: notebookPage, setPage: setNotebookPage } = usePagination();
    const { currentPage: blogPage, setPage: setBlogPage } = usePagination();

    const { data: notebooksData, isLoading: notebooksLoading } = useNotebooks(notebookPage, 12);
    const { data: blogsData, isLoading: blogsLoading } = useBlogs(blogPage, 10);

    const notebooks = notebooksData?.data ?? [];
    const blogs = blogsData?.data ?? [];

    // Client-side filtering by title or author
    const filterByQuery = <T extends { title: string; author: string }>(items: T[]): T[] => {
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(
            item => item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query)
        );
    };

    const filteredNotebooks = (searchScope === 'all' || searchScope === 'notebooks')
        ? filterByQuery(notebooks)
        : notebooks;

    const filteredBlogs = (searchScope === 'all' || searchScope === 'blogs')
        ? filterByQuery(blogs)
        : blogs;

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: 'notebooks', label: 'Notebooks', count: filteredNotebooks.length },
        { id: 'blogs', label: 'Blogs', count: filteredBlogs.length },
    ];

    const scopes: { id: SearchScope; label: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'notebooks', label: 'Notebooks' },
        { id: 'blogs', label: 'Blogs' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Discover
                </h1>

                {/* Search Input */}
                <div className="relative mb-3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title or author..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500 focus:outline-none transition-colors text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    />
                </div>

                {/* Search Scope Toggle */}
                <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-fit">
                    {scopes.map(scope => (
                        <button
                            key={scope.id}
                            onClick={() => setSearchScope(scope.id)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${searchScope === scope.id
                                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                                }`}
                        >
                            {scope.label}
                        </button>
                    ))}
                </div>
            </header>

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
                <NotebookGallery
                    notebooks={filteredNotebooks}
                    currentPage={notebookPage}
                    totalPages={notebooksData?.pagination.totalPages ?? 1}
                    onPageChange={setNotebookPage}
                    isLoading={notebooksLoading}
                    emptyMessage={searchQuery ? 'No notebooks match your search' : 'No notebooks yet'}
                    emptyDescription={searchQuery ? 'Try a different search term' : 'Be the first to create one'}
                />
            )}

            {activeTab === 'blogs' && (
                <BlogGallery
                    blogs={filteredBlogs}
                    currentPage={blogPage}
                    totalPages={blogsData?.pagination.totalPages ?? 1}
                    onPageChange={setBlogPage}
                    isLoading={blogsLoading}
                    emptyMessage={searchQuery ? 'No blogs match your search' : 'No blogs yet'}
                    emptyDescription={searchQuery ? 'Try a different search term' : 'Be the first to publish one'}
                />
            )}
        </div>
    );
}