import { useNavigate } from 'react-router';
import type { Meal } from './utils/recipe.helpers';
import { usePrefetchMeal } from './utils/useRecipeQueries';

const MealCard = ({ meal }: { meal: Meal }) => {
    const navigate = useNavigate();
    const { prefetchMeal } = usePrefetchMeal();

    return (
        <button
            type="button"
            onClick={() => navigate(`/recipe-haven/meal/${meal.id}`)}
            onMouseEnter={() => prefetchMeal(meal.id)}
            className="group text-left bg-white/80 dark:bg-[#1e1c1a] rounded-lg overflow-hidden border border-iron/15 dark:border-ivory/8 hover:border-pollen transition focus:outline-none focus:ring-2 focus:ring-pollen/50"
        >
            <div className="relative aspect-4/3 overflow-hidden bg-iron/8 dark:bg-ivory/5">
                <img
                    src={meal.image}
                    alt={meal.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="font-serif text-lg leading-snug text-iron dark:text-ivory line-clamp-2 group-hover:text-carrot dark:group-hover:text-pollen transition-colors">
                    {meal.name}
                </h3>
            </div>
        </button>
    );
};

export default MealCard;
