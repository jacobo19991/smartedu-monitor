import { useEffect, useState } from 'react';
import { Wifi, Users, Server, Database } from 'lucide-react';

export function StatusBar() {
  const [latency, setLatency] = useState(12);
  const [activeUsers, setActiveUsers] = useState(3);
  const [syncTime] = useState('Hace unos segundos');

  useEffect(() => {
    // Simulate real-time metrics variance
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8 + 8)); // 8ms to 16ms
      setActiveUsers(Math.floor(Math.random() * 2 + 3)); // 3 to 4 teachers active
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="h-10 border-t border-border bg-card px-6 flex items-center justify-between text-[10px] text-muted-foreground/80 font-semibold tracking-wider uppercase z-20 w-full shrink-0">
      
      {/* Active connections */}
      <div className="flex items-center gap-4.5">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          <Server size={12} className="text-muted-foreground/60" />
          <span>Servidores: Óptimo</span>
        </span>
        
        <span className="hidden sm:flex items-center gap-1.5">
          <Database size={12} className="text-muted-foreground/60" />
          <span>Base de datos: Sincronizada</span>
        </span>
      </div>

      {/* Latency and telemetry */}
      <div className="flex items-center gap-5.5">
        <span className="hidden md:flex items-center gap-1.5">
          <Users size={12} className="text-muted-foreground/60" />
          <span>{activeUsers} Docentes Activos</span>
        </span>

        <span className="flex items-center gap-1.5">
          <Wifi size={12} className="text-muted-foreground/60" />
          <span>Latencia: {latency}ms</span>
        </span>

        <span className="hidden lg:flex items-center gap-1.5">
          <span>Actualizado: {syncTime}</span>
        </span>
      </div>

    </footer>
  );
}
