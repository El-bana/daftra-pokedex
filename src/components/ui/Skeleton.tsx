import { cn } from '../../lib/utils';

export type SkeletonProps = React.ComponentProps<'div'>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <Skeleton className="mb-4 aspect-square w-full rounded-lg bg-gray-100" />
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="h-3 w-14" />
    </div>
  );
}
