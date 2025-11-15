import { useParams, useNavigate } from 'react-router';
import { Loader2, AlertCircle, ExternalLink, Play } from 'lucide-react';
import { useMealDetails } from './utils/useRecipeQueries';
import { toastService } from '../../shared/toastr';

export default function MealDetails() {
    const { mealId } = useParams();
    const navigate = useNavigate();
    const { data: meal, isLoading, error } = useMealDetails(mealId);

    const handleAreaNav = () => {
        if (meal?.area) {
            navigate(`/recipe-haven/area/${meal.area.toLowerCase()}`);
        }
    };

    const handleCategoryNav = () => {
        if (meal?.category) {
            navigate(`/recipe-haven/category/${meal.category.toLowerCase()}`);
        }
    };

    const handleExternalUrl = (url: string) => {
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (error) {
            toastService.error('Failed to open external link');
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400">Loading recipe...</p>
            </div>
        );
    }

    // Error state
    if (error || !meal) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Failed to load recipe
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Please try again later
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5 sm:space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {meal.name}
            </h1>

            {/* Top Layout: Image + Meta */}
            <div className="grid gap-4 sm:gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
                {/* Image */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm bg-neutral-100 dark:bg-neutral-900">
                    <img
                        src={meal.image}
                        alt={meal.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                    />
                </div>

                {/* Meta Info */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-4 space-y-4">
                    <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        Meal Details
                    </h2>

                    {/* Category & Region */}
                    {(meal.category || meal.area) && (
                        <div className="space-y-2 text-sm">
                            {meal.category && (
                                <div className="flex items-center gap-2">
                                    <span className="text-neutral-500 dark:text-neutral-400">
                                        Category:
                                    </span>
                                    <button
                                        onClick={handleCategoryNav}
                                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {meal.category}
                                    </button>
                                </div>
                            )}
                            {meal.area && (
                                <div className="flex items-center gap-2">
                                    <span className="text-neutral-500 dark:text-neutral-400">
                                        Region:
                                    </span>
                                    <button
                                        onClick={handleAreaNav}
                                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {meal.area}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* External Links */}
                    {(meal.source || meal.youtube) && (
                        <div className="flex flex-wrap gap-2 pt-1 text-sm">
                            {meal.source && (
                                <button
                                    onClick={() => handleExternalUrl(meal.source!)}
                                    className="inline-flex items-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-1.5 font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    <span>Source</span>
                                </button>
                            )}
                            {meal.youtube && (
                                <button
                                    onClick={() => handleExternalUrl(meal.youtube!)}
                                    className="inline-flex items-center gap-2 rounded-md bg-red-600 dark:bg-red-500 px-3 py-1.5 font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                                >
                                    <Play size={16} />
                                    <span>Watch Video</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Tags */}
                    {meal.tags.length > 0 && (
                        <div className="space-y-2 pt-1">
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {meal.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Ingredients */}
            <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Ingredients
                </h2>
                <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {meal.ingredients.map((ingredient, index) => (
                            <span
                                key={`${ingredient}-${index}`}
                                className="px-3 py-1.5 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instructions */}
            <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Instructions
                </h2>
                <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <ol className="space-y-3">
                        {meal.instructions.map((step, index) =>
                            step.trim() && (
                                <li
                                    key={`${step}-${index}`}
                                    className="flex gap-3"
                                >
                                    <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full text-xs font-semibold">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                                        {step.trim()}
                                    </p>
                                </li>
                            )
                        )}
                    </ol>
                </div>
            </section>
        </div>
    );
};