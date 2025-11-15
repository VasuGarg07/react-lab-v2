import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    categoryList,
    areaList,
    searchMeals,
    alphabetMeals,
    categoryMeals,
    regionalMeals,
    mealDetails,
    randomMealId
} from './recipe.api';
import type { Meal, MealDetails } from './recipe.helpers';

// Common stale time for static data (1 hour)
const STATIC_STALE_TIME = 1000 * 60 * 60;

// Get all categories
export const useCategories = () => {
    return useQuery<string[]>({
        queryKey: ['recipe-categories'],
        queryFn: categoryList,
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

// Get all areas/regions
export const useAreas = () => {
    return useQuery<string[]>({
        queryKey: ['recipe-areas'],
        queryFn: areaList,
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

// Search meals by term
export const useSearchMeals = (searchTerm?: string) => {
    return useQuery<Meal[]>({
        queryKey: ['meals', 'search', searchTerm],
        queryFn: () => searchMeals(searchTerm!),
        enabled: !!searchTerm && searchTerm.trim().length > 0,
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 2,
    });
};

// Get meals by alphabet letter
export const useAlphabetMeals = (letter?: string) => {
    return useQuery<Meal[]>({
        queryKey: ['meals', 'alphabet', letter],
        queryFn: () => alphabetMeals(letter!),
        enabled: !!letter && letter.length === 1,
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

// Get meals by category
export const useCategoryMeals = (categoryId?: string) => {
    return useQuery<Meal[]>({
        queryKey: ['meals', 'category', categoryId],
        queryFn: () => categoryMeals(categoryId!),
        enabled: !!categoryId,
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

// Get meals by region/area
export const useRegionalMeals = (areaId?: string) => {
    return useQuery<Meal[]>({
        queryKey: ['meals', 'area', areaId],
        queryFn: () => regionalMeals(areaId!),
        enabled: !!areaId,
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

// Get meal details by ID
export const useMealDetails = (mealId?: string) => {
    return useQuery<MealDetails>({
        queryKey: ['meal', 'details', mealId],
        queryFn: () => mealDetails(mealId!),
        enabled: !!mealId,
        staleTime: STATIC_STALE_TIME,
        retry: 2,
    });
};

// Hook for random meal navigation
export const useRandomMeal = () => {
    const queryClient = useQueryClient();

    const getRandomMeal = async () => {
        const randomId = await randomMealId();

        // Prefetch meal details for instant navigation
        queryClient.prefetchQuery({
            queryKey: ['meal', 'details', randomId],
            queryFn: () => mealDetails(randomId),
            staleTime: STATIC_STALE_TIME,
        });

        return randomId;
    }

    return { getRandomMeal };
};

// Hook to prefetch meal details on hover
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