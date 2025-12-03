// ============ Pagination ============

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

// ============ Notebook Types ============

export interface NotebookRequest {
    author: string;
    title: string;
    description?: string;
    coverImageUrl: string;
    isPublic?: boolean;
}

export interface Notebook extends NotebookRequest {
    id: string;
    userId: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NotebookListResponse {
    data: Notebook[];
    pagination: Pagination;
}

// ============ Blog Types ============

export interface BlogRequest {
    author: string;
    title: string;
    blogContent: string;
    tags?: string[];
    isArchived?: boolean;
}

export interface Blog extends Omit<BlogRequest, 'tags' | 'isArchived'> {
    id: string;
    userId: string;
    notebookId: string;
    tags: string[];
    isArchived: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface BlogListResponse {
    data: Blog[];
    pagination: Pagination;
}

// ============ UI Constants ============

export const BLOG_CONSTANTS = {
    MAX_TAGS: 5,
    MIN_TAGS: 1,
    MAX_TAG_LENGTH: 20,
    DEFAULT_PAGE_SIZE: 12,
    MIN_TITLE_LENGTH: 5,
    MAX_TITLE_LENGTH: 200,
    MIN_CONTENT_LENGTH: 20,
    RELATED_BLOGS_COUNT: 3,
    MAX_DESCRIPTION_LENGTH: 500,
} as const;

// ============ Route Paths ============

export const BLOGIFY_ROUTES = {
    // Main Nav
    HOME: '/blogify/home',
    DISCOVER: '/blogify/discover',
    LIBRARY: '/blogify/library',
    WRITE: '/blogify/write',

    // Notebooks
    NOTEBOOK_CREATE: '/blogify/notebooks/create',
    NOTEBOOK_EDIT: (id: string) => `/blogify/notebooks/edit/${id}`,
    NOTEBOOK_DETAIL: (id: string) => `/blogify/notebooks/${id}`,
    NOTEBOOK_AUTHOR: (author: string) => `/blogify/notebooks/author/${author}`,

    // Blogs
    BLOG_EDIT: (id: string) => `/blogify/blogs/edit/${id}`,
    BLOG_DETAIL: (id: string) => `/blogify/blogs/${id}`,
    BLOG_AUTHOR: (author: string) => `/blogify/blogs/author/${author}`,
} as const;

// ============ Query Keys ============

export const NOTEBOOK_QUERY_KEYS = {
    ALL: ['notebooks'] as const,
    LIST: (page: number) => ['notebooks', 'list', page] as const,
    USER: (page: number) => ['notebooks', 'user', page] as const,
    AUTHOR: (author: string, page: number) => ['notebooks', 'author', author, page] as const,
    DETAIL: (id: string) => ['notebooks', 'detail', id] as const,
} as const;

export const BLOG_QUERY_KEYS = {
    ALL: ['blogs'] as const,
    LIST: (page: number) => ['blogs', 'list', page] as const,
    USER: (page: number) => ['blogs', 'user', page] as const,
    AUTHOR: (author: string, page: number) => ['blogs', 'author', author, page] as const,
    NOTEBOOK: (notebookId: string, page: number) => ['blogs', 'notebook', notebookId, page] as const,
    DETAIL: (id: string) => ['blogs', 'detail', id] as const,
    RELATED: (id: string) => ['blogs', 'related', id] as const,
} as const;

export const STALE_TIME = {
    SHORT: 1000 * 60 * 2,  // 2 minutes
    DEFAULT: 1000 * 60 * 5, // 5 minutes
    LONG: 1000 * 60 * 10,   // 10 minutes
} as const;
