import { Activity, BookText, GitBranch, Images, Info, Shuffle, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DETAIL_TABS } from '../helpers/constants';
import { usePokemon } from '../hooks/usePokemon';
import HeroSection from './HeroSection';
import InfoSection from './InfoSection';
import EntriesSection from './EntriesSection';
import GallerySection from './GallerySection';
import MovesGrid from './MovesGrid';
import EvolutionChain from './EvolutionChain';
import VarietiesSection from './VarietiesSection';
import StatsSection from './StatsSection';

export default function PokemonDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pokemonId = parseInt(id || '1');

    const { pokemon, isLoading, error } = usePokemon(pokemonId);
    const [activeTab, setActiveTab] = useState('info');

    const tabIcons: Record<string, typeof Info> = {
        info: Info,
        entries: BookText,
        moves: Zap,
        stats: Activity,
        evolution: GitBranch,
        varieties: Shuffle,
        gallery: Images,
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-neutral-300 dark:border-neutral-600 border-t-blue-500 rounded-full animate-spin mx-auto" />
                    <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">Loading Pokémon...</p>
                </div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
                <div className="text-center space-y-4 max-w-md">
                    <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
                        <span className="text-4xl">😞</span>
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Pokémon Not Found</h2>
                    <p className="text-neutral-600 dark:text-neutral-400">Could not load Pokémon data. Please try again.</p>
                    <button
                        onClick={() => navigate('/pokeverse/pokedex')}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                        Back to Pokédex
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <HeroSection pokemon={pokemon} />

            <div className="sticky top-0 z-10 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="max-w-4xl mx-auto px-3">
                    <div className="flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                        {DETAIL_TABS.map((tab) => {
                            const Icon = tabIcons[tab.id];
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${isActive
                                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4 sm:py-6 lg:py-8">
                {activeTab === 'info' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Information</h2>
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <InfoSection pokemon={pokemon} />
                        </div>
                    </div>
                )}
                {activeTab === 'entries' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Pokédex Entries</h2>
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <EntriesSection pokemon={pokemon} />
                        </div>
                    </div>
                )}
                {activeTab === 'moves' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Moves</h2>
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <MovesGrid pokemon={pokemon} />
                        </div>
                    </div>
                )}
                {activeTab === 'stats' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Base Stats</h2>
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <StatsSection pokemon={pokemon} />
                        </div>
                    </div>
                )}
                {activeTab === 'evolution' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Evolution Chain</h2>
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <EvolutionChain pokemon={pokemon} />
                        </div>
                    </div>
                )}
                {activeTab === 'varieties' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Forms</h2>
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <VarietiesSection pokemon={pokemon} />
                        </div>
                    </div>
                )}
                {activeTab === 'gallery' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Gallery</h2>
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <GallerySection pokemon={pokemon} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
