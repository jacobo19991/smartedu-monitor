import { create } from 'zustand';
import type { Cycle, GradeLevel, Subject, RiskLevel } from '../types';

interface FiltersState {
  searchTerm: string;
  cycle: Cycle | 'All';
  grade: GradeLevel | 'All';
  subject: Subject | 'All';
  risk: RiskLevel | 'All';

  setSearchTerm: (searchTerm: string) => void;
  setCycle: (cycle: Cycle | 'All') => void;
  setGrade: (grade: GradeLevel | 'All') => void;
  setSubject: (subject: Subject | 'All') => void;
  setRisk: (risk: RiskLevel | 'All') => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  searchTerm: '',
  cycle: 'All',
  grade: 'All',
  subject: 'All',
  risk: 'All',

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setCycle: (cycle) => set({ cycle, grade: 'All', subject: 'All' }),
  setGrade: (grade) => set({ grade, subject: 'All' }),
  setSubject: (subject) => set({ subject }),
  setRisk: (risk) => set({ risk }),

  resetFilters: () =>
    set({
      searchTerm: '',
      cycle: 'All',
      grade: 'All',
      subject: 'All',
      risk: 'All',
    }),
}));
