import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
    publishBlog,
    updateBlog,
    archiveBlog,
    deleteBlogById,
    deleteAllBlogs,
    deleteArchivedBlogs,
} from '../helpers/blog.service';
import { BLOG_QUERY_KEYS, BLOG_ROUTES, type BlogRequest } from '../helpers/blog.constants';

/**
 * Publish a new blog
 */
export const usePublishBlog = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (blogData: BlogRequest) => publishBlog(blogData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('Blog published successfully!');
            navigate(BLOG_ROUTES.MY_BLOGS);
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to publish blog');
        },
    });
};

/**
 * Update an existing blog
 */
export const useUpdateBlog = (blogId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (blogData: Partial<BlogRequest>) => updateBlog(blogId, blogData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.DETAIL(blogId) });
            toast.success('Blog updated successfully!');
            navigate(BLOG_ROUTES.MY_BLOGS);
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to update blog');
        },
    });
};

/**
 * Archive/Unarchive a blog
 */
export const useArchiveBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (blogId: string) => archiveBlog(blogId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('Blog status updated!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to update blog status');
        },
    });
};

/**
 * Delete a single blog
 */
export const useDeleteBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (blogId: string) => deleteBlogById(blogId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('Blog deleted successfully!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to delete blog');
        },
    });
};

/**
 * Delete all blogs
 */
export const useDeleteAllBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAllBlogs,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('All blogs deleted successfully!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to delete all blogs');
        },
    });
};

/**
 * Delete all archived blogs
 */
export const useDeleteArchivedBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteArchivedBlogs,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('Archived blogs deleted successfully!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to delete archived blogs');
        },
    });
};
