import React from 'react';
import { Phone, MapPin, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import BrandLogo, { BRAND } from './BrandLogo';

interface FooterProps {
onNavigateSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateSection }: FooterProps) {
const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
e.preventDefault();
onNavigateSection(sectionId);
};

return (
<footer className="bg-primary text-white border-t border-white/5 pt-16 pb-8 px-6 md:px-10 lg:px-16">
<div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12 font-sans mb-12">
{/* Left Column Brand info */}
<div className="space-y-4">
<BrandLogo
variant="light"
markClassName="h-10 w-auto"
wordmarkClassName="h-[20px] w-auto"
taglineClassName="text-[9px] text-[#A5F3FC] uppercase tracking-widest font-bold leading-none mt-1"
/>
<p className="text-xs text-white/70 leading-relaxed pt-2">
Providing comprehensive dental treatments including Painless RCT, Invisalign clear alignments,
and biocompatible implant operations with advanced patient-first technology.
</p>
<div className="pt-2 text-xs text-mint/95 space-y-1">
<p className="flex items-center gap-1.5 font-bold">
<span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
Class-B Sterilization Standard
</p>
<p className="flex items-center gap-1.5 font-bold">
<span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
TN State Dental Council Registered
</p>
</div>
</div>
{/* Column 2 Services short links */}
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-[#E0F2F1] mb-6">Our Services</h4>
<ul className="space-y-3 text-xs text-white/70 font-medium">
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Painless Root Canal (RCT)</a></li>
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Invisalign Clear Aligners</a></li>
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Biocompatible Dental Implants</a></li>
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Aerosol Dental Scaling</a></li>
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Composite Teeth Fillings</a></li>
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Wisdom Tooth Extractions</a></li>
</ul>
</div>
{/* Column 3 Quick Links */}
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-[#E0F2F1] mb-6">Patient Navigation</h4>
<ul className="space-y-3 text-xs text-white/70 font-medium">
<li><a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="hover:text-[#E0F2F1] transition-colors">Our Story</a></li>
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Treatments Catalog</a></li>
<li><a href="#location" onClick={(e) => handleSectionClick(e, 'location')} className="hover:text-[#E0F2F1] transition-colors">Clinical Session Location</a></li>
</ul>
</div>
{/* Column 4 Direct support contact */}
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-[#E0F2F1] mb-6">Connect &amp; Support</h4>
<ul className="space-y-4 text-xs text-white/80 font-medium">
<li className="flex items-start gap-2.5">
<Phone className="w-4.5 h-4.5 text-mint shrink-0 mt-0.5" />
<div>
<span className="block text-[10px] text-white/50 text-bold uppercase">Call Patient Care:</span>
<a href="tel:+919342367446" className="text-[#E0F2F1] font-bold text-sm tracking-wide">+91 93423 67446</a>
</div>
</li>
<li className="flex items-start gap-2.5">
<MapPin className="w-4.5 h-4.5 text-mint shrink-0 mt-0.5" />
<div>
<span className="block text-[10px] text-white/50 text-bold uppercase">Physical Address:</span>
<span className="leading-snug select-all text-white/80 block mt-0.5">
Door No 13, 1st Main Road, Kodungaiyur East, Vasuki Nagar, Chennai - 600118
</span>
</div>
</li>
</ul>
</div>
</div>
{/* Sub copyright row */}
<div className="max-w-[1280px] mx-auto w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
<p className="font-sans font-medium">
{new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
</p>
<div className="flex gap-6 font-semibold select-none">
<a href="#booking-section" onClick={(e) => handleSectionClick(e, 'booking-section')} className="hover:text-[#E0F2F1] transition-colors">Book Priority Slot</a>
<span className="text-white/10">|</span>
<a href="#location" onClick={(e) => handleSectionClick(e, 'location')} className="hover:text-[#E0F2F1] transition-colors">Clinical Timings</a>
<span className="text-white/10">|</span>
<span className="text-emerald-400 font-bold">100% Secure &amp; Sterilized</span>
</div>
</div>
</footer>
);
}
