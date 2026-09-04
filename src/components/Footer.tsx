import React from 'react';
import { Phone, MapPin, Mail, ShieldAlert, Sparkles, Facebook, Instagram, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
{ name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61589206920105', icon: Facebook },
{ name: 'Instagram', href: 'https://www.instagram.com/neudental_clinic/', icon: Instagram },
{ name: 'YouTube', href: 'https://www.youtube.com/channel/UCfyFaSu7_EJshABsfOuBbWw', icon: Youtube },
];
import BrandLogo, { BRAND } from './BrandLogo';
import { TREATMENTS } from '../data';

interface FooterProps {
onNavigateSection: (sectionId: string) => void;
onOpenBlogs: () => void;
onSelectTreatment: (treatmentId: string) => void;
}

export default function Footer({ onNavigateSection, onOpenBlogs, onSelectTreatment }: FooterProps) {
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
{/* Column 2 Treatments short links */}
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-[#E0F2F1] mb-6">Treatments Offered</h4>
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-xs text-white/70 font-medium">
{TREATMENTS.map((treat) => (
<li key={treat.id}><a href="#services" onClick={(e) => { e.preventDefault(); onSelectTreatment(treat.id); }} className="hover:text-[#E0F2F1] transition-colors">{treat.name}</a></li>
))}
</ul>
</div>
{/* Column 3 Quick Links */}
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-[#E0F2F1] mb-6">Patient Navigation</h4>
<ul className="space-y-3 text-xs text-white/70 font-medium">
<li><a href="#our-doctor" onClick={(e) => handleSectionClick(e, 'our-doctor')} className="hover:text-[#E0F2F1] transition-colors">Our Doctor</a></li>
<li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')} className="hover:text-[#E0F2F1] transition-colors">Treatments Offered</a></li>
<li><button type="button" onClick={onOpenBlogs} className="hover:text-[#E0F2F1] transition-colors cursor-pointer text-left">Blogs</button></li>
<li><a href="#location" onClick={(e) => handleSectionClick(e, 'location')} className="hover:text-[#E0F2F1] transition-colors">Location &amp; Timing</a></li>
</ul>
</div>
{/* Column 4 Direct support contact */}
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-[#E0F2F1] mb-6">Connect &amp; Support</h4>
<ul className="space-y-4 text-xs text-white/80 font-medium">
<li className="flex items-start gap-2.5">
<Phone className="w-4.5 h-4.5 text-mint shrink-0 mt-0.5" />
<div>
<span className="block text-[10px] text-white/50 text-bold uppercase">Talk to Dentist:</span>
<a href="tel:+919342367446" className="text-[#E0F2F1] font-bold text-sm tracking-wide">+91 93423 67446</a>
</div>
</li>
<li className="flex items-start gap-2.5">
<Mail className="w-4.5 h-4.5 text-mint shrink-0 mt-0.5" />
<div>
<span className="block text-[10px] text-white/50 text-bold uppercase">Email:</span>
<a href="mailto:neudental26@gmail.com" className="text-[#E0F2F1] font-bold text-sm tracking-wide break-all">neudental26@gmail.com</a>
</div>
</li>
<li className="flex items-start gap-2.5">
<MapPin className="w-4.5 h-4.5 text-mint shrink-0 mt-0.5" />
<div>
<span className="block text-[10px] text-white/50 text-bold uppercase">Clinic Location:</span>
<span className="leading-snug select-all text-white/80 block mt-0.5">
Door No. 13, Plot No. 26, 1st Main Road, Vasuki Nagar, Kodungaiyur, Chennai, Tamil Nadu - 600118
</span>
</div>
</li>
</ul>
<div className="flex items-center gap-3 mt-6">
{SOCIAL_LINKS.map((social) => (
<a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`neudental on ${social.name}`} className="w-9 h-9 rounded-full bg-white/10 hover:bg-mint hover:text-primary text-white flex items-center justify-center transition-colors">
<social.icon className="w-4 h-4" />
</a>
))}
</div>
</div>
</div>
{/* Sub copyright row */}
<div className="max-w-[1280px] mx-auto w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
<p className="font-sans font-medium">
{new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
</p>
<div className="flex gap-6 font-semibold select-none">
<a href="#booking-section" onClick={(e) => handleSectionClick(e, 'booking-section')} className="hover:text-[#E0F2F1] transition-colors">Book Appointment</a>
<span className="text-white/10">|</span>
<a href="#location" onClick={(e) => handleSectionClick(e, 'location')} className="hover:text-[#E0F2F1] transition-colors">Clinical Timings</a>
<span className="text-white/10">|</span>
<span className="text-emerald-400 font-bold">100% Secure &amp; Sterilized</span>
</div>
</div>
</footer>
);
}
