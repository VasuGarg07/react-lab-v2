import { useNavigate } from 'react-router';
import { usePrefetchMeal } from './utils/useRecipeQueries';
import type { Meal } from './utils/recipe.helpers';

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    const navigate = useNavigate();
    const { prefetchMeal } = usePrefetchMeal();

    const handleClick = () => {
        navigate(`/recipe-haven/meal/${meal.id}`);
    };

    const handleMouseEnter = () => {
        // Prefetch meal details on hover for instant navigation
        prefetchMeal(meal.id);
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className="group bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:ring-offset-0"
        >
            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                    src={meal.image}
                    alt={meal.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-base text-center font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug">
                    {meal.name}
                </h3>
            </div>
        </div>
    );
};

export default MealCard;