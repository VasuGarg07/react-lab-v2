import { Feather, Search, PenLine, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthSelector } from '@react-lab/auth';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import NotebookCard from '../components/NotebookCard';
import BlogCard from '../components/BlogCard';
import { useBlogs, useNotebooks } from '../hooks/useBlogQuery';
import { ScrollSection } from '@react-lab/ui';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
};

export default function BlogHome() {
    const user = useAuthSelector(state => state.auth.user);
    const { data: notebooksData, isLoading: notebooksLoading } = useNotebooks(1, 6);
    const { data: blogsData, isLoading: blogsLoading } = useBlogs(1, 6);

    const notebooks = notebooksData?.data ?? [];
    const blogs = blogsData?.data ?? [];
    const featuredBlogs = blogs.slice(0, 3);
    const recentBlogs = blogs.slice(3, 6);

    if (notebooksLoading || blogsLoading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="w-7 h-7 border-2 border-stone-200 dark:border-stone-700 border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin" />
            </div>
        );
    }

    if (notebooks.length === 0 && blogs.length === 0) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Feather className="w-10 h-10 text-stone-300 dark:text-stone-600 mb-6" strokeWidth={1.5} />
                    <h2 className="font-serif text-2xl text-stone-800 dark:text-stone-200 mb-2">Your journal awaits</h2>
                    <p className="text-stone-400 dark:text-stone-500 mb-8 text-sm">Start by creating your first notebook</p>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create notebook
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header className="flex items-end justify-between pt-2">
                <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mb-1 tracking-wide">{getGreeting()}</p>
                    <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 leading-tight">
                        {user?.username ?? 'Welcome back'}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        to={BLOGIFY_ROUTES.WRITE}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-medium hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
                    >
                        <PenLine className="w-3.5 h-3.5" />
                        Write
                    </Link>
                    <Link
                        to={BLOGIFY_ROUTES.DISCOVER}
                        className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                    >
                        <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                    </Link>
                </div>
            </header>

            <div className="flex gap-3">
                <Link
                    to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                    className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-sm transition-all group"
                >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                        <Plus className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-800 dark:text-stone-200">New notebook</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">Create a collection</p>
                    </div>
                </Link>
                <Link
                    to={BLOGIFY_ROUTES.WRITE}
                    className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 hover:border-amber-300/60 dark:hover:border-amber-800/60 hover:shadow-sm transition-all group"
                >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-900/60 transition-colors">
                        <PenLine className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-800 dark:text-stone-200">Write something</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">Start a new blog post</p>
                    </div>
                </Link>
            </div>

            {notebooks.length > 0 && (
                <ScrollSection title="Jump back in" subtitle="Notebooks you might like" actionLabel="See all" actionHref={BLOGIFY_ROUTES.DISCOVER} itemWidth="w-56">
                    {notebooks.map(notebook => <NotebookCard key={notebook.id} notebook={notebook} />)}
                </ScrollSection>
            )}

            {featuredBlogs.length > 0 && (
                <ScrollSection title="Featured this week" actionLabel="See all" actionHref={BLOGIFY_ROUTES.DISCOVER} itemWidth="w-56">
                    {featuredBlogs.map(blog => <BlogCard key={blog.id} blog={blog} variant="featured" />)}
                </ScrollSection>
            )}

            {recentBlogs.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
                            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100">Recommended for you</h2>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {recentBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
                    </div>
                </section>
            )}
        </div>
    );
}
