import { motion } from 'framer-motion';
import { Loader, Swords, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PokemonSelectionCard } from '@/apps/Pokeverse/components/PokemonSelectionCard';
import { useBattle, useBattleActions } from '@/apps/Pokeverse/context/BattleSimContext';
import { usePokedex } from '@/apps/Pokeverse/context/PokedexContext';
import { Move } from '@/apps/Pokeverse/helpers/battle.types';
import { BASE_API, END_POINT, REGION_DATA } from '@/apps/Pokeverse/helpers/constant';
import { PokemonDetail } from '@/apps/Pokeverse/helpers/response.types';
import { BattleSimUtils, DexUtils, getIdFromUrl } from '@/apps/Pokeverse/helpers/utilities';
import useCacheApi from '@/apps/Pokeverse/hooks/useCacheApi';
import { scrollToTop } from '@/shared/utilities';
import { cn } from '@/shared/cn';
import axios from 'axios';
import AppBackground from '@/components/AppBackground';

interface PokemonListItem {
    name: string;
    url: string;
}

interface PokemonListResponse {
    results: PokemonListItem[];
}

interface MoveApiResponse {
    id: number;
    name: string;
    type: { name: string };
    power: number | null;
    accuracy: number | null;
    damage_class: { name: string };
}

export const TeamSelectionScreen = () => {
    const [selectedPokemon1, setSelectedPokemon1] = useState<number[]>([]);
    const [selectedPokemon2, setSelectedPokemon2] = useState<number[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [selectedRegion, setSelectedRegion] = useState(REGION_DATA[0]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const { state } = useBattle();
    const { addPokemonToTeam, startBattle } = useBattleActions();
    const { getPokemonById } = usePokedex();
    const navigate = useNavigate();

    const { data, loading, error } = useCacheApi<PokemonListResponse>(
        `${BASE_API}pokemon?limit=1015`,
        { cacheTime: 15 * 60 * 1000 }
    );

    const fetchMoveDetails = async (moveUrl: string): Promise<Move> => {
        const moveData: MoveApiResponse = (await axios(moveUrl)).data;
        return {
            id: moveData.id,
            name: moveData.name,
            type: moveData.type.name,
            power: moveData.power || 50,
            accuracy: moveData.accuracy || 100,
            category: moveData.damage_class.name === 'physical' ? 'Physical' : 'Special',
        };
    };

    const fetchPokemonDetails = async (id: number) => {
        let cachedPokemon = getPokemonById(Number(id)) || DexUtils.createPokemon(Number(id), `Pokemon-${id}`);

        if (!cachedPokemon.fetchedApis.has(END_POINT.details)) {
            const { data: details } = await axios.get<PokemonDetail>(`${BASE_API}pokemon/${id}`);
            DexUtils.updateDetails(cachedPokemon, details);
        }

        const movePromises = cachedPokemon.moves
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((m) => fetchMoveDetails(m.url));
        const moves = await Promise.all(movePromises);

        return BattleSimUtils.formatPokemonData(cachedPokemon, moves);
    };

    const handlePokemonSelect = (id: number) => {
        const [_, setSelected] =
            currentPlayer === 1
                ? [selectedPokemon1, setSelectedPokemon1]
                : [selectedPokemon2, setSelectedPokemon2];

        setSelected((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 6 ? [...prev, id] : prev
        );
    };

    const handleConfirmTeam = async () => {
        if (currentPlayer === 1 && selectedPokemon1.length > 0) {
            setCurrentPlayer(2);
            scrollToTop();
        } else if (currentPlayer === 2 && selectedPokemon2.length > 0) {
            setIsLoadingDetails(true);
            try {
                for (const id of selectedPokemon1) {
                    const pokemon = data?.results[id - 1];
                    if (pokemon) {
                        const battlePokemon = await fetchPokemonDetails(id);
                        addPokemonToTeam(0, battlePokemon);
                    }
                }

                // Fetch details for Player 2's Pokemon
                for (const id of selectedPokemon2) {
                    const pokemon = data?.results[id - 1];
                    if (pokemon) {
                        const battlePokemon = await fetchPokemonDetails(id);
                        addPokemonToTeam(1, battlePokemon);
                    }
                }

                startBattle();
                navigate('/pokeverse/battle-sim/battle');
            } catch (err) {
                console.error('Error fetching Pokémon:', err);
            } finally {
                setIsLoadingDetails(false);
            }
        }
    };

    const filteredPokemon = data?.results.filter((_, index) => {
        const id = index + 1;
        return id >= selectedRegion.startId && id <= selectedRegion.endId;
    });

    if (error) {
        return (
            <div className="min-h-[calc(100vh-54px)] flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-orange-400 text-white px-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Error loading Pokémon</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-54px)] w-full relative overflow-hidden px-4 py-6"
        >
            <AppBackground />
            <div className="max-w-7xl mx-auto space-y-6 relative">
                <div className="flex justify-between items-center px-4 py-4 rounded-xl bg-white dark:bg-zinc-900 shadow-md">
                    <div className="flex items-center gap-3">
                        <Users className="text-gray-800 dark:text-white" />
                        <h3
                            className={cn(
                                'text-xl font-semibold transition-colors',
                                currentPlayer === 1
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-red-600 dark:text-red-400'
                            )}
                        >
                            {currentPlayer === 1 ? state.players[0].name : state.players[1].name}'s Team Selection
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Selected: {(currentPlayer === 1 ? selectedPokemon1 : selectedPokemon2).length}/6
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 flex-col sm:flex-row sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {REGION_DATA.map((region) => (
                            <button
                                key={region.name}
                                onClick={() => setSelectedRegion(region)}
                                className={cn(
                                    'px-4 py-2 rounded-md text-xs font-medium uppercase shadow-sm transition-all',
                                    selectedRegion.name === region.name
                                        ? currentPlayer === 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-red-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600'
                                )}
                            >
                                {region.name}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={
                            (currentPlayer === 1 && selectedPokemon1.length === 0) ||
                            (currentPlayer === 2 && selectedPokemon2.length === 0) ||
                            isLoadingDetails
                        }
                        onClick={handleConfirmTeam}
                        className={cn(
                            'mt-2 sm:mt-0 flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-md transition-all min-w-[200px]',
                            currentPlayer === 1
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-red-600 hover:bg-red-700',
                            'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    >
                        {isLoadingDetails ? <Loader className="w-5 h-5 animate-spin" /> : <Swords />}
                        {currentPlayer === 1 ? 'Confirm Player 1 Team' : 'Start Battle'}
                    </button>
                </div>


                {loading || isLoadingDetails ? (
                    <div className="flex justify-center py-10">
                        <div className="flex flex-col items-center gap-3 text-gray-700 dark:text-gray-300">
                            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                            {isLoadingDetails && <p className="text-sm">Loading Pokémon details and moves...</p>}
                        </div>
                    </div>
                ) : (
                    <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {filteredPokemon?.map((pokemon) => {
                            const id = getIdFromUrl(pokemon.url);
                            return (
                                <PokemonSelectionCard
                                    key={id}
                                    id={id}
                                    name={pokemon.name}
                                    isSelected={
                                        currentPlayer === 1
                                            ? selectedPokemon1.includes(id)
                                            : selectedPokemon2.includes(id)
                                    }
                                    isPlayer1={currentPlayer === 1}
                                    onClick={() => handlePokemonSelect(id)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
