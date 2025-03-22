import React from 'react';
import Pagination from "@/ui/Pagination";
import { BlogListResponse } from '@/apps/Blogify/helpers/blog.constants';
import BlogCard from '@/apps/Blogify/components/BlogCard';

interface BlogGalleryProps {
    blogListResponse: BlogListResponse;
    isLoading?: boolean;
    onPageChange: (page: number) => void;
    emptyMessage?: string;
}

const BlogGallery: React.FC<BlogGalleryProps> = ({
    blogListResponse,
    isLoading = false,
    onPageChange,
    emptyMessage = 'No blogs found',
}) => {
    const { data, pagination } = blogListResponse;

    // Empty state
    if (!isLoading && data.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-6">
            {/* Results Summary */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} blogs
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {data.map((blog) => (
                    <div key={blog.id}>
                        <BlogCard blog={blog} />
                    </div>
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