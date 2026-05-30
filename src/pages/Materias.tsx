import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, MoreVertical } from 'lucide-react';

const subjects = [
  { id: 1, name: 'Matemáticas Avanzadas', teacher: 'Prof. Roberto Gómez', students: 34, schedule: 'Lun, Mié, Vie - 08:00 AM', avgGrade: 8.5 },
  { id: 2, name: 'Física Cuántica', teacher: 'Dra. Elena Silva', students: 28, schedule: 'Mar, Jue - 10:00 AM', avgGrade: 7.8 },
  { id: 3, name: 'Historia Universal', teacher: 'Lic. Mario Vargas', students: 42, schedule: 'Lun, Mié - 11:30 AM', avgGrade: 9.1 },
  { id: 4, name: 'Literatura Contemporánea', teacher: 'Mtra. Lucía Pérez', students: 31, schedule: 'Mar, Jue - 08:00 AM', avgGrade: 8.9 },
  { id: 5, name: 'Química Orgánica', teacher: 'Dr. Fernando Ríos', students: 25, schedule: 'Vie - 10:00 AM', avgGrade: 7.2 },
];

export function Materias() {
  return (
    <main className="p-5 md:p-10 max-w-[1600px] mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">Gestión de Materias</h2>
          <p className="text-muted-foreground mt-1">Administra el currículo académico y las asignaturas impartidas.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
          + Nueva Materia
        </button>
      </motion.div>

      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-card border border-border/80 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-muted-foreground uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Asignatura</th>
                <th className="px-6 py-4">Profesor</th>
                <th className="px-6 py-4">Estudiantes</th>
                <th className="px-6 py-4">Horario</th>
                <th className="px-6 py-4 text-center">Promedio</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <BookOpen size={16} />
                    </div>
                    {sub.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{sub.teacher}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-muted-foreground/60" />
                      {sub.students}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-muted-foreground/60" />
                      {sub.schedule}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                      sub.avgGrade >= 8.5 ? 'bg-emerald-500/10 text-emerald-600' :
                      sub.avgGrade >= 7.5 ? 'bg-amber-500/10 text-amber-600' :
                      'bg-red-500/10 text-red-600'
                    }`}>
                      {sub.avgGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </main>
  );
}
