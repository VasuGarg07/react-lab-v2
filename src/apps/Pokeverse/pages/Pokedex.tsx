import { Box, Button, CircularProgress, Container, Divider, Grid, Typography, useTheme } from '@mui/joy';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUp, ChevronsDown, PawPrint } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import PokemonCard from '@/apps/Pokeverse/components/PokemonCard';
import { BASE_API, END_POINT, REGION_DATA, TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { PokemonDetail, PokemonListResponse } from '@/apps/Pokeverse/helpers/response.types';
import useCacheApi from '@/apps/Pokeverse/hooks/useCacheApi';
import { DexUtils, getIdFromUrl, scrollToTop } from '@/apps/Pokeverse/helpers/utilities';
import { usePokedex } from "@/apps/Pokeverse/context/PokedexContext";
import { Pokemon } from '@/apps/Pokeverse/helpers/model.types';

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
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    minHeight: 'calc(100vh - 52px)',
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                        : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)',
                    p: 4
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    <AlertCircle size={48} color="var(--joy-palette-danger-400)" />
                </motion.div>
                <Typography level="h4" color="danger">
                    Oops! Something went wrong
                </Typography>
                <Typography color="neutral">
                    Error loading Pokémon: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: 'calc(100vh - 52px)',
            background: isDarkMode
                ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)',
            position: 'relative'
        }}>
            <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 2
                            }}
                        >
                            <PawPrint color={TYPE_COLORS.dragon} size={32} />
                            <Typography
                                level="h1"
                                sx={{
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    fontWeight: 800,
                                    background: isDarkMode
                                        ? 'linear-gradient(45deg, #e3eeff 30%, #ffffff 90%)'
                                        : 'linear-gradient(45deg, #1a1d24 30%, #22252d 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Pokédex
                            </Typography>
                        </Box>

                        <Divider />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 2,
                                flexWrap: 'wrap',
                                gap: 1
                            }}
                        >
                            <Typography level="body-lg">
                                Displaying {allPokemon.length} Pokémon
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ChevronsDown size={16} />
                                <Typography level="body-sm">
                                    Scroll to discover more
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Box>

                <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {REGION_DATA.map((region) => (
                        <Button
                            key={region.name}
                            variant={selectedRegion.name === region.name ? "solid" : "soft"}
                            onClick={() => handleRegionChange(region)}
                            size="sm"
                            color='danger'
                        >
                            {region.name}
                        </Button>
                    ))}
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <AnimatePresence>
                        {allPokemon.map((pokemon, index) => (
                            <Grid xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                                <Link
                                    to={`${pokemon.id}`}
                                    style={{ textDecoration: 'none' }}
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
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>

                <Box
                    ref={observerTarget}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {(loading || isLoadingDetails) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CircularProgress size="lg" sx={{ m: 3 }} />
                        </motion.div>
                    )}
                </Box>

                {!hasMore && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            sx={{
                                textAlign: 'center',
                                p: 3,
                            }}
                        >
                            <Typography level="body-lg">
                                You've caught 'em all! 🎉
                            </Typography>
                            <Typography level="body-sm" sx={{ mt: 1 }}>
                                No more Pokémon to load in {selectedRegion.name} Region
                            </Typography>
                        </Box>
                    </motion.div>
                )}
            </Container>

            <AnimatePresence>
                {showScrollTop && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            zIndex: 10
                        }}
                    >
                        <Box
                            onClick={scrollToTop}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                bgcolor: 'primary.500',
                                cursor: 'pointer',
                                boxShadow: 'md',
                                '&:hover': {
                                    bgcolor: 'primary.600',
                                    transform: 'scale(1.1)',
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ArrowUp size={20} color="white" />
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Pokedex;
