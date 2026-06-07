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

    const filterByQuery = <T extends { title: string; author: string }>(items: T[]): T[] => {
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(item => item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query));
    };

    const filteredNotebooks = (searchScope === 'all' || searchScope === 'notebooks') ? filterByQuery(notebooks) : notebooks;
    const filteredBlogs = (searchScope === 'all' || searchScope === 'blogs') ? filterByQuery(blogs) : blogs;

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
        <div className="max-w-4xl mx-auto space-y-6">
            <header className="space-y-4 pt-2">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy mb-1.5">The library</p>
                    <h1 className="font-serif text-4xl font-semibold text-stone-900 leading-none">Discover</h1>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by title or author..."
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-stone-200 focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none transition-colors text-stone-900 placeholder:text-stone-400 text-sm"
                    />
                </div>
                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl w-fit">
                    {scopes.map(scope => (
                        <button
                            key={scope.id}
                            onClick={() => setSearchScope(scope.id)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                                searchScope === scope.id
                                    ? 'bg-white text-stone-900 shadow-sm'
                                    : 'text-stone-500 hover:text-stone-800 '
                            }`}
                        >
                            {scope.label}
                        </button>
                    ))}
                </div>
            </header>

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
