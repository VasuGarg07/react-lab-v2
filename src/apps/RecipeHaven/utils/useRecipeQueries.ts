import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    alphabetMeals,
    areaList,
    categoryDetails,
    categoryMeals,
    mealDetails,
    randomMealId,
    regionalMeals,
    searchMeals,
} from './recipe.api';
import type { Category, Meal, MealDetails } from './recipe.helpers';

// Common stale time for static data (1 hour)
const STATIC_STALE_TIME = 1000 * 60 * 60;

/** Categories with thumbnails and descriptions. */
export const useCategories = () => useQuery<Category[]>({
    queryKey: ['recipe-categories'],
    queryFn: categoryDetails,
    staleTime: STATIC_STALE_TIME,
    retry: 2,
});

/** Region/cuisine names. */
export const useAreas = () => useQuery<string[]>({
    queryKey: ['recipe-areas'],
    queryFn: areaList,
    staleTime: STATIC_STALE_TIME,
    retry: 2,
});

/**
 * Unified gallery query — picks the right endpoint based on which param is
 * set. Replaces four parallel `useXMeals` hooks, which the old MealGallery
 * was calling conditionally (rules-of-hooks violation). This hook is always
 * called once; only the query key and fetcher change.
 */
export type GalleryParams = {
    searchTerm?: string;
    letter?: string;
    categoryId?: string;
    areaId?: string;
};

export const useGalleryMeals = ({ searchTerm, letter, categoryId, areaId }: GalleryParams) => {
    return useQuery<Meal[]>({
        queryKey: ['meals', 'gallery', { searchTerm, letter, categoryId, areaId }],
        queryFn: () => {
            if (searchTerm) return searchMeals(searchTerm);
            if (letter) return alphabetMeals(letter);
            if (categoryId) return categoryMeals(categoryId);
            if (areaId) return regionalMeals(areaId);
            return Promise.resolve([]);
        },
        // Don't fire if no param is set — but the hook is still mounted,
        // which is the whole point of this refactor.
        enabled: Boolean(searchTerm || letter || categoryId || areaId),
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

/** Single meal by ID. */
export const useMealDetails = (mealId?: string) => useQuery<MealDetails>({
    queryKey: ['meal', 'details', mealId],
    queryFn: () => mealDetails(mealId!),
    enabled: !!mealId,
    staleTime: STATIC_STALE_TIME,
    retry: 2,
});

/** Fetch a random meal ID and prefetch its details. Returns the ID for navigation. */
export const useRandomMeal = () => {
    const queryClient = useQueryClient();

    const getRandomMeal = async () => {
        const randomId = await randomMealId();
        queryClient.prefetchQuery({
            queryKey: ['meal', 'details', randomId],
            queryFn: () => mealDetails(randomId),
            staleTime: STATIC_STALE_TIME,
        });
        return randomId;
    };

    return { getRandomMeal };
};

/** Prefetch a meal's details — wire this to MealCard hover for instant nav. */
export const usePrefetchMeal = () => {
    const queryClient = useQueryClient();

    const prefetchMeal = (mealId: string) => {
        queryClient.prefetchQuery({
            queryKey: ['meal', 'details', mealId],
            queryFn: () => mealDetails(mealId),
            staleTime: STATIC_STALE_TIME,
        });
    };

    return { prefetchMeal };
};