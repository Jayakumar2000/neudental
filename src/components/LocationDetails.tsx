import React from 'react';
import { Clock, MapPin, Phone, HelpCircle, Navigation, ExternalLink, Calendar } from 'lucide-react';

export default function LocationDetails() {
const clinicLat = 13.1309218;
const clinicLng = 80.2535879;
const googleMapsUrl = "https://www.google.com/maps/place/Neudental+Clinic+(Formerly+Bludental)+%7C+Dentist+in+Chennai+%7C+Dental+Clinic+in+Kodungaiyur/@13.1309218,80.2535879,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52659b841d30d3:0xc53ff4dcde940735!8m2!3d13.1309218!4d80.2535879!16s%2Fg%2F11z2d1y0y6";
const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinicLat},${clinicLng}`;

return (
<section id="location" className="py-24 bg-surface-alt px-6 md:px-10 lg:px-16 border-b border-cool-gray/5">
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
<h3 className="font-serif font-bold text-lg text-primary mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-secondary" /> Clinical Sessions Hours</h3>
<div className="space-y-4 font-sans text-sm">
<div className="flex justify-between items-start pb-3">
<div><span className="font-bold text-primary block">Monday - Sunday:</span><span className="text-xs text-cool-gray">Open all 7 days, dual-sessions clinical service</span></div>
<div className="text-right"><p className="font-semibold text-secondary whitespace-nowrap">10:00 AM - 02:00 PM</p><p className="font-semibold text-secondary mt-0.5 whitespace-nowrap">05:00 PM - 09:30 PM</p></div>
</div>
</div>
</div>
<div className="bg-white p-8 rounded-2xl border border-cool-gray/10 premium-shadow">
<h3 className="font-serif font-bold text-lg text-primary mb-6 flex items-center gap-2"><MapPin className="w-5 h-5 text-secondary" /> Address &amp; Navigation</h3>
<div className="space-y-4 font-sans text-sm">
<p className="text-on-surface-variant font-medium leading-relaxed leading-6 select-all">Door No. 13, neudental Clinic <br />1st Main Road, Kodungaiyur (East), <br />Vasuki Nagar, Kodungaiyur, <br />Chennai, Tamil Nadu 600118</p>
<div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl text-xs flex gap-2 border border-emerald-100 font-sans"><HelpCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" /><div><strong className="block font-bold">Local Community Landmarks:</strong>Near Vasugi Park and Sidco Bus Stop - just 100 meters away. Direct, stress-free slots for clinical parking.</div></div>
<div className="pt-2"><a href={directionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all duration-200"><Navigation className="w-4 h-4 fill-current" /> Get GPS Directions <ExternalLink className="w-3 h-3" /></a></div>
</div>
</div>
</div>
<div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-cool-gray/10 premium-shadow flex flex-col justify-between overflow-hidden">
<div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cool-gray/10 pb-4 mb-4 gap-3">
<div><h4 className="font-serif text-2xl md:text-3xl font-bold text-primary">Map view of neudental Clinic</h4></div>
<a href={googleMapsUrl} target="_blank" rel="noreferrer" className="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-1 font-sans">Open in Google Maps App <ExternalLink className="w-3.5 h-3.5" /></a>
</div>
<div className="w-full grow min-h-[350px] rounded-2xl overflow-hidden border border-cool-gray/15 select-none bg-cool-gray/5 relative">
<iframe title="Google map exact directions neudental clinic chennai" src={`https://maps.google.com/maps?q=${clinicLat},${clinicLng}&z=17&output=embed`} className="w-full h-full border-none absolute inset-0" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
</div>
</div>
</div>
</div>
</section>
);
}
