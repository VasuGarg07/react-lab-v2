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
            <div className="flex-1 flex items-center justify-center bg-chalk py-20">
                <div className="text-center space-y-4">
                    <div className="w-14 h-14 border-4 border-silver border-t-crimson rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-medium text-smoke">Loading Pokémon...</p>
                </div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="flex-1 flex items-center justify-center bg-chalk p-8">
                <div className="text-center space-y-4 max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-crimson/10 flex items-center justify-center mx-auto">
                        <span className="text-3xl">😞</span>
                    </div>
                    <h2 className="text-xl font-black text-shadow">Pokémon Not Found</h2>
                    <p className="text-sm text-smoke">Could not load Pokémon data. Please try again.</p>
                    <button
                        onClick={() => navigate('/pokedex')}
                        className="px-5 py-2.5 bg-crimson hover:bg-ruby text-white text-sm font-bold rounded-lg transition-all duration-200"
                    >
                        Back to Pokédex
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-chalk">
            <HeroSection pokemon={pokemon} />

            {/* Tab bar — sticky below the app header (header is z-20, this is z-10) */}
            <div className="sticky top-13 z-10 bg-white border-b border-silver/40 shadow-sm">
                <div className="max-w-4xl mx-auto px-3">
                    <div className="flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
                        {DETAIL_TABS.map((tab) => {
                            const Icon = tabIcons[tab.id];
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 py-3 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap shrink-0 ${isActive
                                        ? 'border-crimson text-crimson'
                                        : 'border-transparent text-smoke hover:text-shadow hover:border-silver'
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

            <div className="max-w-4xl mx-auto w-full px-4 py-6">
                {activeTab === 'info' && <InfoSection pokemon={pokemon} />}
                {activeTab === 'entries' && <EntriesSection pokemon={pokemon} />}
                {activeTab === 'moves' && <MovesGrid pokemon={pokemon} />}
                {activeTab === 'stats' && <StatsSection pokemon={pokemon} />}
                {activeTab === 'evolution' && <EvolutionChain pokemon={pokemon} />}
                {activeTab === 'varieties' && <VarietiesSection pokemon={pokemon} />}
                {activeTab === 'gallery' && <GallerySection pokemon={pokemon} />}
            </div>
        </div>
    );
}
