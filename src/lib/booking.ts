// neudental v1 - booking rules shared by the patient form and the admin portal.
import { APPOINTMENT_SLOT_GROUPS } from '../data';

// Patients can book from today up to this many days ahead (IST). Mirrored,
// with a day's leeway either side, by isBookableDate() in firestore.rules.
export const BOOKING_WINDOW_DAYS = 30;

// "10:00 AM" / "05:30 PM" -> minutes since midnight.
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

export const ALL_SLOTS: string[] = APPOINTMENT_SLOT_GROUPS.flatMap((g) => g.times);

// One patient per slot: the /slotHolds/{holdId} document is the slot's single
// seat, e.g. "2026-10-19_1730". firestore.rules builds the same id
// (holdIdFor() there), so the two must stay in step.
export function holdIdFor(date: string, timeSlot: string): string {
  const minutes = slotToMinutes(timeSlot);
  const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mm = String(minutes % 60).padStart(2, '0');
  return `${date}_${hh}${mm}`;
}

export function addDaysStr(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}
