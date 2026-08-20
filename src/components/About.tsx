import React from 'react';
import { DOCTORS } from '../data';
import { HeartPulse, ShieldCheck, Cpu, GraduationCap, Camera } from 'lucide-react';

interface GalleryPhoto {
  src: string;
  alt: string;
}

const CLINIC_PHOTOS: GalleryPhoto[] = [
  { src: '/clinic/Entrance_neudental_clinic.jpeg', alt: 'neudental clinic storefront and signage, Kodungaiyur, Chennai' },
  { src: '/clinic/Signboard_neudental_clinic.jpeg', alt: 'neudental clinic signboard with address, timings and Dr. Swetha U details' },
  { src: '/clinic/Dental_Chair_neudental_clinic.jpeg', alt: 'Dental treatment chair and operatory at neudental clinic' },
  { src: '/clinic/Dental_Chair_Operatory_neudental_clinic.jpeg', alt: 'Fully equipped dental operatory at neudental clinic' },
  { src: '/clinic/Treatment_Room_neudental_clinic.jpeg', alt: 'Treatment room interior at neudental clinic' },
  { src: '/clinic/Treatment_Room_Wide_neudental_clinic.jpeg', alt: 'Wide view of the treatment room at neudental clinic' },
  { src: '/clinic/Treatment_Room_Counter_neudental_clinic.jpeg', alt: 'Treatment room counter and workstation at neudental clinic' },
  { src: '/clinic/Consultation_Desk_neudental_clinic.jpeg', alt: 'Consultation desk and waiting area at neudental clinic' },
  { src: '/clinic/Reception_Logo_Wall_neudental_clinic.jpeg', alt: 'neudental logo wall at the clinic entrance' },
  { src: '/clinic/Interior_Logo_Wall_neudental_clinic.jpeg', alt: 'neudental brand wall inside the clinic' },
  { src: '/clinic/Neudental_Clinic_logo_signage.jpeg', alt: 'neudental clinic logo signage close-up' },
];

const CLINIC_ROW_1 = CLINIC_PHOTOS.filter((_, i) => i % 2 === 0);
const CLINIC_ROW_2 = CLINIC_PHOTOS.filter((_, i) => i % 2 === 1);

