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

const STATIC_STALE_TIME = 1000 * 60 * 60;

export const useCategories = () => useQuery<Category[]>({
    queryKey: ['recipe-categories'],
    queryFn: categoryDetails,
    staleTime: STATIC_STALE_TIME,
    retry: 2,
});

export const useAreas = () => useQuery<string[]>({
    queryKey: ['recipe-areas'],
    queryFn: areaList,
    staleTime: STATIC_STALE_TIME,
    retry: 2,
});

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
        enabled: Boolean(searchTerm || letter || categoryId || areaId),
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

export const useMealDetails = (mealId?: string) => useQuery<MealDetails>({
    queryKey: ['meal', 'details', mealId],
    queryFn: () => mealDetails(mealId!),
    enabled: !!mealId,
    staleTime: STATIC_STALE_TIME,
    retry: 2,
});

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
