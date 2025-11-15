import { useQuery } from '@tanstack/react-query';
import {
    getBlogs,
    getUserBlogs,
    getBlogsOfAuthor,
    getBlogById,
    getRelatedBlogs,
    getRecentBlogs,
} from '../helpers/blog.service';
import { BLOG_QUERY_KEYS, BLOG_CONSTANTS } from '../helpers/blog.constants';

/**
 * Fetch paginated list of all blogs
 */
export const useBlogs = (page: number = 1, pageSize: number = BLOG_CONSTANTS.DEFAULT_PAGE_SIZE) => {
    return useQuery({
        queryKey: BLOG_QUERY_KEYS.LIST(page),
        queryFn: () => getBlogs(page, pageSize),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

/**
 * Fetch paginated list of current user's blogs
 */
export const useUserBlogs = (page: number = 1, pageSize: number = BLOG_CONSTANTS.DEFAULT_PAGE_SIZE) => {
    return useQuery({
        queryKey: BLOG_QUERY_KEYS.USER_BLOGS(page),
        queryFn: () => getUserBlogs(page, pageSize),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

/**
 * Fetch paginated list of blogs by specific author
 */
export const useBlogsByAuthor = (
    author: string,
    page: number = 1,
    pageSize: number = BLOG_CONSTANTS.DEFAULT_PAGE_SIZE
) => {
    return useQuery({
        queryKey: BLOG_QUERY_KEYS.AUTHOR(author, page),
        queryFn: () => getBlogsOfAuthor(author, page, pageSize),
        enabled: !!author, // Only run if author is provided
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

/**
 * Fetch single blog by ID
 */
export const useBlogDetail = (id: string) => {
    return useQuery({
        queryKey: BLOG_QUERY_KEYS.DETAIL(id),
        queryFn: () => getBlogById(id),
        enabled: !!id, // Only run if id is provided
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

/**
 * Fetch related blogs for a specific blog
 */
export const useRelatedBlogs = (id: string) => {
    return useQuery({
        queryKey: BLOG_QUERY_KEYS.RELATED(id),
        queryFn: () => getRelatedBlogs(id),
        enabled: !!id, // Only run if id is provided
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

/**
 * Fetch recent blogs for home page
 */
export const useRecentBlogs = () => {
    return useQuery({
        queryKey: BLOG_QUERY_KEYS.RECENT,
        queryFn: getRecentBlogs,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};
