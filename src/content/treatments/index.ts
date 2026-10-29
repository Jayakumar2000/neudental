// neudental v1 - every treatment guide in this folder, found automatically:
// adding a guide is adding a file here, named after the treatment's slug
// (copy root-canal-treatment.ts). See TreatmentGuide in src/types.ts.
//
// The build (SSR) loads every guide up front. In the browser each guide is
// its own small file, fetched only for its treatment's page, so the guides
// never weigh down the homepage or any other page however many are added.
import type { TreatmentGuide } from '../../types';

type GuideModule = { default: TreatmentGuide };

const eager = import.meta.env.SSR ? import.meta.glob<GuideModule>(['./*.ts', '!./index.ts'], { eager: true }) : {};
const lazy = import.meta.env.SSR ? {} : import.meta.glob<GuideModule>(['./*.ts', '!./index.ts']);

// Plain code-point order: identical on the build server and in every browser
// (localeCompare depends on the visitor's language).
const byCodePoint = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

// Every guide with its file name, without folder or extension (build only).
export const TREATMENT_GUIDE_FILES: { file: string; guide: TreatmentGuide }[] = Object.entries(eager)
  .sort(([a], [b]) => byCodePoint(a, b))
  .map(([file, mod]) => ({ file: file.slice(2, -3), guide: mod.default }));

export const TREATMENT_GUIDES: TreatmentGuide[] = TREATMENT_GUIDE_FILES.map((g) => g.guide);

const loaded = new Map<string, TreatmentGuide>(TREATMENT_GUIDES.map((g) => [g.treatmentId, g]));

// The guide for a treatment, if it is loaded (always, at build time).
export function loadedGuide(treatmentId: string): TreatmentGuide | undefined {
  return loaded.get(treatmentId);
}

// Fetches the guide in src/content/treatments/{slug}.ts, if there is one.
export function loadGuide(treatmentId: string, slug: string): Promise<TreatmentGuide | undefined> {
  const known = loaded.get(treatmentId);
  if (known) return Promise.resolve(known);
  const load = lazy[`./${slug}.ts`];
  if (!load) return Promise.resolve(undefined);
  return load().then((mod) => {
    loaded.set(treatmentId, mod.default);
    return mod.default;
  });
}
