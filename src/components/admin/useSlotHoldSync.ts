// neudental v1 - keeps /slotHolds (one seat per slot, see firestore.rules) in
// step with what staff do. Staff actions only edit the appointment; while the
// portal is open this releases holds whose booking was cancelled, finished or
// moved, and claims the slot for upcoming bookings that don't hold it yet
// (moved here, reopened, or booked before holds existed). A slot staff
// overbooked stays held by one booking and shows as "Double-booked".
import { useEffect, useRef, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db, OperationType, handleFirestoreError } from '../../firebase';
import { holdIdFor, ALL_SLOTS } from '../../lib/booking';
import { AppointmentRecord, OPEN_STATUSES, todayIST } from './adminShared';

interface Hold { id: string; date: string; timeSlot: string; appointmentId: string }

export function useSlotHoldSync(user: User | null, appointments: AppointmentRecord[], appointmentsLoaded: boolean) {
  const [holds, setHolds] = useState<Hold[] | null>(null);
  // Writes in flight or refused this session, so a snapshot arriving
  // mid-write (or a write the rules reject) isn't retried in a loop.
  const attempted = useRef(new Set<string>());
  const attempt = (key: string, write: () => Promise<void>, operation: OperationType) => {
    if (attempted.current.has(key)) return;
    attempted.current.add(key);
    write()
      .then(() => attempted.current.delete(key))
      .catch((err) => handleFirestoreError(err, operation, 'slotHolds'));
  };

  useEffect(() => {
    if (!user) { setHolds(null); return; }
    const q = query(collection(db, 'slotHolds'), where('date', '>=', todayIST()));
    return onSnapshot(q, (snapshot) => {
      setHolds(snapshot.docs.map((d) => {
        const data = d.data();
        return { id: d.id, date: String(data.date), timeSlot: String(data.timeSlot), appointmentId: String(data.appointmentId) };
      }));
    }, (error) => {
      // Refused until the slotHolds rules are deployed; nothing to sync then.
      if (error.code !== 'permission-denied') handleFirestoreError(error, OperationType.LIST, 'slotHolds');
      setHolds(null);
    });
  }, [user]);

  useEffect(() => {
    if (!holds || !appointmentsLoaded) return;
    const today = todayIST();
    const byId = new Map(appointments.map((a) => [a.docId, a]));
    const kept = new Set<string>();
    for (const h of holds) {
      const a = byId.get(h.appointmentId);
      // A booking and its hold are written together, but the hold's snapshot
      // can arrive first -- never release a hold for a booking not seen yet.
      if (!a || (OPEN_STATUSES.has(a.status) && holdIdFor(a.date, a.timeSlot) === h.id)) { kept.add(h.id); continue; }
      attempt(`delete:${h.id}:${h.appointmentId}`, () => deleteDoc(doc(db, 'slotHolds', h.id)), OperationType.DELETE);
    }

    // Oldest booking first, so an overbooked slot is held by whoever booked it first.
    const waiting = appointments
      .filter((a) => OPEN_STATUSES.has(a.status) && a.date >= today && ALL_SLOTS.includes(a.timeSlot))
      .sort((a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0));
    const existing = new Set(holds.map((h) => h.id));
    for (const a of waiting) {
      const id = holdIdFor(a.date, a.timeSlot);
      // A stale hold on this slot is released above; claim it on the next snapshot.
      if (kept.has(id) || existing.has(id)) continue;
      kept.add(id);
      attempt(`create:${id}:${a.docId}`, () => setDoc(doc(db, 'slotHolds', id), { date: a.date, timeSlot: a.timeSlot, appointmentId: a.docId }), OperationType.CREATE);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holds, appointments, appointmentsLoaded]);

  return holds;
}
