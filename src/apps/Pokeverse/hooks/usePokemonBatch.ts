import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API, STALE_TIME, CACHE_TIME } from '../helpers/constants';
import type { PokemonDetail } from '../helpers/types';
import { createEmptyPokemon, transformPokemonDetails } from '../helpers/utilities';

const fetchPokemonDetails = async (id: number): Promise<PokemonDetail> => {
    const { data } = await axios.get(`${BASE_API}pokemon/${id}`);
    return data;
};

export const usePokemonBatch = (ids: number[]) => {
    const queries = useQueries({
        queries: ids.map(id => ({
            queryKey: ['pokemon', id],
            queryFn: () => fetchPokemonDetails(id),
            staleTime: STALE_TIME,
            gcTime: CACHE_TIME,
        })),
    });

    const isLoading = queries.some(q => q.isLoading);
    const pokemons = queries
        .filter(q => q.data)
        .map(q => {
            const pokemon = createEmptyPokemon(q.data!.id, q.data!.name);
            return transformPokemonDetails(pokemon, q.data!);
        });

    return { pokemons, isLoading };
};