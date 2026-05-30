import React from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader = React.memo(function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={clsx("mb-4", className)}>
      <h3 className="text-base md:text-lg font-black text-foreground tracking-tight mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs md:text-sm text-muted-foreground font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
});
