// neudental v1 - AdminView: staff dashboard/CRM at /admin. Access is gated by
// a real Firebase Auth login (not the anonymous session patients get) plus a
// matching /admins/{uid} document in Firestore -- see firestore.rules.
// This file is the shell (auth + single Firestore subscription + tab switch);
// each tab's own UI lives in ./admin/.
import React, { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { LogOut, Lock, Mail, ShieldCheck, RefreshCw, LayoutDashboard, CalendarDays, ClipboardList, Users } from 'lucide-react';
import { auth, db, OperationType, handleFirestoreError } from '../firebase';
import BrandLogo from './BrandLogo';
import { AppointmentRecord } from './admin/adminShared';
import AdminDashboardTab from './admin/AdminDashboardTab';
import AdminCalendarTab from './admin/AdminCalendarTab';
import AdminAppointmentsTab from './admin/AdminAppointmentsTab';
import AdminPatientsTab from './admin/AdminPatientsTab';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays },
  { key: 'appointments', label: 'Appointments', icon: ClipboardList },
  { key: 'patients', label: 'Patients', icon: Users },
] as const;

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
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('dashboard');

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
            tags: Array.isArray(data.tags) ? data.tags : [],
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null,
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

  const handleToggleTag = async (docId: string, tag: string, currentTags: string[]) => {
    const nextTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag];
    try {
      await updateDoc(doc(db, 'appointments', docId), { tags: nextTags });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'appointments');
    }
  };

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
          <span className="hidden sm:inline text-xs font-sans font-bold uppercase tracking-widest text-cool-gray border-l border-cool-gray/20 pl-3">Appointments CRM</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-sans text-on-surface-variant hidden sm:inline">{user.email}</span>
          <button onClick={() => signOut(auth)} className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-rose-600 hover:text-rose-700 cursor-pointer"><LogOut className="w-3.5 h-3.5" /> Sign Out</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="font-serif text-2xl font-bold text-primary flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-secondary" /> Appointments</h1>
          <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-full border border-cool-gray/10 premium-shadow">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${tab === key ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-alt'}`}>
                <Icon className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>

        {loadError && <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-800 text-sm font-medium font-sans border-l-4 border-rose-500">{loadError}</div>}
        {loadingAppointments && <p className="font-sans text-sm text-cool-gray">Loading appointments…</p>}

        {!loadingAppointments && !loadError && (
          <>
            {tab === 'dashboard' && <AdminDashboardTab appointments={appointments} />}
            {tab === 'calendar' && <AdminCalendarTab appointments={appointments} onStatusChange={handleStatusChange} updatingId={updatingId} />}
            {tab === 'appointments' && <AdminAppointmentsTab appointments={appointments} onStatusChange={handleStatusChange} onToggleTag={handleToggleTag} updatingId={updatingId} />}
            {tab === 'patients' && <AdminPatientsTab appointments={appointments} />}
          </>
        )}
      </main>
    </div>
  );
}
