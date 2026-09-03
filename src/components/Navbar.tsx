import React, { useState } from 'react';
import { Phone, Menu, X, Shield, Clock, MapPin, ChevronDown } from 'lucide-react';
import { TREATMENTS } from '../data';
import BrandLogo, { BRAND } from './BrandLogo';

interface NavbarProps {
onScrollToBooking: () => void;
onSelectTreatment: (treatmentId: string) => void;
onLogoClick?: () => void;
onNavigateSection: (sectionId: string) => void;
onOpenSymptomChecker: () => void;
}

export default function Navbar({ onScrollToBooking, onSelectTreatment, onLogoClick, onNavigateSection, onOpenSymptomChecker }: NavbarProps) {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const handleLogoClick = (e: React.MouseEvent) => {
e.preventDefault();
if (onLogoClick) onLogoClick();
window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
e.preventDefault();
onNavigateSection(href.slice(1));
};

const navItems = [
{ name: 'Our Story', href: '#about' },
{ name: 'Treatments', href: '#services' },
{ name: 'Symptom Checker', href: '' },
{ name: 'Contact & Timing', href: '#location' },
];

return (
<>
<div className="bg-primary text-white text-[12px] font-sans py-2 px-6 md:px-10 lg:px-16 text-center flex flex-col sm:flex-row justify-center items-center gap-2 border-b border-white/10 select-none">
<span className="inline-flex items-center gap-1.5 font-medium">
<span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
<span className="text-emerald-400 font-bold">MILESTONE:</span>
neudental is now an officially Registered Trademark&reg;
</span>
<span className="hidden sm:inline opacity-60">|</span>
<span className="opacity-90">A trusted name in dental care, now official</span>
</div>

<header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-cool-gray/10 transition-all premium-shadow">
<div className="flex items-center justify-between px-6 md:px-10 lg:px-6 xl:px-16 py-4 max-w-[1280px] mx-auto w-full">
<a href="#" onClick={handleLogoClick} className="flex items-center select-none group shrink-0" aria-label={`${BRAND.name} — ${BRAND.tagline}`}>
<BrandLogo
markClassName="h-10 w-auto sm:h-11 md:h-12"
wordmarkClassName="h-[18px] w-auto sm:h-[22px] md:h-[26px]"
taglineClassName="text-[9px] sm:text-[10px] text-cool-gray tracking-wide font-sans mt-1"
/>
</a>

<nav className="hidden lg:flex items-center gap-3 xl:gap-8 shrink-0">
{navItems.map((item) => {
if (item.name === 'Treatments') {
return (
<div key={item.name} className="relative group/dropdown shrink-0">
<button type="button" aria-haspopup="true" className="flex items-center gap-1.5 whitespace-nowrap text-on-surface-variant hover:text-secondary focus-visible:text-secondary text-sm font-sans font-medium transition-all duration-200 cursor-pointer py-2 outline-none">
<span>Treatments Offered</span>
<ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/dropdown:rotate-180 group-focus-within/dropdown:rotate-180" />
</button>
<div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible opacity-0 translate-y-2 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-focus-within/dropdown:visible group-focus-within/dropdown:opacity-100 group-focus-within/dropdown:translate-y-0 transition-all duration-200 z-50">
<div className="w-[320px] bg-white border border-cool-gray/10 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-0.5 max-h-[480px] overflow-y-auto">
<p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cool-gray border-b border-cool-gray/5 mb-1.5">Services Catalog</p>
{TREATMENTS.map((treat) => (
<button key={treat.id} onClick={() => { onSelectTreatment(treat.id); }} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary/5 text-left text-[#1E293B] hover:text-secondary transition-all cursor-pointer group/item hover:translate-x-0.5">
<span className="text-secondary/80 group-hover/item:text-secondary shrink-0 mt-1"><span className="block w-1.5 h-1.5 rounded-full bg-secondary/30 group-hover/item:bg-secondary transition-all" /></span>
<div className="leading-tight"><span className="text-xs font-semibold block font-sans">{treat.name}</span><span className="text-[10px] text-cool-gray line-clamp-1 block leading-normal mt-0.5 font-sans font-normal">{treat.description}</span></div>
</button>
))}
</div>
</div>
</div>
);
}
if (item.name === 'Symptom Checker') {
return (<button key={item.name} type="button" onClick={onOpenSymptomChecker} className="shrink-0 whitespace-nowrap text-on-surface-variant hover:text-secondary text-sm font-sans font-medium hover:scale-105 transition-all duration-200 cursor-pointer">{item.name}</button>);
}
return (<a key={item.name} href={item.href} onClick={(e) => handleLinkClick(e, item.href)} className="shrink-0 whitespace-nowrap text-on-surface-variant hover:text-secondary text-sm font-sans font-medium hover:scale-105 transition-all duration-200">{item.name}</a>);
})}
</nav>

<div className="hidden md:flex items-center gap-3 xl:gap-4 shrink-0">
<a href="tel:+919342367446" className="hidden xl:flex items-center gap-2 text-primary font-bold hover:text-secondary font-sans transition-colors" title="Click to dial Chennai neudental support">
<div className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0"><Phone className="w-4 h-4 text-secondary" /></div>
<div className="text-left leading-none whitespace-nowrap"><span className="text-[10px] block opacity-60 uppercase font-bold tracking-wider">Quick Helpline</span><span className="text-sm font-bold font-sans">+91 93423 67446</span></div>
</a>
<button id="cta_nav_book_button" onClick={onScrollToBooking} className="shrink-0 whitespace-nowrap bg-primary text-white hover:bg-secondary border border-transparent shadow shadow-primary/10 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-0.5 active:translate-y-0 px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200">Book Appointment</button>
</div>

<button className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-lg active:scale-95 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
</div>

{mobileMenuOpen && (
<div className="lg:hidden bg-white border-t border-cool-gray/10 px-6 py-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
<nav className="flex flex-col gap-3">
{navItems.map((item) => {
if (item.name === 'Treatments') {
return (
<div key={item.name} className="flex flex-col border-b border-cool-gray/5 pb-2">
<span className="text-primary text-sm font-sans font-bold uppercase tracking-wider py-1.5 select-none text-cool-gray">Treatments Offered</span>
<div className="grid grid-cols-2 gap-1.5 pl-2 pt-1">
{TREATMENTS.map((treat) => (
<button key={treat.id} onClick={() => { onSelectTreatment(treat.id); setMobileMenuOpen(false); }} className="text-stone-700 hover:text-secondary text-[11px] font-sans font-medium text-left py-2 hover:bg-secondary/5 px-2 rounded-lg transition-colors cursor-pointer block truncate">• {treat.name}</button>
))}
</div>
</div>
);
}
if (item.name === 'Symptom Checker') {
return (<button key={item.name} type="button" onClick={() => { setMobileMenuOpen(false); onOpenSymptomChecker(); }} className="text-primary hover:text-secondary text-base font-sans font-semibold py-2 border-b border-cool-gray/5 text-left cursor-pointer">{item.name}</button>);
}
return (<a key={item.name} href={item.href} className="text-primary hover:text-secondary text-base font-sans font-semibold py-2 border-b border-cool-gray/5" onClick={(e) => { setMobileMenuOpen(false); handleLinkClick(e, item.href); }}>{item.name}</a>);
})}
</nav>
<div className="flex flex-col gap-4 pt-4 border-t border-cool-gray/10">
<a href="tel:+919342367446" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-cool-gray/5 hover:bg-cool-gray/10 transition-colors">
<div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><Phone className="w-5 h-5" /></div>
<div><p className="text-xs text-cool-gray uppercase font-bold tracking-wider">Quick Mobile Call</p><p className="text-sm font-bold text-primary font-sans">+91 93423 67446</p></div>
</a>
<button onClick={() => { setMobileMenuOpen(false); onScrollToBooking(); }} className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all text-center">Book Appointment</button>
</div>
</div>
)}
</header>
</>
);
}
