import { Link } from 'react-router';
import { Clock, Pencil } from 'lucide-react';
import { calculateReadTime, generateAvatarUrl } from '../helpers/blog.utils';
import { useAppSelector } from '../../../store/useRedux';
import { BLOG_ROUTES, type Blog } from '../helpers/blog.constants';
import { formatDate } from '../../../shared/utilities';

interface BlogCardProps {
    blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
    const user = useAppSelector(state => state.auth.user);

    const isOwner = user?.id === blog.userId;
    const readTime = calculateReadTime(blog.blogContent);

    return (
        <div className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
            {/* Cover Image */}
            <div className="block relative">
                <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                    <img
                        src={blog.coverImageUrl}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Edit badge overlay for owners */}
                {isOwner && (
                    <Link
                        to={BLOG_ROUTES.EDIT(blog.id)}
                        className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-neutral-900 transition-colors shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Pencil className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    </Link>
                )}
            </div>

            <div className="p-4">
                {/* Author Info */}
                <Link
                    to={`/blogify/list/${blog.author}`}
                    className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
                >
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden shrink-0">
                        <img
                            src={generateAvatarUrl(blog.author)}
                            alt={blog.author}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                            {blog.author}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {formatDate(blog.createdAt, 'short')}
                        </p>
                    </div>
                </Link>

                {/* Title */}
                <Link to={BLOG_ROUTES.DETAIL(blog.id)} className="block mb-3">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {blog.title}
                    </h3>
                </Link>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                    {blog.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {blog.tags.length > 3 && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            +{blog.tags.length - 3}
                        </span>
                    )}
                    {blog.isArchived && (
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                            Draft
                        </span>
                    )}
                </div>

                {/* Read Time */}
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <Clock className="w-3 h-3" />
                    <span>{readTime} min read</span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;