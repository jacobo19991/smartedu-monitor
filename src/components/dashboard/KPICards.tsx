/**
 * KPICards.tsx
 * Cambios realizados:
 * - Emplea useFilteredData() y memoiza todos los cálculos derivados (Promedio, Asistencia, Riesgo Alto, Materias Críticas)
 * - Agregados Tooltips nativos (atributo title) con los valores numéricos exactos en hover
 * - Implementación de animación Skeleton de carga (animate-pulse) ante cambios de filtros para mejorar la percepción de UX
 * - Memoizado con React.memo()
 */
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, AlertOctagon, BookX, TrendingUp } from 'lucide-react';
import { useFilteredData } from '../../hooks/useFilteredData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

export const KPICards = React.memo(function KPICards() {
  const { filteredData, cycle, grade, subject, risk } = useFilteredData();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Trigger brief pulse animation on filter change to simulate live telemetry recalculation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [cycle, grade, subject, risk]);

  const stats = useMemo(() => {
    const total = filteredData.length;
    const rawAvgGrade = total ? filteredData.reduce((acc, r) => acc + r.gradeScore, 0) / total : 0;
    const avgGrade = rawAvgGrade.toFixed(1);
    const avgAttendance = total ? Math.round(filteredData.reduce((acc, r) => acc + r.attendance, 0) / total) : 0;
    const atRiskCount = filteredData.filter(r => r.riskLevel === 'Alto').length;
    
    // Critical subjects count (any subject with at-risk students)
    const criticalSubjectsCount = new Set(filteredData.filter(r => r.riskLevel === 'Alto').map(r => r.subject)).size;

    return {
      total,
      avgGrade,
      rawAvgGrade,
      avgAttendance,
      atRiskCount,
      criticalSubjectsCount
    };
  }, [filteredData]);

  const kpis = useMemo(() => {
    return [
      {
        title: 'Promedio General',
        value: stats.avgGrade,
        exactValue: `${stats.rawAvgGrade.toFixed(4)} / 10.0`,
        icon: GraduationCap,
        description: 'Nota acumulada promedio de alumnos',
        trend: '+0.2',
        trendUp: true,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10 border-blue-500/20',
        percentage: Number(stats.avgGrade) * 10,
        progressColor: 'bg-blue-500'
      },
      {
        title: 'Asistencia Media',
        value: `${stats.avgAttendance}%`,
        exactValue: `${(filteredData.length ? filteredData.reduce((acc, r) => acc + r.attendance, 0) / filteredData.length : 0).toFixed(2)}% de asistencia`,
        icon: Users,
        description: 'Asistencia promedio en el aula',
        trend: '+2.1%',
        trendUp: true,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10 border-emerald-500/20',
        percentage: stats.avgAttendance,
        progressColor: 'bg-emerald-500'
      },
      {
        title: 'Total Evaluados',
        value: stats.total,
        exactValue: `${stats.total} actas y registros académicos`,
        icon: TrendingUp,
        description: 'Registros cargados en el periodo',
        trend: '+12',
        trendUp: true,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10 border-purple-500/20',
        percentage: 100,
        progressColor: 'bg-purple-500'
      },
      {
        title: 'En Riesgo Alto',
        value: stats.atRiskCount,
        exactValue: `${stats.atRiskCount} estudiantes bajo alerta de reprobación o inasistencia`,
        icon: AlertOctagon,
        description: 'Alumnos que requieren atención prioritaria',
        trend: stats.atRiskCount > 0 ? 'Revisión' : 'Estable',
        trendUp: false,
        color: 'text-destructive',
        bgColor: 'bg-destructive/10 border-destructive/20',
        percentage: stats.total ? (stats.atRiskCount / stats.total) * 100 : 0,
        progressColor: 'bg-destructive'
      },
      {
        title: 'Materias Críticas',
        value: stats.criticalSubjectsCount,
        exactValue: `${stats.criticalSubjectsCount} asignaturas con alumnos en riesgo alto`,
        icon: BookX,
        description: 'Materias con promedios bajos',
        trend: 'Estable',
        trendUp: false,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10 border-amber-500/20',
        percentage: 30,
        progressColor: 'bg-amber-500'
      },
    ];
  }, [stats, filteredData]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-5 border border-border bg-card rounded-2xl h-44 animate-pulse flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-3 w-20 bg-muted rounded" />
                <div className="h-8 w-8 bg-muted rounded-xl" />
              </div>
              <div className="h-6 w-12 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-1 w-full bg-muted rounded" />
              <div className="h-2 w-10 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8"
    >
      {kpis.map((kpi, idx) => {
        const IconComponent = kpi.icon;
        return (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: idx * 0.05 }}
            className="p-5 border border-border bg-card rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden"
            title={kpi.exactValue}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{kpi.title}</span>
                <div className={`p-2 rounded-xl border ${kpi.bgColor} ${kpi.color}`}>
                  <IconComponent size={16} />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">{kpi.value}</h3>
              <p className="text-[10px] text-muted-foreground leading-normal mb-4 font-medium">{kpi.description}</p>
            </div>
            
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${kpi.progressColor} rounded-full`} style={{ width: `${Math.min(100, Math.max(0, kpi.percentage))}%` }} />
              </div>
              <div className="flex justify-between items-center text-[9px] font-semibold text-muted-foreground">
                <span>Indicador</span>
                <span className={kpi.trendUp ? "text-emerald-500" : "text-muted-foreground"}>{kpi.trend}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
});
export default KPICards;
