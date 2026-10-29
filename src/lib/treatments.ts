// neudental v1 - treatment pages: lookups and the {{price}}-style
// placeholders guides use so their text always matches TREATMENTS.
import { TREATMENTS } from '../data';
import { hasGuideFile, loadGuide, loadedGuide } from '../content/treatments';
import type { Treatment, TreatmentGuide } from '../types';

// Every category needs a label: the type check fails if one is added to
// Treatment['category'] without one here.
const CATEGORY_LABELS: Record<Treatment['category'], string> = {
  preventive: 'Preventive care',
  restorative: 'Restorative dentistry',
  'cosmetic-ortho': 'Cosmetic & orthodontics',
  specialized: 'Specialised & surgical care',
  pediatric: 'Kids dentistry',
};

export const TREATMENT_CATEGORIES: { key: Treatment['category']; label: string }[] = (Object.keys(CATEGORY_LABELS) as Treatment['category'][])
  .map((key) => ({ key, label: CATEGORY_LABELS[key] }));

export function categoryLabel(key: Treatment['category']): string {
  return TREATMENT_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export function treatmentPath(treatment: Pick<Treatment, 'slug'>): string {
  return `/treatments/${treatment.slug}`;
}

export function treatmentBySlug(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}

export function treatmentById(id: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.id === id);
}

// The treatment's guide, once loaded: always at build time; in the browser,
// after loadTreatmentGuide() (main-v1.tsx and App's navigate() wait for it
// before showing a treatment page).
export function guideFor(treatmentId: string): TreatmentGuide | undefined {
  return loadedGuide(treatmentId);
}

// Whether a treatment has a guide, known without loading it.
export function hasGuide(treatment: Pick<Treatment, 'slug'>): boolean {
  return hasGuideFile(treatment.slug);
}

export function loadTreatmentGuide(treatmentId: string): Promise<TreatmentGuide | undefined> {
  const treatment = treatmentById(treatmentId);
  return treatment ? loadGuide(treatment.id, treatment.slug) : Promise.resolve(undefined);
}

// Source path of a treatment's guide file, for preloading it.
export function guideModulePath(treatment: Pick<Treatment, 'slug'>): string {
  return `src/content/treatments/${treatment.slug}.ts`;
}

// "₹30000-₹1,50,000" -> { min: 30000, max: 150000 }; "₹5000+" -> { min: 5000 }
// (open-ended); "₹1500" -> { min: 1500, max: 1500 } (an exact price).
export function priceBounds(priceRange: string): { min?: number; max?: number } {
  const numbers = (priceRange.match(/[\d,]+/g) ?? []).map((n) => Number(n.replace(/,/g, ''))).filter((n) => n > 0);
  if (!numbers.length) return {};
  if (priceRange.trim().endsWith('+')) return { min: numbers[0] };
  return { min: numbers[0], max: numbers[numbers.length - 1] };
}

// 150000 -> "1,50,000" (Indian digit grouping). Written out by hand rather
// than with toLocaleString, whose output depends on the browser's locale
// data, so the build and every browser produce identical text.
export function formatIndianNumber(n: number): string {
  const digits = String(Math.round(n));
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return rest ? `${rest},${last3}` : last3;
}

export function formatInr(n: number): string {
  return `₹${formatIndianNumber(n)}`;
}

// "₹3500-₹8000" -> "₹3,500 – ₹8,000".
export function formatPriceRange(priceRange: string): string {
  const { min, max } = priceBounds(priceRange);
  const inr = formatInr;
  if (min === undefined) return priceRange;
  if (max === undefined) return `From ${inr(min)}`;
  if (max === min) return inr(min);
  return `${inr(min)} – ${inr(max)}`;
}

export const GUIDE_TOKENS = ['price', 'duration', 'startingPrice', 'name'] as const;

// Replaces {{price}}, {{duration}}, {{startingPrice}} and {{name}} in guide
// text with the treatment's current values from TREATMENTS.
export function fillTokens(text: string, treatment: Treatment): string {
  return text.replace(/\{\{(\w+)\}\}/g, (whole, key: string, offset: number) => {
    switch (key) {
      case 'price': {
        // An open-ended price reads "From ₹5,000" at the start of a sentence
        // or table cell, and "costs from ₹5,000" mid-sentence.
        const price = formatPriceRange(treatment.priceRange);
        const startsSentence = offset === 0 || /[.:!?]\s*$/.test(text.slice(0, offset));
        return startsSentence ? price : price.replace(/^From /, 'from ');
      }
      case 'startingPrice': return formatInr(treatment.startingPrice);
      case 'duration': return treatment.duration;
      case 'name': return treatment.name;
      default: return whole;
    }
  });
}
