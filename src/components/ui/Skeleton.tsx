import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

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
      <Skeleton className="mb-4 h-24 w-full rounded-lg bg-gray-100" />
      <Skeleton className="mb-2 h-4 w-20" />
      <Skeleton className="h-3 w-12" />
    </div>
  );
}
