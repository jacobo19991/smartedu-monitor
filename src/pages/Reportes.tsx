import { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { Download, FileText, CheckCircle2, TrendingDown, TrendingUp, Users } from 'lucide-react';

export function Reportes() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const stats = useMemo(() => {
    const total = MOCK_DATA.length;
    const avgScore = MOCK_DATA.reduce((acc, curr) => acc + curr.gradeScore, 0) / total;
    const avgAttendance = MOCK_DATA.reduce((acc, curr) => acc + curr.attendance, 0) / total;
    const atRisk = MOCK_DATA.filter(s => s.riskLevel === 'Alto' || s.riskLevel === 'Medio').length;
    
    return {
      total,
      avgScore: avgScore.toFixed(1),
      avgAttendance: avgAttendance.toFixed(1),
      atRisk,
      riskPercentage: ((atRisk / total) * 100).toFixed(1)
    };
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);

    // Simulate export delay
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "ID,Nombre,Grado,Seccion,Materia,Asistencia,Promedio,NivelRiesgo\n"
        + MOCK_DATA.map(e => `${e.id},${e.studentName},${e.grade},${e.section},${e.subject},${e.attendance},${e.gradeScore},${e.riskLevel}`).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "reporte_academico_demo.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setExportSuccess(true);
      
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1500);
  };

  return (
    <main className="p-5 md:p-10 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <SectionHeader 
        title="Generador de Reportes" 
        subtitle="Analiza las métricas globales y exporta reportes consolidados del rendimiento estudiantil."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border border-border/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{stats.total}</h3>
          <p className="text-sm text-muted-foreground">Estudiantes Totales</p>
        </Card>

        <Card className="p-6 bg-card border border-border/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{stats.avgScore}/10</h3>
          <p className="text-sm text-muted-foreground">Promedio General</p>
        </Card>

        <Card className="p-6 bg-card border border-border/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{stats.avgAttendance}%</h3>
          <p className="text-sm text-muted-foreground">Asistencia Promedio</p>
        </Card>

        <Card className="p-6 bg-card border border-border/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <TrendingDown className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{stats.riskPercentage}%</h3>
          <p className="text-sm text-muted-foreground">{stats.atRisk} alumnos en riesgo</p>
        </Card>
      </div>

      <Card className="p-8 border border-border/50 bg-card text-center max-w-2xl mx-auto mt-12">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Exportar Base de Datos</h2>
        <p className="text-muted-foreground mb-8">
          Descarga un reporte en formato CSV con el detalle de calificaciones, asistencia y nivel de riesgo de todos los estudiantes para análisis en Excel o sistemas externos.
        </p>
        
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className={`px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 mx-auto transition-all w-full md:w-auto
            ${exportSuccess ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-primary text-primary-foreground hover:bg-primary/90'}
            ${isExporting ? 'opacity-80 cursor-not-allowed' : ''}
          `}
        >
          {isExporting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Generando reporte...
            </span>
          ) : exportSuccess ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Reporte Descargado
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5" /> Exportar Reporte Demo (CSV)
            </span>
          )}
        </button>
      </Card>
    </main>
  );
}
