import { Link, useParams } from 'react-router';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { useBlogDetail, useRelatedBlogs } from '../hooks/useBlogQuery';
import { calculateReadTime, generateAvatarUrl } from '../helpers/blog.utils';
import { BLOG_ROUTES } from '../helpers/blog.constants';
import { formatDate, markdownToHtml } from '../../../shared/utilities';

const BlogDetail = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const { data: blog, isLoading: blogLoading } = useBlogDetail(blogId!);
    const { data: relatedBlogs } = useRelatedBlogs(blogId!);

    if (blogLoading || !blog) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const readTime = calculateReadTime(blog.blogContent);

    return (
        <div className="space-y-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <Link to={BLOG_ROUTES.LIST} className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    Blogs
                </Link>
                <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <span className="text-neutral-500 dark:text-neutral-400 truncate max-w-[200px]">
                    {blog.title}
                </span>
            </div>

            {/* Cover Image */}
            <div className="aspect-21/9 w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-700">
                <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Blog Content */}
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    {blog.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm font-medium rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-700">
                    <Link to={`/blogify/list/${blog.author}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                            <img src={generateAvatarUrl(blog.author)} alt={blog.author} className="w-full h-full" />
                        </div>
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">{blog.author}</p>
                            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(blog.createdAt, 'long')}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{readTime} min read</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Blog Content with markdown styling */}
                <div className="markdown" dangerouslySetInnerHTML={{ __html: markdownToHtml(blog.blogContent) }} />
            </div>

            {/* Related Blogs */}
            {relatedBlogs && relatedBlogs.length > 0 && (
                <div className="pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
                        Related Blogs
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedBlogs.map((relatedBlog) => (
                            <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogDetail;