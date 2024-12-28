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
    updatedAt: number
}

export interface BlogListResponse {
    data: Blog[],
    pagination: {
        currentPage: number,
        totalPages: number,
        totalItems: number,
        itemsPerPage: number
    }
}