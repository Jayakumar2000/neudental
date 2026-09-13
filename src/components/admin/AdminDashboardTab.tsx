// neudental v1 - Admin Dashboard tab: stat tiles, today's schedule, 14-day
// trend and treatment-category / status breakdowns.
import React, { useMemo } from 'react';
import { CalendarCheck, Users, Clock3, Hourglass, Sun, Moon } from 'lucide-react';
import {
  AppointmentRecord, STATUS_HEX, STATUS_FILTERS, CATEGORY_ORDER, CATEGORY_COLORS,
  CATEGORY_LABELS, getTreatmentCategory, getTreatmentName, todayIST, addDaysStr,
  slotToMinutes, isMorningSlot, formatDateDisplay,
} from './adminShared';

interface Props {
  appointments: AppointmentRecord[];
}

function StatTile({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: number | string; tint: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tint}`}>{icon}</div>
      <div>
        <p className="font-serif text-2xl font-bold text-primary leading-none">{value}</p>
        <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-cool-gray mt-1.5">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardTab({ appointments }: Props) {
  const today = todayIST();

  const stats = useMemo(() => {
    const uniquePatients = new Set(appointments.map((a) => a.phone).filter(Boolean));
    const weekStart = addDaysStr(today, -6);
    const thisWeek = appointments.filter((a) => a.date >= weekStart && a.date <= today);
    const todays = appointments.filter((a) => a.date === today);
    const pending = appointments.filter((a) => a.status === 'pending');
    return {
      today: todays.length,
      week: thisWeek.length,
      pending: pending.length,
      patients: uniquePatients.size,
    };
  }, [appointments, today]);

  const todaysSchedule = useMemo(
    () => appointments.filter((a) => a.date === today).sort((a, b) => slotToMinutes(a.timeSlot) - slotToMinutes(b.timeSlot)),
    [appointments, today]
  );
  const todaysMorning = todaysSchedule.filter((a) => isMorningSlot(a.timeSlot));
  const todaysEvening = todaysSchedule.filter((a) => !isMorningSlot(a.timeSlot));

  const trend = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => addDaysStr(today, i - 13));
    const counts = new Map<string, number>(days.map((d) => [d, 0]));
    for (const a of appointments) if (counts.has(a.date)) counts.set(a.date, (counts.get(a.date) || 0) + 1);
    const max = Math.max(1, ...counts.values());
    return days.map((d) => ({ date: d, count: counts.get(d) || 0, pct: Math.round(((counts.get(d) || 0) / max) * 100) }));
  }, [appointments, today]);

  const categoryBreakdown = useMemo(() => {
    const counts = new Map<string, number>(CATEGORY_ORDER.map((c) => [c, 0]));
    for (const a of appointments) {
      const cat = getTreatmentCategory(a.treatmentId);
      counts.set(cat, (counts.get(cat) || 0) + 1);
    }
    const max = Math.max(1, ...counts.values());
    return CATEGORY_ORDER.map((cat) => ({ cat, count: counts.get(cat) || 0, pct: Math.round(((counts.get(cat) || 0) / max) * 100) }));
  }, [appointments]);

  const statusBreakdown = useMemo(() => {
    const statuses = STATUS_FILTERS.filter((s) => s !== 'all');
    const counts = new Map<string, number>(statuses.map((s) => [s, 0]));
    for (const a of appointments) counts.set(a.status, (counts.get(a.status) || 0) + 1);
    const total = Math.max(1, appointments.length);
    return statuses.map((s) => ({ status: s, count: counts.get(s) || 0, pct: Math.round(((counts.get(s) || 0) / total) * 100) }));
  }, [appointments]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile icon={<CalendarCheck className="w-5 h-5 text-secondary" />} label="Today" value={stats.today} tint="bg-secondary/10" />
        <StatTile icon={<Clock3 className="w-5 h-5 text-emerald-600" />} label="This Week" value={stats.week} tint="bg-emerald-50" />
        <StatTile icon={<Hourglass className="w-5 h-5 text-amber-600" />} label="Pending" value={stats.pending} tint="bg-amber-50" />
        <StatTile icon={<Users className="w-5 h-5 text-violet-600" />} label="Total Patients" value={stats.patients} tint="bg-violet-50" />
      </div>

      <div className="bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow">
        <h3 className="font-serif font-bold text-primary mb-4">Today's Schedule — {formatDateDisplay(today)}</h3>
        {todaysSchedule.length === 0 ? (
          <p className="font-sans text-sm text-cool-gray">No appointments booked for today.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ label: 'Morning', icon: Sun, rows: todaysMorning }, { label: 'Evening', icon: Moon, rows: todaysEvening }].map(({ label, icon: Icon, rows }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-cool-gray mb-2"><Icon className="w-3.5 h-3.5 text-secondary" /> {label} ({rows.length})</div>
                {rows.length === 0 ? (
                  <p className="text-xs font-sans text-cool-gray/70 italic">Nothing scheduled.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {rows.map((a) => (
                      <li key={a.docId} className="flex items-center justify-between gap-2 text-xs font-sans bg-surface-alt rounded-lg px-3 py-2">
                        <span className="font-bold text-primary tabular-nums w-16 shrink-0">{a.timeSlot}</span>
                        <span className="flex-1 truncate text-on-surface-variant">{a.patientName}</span>
                        <span className="text-cool-gray shrink-0">{getTreatmentName(a.treatmentId)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow">
          <h3 className="font-serif font-bold text-primary mb-4">Bookings — Last 14 Days</h3>
          <div className="flex items-end gap-1.5 h-32">
            {trend.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center justify-end h-full gap-1 group relative">
                <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-sans font-bold text-primary bg-white border border-cool-gray/15 rounded px-1.5 py-0.5 whitespace-nowrap z-10">{d.count} on {formatDateDisplay(d.date)}</div>
                <div className={`w-full rounded-t-sm ${d.date === today ? 'bg-secondary' : 'bg-secondary/30'}`} style={{ height: `${Math.max(d.pct, d.count > 0 ? 6 : 2)}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-sans text-cool-gray"><span>{formatDateDisplay(trend[0].date)}</span><span>Today</span></div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow space-y-4">
          <h3 className="font-serif font-bold text-primary">By Treatment Category</h3>
          <div className="space-y-2.5">
            {categoryBreakdown.map(({ cat, count, pct }) => (
              <div key={cat} className="flex items-center gap-3 text-xs font-sans">
                <span className="w-32 shrink-0 text-on-surface-variant font-medium truncate">{CATEGORY_LABELS[cat]}</span>
                <div className="flex-1 h-2.5 rounded-full bg-surface-alt overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: CATEGORY_COLORS[cat] }} /></div>
                <span className="w-6 text-right font-bold text-primary tabular-nums">{count}</span>
              </div>
            ))}
          </div>

          <h3 className="font-serif font-bold text-primary pt-2 border-t border-cool-gray/10">By Status</h3>
          <div className="space-y-2.5">
            {statusBreakdown.map(({ status, count, pct }) => (
              <div key={status} className="flex items-center gap-3 text-xs font-sans">
                <span className="w-32 shrink-0 text-on-surface-variant font-medium capitalize">{status}</span>
                <div className="flex-1 h-2.5 rounded-full bg-surface-alt overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: STATUS_HEX[status] }} /></div>
                <span className="w-6 text-right font-bold text-primary tabular-nums">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
