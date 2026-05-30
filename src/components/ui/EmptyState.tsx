import React from 'react';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState = React.memo(function EmptyState({ 
  title = "No se encontraron resultados", 
  description = "Intenta ajustar tus filtros para encontrar lo que buscas.",
  icon = <SearchX size={48} className="text-muted-foreground/30 mx-auto mb-4" />
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-10 md:p-16 text-center border border-dashed border-border/80 rounded-2xl bg-muted/10 my-4"
    >
      {icon}
      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </motion.div>
  );
});
