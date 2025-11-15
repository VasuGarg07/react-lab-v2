import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Sparkles, Loader2, ChefHat } from 'lucide-react';
import { useCategories, useAreas, useRandomMeal } from './utils/useRecipeQueries';
import { ALPHABETS } from './utils/recipe.helpers';
import { toastService } from '../../shared/toastr';

export default function RecipeHaven() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isGettingRandom, setIsGettingRandom] = useState(false);

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();
    const { data: areas = [], isLoading: areasLoading } = useAreas();
    const { getRandomMeal } = useRandomMeal();

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            toastService.error('Please enter a search term');
            return;
        }
        navigate(`/recipe-haven/search/${searchTerm.trim()}`);
    };

    const handleRandomMeal = async () => {
        setIsGettingRandom(true);
        try {
            const randomId = await getRandomMeal();
            navigate(`/recipe-haven/meal/${randomId}`);
        } catch (error) {
            toastService.error('Failed to get random recipe');
        } finally {
            setIsGettingRandom(false);
        }
    };

    const handleCategory = (category: string) => {
        navigate(`/recipe-haven/category/${category.toLowerCase()}`);
    };

    const handleArea = (area: string) => {
        navigate(`/recipe-haven/area/${area.toLowerCase()}`);
    };

    const handleLetter = (letter: string) => {
        navigate(`/recipe-haven/alphabet/${letter.toLowerCase()}`);
    };

    // Show top 12 categories and areas
    const topCategories = categories.slice(0, 12);
    const topAreas = areas.slice(0, 12);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">

            {/* Header */}
            <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-3">
                    <ChefHat size={40} className="text-red-500" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
                        Recipe Haven
                    </h1>
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    Easy Eats, Big Treats!
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                    >
                        <Search size={20} />
                    </button>
                </div>
            </div>

            {/* Surprise Me Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleRandomMeal}
                    disabled={isGettingRandom}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-0"
                >
                    {isGettingRandom ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Getting recipe...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Surprise Me!
                        </>
                    )}
                </button>
            </div>

            {/* Categories Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Browse by Category
                </h2>
                {categoriesLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 size={32} className="animate-spin text-neutral-400" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {topCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategory(category)}
                                className="px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Regions Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Browse by Region
                </h2>
                {areasLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 size={32} className="animate-spin text-neutral-400" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {topAreas.map((area) => (
                            <button
                                key={area}
                                onClick={() => handleArea(area)}
                                className="px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-0"
                            >
                                {area}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Alphabet Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Browse Alphabetically
                </h2>
                <div className="grid grid-cols-7 sm:grid-cols-13 gap-2">
                    {ALPHABETS.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleLetter(letter)}
                            className="aspect-square flex items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-300 dark:hover:border-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-0"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};