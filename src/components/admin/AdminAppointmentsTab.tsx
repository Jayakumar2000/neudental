// neudental v1 - Admin Appointments tab: the searchable/filterable CRM list,
// with per-appointment preset tags and CSV export of whatever is in view.
import React, { useMemo, useState } from 'react';
import { Search, Calendar, Clock, Phone, Mail, FileText, Download, Tag as TagIcon } from 'lucide-react';
import {
  AppointmentRecord, STATUS_STYLES, STATUS_FILTERS, TAG_OPTIONS, TAG_STYLES,
  CATEGORY_ORDER, CATEGORY_LABELS, getTreatmentName, getTreatmentCategory,
  sortByDateTime, appointmentsToCsv, downloadCsv,
} from './adminShared';

interface Props {
  appointments: AppointmentRecord[];
  onStatusChange: (docId: string, status: string) => void;
  onToggleTag: (docId: string, tag: string, currentTags: string[]) => void;
  updatingId: string | null;
}

export default function AdminAppointmentsTab({ appointments, onStatusChange, onToggleTag, updatingId }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [tagMenuFor, setTagMenuFor] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return appointments
      .filter((a) => statusFilter === 'all' || a.status === statusFilter)
      .filter((a) => categoryFilter === 'all' || getTreatmentCategory(a.treatmentId) === categoryFilter)
      .filter((a) => !fromDate || a.date >= fromDate)
      .filter((a) => !toDate || a.date <= toDate)
      .filter((a) => !q || a.patientName.toLowerCase().includes(q) || a.phone.includes(q) || a.email.toLowerCase().includes(q))
      .sort(sortByDateTime);
  }, [appointments, search, statusFilter, categoryFilter, fromDate, toDate]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 border border-cool-gray/10 premium-shadow space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone or email…" className="w-full pl-10 pr-4 py-2.5 bg-surface-alt border border-cool-gray/10 rounded-xl outline-none text-sm text-primary font-sans focus:border-secondary" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-3 py-2.5 bg-surface-alt border border-cool-gray/10 rounded-xl outline-none text-xs text-primary font-sans focus:border-secondary" />
            <span className="text-xs text-cool-gray">to</span>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-3 py-2.5 bg-surface-alt border border-cool-gray/10 rounded-xl outline-none text-xs text-primary font-sans focus:border-secondary" />
          </div>
          <button
            onClick={() => downloadCsv(`neudental-appointments-${Date.now()}.csv`, appointmentsToCsv(filtered))}
            disabled={filtered.length === 0}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-secondary disabled:opacity-40 text-white text-xs font-sans font-bold cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer ${statusFilter === s ? 'bg-primary text-white' : 'bg-surface-alt border border-cool-gray/15 text-on-surface hover:border-primary'}`}>{s}</button>
          ))}
          <span className="w-px h-4 bg-cool-gray/20 mx-1" />
          <button onClick={() => setCategoryFilter('all')} className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer ${categoryFilter === 'all' ? 'bg-primary text-white' : 'bg-surface-alt border border-cool-gray/15 text-on-surface hover:border-primary'}`}>All Treatments</button>
          {CATEGORY_ORDER.map((c) => (
            <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer ${categoryFilter === c ? 'bg-primary text-white' : 'bg-surface-alt border border-cool-gray/15 text-on-surface hover:border-primary'}`}>{CATEGORY_LABELS[c]}</button>
          ))}
        </div>
      </div>

      <p className="font-sans text-xs text-cool-gray">{filtered.length} appointment{filtered.length === 1 ? '' : 's'}</p>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-cool-gray border border-dashed border-cool-gray/20 font-sans">No appointments match these filters.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div key={a.docId} className="bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow flex flex-col md:flex-row md:items-start gap-4 justify-between">
              <div className="font-sans text-sm flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-bold text-primary">{a.patientName}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLES[a.status] || STATUS_STYLES.pending}`}>{a.status}</span>
                  {a.tags.map((t) => <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${TAG_STYLES[t] || ''}`}>{t}</span>)}
                </div>
                <p className="text-cool-gray font-medium mb-1.5">{getTreatmentName(a.treatmentId)} · <span className="text-[11px]">{CATEGORY_LABELS[getTreatmentCategory(a.treatmentId)]}</span></p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary" /> {a.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" /> {a.timeSlot}</span>
                  <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:text-secondary"><Phone className="w-3.5 h-3.5 text-secondary" /> {a.phone}</a>
                  {a.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-secondary" /> {a.email}</span>}
                </div>
                {a.notes && <p className="flex items-start gap-1.5 mt-2 text-xs text-cool-gray italic max-w-lg"><FileText className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" /> {a.notes}</p>}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex gap-2">
                  {a.status !== 'confirmed' && <button disabled={updatingId === a.docId} onClick={() => onStatusChange(a.docId, 'confirmed')} className="px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-sans font-bold cursor-pointer disabled:opacity-50">Confirm</button>}
                  {a.status !== 'completed' && <button disabled={updatingId === a.docId} onClick={() => onStatusChange(a.docId, 'completed')} className="px-3.5 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-sans font-bold cursor-pointer disabled:opacity-50">Completed</button>}
                  {a.status !== 'cancelled' && <button disabled={updatingId === a.docId} onClick={() => onStatusChange(a.docId, 'cancelled')} className="px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-sans font-bold cursor-pointer disabled:opacity-50">Cancel</button>}
                </div>
                <div className="relative">
                  <button onClick={() => setTagMenuFor(tagMenuFor === a.docId ? null : a.docId)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-cool-gray/15 text-[11px] font-sans font-bold text-cool-gray hover:border-primary cursor-pointer"><TagIcon className="w-3 h-3" /> Tag</button>
                  {tagMenuFor === a.docId && (
                    <div className="absolute right-0 mt-1.5 z-20 bg-white border border-cool-gray/15 rounded-xl premium-shadow p-2 w-40 space-y-1">
                      {TAG_OPTIONS.map((tag) => {
                        const active = a.tags.includes(tag);
                        return (
                          <button key={tag} onClick={() => onToggleTag(a.docId, tag, a.tags)} className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-sans font-bold cursor-pointer ${active ? TAG_STYLES[tag] : 'hover:bg-surface-alt text-on-surface-variant'}`}>{active ? '✓ ' : ''}{tag}</button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
