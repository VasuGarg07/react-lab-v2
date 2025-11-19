import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API, CACHE_TIME, STALE_TIME } from '../helpers/constants';
import { createEmptyPokemon, transformPokemonDetails } from '../helpers/utilities';
import type { PokemonDetail } from '../helpers/types';

const fetchPokemonDetails = async (id: number): Promise<PokemonDetail> => {
    const { data } = await axios.get(`${BASE_API}pokemon/${id}`);
    return data;
};

export const usePokemonDetails = (id: number) => {
    return useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => fetchPokemonDetails(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        select: (data) => {
            const pokemon = createEmptyPokemon(id, data.name);
            return transformPokemonDetails(pokemon, data);
        },
    });
};