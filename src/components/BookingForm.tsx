import React, { useState, useEffect } from 'react';
import { TREATMENTS } from '../data';
import { Appointment } from '../types';
import { Calendar, Clock, Sparkles, Check, Trash2, CalendarCheck, Phone, User, Activity } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot, setDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError, ensureAnonymousAuth } from '../firebase';
import { trackEvent } from '../lib/analytics';

interface BookingFormProps {
  preSelectedTreatmentId: string;
  onClose?: () => void;
  bare?: boolean;
}

// The clinic operates in India, so "today" and "past slot" must be judged in
// IST regardless of the visitor's own browser/OS timezone.
function getISTNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const map: Record<string, string> = {};
  parts.forEach((p) => { map[p.type] = p.value; });
  const hour = map.hour === '24' ? 0 : parseInt(map.hour, 10);
  return { dateStr: `${map.year}-${map.month}-${map.day}`, minutesSinceMidnight: hour * 60 + parseInt(map.minute, 10) };
}

function slotToMinutes(slot: string): number {
  const [time, meridiem] = slot.split(' ');
  const [hStr, mStr] = time.split(':');
  let h = parseInt(hStr, 10);
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return h * 60 + parseInt(mStr, 10);
}

export default function BookingForm({ preSelectedTreatmentId, onClose, bare = false }: BookingFormProps) {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatmentId, setTreatmentId] = useState(preSelectedTreatmentId || TREATMENTS[0].id);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [myBookings, setMyBookings] = useState<Appointment[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [, forceTick] = useState(0);

  useEffect(() => { if (preSelectedTreatmentId) setTreatmentId(preSelectedTreatmentId); }, [preSelectedTreatmentId]);

  // Re-render every minute so slots that just moved into the past grey out
  // live, instead of only updating on the next unrelated state change.
  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    ensureAnonymousAuth()
      .then((user) => setUserId(user.uid))
      .catch((error) => {
        handleFirestoreError(error, OperationType.GET, 'auth');
        setErrorMsg('Could not establish a secure session. Please refresh and try again.');
      });
  }, []);

  useEffect(() => {
    if (!userId) return;
    setDbLoading(true);
    const q = query(collection(db, 'appointments'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookings: Appointment[] = [];
      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        bookings.push({ id: data.id, patientName: data.patientName || '', phone: data.phone || '', email: data.email || '', treatmentId: data.treatmentId || '', date: data.date || '', timeSlot: data.timeSlot || '', status: data.status || 'pending', notes: data.notes || '' });
      });
      setMyBookings(bookings);
      setDbLoading(false);
    }, (error) => { setDbLoading(false); handleFirestoreError(error, OperationType.LIST, 'appointments'); });
    return () => unsubscribe();
  }, [userId]);

  const timeSlots = [
    { label: 'Morning Slots (10:00 AM - 1:30 PM)', times: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'] },
    { label: 'Evening Slots (5:00 PM - 9:30 PM)', times: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'] }
  ];

  const istNow = getISTNow();
  const todayStr = istNow.dateStr; // YYYY-MM-DD IST, matches <input type="date">
  const isToday = date === todayStr;
  const isSlotPast = (slot: string) => isToday && slotToMinutes(slot) <= istNow.minutesSinceMidnight;

  // If the date changes (or the clock ticks past it), drop a selection that's
  // no longer bookable instead of silently submitting a past slot.
  useEffect(() => {
    if (timeSlot && isSlotPast(timeSlot)) setTimeSlot('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, istNow.dateStr, istNow.minutesSinceMidnight]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!userId) { setErrorMsg('Session establishing. Please try again.'); return; }
    if (!patientName.trim()) { setErrorMsg('Patient Name is required.'); return; }
    if (!phone.trim() || phone.length < 10) { setErrorMsg('Valid 10-digit mobile number is required.'); return; }
    if (!date) { setErrorMsg('Please select a valid treatment date.'); return; }
    if (date < todayStr) { setErrorMsg('Please select a future appointment date.'); return; }
    if (!timeSlot) { setErrorMsg('Please select an available time slot.'); return; }
    if (isSlotPast(timeSlot)) { setErrorMsg('That time slot has already passed. Please choose another.'); return; }
    const selectedDateObj = new Date(date);
    const dayOfWeek = selectedDateObj.getDay();
    if (dayOfWeek === 0 && timeSlots[1].times.includes(timeSlot)) { setErrorMsg('neudental evening sessions are CLOSED on Sundays. Please select a morning slot.'); return; }
    const docId = 'app_' + Date.now();
    try {
      await setDoc(doc(db, 'appointments', docId), { id: docId, patientName: patientName.trim(), phone: phone.trim(), email: email.trim(), treatmentId, date, timeSlot, status: 'pending', notes: notes.trim(), userId, createdAt: Timestamp.now() });
      setSuccessMsg(`Slot requested for ${date} at ${timeSlot}, ${patientName}. Our team will confirm shortly by phone or WhatsApp.`);
      trackEvent('generate_lead', { treatment_id: treatmentId });
      setPatientName(''); setPhone(''); setEmail(''); setNotes('');
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'appointments'); setErrorMsg('Could not register your slot. Please try again.'); }
  };

  const handleCancelBooking = async (id: string) => {
    if (!userId) return;
    try { await updateDoc(doc(db, 'appointments', id), { status: 'cancelled' }); setSuccessMsg('Your slot has been canceled.'); } catch (err) { setErrorMsg('Could not cancel slot.'); }
  };

  const getTreatmentName = (id: string) => TREATMENTS.find(t => t.id === id)?.name || 'General Check-Up';

  return (
    <div className={bare ? 'p-6 md:p-8 lg:p-10' : 'bg-white rounded-3xl p-6 md:p-8 border border-cool-gray/10 premium-shadow'}>
      <div className="flex items-center gap-2 mb-6"><CalendarCheck className="w-6 h-6 text-secondary" /><h3 className="font-serif font-bold text-xl md:text-2xl text-primary">Dentist Appointment Booking</h3></div>
      <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">Book your appointment with Neudental instantly. We adhere rigidly to schedule times to eliminate clinic waiting lines.</p>
      {successMsg && <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium font-sans border-l-4 border-emerald-500">{successMsg}</div>}
      {errorMsg && <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium font-sans border-l-4 border-rose-500">{errorMsg}</div>}
      <form onSubmit={handleBooking} className="space-y-5">
        <div className="space-y-1"><label className="text-xs font-display font-medium text-primary uppercase">Patient Name</label><div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" /><input type="text" placeholder="E.g., Jayakumar" required value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary transition-colors font-sans rounded-t" /></div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1"><label className="text-xs font-display font-medium text-primary uppercase">Mobile Number</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" /><input type="tel" placeholder="+91 9876543210" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary transition-colors font-sans rounded-t" /></div></div>
          <div className="space-y-1"><label className="text-xs font-display font-medium text-primary uppercase">Email (Optional)</label><input type="email" placeholder="contact@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary transition-colors font-sans rounded-t" /></div>
        </div>
        <div className="space-y-1"><label className="text-xs font-display font-medium text-primary uppercase">Target Treatment Course</label><select value={treatmentId} onChange={(e) => setTreatmentId(e.target.value)} className="w-full px-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary font-sans rounded-t">{TREATMENTS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div className="space-y-1"><label className="text-xs font-display font-medium text-primary uppercase">Appointment Date</label><input type="date" required min={todayStr} value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary font-sans rounded-t" /></div>
        <div className="space-y-2"><label className="text-xs font-display font-medium text-primary uppercase block">Select Preferred Hour</label><div className="space-y-3">{timeSlots.map((group) => (<div key={group.label} className="bg-[#F8FAFC] p-3 rounded-xl border border-cool-gray/5"><span className="text-[10px] text-cool-gray uppercase font-bold tracking-wider block mb-2">{group.label}</span><div className="flex flex-wrap gap-1.5">{group.times.map((slot) => { const disabled = isSlotPast(slot); return <button type="button" key={slot} disabled={disabled} title={disabled ? 'This time has already passed today' : undefined} onClick={() => setTimeSlot(slot)} className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold transition-all ${disabled ? 'bg-cool-gray/5 border border-cool-gray/10 text-cool-gray/50 line-through cursor-not-allowed' : timeSlot === slot ? 'bg-secondary text-white shadow-md cursor-pointer' : 'bg-white border border-cool-gray/10 hover:border-cool-gray/30 text-on-surface cursor-pointer'}`}>{slot}</button>; })}</div></div>))}</div></div>
        <div className="space-y-1"><label className="text-xs font-display font-medium text-primary uppercase">Notes (Optional)</label><textarea placeholder="Symptoms or additional notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-3 bg-[#F8FAFC] border-0 border-b-2 border-cool-gray/20 focus:border-secondary focus:ring-0 outline-none text-sm text-primary font-sans rounded-t resize-none" /></div>
        <button type="submit" className="w-full bg-primary hover:bg-secondary text-white py-4 cursor-pointer rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200">Book Appointment</button>
      </form>
      {myBookings.length > 0 && (
        <div className="mt-12 pt-8 border-t border-cool-gray/10">
          <div className="flex items-center justify-between mb-4"><span className="text-xs font-bold uppercase tracking-wider text-primary">Your Bookings ({myBookings.length})</span><span className="text-[10px] text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full font-bold">Pending clinic confirmation</span></div>
          <div className="space-y-3">{myBookings.map((booking) => (
            <div key={booking.id} className="p-4 rounded-xl bg-surface border border-cool-gray/10 flex items-center justify-between gap-4">
              <div className="font-sans text-xs leading-relaxed"><p className="font-bold text-primary">{booking.patientName}</p><p className="text-cool-gray font-medium">{getTreatmentName(booking.treatmentId)}</p><div className="flex items-center gap-3 text-[11px] text-cool-gray font-bold mt-1.5"><span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary" /> {booking.date}</span><span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" /> {booking.timeSlot}</span></div></div>
              <button onClick={() => handleCancelBooking(booking.id)} className="p-2 text-cool-gray hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer" title="Cancel slot"><Trash2 className="w-4.5 h-4.5" /></button>
            </div>
          ))}</div>
        </div>
      )}
    </div>
  );
}
