import { Feather, Search, PenLine, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useAppSelector } from '../../../store/useRedux';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import NotebookCard from '../components/NotebookCard';
import BlogCard from '../components/BlogCard';
import { useBlogs, useNotebooks } from '../hooks/useBlogQuery';
import QuickAction from '../components/QuickAction';
import ScrollSection from '../../../ui/ScrollSection';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
};

export default function BlogHome() {
    const user = useAppSelector(state => state.auth.user);
    const { data: notebooksData, isLoading: notebooksLoading } = useNotebooks(1, 6);
    const { data: blogsData, isLoading: blogsLoading } = useBlogs(1, 6);

    const notebooks = notebooksData?.data ?? [];
    const blogs = blogsData?.data ?? [];
    const featuredBlogs = blogs.slice(0, 3);
    const recentBlogs = blogs.slice(3, 6);

    const isLoading = notebooksLoading || blogsLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Feather className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {getGreeting()}
                        </p>
                        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {user?.username ? `Welcome back, ${user.username}` : 'Welcome back'}
                        </h1>
                    </div>
                </div>
                <Link
                    to={BLOGIFY_ROUTES.DISCOVER}
                    className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                    <Search className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </Link>
            </header>

            {/* Quick Actions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <QuickAction
                    icon={PenLine}
                    label="Write something"
                    sublabel="Start a new blog post"
                    to={BLOGIFY_ROUTES.WRITE}
                />
                <QuickAction
                    icon={Plus}
                    label="New notebook"
                    sublabel="Create a collection"
                    to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                />
            </section>

            {/* Notebooks Section */}
            {notebooks.length > 0 && (
                <ScrollSection
                    title="Jump back in"
                    subtitle="Notebooks you might like"
                    actionLabel="See all"
                    actionHref={BLOGIFY_ROUTES.DISCOVER}
                >
                    {notebooks.map(notebook => (
                        <NotebookCard key={notebook.id} notebook={notebook} />
                    ))}
                </ScrollSection>
            )}

            {/* Featured Blogs */}
            {featuredBlogs.length > 0 && (
                <ScrollSection
                    title="Featured this week"
                    actionLabel="See all"
                    actionHref={BLOGIFY_ROUTES.DISCOVER}
                >
                    {featuredBlogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} variant="featured" />
                    ))}
                </ScrollSection>
            )}

            {/* Recommended Blogs */}
            {recentBlogs.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            Recommended for you
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {recentBlogs.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {notebooks.length === 0 && blogs.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                        <Feather className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        No content yet
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        Start by creating your first notebook
                    </p>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Notebook
                    </Link>
                </div>
            )}
        </div>
    );
}