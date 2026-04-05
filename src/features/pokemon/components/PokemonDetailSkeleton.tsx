import { Skeleton } from '@/components/ui/skeleton';

export function PokemonDetailSkeleton() {
  return (
    <div className="animate-in fade-in duration-300">
      <Skeleton className="mb-6 h-9 w-32 rounded-lg" />

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="h-24 w-full bg-linear-to-r from-gray-200 to-gray-100 sm:h-28" />

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="size-48 rounded-full sm:size-56" />
            <div className="flex gap-2">
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>
            <div className="mt-2 flex w-full max-w-xs justify-around gap-4">
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <Skeleton className="h-6 w-28" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 flex-1 rounded-full" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
            <Skeleton className="mt-4 h-6 w-24" />
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-7 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
