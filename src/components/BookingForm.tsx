import React, { useState, useEffect, useRef, useId } from 'react';
import { flushSync } from 'react-dom';
import { TREATMENTS, APPOINTMENT_SLOT_GROUPS, WHATSAPP_URL } from '../data';
import { Appointment, AppointmentStatus } from '../types';
import { Calendar, Clock, Check, Trash2, CalendarCheck, Phone, User, Activity, AlertCircle, MessageCircle, Loader2, CalendarX, ArrowRight } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot, setDoc, doc, Timestamp, updateDoc, writeBatch, getDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError, ensureAnonymousAuth } from '../firebase';
import { trackConversion, trackEvent, trackClarityEvent } from '../lib/analytics';
import { BOOKING_WINDOW_DAYS, slotToMinutes, holdIdFor, addDaysStr } from '../lib/booking';
import { isNewerBuildLive } from '../lib/appVersion';

interface BookingFormProps {
  preSelectedTreatmentId: string;
  // Changes on every treatment pick in the parent, even of the same treatment.
  preSelectNonce?: number;
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

// "2026-10-19" -> "Mon, 19 Oct 2026". The date carries no timezone, so it's
// formatted as UTC to keep the weekday from shifting.
function formatBookingDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const day = new Date(Date.UTC(y, m - 1, d));
  const part = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'UTC' }).format(day);
  return `${part({ weekday: 'short' })}, ${d} ${part({ month: 'short' })} ${y}`;
}

// "2026-10-20" -> { weekday: 'Tue', day: 20, month: 'Oct' } for the date strip.
function dayParts(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const day = new Date(Date.UTC(y, m - 1, d));
  const part = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'UTC' }).format(day);
  return { weekday: part({ weekday: 'short' }), day: d, month: part({ month: 'short' }) };
}

// Days offered as one-tap chips; later dates in the booking window are on the calendar.
const DATE_STRIP_DAYS = 14;

// What a patient sees for each status in "Your Bookings" -- staff-only
// outcomes like "no response" are worded as a next step, not a verdict.
const PATIENT_STATUS: Record<AppointmentStatus, { label: string; className: string }> = {
  pending: { label: 'Awaiting confirmation', className: 'bg-amber-50 text-amber-700' },
  confirmed: { label: 'Confirmed', className: 'bg-emerald-50 text-emerald-700' },
  rescheduled: { label: 'Rescheduled', className: 'bg-pink-50 text-pink-700' },
  completed: { label: 'Visited', className: 'bg-secondary/10 text-secondary' },
  no_show: { label: 'Missed', className: 'bg-orange-50 text-orange-700' },
  no_response: { label: 'Please call the clinic', className: 'bg-violet-50 text-violet-700' },
  cancelled: { label: 'Cancelled', className: 'bg-rose-50 text-rose-700' },
};

const CANCELLABLE_STATUSES: AppointmentStatus[] = ['pending', 'confirmed', 'rescheduled', 'no_response'];

// The mobile number field is never changed for the patient -- nothing typed,
// pasted or autofilled is removed or rewritten. These messages say exactly
// what to fix instead.
function mobileError(phone: string): string | undefined {
  if (!phone) return 'Enter a mobile number so we can reach you about this visit.';
  if (/^\s*\+/.test(phone)) return "Leave out the +91 at the start (it's already added) and enter just the 10-digit number.";
  if (/\D/.test(phone)) return 'Use digits only, without spaces, dashes or other symbols.';
  if (phone.length < 10) return `Enter all 10 digits of your mobile number (${phone.length} entered).`;
  if (phone.length === 11 && phone.startsWith('0')) return 'Leave out the 0 at the start and enter the 10-digit mobile number.';
  if (phone.length === 12 && phone.startsWith('91')) return 'This has 12 digits. If you typed 91 at the start, remove it (+91 is already added).';
  if (phone.length > 10) return `Mobile numbers have 10 digits; this has ${phone.length}. Please remove the extra digit${phone.length > 11 ? 's' : ''}.`;
  if (!/^[6-9]/.test(phone)) return 'Indian mobile numbers start with 6, 7, 8 or 9.';
  return undefined;
}

function emailError(email: string): string | undefined {
  const value = email.trim();
  return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Enter a valid email address, or leave this blank.' : undefined;
}

const isPermissionDenied = (err: unknown) => (err as { code?: string })?.code === 'permission-denied';
// Read fresh each time: the connection can drop while a booking is saving.
const isOffline = () => navigator.onLine === false;

type FieldKey = 'patientName' | 'phone' | 'email' | 'date' | 'timeSlot';
type FieldErrors = Partial<Record<FieldKey, string>>;
// The order the fields appear in, so the first error is the one nearest the top.
const FIELD_ORDER: FieldKey[] = ['date', 'timeSlot', 'patientName', 'phone', 'email'];

// seq gives each shown error a fresh node, so a repeat of the same message is announced again.
interface FormAlert { tone: 'error' | 'info'; text: string; contact?: boolean; refresh?: boolean; seq?: number }
interface Confirmation { id: string; name: string; treatmentId: string; date: string; timeSlot: string; confirmed: boolean; cancelled?: boolean }
type RevealTarget = FieldKey | 'alert' | 'restoreNote' | 'confirmation' | 'bookingsNotice';

