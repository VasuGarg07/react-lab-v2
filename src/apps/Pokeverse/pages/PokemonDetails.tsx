import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowLeft, Book, GitBranch, ImageIcon, Info, Layers, Swords } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

import AltFormsSection from '@/apps/Pokeverse/components/AltFormSection';
import EntriesSection from '@/apps/Pokeverse/components/EntriesSection';
import EvolutionChain from '@/apps/Pokeverse/components/EvolutionChain';
import GallerySection from '@/apps/Pokeverse/components/GallerySection';
import InfoSection from '@/apps/Pokeverse/components/Information';
import MovesSection from '@/apps/Pokeverse/components/MovesGrid';
import { AnimatedTypeBadge, ImageCard } from '@/apps/Pokeverse/components/PokemonUI';
import StatsSection from '@/apps/Pokeverse/components/StatsSection';
import { usePokedex } from '@/apps/Pokeverse/context/PokedexContext';
import { BASE_API, END_POINT, TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { Pokemon } from '@/apps/Pokeverse/helpers/model.types';
import { PokemonDetail, PokemonSpecies } from '@/apps/Pokeverse/helpers/response.types';
import { DexUtils, getIdFromUrl } from '@/apps/Pokeverse/helpers/utilities';

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
                } else {
                    speciesId = updatedPokemon.speciesId!;
                }

                // Fetch Species API if not already fetched
                let evoChainId: number = 0;
                if (!updatedPokemon.fetchedApis.has(END_POINT.species)) {
                    const speciesUrl = `${BASE_API}pokemon-species/${speciesId}`;
                    const { data: species } = await axios.get<PokemonSpecies>(speciesUrl);
                    evoChainId = getIdFromUrl(species.evolution_chain.url);
                    DexUtils.updateSpecies(updatedPokemon, species);
                } else {
                    evoChainId = updatedPokemon.evoChainId!;
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
            <div className="min-h-[calc(100vh-52px)] flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
                <div className="animate-spin w-12 h-12 border-4 border-primary rounded-full border-t-transparent"></div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="min-h-[calc(100vh-52px)] p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm mb-4"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Pokemon not found</h3>
            </div>
        );
    }

    const activeSectionComponent = () => {
        switch (activeSection) {
            case 'info':
                return <InfoSection pokemon={pokemon} />;
            case 'entries':
                return <EntriesSection flavorTexts={pokemon.flavorTexts} primaryType={pokemon.types[0]} />;
            case 'moves':
                return <MovesSection moves={pokemon.moves} primaryType={pokemon.types[0]} />;
            case 'stats':
                return <StatsSection pokemon={pokemon} />;
            case 'evolution':
                return <EvolutionChain evolution={pokemon.evolutionChain} />;
            case 'varieties':
                return <AltFormsSection varieties={pokemon.varieties} primaryType={pokemon.types[0]} />;
            case 'gallery':
                return <GallerySection id={pokemon.id} primaryType={pokemon.types[0]} />;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[calc(100vh-52px)] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-2 md:p-4 text-gray-900 dark:text-gray-100"
            >
                {/* Top Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/80 dark:bg-violet-800/80 shadow-sm mb-8"
                    >
                        <ArrowLeft size={16} />
                        Back to Pokédex
                    </button>
                </motion.div>

                {/* Main Content */}
                <div className="grid sm:grid-cols-1 lg:grid-cols-[350px_1fr] gap-4">
                    {/* Left Column - Fixed Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="lg:sticky lg:top-8 h-fit">
                            <ImageCard pokemon={pokemon} />

                            {/* Name and Types */}
                            <h1 className="uppercase text-center mb-2 font-['Poppins'] text-2xl font-bold">
                                {pokemon.name}
                            </h1>

                            <div className="flex justify-center gap-2 mb-6">
                                {pokemon.types.map((type) => (
                                    <AnimatedTypeBadge
                                        key={type}
                                        type={type}
                                        color={TYPE_COLORS[type]}
                                    />
                                ))}
                            </div>

                            {/* Section Navigation */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-2 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-md hidden lg:block"
                            >
                                {Sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <motion.button
                                            key={section.id}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full flex items-center justify-start gap-2 px-3 py-2 mb-1 rounded-lg transition-all duration-200 ${activeSection === section.id
                                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {section.label}
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column - Content Sections */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-md overflow-hidden">
                            {/* Mobile Navigation */}
                            <div className="flex lg:hidden gap-1 p-2 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
                                {Sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <motion.button
                                            key={section.id}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`flex items-center gap-1 px-2 py-1 rounded-lg whitespace-nowrap ${activeSection === section.id
                                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {section.label}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Content Area */}
                            <div className="p-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSection}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="min-h-[400px]">
                                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                                                {Sections.find(s => s.id === activeSection)?.label}
                                            </h3>
                                            {activeSectionComponent()}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PokemonDetails;