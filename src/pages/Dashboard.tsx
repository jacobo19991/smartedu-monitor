import { motion } from 'framer-motion';
import { AlertsTable } from '../components/tables/AlertsTable';
import { Filters } from '../components/filters/Filters';
import { Hero } from '../components/dashboard/Hero';
import { KPICards } from '../components/dashboard/KPICards';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { RiskDistributionChart } from '../components/dashboard/RiskDistributionChart';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useNavigationStore } from '../store/useNavigationStore';
import { Materias } from './Materias';
import { Estudiantes } from './Estudiantes';
import { Alertas } from './Alertas';
import { Reportes } from './Reportes';
import { Configuracion } from './Configuracion';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';

export function Dashboard() {
  const { activeItem } = useNavigationStore();

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return (
          <main className="p-5 md:p-10 max-w-[1600px] mx-auto space-y-8">
            <motion.section
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero />
            </motion.section>

            <Filters />
            <KPICards />

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <Card
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="xl:col-span-2"
              >
                <SectionHeader 
                  title="Rendimiento Promedio por Grado" 
                  subtitle="Visualiza la nota final promedio comparada entre todos los niveles académicos." 
                />
                <PerformanceChart />
              </Card>

              <Card
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <SectionHeader 
                  title="Distribución por Riesgo" 
                  subtitle="Porcentaje de alumnos según su severidad de alerta." 
                />
                <RiskDistributionChart />
              </Card>
            </section>

            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <AlertsTable />
            </motion.section>
          </main>
        );
      
      case 'Materias':
        return <Materias />;

      case 'Estudiantes':
        return <Estudiantes />;

      case 'Alertas':
        return <Alertas />;

      case 'Reportes':
        return <Reportes />;

      case 'Configuración':
        return <Configuracion />;

      default:
        return (
          <main className="p-5 md:p-10 max-w-[1600px] mx-auto flex items-center justify-center min-h-[80vh]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <h2 className="text-4xl font-black tracking-tight text-foreground">Módulo: {activeItem}</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Esta sección está actualmente en construcción. Vuelve pronto para descubrir nuevas funcionalidades.
              </p>
            </motion.div>
          </main>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
}
export default Dashboard;
