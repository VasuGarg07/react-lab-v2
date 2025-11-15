import { Link } from 'react-router';
import { ArrowRight, Clock } from 'lucide-react';
import { truncateContent, calculateReadTime, generateAvatarUrl } from '../helpers/blog.utils';
import { useRecentBlogs } from '../hooks/useBlogQuery';
import { BLOG_ROUTES } from '../helpers/blog.constants';
import BlogCard from '../components/BlogCard';
import { formatDate } from '../../../shared/utilities';

export default function BlogHome() {
    const { data: recentBlogs, isLoading } = useRecentBlogs();

    if (isLoading || !recentBlogs) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const [featuredBlog, ...otherBlogs] = recentBlogs;

    if (!featuredBlog) {
        return (
            <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-400">No blogs available yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Featured Blog */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                    Featured Post
                </h2>
                <Link to={BLOG_ROUTES.DETAIL(featuredBlog.id)} className="block group">
                    <div className="relative rounded-lg overflow-hidden">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10" />

                        {/* Featured Image */}
                        <div className="aspect-21/9 w-full">
                            <img
                                src={featuredBlog.coverImageUrl}
                                alt={featuredBlog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
                            <div className="max-w-3xl space-y-3">
                                {/* Tags */}
                                {featuredBlog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {featuredBlog.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-2xl md:text-4xl font-bold text-white">
                                    {featuredBlog.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="hidden sm:block text-white/90 text-sm md:text-base">
                                    {truncateContent(featuredBlog.blogContent, 180, true)}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between gap-4 pt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
                                            <img src={generateAvatarUrl(featuredBlog.author)} alt={featuredBlog.author} className="w-full h-full" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{featuredBlog.author}</p>
                                            <div className="flex items-center gap-2 text-xs text-white/80">
                                                <span>{formatDate(featuredBlog.createdAt, 'short')}</span>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{calculateReadTime(featuredBlog.blogContent)} min</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg text-sm font-medium">
                                        Read More
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Posts */}
            {otherBlogs.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                            Recent Posts
                        </h3>
                        <Link
                            to={BLOG_ROUTES.LIST}
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherBlogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};