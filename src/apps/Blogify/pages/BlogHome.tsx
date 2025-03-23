import BlogCard from '@/apps/Blogify/components/BlogCard';
import { Blog } from '@/apps/Blogify/helpers/blog.constants';
import { ArrowRight } from 'lucide-react';
import { Link, useLoaderData } from 'react-router';

interface LoaderData {
    recentBlogs: Blog[];
}

const HomePage = () => {
    const { recentBlogs } = useLoaderData() as LoaderData;
    const [featuredBlog, ...otherBlogs] = recentBlogs;

    const formatDate = (dateString: string | number) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        const cleanContent = content.replace(/<[^>]*>/g, '');
        if (cleanContent.length <= maxLength) return cleanContent;
        return cleanContent.substring(0, maxLength) + '...';
    };

    return (
        <div className="p-2 md:p-4">
            <div className="space-y-8">
                {/* Featured Blog */}
                {featuredBlog && (
                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                            Featured Post
                        </h2>
                        <div className="relative">
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>

                            {/* Featured Image */}
                            <div className="aspect-[21/9] w-full overflow-hidden">
                                <img
                                    src={featuredBlog.coverImageUrl}
                                    alt={featuredBlog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white z-20">
                                <div className="max-w-3xl space-y-2">
                                    {/* Tags */}
                                    {featuredBlog.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {featuredBlog.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 text-xs bg-white/20 rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-xl md:text-3xl font-bold text-white drop-shadow-md">
                                        {featuredBlog.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="hidden sm:block text-white/90 drop-shadow-sm">
                                        {truncateContent(featuredBlog.blogContent, 200)}
                                    </p>

                                    {/* Footer with author and CTA */}
                                    <div className="flex items-center gap-2 mt-2">
                                        {/* Author Avatar */}
                                        <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                                            <img
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${featuredBlog.author}`}
                                                alt={featuredBlog.author}
                                                className="w-full h-full"
                                            />
                                        </div>

                                        {/* Author Info */}
                                        <div>
                                            <Link
                                                to={`/blogify/list/${featuredBlog.author}`}
                                                className="text-sm text-white hover:underline"
                                            >
                                                {featuredBlog.author}
                                            </Link>
                                            <p className="text-xs text-white/80">
                                                {formatDate(featuredBlog.createdAt)}
                                            </p>
                                        </div>

                                        {/* Read More Button */}
                                        <Link
                                            to={`/blogify/blog/${featuredBlog.id}`}
                                            className="ml-auto inline-flex items-center px-3 py-1.5 bg-white/20 hover:bg-white/30 transition-colors rounded-md text-sm text-white"
                                        >
                                            Read More
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Posts */}
                <div>
                    <div className="flex justify-between items-center mt-6 mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Recent Posts
                        </h3>
                        <Link
                            to="/blogify/list"
                            className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors rounded-md text-sm text-gray-700 dark:text-gray-200"
                        >
                            View All Posts
                            <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>

                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {otherBlogs.map((blog) => (
                            <div key={blog.id}>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;