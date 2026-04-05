'use client';

import { Button } from '@/components/ui/button';
import { CardSkeleton } from '@/components/ui/skeleton';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useInfinitePokemon } from '../api/get-pokemons';
import { PokemonCard } from './PokemonCard';

const LIMIT = 20;

export function InfiniteScrollView() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePokemon(LIMIT);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPokemon = data?.pages.flatMap((page) => page.data) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="size-6" />
          <p className="text-lg font-medium">Something went wrong</p>
        </div>
        <p className="max-w-md text-center text-sm text-gray-500">
          {error?.message || 'Failed to load Pokémon. Please try again.'}
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
            {allPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          <div ref={sentinelRef} className="h-1" />

          {isFetchingNextPage && (
            <div className="flex flex-col items-center gap-3 py-6">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              <p className="text-sm text-gray-400">Loading more Pokémon…</p>
            </div>
          )}

          {!hasNextPage && allPokemon.length > 0 && (
            <p className="py-4 text-center text-sm text-gray-400">
              All {totalCount} Pokémon loaded
            </p>
          )}
        </>
      )}
    </div>
  );
}