// A booking that failed only because this tab was running an outdated build
// is kept here across the reload that fetches the current one. sessionStorage
// is per-tab, and the copy is removed as soon as it has been read back.
const DRAFT_KEY = 'neudental:bookingDraft';
const DRAFT_MAX_AGE_MS = 30 * 60 * 1000;
interface BookingDraft { patientName: string; phone: string; email: string; treatmentId: string; date: string; timeSlot: string; notes: string; savedAt: number }

// A usable draft is cleared by the component once restored (see below);
// an expired or unreadable one is removed here.
function readDraft(): BookingDraft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as BookingDraft;
    if (typeof draft?.savedAt === 'number' && Date.now() - draft.savedAt < DRAFT_MAX_AGE_MS) return draft;
  } catch { /* unreadable: drop it below */ }
  clearDraft();
  return null;
}

function clearDraft() {
  try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* storage unavailable */ }
}

function saveDraft(draft: Omit<BookingDraft, 'savedAt'>): boolean {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, savedAt: Date.now() }));
    return true;
  } catch {
    return false;
  }
}

// Brings a message or field into view and optionally moves focus there.
// Short targets are centred, clear of the sticky header; one too tall for
// the screen (the time-slot picker on a small phone) is lined up with its
// top just under the header (its scroll-mt) so its error text shows.
// 'instant' rather than 'auto': index.css sets html { scroll-behavior: smooth }.
function reveal(el: HTMLElement | null, focus: boolean) {
  if (!el) return;
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const tall = el.getBoundingClientRect().height > window.innerHeight - 160;
  el.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: tall ? 'start' : 'center' });
  if (focus) el.focus({ preventScroll: true });
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="flex items-start gap-1 font-sans text-xs font-medium text-rose-700 mt-1.5"><AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" aria-hidden="true" />{message}</p>;
}

const fieldClass = (invalid: boolean, padding = 'px-4') => `w-full ${padding} py-3 bg-white border ${invalid ? 'border-rose-500 focus:border-rose-600 focus:ring-rose-500/15' : 'border-[#CBD5E1] focus:border-secondary focus:ring-secondary/15'} focus:ring-4 outline-none text-base sm:text-sm text-primary transition-[border-color,box-shadow] font-sans rounded-xl`;
const labelClass = 'block text-xs font-sans font-bold tracking-[0.08em] uppercase text-primary mb-2';
const optionalClass = 'normal-case tracking-normal font-medium text-cool-gray';

