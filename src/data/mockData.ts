import type { AcademicRecord } from '../types';
import stableData from './stableMockData.json';

// We assert the imported JSON to AcademicRecord[]
export const MOCK_DATA = Object.freeze(stableData as AcademicRecord[]);
