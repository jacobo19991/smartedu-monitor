import React from 'react';
import clsx from 'clsx';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const variants: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  error: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  default: 'bg-muted/50 text-muted-foreground border-border'
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm'
};

export const Badge = React.memo(function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: BadgeProps) {
  return (
    <span className={clsx(
      "inline-flex items-center justify-center font-bold rounded-lg border",
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
});