export default function BookingForm({ preSelectedTreatmentId, preSelectNonce, onClose, bare = false }: BookingFormProps) {
  // Read once on mount; cleared in an effect so StrictMode's double render
  // can't drop it.
  const [restoredDraft] = useState(readDraft);
  const [patientName, setPatientName] = useState(restoredDraft?.patientName ?? '');
  const [phone, setPhone] = useState(restoredDraft?.phone ?? '');
  const [email, setEmail] = useState(restoredDraft?.email ?? '');
  const [treatmentId, setTreatmentId] = useState(restoredDraft?.treatmentId || preSelectedTreatmentId || TREATMENTS[0].id);
  const [date, setDate] = useState(restoredDraft?.date ?? '');
  const [timeSlot, setTimeSlot] = useState(restoredDraft ? restoredDraft.timeSlot : '10:00 AM');
  const [notes, setNotes] = useState(restoredDraft?.notes ?? '');
  const [userId, setUserId] = useState<string | null>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [myBookings, setMyBookings] = useState<Appointment[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formAlert, setFormAlert] = useState<FormAlert | null>(null);
  const [bookingsNotice, setBookingsNotice] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [revealRequest, setRevealRequest] = useState<{ target: RevealTarget; n: number } | null>(null);
  // Screen-reader announcement for an error on the field that already has
  // focus; shown only while that field's error stands.
  const [srError, setSrError] = useState<{ key: FieldKey; text: string } | null>(null);
  // Announces a result that isn't given focus (an always-present live region).
  const [srStatus, setSrStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  // After one reload to pick up a new build, don't offer another.
  const reloadedForUpdateRef = useRef(restoredDraft !== null);
  const [, forceTick] = useState(0);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [showCalendar, setShowCalendar] = useState(false);

  const ids = useId();
  const fieldId = (key: string) => `${ids}-${key}`;
  const errorId = (key: FieldKey) => `${ids}-${key}-error`;
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const bookingsNoticeRef = useRef<HTMLDivElement>(null);
  const bookingsRef = useRef<HTMLDivElement>(null);

  const revealNext = (target: RevealTarget) => setRevealRequest({ target, n: Date.now() });

  // A message appearing when the patient leaves a field pushes the fields
  // below it down. Show it only once the tap or click that moved focus has
  // finished, so that tap still lands on what the patient aimed at.
  const pointerDownRef = useRef(false);
  useEffect(() => {
    const down = () => { pointerDownRef.current = true; };
    const up = () => { pointerDownRef.current = false; };
    window.addEventListener('pointerdown', down, true);
    window.addEventListener('pointerup', up, true);
    window.addEventListener('pointercancel', up, true);
    return () => {
      window.removeEventListener('pointerdown', down, true);
      window.removeEventListener('pointerup', up, true);
      window.removeEventListener('pointercancel', up, true);
    };
  }, []);
  const afterPress = (fn: () => void) => {
    if (pointerDownRef.current) window.addEventListener('pointerup', () => setTimeout(fn), { once: true });
    else setTimeout(fn);
  };
  const showAlert = (alert: FormAlert) => { setFormAlert({ ...alert, seq: Date.now() }); revealNext('alert'); };
  const fieldElements = (): Record<FieldKey, HTMLElement | null> => ({ patientName: nameRef.current, phone: phoneRef.current, email: emailRef.current, date: dateRef.current, timeSlot: slotsRef.current });
  const clearFieldError = (key: FieldKey) => setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  // Scroll once the message or field has rendered, so the position accounts
  // for any error text that just appeared or disappeared above it.
  useEffect(() => {
    if (!revealRequest) return;
    const { target } = revealRequest;
    const fields = fieldElements();
    // Save errors leave focus on the Book button, ready for a retry.
    if (target === 'alert') reveal(alertRef.current, false);
    else if (target === 'restoreNote') reveal(alertRef.current, true);
    else if (target === 'confirmation') reveal(confirmationRef.current, true);
    else if (target === 'bookingsNotice') reveal(bookingsNoticeRef.current, true);
    else reveal(fields[target], true);
  }, [revealRequest]);

  // The parent's treatment pick is applied each time one is made. Its value
  // at mount is already in the initial state, where a restored draft wins.
  const appliedPickRef = useRef({ id: preSelectedTreatmentId, nonce: preSelectNonce });
  useEffect(() => {
    const last = appliedPickRef.current;
    if (!preSelectedTreatmentId || (preSelectedTreatmentId === last.id && preSelectNonce === last.nonce)) return;
    appliedPickRef.current = { id: preSelectedTreatmentId, nonce: preSelectNonce };
    setTreatmentId(preSelectedTreatmentId);
  }, [preSelectedTreatmentId, preSelectNonce]);

  useEffect(() => {
    if (!restoredDraft) return;
    clearDraft();
    setFormAlert({ tone: 'info', text: 'We updated the site while this page was open. Your details are still filled in, so just tap Book Appointment to confirm your slot.' });
    revealNext('restoreNote');
    // Images above the form may still be loading and push it down: look
    // again once they have, unless the patient has started scrolling,
    // tapping or typing by then.
    if (document.readyState === 'complete') return;
    const onLoad = () => revealNext('restoreNote');
    const userEvents = ['pointerdown', 'touchstart', 'wheel', 'keydown'] as const;
    const listen = { capture: true, passive: true } as const;
    const stop = () => {
      window.removeEventListener('load', onLoad);
      userEvents.forEach((type) => window.removeEventListener(type, stop, listen));
    };
    window.addEventListener('load', onLoad, { once: true });
    userEvents.forEach((type) => window.addEventListener(type, stop, listen));
    return stop;
  }, [restoredDraft]);

  // Re-render every minute so slots that just moved into the past grey out
  // live, instead of only updating on the next unrelated state change.
  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  // Booking retries sign-in itself, so a failure here only logs.
  useEffect(() => {
    ensureAnonymousAuth()
      .then((user) => setUserId(user.uid))
      .catch((error) => handleFirestoreError(error, OperationType.GET, 'auth'));
  }, []);

  useEffect(() => {
    if (!userId) return;
    setDbLoading(true);
    const q = query(collection(db, 'appointments'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    // Firestore shows a write locally before the server accepts it. A new
    // booking is listed only once saved, so a refused one never flashes up;
    // a change to a saved one (a cancel) still shows straight away.
    const savedIds = new Set<string>();
    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const bookings: Appointment[] = [];
      snapshot.forEach((docSnapshot) => {
        if (!docSnapshot.metadata.hasPendingWrites) savedIds.add(docSnapshot.id);
        else if (!savedIds.has(docSnapshot.id)) return;
        const data = docSnapshot.data();
        bookings.push({ id: docSnapshot.id, patientName: data.patientName || '', phone: data.phone || '', email: data.email || '', treatmentId: data.treatmentId || '', date: data.date || '', timeSlot: data.timeSlot || '', status: data.status || 'pending', notes: data.notes || '' });
      });
      setMyBookings(bookings);
      setDbLoading(false);
    }, (error) => { setDbLoading(false); handleFirestoreError(error, OperationType.LIST, 'appointments'); });
    return () => unsubscribe();
  }, [userId]);

  // Slots already taken on the chosen date. Until the slotHolds rules are
  // deployed the read is refused; then nothing is greyed out.
  useEffect(() => {
    setBookedSlots(new Set());
    if (!userId || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    const q = query(collection(db, 'slotHolds'), where('date', '==', date));
    // Ignore this visitor's own unsaved hold: while a booking is being saved
    // (or after it's refused) it would otherwise mark their chosen slot as
    // taken and clear the selection.
    return onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      setBookedSlots(new Set(snapshot.docs.filter((d) => !d.metadata.hasPendingWrites).map((d) => d.data().timeSlot as string)));
    }, (error) => {
      if (!isPermissionDenied(error)) handleFirestoreError(error, OperationType.LIST, 'slotHolds');
    });
  }, [userId, date]);

  const timeSlots = APPOINTMENT_SLOT_GROUPS;

  const istNow = getISTNow();
  const todayStr = istNow.dateStr; // YYYY-MM-DD IST, matches <input type="date">
  const isToday = date === todayStr;
  const maxDateStr = addDaysStr(todayStr, BOOKING_WINDOW_DAYS);
  const isSlotPast = (slot: string) => isToday && slotToMinutes(slot) <= istNow.minutesSinceMidnight;
  const isSlotBooked = (slot: string) => bookedSlots.has(slot);
  const stripDays = Array.from({ length: DATE_STRIP_DAYS }, (_, i) => addDaysStr(todayStr, i));
  // A restored draft can hold a date past the strip; show it on the calendar.
  const calendarOpen = showCalendar || (!!date && !stripDays.includes(date));
  const pickDate = (value: string) => { setDate(value); clearFieldError('date'); };

  // If the date changes (or the clock ticks past it), drop a selection that's
  // no longer bookable instead of silently submitting a past slot.
  useEffect(() => {
    if (timeSlot && (isSlotPast(timeSlot) || isSlotBooked(timeSlot))) setTimeSlot('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, istNow.dateStr, istNow.minutesSinceMidnight, bookedSlots]);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!patientName.trim()) errors.patientName = "Enter the patient's name.";
    errors.phone = mobileError(phone);
    errors.email = emailError(email);
    if (!date) errors.date = 'Choose a date for your visit.';
    else if (date < todayStr) errors.date = 'Choose today or a later date.';
    else if (date > maxDateStr) errors.date = `Appointments can be booked up to ${BOOKING_WINDOW_DAYS} days ahead. For a later date, please call +91 93423 67446.`;
    if (!timeSlot) errors.timeSlot = 'Choose a time for your visit.';
    else if (isSlotPast(timeSlot)) errors.timeSlot = 'That time has already passed. Please choose another.';
    else if (isSlotBooked(timeSlot)) errors.timeSlot = 'That time is already booked. Please choose another.';
    return errors;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    // A second tap while the first is still writing would create a second,
    // equally auto-confirmed booking (and count the Ads conversion twice).
    if (submittingRef.current) return;
    setFormAlert(null);
    const errors = validate();
    setFieldErrors(errors);
    const firstInvalid = FIELD_ORDER.find((key) => errors[key]);
    if (firstInvalid) {
      // Moving focus to the field reads its error out. If the patient is
      // already in that field (they pressed Go/Enter there), announce it.
      setSrError(null);
      if (fieldElements()[firstInvalid] === document.activeElement) {
        const announce = { key: firstInvalid, text: errors[firstInvalid] ?? '' };
        setTimeout(() => setSrError(announce), 50);
      }
      revealNext(firstInvalid);
      return;
    }
    if (isOffline()) {
      showAlert({ tone: 'error', text: "You're offline. Check your internet connection, then tap Book Appointment again.", contact: true });
      return;
    }
    // Bookings are only visible per browser, so this catches a repeat booking
    // from the same device, e.g. after the confirmation was missed.
    const existing = myBookings.find((b) => b.phone === phone && CANCELLABLE_STATUSES.includes(b.status)
      && (b.date > todayStr || (b.date === todayStr && slotToMinutes(b.timeSlot) > istNow.minutesSinceMidnight)));
    if (existing && !window.confirm(`This number already has an appointment on ${formatBookingDate(existing.date)} at ${existing.timeSlot}. Book another one as well?`)) return;
    submittingRef.current = true;
    setSubmitting(true);
    let reloading = false;
    // Which step failed, for the booking_error event.
    let stage = 'auth';
    try {
      const uid = userId ?? (await ensureAnonymousAuth()).uid;
      if (!userId) setUserId(uid);
      // Date.now() alone collides when two visitors book in the same millisecond.
      const docId = 'app_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      const ref = doc(db, 'appointments', docId);
      const holdRef = doc(db, 'slotHolds', holdIdFor(date, timeSlot));
      const booking = { id: docId, patientName: patientName.trim(), phone: phone.trim(), email: email.trim(), treatmentId, date, timeSlot, notes: notes.trim(), userId: uid, createdAt: Timestamp.now() };
      const autoConfirmation = { status: 'confirmed', confirmedAt: Timestamp.now(), confirmedBy: 'auto' };
      let confirmed = true;
      stage = 'batch';
      try {
        // The booking and its slot hold are saved together or not at all;
        // the hold can't be created if someone else already has the slot.
        const batch = writeBatch(db);
        batch.set(ref, { ...booking, ...autoConfirmation });
        batch.set(holdRef, { date, timeSlot, appointmentId: docId });
        await batch.commit();
      } catch (err) {
        if (!isPermissionDenied(err)) throw err;
        stage = 'hold_check';
        let slotTaken = false;
        let holdRulesLive = true;
        try {
          slotTaken = (await getDoc(holdRef)).exists();
        } catch (readErr) {
          if (!isPermissionDenied(readErr)) throw readErr;
          holdRulesLive = false;
        }
        if (slotTaken) {
          setTimeSlot('');
          setFieldErrors({ timeSlot: `Sorry, ${timeSlot} on ${formatBookingDate(date)} was just booked by someone else. Please choose another time.` });
          revealNext('timeSlot');
          return;
        }
        if (holdRulesLive) throw err;
        // Firestore rules are published separately from the site. Until the
        // copy in firestore.rules (with slotHolds) is live, book the way the
        // previous rules accept: confirmed on create, or else pending and
        // confirmed straight after.
        stage = 'legacy_create';
        try {
          await setDoc(ref, { ...booking, ...autoConfirmation });
        } catch (legacyErr) {
          if (!isPermissionDenied(legacyErr)) throw legacyErr;
          stage = 'legacy_pending';
          await setDoc(ref, { ...booking, status: 'pending' });
          try {
            await updateDoc(ref, autoConfirmation);
          } catch (confirmErr) {
            confirmed = false;
            handleFirestoreError(confirmErr, OperationType.UPDATE, 'appointments');
          }
        }
      }
      setConfirmation({ id: docId, name: patientName.trim(), treatmentId, date, timeSlot, confirmed });
      revealNext('confirmation');
      trackConversion('generate_lead', 'booking', { treatment_id: treatmentId });
      setPatientName(''); setPhone(''); setEmail(''); setNotes(''); setTimeSlot('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'appointments');
      const code = (err as { code?: string })?.code || 'unknown';
      // A tab opened before the latest release can be running booking code
      // that the current Firestore rules refuse. Nothing was saved, so load
      // the new build and keep what the patient typed.
      const newerBuild = !reloadedForUpdateRef.current && await isNewerBuildLive();
      trackEvent('booking_error', { error_code: code, stage, newer_build: newerBuild });
      trackClarityEvent('booking_error');
      if (newerBuild && saveDraft({ patientName, phone, email, treatmentId, date, timeSlot, notes })) {
        reloading = true;
        setFormAlert({ tone: 'info', text: 'Updating this page to the latest version…' });
        window.location.reload();
      } else if (newerBuild) {
        showAlert({ tone: 'error', text: 'This page is out of date. Please refresh it and book again.', refresh: true, contact: true });
      } else if (code === 'unavailable' || code.includes('network') || isOffline()) {
        showAlert({ tone: 'error', text: "We couldn't reach our booking system. Check your internet connection and try again.", contact: true });
      } else {
        showAlert({ tone: 'error', text: "We couldn't save your booking. Please try again in a moment.", contact: true });
      }
    } finally {
      // Keep ignoring taps while the page reloads, so a second tap can't book twice.
      if (!reloading) {
        submittingRef.current = false;
        setSubmitting(false);
      }
    }
  };

  // Picking a time clears the error above the grid, which moves the grid up
  // under the patient's finger; scroll by the same amount so the tapped slot
  // stays put and a second tap doesn't land on a different time.
  const pickSlot = (slot: string, button: HTMLElement) => {
    const before = button.getBoundingClientRect().top;
    flushSync(() => { setTimeSlot(slot); clearFieldError('timeSlot'); });
    const shift = button.getBoundingClientRect().top - before;
    if (shift) window.scrollBy({ top: shift, behavior: 'instant' });
  };

  const handleBookAnother = () => {
    setConfirmation(null);
    setFieldErrors({});
    setFormAlert(null);
    revealNext('patientName');
  };

  const handleCancelBooking = async (booking: Appointment) => {
    if (!userId) return;
    if (!window.confirm(`Cancel your appointment on ${formatBookingDate(booking.date)} at ${booking.timeSlot}?`)) return;
    setBookingsNotice(null);
    setSrStatus('');
    // On a slow connection the patient may tap or scroll elsewhere before
    // this finishes (iOS never focuses a tapped button, so focus can't tell).
    let movedOn = false;
    const startY = window.scrollY;
    const onUserAction = (e: Event) => { if (!bookingsRef.current?.contains(e.target as Node)) movedOn = true; };
    const userEvents = ['pointerdown', 'keydown'] as const;
    const listen = { capture: true, passive: true } as const;
    userEvents.forEach((type) => window.addEventListener(type, onUserAction, listen));
    let notice: { tone: 'error' | 'success'; text: string };
    try {
      const ref = doc(db, 'appointments', booking.id);
      const cancellation = { status: 'cancelled', statusUpdatedAt: Timestamp.now() };
      // Free the slot in the same write when this booking holds it. Bookings
      // made before slot holds (or moved by staff) may not hold one.
      const holdRef = doc(db, 'slotHolds', holdIdFor(booking.date, booking.timeSlot));
      let holdsSlot = false;
      try {
        const hold = await getDoc(holdRef);
        holdsSlot = hold.exists() && hold.data().appointmentId === booking.id;
      } catch (readErr) {
        if (!isPermissionDenied(readErr)) throw readErr;
      }
      if (holdsSlot) {
        const batch = writeBatch(db);
        batch.update(ref, cancellation);
        batch.delete(holdRef);
        await batch.commit();
      } else {
        await updateDoc(ref, cancellation);
      }
      notice = { tone: 'success', text: `Your appointment on ${formatBookingDate(booking.date)} at ${booking.timeSlot} has been cancelled.` };
      setConfirmation((c) => (c && c.id === booking.id ? { ...c, cancelled: true } : c));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'appointments');
      notice = { tone: 'error', text: 'Could not cancel this appointment. Please call +91 93423 67446.' };
    } finally {
      userEvents.forEach((type) => window.removeEventListener(type, onUserAction, listen));
    }
    setBookingsNotice(notice);
    // The cancel button just disappeared: move focus to the result if the
    // patient is still here; otherwise just announce it, without moving them.
    const active = document.activeElement;
    const stayed = !movedOn && Math.abs(window.scrollY - startY) < window.innerHeight / 2;
    if (bookingsRef.current?.contains(active) || (stayed && (!active || active === document.body))) revealNext('bookingsNotice');
    else setTimeout(() => setSrStatus(notice.text), 50);
  };

  const getTreatmentName = (id: string) => TREATMENTS.find(t => t.id === id)?.name || 'General Check-Up';

  const ariaFor = (key: FieldKey) => ({ 'aria-invalid': fieldErrors[key] ? true : undefined, 'aria-describedby': fieldErrors[key] ? errorId(key) : undefined });

  return (
    <div className={bare ? 'p-6 md:p-10' : 'bg-white rounded-3xl p-6 md:p-8 border border-cool-gray/10 premium-shadow'}>
      <p className="sr-only" role="status">{srStatus}</p>
      {/* The home page's booking section has its own heading. */}
      {!bare && (
        <>
          <div className="flex items-center gap-2 mb-6"><CalendarCheck className="w-6 h-6 text-secondary" /><h3 className="font-serif font-bold text-xl md:text-2xl text-primary">Dentist Appointment Booking</h3></div>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">Book your appointment with Neudental instantly. We adhere rigidly to schedule times to eliminate clinic waiting lines.</p>
        </>
      )}
      {confirmation ? (
        <div ref={confirmationRef} tabIndex={-1} className={`scroll-mt-24 outline-none rounded-2xl border p-6 text-center font-sans ${confirmation.cancelled ? 'border-cool-gray/15 bg-surface-alt' : 'border-emerald-200 bg-emerald-50/60'}`}>
          <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${confirmation.cancelled ? 'bg-rose-50' : 'bg-emerald-100'}`}>{confirmation.cancelled ? <CalendarX className="w-6 h-6 text-rose-600" aria-hidden="true" /> : <Check className="w-6 h-6 text-emerald-700" aria-hidden="true" />}</div>
          <h4 className="font-serif font-bold text-lg text-primary mt-3">{confirmation.cancelled ? 'Appointment cancelled' : confirmation.confirmed ? 'Appointment confirmed' : 'Booking received'}</h4>
          <p className="text-xs text-on-surface-variant mt-1">{confirmation.cancelled ? `Your appointment on ${formatBookingDate(confirmation.date)} at ${confirmation.timeSlot} has been cancelled.` : confirmation.confirmed ? `Thank you, ${confirmation.name}. We look forward to seeing you.` : `Thank you, ${confirmation.name}. Our team will confirm it by phone or WhatsApp shortly.`}</p>
          {!confirmation.cancelled && (
            <>
              <dl className="mt-5 bg-white rounded-xl border border-emerald-100 p-4 text-left text-xs space-y-2.5">
                <div className="flex items-center gap-2.5"><dt className="sr-only">Date</dt><Calendar className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" /><dd className="font-bold text-primary">{formatBookingDate(confirmation.date)}</dd></div>
                <div className="flex items-center gap-2.5"><dt className="sr-only">Time</dt><Clock className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" /><dd className="font-bold text-primary">{confirmation.timeSlot}</dd></div>
                <div className="flex items-center gap-2.5"><dt className="sr-only">Treatment</dt><Activity className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" /><dd className="text-on-surface-variant">{getTreatmentName(confirmation.treatmentId)}</dd></div>
              </dl>
              {/* A call to change a booking isn't a new lead, so this reports to GA4 only, not as an Ads conversion. */}
              <p className="text-[11px] text-cool-gray mt-4 leading-relaxed">Need to change it? Call <a href="tel:+919342367446" onClick={() => trackEvent('call_click', { link_location: 'booking_confirmation' })} className="font-bold text-secondary whitespace-nowrap">+91 93423 67446</a>, or cancel it under Your Bookings below.</p>
            </>
          )}
          <button type="button" onClick={handleBookAnother} className="mt-5 w-full sm:w-auto inline-flex items-center justify-center min-h-11 px-5 py-3 rounded-xl border border-primary/15 bg-white hover:border-secondary text-primary font-sans text-xs uppercase tracking-wider font-bold cursor-pointer transition-colors">Book another appointment</button>
        </div>
      ) : (
      <form onSubmit={handleBooking} noValidate className="space-y-6">
        <div><label htmlFor={fieldId('treatment')} className={labelClass}>Treatment</label><select id={fieldId('treatment')} value={treatmentId} onChange={(e) => setTreatmentId(e.target.value)} className={`${fieldClass(false)} cursor-pointer`}>{TREATMENTS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>

        <div ref={dateRef} tabIndex={-1} role="group" aria-labelledby={fieldId('date-label')} aria-describedby={fieldErrors.date ? errorId('date') : undefined} className="outline-none scroll-mt-24">
          <span id={fieldId('date-label')} className={labelClass}>Date</span>
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {stripDays.map((d, i) => {
              const parts = dayParts(d);
              const on = d === date;
              return (
                <button
                  type="button"
                  key={d}
                  aria-pressed={on}
                  aria-label={formatBookingDate(d)}
                  onClick={() => pickDate(d)}
                  className={`flex flex-col items-center gap-0.5 py-2 rounded-xl border font-sans cursor-pointer transition-colors ${on ? 'bg-primary border-primary text-white' : 'bg-white border-[#E2E8F0] text-primary hover:border-secondary'}`}
                >
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase opacity-80">{i === 0 ? 'Today' : parts.weekday}</span>
                  <span className="font-display text-lg sm:text-xl font-bold leading-tight">{parts.day}</span>
                  <span className="text-[10px] opacity-70">{parts.month}</span>
                </button>
              );
            })}
          </div>
          {calendarOpen ? (
            <div className="mt-3">
              <label htmlFor={fieldId('date')} className="sr-only">Pick a later date</label>
              <input id={fieldId('date')} type="date" min={todayStr} max={maxDateStr} value={date} onChange={(e) => pickDate(e.target.value)} aria-invalid={fieldErrors.date ? true : undefined} className={fieldClass(!!fieldErrors.date)} />
            </div>
          ) : (
            <button type="button" onClick={() => setShowCalendar(true)} className="mt-2 min-h-11 font-sans text-[13px] font-semibold text-secondary hover:text-primary cursor-pointer">Need a later date? Pick one up to {BOOKING_WINDOW_DAYS} days ahead</button>
          )}
          <FieldError id={errorId('date')} message={fieldErrors.date} />
        </div>

        <div ref={slotsRef} tabIndex={-1} role="group" aria-labelledby={fieldId('slots-label')} aria-describedby={fieldErrors.timeSlot ? errorId('timeSlot') : undefined} className="outline-none scroll-mt-24">
          <span id={fieldId('slots-label')} className={labelClass}>Time <span className={optionalClass}>· one patient per slot</span></span>
          <FieldError id={errorId('timeSlot')} message={fieldErrors.timeSlot} />
          <div className={`mt-1 flex flex-col gap-3 ${fieldErrors.timeSlot ? 'p-3 rounded-xl border border-rose-300' : ''}`}>
            {timeSlots.map((group) => (
              <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <span className="sm:w-20 shrink-0 sm:pt-3 font-sans text-[13px] font-semibold text-on-surface-variant">{group.label.split(' ')[0]}</span>
                <div className="flex-1 grid grid-cols-3 min-[420px]:grid-cols-4 gap-2">
                  {group.times.map((slot) => {
                    const past = isSlotPast(slot);
                    const booked = !past && isSlotBooked(slot);
                    const disabled = past || booked;
                    return <button type="button" key={slot} disabled={disabled} aria-pressed={timeSlot === slot} title={past ? 'This time has already passed today' : booked ? 'This time is already booked' : undefined} aria-label={booked ? `${slot}, already booked` : undefined} onClick={(e) => pickSlot(slot, e.currentTarget)} className={`min-h-11 px-1 whitespace-nowrap rounded-xl border font-sans text-[13px] font-semibold transition-colors ${disabled ? 'bg-[#F1F5F9] border-[#E2E8F0] text-[#94A3B8] line-through cursor-not-allowed' : timeSlot === slot ? 'bg-[#00fff2] border-[#00D4C9] text-primary cursor-pointer' : 'bg-white border-[#E2E8F0] hover:border-secondary text-primary cursor-pointer'}`}>{slot}</button>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor={fieldId('name')} className={labelClass}>Patient name</label><div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" /><input ref={nameRef} id={fieldId('name')} type="text" autoComplete="name" placeholder="Full name" maxLength={100} value={patientName} onChange={(e) => { setPatientName(e.target.value); clearFieldError('patientName'); }} {...ariaFor('patientName')} className={fieldClass(!!fieldErrors.patientName, 'pl-10 pr-4')} /></div><FieldError id={errorId('patientName')} message={fieldErrors.patientName} /></div>
          <div><label htmlFor={fieldId('phone')} className={labelClass}>Mobile number<span className="sr-only"> (10 digits, +91 is already added)</span></label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" /><span aria-hidden="true" className="absolute left-10 top-1/2 -translate-y-1/2 font-sans text-base sm:text-sm text-primary/70 pointer-events-none">+91</span><input ref={phoneRef} id={fieldId('phone')} type="tel" autoComplete="tel-national" placeholder="9876543210" inputMode="numeric" value={phone} onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }} onBlur={() => { if (phone) afterPress(() => setFieldErrors((prev) => ({ ...prev, phone: mobileError(phone) }))); }} {...ariaFor('phone')} className={fieldClass(!!fieldErrors.phone, 'pl-[4.75rem] pr-4')} /></div><FieldError id={errorId('phone')} message={fieldErrors.phone} /></div>
          <div><label htmlFor={fieldId('email')} className={labelClass}>Email <span className={optionalClass}>(optional)</span></label><input ref={emailRef} id={fieldId('email')} type="email" autoComplete="email" placeholder="you@example.com" maxLength={200} value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }} onBlur={() => afterPress(() => setFieldErrors((prev) => ({ ...prev, email: emailError(email) })))} {...ariaFor('email')} className={fieldClass(!!fieldErrors.email)} /><FieldError id={errorId('email')} message={fieldErrors.email} /></div>
          <div><label htmlFor={fieldId('notes')} className={labelClass}>Notes <span className={optionalClass}>(optional)</span></label><input id={fieldId('notes')} type="text" placeholder="Symptoms or anything we should know" maxLength={2000} value={notes} onChange={(e) => setNotes(e.target.value)} className={fieldClass(false)} /></div>
        </div>
        <p className="sr-only" aria-live="assertive">{srError && fieldErrors[srError.key] ? srError.text : ''}</p>
        {formAlert && (
          <div key={formAlert.seq ?? 'note'} ref={alertRef} tabIndex={-1} role={formAlert.tone === 'error' ? 'alert' : 'status'} className={`scroll-mt-24 outline-none p-4 rounded-xl text-xs font-medium font-sans border-l-4 ${formAlert.tone === 'error' ? 'bg-rose-50 text-rose-800 border-rose-500' : 'bg-secondary/5 text-primary border-secondary'}`}>
            <p>{formAlert.text}</p>
            {formAlert.refresh && <button type="button" onClick={() => window.location.reload()} className="mt-3 min-h-11 px-5 rounded-lg bg-primary hover:bg-secondary text-white text-[11px] font-bold uppercase tracking-wider cursor-pointer">Refresh page</button>}
            {formAlert.contact && (
              <div className="mt-3">
                <p className="text-rose-800/80">Or book directly with the clinic on <span className="whitespace-nowrap">+91 93423 67446</span>.</p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <a href="tel:+919342367446" aria-label="Call +91 93423 67446" onClick={() => trackConversion('call_click', 'call', { link_location: 'booking_error' })} className="inline-flex items-center justify-center gap-1.5 min-h-11 px-4 rounded-lg bg-white border border-rose-200 text-primary font-bold whitespace-nowrap"><Phone className="w-3.5 h-3.5" aria-hidden="true" /> Call</a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: 'booking_error' })} className="inline-flex items-center justify-center gap-1.5 min-h-11 px-4 rounded-lg bg-white border border-rose-200 text-primary font-bold whitespace-nowrap"><MessageCircle className="w-3.5 h-3.5" aria-hidden="true" /> WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="space-y-3">
          <button type="submit" aria-disabled={submitting} aria-busy={submitting} className="w-full inline-flex items-center justify-center gap-2.5 min-h-14 px-4 bg-primary hover:bg-secondary aria-disabled:opacity-60 aria-disabled:cursor-wait text-white cursor-pointer rounded-2xl font-sans text-sm font-bold transition-colors duration-200">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Booking…</> : <>Book appointment{date && timeSlot ? <span className="font-medium text-white/80">· {dayParts(date).weekday} {dayParts(date).day} {dayParts(date).month}, {timeSlot}</span> : null}<ArrowRight className="w-4 h-4 text-[#00fff2]" aria-hidden="true" /></>}
          </button>
          <p className="font-sans text-[11px] text-cool-gray leading-relaxed">By booking, you agree that neudental may call or WhatsApp you about this appointment, and use the details you share here, including any notes about symptoms, only to arrange and provide your dental care.</p>
        </div>
      </form>
      )}
      {myBookings.length > 0 && (
        <div ref={bookingsRef} className="mt-12 pt-8 border-t border-cool-gray/10">
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-wider text-primary">Your Bookings ({myBookings.length})</span></div>
          {bookingsNotice && <div ref={bookingsNoticeRef} tabIndex={-1} className={`scroll-mt-24 outline-none mb-4 p-3 rounded-xl text-xs font-medium font-sans border-l-4 ${bookingsNotice.tone === 'error' ? 'bg-rose-50 text-rose-800 border-rose-500' : 'bg-emerald-50 text-emerald-800 border-emerald-500'}`}>{bookingsNotice.text}</div>}
          <div className="space-y-3">{myBookings.map((booking) => {
            const status = PATIENT_STATUS[booking.status] || PATIENT_STATUS.confirmed;
            // Once the slot has started, staff record what happened instead.
            const slotNotStarted = booking.date > todayStr || (booking.date === todayStr && slotToMinutes(booking.timeSlot) > istNow.minutesSinceMidnight);
            const canCancel = CANCELLABLE_STATUSES.includes(booking.status) && slotNotStarted;
            return (
            <div key={booking.id} className="p-4 rounded-xl bg-surface border border-cool-gray/10 flex items-center justify-between gap-4">
              <div className="font-sans text-xs leading-relaxed"><div className="flex flex-wrap items-center gap-2"><p className="font-bold text-primary">{booking.patientName}</p><span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${status.className}`}>{status.label}</span></div><p className="text-cool-gray font-medium">{getTreatmentName(booking.treatmentId)}</p><div className="flex items-center gap-3 text-[11px] text-cool-gray font-bold mt-1.5"><span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-secondary" /> {formatBookingDate(booking.date)}</span><span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" /> {booking.timeSlot}</span></div></div>
              {canCancel && <button onClick={() => handleCancelBooking(booking)} className="w-11 h-11 flex items-center justify-center text-cool-gray hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer" title="Cancel slot" aria-label={`Cancel appointment on ${formatBookingDate(booking.date)} at ${booking.timeSlot}`}><Trash2 className="w-4.5 h-4.5" /></button>}
            </div>
            );
          })}</div>
        </div>
      )}
    </div>
  );
}
