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
    if (hour >= 6 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 16) return 'Good afternoon';
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
                <div className="w-7 h-7 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (notebooks.length === 0 && blogs.length === 0) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Feather className="w-10 h-10 text-stone-300 mb-6" strokeWidth={1.5} />
                    <h2 className="font-serif text-2xl text-stone-800 mb-2">Your journal awaits</h2>
                    <p className="text-stone-400 mb-8 text-sm">Start by creating your first notebook</p>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-50 rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
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
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral mb-1.5">{getGreeting()}</p>
                    <h1 className="font-serif text-4xl font-semibold text-stone-900 leading-tight">
                        {user?.username ?? 'Welcome back'}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        to={BLOGIFY_ROUTES.WRITE}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 text-stone-50 text-xs font-medium hover:bg-stone-700 transition-colors"
                    >
                        <PenLine className="w-3.5 h-3.5" />
                        Write
                    </Link>
                    <Link
                        to={BLOGIFY_ROUTES.DISCOVER}
                        className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
                    >
                        <Search className="w-4 h-4 text-stone-500" />
                    </Link>
                </div>
            </header>

            <div className="flex gap-3">
                <Link
                    to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                    className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-navy/10 bg-white hover:border-navy/20 hover:shadow-card transition-all group"
                >
                    <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center group-hover:bg-navy/15 transition-colors">
                        <Plus className="w-4 h-4 text-navy" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-stone-800">New notebook</p>
                        <p className="text-xs text-stone-400">Create a collection</p>
                    </div>
                </Link>
                <Link
                    to={BLOGIFY_ROUTES.WRITE}
                    className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-coral/40 bg-coral/10 hover:border-coral/60 hover:shadow-card transition-all group"
                >
                    <div className="w-8 h-8 rounded-lg bg-coral/20 flex items-center justify-center group-hover:bg-coral/30 transition-colors">
                        <PenLine className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-stone-800">Write something</p>
                        <p className="text-xs text-stone-400">Start a new blog post</p>
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
                            <Sparkles className="w-4 h-4 text-coral" strokeWidth={2} />
                            <h2 className="font-serif text-xl font-semibold text-stone-900">Recommended for you</h2>
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
