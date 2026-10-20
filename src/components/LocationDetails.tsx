import React, { useState } from 'react';
import { Clock, MapPin, Phone, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { CLINIC_GOOGLE_URL } from '../data';

// Google's map embed takes focus when it finishes loading, and the browser
// then scrolls the page down to it -- a lazy-loaded one did this to visitors
// still scrolling past the booking form and reviews. It now loads only when
// asked for, which also keeps its heavy scripts off the initial page load.
export default function LocationDetails() {
const [mapRequested, setMapRequested] = useState(false);
const clinicLat = 13.1309218;
const clinicLng = 80.2535879;
const googleMapsUrl = CLINIC_GOOGLE_URL;
const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinicLat},${clinicLng}`;

return (
<section id="location" className="py-14 lg:py-20 bg-surface-alt px-6 md:px-10 lg:px-16 border-b border-cool-gray/5 scroll-mt-24">
<div className="max-w-[1280px] mx-auto w-full">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Visit Our Practice</span>
<h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">Clinic Location &amp; Operational Timings</h2>
<div className="w-12 h-1 bg-secondary mx-auto mt-6" />
<p className="font-sans text-sm text-on-surface-variant mt-4 leading-relaxed">Conveniently situated in the core of Kodungaiyur, our high-hygiene setups are fully equipped to welcome your family.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
<div className="lg:col-span-5 flex flex-col gap-6 justify-between">
<div className="bg-white p-8 rounded-2xl border border-cool-gray/10 premium-shadow">
<h3 className="font-serif font-bold text-lg text-primary mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-secondary" /> Clinic Timings</h3>
<div className="font-sans text-sm">
<div className="flex items-center justify-between pb-4 mb-4 border-b border-cool-gray/10">
<span className="font-bold text-primary">Monday - Sunday</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Open All 7 Days</span>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold uppercase tracking-wider text-cool-gray">Morning</span>
<span className="font-semibold text-secondary whitespace-nowrap">10:00 AM - 02:00 PM</span>
</div>
<div className="flex items-center justify-between">
<span className="text-xs font-bold uppercase tracking-wider text-cool-gray">Evening</span>
<span className="font-semibold text-secondary whitespace-nowrap">05:00 PM - 09:30 PM</span>
</div>
</div>
</div>
</div>
<div className="bg-white p-8 rounded-2xl border border-cool-gray/10 premium-shadow">
<h3 className="font-serif font-bold text-lg text-primary mb-6 flex items-center gap-2"><MapPin className="w-5 h-5 text-secondary" /> Address &amp; Navigation</h3>
<div className="space-y-4 font-sans text-sm">
<p className="text-on-surface-variant font-medium leading-relaxed leading-6 select-all">Door No. 13, Plot No. 26, 1st Main Road, Vasuki Nagar, Kodungaiyur, Chennai, Tamil Nadu - 600118.<br /><br /><strong className="text-primary font-bold">Landmark:</strong> Near Vasugi Nagar Park and Sidco Bus Stop - Parking Facilities available.</p>
<div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl text-xs flex gap-2 border border-emerald-100 font-sans"><Navigation className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" /><div><strong className="block font-bold">Easily Reachable Within 5km:</strong>Perambur, Madhavaram, Kolathur, Vyasarpadi, Moolakadai, Korukkupet, Villivakkam &amp; Sowcarpet.</div></div>
<div className="pt-2"><a href={directionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all duration-200"><Navigation className="w-4 h-4 fill-current" /> Get GPS Directions</a></div>
</div>
</div>
</div>
<div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-cool-gray/10 premium-shadow flex flex-col justify-between overflow-hidden">
<div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cool-gray/10 pb-4 mb-4 gap-3">
<div><h4 className="font-serif text-2xl md:text-3xl font-bold text-primary">Map view of Neudental Clinic</h4></div>
<a href={googleMapsUrl} target="_blank" rel="noreferrer" className="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-1 font-sans">Open in Google Maps <ExternalLink className="w-3.5 h-3.5" /></a>
</div>
<div className="w-full grow min-h-[350px] rounded-2xl overflow-hidden border border-cool-gray/15 select-none bg-cool-gray/5 relative">
{mapRequested ? (
<iframe title="Google map exact directions neudental clinic chennai" src={`https://maps.google.com/maps?q=${clinicLat},${clinicLng}&z=17&output=embed`} className="w-full h-full border-none absolute inset-0" allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade" />
) : (
<div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center bg-[#EEF4FB] bg-[linear-gradient(rgba(5,87,188,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(5,87,188,0.06)_1px,transparent_1px)] bg-[size:32px_32px]">
<span className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_12px_30px_-10px_rgba(11,19,65,0.6)]"><MapPin className="w-7 h-7 text-[#00fff2]" aria-hidden="true" /></span>
<div className="font-sans">
<p className="font-bold text-primary">Neudental Clinic, Kodungaiyur</p>
<p className="text-xs text-on-surface-variant mt-1">Near Vasugi Nagar Park and Sidco Bus Stop, Chennai 600118</p>
</div>
<div className="flex flex-wrap items-center justify-center gap-3">
<button type="button" onClick={() => setMapRequested(true)} className="inline-flex items-center gap-2 min-h-11 bg-primary hover:bg-secondary text-white text-xs uppercase tracking-widest font-bold px-6 rounded-xl transition-colors cursor-pointer"><MapPin className="w-4 h-4" aria-hidden="true" /> Show map</button>
<a href={directionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-11 bg-white border border-cool-gray/20 hover:border-secondary text-primary text-xs uppercase tracking-widest font-bold px-6 rounded-xl transition-colors"><Navigation className="w-4 h-4" aria-hidden="true" /> Get directions</a>
</div>
</div>
)}
</div>
</div>
</div>
</div>
</section>
);
}
