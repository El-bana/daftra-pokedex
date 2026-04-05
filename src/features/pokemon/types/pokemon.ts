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

export type RawPokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  imageUrl: string;
  types: string[];
  stats: { name: string; value: number }[];
  abilities: { name: string; isHidden: boolean }[];
};
