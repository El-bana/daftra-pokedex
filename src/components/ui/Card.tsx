import { cn } from '../../lib/utils';

export type CardProps = React.ComponentProps<'div'>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
