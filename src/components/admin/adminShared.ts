// neudental v1 - Admin dashboard shared types, constants and helpers.
// Split out from AdminView so the four tabs (Dashboard/Calendar/Appointments/
// Patients) can all work off the same appointment shape and date/CSV helpers.
import { TREATMENTS } from '../../data';
import type { Treatment } from '../../types';

export interface AppointmentRecord {
  docId: string;
  patientName: string;
  phone: string;
  email: string;
  treatmentId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  status: string;
  notes: string;
  tags: string[];
  createdAt: Date | null;
  rescheduledFrom: { date: string; timeSlot: string } | null;
}

// Display order everywhere (filters, status chart). 'pending' last: only
// bookings made before auto-confirmation have it.
export const STATUS_ORDER = ['confirmed', 'rescheduled', 'completed', 'no_show', 'no_response', 'cancelled', 'pending'] as const;

export const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmed',
  rescheduled: 'Rescheduled',
  completed: 'Done',
  no_show: 'No-show',
  no_response: 'No response',
  cancelled: 'Cancelled',
  pending: 'Pending',
};

export const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rescheduled: 'bg-pink-50 text-pink-700 border-pink-200',
  completed: 'bg-secondary/10 text-secondary border-secondary/20',
  no_show: 'bg-orange-50 text-orange-700 border-orange-200',
  no_response: 'bg-violet-50 text-violet-700 border-violet-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

// Hex twins of STATUS_STYLES for the status chart. Same hue families as the
// chips, in STATUS_ORDER; validated as adjacent bars with the dataviz skill's
// validate_palette.js (light): passes, with a contrast WARN on the pink and
// amber bars that every bar's visible text label relieves.
export const STATUS_HEX: Record<string, string> = {
  confirmed: '#008300',
  rescheduled: '#e87ba4',
  completed: '#2a78d6',
  no_show: '#eb6834',
  no_response: '#6250d6',
  cancelled: '#e34948',
  pending: '#eda100',
};

export const UPCOMING_STATUSES = new Set<string>(['pending', 'confirmed', 'rescheduled']);

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] || status;
}

// Fixed preset so tags stay filterable/consistent instead of free-text drift.
export const TAG_OPTIONS = ['VIP', 'Follow-up', 'New Patient', 'Walk-in Risk'] as const;
export type TagOption = (typeof TAG_OPTIONS)[number];

export const TAG_STYLES: Record<string, string> = {
  VIP: 'bg-violet-50 text-violet-700 border-violet-200',
  'Follow-up': 'bg-sky-50 text-sky-700 border-sky-200',
  'New Patient': 'bg-teal-50 text-teal-700 border-teal-200',
  'Walk-in Risk': 'bg-orange-50 text-orange-700 border-orange-200',
};

// Okabe-Ito-derived categorical palette, order fixed to CATEGORY_ORDER below.
// Validated with the dataviz skill's validate_palette.js (light mode): passes
// with a CVD WARN in the 6-8 floor band, which is legal only paired with
// direct labels -- every chart that uses this always shows the category name
// next to its color, never color alone.
export const CATEGORY_ORDER = ['preventive', 'restorative', 'cosmetic-ortho', 'specialized', 'pediatric'] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  preventive: '#0072B2',
  restorative: '#E69F00',
  'cosmetic-ortho': '#009E73',
  specialized: '#CC79A7',
  pediatric: '#D55E00',
};

export const CATEGORY_LABELS: Record<string, string> = {
  preventive: 'Preventive',
  restorative: 'Restorative',
  'cosmetic-ortho': 'Cosmetic & Ortho',
  specialized: 'Specialized',
  pediatric: 'Kids Dentistry',
};

const TREATMENT_BY_ID = new Map<string, Treatment>(TREATMENTS.map((t) => [t.id, t]));

export function getTreatment(id: string): Treatment | undefined {
  return TREATMENT_BY_ID.get(id);
}

export function getTreatmentName(id: string): string {
  return TREATMENT_BY_ID.get(id)?.name || id || 'General Check-Up';
}

export function getTreatmentCategory(id: string): string {
  return TREATMENT_BY_ID.get(id)?.category || 'preventive';
}

// "10:00 AM" / "05:30 PM" -> minutes since midnight, for sorting and for
// placing a slot into the Morning/Evening schedule strip.
export function slotToMinutes(slot: string): number {
  const [time, meridiem] = slot.split(' ');
  if (!time || !meridiem) return 0;
  const [hStr, mStr] = time.split(':');
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

export function isMorningSlot(slot: string): boolean {
  return slotToMinutes(slot) < 14 * 60; // before 2:00 PM
}

// IST "today" as YYYY-MM-DD, matching the date strings BookingForm stores.
export function todayIST(): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const map: Record<string, string> = {};
  parts.forEach((p) => { map[p.type] = p.value; });
  return `${map.year}-${map.month}-${map.day}`;
}

function nowMinutesIST(): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const map: Record<string, string> = {};
  parts.forEach((p) => { map[p.type] = p.value; });
  return (parseInt(map.hour, 10) % 24) * 60 + parseInt(map.minute, 10);
}

// Still marked upcoming although its slot has already started: staff need to
// record what happened (Done / No-show / No response / Reschedule / Cancel).
export function isAwaitingOutcome(a: AppointmentRecord): boolean {
  if (!UPCOMING_STATUSES.has(a.status)) return false;
  const today = todayIST();
  if (a.date !== today) return a.date < today;
  return slotToMinutes(a.timeSlot) <= nowMinutesIST();
}

export function addDaysStr(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function formatDateDisplay(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y) return dateStr;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  });
}

export function sortByDateTime(a: AppointmentRecord, b: AppointmentRecord): number {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  return slotToMinutes(a.timeSlot) - slotToMinutes(b.timeSlot);
}

// Minimal CSV escaping: quote any field containing a comma, quote or newline,
// doubling embedded quotes -- enough for the plain-text fields we export.
function csvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function appointmentsToCsv(rows: AppointmentRecord[]): string {
  const headers = ['Patient Name', 'Phone', 'Email', 'Treatment', 'Category', 'Date', 'Time Slot', 'Status', 'Tags', 'Notes'];
  const lines = [headers.join(',')];
  for (const a of rows) {
    lines.push([
      a.patientName,
      a.phone,
      a.email,
      getTreatmentName(a.treatmentId),
      CATEGORY_LABELS[getTreatmentCategory(a.treatmentId)] || '',
      a.date,
      a.timeSlot,
      statusLabel(a.status),
      a.tags.join('; '),
      a.notes,
    ].map((v) => csvCell(String(v ?? ''))).join(','));
  }
  return lines.join('\r\n');
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
