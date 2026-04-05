import { fetcher } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { PokemonDetail, RawPokemonDetail } from '../types/pokemon';

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

export const fetchPokemonDetail = async (id: string): Promise<PokemonDetail> => {
  const raw = await fetcher<RawPokemonDetail>(`/pokemon/${id}`);

  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    baseExperience: raw.base_experience,
    imageUrl:
      raw.sprites.other['official-artwork'].front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${raw.id}.png`,
    types: raw.types.map((t) => t.type.name),
    stats: raw.stats.map((s) => ({
      name: STAT_LABELS[s.stat.name] ?? s.stat.name,
      value: s.base_stat,
    })),
    abilities: raw.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
  };
};

export function usePokemonDetail(id: string) {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemonDetail(id),
    enabled: !!id,
  });
}
