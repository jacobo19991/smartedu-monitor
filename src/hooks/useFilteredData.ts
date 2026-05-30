import { useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';
import { useFiltersStore } from '../store/useFiltersStore';
import type { AcademicRecord } from '../types';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function useFilteredData() {
  const { searchTerm, cycle, grade, subject, risk } = useFiltersStore();

  const filteredData = useMemo<AcademicRecord[]>(() => {
    const term = normalize(searchTerm.trim());

    return MOCK_DATA.filter(r => {
      // 1. Drop-down filters
      if (cycle !== 'All' && r.cycle !== cycle) return false;
      if (grade !== 'All' && r.grade !== grade) return false;
      if (subject !== 'All' && r.subject !== subject) return false;
      if (risk !== 'All' && r.riskLevel !== risk) return false;
      
      // 2. Search term filter
      if (term) {
        const matchesSearch = [r.studentName, r.id, r.grade, r.subject]
          .some(field => normalize(String(field)).includes(term));
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [searchTerm, cycle, grade, subject, risk]);

  const activeFiltersCount = useMemo<number>(() => {
    let count = 0;
    if (searchTerm.trim() !== '') count++;
    if (cycle !== 'All') count++;
    if (grade !== 'All') count++;
    if (subject !== 'All') count++;
    if (risk !== 'All') count++;
    return count;
  }, [searchTerm, cycle, grade, subject, risk]);

  const hasActiveFilters = activeFiltersCount > 0;

  return {
    filteredData,
    hasActiveFilters,
    activeFiltersCount,
    searchTerm,
    cycle,
    grade,
    subject,
    risk
  };
}
export default useFilteredData;
