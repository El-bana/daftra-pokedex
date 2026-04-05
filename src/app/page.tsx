import { fetchPokemon } from '@/features/pokemon/api/get-pokemons';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { HomeClient } from './_components/HomeClient';

export const revalidate = 86400; // Cache for 24 hours (ISR / SSG)

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['pokemon', 1, 20],
    queryFn: () => fetchPokemon(1, 20),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['pokemon', 'infinite', 20],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchPokemon(pageParam as number, 20),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
