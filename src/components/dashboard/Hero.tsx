/**
 * Hero.tsx
 * Cambios realizados:
 * - Memoizado con React.memo() para evitar renderizados innecesarios cuando no cambian las props
 * - Asegurado el uso de la fecha real del sistema formateada localmente
 */
import React from 'react';
import { ShieldCheck, Calendar, School } from 'lucide-react';

export const Hero = React.memo(function Hero() {
  const today = React.useMemo(() => {
    return new Date().toLocaleDateString('es-SV', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-10 shadow-lg group">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400 mb-5 shadow-sm">
            <School size={16} />
            <span className="uppercase tracking-wider">Centro Escolar El Tinteral</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 mb-3">
            SmartEdu Monitor
          </h1>
          
          <h2 className="text-base md:text-lg font-bold text-muted-foreground mb-4">
            Sistema Inteligente de Monitoreo Académico
          </h2>
          
          <p className="text-sm text-muted-foreground/80 max-w-2xl leading-relaxed mb-8">
            Visualiza indicadores educativos, detecta alertas tempranas y analiza el rendimiento estudiantil en tiempo real con nuestra plataforma potenciada por IA.
          </p>

          <div className="flex flex-wrap gap-3 items-center text-sm">
            <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-1.5 font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
              <ShieldCheck size={16} />
              Monitoreo Activo
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-1.5 font-bold text-muted-foreground border border-border shadow-sm">
              <Calendar size={16} />
              {today}
            </span>
          </div>
        </div>
        
        <div className="flex gap-4 shrink-0">
          <div className="bg-card border border-border shadow-xl shadow-blue-500/5 px-6 py-5 rounded-2xl flex flex-col items-center justify-center min-w-[130px] transform hover:-translate-y-1 transition-transform duration-300">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600">A+</span>
            <span className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Rendimiento</span>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/20 px-6 py-5 rounded-2xl flex flex-col items-center justify-center min-w-[130px] transform hover:-translate-y-1 transition-transform duration-300">
            <span className="text-4xl font-black">94%</span>
            <span className="text-[11px] font-bold text-blue-100 mt-2 uppercase tracking-widest">Asistencia</span>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Hero;
