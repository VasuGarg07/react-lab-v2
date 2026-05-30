import { useNavigate } from 'react-router';
import type { Meal } from './utils/recipe.helpers';
import { usePrefetchMeal } from './utils/useRecipeQueries';

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    const navigate = useNavigate();
    const { prefetchMeal } = usePrefetchMeal();

    return (
        <button
            type="button"
            onClick={() => navigate(`/recipe-haven/meal/${meal.id}`)}
            onMouseEnter={() => prefetchMeal(meal.id)}
            className="group text-left bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-stone-200 dark:border-neutral-800 hover:border-amber-600 dark:hover:border-amber-500 transition focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-neutral-800">
                <img
                    src={meal.image}
                    alt={meal.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="font-serif text-lg leading-snug text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                    {meal.name}
                </h3>
            </div>
        </button>
    );
};

export default MealCard;
