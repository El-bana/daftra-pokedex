'use client';

import { Button } from '@/components/ui/button';
import { usePokemonDetail } from '@/features/pokemon/api/get-pokemon';
import { PokemonDetailSkeleton } from '@/features/pokemon/components/PokemonDetailSkeleton';
import { cn } from '@/lib/utils';
import { AlertTriangle, ArrowLeft, Ruler, Weight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Pokemon type to colour mapping
const TYPE_COLOURS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

const TYPE_GRADIENT: Record<string, string> = {
  normal: 'from-gray-400 to-gray-300',
  fire: 'from-red-500 to-orange-400',
  water: 'from-blue-500 to-cyan-400',
  electric: 'from-yellow-400 to-amber-300',
  grass: 'from-green-500 to-emerald-400',
  ice: 'from-cyan-300 to-blue-200',
  fighting: 'from-orange-700 to-red-600',
  poison: 'from-purple-500 to-fuchsia-400',
  ground: 'from-amber-600 to-yellow-500',
  flying: 'from-indigo-300 to-blue-200',
  psychic: 'from-pink-500 to-rose-400',
  bug: 'from-lime-500 to-green-400',
  rock: 'from-yellow-700 to-amber-600',
  ghost: 'from-purple-700 to-indigo-600',
  dragon: 'from-indigo-600 to-violet-500',
  dark: 'from-gray-700 to-gray-600',
  steel: 'from-gray-400 to-slate-300',
  fairy: 'from-pink-300 to-rose-200',
};

interface PokemonDetailViewProps {
  id: string;
}

export function PokemonDetailView({ id }: PokemonDetailViewProps) {
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
    refetch,
  } = usePokemonDetail(id);
  const [imgError, setImgError] = useState(false);

  if (isLoading) {
    return <PokemonDetailSkeleton />;
  }

  if (isError || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="rounded-full bg-red-50 p-4">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Failed to load Pokémon
        </h2>
        <p className="max-w-md text-sm text-gray-500">
          {error instanceof Error
            ? error.message
            : 'Something went wrong while fetching this Pokémon.'}
        </p>
        <div className="flex gap-3">
          <Link href="/">
            <Button leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to List
            </Button>
          </Link>
          <Button isActive onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const primaryType = pokemon.types[0] ?? 'normal';
  const gradient = TYPE_GRADIENT[primaryType] ?? TYPE_GRADIENT.normal;
  const maxStat = Math.max(...pokemon.stats.map((s) => s.value), 1);

  return (
    <div className="animate-in fade-in duration-300">
      <Link href="/">
        <Button className="mb-6" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to List
        </Button>
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div
          className={cn(
            'flex flex-col items-center justify-center bg-linear-to-r py-6 sm:py-8',
            gradient
          )}
        >
          <h1 className="text-2xl font-bold text-white capitalize drop-shadow-md sm:text-3xl">
            {pokemon.name}
          </h1>
          <span className="text-sm font-medium text-white/80">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative size-48 overflow-hidden rounded-full bg-gray-50 shadow-inner sm:size-56">
              {!imgError ? (
                <Image
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  fill
                  sizes="224px"
                  priority
                  className="object-contain p-4"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <span className="text-5xl">?</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={cn(
                    'rounded-full px-4 py-1 text-xs font-semibold text-white capitalize shadow-sm',
                    TYPE_COLOURS[type] ?? 'bg-gray-400'
                  )}
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="mt-2 flex w-full max-w-xs items-center justify-around gap-4 rounded-xl border border-gray-100 bg-gray-50 px-6 py-4 shadow-sm">
              <div className="flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                  <Ruler /> Height
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {pokemon.height} m
                </span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                  <Weight /> Weight
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {pokemon.weight} kg
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                Base Stats
              </h2>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-xs font-semibold text-gray-500">
                      {stat.name}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={cn(
                          'h-full rounded-full bg-linear-to-r transition-all duration-500',
                          gradient
                        )}
                        style={{
                          width: `${Math.min((stat.value / maxStat) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-bold text-gray-700">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-gray-800">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 capitalize"
                  >
                    {ability.name.replace('-', ' ')}
                    {ability.isHidden && (
                      <span className="text-xs text-gray-400">(Hidden)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-gray-800">
                Base Experience
              </h2>
              <span
                className={cn(
                  'bg-linear-to-r bg-clip-text text-xl font-bold text-transparent',
                  gradient
                )}
              >
                {pokemon.baseExperience} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
