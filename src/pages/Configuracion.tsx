import { motion } from 'framer-motion';
import { Bell, Shield, Smartphone, Globe, Mail } from 'lucide-react';

export function Configuracion() {
  return (
    <main className="p-5 md:p-10 max-w-[1200px] mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-black tracking-tight text-foreground">Configuración del Sistema</h2>
        <p className="text-muted-foreground mt-1">Ajusta tus preferencias personales y de notificaciones.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.section 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="col-span-1 space-y-2"
        >
          <div className="bg-card border border-border/80 rounded-2xl p-2 shadow-sm">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500/10 text-blue-500 font-semibold rounded-xl transition-colors">
              <Globe size={18} /> Perfil y Cuenta
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-xl transition-colors">
              <Bell size={18} /> Notificaciones
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-xl transition-colors">
              <Shield size={18} /> Privacidad y Seguridad
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-xl transition-colors">
              <Smartphone size={18} /> Dispositivos
            </button>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="col-span-1 md:col-span-2 space-y-6"
        >
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Información de la Cuenta</h3>
            
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Nombre Institucional</label>
                  <input type="text" defaultValue="C.E. El Tinteral" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Año Académico</label>
                  <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Correo de Contacto <Mail size={12} className="inline ml-1 mb-0.5"/></label>
                <input type="email" defaultValue="admin@eltinteral.edu" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              
              <div className="pt-4 mt-4 border-t border-border/50">
                <h4 className="text-sm font-semibold mb-2">Información del Proyecto</h4>
                <p className="text-sm text-muted-foreground">SmartEdu Monitor v1.0.0 - Dashboard académico para portafolio profesional.</p>
              </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-border/50 pt-5">
              <button className="px-4 py-2 rounded-lg font-medium text-sm text-muted-foreground hover:bg-muted transition-colors">
                Cancelar
              </button>
              <button className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all">
                Guardar Cambios
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
