import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API, CACHE_TIME, STALE_TIME } from '../helpers/constants';
import {
    createEmptyPokemon,
    getIdFromUrl,
    transformPokemonDetails,
    transformPokemonSpecies,
    transformEvolutionChain,
} from '../helpers/utilities';
import type {
    Pokemon,
    PokemonDetail,
    PokemonSpecies,
    EvolutionChainResponse,
} from '../helpers/types';

const fetchPokemonDetails = async (id: number): Promise<PokemonDetail> => {
    const { data } = await axios.get(`${BASE_API}pokemon/${id}`);
    return data;
};

const fetchPokemonSpecies = async (id: number): Promise<PokemonSpecies> => {
    const { data } = await axios.get(`${BASE_API}pokemon-species/${id}`);
    return data;
};

const fetchEvolutionChain = async (id: number): Promise<EvolutionChainResponse> => {
    const { data } = await axios.get(`${BASE_API}evolution-chain/${id}`);
    return data;
};

export const usePokemon = (id: number) => {
    const detailsQuery = useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => fetchPokemonDetails(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });

    const speciesQuery = useQuery({
        queryKey: ['pokemon-species', id],
        queryFn: () => fetchPokemonSpecies(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        enabled: !!detailsQuery.data,
    });

    const evoChainId = speciesQuery.data
        ? getIdFromUrl(speciesQuery.data.evolution_chain.url)
        : null;

    const evolutionQuery = useQuery({
        queryKey: ['evolution-chain', evoChainId],
        queryFn: () => fetchEvolutionChain(evoChainId!),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        enabled: !!evoChainId,
    });

    const isLoading = detailsQuery.isLoading || speciesQuery.isLoading || evolutionQuery.isLoading;
    const error = detailsQuery.error || speciesQuery.error || evolutionQuery.error;

    let pokemon: Pokemon | null = null;

    if (detailsQuery.data) {
        pokemon = createEmptyPokemon(id, detailsQuery.data.name);
        pokemon = transformPokemonDetails(pokemon, detailsQuery.data);

        if (speciesQuery.data) {
            pokemon = transformPokemonSpecies(pokemon, speciesQuery.data);
        }

        if (evolutionQuery.data) {
            pokemon = transformEvolutionChain(pokemon, evolutionQuery.data.chain);
        }
    }

    return {
        pokemon,
        isLoading,
        error,
        refetch: () => {
            detailsQuery.refetch();
            speciesQuery.refetch();
            evolutionQuery.refetch();
        },
    };
};