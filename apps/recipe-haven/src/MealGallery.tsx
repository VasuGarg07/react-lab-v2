import { AlertCircle, Loader2 } from 'lucide-react';
import { useParams } from 'react-router';
import MealCard from './MealCard';
import { useGalleryMeals } from './utils/useRecipeQueries';

export default function MealGallery() {
    const { searchTerm, letter, categoryId, areaId } = useParams();
    const { data: meals = [], isLoading, error } = useGalleryMeals({ searchTerm, letter, categoryId, areaId });

    const getKicker = () => {
        if (searchTerm) return 'Search results';
        if (letter) return 'By letter';
        if (categoryId) return 'Category';
        if (areaId) return 'Region';
        return '';
    };

    const getTitle = () => {
        if (searchTerm) return `"${searchTerm}"`;
        if (letter) return `Recipes starting with ${letter.toUpperCase()}`;
        if (categoryId) return capitalize(categoryId);
        if (areaId) return `${capitalize(areaId)} cuisine`;
        return 'Recipes';
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-pollen mb-3" />
                <p className="text-sm text-iron/60 dark:text-ivory/50">Loading recipes…</p>
            </div>
        );
    }

    if (error) {
        return (
            <EmptyState
                icon={<AlertCircle size={36} className="text-red-500" />}
                title="Couldn't load recipes"
                blurb="Something went wrong on our end. Try again in a moment."
            />
        );
    }

    if (meals.length === 0) {
        return (
            <EmptyState
                icon={<AlertCircle size={36} className="text-iron/30 dark:text-ivory/25" />}
                title="No recipes found"
                blurb="Try a different search term or browse a category."
            />
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-carrot font-medium">{getKicker()}</p>
                <div className="mt-1 flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-3xl sm:text-4xl text-iron dark:text-ivory">{getTitle()}</h2>
                    <span className="shrink-0 text-sm text-iron/50 dark:text-ivory/40">
                        {meals.length} {meals.length === 1 ? 'recipe' : 'recipes'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {meals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                ))}
            </div>
        </div>
    );
}

function EmptyState({ icon, title, blurb }: { icon: React.ReactNode; title: string; blurb: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4">{icon}</div>
            <h2 className="font-serif text-2xl text-iron dark:text-ivory mb-1">{title}</h2>
            <p className="text-sm text-iron/60 dark:text-ivory/50 max-w-sm">{blurb}</p>
        </div>
    );
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
