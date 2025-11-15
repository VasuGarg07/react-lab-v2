import { LayoutGrid } from 'lucide-react';
import type { BlogListResponse } from '../helpers/blog.constants';
import BlogCard from './BlogCard';
import Pagination from '../../../ui/Pagination';

interface BlogGalleryProps {
    blogListResponse: BlogListResponse;
    isLoading?: boolean;
    onPageChange: (page: number) => void;
    emptyMessage?: string;
}

const BlogGallery = ({
    blogListResponse,
    isLoading = false,
    onPageChange,
    emptyMessage = 'No blogs found',
}: BlogGalleryProps) => {
    const { data, pagination } = blogListResponse;

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Empty state
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                    <LayoutGrid className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                </div>
                <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    {emptyMessage}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Check back later for new content
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Showing{' '}
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
                    </span>
                    {' - '}
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
                    </span>
                    {' of '}
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {pagination.totalItems}
                    </span>
                    {' '}
                    {pagination.totalItems === 1 ? 'blog' : 'blogs'}
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default BlogGallery;