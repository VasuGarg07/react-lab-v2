import { useQuery } from '@tanstack/react-query';
import {
    getNotebooks, getUserNotebooks, getNotebooksByAuthor, getNotebookById,
    getBlogs, getUserBlogs, getBlogsByAuthor, getBlogsByNotebook, getBlogById, getRelatedBlogs,
} from '../helpers/blog.service';
import { NOTEBOOK_QUERY_KEYS, BLOG_QUERY_KEYS, BLOG_CONSTANTS, STALE_TIME } from '../helpers/blog.constants';

const DEFAULT_LIMIT = BLOG_CONSTANTS.DEFAULT_PAGE_SIZE;

export const useNotebooks = (page = 1, limit: number = DEFAULT_LIMIT) => useQuery({
    queryKey: NOTEBOOK_QUERY_KEYS.LIST(page),
    queryFn: () => getNotebooks(page, limit),
    staleTime: STALE_TIME.DEFAULT,
});

export const useUserNotebooks = (page = 1, limit: number = DEFAULT_LIMIT) => useQuery({
    queryKey: NOTEBOOK_QUERY_KEYS.USER(page),
    queryFn: () => getUserNotebooks(page, limit),
    staleTime: STALE_TIME.DEFAULT,
});

export const useNotebooksByAuthor = (author: string, page = 1, limit: number = DEFAULT_LIMIT) => useQuery({
    queryKey: NOTEBOOK_QUERY_KEYS.AUTHOR(author, page),
    queryFn: () => getNotebooksByAuthor(author, page, limit),
    enabled: !!author,
    staleTime: STALE_TIME.DEFAULT,
});

export const useNotebook = (id: string) => useQuery({
    queryKey: NOTEBOOK_QUERY_KEYS.DETAIL(id),
    queryFn: () => getNotebookById(id),
    enabled: !!id,
    staleTime: STALE_TIME.LONG,
});

export const useBlogs = (page = 1, limit: number = DEFAULT_LIMIT) => useQuery({
    queryKey: BLOG_QUERY_KEYS.LIST(page),
    queryFn: () => getBlogs(page, limit),
    staleTime: STALE_TIME.DEFAULT,
});

export const useUserBlogs = (page = 1, limit: number = DEFAULT_LIMIT) => useQuery({
    queryKey: BLOG_QUERY_KEYS.USER(page),
    queryFn: () => getUserBlogs(page, limit),
    staleTime: STALE_TIME.DEFAULT,
});

export const useBlogsByAuthor = (author: string, page = 1, limit: number = DEFAULT_LIMIT) => useQuery({
    queryKey: BLOG_QUERY_KEYS.AUTHOR(author, page),
    queryFn: () => getBlogsByAuthor(author, page, limit),
    enabled: !!author,
    staleTime: STALE_TIME.DEFAULT,
});

export const useBlogsByNotebook = (notebookId: string, page = 1, limit: number = DEFAULT_LIMIT) => useQuery({
    queryKey: BLOG_QUERY_KEYS.NOTEBOOK(notebookId, page),
    queryFn: () => getBlogsByNotebook(notebookId, page, limit),
    enabled: !!notebookId,
    staleTime: STALE_TIME.DEFAULT,
});

export const useBlog = (id: string) => useQuery({
    queryKey: BLOG_QUERY_KEYS.DETAIL(id),
    queryFn: () => getBlogById(id),
    enabled: !!id,
    staleTime: STALE_TIME.LONG,
});

export const useRelatedBlogs = (id: string) => useQuery({
    queryKey: BLOG_QUERY_KEYS.RELATED(id),
    queryFn: () => getRelatedBlogs(id),
    enabled: !!id,
    staleTime: STALE_TIME.LONG,
});
