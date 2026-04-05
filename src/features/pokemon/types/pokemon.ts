import { BaseApiResponse } from '@/lib/types';

export type PokemonListItem = {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
};

export type PokemonResponse = {
  data: PokemonListItem[];
  totalCount: number;
};

export type RawPokeApiResponse = BaseApiResponse<{
  name: string;
  url: string;
}>;
