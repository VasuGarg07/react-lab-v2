import { Loader2, Search, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toastService } from '@react-lab/shared';
import { ALPHABETS } from './utils/recipe.helpers';
import { useAreas, useCategories, useRandomMeal } from './utils/useRecipeQueries';

export default function RecipeHaven() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isGettingRandom, setIsGettingRandom] = useState(false);

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();
    const { data: areas = [], isLoading: areasLoading } = useAreas();
    const { getRandomMeal } = useRandomMeal();

    const handleSearch = () => {
        const trimmed = searchTerm.trim();
        if (!trimmed) {
            toastService.error('Please enter a search term');
            return;
        }
        navigate(`/recipe-haven/search/${trimmed}`);
    };

    const handleRandomMeal = async () => {
        setIsGettingRandom(true);
        try {
            const randomId = await getRandomMeal();
            navigate(`/recipe-haven/meal/${randomId}`);
        } catch {
            toastService.error('Failed to get random recipe');
        } finally {
            setIsGettingRandom(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-neutral-950">
            {/* Hero — serif, big, editorial */}
            <section className="border-b border-stone-200 dark:border-neutral-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-700 dark:text-amber-500 font-medium mb-4">
                            Recipe Haven
                        </p>
                        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-stone-900 dark:text-stone-100 leading-[1.05] tracking-tight">
                            Cook something <em className="text-amber-700 dark:text-amber-500">good</em> tonight.
                        </h1>
                        <p className="mt-6 text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                            Browse thousands of recipes from around the world — by category, region, or just the first letter of whatever's in your head.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-2">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name…"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-11 pr-4 py-3 rounded-md border border-stone-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-5 py-3 bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                            >
                                Search
                            </button>
                            <button
                                onClick={handleRandomMeal}
                                disabled={isGettingRandom}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-stone-300 dark:border-neutral-700 hover:border-amber-600 dark:hover:border-amber-500 text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-500 bg-white dark:bg-neutral-900 rounded-md font-medium transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                            >
                                {isGettingRandom ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Shuffle size={18} />
                                )}
                                Surprise me
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <SectionHeader
                    kicker="Browse"
                    title="By category"
                    blurb="Pick the kind of meal you're in the mood for."
                />

                {categoriesLoading ? (
                    <CenteredSpinner />
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => navigate(`/recipe-haven/category/${category.name.toLowerCase()}`)}
                                className="group text-left bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:border-amber-600 dark:hover:border-amber-500 transition focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                            >
                                <div className="aspect-square overflow-hidden bg-stone-100 dark:bg-neutral-800">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">
                                        {category.name}
                                    </h3>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
                <SectionHeader
                    kicker="Or explore"
                    title="By region"
                    blurb="Cuisines from across the world, alphabetically."
                />

                {areasLoading ? (
                    <CenteredSpinner />
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {areas.map((area) => (
                            <button
                                key={area}
                                onClick={() => navigate(`/recipe-haven/area/${area.toLowerCase()}`)}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 text-stone-700 dark:text-stone-300 hover:border-amber-600 dark:hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-500 transition focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                            >
                                {area}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <SectionHeader
                    kicker="Looking for something specific?"
                    title="By first letter"
                />

                <div className="grid grid-cols-9 sm:grid-cols-13 gap-1.5">
                    {ALPHABETS.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => navigate(`/recipe-haven/alphabet/${letter.toLowerCase()}`)}
                            className="aspect-square flex items-center justify-center text-sm font-medium bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 text-stone-600 dark:text-stone-400 hover:border-amber-600 dark:hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-500 rounded-md transition focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}

function SectionHeader({ kicker, title, blurb }: { kicker: string; title: string; blurb?: string }) {
    return (
        <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-700 dark:text-amber-500 font-medium">
                {kicker}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mt-1">
                {title}
            </h2>
            {blurb && (
                <p className="mt-2 text-stone-600 dark:text-stone-400 max-w-xl">
                    {blurb}
                </p>
            )}
        </div>
    );
}

function CenteredSpinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-amber-600 dark:text-amber-500" />
        </div>
    );
}