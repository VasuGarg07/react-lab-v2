import { AlertCircle, ArrowUp, ChevronsDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import PokemonCard from './PokemonCard';
import { REGIONS, ITEMS_PER_PAGE } from '../helpers/constants';
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
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
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

    if (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
                <AlertCircle size={40} className="text-crimson" />
                <p className="font-bold text-shadow">Failed to load Pokémon</p>
                <p className="text-sm text-smoke">{message}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-chalk">
            <div className="max-w-7xl mx-auto w-full px-4 py-6 flex flex-col gap-5">

                {/* Region pills */}
                <div className="flex flex-wrap gap-2">
                    {REGIONS.map((region) => (
                        <button
                            key={region.name}
                            onClick={() => handleRegionChange(region)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-all duration-150 ${
                                selectedRegion.name === region.name
                                    ? 'bg-crimson border-crimson text-white shadow-sm'
                                    : 'bg-white border-silver/50 text-smoke hover:border-crimson/50 hover:text-crimson'
                            }`}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>

                {/* Scroll hint */}
                <div className="flex items-center gap-1.5 text-silver">
                    <ChevronsDown size={14} />
                    <span className="text-xs font-medium">Scroll to load more</span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {allPokemons.map((pokemon, index) => (
                        <Link
                            to={`/pokedex/${pokemon.id}`}
                            key={pokemon.id}
                            className="no-underline opacity-0 animate-[fade-in_0.3s_ease-out_forwards]"
                            style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 0.04}s` }}
                        >
                            <PokemonCard pokemon={pokemon} />
                        </Link>
                    ))}

                    {isLoading && allPokemons.length === 0 &&
                        Array.from({ length: 18 }).map((_, i) => (
                            <div key={i} className="aspect-3/4 rounded-2xl bg-silver/30 animate-pulse" />
                        ))
                    }
                </div>

                {/* Infinite scroll trigger */}
                <div ref={observerTarget} className="flex justify-center py-6">
                    {isFetchingNextPage && (
                        <div className="w-8 h-8 border-3 border-silver border-t-crimson rounded-full animate-spin" />
                    )}
                </div>

                {!hasNextPage && allPokemons.length > 0 && (
                    <p className="text-center text-sm text-smoke font-medium pb-4">
                        All {allPokemons.length} Pokémon loaded for {selectedRegion.name} region
                    </p>
                )}
            </div>

            {/* Scroll to top */}
            {showScrollTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-5 right-5 z-10 w-10 h-10 rounded-full bg-crimson hover:bg-ruby text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none"
                >
                    <ArrowUp size={18} />
                </button>
            )}
        </div>
    );
}
