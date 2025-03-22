import BlogCard from '@/apps/Blogify/components/BlogCard';
import { Blog } from '@/apps/Blogify/helpers/blog.constants';
import StyledHtmlContent from '@/components/StyledHtmlContent';
import { ChevronRight } from 'lucide-react';
import { Link, useLoaderData } from 'react-router';

interface LoaderData {
    blog: Blog;
    relatedBlogs: Blog[];
}

const BlogDetail = () => {
    const { blog, relatedBlogs } = useLoaderData() as LoaderData;

    const formatDate = (dateString: string | number) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="p-2 md:p-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1 mb-2 text-sm">
                <Link
                    to="/blogify/list"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                >
                    Blogs
                </Link>
                <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
                <span className="text-gray-500 dark:text-gray-400 truncate">
                    {blog.title}
                </span>
            </div>

            {/* Cover Image */}
            <div className="aspect-[2/1] w-full overflow-hidden rounded-lg mb-4">
                <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-2 md:p-4">
                {/* Title and Tags */}
                <div className="space-y-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap gap-1">
                        {blog.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 py-2">
                        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-lg font-medium">
                            <img
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`}
                                alt={blog.author}
                                className="w-full h-full"
                            />
                        </div>
                        <div>
                            <Link
                                to={`/blogify/list/${blog.author}`}
                                className="text-gray-800 dark:text-gray-100 font-medium hover:underline"
                            >
                                {blog.author}
                            </Link>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(blog.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-6"></div>

                {/* Blog Content */}
                <div className="prose dark:prose-invert prose-img:rounded-lg max-w-none">
                    <StyledHtmlContent htmlContent={blog.blogContent} />
                </div>
            </div>

            {relatedBlogs.length > 0 && (
                <>
                    <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-6"></div>

                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        Related Blogs
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {relatedBlogs.map((relatedBlog) => (
                            <div key={relatedBlog.id}>
                                <BlogCard blog={relatedBlog} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogDetail;