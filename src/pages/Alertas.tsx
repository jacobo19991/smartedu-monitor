import { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { ShieldAlert, ShieldCheck, Shield, CheckCircle2 } from 'lucide-react';
import { RiskBadge } from '../components/ui/RiskBadge';

export function Alertas() {
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  const handleMarkReviewed = (id: string) => {
    setReviewedIds(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const alertStudents = useMemo(() => {
    return MOCK_DATA.filter(student => student.riskLevel === 'Alto' || student.riskLevel === 'Medio')
      .sort((a, b) => {
        // Sort by risk level (Alto first) then by attendance (lowest first)
        if (a.riskLevel === 'Alto' && b.riskLevel !== 'Alto') return -1;
        if (a.riskLevel !== 'Alto' && b.riskLevel === 'Alto') return 1;
        return a.attendance - b.attendance;
      });
  }, []);

  const highAlertsCount = alertStudents.filter(s => s.riskLevel === 'Alto').length;
  const mediumAlertsCount = alertStudents.filter(s => s.riskLevel === 'Medio').length;

  return (
    <main className="p-5 md:p-10 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <SectionHeader 
        title="Centro de Alertas" 
        subtitle="Monitoreo de estudiantes en riesgo académico o inasistencia severa."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-destructive bg-card flex items-center gap-4">
          <div className="bg-destructive/10 p-4 rounded-full">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h3 className="text-3xl font-bold">{highAlertsCount}</h3>
            <p className="text-muted-foreground font-medium">Riesgo Alto</p>
          </div>
        </Card>
        
        <Card className="p-6 border-l-4 border-l-yellow-500 bg-card flex items-center gap-4">
          <div className="bg-yellow-500/10 p-4 rounded-full">
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold">{mediumAlertsCount}</h3>
            <p className="text-muted-foreground font-medium">Riesgo Medio</p>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-emerald-500 bg-card flex items-center gap-4">
          <div className="bg-emerald-500/10 p-4 rounded-full">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold">{reviewedIds.size}</h3>
            <p className="text-muted-foreground font-medium">Alertas Revisadas</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 border border-border/50 bg-card">
        <h3 className="text-lg font-bold mb-6">Detalle de Alertas Activas</h3>
        <div className="space-y-4">
          {alertStudents.map(student => {
            const isReviewed = reviewedIds.has(student.id);
            if (isReviewed) return null;

            return (
              <div key={student.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border bg-background shadow-sm gap-4 transition-all hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full mt-1 ${student.riskLevel === 'Alto' ? 'bg-destructive/10' : 'bg-yellow-500/10'}`}>
                    <ShieldAlert className={`w-5 h-5 ${student.riskLevel === 'Alto' ? 'text-destructive' : 'text-yellow-500'}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{student.studentName}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {student.grade} - Sección {student.section} • {student.subject}
                    </p>
                    <div className="flex gap-3 text-sm">
                      <span className="font-medium">Asistencia: <span className={student.attendance < 75 ? 'text-destructive' : 'text-foreground'}>{student.attendance}%</span></span>
                      <span className="text-muted-foreground">|</span>
                      <span className="font-medium">Promedio: <span className={student.gradeScore < 6 ? 'text-destructive' : 'text-foreground'}>{student.gradeScore.toFixed(1)}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                  <RiskBadge risk={student.riskLevel} />
                  <div className="text-sm font-medium text-primary">
                    Acción: {student.suggestedAction}
                  </div>
                  <button 
                    onClick={() => handleMarkReviewed(student.id)}
                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm rounded-lg transition-colors border border-border"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Marcar como revisada
                  </button>
                </div>
              </div>
            );
          })}
          
          {alertStudents.length > 0 && alertStudents.every(s => reviewedIds.has(s.id)) && (
            <div className="text-center py-10 text-muted-foreground">
              <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-50" />
              <p>¡Excelente! Todas las alertas han sido revisadas.</p>
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}
