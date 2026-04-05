'use client';

import { Button } from '@/components/ui/button';
import { InfiniteScrollView } from '@/features/pokemon/components/InfiniteScrollView';
import { PaginatedView } from '@/features/pokemon/components/PaginatedView';
import { Zap } from 'lucide-react';
import { useState } from 'react';

type ViewMode = 'paginated' | 'infinite';

export function HomeClient() {
  const [view, setView] = useState<ViewMode>('paginated');

  return (
    <div className="min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-gray-900">
          <Zap className="size-8 text-yellow-500" />
          Pokédex
        </h1>
        <p className="mb-6 text-gray-500">
          Discover and explore Pokémon with{' '}
          {view === 'paginated' ? 'page controls' : 'infinite scroll'}
        </p>

        <div className="inline-flex gap-2">
          <Button
            isActive={view === 'paginated'}
            onClick={() => setView('paginated')}
          >
            Page Controls
          </Button>
          <Button
            isActive={view === 'infinite'}
            onClick={() => setView('infinite')}
          >
            Infinite Scroll
          </Button>
        </div>
      </header>

      <section
        className="rounded-2xl px-4 py-6 sm:px-6 md:px-8"
        style={{
          background:
            view === 'paginated'
              ? 'linear-gradient(135deg, #e8eaf6 0%, #e3f2fd 100%)'
              : 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
        }}
      >
        {view === 'paginated' ? <PaginatedView /> : <InfiniteScrollView />}
      </section>
    </div>
  );
}
