import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API, CACHE_TIME, STALE_TIME, ITEMS_PER_PAGE } from '../helpers/constants';
import { createEmptyPokemon, getIdFromUrl, transformPokemonDetails } from '../helpers/utilities';
import type { Pokemon, PokemonDetail, PokemonListResponse } from '../helpers/types';

interface UseInfinitePokemonParams {
    regionStart: number;
    regionEnd: number;
}

const fetchPokemonPage = async (offset: number, limit: number): Promise<Pokemon[]> => {
    const listResponse = await axios.get<PokemonListResponse>(
        `${BASE_API}pokemon?limit=${limit}&offset=${offset}`
    );

    const detailsPromises = listResponse.data.results.map(async (item) => {
        const id = getIdFromUrl(item.url);
        const detailResponse = await axios.get<PokemonDetail>(`${BASE_API}pokemon/${id}`);
        const pokemon = createEmptyPokemon(id, item.name);
        return transformPokemonDetails(pokemon, detailResponse.data);
    });

    return Promise.all(detailsPromises);
};

export const useInfinitePokemon = ({ regionStart, regionEnd }: UseInfinitePokemonParams) => {
    return useInfiniteQuery({
        queryKey: ['infinite-pokemon', regionStart, regionEnd],
        queryFn: ({ pageParam = regionStart - 1 }) => {
            const remainingInRegion = regionEnd - pageParam;
            const limit = Math.min(ITEMS_PER_PAGE, remainingInRegion);
            return fetchPokemonPage(pageParam, limit);
        },
        getNextPageParam: (_, allPages) => {
            const loadedCount = allPages.flat().length;
            const nextOffset = regionStart - 1 + loadedCount;

            if (nextOffset >= regionEnd) {
                return undefined;
            }

            return nextOffset;
        },
        initialPageParam: regionStart - 1,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
};