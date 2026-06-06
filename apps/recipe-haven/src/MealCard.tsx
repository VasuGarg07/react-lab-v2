import { useNavigate } from 'react-router';
import type { Meal } from './utils/recipe.helpers';
import { usePrefetchMeal } from './utils/useRecipeQueries';

const MealCard = ({ meal }: { meal: Meal }) => {
    const navigate = useNavigate();
    const { prefetchMeal } = usePrefetchMeal();

    return (
        <button
            type="button"
            onClick={() => navigate(`/meal/${meal.id}`)}
            onMouseEnter={() => prefetchMeal(meal.id)}
            className="group text-left rounded-xl overflow-hidden border border-shadow/15 hover:border-magenta/50 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-magenta/40"
        >
            <div className="relative aspect-4/3 overflow-hidden bg-shadow/10">
                <img
                    src={meal.image}
                    alt={meal.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-shadow/80 via-shadow/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-serif text-base leading-snug text-white line-clamp-2">
                        {meal.name}
                    </h3>
                </div>
            </div>
        </button>
    );
};

export default MealCard;
