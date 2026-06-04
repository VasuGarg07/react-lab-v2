import { Loader2, Search, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toastService, useScrollToTop } from '@react-lab/shared';
import { ThemeToggle } from '@react-lab/ui';
import { ALPHABETS } from './utils/recipe.helpers';
import { useAreas, useCategories, useRandomMeal } from './utils/useRecipeQueries';
import GithubIcon from '../../../packages/ui/icons/github.svg';
import LinkedinIcon from '../../../packages/ui/icons/linkedin.svg';
import XIcon from '../../../packages/ui/icons/x.svg';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

export default function RecipeHaven() {
    useScrollToTop();

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isGettingRandom, setIsGettingRandom] = useState(false);

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();
    const { data: areas = [], isLoading: areasLoading } = useAreas();
    const { getRandomMeal } = useRandomMeal();

    const handleSearch = () => {
        const trimmed = searchTerm.trim();
        if (!trimmed) { toastService.error('Please enter a search term'); return; }
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
        <div className="bg-ivory dark:bg-onyx">

            {/* Header */}
            <header className="sticky top-0 z-20 bg-ivory/90 dark:bg-onyx/90 backdrop-blur-sm border-b border-iron/15 dark:border-ivory/8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/recipe-haven')}
                        className="font-serif text-lg text-iron dark:text-ivory hover:text-carrot dark:hover:text-pollen transition-colors"
                    >
                        Recipe Haven
                    </button>
                    <div className="flex items-center gap-1">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-8 h-8 rounded-lg flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-iron/8 dark:hover:bg-ivory/8 transition-all duration-150"
                            >
                                <img src={icon} alt={label} className="w-4 h-4 dark:invert" />
                            </a>
                        ))}
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="border-b border-iron/15 dark:border-ivory/8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-carrot font-medium mb-4">
                            Recipe Haven
                        </p>
                        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-iron dark:text-ivory leading-[1.05] tracking-tight">
                            Cook something <em className="text-carrot">good</em> tonight.
                        </h1>
                        <p className="mt-6 text-base sm:text-lg text-iron/70 dark:text-ivory/60 leading-relaxed">
                            Browse thousands of recipes from around the world — by category, region, or just the first letter of whatever's in your head.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-2">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-iron/40 dark:text-ivory/30" />
                                <input
                                    type="text"
                                    placeholder="Search by name…"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-11 pr-4 py-3 rounded-md border border-iron/25 dark:border-ivory/12 bg-white/70 dark:bg-[#1e1c1a] text-iron dark:text-ivory placeholder:text-iron/40 dark:placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-pollen/50 focus:border-pollen transition"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-5 py-3 bg-iron hover:bg-carrot dark:bg-pollen dark:hover:bg-carrot text-white dark:text-onyx rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-pollen/50"
                            >
                                Search
                            </button>
                            <button
                                onClick={handleRandomMeal}
                                disabled={isGettingRandom}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-iron/25 dark:border-ivory/12 hover:border-pollen text-iron dark:text-ivory hover:text-carrot dark:hover:text-pollen bg-white/70 dark:bg-[#1e1c1a] rounded-md font-medium transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-pollen/50"
                            >
                                {isGettingRandom ? <Loader2 size={18} className="animate-spin" /> : <Shuffle size={18} />}
                                Surprise me
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* By Category */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <SectionHeader kicker="Browse" title="By category" blurb="Pick the kind of meal you're in the mood for." />
                {categoriesLoading ? <CenteredSpinner /> : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => navigate(`/recipe-haven/category/${category.name.toLowerCase()}`)}
                                className="group text-left bg-white/80 dark:bg-[#1e1c1a] border border-iron/15 dark:border-ivory/8 rounded-lg overflow-hidden hover:border-pollen transition focus:outline-none focus:ring-2 focus:ring-pollen/50"
                            >
                                <div className="aspect-square overflow-hidden bg-iron/8 dark:bg-ivory/5">
                                    <img src={category.image} alt={category.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-serif text-lg text-iron dark:text-ivory">{category.name}</h3>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* By Region */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
                <SectionHeader kicker="Or explore" title="By region" blurb="Cuisines from across the world, alphabetically." />
                {areasLoading ? <CenteredSpinner /> : (
                    <div className="flex flex-wrap gap-2">
                        {areas.map((area) => (
                            <button
                                key={area}
                                onClick={() => navigate(`/recipe-haven/area/${area.toLowerCase()}`)}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-white/80 dark:bg-[#1e1c1a] border border-iron/15 dark:border-ivory/8 text-iron dark:text-ivory hover:border-pollen hover:text-carrot dark:hover:text-pollen transition focus:outline-none focus:ring-2 focus:ring-pollen/50"
                            >
                                {area}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* By Letter */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <SectionHeader kicker="Looking for something specific?" title="By first letter" />
                <div className="grid grid-cols-9 sm:grid-cols-13 gap-1.5">
                    {ALPHABETS.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => navigate(`/recipe-haven/alphabet/${letter.toLowerCase()}`)}
                            className="aspect-square flex items-center justify-center text-sm font-medium bg-white/80 dark:bg-[#1e1c1a] border border-iron/15 dark:border-ivory/8 text-iron dark:text-ivory hover:border-pollen hover:text-carrot dark:hover:text-pollen rounded-md transition focus:outline-none focus:ring-2 focus:ring-pollen/50"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-iron/15 dark:border-ivory/8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-iron/50 dark:text-ivory/30">
                        © {new Date().getFullYear()} Vasu Garg · React Lab
                    </p>
                    <p className="text-xs text-iron/50 dark:text-ivory/30">
                        Recipes via{' '}
                        <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer"
                            className="hover:text-carrot dark:hover:text-pollen transition-colors underline underline-offset-2"
                        >
                            TheMealDB
                        </a>
                    </p>
                </div>
            </footer>

        </div>
    );
}

function SectionHeader({ kicker, title, blurb }: { kicker: string; title: string; blurb?: string }) {
    return (
        <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-carrot font-medium">{kicker}</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-iron dark:text-ivory mt-1">{title}</h2>
            {blurb && <p className="mt-2 text-iron/70 dark:text-ivory/60 max-w-xl">{blurb}</p>}
        </div>
    );
}

function CenteredSpinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-pollen" />
        </div>
    );
}
