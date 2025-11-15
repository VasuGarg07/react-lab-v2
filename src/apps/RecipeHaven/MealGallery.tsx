import { useParams } from 'react-router';
import { Loader2, AlertCircle } from 'lucide-react';
import MealCard from './MealCard';
import {
    useSearchMeals,
    useAlphabetMeals,
    useCategoryMeals,
    useRegionalMeals
} from './utils/useRecipeQueries';

export default function MealGallery() {
    const { searchTerm, letter, categoryId, areaId } = useParams();

    // Determine which query to use based on route params
    let query;
    if (searchTerm) {
        query = useSearchMeals(searchTerm);
    } else if (letter) {
        query = useAlphabetMeals(letter);
    } else if (categoryId) {
        query = useCategoryMeals(categoryId);
    } else {
        query = useRegionalMeals(areaId);
    }

    const { data: meals = [], isLoading, error } = query;

    // Generate title based on query type
    const getTitle = () => {
        if (searchTerm) return `Search results for "${searchTerm}"`;
        if (letter) return `Recipes starting with "${letter.toUpperCase()}"`;
        if (categoryId) return `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} recipes`;
        if (areaId) return `${areaId.charAt(0).toUpperCase() + areaId.slice(1)} cuisine`;
        return 'Recipes';
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400">Loading recipes...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Failed to load recipes
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Please try again later
                </p>
            </div>
        );
    }

    // Empty state
    if (meals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <AlertCircle size={48} className="text-neutral-400 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    No recipes found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Try a different search term or category
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Title */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {getTitle()}
                </h2>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {meals.length} {meals.length === 1 ? 'recipe' : 'recipes'}
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {meals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                ))}
            </div>
        </div>
    );
};