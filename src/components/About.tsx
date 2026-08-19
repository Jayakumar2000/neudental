import React from 'react';
import { DOCTORS } from '../data';
import { Award, CheckCircle, HeartPulse, ShieldCheck, Cpu, GraduationCap, Camera } from 'lucide-react';

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

export default function About() {
return (
<section id="about" className="py-24 bg-white px-margin-mobile md:px-margin-desktop">
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
{/* Meet the Doctors */}
<div className="space-y-12 max-w-5xl mx-auto pt-8">
<h3 className="text-center font-serif text-2xl md:text-3xl font-bold text-primary">
Meet Our Lead Surgeon
</h3>
<div className="max-w-2xl mx-auto">
{DOCTORS.map((doc, idx) => (
<div
key={doc.name}
className="group flex flex-col md:flex-row bg-surface-alt/50 rounded-3xl overflow-hidden border border-cool-gray/10 premium-shadow hover:-translate-y-1 transition-all duration-300"
>
{/* Doctor Portrait */}
<div className="aspect-[4/5] md:w-[260px] shrink-0 relative overflow-hidden bg-primary/5 flex items-center justify-center select-none border-b md:border-b-0 md:border-r border-cool-gray/10">
{doc.avatarUrl ? (
<img
src={doc.avatarUrl}
alt={doc.imageAlt}
className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
/>
) : (
<div className="flex flex-col items-center justify-center p-8 text-center text-primary/40">
<GraduationCap className="w-16 h-16 text-secondary mb-3 animate-pulse" />
<span className="text-xl font-serif font-black tracking-widest text-primary/80">Dr. Swetha</span>
<span className="text-[10px] font-mono uppercase tracking-wider text-secondary mt-1">neudental Lead</span>
</div>
)}
{/* Subtle color overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
</div>
{/* Doc Details */}
<div className="p-8 flex flex-col gap-4">
<div>
<span className="text-secondary font-sans text-xs tracking-wider uppercase font-bold font-display block mb-1">
{doc.title}
</span>
<h4 className="font-serif text-xl sm:text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
{doc.name}
</h4>
<p className="font-sans text-sm font-medium text-cool-gray mt-1 flex items-center gap-1.5">
<GraduationCap className="w-4 h-4 text-secondary inline" /> {doc.education}
</p>
</div>
{/* Specialty and Experience */}
<div className="flex flex-wrap gap-2 text-xs font-sans">
<span className="bg-primary text-white px-2.5 py-1 rounded">
{doc.experience}
</span>
<span className="bg-secondary/10 text-secondary px-2.5 py-1 rounded font-medium">
{doc.specialty}
</span>
</div>
{/* Bio */}
<p className="font-sans text-sm text-on-surface-variant leading-relaxed">
{doc.bio}
</p>
{/* Skills Tagged List */}
<div className="pt-4 border-t border-cool-gray/10">
<p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Core Clinical Mastery:</p>
<div className="flex flex-wrap gap-1.5">
{doc.skills.map((skill) => (
<span
key={skill}
className="bg-white border border-cool-gray/20 text-on-surface text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
>
<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
{skill}
</span>
))}
</div>
</div>
</div>
</div>
))}
</div>
</div>
{/* Clinic Photo Gallery */}
<div className="max-w-5xl mx-auto pt-20">
<h3 className="text-center font-serif text-2xl md:text-3xl font-bold text-primary flex items-center justify-center gap-2">
<Camera className="w-6 h-6 text-secondary" /> Take a Look at Our Clinic
</h3>
<p className="text-center font-sans text-sm text-on-surface-variant mt-3 max-w-xl mx-auto leading-relaxed">
Real photos from our Kodungaiyur practice, so you know exactly what to expect when you walk in.
</p>
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10">
{CLINIC_PHOTOS.map((photo) => (
<div key={photo.src} className="group relative aspect-square rounded-2xl overflow-hidden border border-cool-gray/10 premium-shadow">
<img
src={photo.src}
alt={photo.alt}
loading="lazy"
className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
</div>
))}
</div>
</div>
</div>
</section>
);
}
