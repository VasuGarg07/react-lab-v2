import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUp, ChevronsDown, PawPrint } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import PokemonCard from '../components/PokemonCard';
import { BASE_API, END_POINT, REGION_DATA, TYPE_COLORS } from '../helpers/constant';
import { PokemonDetail, PokemonListResponse } from '../helpers/response.types';
import useCacheApi from '../hooks/useCacheApi';
import { DexUtils, getIdFromUrl } from '../helpers/utilities';
import { usePokedex } from "../context/PokedexContext";
import { Pokemon } from '../helpers/model.types';
import { scrollToTop } from '@/shared/utilities';

const LIMIT = 20;
const CACHE_TIME = 15 * 60 * 1000;

const Pokedex: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState(REGION_DATA[0]);
    const [offset, setOffset] = useState(selectedRegion.startId - 1);

    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    const { addPokemon, getPokemonById } = usePokedex();

    const { data, loading, error } = useCacheApi<PokemonListResponse>(
        `${BASE_API}pokemon?limit=${offset + LIMIT > selectedRegion.endId
            ? selectedRegion.endId - offset
            : LIMIT
        }&offset=${offset}`,
        { cacheTime: CACHE_TIME }
    );

    const fetchPokemonDetails = async (results: PokemonListResponse["results"]) => {
        setIsLoadingDetails(true);
        try {
            const fetchedPokemon = await Promise.all(
                results.map(async ({ name, url }) => {
                    const id = getIdFromUrl(url);
                    let pokemon = getPokemonById(id);
                    if (!pokemon) {
                        pokemon = DexUtils.createPokemon(id, name);
                    }
                    // Fetch details if not already loaded
                    if (!pokemon.fetchedApis.has(END_POINT.details)) {
                        const response = await fetch(url);
                        if (response.ok) {
                            const details: PokemonDetail = await response.json();
                            DexUtils.updateDetails(pokemon, details);
                            addPokemon(pokemon);
                        }
                    }
                    return pokemon;
                })
            );
            setAllPokemon((prev) => [...prev, ...fetchedPokemon]);
        } finally {
            setIsLoadingDetails(false);
        }
    };

    useEffect(() => {
        if (data?.results) {
            fetchPokemonDetails(data.results).then(() => {
                setHasMore(offset + LIMIT < selectedRegion.endId); // Update hasMore for infinite scrolling
            });
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading && !isLoadingDetails) {
                    const nextOffset = offset + LIMIT;
                    if (nextOffset <= selectedRegion.endId) {
                        setOffset(nextOffset);
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, isLoadingDetails]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleRegionChange = (region: typeof REGION_DATA[0]) => {
        setSelectedRegion(region);
        setOffset(region.startId - 1);
        setAllPokemon([]);
        setHasMore(true);
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-54px)] p-4 bg-gradient-to-br dark:from-[#13151a] dark:via-[#1a1d24] dark:to-[#22252d] from-[#f8f9fc] via-[#eef1f8] to-[#e4e8f4]">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    <AlertCircle size={48} className="text-red-500" />
                </motion.div>
                <h2 className="text-xl font-bold text-red-500">
                    Oops! Something went wrong
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Error loading Pokémon: {error.message}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-52px)] bg-gradient-to-br dark:from-[#13151a] dark:via-[#1a1d24] dark:to-[#22252d] from-[#f8f9fc] via-[#eef1f8] to-[#e4e8f4] relative">
            <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
                <div className="mb-6 md:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <PawPrint color={TYPE_COLORS.dragon} size={32} />
                            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r dark:from-[#e3eeff] dark:to-white from-[#1a1d24] to-[#22252d] bg-clip-text text-transparent">
                                Pokédex
                            </h1>
                        </div>

                        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                        <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                            <p className="text-lg text-gray-800 dark:text-gray-200">
                                Displaying {allPokemon.length} Pokémon
                            </p>
                            <div className="flex items-center gap-1">
                                <ChevronsDown size={16} className="text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Scroll to discover more
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mb-6 flex gap-2 flex-wrap">
                    {REGION_DATA.map((region) => (
                        <button
                            key={region.name}
                            onClick={() => handleRegionChange(region)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${selectedRegion.name === region.name
                                ? 'bg-red-600 text-white'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50'
                                }`}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>

                <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence>
                        {allPokemon.map((pokemon, index) => (
                            <Link
                                to={`${pokemon.id}`}
                                key={pokemon.id}
                                className="text-decoration-none"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (index % LIMIT) * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <PokemonCard pokemon={pokemon} />
                                </motion.div>
                            </Link>
                        ))}
                    </AnimatePresence>
                </div>

                <div
                    ref={observerTarget}
                    className="w-full flex justify-center"
                >
                    {(loading || isLoadingDetails) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="my-6"
                        >
                            <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                        </motion.div>
                    )}
                </div>

                {!hasMore && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center py-6">
                            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                You've caught 'em all! 🎉
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                No more Pokémon to load in {selectedRegion.name} Region
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {showScrollTop && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-5 right-5 z-10"
                    >
                        <button
                            onClick={scrollToTop}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none"
                        >
                            <ArrowUp size={20} className="text-white" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Pokedex;