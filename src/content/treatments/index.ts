// neudental v1 - every treatment guide in this folder, found automatically:
// adding a guide is adding a file here (copy root-canal-treatment.ts). See
// TreatmentGuide in src/types.ts for the fields.
import type { TreatmentGuide } from '../../types';

const modules = import.meta.glob<{ default: TreatmentGuide }>('./*.ts', { eager: true });

export const TREATMENT_GUIDES: TreatmentGuide[] = Object.entries(modules)
  .filter(([file]) => file !== './index.ts')
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default);
