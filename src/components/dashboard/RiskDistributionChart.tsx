/**
 * RiskDistributionChart.tsx
 * Cambios realizados:
 * - Emplea el hook useFilteredData() para obtener la información unificada
 * - Memoiza el conteo de distribución por nivel de riesgo (Bajo, Medio, Alto)
 * - Emplea el mapa de colores unificado desde utils/risk
 * - Incorporados atributos role="img" y aria-label para optimizar accesibilidad
 * - Estado vacío premium mejorado con un ícono centrado
 * - Memoizado con React.memo()
 */
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useFilteredData } from '../../hooks/useFilteredData';
import { getRiskColor } from '../../utils/risk';
import { Info } from 'lucide-react';
import type { RiskLevel } from '../../types';

export const RiskDistributionChart = React.memo(function RiskDistributionChart() {
  const { filteredData } = useFilteredData();

  const chartData = useMemo(() => {
    const riskCounts = filteredData.reduce((acc, curr) => {
      acc[curr.riskLevel] = (acc[curr.riskLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(riskCounts).map(r => ({
      name: r,
      value: riskCounts[r]
    }));
  }, [filteredData]);

  if (chartData.length === 0) {
    return (
      <div className="p-12 border border-border bg-card rounded-2xl flex flex-col items-center justify-center text-center h-[350px]">
        <div className="p-4 bg-muted rounded-2xl text-muted-foreground mb-4 shrink-0 flex items-center justify-center">
          <Info size={28} />
        </div>
        <h4 className="text-sm font-bold text-foreground mb-1">Sin registros coincidentes</h4>
        <p className="text-xs text-muted-foreground max-w-sm">Intente modificar los filtros superiores para visualizar la distribución de alertas.</p>
      </div>
    );
  }

  interface TooltipPayloadItem {
    name: string;
    value: number | string;
    payload: {
      fill: string;
    };
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      return (
        <div className="bg-card border border-border p-3 rounded-xl shadow-xl">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{entry.name}</p>
          <p className="text-xs font-semibold" style={{ color: entry.payload.fill }}>
            Alumnos: <span className="text-sm font-extrabold">{entry.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="h-[350px] w-full mt-4 flex items-center justify-center"
      role="img" 
      aria-label="Gráfico circular tipo dona que representa la cantidad de alumnos por categoría de riesgo académico"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRiskColor(entry.name as RiskLevel)} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});
export default RiskDistributionChart;
