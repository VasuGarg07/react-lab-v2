import { Box, Button, CircularProgress, Sheet, Typography, useColorScheme } from '@mui/joy';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowLeft, Book, GitBranch, ImageIcon, Info, Layers, Swords } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EntriesSection from '../components/EntriesSection';
import InfoSection from '../components/Information';
import MovesSection from '../components/MovesGrid';
import { AnimatedTypeBadge, ImageCard } from '../components/PokemonUI';
import StatsSection from '../components/StatsSection';
import { usePokedex } from '../context/PokedexContext';
import { BASE_API, END_POINT, TYPE_COLORS } from '../helpers/constant';
import { Pokemon } from '../helpers/model.types';
import { PokemonDetail, PokemonSpecies } from '../helpers/response.types';
import { DexUtils, getIdFromUrl } from '../helpers/utilities';
import EvolutionChain from '../components/EvolutionChain';
import AltFormsSection from '../components/AltFormSection';
import GallerySection from '../components/GallerySection';

const Sections = [
    { id: 'info', label: 'Information', icon: Info },
    { id: 'entries', label: 'Pokédex Entries', icon: Book },
    { id: 'moves', label: 'Moves', icon: Swords },
    { id: 'stats', label: 'Base Stats', icon: Activity },
    { id: 'evolution', label: 'Evolution', icon: GitBranch },
    { id: 'varieties', label: 'Forms', icon: Layers },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon }
];


const PokemonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getPokemonById, addPokemon } = usePokedex();

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeSection, setActiveSection] = useState('info');
    const { mode } = useColorScheme();
    const isDarkMode = mode === 'dark';

    useEffect(() => {
        const fetchPokemonData = async () => {
            if (!id) return;

            let updatedPokemon = getPokemonById(Number(id)) || DexUtils.createPokemon(Number(id), `Pokemon-${id}`);

            try {
                // Fetch Details API if not already fetched
                let speciesId: number = 0;
                if (!updatedPokemon.fetchedApis.has(END_POINT.details)) {
                    const { data: details } = await axios.get<PokemonDetail>(`${BASE_API}pokemon/${id}`);
                    speciesId = getIdFromUrl(details.species.url);
                    DexUtils.updateDetails(updatedPokemon, details);
                }

                // Fetch Species API if not already fetched
                let evoChainId: number = 0;
                if (!updatedPokemon.fetchedApis.has(END_POINT.species)) {
                    const speciesUrl = `${BASE_API}pokemon-species/${speciesId}`;
                    const { data: species } = await axios.get<PokemonSpecies>(speciesUrl);
                    evoChainId = getIdFromUrl(species.evolution_chain.url);
                    DexUtils.updateSpecies(updatedPokemon, species);
                }

                // Fetch Evolution Chain API if not already fetched
                if (!updatedPokemon.fetchedApis.has(END_POINT.evolutionChain) && evoChainId) {
                    const evoChainUrl = `${BASE_API}evolution-chain/${evoChainId}`;
                    const { data: evolutionChain } = await axios.get(evoChainUrl);
                    DexUtils.updateEvolutionChain(updatedPokemon, evolutionChain.chain);
                }

                // Add the fully updated Pokémon to context
                addPokemon(updatedPokemon);
                setPokemon(updatedPokemon);
            } catch (err) {
                console.error('Error fetching Pokémon data:', err);
                setError('Failed to load Pokémon details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: 'calc(100vh - 52px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                        : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)'
                }}
            >
                <CircularProgress size="lg" />
            </Box>
        );
    }

    if (error || !pokemon) {
        return (
            <Box sx={{
                minHeight: 'calc(100vh - 52px)',
                p: 4,
                background: isDarkMode
                    ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                    : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)'
            }}>
                <Button
                    onClick={() => navigate(-1)}
                    startDecorator={<ArrowLeft size={16} />}
                    sx={{ mb: 2 }}
                >
                    Back
                </Button>
                <Typography level="h3">Pokemon not found</Typography>
            </Box>
        );
    }

    const activeSectionComponent = () => {
        switch (activeSection) {
            case 'info':
                return <InfoSection pokemon={pokemon} />;
            case 'entries':
                return <EntriesSection flavorTexts={pokemon.flavorTexts} primaryType={pokemon.types[0]} />
            case 'moves':
                return <MovesSection moves={pokemon.moves} primaryType={pokemon.types[0]} />
            case 'stats':
                return <StatsSection pokemon={pokemon} />
            case 'evolution':
                return <EvolutionChain evolution={pokemon.evolutionChain} />
            case 'varieties':
                return <AltFormsSection varieties={pokemon.varieties} primaryType={pokemon.types[0]} />
            case 'gallery':
                return <GallerySection id={pokemon.id} primaryType={pokemon.types[0]} />
        }
    }

    return (
        <AnimatePresence mode="wait">
            <Box
                component={motion.div}
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                sx={{
                    minHeight: 'calc(100vh - 52px)',
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                        : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)',
                    p: { xs: 2, md: 4 }
                }}
            >
                {/* Top Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Button
                        onClick={() => navigate(-1)}
                        startDecorator={<ArrowLeft size={16} />}
                        variant="soft"
                        sx={{ mb: 4 }}
                    >
                        Back to Pokédex
                    </Button>
                </motion.div>

                {/* Main Content */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '350px 1fr' },
                    gap: 4,
                }}>
                    {/* Left Column - Fixed Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Box sx={{
                            position: { lg: 'sticky' },
                            top: { lg: '2rem' },
                            height: 'fit-content'
                        }}>
                            <ImageCard pokemon={pokemon} />

                            {/* Name and Types */}
                            <Typography
                                level="h1"
                                sx={{
                                    textTransform: 'uppercase',
                                    textAlign: 'center',
                                    mb: 2,
                                    fontFamily: 'Poppins',
                                }}

                            >
                                {pokemon.name}
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                                mb: 3
                            }}>
                                {pokemon.types.map((type) => (
                                    <AnimatedTypeBadge
                                        key={type}
                                        type={type}
                                        color={TYPE_COLORS[type]}
                                    />
                                ))}
                            </Box>

                            {/* Section Navigation */}
                            <Sheet
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                sx={{
                                    p: 2,
                                    borderRadius: 'xl',
                                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                                    backdropFilter: 'blur(10px)',
                                    display: { xs: 'none', lg: 'block' }
                                }}
                            >
                                {Sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <Button
                                            key={section.id}
                                            fullWidth
                                            variant={activeSection === section.id ? 'soft' : 'plain'}
                                            color={activeSection === section.id ? 'danger' : 'neutral'}
                                            startDecorator={<Icon size={18} />}
                                            onClick={() => setActiveSection(section.id)}
                                            component={motion.button}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            sx={{
                                                justifyContent: 'flex-start',
                                                mb: 1,
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {section.label}
                                        </Button>
                                    );
                                })}
                            </Sheet>
                        </Box>
                    </motion.div>

                    {/* Right Column - Content Sections */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Sheet
                            sx={{
                                borderRadius: 'xl',
                                bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                                backdropFilter: 'blur(10px)',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Mobile Navigation */}
                            <Box sx={{
                                display: { xs: 'flex', lg: 'none' },
                                gap: 1,
                                p: 2,
                                overflowX: 'auto',
                                borderBottom: '1px solid',
                                borderColor: 'divider'
                            }}>
                                {Sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <Button
                                            key={section.id}
                                            variant={activeSection === section.id ? 'soft' : 'plain'}
                                            color={activeSection === section.id ? 'danger' : 'neutral'}
                                            onClick={() => setActiveSection(section.id)}
                                            component={motion.button}
                                            whileTap={{ scale: 0.95 }}
                                            sx={{
                                                minWidth: 'max-content',
                                                gap: 1
                                            }}
                                        >
                                            <Icon size={18} />
                                            {section.label}
                                        </Button>
                                    );
                                })}
                            </Box>

                            {/* Content Area */}
                            <Box sx={{ p: 3 }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSection}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* We'll add section content here */}
                                        <Box sx={{ minHeight: '400px' }}>
                                            <Typography level="h3">
                                                {Sections.find(s => s.id === activeSection)?.label}
                                            </Typography>
                                            {activeSectionComponent()}
                                        </Box>
                                    </motion.div>
                                </AnimatePresence>
                            </Box>
                        </Sheet>
                    </motion.div>
                </Box>
            </Box>
        </AnimatePresence>
    );
};

export default PokemonDetails;
