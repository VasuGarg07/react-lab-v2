import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router';

interface UsePaginationReturn {
    currentPage: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    resetPage: () => void;
}

export const usePagination = (defaultPage: number = 1): UsePaginationReturn => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('page') || String(defaultPage));
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    const setPage = useCallback((page: number) => {
        setCurrentPage(page);
        setSearchParams(prev => {
            prev.set('page', String(page));
            return prev;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setSearchParams]);

    const nextPage = useCallback(() => {
        setPage(currentPage + 1);
    }, [currentPage, setPage]);

    const prevPage = useCallback(() => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    }, [currentPage, setPage]);

    const resetPage = useCallback(() => {
        setPage(defaultPage);
    }, [defaultPage, setPage]);

    return {
        currentPage,
        setPage,
        nextPage,
        prevPage,
        resetPage,
    };
};
