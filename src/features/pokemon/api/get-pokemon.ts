// hooks/usePokemon.ts
import { fetcher } from '@/lib/api';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  PokemonListItem,
  PokemonResponse,
  RawPokeApiResponse,
} from '../types/pokemon';

const fetchPokemon = async (
  page: number,
  limit: number
): Promise<PokemonResponse> => {
  const offset = (page - 1) * limit;

  const result = await fetcher<RawPokeApiResponse>('/pokemon', {
    params: { limit, offset },
  });

  const data: PokemonListItem[] = result.results.map((p) => {
    // Extract ID from url (e.g., "https://pokeapi.co/api/v2/pokemon/1/") to use for the image as they don't come in the API response
    const id = p.url.split('/').filter(Boolean).pop() || '';
    return {
      ...p,
      id,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });

  return { data, totalCount: result.count };
};

export function usePokemon(page: number, limit: number = 20) {
  return useQuery({
    queryKey: ['pokemon', page, limit],
    queryFn: () => fetchPokemon(page, limit),
    placeholderData: keepPreviousData,
  });
}

export function useInfinitePokemon(limit: number = 20) {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'infinite', limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchPokemon(pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.totalCount / limit);
      const nextPage = allPages.length + 1;

      return nextPage <= maxPages ? nextPage : undefined;
    },
  });
}
