import { useNavigate } from 'react-router';
import { useArchiveBlog, useDeleteBlog } from './useBlogMutations';
import { BLOG_ROUTES } from '../helpers/blog.constants';

/**
 * Hook to handle common blog actions (edit, archive, delete)
 */
export const useBlogActions = () => {
    const navigate = useNavigate();
    const archiveMutation = useArchiveBlog();
    const deleteMutation = useDeleteBlog();

    const handleEdit = (blogId: string) => {
        navigate(BLOG_ROUTES.EDIT(blogId));
    };

    const handleArchive = async (blogId: string) => {
        try {
            await archiveMutation.mutateAsync(blogId);
        } catch (error) {
            console.error('Archive error:', error);
        }
    };

    const handleDelete = async (blogId: string) => {
        if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            try {
                await deleteMutation.mutateAsync(blogId);
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    };

    const handleView = (blogId: string) => {
        navigate(BLOG_ROUTES.DETAIL(blogId));
    };

    return {
        handleEdit,
        handleArchive,
        handleDelete,
        handleView,
        isArchiving: archiveMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};
