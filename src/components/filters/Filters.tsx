import React, { useCallback, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { useFiltersStore } from '../../store/useFiltersStore';
import { useFilteredData } from '../../hooks/useFilteredData';
import type { Cycle, GradeLevel, Subject, RiskLevel } from '../../types';
import { MOCK_DATA } from '../../data/mockData';

export const Filters = React.memo(function Filters() {
  const { searchTerm, setSearchTerm, setCycle, setGrade, setSubject, setRisk, resetFilters } = useFiltersStore();
  const { cycle, grade, subject, risk, hasActiveFilters, activeFiltersCount } = useFilteredData();

  // Extract unique cycles from MOCK_DATA
  const CYCLES = useMemo(() => Array.from(new Set(MOCK_DATA.map(d => d.cycle))), []);

  const availableGrades = useMemo(() => {
    if (cycle === 'All') return [];
    return Array.from(new Set(MOCK_DATA.filter(d => d.cycle === cycle).map(d => d.grade)));
  }, [cycle]);

  const availableSubjects = useMemo(() => {
    if (grade === 'All') return [];
    return Array.from(new Set(MOCK_DATA.filter(d => d.grade === grade).map(d => d.subject)));
  }, [grade]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const handleCycleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCycle(e.target.value as Cycle | 'All');
  }, [setCycle]);

  const handleGradeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrade(e.target.value as GradeLevel | 'All');
  }, [setGrade]);

  const handleSubjectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value as Subject | 'All');
  }, [setSubject]);

  const handleRiskChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRisk(e.target.value as RiskLevel | 'All');
  }, [setRisk]);

  return (
    <div className="p-5 border border-border bg-card rounded-2xl flex flex-col lg:flex-row items-stretch lg:items-center gap-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full lg:w-auto shrink-0 border-b lg:border-b-0 border-border pb-4 lg:pb-0 lg:pr-6 lg:border-r">
        <div className="flex items-center gap-3 text-foreground font-extrabold text-sm uppercase tracking-wider">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 relative shadow-sm">
            <Filter size={16} />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 shadow-md shadow-blue-500/40 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <div>
            <span className="block text-foreground">Filtros</span>
            <span className="block text-[10px] text-muted-foreground font-semibold">Análisis Avanzado</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar alumno..." 
            aria-label="Buscar alumno"
            className="w-full bg-background border border-border pl-9 pr-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all shadow-sm"
          />
        </div>

        <div>
          <select 
            value={cycle} 
            onChange={handleCycleChange}
            className="w-full bg-background border border-border px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-foreground transition-all shadow-sm"
            aria-label="Seleccionar Ciclo"
          >
            <option value="All">Todos los Ciclos</option>
            {CYCLES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <select 
            value={grade} 
            onChange={handleGradeChange}
            className="w-full bg-background border border-border px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-foreground transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cycle === 'All'}
            aria-disabled={cycle === 'All'}
            aria-label="Seleccionar Grado"
          >
            <option value="All">Todos los Grados</option>
            {availableGrades.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <select 
            value={subject} 
            onChange={handleSubjectChange}
            className="w-full bg-background border border-border px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-foreground transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={grade === 'All'}
            aria-disabled={grade === 'All'}
            aria-label="Seleccionar Materia"
          >
            <option value="All">Todas las Materias</option>
            {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <select 
            value={risk} 
            onChange={handleRiskChange}
            className="w-full bg-background border border-border px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-foreground transition-all shadow-sm"
            aria-label="Seleccionar Nivel de Riesgo"
          >
            <option value="All">Riesgo: Todos</option>
            <option value="Alto">Riesgo Alto</option>
            <option value="Medio">Riesgo Medio</option>
            <option value="Bajo">Sin Riesgo</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <button 
          onClick={resetFilters}
          className="shrink-0 text-sm font-bold px-5 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          Limpiar
        </button>
      )}
    </div>
  );
});
export default Filters;
