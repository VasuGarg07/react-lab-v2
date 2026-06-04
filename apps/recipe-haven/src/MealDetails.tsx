import { AlertCircle, ExternalLink, Loader2, Play } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toastService } from '@react-lab/shared';
import { useMealDetails } from './utils/useRecipeQueries';

export default function MealDetails() {
    const { mealId } = useParams();
    const navigate = useNavigate();
    const { data: meal, isLoading, error } = useMealDetails(mealId);

    const handleExternalUrl = (url: string) => {
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch {
            toastService.error('Failed to open link');
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-pollen mb-3" />
                <p className="text-sm text-iron/60 dark:text-ivory/50">Loading recipe…</p>
            </div>
        );
    }

    if (error || !meal) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle size={36} className="text-red-500 mb-4" />
                <h2 className="font-serif text-2xl text-iron dark:text-ivory mb-1">Couldn't load recipe</h2>
                <p className="text-sm text-iron/60 dark:text-ivory/50">
                    The recipe may have been removed. Try another from the gallery.
                </p>
            </div>
        );
    }

    return (
        <article className="space-y-10 sm:space-y-12 pb-12">
            <header className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] font-medium">
                    {meal.category && (
                        <button
                            onClick={() => navigate(`/recipe-haven/category/${meal.category.toLowerCase()}`)}
                            className="text-carrot hover:underline underline-offset-4"
                        >
                            {meal.category}
                        </button>
                    )}
                    {meal.category && meal.area && (
                        <span className="text-iron/25 dark:text-ivory/20">·</span>
                    )}
                    {meal.area && (
                        <button
                            onClick={() => navigate(`/recipe-haven/area/${meal.area.toLowerCase()}`)}
                            className="text-iron/60 dark:text-ivory/50 hover:text-carrot dark:hover:text-pollen transition-colors"
                        >
                            {meal.area} cuisine
                        </button>
                    )}
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-iron dark:text-ivory leading-[1.1] tracking-tight">
                    {meal.name}
                </h1>
            </header>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-iron/8 dark:bg-ivory/5">
                <img src={meal.image} alt={meal.name} loading="eager" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {(meal.source || meal.youtube || meal.tags.length > 0) && (
                <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-iron/15 dark:border-ivory/8">
                    {meal.source && (
                        <button
                            onClick={() => handleExternalUrl(meal.source!)}
                            className="inline-flex items-center gap-2 text-sm text-iron/70 dark:text-ivory/60 hover:text-carrot dark:hover:text-pollen transition"
                        >
                            <ExternalLink size={15} />
                            <span>Original source</span>
                        </button>
                    )}
                    {meal.youtube && (
                        <button
                            onClick={() => handleExternalUrl(meal.youtube!)}
                            className="inline-flex items-center gap-2 text-sm text-iron/70 dark:text-ivory/60 hover:text-carrot dark:hover:text-pollen transition"
                        >
                            <Play size={15} />
                            <span>Watch video</span>
                        </button>
                    )}
                    {meal.tags.length > 0 && (
                        <div className="ml-auto flex flex-wrap gap-2">
                            {meal.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-iron/8 dark:bg-ivory/8 text-iron/70 dark:text-ivory/60"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="grid gap-10 md:gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <section>
                    <h2 className="font-serif text-2xl text-iron dark:text-ivory mb-4 pb-3 border-b border-iron/15 dark:border-ivory/8">
                        Ingredients
                    </h2>
                    <ul className="space-y-2.5 text-sm">
                        {meal.ingredients.map((ingredient, index) => (
                            <li key={`${ingredient}-${index}`} className="flex gap-3 text-iron/80 dark:text-ivory/70">
                                <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-pollen" aria-hidden />
                                <span>{ingredient}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="font-serif text-2xl text-iron dark:text-ivory mb-4 pb-3 border-b border-iron/15 dark:border-ivory/8">
                        Method
                    </h2>
                    <ol className="space-y-6">
                        {meal.instructions.filter((step) => step.trim()).map((step, index) => (
                            <li key={`${step}-${index}`} className="flex gap-4">
                                <span className="font-serif shrink-0 text-2xl text-carrot leading-none mt-1">
                                    {index + 1}
                                </span>
                                <p className="text-base text-iron/80 dark:text-ivory/70 leading-relaxed">
                                    {step.trim()}.
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </article>
    );
}
