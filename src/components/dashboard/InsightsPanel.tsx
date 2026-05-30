import { useMemo } from 'react';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';
import { useFiltersStore } from '../../store/useFiltersStore';
import { motion } from 'framer-motion';

export function InsightsPanel() {
  const { cycle, grade, subject, risk } = useFiltersStore();

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(r => {
      if (cycle !== 'All' && r.cycle !== cycle) return false;
      if (grade !== 'All' && r.grade !== grade) return false;
      if (subject !== 'All' && r.subject !== subject) return false;
      if (risk !== 'All' && r.riskLevel !== risk) return false;
      return true;
    });
  }, [cycle, grade, subject, risk]);

  // Compute insights dynamically
  const insights = useMemo(() => {
    if (filteredData.length === 0) return [];

    const total = filteredData.length;
    const highRisk = filteredData.filter(r => r.riskLevel === 'Alto');

    // 1. Critical subject detection
    const subjectRiskCounts = highRisk.reduce((acc, curr) => {
      acc[curr.subject] = (acc[curr.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let criticalSubject = '';
    let maxRiskCount = 0;
    Object.entries(subjectRiskCounts).forEach(([subj, count]) => {
      if (count > maxRiskCount) {
        maxRiskCount = count;
        criticalSubject = subj;
      }
    });

    // 2. Attendance warning
    const lowAttendanceCount = filteredData.filter(r => r.attendance < 75).length;

    // 3. Outstanding average
    const avgGrade = filteredData.reduce((acc, r) => acc + r.gradeScore, 0) / total;

    const list = [];

    // Critical subject insight
    if (criticalSubject && maxRiskCount > 0) {
      list.push({
        id: 'crit-sub',
        type: 'warning',
        icon: AlertCircle,
        text: `La materia de ${criticalSubject} presenta el mayor índice de riesgo crítico, acumulando ${maxRiskCount} estudiantes bajo alerta en la selección actual.`,
        color: 'text-red-500 bg-red-500/10 border-red-500/20'
      });
    }

    // Attendance insight
    if (lowAttendanceCount > 0) {
      list.push({
        id: 'low-att',
        type: 'info',
        icon: TrendingUp,
        text: `Hay ${lowAttendanceCount} estudiantes con asistencia menor al 75%, correlacionando directamente con el descenso en el rendimiento académico.`,
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
      });
    } else {
      list.push({
        id: 'good-att',
        type: 'success',
        icon: CheckCircle2,
        text: '¡Asistencia estable! No se registran caídas críticas de inasistencias en el grupo filtrado durante esta semana.',
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
      });
    }

    // Average yield insight
    if (avgGrade >= 7.5) {
      list.push({
        id: 'high-perf',
        type: 'success',
        icon: CheckCircle2,
        text: `Rendimiento Académico Sobresaliente: El promedio del grupo se mantiene en ${avgGrade.toFixed(1)}/10.0, superando la media institucional de 7.0.`,
        color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      });
    } else if (avgGrade < 6.0) {
      list.push({
        id: 'low-perf',
        type: 'warning',
        icon: AlertCircle,
        text: `El promedio general actual es de ${avgGrade.toFixed(1)}/10.0, situándose por debajo del límite mínimo de suficiencia institucional.`,
        color: 'text-red-500 bg-red-500/10 border-red-500/20'
      });
    } else {
      list.push({
        id: 'normal-perf',
        type: 'info',
        icon: Lightbulb,
        text: `El rendimiento del grupo es regular con un promedio de ${avgGrade.toFixed(1)}/10.0. Se sugiere monitorear a los alumnos en riesgo medio para elevar el promedio global.`,
        color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
      });
    }

    return list;
  }, [filteredData]);

  if (insights.length === 0) return null;

  return (
    <div className="bg-card border border-border/80 p-6 rounded-2xl shadow-md mb-8">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
          <Lightbulb size={18} />
        </div>
        <div>
          <h3 className="text-sm font-black text-foreground tracking-tight uppercase tracking-wider">Insights Inteligentes</h3>
          <p className="text-[10px] text-muted-foreground font-semibold">Análisis analítico predictivo generado automáticamente en base a tus filtros.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={insight.id}
            className={`p-4 rounded-xl border flex gap-3 items-start ${insight.color}`}
          >
            <insight.icon size={16} className="shrink-0 mt-0.5" />
            <p className="text-xs font-semibold leading-relaxed text-foreground/90">{insight.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
