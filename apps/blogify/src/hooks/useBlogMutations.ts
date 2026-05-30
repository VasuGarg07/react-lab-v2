import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
    createNotebook, updateNotebook, deleteNotebook,
    publishBlog, updateBlog, moveBlog, archiveBlog,
    deleteBlog, deleteAllBlogs, deleteArchivedBlogs,
} from '../helpers/blog.service';
import {
    NOTEBOOK_QUERY_KEYS, BLOG_QUERY_KEYS, BLOGIFY_ROUTES,
    type NotebookRequest, type BlogRequest,
} from '../helpers/blog.constants';

const onError = (error: any, fallback: string) => {
    toast.error(error?.response?.data?.message || fallback);
};

export const useCreateNotebook = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: NotebookRequest) => createNotebook(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTEBOOK_QUERY_KEYS.ALL });
            toast.success('Notebook created!');
            navigate(BLOGIFY_ROUTES.LIBRARY);
        },
        onError: (e) => onError(e, 'Failed to create notebook'),
    });
};

export const useUpdateNotebook = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<NotebookRequest> }) => updateNotebook(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: NOTEBOOK_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: NOTEBOOK_QUERY_KEYS.DETAIL(id) });
            toast.success('Notebook updated!');
            navigate(BLOGIFY_ROUTES.LIBRARY);
        },
        onError: (e) => onError(e, 'Failed to update notebook'),
    });
};

export const useDeleteNotebook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteNotebook(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: NOTEBOOK_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success(`Notebook deleted! (${data.blogsDeleted} blogs removed)`);
        },
        onError: (e) => onError(e, 'Failed to delete notebook'),
    });
};

export const usePublishBlog = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ notebookId, data }: { notebookId: string; data: BlogRequest }) => publishBlog(notebookId, data),
        onSuccess: (_, { notebookId }) => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.NOTEBOOK(notebookId, 1) });
            toast.success('Blog published!');
            navigate(BLOGIFY_ROUTES.LIBRARY);
        },
        onError: (e) => onError(e, 'Failed to publish blog'),
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<BlogRequest> }) => updateBlog(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.DETAIL(id) });
            toast.success('Blog updated!');
            navigate(BLOGIFY_ROUTES.LIBRARY);
        },
        onError: (e) => onError(e, 'Failed to update blog'),
    });
};

export const useMoveBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ blogId, notebookId }: { blogId: string; notebookId: string }) => moveBlog(blogId, notebookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('Blog moved!');
        },
        onError: (e) => onError(e, 'Failed to move blog'),
    });
};

export const useArchiveBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => archiveBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('Blog archived!');
        },
        onError: (e) => onError(e, 'Failed to archive blog'),
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success('Blog deleted!');
        },
        onError: (e) => onError(e, 'Failed to delete blog'),
    });
};

export const useDeleteAllBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAllBlogs,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success(`${data.deleteCount} blogs deleted!`);
        },
        onError: (e) => onError(e, 'Failed to delete blogs'),
    });
};

export const useDeleteArchivedBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteArchivedBlogs,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.ALL });
            toast.success(`${data.deleteCount} archived blogs deleted!`);
        },
        onError: (e) => onError(e, 'Failed to delete archived blogs'),
    });
};
