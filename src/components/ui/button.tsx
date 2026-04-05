import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  isActive = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        'focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-gray-900 text-white shadow-md hover:bg-gray-800'
          : 'border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2
          className={cn(
            'h-4 w-4 animate-spin',
            isActive ? 'text-white' : 'text-gray-500'
          )}
        />
      ) : (
        leftIcon && <span className="flex items-center">{leftIcon}</span>
      )}

      {children}

      {!isLoading && rightIcon && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  );
}
