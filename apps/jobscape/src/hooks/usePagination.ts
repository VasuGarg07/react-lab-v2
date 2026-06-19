import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

export const usePagination = (defaultPage = 1) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('page') || String(defaultPage));
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    const setPage = useCallback((page: number) => {
        setCurrentPage(page);
        setSearchParams((prev) => {
            prev.set('page', String(page));
            return prev;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setSearchParams]);

    return { currentPage, setPage };
};
