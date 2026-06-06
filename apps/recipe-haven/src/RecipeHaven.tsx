import { Loader2, Search, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toastService, useScrollToTop } from '@react-lab/shared';
import { ALPHABETS } from './utils/recipe.helpers';
import { useAreas, useCategories, useRandomMeal } from './utils/useRecipeQueries';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

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
        navigate(`/search/${trimmed}`);
    };

    const handleRandomMeal = async () => {
        setIsGettingRandom(true);
        try {
            const randomId = await getRandomMeal();
            navigate(`/meal/${randomId}`);
        } catch {
            toastService.error('Failed to get random recipe');
        } finally {
            setIsGettingRandom(false);
        }
    };

    return (
        <div className="min-h-screen bg-page">

            {/* Header */}
            <header className="sticky top-0 z-20 bg-page/95 backdrop-blur-sm border-b border-shadow/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="font-serif text-xl font-semibold text-shadow tracking-tight hover:text-magenta transition-colors"
                    >
                        Recipe Haven
                    </button>
                    <div className="flex items-center gap-1">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-8 h-8 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-shadow/10 transition-all"
                            >
                                <img src={icon} alt={label} className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(22%) sepia(20%) saturate(800%) hue-rotate(280deg) brightness(80%)' }} />
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="border-b border-shadow/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.25em] text-plum font-medium mb-5">
                            A world of flavours
                        </p>
                        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-shadow leading-[1.05] tracking-tight">
                            Cook something <em className="text-magenta not-italic">wonderful</em> tonight.
                        </h1>
                        <p className="mt-6 text-base text-shadow/70 leading-relaxed max-w-xl">
                            Thousands of recipes from around the world — search by name, browse by category, region, or just the first letter of whatever's in your head.
                        </p>

                        <div className="mt-9 flex flex-col sm:flex-row gap-2.5">
                            <div className="relative flex-1">
                                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-shadow/40 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search by name…"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-shadow/20 bg-surface text-shadow placeholder:text-shadow/40 focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-6 py-3 bg-magenta hover:bg-plum text-white rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-magenta/40"
                            >
                                Search
                            </button>
                            <button
                                onClick={handleRandomMeal}
                                disabled={isGettingRandom}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-shadow/20 hover:border-magenta text-shadow hover:text-magenta bg-surface rounded-lg font-medium transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-magenta/40"
                            >
                                {isGettingRandom ? <Loader2 size={17} className="animate-spin" /> : <Shuffle size={17} />}
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
                                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                                className="group text-left rounded-xl overflow-hidden border border-shadow/15 hover:border-magenta/50 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-magenta/40"
                            >
                                <div className="relative aspect-square overflow-hidden bg-shadow/10">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-shadow/75 via-shadow/15 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <h3 className="font-serif text-lg text-white leading-tight">{category.name}</h3>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* By Region */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
                <SectionHeader kicker="Or explore" title="By region" blurb="Cuisines from across the world." />
                {areasLoading ? <CenteredSpinner /> : (
                    <div className="flex flex-wrap gap-2">
                        {areas.map((area) => (
                            <button
                                key={area}
                                onClick={() => navigate(`/area/${area.toLowerCase()}`)}
                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-surface border border-shadow/15 text-shadow hover:bg-magenta hover:text-white hover:border-magenta transition focus:outline-none focus:ring-2 focus:ring-magenta/40"
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
                            onClick={() => navigate(`/alphabet/${letter.toLowerCase()}`)}
                            className="aspect-square flex items-center justify-center text-sm font-semibold bg-surface border border-shadow/15 text-shadow hover:bg-magenta hover:text-white hover:border-magenta rounded-lg transition focus:outline-none focus:ring-2 focus:ring-magenta/40"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-shadow/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-shadow/65">
                        © {new Date().getFullYear()} Vasu Garg
                    </p>
                    <p className="text-xs text-shadow/65">
                        Recipes via{' '}
                        <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer"
                            className="font-medium hover:text-magenta transition-colors underline underline-offset-2"
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
        <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.25em] text-plum font-medium">{kicker}</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-shadow mt-1">{title}</h2>
            {blurb && <p className="mt-2 text-shadow/60 max-w-xl text-sm">{blurb}</p>}
        </div>
    );
}

function CenteredSpinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-magenta" />
        </div>
    );
}
