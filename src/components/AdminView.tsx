// neudental v1 - AdminView Component
// Staff-only appointments dashboard at /admin. Access is gated by a real
// Firebase Auth login (not the anonymous session patients get) plus a
// matching /admins/{uid} document in Firestore -- see firestore.rules.
import React, { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, updateDoc, doc } from 'firebase/firestore';
import { LogOut, Lock, Mail, Phone, Calendar, Clock, FileText, ShieldCheck, RefreshCw } from 'lucide-react';
import { auth, db, OperationType, handleFirestoreError } from '../firebase';
import { TREATMENTS } from '../data';
import BrandLogo from './BrandLogo';

interface AppointmentRecord {
  docId: string;
  patientName: string;
  phone: string;
  email: string;
  treatmentId: string;
  date: string;
  timeSlot: string;
  status: string;
  notes: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-secondary/10 text-secondary border-secondary/20',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const;

function getTreatmentName(id: string) {
  return TREATMENTS.find((t) => t.id === id)?.name || id || 'General Check-Up';
}

export default function AdminView() {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('pending');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setAppointments([]); return; }
    setLoadingAppointments(true);
    setLoadError(null);
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows: AppointmentRecord[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            docId: d.id,
            patientName: data.patientName || '',
            phone: data.phone || '',
            email: data.email || '',
            treatmentId: data.treatmentId || '',
            date: data.date || '',
            timeSlot: data.timeSlot || '',
            status: data.status || 'pending',
            notes: data.notes || '',
          };
        });
        setAppointments(rows);
        setLoadingAppointments(false);
      },
      (error) => {
        setLoadingAppointments(false);
        handleFirestoreError(error, OperationType.LIST, 'appointments');
        setLoadError(
          error.code === 'permission-denied'
            ? "You're signed in, but this account isn't set up as an admin yet. Ask whoever manages Firebase to add your account's UID to the /admins collection in Firestore."
            : 'Could not load appointments. Please refresh and try again.'
        );
      }
    );
    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, 'auth');
      setLoginError('Invalid email or password.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleStatusChange = async (docId: string, status: string) => {
    setUpdatingId(docId);
    try {
      await updateDoc(doc(db, 'appointments', docId), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'appointments');
    } finally {
      setUpdatingId(null);
    }
  };

  const visibleAppointments = statusFilter === 'all'
    ? appointments
    : appointments.filter((a) => a.status === statusFilter);

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-alt"><RefreshCw className="w-6 h-6 text-secondary animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-alt px-6">
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-cool-gray/10 premium-shadow">
          <div className="flex justify-center mb-6"><BrandLogo showTagline={false} markClassName="h-10 w-auto" wordmarkClassName="h-[20px] w-auto" /></div>
          <div className="flex items-center gap-2 justify-center mb-6 text-on-surface-variant font-sans text-xs uppercase tracking-widest font-bold"><Lock className="w-3.5 h-3.5" /> Staff Sign In</div>
          {loginError && <div className="mb-5 p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium font-sans border-l-4 border-rose-500">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-display font-medium text-primary uppercase">Email</label>
              <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" /><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary font-sans rounded-t" /></div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-display font-medium text-primary uppercase">Password</label>
              <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary font-sans rounded-t" /></div>
            </div>
            <button type="submit" disabled={loggingIn} className="w-full bg-primary hover:bg-secondary disabled:opacity-60 text-white py-3.5 cursor-pointer rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200">{loggingIn ? 'Signing in…' : 'Sign In'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="bg-white border-b border-cool-gray/10 px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo showTagline={false} markClassName="h-8 w-auto" wordmarkClassName="h-[16px] w-auto" />
          <span className="hidden sm:inline text-xs font-sans font-bold uppercase tracking-widest text-cool-gray border-l border-cool-gray/20 pl-3">Appointments Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-sans text-on-surface-variant hidden sm:inline">{user.email}</span>
          <button onClick={() => signOut(auth)} className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-rose-600 hover:text-rose-700 cursor-pointer"><LogOut className="w-3.5 h-3.5" /> Sign Out</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="font-serif text-2xl font-bold text-primary flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-secondary" /> Appointment Requests</h1>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${statusFilter === s ? 'bg-primary text-white' : 'bg-white border border-cool-gray/20 text-on-surface hover:border-primary'}`}>{s}</button>
            ))}
          </div>
        </div>

        {loadError && <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-800 text-sm font-medium font-sans border-l-4 border-rose-500">{loadError}</div>}
        {loadingAppointments && <p className="font-sans text-sm text-cool-gray">Loading appointments…</p>}
        {!loadingAppointments && !loadError && visibleAppointments.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-cool-gray border border-dashed border-cool-gray/20 font-sans">No {statusFilter === 'all' ? '' : statusFilter} appointments.</div>
        )}

        <div className="space-y-3">
          {visibleAppointments.map((a) => (
            <div key={a.docId} className="bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="font-sans text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-primary">{a.patientName}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLES[a.status] || STATUS_STYLES.pending}`}>{a.status}</span>
                </div>
                <p className="text-cool-gray font-medium mb-1.5">{getTreatmentName(a.treatmentId)}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary" /> {a.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" /> {a.timeSlot}</span>
                  <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:text-secondary"><Phone className="w-3.5 h-3.5 text-secondary" /> {a.phone}</a>
                  {a.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-secondary" /> {a.email}</span>}
                </div>
                {a.notes && <p className="flex items-start gap-1.5 mt-2 text-xs text-cool-gray italic max-w-lg"><FileText className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" /> {a.notes}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                {a.status !== 'confirmed' && (
                  <button disabled={updatingId === a.docId} onClick={() => handleStatusChange(a.docId, 'confirmed')} className="px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-sans font-bold cursor-pointer disabled:opacity-50">Confirm</button>
                )}
                {a.status !== 'completed' && (
                  <button disabled={updatingId === a.docId} onClick={() => handleStatusChange(a.docId, 'completed')} className="px-3.5 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-sans font-bold cursor-pointer disabled:opacity-50">Completed</button>
                )}
                {a.status !== 'cancelled' && (
                  <button disabled={updatingId === a.docId} onClick={() => handleStatusChange(a.docId, 'cancelled')} className="px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-sans font-bold cursor-pointer disabled:opacity-50">Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
