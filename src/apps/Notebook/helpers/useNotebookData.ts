import { useState, useCallback } from "react";
import { Notebook } from "./notebook.constants";
import {
    getMyNotebooks,
    getPublicNotebooks,
    searchMyNotebooks,
} from "./notebookApi";

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

    return {
        notebooks,
        loading,
        error,
        fetchMyNotebooks,
        fetchPublicNotebooks,
        searchNotebooks,
    };
};
