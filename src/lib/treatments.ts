// neudental v1 - treatment pages: lookups and the {{price}}-style
// placeholders guides use so their text always matches TREATMENTS.
import { TREATMENTS } from '../data';
import { TREATMENT_GUIDES } from '../content/treatments';
import type { Treatment, TreatmentGuide } from '../types';

export const TREATMENT_CATEGORIES: { key: Treatment['category']; label: string }[] = [
  { key: 'preventive', label: 'Preventive care' },
  { key: 'restorative', label: 'Restorative dentistry' },
  { key: 'cosmetic-ortho', label: 'Cosmetic & orthodontics' },
  { key: 'specialized', label: 'Specialised & surgical care' },
  { key: 'pediatric', label: 'Kids dentistry' },
];

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

export function guideFor(treatmentId: string): TreatmentGuide | undefined {
  return TREATMENT_GUIDES.find((g) => g.treatmentId === treatmentId);
}

// "₹30000-₹1,50,000" -> { min: 30000, max: 150000 }; "₹5000+" -> { min: 5000 }.
export function priceBounds(priceRange: string): { min?: number; max?: number } {
  const numbers = (priceRange.match(/[\d,]+/g) ?? []).map((n) => Number(n.replace(/,/g, ''))).filter((n) => n > 0);
  if (!numbers.length) return {};
  return priceRange.trim().endsWith('+') || numbers.length === 1 ? { min: numbers[0] } : { min: numbers[0], max: numbers[numbers.length - 1] };
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
  return `${inr(min)} – ${inr(max)}`;
}

export const GUIDE_TOKENS = ['price', 'duration', 'startingPrice', 'name'] as const;

// Replaces {{price}}, {{duration}}, {{startingPrice}} and {{name}} in guide
// text with the treatment's current values from TREATMENTS.
export function fillTokens(text: string, treatment: Treatment): string {
  return text.replace(/\{\{(\w+)\}\}/g, (whole, key: string) => {
    switch (key) {
      case 'price': return formatPriceRange(treatment.priceRange);
      case 'startingPrice': return formatInr(treatment.startingPrice);
      case 'duration': return treatment.duration;
      case 'name': return treatment.name;
      default: return whole;
    }
  });
}
