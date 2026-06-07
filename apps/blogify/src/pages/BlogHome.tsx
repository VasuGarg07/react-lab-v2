import { Clock, Feather, PenLine, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthSelector } from '@react-lab/auth';
import { BLOGIFY_ROUTES, type Blog } from '../helpers/blog.constants';
import NotebookVolume from '../components/NotebookVolume';
import Shelf from '../components/Shelf';
import PieceRow from '../components/PieceRow';
import { useBlogs, useNotebooks } from '../hooks/useBlogQuery';
import { calculateReadTime, truncateContent } from '../helpers/blog.utils';
import { formatRelativeTime } from '@react-lab/shared';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 16) return 'Good afternoon';
    return 'Good evening';
};

/** The big editorial lead — the one piece the reading room opens with. */
function FeaturedRead({ blog }: { blog: Blog }) {
    const readTime = calculateReadTime(blog.blogContent);
    return (
        <Link
            to={BLOGIFY_ROUTES.BLOG_DETAIL(blog.id)}
            className="group block rounded-3xl border border-stone-200 bg-white overflow-hidden hover:shadow-lift transition-shadow"
        >
            <div className="grid md:grid-cols-2">
                <div className="aspect-16/10 md:aspect-auto md:min-h-72 bg-stone-200 overflow-hidden">
                    {/* cover image if the piece's notebook has one is fetched elsewhere; fall back to monogram */}
                    <div className="w-full h-full grid place-items-center bg-onyx">
                        <span className="font-serif text-7xl text-beige/80 select-none">
                            {blog.title.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="p-7 sm:p-9 flex flex-col justify-center">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-navy mb-3">
                        <span className="w-5 h-px bg-navy" /> Featured read
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 leading-[1.1] group-hover:text-navy transition-colors text-balance">
                        {blog.title}
                    </h2>
                    <p className="mt-3 text-stone-500 leading-relaxed line-clamp-3">
                        {truncateContent(blog.blogContent, 180)}
                    </p>
                    <div className="mt-5 flex items-center gap-2.5 text-sm text-stone-500">
                        <span className="font-semibold text-stone-700">{blog.author}</span>
                        <span>·</span>
                        <span>{formatRelativeTime(blog.createdAt)}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{readTime} min</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function BlogHome() {
    const user = useAuthSelector(state => state.auth.user);
    const { data: notebooksData, isLoading: notebooksLoading } = useNotebooks(1, 8);
    const { data: blogsData, isLoading: blogsLoading } = useBlogs(1, 8);

    const notebooks = notebooksData?.data ?? [];
    const blogs = blogsData?.data ?? [];
    const [featured, ...rest] = blogs;
    const latest = rest.slice(0, 6);

    if (notebooksLoading || blogsLoading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="w-7 h-7 border-2 border-stone-200 border-t-navy rounded-full animate-spin" />
            </div>
        );
    }

    if (notebooks.length === 0 && blogs.length === 0) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="w-16 h-16 rounded-2xl bg-onyx grid place-items-center mb-6">
                        <Feather className="w-7 h-7 text-beige" strokeWidth={1.75} />
                    </div>
                    <h2 className="font-serif text-3xl font-semibold text-stone-900 mb-2">Your shelf is empty</h2>
                    <p className="text-stone-500 mb-8">Every great piece starts in a notebook. Create your first one.</p>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-navy text-white rounded-xl text-sm font-bold hover:bg-navy-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Create a notebook
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-14 fade-up">
            {/* Masthead */}
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy mb-2">{getGreeting()}</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 leading-none">
                        {user?.username ?? 'Welcome back'}
                    </h1>
                    <p className="text-stone-500 mt-3">Pick up where you left off, or start something new.</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm font-bold hover:border-stone-300 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Notebook
                    </Link>
                    <Link
                        to={BLOGIFY_ROUTES.WRITE}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-navy text-white text-sm font-bold hover:bg-navy-600 transition-colors"
                    >
                        <PenLine className="w-4 h-4" /> Write
                    </Link>
                </div>
            </header>

            {/* Featured read */}
            {featured && <FeaturedRead blog={featured} />}

            {/* Shelves of notebooks */}
            {notebooks.length > 0 && (
                <Shelf title="On the shelf" subtitle="Notebooks to explore" actionLabel="Browse all" actionHref={BLOGIFY_ROUTES.DISCOVER}>
                    {notebooks.map(notebook => (
                        <div key={notebook.id} className="w-40 sm:w-44 shrink-0">
                            <NotebookVolume notebook={notebook} />
                        </div>
                    ))}
                </Shelf>
            )}

            {/* Latest pieces — table of contents */}
            {latest.length > 0 && (
                <section>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h2 className="font-serif text-xl font-semibold text-stone-900">Fresh off the press</h2>
                        <Link to={BLOGIFY_ROUTES.DISCOVER} className="text-xs font-bold text-navy hover:underline underline-offset-4">
                            See more
                        </Link>
                    </div>
                    <div>
                        {latest.map((blog, i) => <PieceRow key={blog.id} blog={blog} index={i + 1} />)}
                    </div>
                </section>
            )}
        </div>
    );
}
