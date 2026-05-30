import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API, STALE_TIME, CACHE_TIME } from '../helpers/constants';
import type { BattlePokemon, BattleMove, PokemonDetail, MoveApiResponse } from '../helpers/types';

interface BattlePokemonParams {
    player1Ids: number[];
    player2Ids: number[];
    level: number;
}

interface PokemonLoadingState {
    pokemon: BattlePokemon | null;
    isLoading: boolean;
    isError: boolean;
}

interface BattlePokemonResult {
    player1Team: PokemonLoadingState[];
    player2Team: PokemonLoadingState[];
    player1Ready: boolean;
    player2Ready: boolean;
    allReady: boolean;
    isError: boolean;
    error: string | null;
}

interface PokemonWithMoves {
    pokemon: PokemonDetail;
    moves: BattleMove[];
}

const fetchPokemonDetails = async (id: number): Promise<PokemonDetail> => {
    const { data } = await axios.get(`${BASE_API}pokemon/${id}`);
    return data;
};

const fetchMoveDetails = async (url: string): Promise<MoveApiResponse> => {
    const { data } = await axios.get(url);
    return data;
};

const fetchRandomMoves = async (pokemon: PokemonDetail): Promise<BattleMove[]> => {
    const shuffled = [...pokemon.moves].sort(() => Math.random() - 0.5);
    const selectedMoveData = shuffled.slice(0, Math.min(4, pokemon.moves.length));

    const movePromises = selectedMoveData.map(async (moveData) => {
        const moveDetail = await fetchMoveDetails(moveData.move.url);
        const damageClass = moveDetail.damage_class.name;
        const category: 'Physical' | 'Special' =
            damageClass === 'physical' ? 'Physical' :
                damageClass === 'special' ? 'Special' : 'Physical';

        return {
            id: moveDetail.id,
            name: moveDetail.name,
            type: moveDetail.type.name,
            power: moveDetail.power || 0,
            accuracy: moveDetail.accuracy || 100,
            category,
        } as BattleMove;
    });

    return Promise.all(movePromises);
};

const formatPokemonForBattle = (
    pokemon: PokemonDetail,
    selectedMoves: BattleMove[],
    level: number
): BattlePokemon => {
    const calculateStat = (baseStat: number, lvl: number, isHP: boolean = false): number => {
        const iv = 31;
        const ev = 85;
        if (isHP) {
            return Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * lvl) / 100 + lvl + 10);
        }
        return Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * lvl) / 100 + 5);
    };

    const stats = {
        hp: calculateStat(pokemon.stats[0].base_stat, level, true),
        attack: calculateStat(pokemon.stats[1].base_stat, level),
        defense: calculateStat(pokemon.stats[2].base_stat, level),
        specialAttack: calculateStat(pokemon.stats[3].base_stat, level),
        specialDefense: calculateStat(pokemon.stats[4].base_stat, level),
        speed: calculateStat(pokemon.stats[5].base_stat, level),
    };

    return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map(t => t.type.name),
        level,
        currentHP: stats.hp,
        maxHP: stats.hp,
        selectedMoves,
        frontSprite: pokemon.sprites.front_default,
        backSprite: pokemon.sprites.back_default || pokemon.sprites.front_default,
        calculatedStats: stats,
    };
};

const fetchPokemonWithMoves = async (id: number): Promise<PokemonWithMoves> => {
    const pokemon = await fetchPokemonDetails(id);
    const moves = await fetchRandomMoves(pokemon);
    return { pokemon, moves };
};

export function useBattlePokemon({
    player1Ids,
    player2Ids,
    level,
}: BattlePokemonParams): BattlePokemonResult {
    const allIds = [...player1Ids, ...player2Ids];

    const queries = useQueries({
        queries: allIds.map((id) => ({
            queryKey: ['battle-pokemon', id, level],
            queryFn: () => fetchPokemonWithMoves(id),
            staleTime: STALE_TIME,
            gcTime: CACHE_TIME,
            retry: 2,
        })),
    });

    const loadingStates: PokemonLoadingState[] = queries.map((query) => ({
        pokemon: query.data
            ? formatPokemonForBattle(query.data.pokemon, query.data.moves, level)
            : null,
        isLoading: query.isLoading,
        isError: query.isError,
    }));

    const player1Team = loadingStates.slice(0, player1Ids.length);
    const player2Team = loadingStates.slice(player1Ids.length);

    const player1Ready = player1Team.every(s => !s.isLoading && !s.isError && s.pokemon !== null);
    const player2Ready = player2Team.every(s => !s.isLoading && !s.isError && s.pokemon !== null);
    const allReady = player1Ready && player2Ready;

    const isError = queries.some(q => q.isError);
    const errorQuery = queries.find(q => q.isError);

    return {
        player1Team,
        player2Team,
        player1Ready,
        player2Ready,
        allReady,
        isError,
        error: isError ? (errorQuery?.error as Error)?.message || 'Failed to fetch Pokemon data' : null,
    };
}
