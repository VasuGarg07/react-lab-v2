// blog.service.ts
import apiClient from "../../../shared/apiClient";
import { Blog, BlogListResponse, BlogRequest } from "./blog.constants";

const buildQuery = (params: Record<string, any>) =>
    Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&");

export const getRecentBlogs = async (): Promise<Blog[]> => {
    const { data } = await apiClient.get<{ blogs: Blog[] }>("/blogger/recent");
    return data.blogs;
};

export const fetchBlogs = async (endpoint: string, pageNum = 1, pageSize = 10, additionalParams = {}): Promise<BlogListResponse> => {
    const query = buildQuery({ page: pageNum, limit: pageSize, ...additionalParams });
    const { data } = await apiClient.get<BlogListResponse>(`/blogger/${endpoint}?${query}`);
    return data;
};

export const getBlogs = async (pageNum = 1, pageSize = 10): Promise<BlogListResponse> => {
    return await fetchBlogs("list", pageNum, pageSize);
};

export const getUserBlogs = async (pageNum = 1, pageSize = 10): Promise<BlogListResponse> => {
    return await fetchBlogs("list/me", pageNum, pageSize);
};

export const getBlogsOfAuthor = async (authorName: string, pageNum = 1, pageSize = 10): Promise<BlogListResponse> => {
    return await fetchBlogs("list/author", pageNum, pageSize, { authorName });
};

export const getBlogById = async (id: string): Promise<Blog> => {
    const { data } = await apiClient.get<{ blog: Blog }>(`/blogger/blog/${id}`);
    return data.blog;
}

export const getRelatedBlogs = async (id: string): Promise<Blog[]> => {
    const { data } = await apiClient.get<{ blogs: Blog[] }>(`/blogger/related/${id}`);
    return data.blogs;
}

export const publishBlog = async (request: BlogRequest): Promise<Blog> => {
    const { data } = await apiClient.post<{ blog: Blog }>("/blogger/publish", request);
    return data.blog;
};

export const updateBlog = async (id: string, request: Partial<BlogRequest>): Promise<Blog> => {
    const { data } = await apiClient.patch<{ blog: Blog }>(`/blogger/update/${id}`, request);
    return data.blog;
};

export const archiveBlog = async (id: string): Promise<void> => {
    await apiClient.patch(`/blogger/archive/${id}`);
};

export const deleteAllBlogs = async (): Promise<void> => {
    await apiClient.delete("/blogger/clear-all");
};

export const deleteArchivedBlogs = async (): Promise<void> => {
    await apiClient.delete("/blogger/clear-archived");
};

export const deleteBlogById = async (id: string): Promise<void> => {
    await apiClient.delete(`/blogger/clear/${id}`);
};
