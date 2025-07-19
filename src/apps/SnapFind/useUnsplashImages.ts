// hooks/useUnsplashImages.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { Image, unsplashImages } from "./snapfind.helper";

interface UnsplashParams {
    query: string;
    page: number;
    value: string | null;
}

interface UnsplashResponse {
    results: Image[];
    total_pages: number;
}

export const useUnsplashImages = ({ query, page, value }: UnsplashParams) => {
    const queryClient = useQueryClient();

    const queryResult = useQuery<UnsplashResponse>({
        queryKey: ['unsplash-images', query, page, value],
        queryFn: () => unsplashImages(query, page, value),
        enabled: !!query, // Only fetch when query exists
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    });

    // Prefetch next page for better UX
    const prefetchNextPage = useCallback(() => {
        if (query && queryResult.data && page < queryResult.data.total_pages) {
            queryClient.prefetchQuery({
                queryKey: ['unsplash-images', query, page + 1, value],
                queryFn: () => unsplashImages(query, page + 1, value),
                staleTime: 1000 * 60 * 5,
            });
        }
    }, [query, page, value, queryResult.data, queryClient]);

    // Auto-prefetch when data loads
    useMemo(() => {
        if (queryResult.data && !queryResult.isFetching) {
            prefetchNextPage();
        }
    }, [queryResult.data, queryResult.isFetching, prefetchNextPage]);

    return {
        ...queryResult,
        images: queryResult.data?.results || [],
        totalPages: queryResult.data?.total_pages || 0,
        prefetchNextPage,
    };
};
