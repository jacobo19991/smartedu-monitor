import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import type { RiskLevel } from '../types';

export function getRiskIcon(level: RiskLevel, size = 14) {
  switch (level) {
    case 'Alto':
      return <ShieldAlert size={size} className="mr-1.5 shrink-0 text-red-500" />;
    case 'Medio':
      return <AlertTriangle size={size} className="mr-1.5 shrink-0 text-amber-500" />;
    case 'Bajo':
      return <CheckCircle2 size={size} className="mr-1.5 shrink-0 text-emerald-500" />;
    default:
      return null;
  }
}

export function getRiskBadgeStyles(level: RiskLevel): string {
  switch (level) {
    case 'Alto':
      return 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400';
    case 'Medio':
      return 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400';
    case 'Bajo':
      return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
    default:
      return 'bg-muted border-border text-muted-foreground';
  }
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'Alto':
      return '#ef4444';
    case 'Medio':
      return '#f59e0b';
    case 'Bajo':
      return '#10b981';
    default:
      return '#6b7280';
  }
}

