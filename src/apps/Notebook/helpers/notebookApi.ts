import apiClient from "@/shared/apiClient";
import {
    Notebook,
    Chapter,
    CreateNotebookRequest,
    UpdateNotebookRequest,
    VerifyNotebookPasswordRequest,
    CreateChapterRequest,
    UpdateChapterRequest,
    Author,
} from "./notebook.constants";

export type Response<T> = Promise<{ data: T }>;

// ---------- Notebook APIs ------------

export const getMyNotebooks = (): Response<Notebook[]> =>
    apiClient.get("/notebook/list");

export const getPublicNotebooks = (): Response<Notebook[]> =>
    apiClient.get("/notebook/public");

export const searchMyNotebooks = (query: string): Response<Notebook[]> =>
    apiClient.get(`/notebook/search/${query}`);

export const getBookmarks = (): Response<Notebook[]> =>
    apiClient.get(`/notebook/bookmark`);

export const getNotebookById = (id: string): Response<{ notebook: Notebook; chapters?: Chapter[], author: Author }> =>
    apiClient.get(`/notebook/view/${id}`);

export const createNotebook = (body: CreateNotebookRequest): Response<{ notebook: Notebook }> =>
    apiClient.post("/notebook/create", body);

export const updateNotebook = (id: string, body: UpdateNotebookRequest): Response<{ notebook: Notebook }> =>
    apiClient.patch(`/notebook/update/${id}`, body);

export const verifyNotebookPassword = (id: string, body: VerifyNotebookPasswordRequest): Response<{ message: string }> =>
    apiClient.post(`/notebook/verify/${id}`, body);

export const deleteNotebook = (id: string): Response<{ message: string }> =>
    apiClient.delete(`/notebook/delete/${id}`);

export const exportNotebookAsJson = (id: string): Response<{ notebook: Notebook; chapters: Chapter[] }> =>
    apiClient.get(`/notebook/notebook/export/json/${id}`);

export const previewNotebook = (id: string): Response<{ preview: Pick<Notebook, "id" | "title" | "coverImageUrl" | "visibility" | "updatedAt"> }> =>
    apiClient.get(`/notebook/notebook/export/preview/${id}`);

export const bookmarkNotebook = (id: string): Response<{ message: string }> =>
    apiClient.post(`/notebook/bookmark/${id}`, {});

export const removeBookmark = (id: string): Response<{ message: string }> =>
    apiClient.delete(`/notebook/bookmark/${id}`);

// ----------- Chapter APIs -----------------

export const getChaptersForNotebook = (notebookId: string): Response<Chapter[]> =>
    apiClient.get(`/notebook/chapters/${notebookId}`);

export const searchChaptersInNotebook = (notebookId: string, query: string): Response<Chapter[]> =>
    apiClient.get(`/notebook/chapter/search/${notebookId}/${query}`);

export const getChapterById = (id: string): Response<{ chapter: Chapter }> =>
    apiClient.get(`/notebook/chapter/${id}`);

export const createChapter = (body: CreateChapterRequest): Response<{ chapter: Chapter }> =>
    apiClient.post("/notebook/chapter/create", body);

export const updateChapter = (id: string, body: UpdateChapterRequest): Response<{ chapter: Chapter }> =>
    apiClient.patch(`/notebook/chapter/update/${id}`, body);

export const deleteChapter = (id: string): Response<{ message: string }> =>
    apiClient.delete(`/notebook/chapter/delete/${id}`);
