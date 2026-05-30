import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ShieldAlert, 
  GraduationCap, 
  Users, 
  ArrowRight,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';

interface LandingProps {
  onEnterDemo: () => void;
}

export function Landing({ onEnterDemo }: LandingProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">SmartEdu Monitor</span>
          </div>
          <button 
            onClick={onEnterDemo}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center gap-2"
          >
            Ver demo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-6 py-20 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-8 inline-block border border-primary/20">
              Dashboard Académico Profesional
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent leading-[1.1]">
              Detecta estudiantes en riesgo <br className="hidden md:block" />
              <span className="text-primary">antes de que sea tarde.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Sistema inteligente de monitoreo de rendimiento, asistencia y alertas tempranas. Convierte los datos de tu institución en decisiones accionables.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={onEnterDemo}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 flex items-center gap-2"
              >
                Ingresar a la Demo Interactiva <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Abstract Preview Image/Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl -z-10" />
            <div className="glass-panel p-4 md:p-8 rounded-3xl border border-border/50 shadow-2xl bg-card/50 backdrop-blur-xl flex flex-col md:flex-row gap-6 text-left">
               <div className="flex-1 bg-background p-6 rounded-2xl border border-border/50 shadow-sm">
                 <div className="flex items-center gap-3 mb-4">
                   <ShieldAlert className="w-6 h-6 text-destructive" />
                   <h3 className="font-semibold text-lg">Alertas Críticas (3)</h3>
                 </div>
                 <div className="space-y-3">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="h-12 bg-muted/50 rounded-lg border border-border/50 flex items-center px-4 animate-pulse">
                       <div className="w-8 h-8 rounded-full bg-destructive/20 mr-3" />
                       <div className="h-4 bg-muted-foreground/20 rounded w-1/3" />
                     </div>
                   ))}
                 </div>
               </div>
               <div className="flex-1 flex flex-col gap-6">
                 <div className="bg-background p-6 rounded-2xl border border-border/50 shadow-sm flex-1">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="font-semibold text-lg text-muted-foreground">Asistencia Global</h3>
                     <span className="text-2xl font-bold text-emerald-500">92%</span>
                   </div>
                   <div className="h-2 bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[92%]" />
                   </div>
                 </div>
                 <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 shadow-sm flex-1">
                    <h3 className="font-medium text-primary mb-2">Acción Recomendada</h3>
                    <p className="text-sm text-muted-foreground">Revisar estudiantes con inasistencia consecutiva en 2° Año.</p>
                 </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Problema que resuelve */}
        <section className="py-20 bg-muted/30 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">El Problema que Resolvemos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">La deserción escolar y el bajo rendimiento rara vez ocurren de un día para otro. Siempre hay señales previas que quedan ocultas en hojas de cálculo desorganizadas.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm">
                <Users className="w-10 h-10 text-primary mb-5" />
                <h3 className="text-xl font-bold mb-3">Visión 360°</h3>
                <p className="text-muted-foreground">Reunimos calificaciones, asistencia y comportamiento en un solo lugar para darte contexto total sobre cada estudiante.</p>
              </div>
              <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldAlert className="w-32 h-32" />
                </div>
                <BarChart3 className="w-10 h-10 text-primary mb-5 relative z-10" />
                <h3 className="text-xl font-bold mb-3 relative z-10">Detección Temprana</h3>
                <p className="text-muted-foreground relative z-10">Algoritmos que clasifican automáticamente el nivel de riesgo de cada alumno para priorizar la intervención.</p>
              </div>
              <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm">
                <LayoutDashboard className="w-10 h-10 text-primary mb-5" />
                <h3 className="text-xl font-bold mb-3">Decisiones Informadas</h3>
                <p className="text-muted-foreground">Dashboards visuales y claros que permiten a coordinadores y directores tomar acción rápida y efectiva.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologías */}
        <section className="py-20 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">Construido con Tecnologías Modernas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Recharts', 'Lucide Icons'].map((tech) => (
              <span key={tech} className="px-5 py-2.5 bg-muted rounded-xl border border-border/50 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> {tech}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/50 text-center text-muted-foreground">
        <p>SmartEdu Monitor • Proyecto de Portafolio Profesional</p>
      </footer>
    </div>
  );
}
