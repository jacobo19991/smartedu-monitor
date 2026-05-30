import { create } from 'zustand';

export type NavigationItem =
  | 'Dashboard'
  | 'Alertas'
  | 'Materias'
  | 'Estudiantes'
  | 'Reportes'
  | 'Configuración';

interface NavigationState {
  activeItem: NavigationItem;
  setActiveItem: (item: NavigationItem) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeItem: 'Dashboard',
  setActiveItem: (item) => set({ activeItem: item }),
}));
