import { CardSkeleton } from '@/components/ui/skeleton';
import { PokemonListItem } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function PokemonGrid({
  pokemon,
  isLoading = false,
  skeletonCount = 20,
}: PokemonGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
