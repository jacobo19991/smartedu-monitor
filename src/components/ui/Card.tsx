import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"article"> {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ children, className, noPadding = false, ...props }, ref) => {
    return (
      <motion.article
        ref={ref}
        className={clsx(
          "bg-card border border-border/80 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300",
          !noPadding && "p-6 md:p-8",
          className
        )}
        {...props}
      >
        {children}
      </motion.article>
    );
  }
);
Card.displayName = 'Card';
