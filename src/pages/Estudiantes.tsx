import { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Search, Filter } from 'lucide-react';
import { RiskBadge } from '../components/ui/RiskBadge';

export function Estudiantes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('Todos');
  const [riskFilter, setRiskFilter] = useState('Todos');

  const filteredStudents = useMemo(() => {
    return MOCK_DATA.filter(student => {
      const matchSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGrade = gradeFilter === 'Todos' || student.grade === gradeFilter;
      const matchRisk = riskFilter === 'Todos' || student.riskLevel === riskFilter;
      return matchSearch && matchGrade && matchRisk;
    });
  }, [searchTerm, gradeFilter, riskFilter]);

  const uniqueGrades = Array.from(new Set(MOCK_DATA.map(s => s.grade))).sort();

  return (
    <main className="p-5 md:p-10 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <SectionHeader 
        title="Directorio de Estudiantes" 
        subtitle="Visualiza y filtra la información académica de todos los estudiantes de la institución."
      />

      <Card className="p-6 border border-border/50 bg-card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 bg-background">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select 
                value={gradeFilter} 
                onChange={(e) => setGradeFilter(e.target.value)}
                className="bg-transparent py-2 outline-none text-sm"
              >
                <option value="Todos">Todos los grados</option>
                {uniqueGrades.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 border border-border rounded-lg px-3 bg-background">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select 
                value={riskFilter} 
                onChange={(e) => setRiskFilter(e.target.value)}
                className="bg-transparent py-2 outline-none text-sm"
              >
                <option value="Todos">Todos los riesgos</option>
                <option value="Alto">Alto Riesgo</option>
                <option value="Medio">Medio Riesgo</option>
                <option value="Bajo">Bajo Riesgo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Grado y Sección</th>
                <th className="px-6 py-4">Asistencia</th>
                <th className="px-6 py-4">Promedio</th>
                <th className="px-6 py-4">Riesgo</th>
                <th className="px-6 py-4">Acción Sugerida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No se encontraron estudiantes con los filtros actuales.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{student.studentName}</div>
                      <div className="text-xs text-muted-foreground">{student.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{student.grade}</div>
                      <div className="text-xs text-muted-foreground">Sección {student.section}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${student.attendance < 75 ? 'text-destructive' : student.attendance < 85 ? 'text-yellow-500' : 'text-emerald-500'}`}>
                          {student.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${student.gradeScore < 5 ? 'text-destructive' : student.gradeScore < 7 ? 'text-yellow-500' : 'text-emerald-500'}`}>
                        {student.gradeScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <RiskBadge risk={student.riskLevel} />
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {student.suggestedAction}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground text-right">
          Mostrando {filteredStudents.length} estudiantes
        </div>
      </Card>
    </main>
  );
}
