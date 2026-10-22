import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Navigation, ExternalLink, Sun, Moon, Check, MessageCircle, SquareParking } from 'lucide-react';
import { CLINIC_GOOGLE_URL } from '../data';
import { trackConversion } from '../lib/analytics';
import { Rings, SmileCurve } from './BrandShapes';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const NEARBY_AREAS = ['Perambur', 'Madhavaram', 'Kolathur', 'Vyasarpadi', 'Moolakadai', 'Korukkupet', 'Villivakkam', 'Sowcarpet'];
const WHATSAPP_URL = 'https://wa.me/919342367446?text=Hello%20neudental%2C%20I%20would%20like%20to%20book%20an%20appointment.';

// The map starts loading as soon as the page has settled, so it is already
// there by the time visitors scroll down to it. Google's embed takes focus
// when it finishes loading, and the browser then scrolls the page to it; the
// guard below puts the page back. That guard notices the grab through this
// window losing focus, so a page opened in a background tab waits until the
// visitor switches to it before loading the map.
export default function LocationDetails() {
const [mapRequested, setMapRequested] = useState(false);
const [mapLoaded, setMapLoaded] = useState(false);
const mapBoxRef = useRef<HTMLDivElement>(null);
const mapFrameRef = useRef<HTMLIFrameElement>(null);

useEffect(() => {
if (mapRequested) return;
let settled = false;
let idle = 0;
let timer = 0;
const tryLoad = () => {
if (settled && document.visibilityState === 'visible' && document.hasFocus()) setMapRequested(true);
};
const onSettled = () => { settled = true; tryLoad(); };
// Let the first screen finish loading before the map starts.
const afterLoad = () => {
if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(onSettled, { timeout: 1500 });
else timer = window.setTimeout(onSettled, 300);
};
if (document.readyState === 'complete') afterLoad();
else window.addEventListener('load', afterLoad, { once: true });
window.addEventListener('focus', tryLoad);
document.addEventListener('visibilitychange', tryLoad);
// Someone who jumps straight here shouldn't wait for the page to settle.
const box = mapBoxRef.current;
const io = box ? new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setMapRequested(true); }, { rootMargin: '300px 0px' }) : null;
if (box && io) io.observe(box);
return () => {
window.removeEventListener('load', afterLoad);
window.removeEventListener('focus', tryLoad);
document.removeEventListener('visibilitychange', tryLoad);
if (idle) window.cancelIdleCallback(idle);
window.clearTimeout(timer);
io?.disconnect();
};
}, [mapRequested]);
useEffect(() => {
const frame = mapFrameRef.current;
if (!mapRequested || !frame) return;
// Where the page was a moment ago, in case the focus grab already moved it.
const history: Array<[number, number]> = [[performance.now() - 1000, window.scrollY]];
let pointerOverMap = false;
let holdY: number | null = null;
let holdUntil = 0;
const onScroll = () => {
const now = performance.now();
if (holdY !== null && now < holdUntil && Math.abs(window.scrollY - holdY) > 2) {
window.scrollTo({ top: holdY, behavior: 'instant' });
return;
}
history.push([now, window.scrollY]);
if (history.length > 30) history.shift();
};
// Any scroll, tap or key from the visitor ends the hold at once.
const onInput = () => { holdY = null; };
const onEnter = () => { pointerOverMap = true; };
const onLeave = () => { pointerOverMap = false; };
// The map taking focus makes this window lose it. Unless the visitor
// clicked into the map, keep the page where it was for a second.
const onBlur = () => {
if (document.activeElement !== frame || pointerOverMap) return;
const now = performance.now();
const before = [...history].reverse().find(([t]) => now - t > 60);
holdY = before ? before[1] : window.scrollY;
holdUntil = now + 1000;
if (Math.abs(window.scrollY - holdY) > 2) window.scrollTo({ top: holdY, behavior: 'instant' });
};
const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
const listen = { capture: true, passive: true } as const;
window.addEventListener('scroll', onScroll, { passive: true });
inputs.forEach((type) => window.addEventListener(type, onInput, listen));
window.addEventListener('blur', onBlur);
frame.addEventListener('mouseenter', onEnter);
frame.addEventListener('mouseleave', onLeave);
return () => {
window.removeEventListener('scroll', onScroll);
inputs.forEach((type) => window.removeEventListener(type, onInput, listen));
window.removeEventListener('blur', onBlur);
frame.removeEventListener('mouseenter', onEnter);
frame.removeEventListener('mouseleave', onLeave);
};
}, [mapRequested]);
const clinicLat = 13.1309218;
const clinicLng = 80.2535879;
const googleMapsUrl = CLINIC_GOOGLE_URL;
const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinicLat},${clinicLng}`;

return (
<section id="location" className="py-14 lg:py-20 bg-surface-alt px-4 sm:px-6 md:px-10 lg:px-16 scroll-mt-24">
  <div className="max-w-[1120px] mx-auto w-full">
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Visit our practice</span>
      <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">
        Find us in{' '}
        <span className="relative inline-block italic font-semibold">
          Kodungaiyur
          <SmileCurve stroke="#00D4C9" className="absolute -left-[4%] -bottom-2.5 w-[108%] h-4" />
        </span>
      </h2>
      <p className="font-sans text-base text-on-surface-variant mt-5 leading-relaxed">Open all 7 days, morning and evening, near Vasugi&nbsp;Nagar&nbsp;Park and Sidco Bus Stop.</p>
    </div>

    {/* Phones and tablets: two stacked cards, hours first. Desktop: one split card. */}
    <div className="mt-10 lg:mt-11 max-w-xl mx-auto lg:max-w-none flex flex-col gap-4 lg:gap-0 lg:flex-row lg:rounded-[32px] lg:overflow-hidden lg:bg-white lg:border lg:border-[#E2E8F0] lg:shadow-[0_30px_70px_-30px_rgba(11,19,65,0.45)]">
      <aside className="relative overflow-hidden rounded-3xl lg:rounded-none lg:w-[400px] xl:w-[440px] shrink-0 bg-[radial-gradient(120%_80%_at_0%_0%,#0A6BE0_0%,#0557BC_30%,#0B1341_85%)] text-white p-5 sm:p-7 lg:p-9 flex flex-col gap-6 lg:gap-7 shadow-[0_30px_70px_-30px_rgba(11,19,65,0.45)] lg:shadow-none">
        <Rings className="-right-60 -bottom-60 w-[520px] h-[520px] opacity-[0.12]" />

        <div className="relative flex flex-wrap items-center justify-between gap-3 lg:block">
          <p className="lg:hidden font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#00fff2]">Clinic hours</p>
          <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] font-sans text-[13px] font-semibold text-[#E2E8F8]">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#00fff2] shadow-[0_0_0_4px_rgba(0,255,242,0.18)]" />
            Open all 7 days
          </span>
          <h3 className="hidden lg:block mt-4 font-serif text-[27px] font-bold leading-tight">Two sessions, every day</h3>
        </div>

        <dl className="relative flex flex-col gap-4 lg:gap-[18px]">
          {[
            { label: 'Morning', time: ['10 AM', '2 PM'], Icon: Sun },
            { label: 'Evening', time: ['5 PM', '9.30 PM'], Icon: Moon },
          ].map(({ label, time, Icon }) => (
            <div key={label} className="flex items-center gap-4">
              <span aria-hidden="true" className="w-11 h-11 shrink-0 rounded-full border-[1.5px] border-[#00fff2] flex items-center justify-center"><Icon className="w-5 h-5 text-[#00fff2]" strokeWidth={1.8} /></span>
              <div>
                <dt className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#C7CDE6]">{label}</dt>
                <dd className="font-display font-bold text-[26px] lg:text-[28px] xl:text-[32px] leading-tight mt-0.5 whitespace-nowrap">{time[0]} <span className="text-[#00fff2]">–</span> {time[1]}</dd>
              </div>
            </div>
          ))}
        </dl>

        {/* The day from 10 AM to 9.30 PM, to scale: 4 h open, 3 h closed, 4.5 h open. */}
        <div className="relative font-sans" role="img" aria-label="Open 10 AM to 2 PM, closed 2 PM to 5 PM, open 5 PM to 9.30 PM">
          <div aria-hidden="true" className="flex gap-1 text-[11px] font-semibold text-[#C7CDE6] mb-2">
            <span className="w-[34.8%] text-center">Morning</span><span className="w-[26.1%] text-center">Closed</span><span className="flex-1 text-center">Evening</span>
          </div>
          <div aria-hidden="true" className="flex gap-1 h-2.5">
            <span className="w-[34.8%] rounded-full bg-[#00fff2] shadow-[0_0_14px_rgba(0,255,242,0.45)]" />
            <span className="w-[26.1%] rounded-full border border-dashed border-white/35" />
            <span className="flex-1 rounded-full bg-[#00fff2] shadow-[0_0_14px_rgba(0,255,242,0.45)]" />
          </div>
          <div aria-hidden="true" className="relative h-4 mt-2 font-display text-xs font-medium text-[#E2E8F8]">
            <span className="absolute left-0">10 AM</span>
            <span className="absolute left-[35.5%] -translate-x-1/2">2 PM</span>
            <span className="absolute left-[61.8%] -translate-x-1/2">5 PM</span>
            <span className="absolute right-0">9.30 PM</span>
          </div>
        </div>

        <div className="relative">
          <p className="sr-only">Open Monday to Sunday</p>
          <div aria-hidden="true" className="grid grid-cols-7 gap-1.5">
            {DAYS.map((day) => (
              <span key={day} className="flex flex-col items-center gap-1 pt-2 pb-1.5 rounded-xl border border-[#00fff2]/40 bg-[#00fff2]/[0.07] font-sans text-xs font-semibold">
                {day}<Check className="w-3 h-3 text-[#00fff2]" strokeWidth={3} />
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-auto lg:pt-5 lg:border-t lg:border-white/[0.14] flex gap-2.5 font-sans">
          <a href="tel:+919342367446" onClick={() => trackConversion('call_click', 'call', { link_location: 'location_hours' })} className="hidden lg:flex flex-[1.45] items-center justify-center gap-2 min-h-[50px] rounded-[14px] bg-[#00fff2] hover:bg-white text-primary text-[15px] font-bold transition-colors whitespace-nowrap">
            <Phone className="w-4 h-4" aria-hidden="true" /> +91 93423 67446
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: 'location_hours' })} className="flex-1 flex items-center justify-center gap-2 min-h-[50px] rounded-[14px] border border-white/30 hover:border-[#00fff2] text-white text-[15px] font-bold transition-colors">
            <MessageCircle className="w-4 h-4 text-[#00fff2]" aria-hidden="true" /> <span className="lg:hidden">Chat on WhatsApp</span><span className="hidden lg:inline">WhatsApp</span>
          </a>
        </div>
      </aside>

      <div className="min-w-0 flex-1 flex flex-col gap-6 p-4 sm:p-6 lg:p-7 bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_30px_70px_-30px_rgba(11,19,65,0.35)] lg:rounded-none lg:border-0 lg:shadow-none">
        <div ref={mapBoxRef} className="relative h-56 sm:h-72 lg:h-auto lg:flex-1 lg:min-h-[320px] rounded-[20px] overflow-hidden border border-[#E2E8F0] bg-[#EAF1F9] bg-[linear-gradient(rgba(5,87,188,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(5,87,188,0.05)_1px,transparent_1px)] bg-[size:28px_28px] select-none">
          {/* Shown only for the moment before the map arrives; the map fades in over it. */}
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_12px_30px_-10px_rgba(11,19,65,0.6)]"><MapPin className="w-6 h-6 text-[#00fff2]" /></span>
          {mapRequested && (
            <iframe ref={mapFrameRef} title="Google map exact directions neudental clinic chennai" src={`https://maps.google.com/maps?q=${clinicLat},${clinicLng}&z=17&output=embed`} onLoad={() => setMapLoaded(true)} className={`absolute inset-0 w-full h-full border-none transition-opacity duration-500 motion-reduce:transition-none ${mapLoaded ? 'opacity-100' : 'opacity-0'}`} allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade" />
          )}
        </div>

        <div className="flex flex-col xl:flex-row xl:items-end gap-5 xl:gap-7 font-sans">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary">Address</p>
            <p className="mt-2 text-[15px] lg:text-base leading-relaxed font-semibold text-primary">Door No. 13, Plot No. 26, 1st Main Road, Vasuki Nagar, Kodungaiyur, Chennai, <span className="whitespace-nowrap">Tamil Nadu – 600118</span></p>
            <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
              <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant"><MapPin className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" /> Near Vasugi Nagar Park and Sidco Bus Stop</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF5FC] border border-[#D6E6F7] text-[13px] font-semibold text-primary"><SquareParking className="w-3.5 h-3.5 text-secondary" aria-hidden="true" /> Parking available</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-5 xl:flex-col xl:items-stretch gap-1.5 shrink-0">
            <div className="grid grid-cols-2 lg:flex gap-2.5">
              <a href={directionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-[14px] bg-primary hover:bg-secondary text-white text-[15px] font-bold transition-colors whitespace-nowrap">
                <Navigation className="w-4 h-4 text-[#00fff2] fill-current" aria-hidden="true" /> Get directions
              </a>
              <a href="tel:+919342367446" onClick={() => trackConversion('call_click', 'call', { link_location: 'location_address' })} className="lg:hidden flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-[14px] bg-[#00fff2] hover:bg-[#00D4C9] text-primary text-[15px] font-bold transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" /> Call
              </a>
            </div>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 min-h-10 text-sm font-semibold text-secondary hover:underline">
              Open in Google Maps <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 max-w-xl mx-auto lg:max-w-none flex flex-wrap items-center justify-center lg:justify-start gap-2 font-sans">
      <p className="w-full lg:w-auto lg:mr-2 inline-flex items-center justify-center gap-2.5 text-sm font-bold text-primary mb-1 lg:mb-0">
        <span aria-hidden="true" className="w-8 h-8 rounded-full border-[1.5px] border-[#00D4C9] flex items-center justify-center"><Navigation className="w-3.5 h-3.5 text-secondary" /></span>
        Easily reachable within 5 km
      </p>
      <ul className="contents">
        {NEARBY_AREAS.map((area) => (
          <li key={area} className="px-3.5 py-2 rounded-[10px] border border-[#E2E8F0] bg-white text-[13px] font-semibold text-primary">{area}</li>
        ))}
      </ul>
    </div>
  </div>
</section>
);
}
