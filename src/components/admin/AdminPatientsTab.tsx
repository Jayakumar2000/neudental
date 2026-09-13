// neudental v1 - Admin Patients tab: appointments grouped by phone number into
// a patient profile with visit history -- the actual "CRM" view.
import React, { useMemo, useState } from 'react';
import { Search, Phone, Mail, Calendar, ChevronDown, ChevronUp, Download } from 'lucide-react';
import {
  AppointmentRecord, STATUS_STYLES, getTreatmentName, sortByDateTime, todayIST,
  appointmentsToCsv, downloadCsv,
} from './adminShared';

interface Props {
  appointments: AppointmentRecord[];
}

interface Patient {
  phone: string;
  patientName: string;
  email: string;
  visits: AppointmentRecord[];
  firstSeen: string;
  lastVisit: string;
  nextUpcoming: AppointmentRecord | null;
}

export default function AdminPatientsTab({ appointments }: Props) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const today = todayIST();

  const patients = useMemo(() => {
    const byPhone = new Map<string, AppointmentRecord[]>();
    for (const a of appointments) {
      if (!a.phone) continue;
      if (!byPhone.has(a.phone)) byPhone.set(a.phone, []);
      byPhone.get(a.phone)!.push(a);
    }
    const list: Patient[] = [];
    for (const [phone, visits] of byPhone) {
      const sorted = [...visits].sort(sortByDateTime);
      const latest = sorted[sorted.length - 1];
      const upcoming = sorted.filter((v) => v.date >= today && v.status !== 'cancelled').sort(sortByDateTime)[0] || null;
      list.push({
        phone,
        patientName: latest.patientName,
        email: [...sorted].reverse().find((v) => v.email)?.email || '',
        visits: sorted,
        firstSeen: sorted[0].date,
        lastVisit: latest.date,
        nextUpcoming: upcoming,
      });
    }
    return list.sort((a, b) => (b.lastVisit > a.lastVisit ? 1 : -1));
  }, [appointments, today]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) => p.patientName.toLowerCase().includes(q) || p.phone.includes(q) || p.email.toLowerCase().includes(q));
  }, [patients, search]);

  const exportPatients = () => {
    const headers = ['Patient Name', 'Phone', 'Email', 'Total Visits', 'First Seen', 'Last Visit', 'Next Upcoming'];
    const lines = [headers.join(',')];
    for (const p of filtered) {
      lines.push([p.patientName, p.phone, p.email, String(p.visits.length), p.firstSeen, p.lastVisit, p.nextUpcoming ? `${p.nextUpcoming.date} ${p.nextUpcoming.timeSlot}` : ''].map((v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)).join(','));
    }
    downloadCsv(`neudental-patients-${Date.now()}.csv`, lines.join('\r\n'));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 border border-cool-gray/10 premium-shadow flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients by name, phone or email…" className="w-full pl-10 pr-4 py-2.5 bg-surface-alt border border-cool-gray/10 rounded-xl outline-none text-sm text-primary font-sans focus:border-secondary" />
        </div>
        <button onClick={exportPatients} disabled={filtered.length === 0} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-secondary disabled:opacity-40 text-white text-xs font-sans font-bold cursor-pointer shrink-0"><Download className="w-3.5 h-3.5" /> Export CSV</button>
      </div>

      <p className="font-sans text-xs text-cool-gray">{filtered.length} patient{filtered.length === 1 ? '' : 's'}</p>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-cool-gray border border-dashed border-cool-gray/20 font-sans">No patients match this search.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const isOpen = expanded === p.phone;
            return (
              <div key={p.phone} className="bg-white rounded-2xl border border-cool-gray/10 premium-shadow overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : p.phone)} className="w-full flex flex-col md:flex-row md:items-center gap-3 justify-between p-5 text-left cursor-pointer">
                  <div className="font-sans text-sm">
                    <p className="font-bold text-primary mb-1">{p.patientName}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-secondary" /> {p.phone}</span>
                      {p.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-secondary" /> {p.email}</span>}
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary" /> Last visit {p.lastVisit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-center">
                      <p className="font-serif font-bold text-primary text-lg leading-none">{p.visits.length}</p>
                      <p className="text-[9px] font-sans font-bold uppercase tracking-wider text-cool-gray mt-1">Visits</p>
                    </div>
                    {p.nextUpcoming && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-secondary/10 text-secondary border-secondary/20">Upcoming {p.nextUpcoming.date}</span>
                    )}
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cool-gray" /> : <ChevronDown className="w-4 h-4 text-cool-gray" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-cool-gray/10 bg-surface-alt/50 p-5 space-y-2">
                    {[...p.visits].reverse().map((v) => (
                      <div key={v.docId} className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-xl border border-cool-gray/10 px-4 py-2.5 text-xs font-sans">
                        <span className="font-bold text-primary">{v.date} · {v.timeSlot}</span>
                        <span className="text-cool-gray">{getTreatmentName(v.treatmentId)}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLES[v.status] || STATUS_STYLES.pending}`}>{v.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
