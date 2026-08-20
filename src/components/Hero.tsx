import React from 'react';
import { ShieldCheck, Star, BadgeCheck, Award, Zap } from 'lucide-react';

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
<section className="relative overflow-hidden bg-gradient-to-br from-white via-surface-alt to-[#EEF5FC] py-16 lg:py-24 px-6 md:px-10 lg:px-16">
<div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl -z-10" />
<div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-mint/35 blur-3xl -z-10" />
<div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-7 flex flex-col items-start gap-6">
<div className="inline-flex items-center gap-3 bg-white pl-1.5 pr-4 py-1.5 rounded-full premium-shadow border border-secondary/15 select-none">
<span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-secondary to-primary text-white shrink-0">
<BadgeCheck className="w-4 h-4" strokeWidth={2.5} />
</span>
<span className="font-sans text-xs font-bold tracking-wide text-primary uppercase">
Best Dental Clinic in Kodungaiyur, Chennai
</span>
</div>
<h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-primary leading-tight font-bold tracking-tight">
Gentle Dentistry. <br />
<span className="text-secondary italic font-light">For Every Age, From Day One.</span>
</h1>
<p className="font-sans text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
Painless, laser-assisted care with a conservative, tooth-first approach — from a child's first checkup to a <strong>Root Canal</strong> or <strong>Implant</strong>, by Dr. Swetha BDS, FGDS.
</p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full max-w-lg font-sans text-sm">
<div className="flex items-center gap-2.5 text-on-surface"><div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><Zap className="w-3.5 h-3.5" /></div><span>Advanced Laser Dentistry</span></div>
<div className="flex items-center gap-2.5 text-on-surface"><div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><ShieldCheck className="w-3.5 h-3.5" /></div><span>100% Painless Procedures</span></div>
<div className="flex items-center gap-2.5 text-on-surface"><div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><ShieldCheck className="w-3.5 h-3.5" /></div><span>No Hidden Lab Charges</span></div>
<div className="flex items-center gap-2.5 text-on-surface"><div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><ShieldCheck className="w-3.5 h-3.5" /></div><span>5+ Years Expert Surgeon Care</span></div>
</div>
<div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
<button onClick={onScrollToBooking} className="bg-primary text-white hover:bg-secondary cursor-pointer shadow-xl shadow-primary/10 hover:shadow-secondary/20 hover:-translate-y-0.5 active:translate-y-0 px-8 py-4 rounded-xl font-sans text-sm tracking-wider uppercase font-bold transition-all duration-200">Book Appointment</button>
<button onClick={handleExploreTreatments} className="border border-cool-gray/30 text-primary hover:border-primary hover:bg-primary/5 cursor-pointer px-8 py-4 rounded-xl font-sans text-sm tracking-wider uppercase font-bold transition-all duration-200">Explore Treatments</button>
</div>
<div className="flex items-center gap-4 pt-4 border-t border-cool-gray/10 w-full">
<div className="flex items-center gap-1 text-[#FBBF24]"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
<p className="font-sans text-xs text-on-surface-variant font-medium"><strong className="text-primary font-bold">125+ Google Reviews</strong> rated excellent by Kodungaiyur residents</p>
</div>
<div className="w-full">
<p className="font-sans text-[10px] font-bold uppercase tracking-widest text-cool-gray mb-2.5">Featured &amp; Reviewed On</p>
<div className="flex items-center flex-wrap gap-2.5">
{FEATURED_ON.map((item) => (
<span key={item.name} className="inline-flex items-center gap-2 bg-white border border-cool-gray/15 rounded-full px-4 h-10 shadow-sm">
<img src={item.logo} alt={item.name} className="h-5 w-auto object-contain" />
{item.showLabel && <span className="text-xs font-sans font-semibold text-on-surface-variant">{item.name}</span>}
</span>
))}
</div>
</div>
</div>
<div className="lg:col-span-5 relative mt-12 lg:mt-0">
<div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none group">
<img alt="Dental treatment chair and operatory at neudental clinic" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/clinic/Dental_Chair_Operatory_neudental_clinic.jpeg" />
<div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
</div>
<div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl premium-shadow border border-cool-gray/10 hidden md:block max-w-[220px]">
<div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Award className="w-5 h-5" /></div><div className="leading-tight"><p className="text-lg font-bold text-primary font-sans">99.8%</p><p className="text-[11px] text-cool-gray font-sans font-medium uppercase tracking-wider">Sterilization Rate</p></div></div>
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
