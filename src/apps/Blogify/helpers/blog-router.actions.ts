import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import { getBlogById, getBlogs, getBlogsOfAuthor, getRecentBlogs, getRelatedBlogs, getUserBlogs, publishBlog, updateBlog } from "./blog.service";

export const publishBlogLoader = async ({ params }: LoaderFunctionArgs) => {
    // If no blogId, return initial data
    if (!params.blogId) {
        return { blog: null };
    }

    try {
        const blog = await getBlogById(params.blogId);
        return { blog };
    } catch (error) {
        console.error('Error loading blog:', error);
        throw error;
    }
};

export const publishBlogAction = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const blogData = {
        title: formData.get('title') as string,
        author: formData.get('author') as string,
        coverImageUrl: formData.get('coverImageUrl') as string,
        blogContent: formData.get('blogContent') as string,
        tags: JSON.parse(formData.get('tags') as string),
        isArchived: formData.get('isArchived') === 'true'
    };

    try {
        if (params.blogId) {
            await updateBlog(params.blogId, blogData);
        } else {
            await publishBlog(blogData);
        }
        return redirect('/blogify/me');
    } catch (error) {
        return { error: 'Failed to save blog' };
    }
};

export const blogListLoader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const author = url.searchParams.get('author');

    try {
        const response = author ? await getBlogsOfAuthor(author, page) : await getBlogs(page);
        return response;
    } catch (error) {
        console.error('Error loading blogs:', error);
        throw error;
    }
};

export const myBlogsLoader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');

    try {
        const response = await getUserBlogs(page);
        return response;
    } catch (error) {
        console.error('Error loading blogs:', error);
        throw error;
    }
};


export const blogDetailLoader = async ({ params }: LoaderFunctionArgs) => {
    try {
        // Get current blog
        const blog = await getBlogById(params.blogId!);

        // Get related blogs
        const relatedBlogs = await getRelatedBlogs(params.blogId!);

        return { blog, relatedBlogs };
    } catch (error) {
        console.error('Error loading blog:', error);
        throw error;
    }
};

export const homeLoader = async () => {
    try {
        const recentBlogs = await getRecentBlogs();
        return { recentBlogs };
    } catch (error) {
        console.error('Error loading recent blogs:', error);
        throw error;
    }
};
