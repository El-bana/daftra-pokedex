'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PokemonListItem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="block">
      <Card className="group cursor-pointer border border-gray-100 transition-shadow hover:shadow-lg">
        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
          {!imgError ? (
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
              loading="eager"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <span className="text-3xl">?</span>
            </div>
          )}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 capitalize">
          {pokemon.name}
        </h3>
        <span className="text-xs text-gray-400">
          #{pokemon.id.padStart(3, '0')}
        </span>
      </Card>
    </Link>
  );
}
