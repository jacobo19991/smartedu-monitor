export type RiskLevel = 'Alto' | 'Medio' | 'Bajo';

export type Subject = 
  | 'Aprestamiento' | 'Lenguaje Inicial' | 'Pensamiento Matemático' | 'Expresión Artística'
  | 'Lectoescritura Inicial' | 'Matemática Inicial' | 'Ciencias del Entorno'
  | 'Matemática' | 'Lenguaje' | 'Ciencias' | 'Estudios Sociales' | 'Inglés' | 'Informática'
  | 'Lenguaje y Literatura' | 'Ciencias Naturales' | 'Seminario';

export type Cycle = 'Parvularia' | 'Primer Ciclo' | 'Segundo Ciclo' | 'Tercer Ciclo' | 'Bachillerato';

export type GradeLevel = 
  | 'Parvularia 4' | 'Parvularia 5' | 'Parvularia 6'
  | '1° Grado' | '2° Grado' | '3° Grado'
  | '4° Grado' | '5° Grado' | '6° Grado'
  | '7° Grado' | '8° Grado' | '9° Grado'
  | '1° Año' | '2° Año';

export interface AcademicRecord {
  id: string;
  studentName: string;
  cycle: Cycle;
  grade: GradeLevel;
  section: string;
  subject: Subject;
  attendance: number; // 0 to 100
  gradeScore: number; // 0 to 10
  riskLevel: RiskLevel;
  suggestedAction: string;
}