export default function About() {
const doc = DOCTORS[0];

return (
<section id="about" className="py-24 bg-white px-6 md:px-10 lg:px-16">
<div className="max-w-[1280px] mx-auto w-full">
{/* Section Title */}
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">
Modern Patient-First Dentistry
</span>
<h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">
Premium, Personalized Medical Care
</h2>
<div className="w-12 h-1 bg-secondary mx-auto mt-6" />
<p className="font-sans text-base text-on-surface-variant mt-4 leading-relaxed">
Led by Dr. Swetha, <strong className="text-primary font-bold">neudental</strong> is a newly opened modern dental clinic in Kodungaiyur. We combine high-grade gentle precision with elite research-backed clinical safety.
</p>
</div>
{/* Bento Grid Highlights */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
<div className="p-8 rounded-2xl bg-surface-container-low border border-cool-gray/5 flex flex-col justify-between hover:border-secondary/20 transition-all">
<HeartPulse className="w-8 h-8 text-secondary mb-4" />
<div>
<h3 className="font-serif font-bold text-lg text-primary mb-2">Patient-Focused Ethos</h3>
<p className="font-sans text-sm text-on-surface-variant leading-relaxed">
Every treatment plan is customized based on absolute clinical requirements. We prioritize functional dental wellness with a commitment to zero over-treatment.
</p>
</div>
</div>
<div className="p-8 rounded-2xl bg-surface-container-low border border-cool-gray/5 flex flex-col justify-between hover:border-secondary/20 transition-all">
<ShieldCheck className="w-8 h-8 text-secondary mb-4" />
<div>
<h3 className="font-serif font-bold text-lg text-primary mb-2">Class-B Safety Standards</h3>
<p className="font-sans text-sm text-on-surface-variant leading-relaxed">
We employ continuous vacuum Class-B autoclave technology alongside sterile individual pouch wrapping to guarantee 100% pathogen-free, medical-grade tools.
</p>
</div>
</div>
<div className="p-8 rounded-2xl bg-surface-container-low border border-cool-gray/5 flex flex-col justify-between hover:border-secondary/20 transition-all">
<Cpu className="w-8 h-8 text-secondary mb-4" />
<div>
<h3 className="font-serif font-bold text-lg text-primary mb-2">State-Of-The-Art Equipment</h3>
<p className="font-sans text-sm text-on-surface-variant leading-relaxed">
From ultra-low radiation high-resolution digital imaging to micro-jet scaler tech and automated rotary endodontic lines, precision guides every step.
</p>
</div>
</div>
</div>
{/* Meet the Doctor + Clinic Tour — one flowing composition, not two boxed-off panes */}
<div className="max-w-5xl mx-auto pt-8">
<div className="text-center max-w-2xl mx-auto mb-10">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
<Camera className="w-4 h-4 text-secondary" /> Step Inside neudental
</span>
<h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-3 leading-tight">
Real Clinic, Real Doctor
</h3>
<p className="font-sans text-sm text-on-surface-variant mt-3 leading-relaxed">
{CLINIC_PHOTOS.length} real photos from our Kodungaiyur practice, and the surgeon behind every treatment.
</p>
</div>

<div className="rounded-[2rem] border border-cool-gray/10 premium-shadow overflow-hidden bg-white">
{/* Doctor Bio */}
<div className="p-8 md:p-10">
<div className="flex flex-col sm:flex-row gap-6 md:gap-8">
<div className="w-full max-w-[220px] mx-auto sm:mx-0 sm:w-56 md:w-64 shrink-0">
<div className="aspect-[2/3] rounded-2xl overflow-hidden bg-cool-gray/10 premium-shadow">
<img
src="/doctor/dr-swetha.jpg"
alt="Dr. Swetha U, Lead Dental Surgeon at neudental"
className="w-full h-full object-cover object-top"
/>
</div>
</div>
<div className="flex-1 text-center sm:text-left">
<span className="text-secondary font-sans text-xs tracking-wider uppercase font-bold font-display block mb-1">
{doc.title} &middot; {doc.specialty}
</span>
<h4 className="font-serif text-xl sm:text-2xl font-bold text-primary">
{doc.name}
</h4>
<p className="font-sans text-sm font-medium text-cool-gray mt-1 flex items-center justify-center sm:justify-start gap-1.5">
<GraduationCap className="w-4 h-4 text-secondary inline shrink-0" /> {doc.education} &middot; {doc.experience}
</p>
<p className="font-sans text-sm text-on-surface-variant leading-relaxed mt-4">
{doc.bio}
</p>
<div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-5 pt-5 border-t border-cool-gray/10">
{doc.skills.map((skill) => (
<span key={skill} className="bg-surface-alt border border-cool-gray/20 text-on-surface text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
{skill}
</span>
))}
</div>
</div>
</div>
</div>
{/* Clinic Tour — continuous marquee, same panel, no border between them */}
<div className="bg-surface-alt/60 pt-6 pb-8">
<p className="text-center font-sans text-xs font-bold uppercase tracking-widest text-cool-gray mb-4">Take a Look at Our Clinic</p>
<div className="marquee-row">
<div className="marquee-track gap-3 px-1.5">
{[...CLINIC_ROW_1, ...CLINIC_ROW_1].map((photo, i) => (
<div key={`${photo.src}-${i}`} className="relative shrink-0 w-48 h-32 sm:w-56 sm:h-36 rounded-2xl overflow-hidden group">
<img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
</div>
))}
</div>
</div>
<div className="marquee-row mt-3">
<div className="marquee-track marquee-reverse gap-3 px-1.5">
{[...CLINIC_ROW_2, ...CLINIC_ROW_2].map((photo, i) => (
<div key={`${photo.src}-${i}`} className="relative shrink-0 w-48 h-32 sm:w-56 sm:h-36 rounded-2xl overflow-hidden group">
<img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
</div>
))}
</div>
</div>
</div>
</div>
</div>
</div>
</section>
);
}
