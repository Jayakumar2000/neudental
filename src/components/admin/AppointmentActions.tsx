// neudental v1 - per-appointment staff actions, shared by the Appointments and
// Calendar tabs. Bookings arrive already confirmed; staff only record what
// happened (Done / No-show / No response), move it (Reschedule) or Cancel.
import React, { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { APPOINTMENT_SLOT_GROUPS } from '../../data';
import { AppointmentRecord, UPCOMING_STATUSES, todayIST, addDaysStr, bookingSlotProblem, firstOpenSlot } from './adminShared';

interface Props {
  appointment: AppointmentRecord;
  updating: boolean;
  compact?: boolean;
  onStatusChange: (docId: string, status: string) => Promise<boolean>;
  onReschedule: (appointment: AppointmentRecord, date: string, timeSlot: string) => Promise<boolean>;
}

const OUTCOMES = [
  { status: 'completed', label: 'Done', className: 'bg-secondary/10 hover:bg-secondary/20 text-secondary' },
  { status: 'no_show', label: 'No-show', className: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
  { status: 'no_response', label: 'No response', className: 'bg-violet-50 hover:bg-violet-100 text-violet-700' },
] as const;

export default function AppointmentActions({ appointment: a, updating, compact = false, onStatusChange, onReschedule }: Props) {
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState(a.date);
  const [newSlot, setNewSlot] = useState(a.timeSlot);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Compact (calendar) buttons stay finger-sized on phones.
  const size = compact ? 'px-3 py-2 text-[11px] sm:px-2.5 sm:py-1 sm:text-[10px]' : 'px-3.5 py-2 text-xs';
  const button = `${size} rounded-lg font-sans font-bold cursor-pointer disabled:opacity-50`;
  const problem = bookingSlotProblem(newDate, newSlot);
  const unchanged = newDate === a.date && newSlot === a.timeSlot;

  const openReschedule = () => {
    let date = a.date >= todayIST() ? a.date : todayIST();
    let slot = bookingSlotProblem(date, a.timeSlot) ? firstOpenSlot(date) : a.timeSlot;
    if (!slot) { date = addDaysStr(date, 1); slot = firstOpenSlot(date); }
    setNewDate(date);
    setNewSlot(slot || a.timeSlot);
    setSaveError(null);
    setRescheduling(true);
  };

  const saveReschedule = async () => {
    setSaveError(null);
    if (await onReschedule(a, newDate, newSlot)) setRescheduling(false);
    else setSaveError('Not saved. Please try again.');
  };

  return (
    <div className={`flex flex-col gap-2 ${compact ? 'items-start' : 'items-end'}`}>
      <div className={`flex flex-wrap gap-1.5 ${compact ? '' : 'justify-end'}`}>
        {a.status === 'pending' && (
          <button disabled={updating} onClick={() => onStatusChange(a.docId, 'confirmed')} className={`${button} bg-emerald-50 hover:bg-emerald-100 text-emerald-700`}>Confirm</button>
        )}
        {a.status !== 'pending' && !UPCOMING_STATUSES.has(a.status) && (
          <button disabled={updating} onClick={() => onStatusChange(a.docId, a.rescheduledFrom ? 'rescheduled' : 'confirmed')} title="Undo: make this an upcoming appointment again" className={`${button} bg-emerald-50 hover:bg-emerald-100 text-emerald-700`}>Reopen</button>
        )}
        {OUTCOMES.filter((o) => o.status !== a.status).map((o) => (
          <button key={o.status} disabled={updating} onClick={() => onStatusChange(a.docId, o.status)} className={`${button} ${o.className}`}>{o.label}</button>
        ))}
        {a.status !== 'completed' && (
          <button disabled={updating} onClick={() => (rescheduling ? setRescheduling(false) : openReschedule())} className={`${button} inline-flex items-center gap-1 bg-pink-50 hover:bg-pink-100 text-pink-700`}>
            <CalendarClock className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} /> Reschedule
          </button>
        )}
        {a.status !== 'cancelled' && (
          <button disabled={updating} onClick={() => onStatusChange(a.docId, 'cancelled')} className={`${button} bg-rose-50 hover:bg-rose-100 text-rose-700`}>Cancel</button>
        )}
      </div>

      {rescheduling && (
        <div className="w-full max-w-xs bg-surface-alt border border-cool-gray/15 rounded-xl p-3 space-y-2">
          <div className="flex gap-2">
            <input
              type="date"
              aria-label="New date"
              value={newDate}
              min={todayIST()}
              onChange={(e) => setNewDate(e.target.value)}
              className="flex-1 min-w-0 px-2.5 py-2 bg-white border border-cool-gray/15 rounded-lg outline-none text-xs text-primary font-sans focus:border-secondary"
            />
            <select
              aria-label="New time slot"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              className="px-2.5 py-2 bg-white border border-cool-gray/15 rounded-lg outline-none text-xs text-primary font-sans focus:border-secondary"
            >
              {APPOINTMENT_SLOT_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.times.map((slot) => <option key={slot} value={slot} disabled={!!bookingSlotProblem(newDate, slot)}>{slot}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          {(problem || saveError) && <p role="alert" className="text-[11px] font-sans font-medium text-rose-700">{saveError || problem}</p>}
          <div className="flex justify-end gap-1.5">
            <button onClick={() => setRescheduling(false)} className="px-3 py-1.5 rounded-lg text-[11px] font-sans font-bold text-cool-gray hover:text-primary cursor-pointer">Close</button>
            <button disabled={updating || !!problem || unchanged} onClick={saveReschedule} className="px-3 py-1.5 rounded-lg bg-primary hover:bg-secondary text-white text-[11px] font-sans font-bold cursor-pointer disabled:opacity-40">{updating ? 'Saving…' : 'Save new time'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
