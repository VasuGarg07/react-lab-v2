import apiClient from "@/shared/apiClient";
import {
    Notebook,
    Chapter,
    CreateNotebookRequest,
    UpdateNotebookRequest,
    VerifyNotebookPasswordRequest,
    CreateChapterRequest,
    UpdateChapterRequest,
} from "./notebook.constants";

// ---------- Notebook APIs ------------

export const getMyNotebooks = (): Promise<{ data: Notebook[] }> =>
    apiClient.get("/notebook/list");

export const getPublicNotebooks = (): Promise<{ data: Notebook[] }> =>
    apiClient.get("/notebook/public");

export const searchMyNotebooks = (query: string): Promise<{ data: Notebook[] }> =>
    apiClient.get(`/notebook/search/${query}`);

export const getNotebookById = (id: string): Promise<{ data: { notebook: Notebook; chapters?: Chapter[] } }> =>
    apiClient.get(`/notebook/view/${id}`);

export const createNotebook = (body: CreateNotebookRequest): Promise<{ data: { notebook: Notebook } }> =>
    apiClient.post("/notebook/create", body);

export const updateNotebook = (id: string, body: UpdateNotebookRequest): Promise<{ data: { notebook: Notebook } }> =>
    apiClient.patch(`/notebook/update/${id}`, body);

export const verifyNotebookPassword = (id: string, body: VerifyNotebookPasswordRequest): Promise<{ data: { message: string } }> =>
    apiClient.post(`/notebook/verify/${id}`, body);

export const deleteNotebook = (id: string): Promise<{ data: { message: string } }> =>
    apiClient.delete(`/notebook/delete/${id}`);

export const exportNotebookAsJson = (id: string): Promise<{ data: { notebook: Notebook; chapters: Chapter[] } }> =>
    apiClient.get(`/notebook/notebook/export/json/${id}`);

export const previewNotebook = (id: string): Promise<{ data: { preview: Pick<Notebook, "id" | "title" | "coverImage" | "visibility" | "updatedAt"> } }> =>
    apiClient.get(`/notebook/notebook/export/preview/${id}`);

// ----------- Chapter APIs -----------------

export const getChaptersForNotebook = (notebookId: string): Promise<{ data: Chapter[] }> =>
    apiClient.get(`/notebook/chapters/${notebookId}`);

export const searchChaptersInNotebook = (notebookId: string, query: string): Promise<{ data: Chapter[] }> =>
    apiClient.get(`/notebook/chapter/search/${notebookId}/${query}`);

export const getChapterById = (id: string): Promise<{ data: { chapter: Chapter } }> =>
    apiClient.get(`/notebook/chapter/${id}`);

export const createChapter = (body: CreateChapterRequest): Promise<{ data: { chapter: Chapter } }> =>
    apiClient.post("/notebook/chapter/create", body);

export const updateChapter = (id: string, body: UpdateChapterRequest): Promise<{ data: { chapter: Chapter } }> =>
    apiClient.patch(`/notebook/chapter/update/${id}`, body);

export const deleteChapter = (id: string): Promise<{ data: { message: string } }> =>
    apiClient.delete(`/notebook/chapter/delete/${id}`);
