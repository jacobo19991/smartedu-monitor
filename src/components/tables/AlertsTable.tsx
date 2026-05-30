/**
 * AlertsTable.tsx
 * Cambios realizados:
 * - Emplea useFilteredData() y memoiza el ordenamiento de los datos de alerta
 * - Emplea funciones compartidas getRiskIcon() y getRiskBadgeStyles() desde utils/risk
 * - Incorporados atributos de accesibilidad role="status" y aria-live="polite" al contador de registros
 * - Estado vacío premium con un diseño limpio e ícono de Lucide centrado
 * - Memoizado con React.memo()
 */
import React, { useMemo } from 'react';
import { Info } from 'lucide-react';
import { useFilteredData } from '../../hooks/useFilteredData';
import { getRiskIcon, getRiskBadgeStyles } from '../../utils/risk';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const AlertsTable = React.memo(function AlertsTable() {
  const { filteredData } = useFilteredData();

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a.riskLevel === 'Alto' && b.riskLevel !== 'Alto') return -1;
      if (a.riskLevel !== 'Alto' && b.riskLevel === 'Alto') return 1;
      if (a.riskLevel === 'Medio' && b.riskLevel === 'Bajo') return -1;
      if (a.riskLevel === 'Bajo' && b.riskLevel === 'Medio') return 1;
      return a.gradeScore - b.gradeScore;
    }).slice(0, 50);
  }, [filteredData]);

  if (sortedData.length === 0) {
    return (
      <div className="p-12 border border-border bg-card rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl mb-4 shrink-0 flex items-center justify-center animate-bounce">
          <Info size={28} />
        </div>
        <h4 className="text-sm font-bold text-foreground mb-1">No se encontraron alertas en la selección</h4>
        <p className="text-xs text-muted-foreground max-w-sm">Intente ajustar los selectores de filtrado académico en la barra superior para buscar otros registros.</p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card rounded-2xl shadow-sm overflow-hidden mb-12">
      <div className="p-6 border-b border-border/60 bg-muted/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-black text-foreground uppercase tracking-wider mb-1">Alertas Académicas</h3>
          <p className="text-xs text-muted-foreground font-medium">Listado priorizado de alumnos que requieren seguimiento y tutoría institucional.</p>
        </div>
        <span 
          role="status"
          aria-live="polite"
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0"
        >
          {sortedData.length} registros cargados
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] font-bold text-muted-foreground/80 bg-muted/30 uppercase tracking-widest border-b border-border/60">
            <tr>
              <th className="px-6 py-4">Estudiante</th>
              <th className="px-6 py-4">Grado / Sec.</th>
              <th className="px-6 py-4">Materia</th>
              <th className="px-6 py-4">Nota</th>
              <th className="px-6 py-4">Asistencia</th>
              <th className="px-6 py-4">Nivel de Riesgo</th>
              <th className="px-6 py-4">Acción Institucional Sugerida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {sortedData.map((row, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.015 }}
                key={row.id} 
                className="bg-card hover:bg-muted/10 transition-colors duration-150 group"
              >
                <td className="px-6 py-4.5 font-bold text-foreground text-xs">{row.studentName}</td>
                <td className="px-6 py-4.5 text-xs text-muted-foreground font-medium">
                  {row.grade} <span className="text-blue-500 font-bold">'{row.section}'</span>
                </td>
                <td className="px-6 py-4.5 text-xs text-muted-foreground font-semibold">{row.subject}</td>
                <td className="px-6 py-4.5">
                  <span className={clsx("font-extrabold text-xs", row.gradeScore < 6 ? "text-red-500" : "text-foreground")}>
                    {row.gradeScore.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4.5">
                  <span className={clsx("font-bold text-xs", row.attendance < 80 ? "text-amber-500" : "text-muted-foreground")}>
                    {row.attendance}%
                  </span>
                </td>
                <td className="px-6 py-4.5">
                  <span className={clsx("inline-flex items-center px-2 py-0.5 border rounded-md text-[10px] font-bold uppercase", getRiskBadgeStyles(row.riskLevel))}>
                    {getRiskIcon(row.riskLevel)}
                    {row.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4.5 text-xs font-medium text-muted-foreground/90 italic group-hover:text-foreground transition-colors duration-150">
                  {row.suggestedAction}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
export default AlertsTable;
