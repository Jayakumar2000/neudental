// neudental v1 - Admin Calendar tab: month heat grid + a day view listing
// every appointment in its actual time slot, so staff can tell at a glance
// how any given day looks.
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Sun, Moon, Phone, Mail } from 'lucide-react';
import {
  AppointmentRecord, STATUS_STYLES, TAG_STYLES, todayIST, slotToMinutes, isMorningSlot,
  formatDateDisplay, getTreatmentName, appointmentsToCsv, downloadCsv,
} from './adminShared';

interface Props {
  appointments: AppointmentRecord[];
  onStatusChange: (docId: string, status: string) => void;
  updatingId: string | null;
}

function ymd(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// Discrete count -> intensity bands instead of a continuous gradient: easier
// to eyeball "busy vs quiet" at a glance across a whole month grid.
function heatClass(count: number): string {
  if (count === 0) return 'bg-surface-alt text-cool-gray/50';
  if (count <= 2) return 'bg-secondary/15 text-secondary';
  if (count <= 5) return 'bg-secondary/40 text-white';
  return 'bg-secondary text-white';
}

export default function AdminCalendarTab({ appointments, onStatusChange, updatingId }: Props) {
  const today = todayIST();
  const [y0, m0] = today.split('-').map(Number);
  const [viewYear, setViewYear] = useState(y0);
  const [viewMonth, setViewMonth] = useState(m0 - 1); // 0-indexed
  const [selectedDate, setSelectedDate] = useState(today);

  const countsByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const a of appointments) map.set(a.date, (map.get(a.date) || 0) + 1);
    return map;
  }, [appointments]);

  const monthLabel = new Date(Date.UTC(viewYear, viewMonth, 1)).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const firstWeekday = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();

  const cells: Array<{ day: number; date: string } | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, date: ymd(viewYear, viewMonth, i + 1) })),
  ];

  const goMonth = (delta: number) => {
    let m = viewMonth + delta, y = viewYear;
    if (m < 0) { m = 11; y -= 1; } else if (m > 11) { m = 0; y += 1; }
    setViewMonth(m); setViewYear(y);
  };

  const dayAppointments = useMemo(
    () => appointments.filter((a) => a.date === selectedDate).sort((a, b) => slotToMinutes(a.timeSlot) - slotToMinutes(b.timeSlot)),
    [appointments, selectedDate]
  );
  const dayMorning = dayAppointments.filter((a) => isMorningSlot(a.timeSlot));
  const dayEvening = dayAppointments.filter((a) => !isMorningSlot(a.timeSlot));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-primary text-lg">{monthLabel}</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => goMonth(-1)} className="w-8 h-8 rounded-full border border-cool-gray/15 flex items-center justify-center text-primary hover:bg-surface-alt cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => { setViewMonth(m0 - 1); setViewYear(y0); }} className="px-3 h-8 rounded-full border border-cool-gray/15 text-xs font-sans font-bold text-primary hover:bg-surface-alt cursor-pointer">Today</button>
            <button onClick={() => goMonth(1)} className="w-8 h-8 rounded-full border border-cool-gray/15 flex items-center justify-center text-primary hover:bg-surface-alt cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-center text-[10px] font-sans font-bold uppercase tracking-wider text-cool-gray py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((cell, i) => {
            if (!cell) return <div key={`empty-${i}`} />;
            const count = countsByDate.get(cell.date) || 0;
            const isToday = cell.date === today;
            const isSelected = cell.date === selectedDate;
            return (
              <button
                key={cell.date}
                onClick={() => setSelectedDate(cell.date)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 font-sans transition-all cursor-pointer border ${isSelected ? 'border-primary ring-2 ring-primary/20' : isToday ? 'border-secondary' : 'border-transparent'} ${heatClass(count)}`}
              >
                <span className="text-xs font-bold">{cell.day}</span>
                {count > 0 && <span className="text-[9px] font-bold opacity-90">{count}</span>}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-4 text-[10px] font-sans text-cool-gray">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-surface-alt border border-cool-gray/15 inline-block" /> None</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary/15 inline-block" /> 1-2</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary/40 inline-block" /> 3-5</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary inline-block" /> 6+</span>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="font-serif font-bold text-primary">{formatDateDisplay(selectedDate)}</h3>
          {dayAppointments.length > 0 && (
            <button
              onClick={() => downloadCsv(`neudental-appointments-${selectedDate}.csv`, appointmentsToCsv(dayAppointments))}
              className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold text-secondary hover:text-primary cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" /> Export Day
            </button>
          )}
        </div>

        {dayAppointments.length === 0 ? (
          <p className="font-sans text-sm text-cool-gray">No appointments on this day.</p>
        ) : (
          <div className="space-y-5 max-h-[520px] overflow-y-auto pr-1">
            {[{ label: 'Morning', icon: Sun, rows: dayMorning }, { label: 'Evening', icon: Moon, rows: dayEvening }].map(({ label, icon: Icon, rows }) => rows.length > 0 && (
              <div key={label}>
                <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-cool-gray mb-2"><Icon className="w-3.5 h-3.5 text-secondary" /> {label}</div>
                <div className="space-y-2">
                  {rows.map((a) => (
                    <div key={a.docId} className="rounded-xl border border-cool-gray/10 p-3 font-sans">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-primary text-sm">{a.timeSlot} — {a.patientName}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[a.status] || STATUS_STYLES.pending}`}>{a.status}</span>
                      </div>
                      <p className="text-xs text-cool-gray mb-1.5">{getTreatmentName(a.treatmentId)}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-on-surface-variant mb-2">
                        <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:text-secondary"><Phone className="w-3 h-3 text-secondary" /> {a.phone}</a>
                        {a.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-secondary" /> {a.email}</span>}
                      </div>
                      {a.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {a.tags.map((t) => <span key={t} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${TAG_STYLES[t] || 'bg-surface-alt text-cool-gray border-cool-gray/15'}`}>{t}</span>)}
                        </div>
                      )}
                      <div className="flex gap-1.5">
                        {a.status !== 'confirmed' && <button disabled={updatingId === a.docId} onClick={() => onStatusChange(a.docId, 'confirmed')} className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold cursor-pointer disabled:opacity-50">Confirm</button>}
                        {a.status !== 'completed' && <button disabled={updatingId === a.docId} onClick={() => onStatusChange(a.docId, 'completed')} className="px-2.5 py-1 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary text-[10px] font-bold cursor-pointer disabled:opacity-50">Completed</button>}
                        {a.status !== 'cancelled' && <button disabled={updatingId === a.docId} onClick={() => onStatusChange(a.docId, 'cancelled')} className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold cursor-pointer disabled:opacity-50">Cancel</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
