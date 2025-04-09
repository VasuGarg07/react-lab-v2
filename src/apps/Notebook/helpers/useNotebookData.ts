import { useState, useCallback } from "react";
import { Notebook } from "./notebook.constants";
import {
    getBookmarks,
    getMyNotebooks,
    getNotebookById,
    getPublicNotebooks,
    searchMyNotebooks,
} from "./notebookApi";
import { LoaderFunctionArgs } from "react-router";

export const useNotebookData = () => {
    const [notebooks, setNotebooks] = useState<Notebook[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMyNotebooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getMyNotebooks();
            setNotebooks(response.data || []);
        } catch (err: any) {
            setError(err?.response?.data?.error || "Failed to fetch notebooks.");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPublicNotebooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getPublicNotebooks();
            setNotebooks(response.data || []);
        } catch (err: any) {
            setError(err?.response?.data?.error || "Failed to fetch notebooks.");
        } finally {
            setLoading(false);
        }
    }, []);

    const searchNotebooks = useCallback(async (query: string) => {
        if (!query.trim()) return;
        try {
            setLoading(true);
            setError(null);
            const response = await searchMyNotebooks(query);
            setNotebooks(response.data || []);
        } catch (err: any) {
            setError(err?.response?.data?.error || "Search failed.");
        } finally {
            setLoading(false);
        }
    }, []);

    const getBookmarkedNotebooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getBookmarks();
            setNotebooks(response.data || []);
        } catch (err: any) {
            setError(err?.response?.data?.error || "Search failed.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        notebooks,
        loading,
        error,
        fetchMyNotebooks,
        fetchPublicNotebooks,
        searchNotebooks,
        getBookmarkedNotebooks
    };
};


export const notebookDetails = async ({ params }: LoaderFunctionArgs) => {
    try {
        const { data } = await getNotebookById(params.id!);
        return data;
    } catch (error) {
        console.error('Error loading blog:', error);
        throw error;
    }
}