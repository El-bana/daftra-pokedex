'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { usePokemon } from '../api/get-pokemons';
import { PokemonGrid } from './PokemonGrid';

const LIMIT = 20;

export function PaginatedView() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch, isPlaceholderData } =
    usePokemon(page, LIMIT);

  const totalPages = data ? Math.ceil(data.totalCount / LIMIT) : 0;

  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => {
    if (!isPlaceholderData && data && page < totalPages) {
      setPage((p) => p + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('ellipsis');
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-6 w-6" />
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
    <div className="space-y-8">
      <div
        className={
          isPlaceholderData && !isLoading
            ? 'pointer-events-none opacity-60 transition-opacity'
            : 'transition-opacity'
        }
      >
        <PokemonGrid
          pokemon={data?.data ?? []}
          isLoading={isLoading}
          skeletonCount={LIMIT}
        />
      </div>

      {!isLoading && data && (
        <div className="flex flex-col items-center gap-4">
          <nav
            className="flex flex-wrap items-center justify-center gap-1"
            aria-label="Pagination"
          >
            <Button
              onClick={handlePrevious}
              disabled={page === 1}
              leftIcon={<ChevronLeft className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {getPageNumbers().map((p, i) =>
              p === 'ellipsis' ? (
                <span
                  key={`ellipsis-${i}`}
                  className="flex h-9 w-9 items-center justify-center text-sm text-gray-400"
                >
                  …
                </span>
              ) : (
                <Button
                  key={p}
                  isActive={p === page}
                  onClick={() => setPage(p)}
                  className="h-9 w-9 p-0"
                >
                  {p}
                </Button>
              )
            )}

            <Button
              onClick={handleNext}
              disabled={page >= totalPages}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">Next</span>
            </Button>
          </nav>

          <p className="text-sm text-gray-500">
            Page {page} of {totalPages} ({data.totalCount} Pokémon shown)
          </p>
        </div>
      )}
    </div>
  );
}
