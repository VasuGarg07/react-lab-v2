export interface BlogRequest {
    author: string;
    title: string;
    coverImageUrl: string;
    blogContent: string;
    tags: string[];
    isArchived: boolean;
}

export interface Blog extends BlogRequest {
    id: string;
    userId: string;
    createdAt: number;
    updatedAt: number;
}

export interface BlogListResponse {
    data: Blog[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

// UI Constants
export const BLOG_CONSTANTS = {
    MAX_TAGS: 5,
    MIN_TAGS: 1,
    MAX_TAG_LENGTH: 20,
    DEFAULT_PAGE_SIZE: 12,
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 200,
    MIN_CONTENT_LENGTH: 100,
    FEATURED_BLOGS_COUNT: 6,
    RELATED_BLOGS_COUNT: 3,
} as const;

// Route Paths
export const BLOG_ROUTES = {
    HOME: '/blogify/home',
    LIST: '/blogify/list',
    MY_BLOGS: '/blogify/me',
    PUBLISH: '/blogify/publish',
    EDIT: (id: string) => `/blogify/edit/${id}`,
    DETAIL: (id: string) => `/blogify/blog/${id}`,
    AUTHOR: (author: string) => `/blogify/list/${author}`,
} as const;

// Query Keys for React Query
export const BLOG_QUERY_KEYS = {
    ALL: ['blogs'] as const,
    LIST: (page: number) => ['blogs', 'list', page] as const,
    USER_BLOGS: (page: number) => ['blogs', 'user', page] as const,
    DETAIL: (id: string) => ['blogs', 'detail', id] as const,
    RELATED: (id: string) => ['blogs', 'related', id] as const,
    RECENT: ['blogs', 'recent'] as const,
    AUTHOR: (author: string, page: number) => ['blogs', 'author', author, page] as const,
} as const;
