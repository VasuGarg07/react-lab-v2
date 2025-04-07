export const PAGE_LIMIT = 20;
export const PRIVACY_OPTIONS = ["public", "private"] as const;
export const DEFAULT_NOTEBOOK_COVER = "/assets/default-cover.jpg";

export const STRINGS = {
    appTitle: "Notebook",
    newNotebook: "New Notebook",
    untitledPage: "Untitled Page",
    saveSuccess: "Changes saved successfully.",
    saveError: "Something went wrong. Please try again.",
    deleteConfirm: "Are you sure you want to delete this?",
};

export type Visibility = "public" | "private";

// ─── Response Types ───
export interface Notebook {
    id: string;
    title: string;
    coverImage?: string;
    visibility: Visibility;
    createdAt: number;
    updatedAt: number;
    chapterCount?: number;
    author?: Author
}

export interface Chapter {
    id: string;
    notebookId: string;
    title: string;
    content: string;
    order: number;
    createdAt: number;
    updatedAt: number;
}

export interface Author {
    userId: string;
    name: string;
    avatar: string; // compressed base64 or external URL
}

// ─── Request Types ───

// Notebook
export interface CreateNotebookRequest {
    title: string;
    coverImageUrl?: string;
    visibility: Visibility;
    password?: string;
}

export interface UpdateNotebookRequest {
    title?: string;
    coverImageUrl?: string;
    visibility?: Visibility;
    password?: string;
}

export interface VerifyNotebookPasswordRequest {
    password: string;
}

// Chapter
export interface CreateChapterRequest {
    notebookId: string;
    title: string;
    content?: string;
    order?: number;
}

export interface UpdateChapterRequest {
    title?: string;
    content?: string;
    order?: number;
}