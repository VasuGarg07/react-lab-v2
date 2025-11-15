import { useParams } from "react-router";
import BlogGallery from "../components/BlogGallery";
import { useBlogs, useBlogsByAuthor } from "../hooks/useBlogQuery";
import { usePagination } from "../hooks/usePagination";


export default function BlogList() {
    const { author } = useParams<{ author?: string }>();
    const { currentPage, setPage } = usePagination();

    // Use different hook based on whether author filter exists
    const { data: blogListResponse, isLoading, error } = author
        ? useBlogsByAuthor(author, currentPage)
        : useBlogs(currentPage);

    if (!blogListResponse) return null;

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Failed to load blogs
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Something went wrong. Please try again later.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Show loading or content
    if (isLoading || !blogListResponse) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Explore Blogs
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Discover stories from writers around the world
                    </p>
                </div>
            </div>

            {/* Blog Gallery */}
            <BlogGallery
                blogListResponse={blogListResponse}
                isLoading={isLoading}
                onPageChange={setPage}
                emptyMessage="No blogs available yet"
            />
        </div>
    );
};