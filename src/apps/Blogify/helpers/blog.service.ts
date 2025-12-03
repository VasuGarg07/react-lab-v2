import apiClient from "../../../shared/apiClient";
import type {
    Blog,
    BlogListResponse,
    BlogRequest,
    Notebook,
    NotebookListResponse,
    NotebookRequest,
} from "./blog.constants";

// ============ API URLs ============

const NOTEBOOK_URL = "/blogify/notebooks";
const BLOG_URL = "/blogify/blogs";

// ============ Helpers ============

const buildQuery = (page = 1, limit = 10) => new URLSearchParams({ page: String(page), limit: String(limit) });

// ============ Notebooks ============

export const getNotebooks = async (page = 1, limit = 10): Promise<NotebookListResponse> => {
    const query = buildQuery(page, limit);
    const { data } = await apiClient.get<NotebookListResponse>(`${NOTEBOOK_URL}/list?${query}`);
    return data;
};

export const getUserNotebooks = async (page = 1, limit = 10): Promise<NotebookListResponse> => {
    const query = buildQuery(page, limit);
    const { data } = await apiClient.get<NotebookListResponse>(`${NOTEBOOK_URL}/list/me?${query}`);
    return data;
};

export const getNotebooksByAuthor = async (author: string, page = 1, limit = 10): Promise<NotebookListResponse> => {
    const query = buildQuery(page, limit);
    const { data } = await apiClient.get<NotebookListResponse>(`${NOTEBOOK_URL}/list/author/${author}?${query}`);
    return data;
};

export const getNotebookById = async (id: string): Promise<Notebook> => {
    const { data } = await apiClient.get<{ notebook: Notebook }>(`${NOTEBOOK_URL}/notebook/${id}`);
    return data.notebook;
};

export const createNotebook = async (request: NotebookRequest): Promise<Notebook> => {
    const { data } = await apiClient.post<{ notebook: Notebook }>(`${NOTEBOOK_URL}/create`, request);
    return data.notebook;
};

export const updateNotebook = async (id: string, request: Partial<NotebookRequest>): Promise<Notebook> => {
    const { data } = await apiClient.patch<{ notebook: Notebook }>(`${NOTEBOOK_URL}/update/${id}`, request);
    return data.notebook;
};

export const deleteNotebook = async (id: string): Promise<{ blogsDeleted: number }> => {
    const { data } = await apiClient.delete<{ blogsDeleted: number }>(`${NOTEBOOK_URL}/clear/${id}`);
    return data;
};

// ============ Blogs ============

export const getBlogs = async (page = 1, limit = 10): Promise<BlogListResponse> => {
    const query = buildQuery(page, limit);
    const { data } = await apiClient.get<BlogListResponse>(`${BLOG_URL}/list?${query}`);
    return data;
};

export const getUserBlogs = async (page = 1, limit = 10): Promise<BlogListResponse> => {
    const query = buildQuery(page, limit);
    const { data } = await apiClient.get<BlogListResponse>(`${BLOG_URL}/list/me?${query}`);
    return data;
};

export const getBlogsByAuthor = async (author: string, page = 1, limit = 10): Promise<BlogListResponse> => {
    const query = buildQuery(page, limit);
    const { data } = await apiClient.get<BlogListResponse>(`${BLOG_URL}/list/author/${author}?${query}`);
    return data;
};

export const getBlogsByNotebook = async (notebookId: string, page = 1, limit = 10): Promise<BlogListResponse> => {
    const query = buildQuery(page, limit);
    const { data } = await apiClient.get<BlogListResponse>(`${BLOG_URL}/list/notebook/${notebookId}?${query}`);
    return data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
    const { data } = await apiClient.get<{ blog: Blog }>(`${BLOG_URL}/blog/${id}`);
    return data.blog;
};

export const getRelatedBlogs = async (id: string): Promise<Blog[]> => {
    const { data } = await apiClient.get<{ blogs: Blog[] }>(`${BLOG_URL}/related/${id}`);
    return data.blogs;
};

export const publishBlog = async (notebookId: string, request: BlogRequest): Promise<Blog> => {
    const { data } = await apiClient.post<{ blog: Blog }>(`${BLOG_URL}/publish/${notebookId}`, request);
    return data.blog;
};

export const updateBlog = async (id: string, request: Partial<BlogRequest>): Promise<Blog> => {
    const { data } = await apiClient.patch<{ blog: Blog }>(`${BLOG_URL}/update/${id}`, request);
    return data.blog;
};

export const moveBlog = async (blogId: string, notebookId: string): Promise<Blog> => {
    const { data } = await apiClient.patch<{ blog: Blog }>(`${BLOG_URL}/move/${blogId}/${notebookId}`);
    return data.blog;
};

export const archiveBlog = async (id: string): Promise<Blog> => {
    const { data } = await apiClient.patch<{ blog: Blog }>(`${BLOG_URL}/archive/${id}`);
    return data.blog;
};

export const deleteAllBlogs = async (): Promise<{ deleteCount: number }> => {
    const { data } = await apiClient.delete<{ deleteCount: number }>(`${BLOG_URL}/clear`);
    return data;
};

export const deleteArchivedBlogs = async (): Promise<{ deleteCount: number }> => {
    const { data } = await apiClient.delete<{ deleteCount: number }>(`${BLOG_URL}/clear-archived`);
    return data;
};

export const deleteBlog = async (id: string): Promise<{ deleteCount: number }> => {
    const { data } = await apiClient.delete<{ deleteCount: number }>(`${BLOG_URL}/clear/${id}`);
    return data;
};