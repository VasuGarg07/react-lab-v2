// hooks/useRecipeQueries.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
    categoryList,
    areaList,
    mealDetails,
    random
} from '@/apps/QuickByte/utils/recipe.api';
import { MealDetails } from '@/apps/QuickByte/utils/recipe.helpers';

export const useCategories = () => {
    return useQuery<string[]>({
        queryKey: ['recipe-categories'],
        queryFn: categoryList,
        staleTime: 1000 * 60 * 60,
        retry: 2,
    });
};

export const useAreas = () => {
    return useQuery<string[]>({
        queryKey: ['recipe-areas'],
        queryFn: areaList,
        staleTime: 1000 * 60 * 60,
        retry: 2,
    });
};

export const useCacheLoaderData = <T>(
    queryKey: string[],
    data: T,
    staleTime: number = 1000 * 60 * 10
) => {
    const queryClient = useQueryClient();

    // Cache the loader data immediately
    queryClient.setQueryData(queryKey, data);

    return useQuery<T>({
        queryKey,
        queryFn: () => data, // This won't be called since data is already set
        staleTime,
        initialData: data,
    });
};

export const useMealDetailsCache = (mealId: string, initialData?: MealDetails) => {
    return useQuery<MealDetails>({
        queryKey: ['recipe-details', mealId],
        queryFn: () => mealDetails({ params: { mealId } } as any),
        enabled: !!mealId,
        staleTime: 1000 * 60 * 60, // 1 hour - recipes don't change
        initialData,
        retry: 2,
    });
};

export const useRandomMeal = () => {
    const queryClient = useQueryClient();

    const getRandomMeal = useCallback(async () => {
        try {
            const randomId = await random();

            // Prefetch the meal details for instant navigation
            queryClient.prefetchQuery({
                queryKey: ['recipe-details', randomId],
                queryFn: () => mealDetails({ params: { mealId: randomId } } as any),
                staleTime: 1000 * 60 * 60,
            });

            return randomId;
        } catch (error) {
            console.error('Failed to get random meal:', error);
            throw error;
        }
    }, [queryClient]);

    return { getRandomMeal };
};

export const usePrefetchPopular = () => {
    const queryClient = useQueryClient();

    const prefetchMealDetails = useCallback((mealId: string) => {
        queryClient.prefetchQuery({
            queryKey: ['recipe-details', mealId],
            queryFn: () => mealDetails({ params: { mealId } } as any),
            staleTime: 1000 * 60 * 60,
        });
    }, [queryClient]);

    const prefetchPopularCategories = useCallback(() => {
        queryClient.prefetchQuery({
            queryKey: ['recipe-categories'],
            queryFn: categoryList,
            staleTime: 1000 * 60 * 30,
        });

        queryClient.prefetchQuery({
            queryKey: ['recipe-areas'],
            queryFn: areaList,
            staleTime: 1000 * 60 * 30,
        });
    }, [queryClient]);

    return { prefetchMealDetails, prefetchPopularCategories };
};