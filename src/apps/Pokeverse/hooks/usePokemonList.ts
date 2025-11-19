import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API, CACHE_TIME, STALE_TIME } from '../helpers/constants';
import type { PokemonListResponse } from '../helpers/types';

const fetchPokemonList = async (limit: number, offset: number): Promise<PokemonListResponse> => {
    const { data } = await axios.get(`${BASE_API}pokemon?limit=${limit}&offset=${offset}`);
    return data;
};

export const usePokemonList = (limit: number, offset: number) => {
    return useQuery({
        queryKey: ['pokemon-list', limit, offset],
        queryFn: () => fetchPokemonList(limit, offset),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
};