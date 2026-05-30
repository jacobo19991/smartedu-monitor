/**
 * Sidebar.tsx
 * Ubicación: src/layouts/Sidebar.tsx
 * Cambios realizados:
 * - Movido de src/components/Sidebar.tsx a src/layouts/Sidebar.tsx para coincidir con la ubicación esperada.
 * - Corregido el solapamiento de z-index: Cambiado de z-20 a z-30 para evitar que la TopBar (z-25) tape el borde y la sombra del panel lateral.
 * - Corregida la tarjeta de navegación de 'Alertas': Configurado con alert: true para renderizar el badge de notificaciones ("3") solicitado en los comentarios.
 */
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import clsx from 'clsx';
import { useNavigationStore } from '../store/useNavigationStore';

export const Sidebar = React.memo(function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });
  
  const { activeItem, setActiveItem } = useNavigationStore();

  const { theme, setTheme } = useTheme();

  const handleToggleCollapse = useCallback(() => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Alertas', icon: AlertTriangle, alert: true },
    { name: 'Materias', icon: BookOpen },
    { name: 'Estudiantes', icon: Users },
    { name: 'Reportes', icon: FileText },
    { name: 'Configuración', icon: Settings },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 76 : 260 }}
      className="relative flex flex-col h-screen border-r border-border bg-card shadow-sm transition-all duration-300 z-30 shrink-0"
    >
      <div className={clsx("flex items-center h-16 border-b border-border px-4", collapsed ? "justify-center" : "justify-between")}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="p-2 rounded-lg bg-blue-500 text-white shrink-0 flex items-center justify-center">
            <GraduationCap size={18} />
          </div>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col"
            >
              <span className="font-bold text-xs text-foreground tracking-tight leading-none mb-0.5">C.E. El Tinteral</span>
              <span className="text-[9px] text-muted-foreground uppercase font-medium tracking-wider">Gestión</span>
            </motion.div>
          )}
        </div>
        {!collapsed && (
          <button 
            onClick={handleToggleCollapse}
            aria-label="Colapsar panel lateral"
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <button 
          onClick={handleToggleCollapse}
          aria-label="Expandir panel lateral"
          className="absolute -right-3 top-20 p-1 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground shadow-sm transition-transform hover:scale-105"
        >
          <ChevronRight size={10} />
        </button>
      )}

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={clsx(
                "w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-xs cursor-pointer",
                isActive 
                  ? "bg-blue-500/10 text-blue-500 font-semibold border border-blue-500/20" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon size={16} className={clsx("shrink-0", isActive ? "text-blue-500" : "group-hover:text-foreground")} />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
              
              {item.alert && !collapsed && (
                <span className="ml-auto bg-destructive text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border bg-muted/10 flex flex-col gap-2">
        <button 
          onClick={handleThemeToggle}
          aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-transparent"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {!collapsed && <span className="ml-3 text-xs font-semibold">Tema {theme === 'dark' ? 'Claro' : 'Oscuro'}</span>}
        </button>
        {!collapsed && (
          <div className="text-center">
            <span className="text-[9px] font-bold text-muted-foreground/60 tracking-wider">v1.0.0</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
});
export default Sidebar;
