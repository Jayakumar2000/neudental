import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { IconUserPatient } from './icons/DentalIcons';

const FEATURED_ON = [
{ name: 'Google', logo: '/logos/google-icon.png', showLabel: true },
{ name: 'Practo', logo: '/logos/practo.svg' },
{ name: 'JustDial', logo: '/logos/justdial.svg' },
];

interface HeroProps {
onScrollToBooking: () => void;
}

export default function Hero({ onScrollToBooking }: HeroProps) {
const handleExploreTreatments = () => {
const el = document.getElementById('services');
if (el) el.scrollIntoView({ behavior: 'smooth' });
};

return (
<section className="relative overflow-hidden bg-gradient-to-br from-white via-surface-alt to-[#EEF5FC] py-10 lg:py-14 px-6 md:px-10 lg:px-16">
<div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl -z-10" />
<div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-mint/35 blur-3xl -z-10" />
<div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
<div className="lg:col-span-7 flex flex-col items-start gap-6">
<div className="inline-flex items-center gap-2 sm:gap-3 bg-white pl-1.5 pr-3 sm:pr-4 py-1.5 rounded-full premium-shadow border border-secondary/15 select-none">
<span className="flex items-center justify-center w-[26px] h-[26px] sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-secondary to-primary text-white shrink-0">
<ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
</span>
<span className="font-sans text-[11px] sm:text-xs font-bold tracking-normal sm:tracking-wide text-primary uppercase whitespace-nowrap">
Most Trusted Dentistry in North Chennai
</span>
</div>
<h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-primary leading-tight font-bold tracking-tight">
Advanced Dental Clinic <br />
<span className="text-secondary italic font-light">in Kodungaiyur, Chennai</span>
</h1>
<p className="font-sans text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
Gentle, comfortable dentistry for every age, starting from a child's first dental checkup to an advanced procedure like <strong>Root Canal Treatment</strong> or <strong>Implant</strong>, performed by Dr. Swetha at our Neudental Clinic.
</p>
<div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
<button onClick={onScrollToBooking} className="bg-primary text-white hover:bg-secondary cursor-pointer shadow-xl shadow-primary/10 hover:shadow-secondary/20 hover:-translate-y-0.5 active:translate-y-0 px-8 py-4 rounded-xl font-sans text-sm tracking-wider uppercase font-bold transition-all duration-200">Book Appointment</button>
<button onClick={handleExploreTreatments} className="border border-cool-gray/30 text-primary hover:border-primary hover:bg-primary/5 cursor-pointer px-8 py-4 rounded-xl font-sans text-sm tracking-wider uppercase font-bold transition-all duration-200">Explore Treatments</button>
</div>
<div className="w-full pt-4 border-t border-cool-gray/10">
<p className="font-sans text-[10px] font-bold uppercase tracking-widest text-cool-gray mb-2.5">Featured &amp; Reviewed On</p>
<div className="flex items-center flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2.5">
{FEATURED_ON.map((item) => (
<span key={item.name} className="inline-flex items-center gap-1 sm:gap-2 bg-white border border-cool-gray/15 rounded-full px-3.5 h-11 sm:px-4 sm:h-10 shadow-sm shrink-0">
<img src={item.logo} alt={item.name} className="h-4 sm:h-5 w-auto object-contain" />
{item.showLabel && <span className="text-[11px] sm:text-xs font-sans font-semibold text-on-surface-variant">{item.name}</span>}
</span>
))}
</div>
</div>
</div>
<div className="lg:col-span-5 relative">
<div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none group">
<img alt="Dental treatment chair and operatory at neudental clinic" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/clinic/Dental_Chair_Operatory_neudental_clinic.jpeg" />
<div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
</div>
<div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl premium-shadow border border-cool-gray/10 hidden md:block max-w-[220px]">
<div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 overflow-visible"><IconUserPatient className="w-[54px] h-[54px] shrink-0" /></div><div className="leading-tight"><p className="text-lg font-bold text-primary font-sans">3,000+</p><p className="text-[11px] text-cool-gray font-sans font-medium uppercase tracking-wider">Patients Treated</p></div></div>
</div>
<div className="absolute -top-6 -right-6 bg-white pl-3 pr-5 py-3.5 rounded-2xl premium-shadow border border-cool-gray/10 hidden md:flex items-center gap-3.5">
<div className="w-12 h-12 rounded-full bg-surface-alt ring-1 ring-cool-gray/10 flex items-center justify-center shrink-0">
<img src="/logos/google-icon.png" alt="Google" className="w-6.5 h-6.5" />
</div>
<div className="w-px h-9 bg-cool-gray/15 shrink-0" />
<div className="leading-tight">
<div className="flex items-baseline gap-2 whitespace-nowrap">
<span className="text-xl font-bold text-primary font-sans">5.0</span>
<div className="flex items-center gap-0.5 text-[#FBBF24]">
<Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
</div>
</div>
<p className="text-[11px] font-bold text-cool-gray font-sans uppercase tracking-wide mt-1 whitespace-nowrap">150+ Ratings on Google</p>
</div>
</div>
</div>
</div>
</section>
);
}
