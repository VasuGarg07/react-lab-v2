import { AlertCircle, ArrowUp, ChevronsDown, PawPrint } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import PokemonCard from './PokemonCard';
import { REGIONS, TYPE_COLORS, ITEMS_PER_PAGE } from '../helpers/constants';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { setSelectedRegion } from '../store/pokedexSlice';

export default function Pokedex() {
    const dispatch = useAppDispatch();
    const selectedRegion = useAppSelector((state) => state.pokedex.selectedRegion);

    const [showScrollTop, setShowScrollTop] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfinitePokemon({
        regionStart: selectedRegion.startId,
        regionEnd: selectedRegion.endId,
    });

    const allPokemons = data?.pages.flat() ?? [];

    useEffect(() => {
        if (!observerTarget.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleRegionChange = (region: typeof REGIONS[number]) => {
        dispatch(setSelectedRegion(region));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        return (
            <div className="flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-54px)] p-4 bg-linear-to-br dark:from-neutral-900 dark:to-neutral-800 from-neutral-50 to-neutral-100">
                <div className="scale-0 animate-[scale-in_0.3s_ease-out_forwards]">
                    <AlertCircle size={48} className="text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-red-500">Oops! Something went wrong</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                    Error loading Pokémon: {message}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-54px)] bg-linear-to-br dark:from-neutral-900 dark:to-neutral-800 from-neutral-50 to-neutral-100 relative">
            <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
                <div className="mb-6 md:mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
                    <div className="flex items-center gap-4 mb-4">
                        <PawPrint color={TYPE_COLORS.dragon} size={32} />
                        <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r dark:from-neutral-100 dark:to-white from-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                            Pokédex
                        </h1>
                    </div>
                    <div className="h-px bg-neutral-200 dark:bg-neutral-700 w-full" />
                    <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                        <p className="text-lg text-neutral-800 dark:text-neutral-200">
                            Displaying {allPokemons.length} Pokémon
                        </p>
                        <div className="flex items-center gap-1">
                            <ChevronsDown size={16} className="text-neutral-500 dark:text-neutral-400" />
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                Scroll to discover more
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex gap-2 flex-wrap opacity-0 animate-[fade-in_0.5s_ease-out_0.1s_forwards]">
                    {REGIONS.map((region) => (
                        <button
                            key={region.name}
                            onClick={() => handleRegionChange(region)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${selectedRegion.name === region.name
                                ? 'bg-red-600 text-white scale-105'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50'
                                }`}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>

                <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {allPokemons.map((pokemon, index) => (
                        <Link
                            to={`/pokeverse/pokedex/${pokemon.id}`}
                            key={pokemon.id}
                            className="no-underline opacity-0 animate-[fade-in_0.3s_ease-out_forwards]"
                            style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 0.05}s` }}
                        >
                            <div className="transition-transform duration-200 hover:scale-105">
                                <PokemonCard pokemon={pokemon} />
                            </div>
                        </Link>
                    ))}

                    {isLoading && allPokemons.length === 0 && (
                        Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="no-underline opacity-0 animate-[fade-in_0.3s_ease-out_forwards]"
                                style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 0.05}s` }}
                            >
                                <div className="aspect-3/4 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                            </div>
                        ))
                    )}
                </div>

                <div ref={observerTarget} className="w-full flex justify-center py-6">
                    {isFetchingNextPage && (
                        <div className="opacity-0 animate-[fade-in_0.3s_ease-out_forwards]">
                            <div className="w-12 h-12 border-4 border-neutral-300 dark:border-neutral-600 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {!hasNextPage && allPokemons.length > 0 && (
                    <div className="opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
                        <div className="text-center py-6">
                            <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                                You've caught 'em all! 🎉
                            </p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                                No more Pokémon in {selectedRegion.name} Region
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {showScrollTop && (
                <div className="fixed bottom-5 right-5 z-10 opacity-0 animate-[fade-in_0.2s_ease-out_forwards]">
                    <button
                        onClick={scrollToTop}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <ArrowUp size={20} className="text-white" />
                    </button>
                </div>
            )}
        </div>
    );
}
