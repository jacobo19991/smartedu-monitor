/**
 * PerformanceChart.tsx
 * Cambios realizados:
 * - Emplea el hook useFilteredData() para acceder a los datos unificados
 * - Memoiza el cálculo y ordenamiento de los promedios académicos por grado
 * - Incorpora role="img" y aria-label descriptivo para cumplir pautas de accesibilidad
 * - Estado vacío premium mejorado visualmente con un ícono centrado
 * - Memoizado con React.memo()
 */
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useFilteredData } from '../../hooks/useFilteredData';
import { Info } from 'lucide-react';

export const PerformanceChart = React.memo(function PerformanceChart() {
  const { filteredData } = useFilteredData();

  const chartData = useMemo(() => {
    const gradeAverages = filteredData.reduce((acc, curr) => {
      if (!acc[curr.grade]) {
        acc[curr.grade] = { total: 0, count: 0 };
      }
      acc[curr.grade].total += curr.gradeScore;
      acc[curr.grade].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.keys(gradeAverages).map(g => ({
      name: g,
      promedio: Number((gradeAverages[g].total / gradeAverages[g].count).toFixed(1))
    })).sort((a, b) => {
      const getLevel = (name: string) => {
        if (name.includes('Parvularia')) return 1;
        if (name.includes('Grado')) return 2;
        return 3;
      };
      return getLevel(a.name) - getLevel(b.name) || a.name.localeCompare(b.name);
    });
  }, [filteredData]);

  if (chartData.length === 0) {
    return (
      <div className="p-12 border border-border bg-card rounded-2xl flex flex-col items-center justify-center text-center h-[350px]">
        <div className="p-4 bg-muted rounded-2xl text-muted-foreground mb-4 shrink-0 flex items-center justify-center">
          <Info size={28} />
        </div>
        <h4 className="text-sm font-bold text-foreground mb-1">Sin registros coincidentes</h4>
        <p className="text-xs text-muted-foreground max-w-sm">Intente modificar los filtros superiores para visualizar los promedios académicos de rendimiento.</p>
      </div>
    );
  }

  interface TooltipPayloadItem {
    value: number | string;
    payload: {
      name: string;
      promedio: number;
    };
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-xl shadow-xl">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
          <p className="text-xs font-semibold text-blue-500">
            Promedio: <span className="text-sm font-extrabold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="h-[350px] w-full mt-4" 
      role="img" 
      aria-label="Gráfico de barra que muestra el promedio de calificaciones de los alumnos agrupados por grado"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="premiumBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="premiumDestructive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 9, fontWeight: 600 }}
          />
          <YAxis 
            domain={[0, 10]} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 9, fontWeight: 600 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.15 }} />
          <Bar dataKey="promedio" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.promedio < 6 ? 'url(#premiumDestructive)' : 'url(#premiumBlue)'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
export default PerformanceChart;
