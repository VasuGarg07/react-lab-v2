import { BookOpenText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Meal } from '@/apps/QuickByte/utils/recipe.helpers';
import { useCallback } from 'react';

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    const navigate = useNavigate();

    const handleMealNav = useCallback((id: string) => {
        navigate(`/recipe-haven/meal/${id}`);
    }, [navigate]);

    return (
        <div
            className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer transform transition-transform duration-200 hover:-translate-y-1"
            onClick={() => handleMealNav(meal.id)}
        >
            <div className="overflow-hidden">
                <div className="relative pt-[75%]">
                    <img
                        src={meal.image}
                        alt={meal.name}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="p-3">
                <div className="mt-1 flex items-center gap-1">
                    <h3 className="text-lg truncate flex-grow font-['Overlock'] tracking-wide uppercase text-neutral-800 dark:text-neutral-100">
                        {meal.name}
                    </h3>
                    <button
                        className="p-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation when clicking the button
                            handleMealNav(meal.id);
                        }}
                        aria-label="View recipe details"
                    >
                        <BookOpenText size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealCard;