import React, { useEffect, useState, useRef } from 'react';
import { Grid, Box, CircularProgress, Typography, Container, useTheme, Divider } from '@mui/joy';
import { AlertCircle, Search, ArrowUp, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxios from '../../shared/useAxios';
import PokemonCard from './components/PokemonCard';
import { BASE_API, TYPE_COLORS } from './helpers/constant';

const LIMIT = 20;

const Pokedex: React.FC = () => {
    const [offset, setOffset] = useState(0);
    const [allPokemon, setAllPokemon] = useState<PokemonDetail[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const { data, loading, error } = useAxios<PokemonListResponse>(
        `${BASE_API}pokemon?limit=${LIMIT}&offset=${offset}`
    );

    const fetchPokemonDetails = async (results: PokemonListResponse['results']) => {
        const pokemonDetails = await Promise.all(
            results.map(pokemon =>
                fetch(pokemon.url).then(res => res.json())
            )
        );
        return pokemonDetails;
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (data?.results) {
            fetchPokemonDetails(data.results).then(details => {
                setAllPokemon(prev => [...prev, ...details]);
                setHasMore(!!data.next);
            });
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setOffset(prev => prev + LIMIT);
                }
            },
            { threshold: 0.5 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    minHeight: '50vh',
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
                                <Search size={16} />
                                <Typography level="body-sm">
                                    Scroll to discover more
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <AnimatePresence>
                        {allPokemon.map((pokemon, index) => (
                            <Grid xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (index % LIMIT) * 0.1 }}
                                >
                                    <PokemonCard pokemon={pokemon} />
                                </motion.div>
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
                        p: 4
                    }}
                >
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CircularProgress size="lg" />
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
                                borderRadius: 'lg',
                                bgcolor: 'background.level1',
                                boxShadow: 'sm'
                            }}
                        >
                            <Typography level="body-lg">
                                You've caught 'em all! 🎉
                            </Typography>
                            <Typography level="body-sm" sx={{ mt: 1 }}>
                                No more Pokémon to load
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