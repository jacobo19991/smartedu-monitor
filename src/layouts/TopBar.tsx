import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, User, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: 'Alerta crítica en Matemática de 1° Grado.', type: 'alert', time: 'Hace 5 min' },
    { id: 2, text: 'Asistencia promedio general subió a 94%.', type: 'info', time: 'Hace 1 hora' },
    { id: 3, text: 'Actas de Segundo Ciclo listas para revisión.', type: 'info', time: 'Hace 3 horas' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 border-b border-border bg-card/60 backdrop-blur-md px-6 md:px-10 flex items-center justify-between sticky top-0 z-25">
      
      {/* Search Bar */}
      <div className="hidden sm:flex items-center gap-3 bg-muted/50 border border-border/80 px-4 py-2 rounded-xl w-72 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/60 transition-all duration-200">
        <Search size={14} className="text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Buscar estudiante, materia..." 
          className="bg-transparent border-none text-xs focus:outline-none w-full text-foreground placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4 ml-auto">
        
        {/* Notifications Icon with Badge & Dropdown */}
        <div className="relative" ref={bellRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 border border-transparent hover:border-border relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden glass-premium"
              >
                <div className="px-4 py-3 border-b border-border/60 bg-muted/20 flex justify-between items-center">
                  <span className="text-xs font-black text-foreground">Notificaciones</span>
                  <span className="text-[10px] text-blue-500 font-bold hover:underline cursor-pointer">Marcar leído</span>
                </div>
                <div className="divide-y divide-border/40">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 hover:bg-muted/30 transition-colors flex gap-3">
                      {notif.type === 'alert' ? (
                        <AlertTriangle className="text-destructive shrink-0" size={16} />
                      ) : (
                        <Check className="text-emerald-500 shrink-0" size={16} />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs font-semibold text-foreground leading-normal">{notif.text}</p>
                        <span className="text-[9px] text-muted-foreground font-medium">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Settings */}
        <button className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 border border-transparent hover:border-border">
          <Settings size={18} />
        </button>

        <div className="h-6 w-px bg-border" />

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right hidden md:flex">
            <span className="text-xs font-extrabold text-foreground leading-none mb-1">Prof. Jacobo Morán</span>
            <span className="text-[10px] text-muted-foreground font-medium">Coordinador</span>
          </div>
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <User size={16} />
          </div>
        </div>

      </div>
    </header>
  );
}
