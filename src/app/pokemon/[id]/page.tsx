import { fetchPokemonDetail } from '@/features/pokemon/api/get-pokemon';
import { PokemonDetailView } from '@/features/pokemon/components/PokemonDetailView';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokémon Details — Pokédex',
  description:
    'View detailed information about this Pokémon including stats, types, abilities, and more.',
};

export const revalidate = 86400;

export async function generateStaticParams() {
  const { fetchPokemon } = await import('@/features/pokemon/api/get-pokemons');
  const response = await fetchPokemon(1, 20);

  return response.data.map((pokemon) => ({
    id: pokemon.id,
  }));
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemonDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetailView id={id} />
    </HydrationBoundary>
  );
}
