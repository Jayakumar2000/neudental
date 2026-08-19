import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS } from '../data';
import { HeartPulse, ShieldCheck, Cpu, GraduationCap, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

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
const doc = DOCTORS[0];
const [activePhoto, setActivePhoto] = useState(0);
const [isPaused, setIsPaused] = useState(false);
const activePhotoRef = useRef(activePhoto);
activePhotoRef.current = activePhoto;

useEffect(() => {
if (isPaused) return;
const timer = setInterval(() => {
setActivePhoto((activePhotoRef.current + 1) % CLINIC_PHOTOS.length);
}, 4000);
return () => clearInterval(timer);
}, [isPaused]);

const goToPhoto = (index: number) => {
setActivePhoto(((index % CLINIC_PHOTOS.length) + CLINIC_PHOTOS.length) % CLINIC_PHOTOS.length);
setIsPaused(true);
};

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
{/* Meet the Doctor + Clinic Tour */}
<div className="max-w-5xl mx-auto pt-8">
<div className="text-center max-w-2xl mx-auto mb-10">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
<Camera className="w-4 h-4 text-secondary" /> Who You'll Meet, Where You'll Be Treated
</span>
<h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-3 leading-tight">
Meet Dr. Swetha &amp; Step Inside neudental
</h3>
<p className="font-sans text-sm text-on-surface-variant mt-3 leading-relaxed">
Real credentials and real photos of our Kodungaiyur practice, side by side, so you know exactly who's treating you and exactly where you're walking in.
</p>
</div>
<div className="rounded-[2rem] border border-cool-gray/10 premium-shadow overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-12">
{/* Doctor Pane */}
<div className="lg:col-span-5 bg-surface-alt/60 p-8 md:p-10 flex flex-col gap-4 lg:border-r border-cool-gray/10">
<div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-primary/5 flex items-center justify-center select-none relative">
{doc.avatarUrl ? (
<img src={doc.avatarUrl} alt={doc.imageAlt} className="w-full h-full object-cover" />
) : (
<div className="flex flex-col items-center justify-center p-8 text-center text-primary/40">
<GraduationCap className="w-14 h-14 text-secondary mb-3" />
<span className="text-lg font-serif font-black tracking-widest text-primary/80">Dr. Swetha</span>
<span className="text-[10px] font-mono uppercase tracking-wider text-secondary mt-1">neudental Lead</span>
</div>
)}
</div>
<div>
<span className="text-secondary font-sans text-xs tracking-wider uppercase font-bold font-display block mb-1">
{doc.title}
</span>
<h4 className="font-serif text-xl sm:text-2xl font-bold text-primary">
{doc.name}
</h4>
<p className="font-sans text-sm font-medium text-cool-gray mt-1 flex items-center gap-1.5">
<GraduationCap className="w-4 h-4 text-secondary inline" /> {doc.education}
</p>
</div>
<div className="flex flex-wrap gap-2 text-xs font-sans">
<span className="bg-primary text-white px-2.5 py-1 rounded">{doc.experience}</span>
<span className="bg-secondary/10 text-secondary px-2.5 py-1 rounded font-medium">{doc.specialty}</span>
</div>
<p className="font-sans text-sm text-on-surface-variant leading-relaxed">
{doc.bio}
</p>
<div className="pt-4 border-t border-cool-gray/10">
<p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Core Clinical Mastery:</p>
<div className="flex flex-wrap gap-1.5">
{doc.skills.map((skill) => (
<span key={skill} className="bg-white border border-cool-gray/20 text-on-surface text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
{skill}
</span>
))}
</div>
</div>
</div>
{/* Clinic Tour Pane */}
<div className="lg:col-span-7 p-8 md:p-10 flex flex-col gap-5">
<div>
<h4 className="font-serif text-lg font-bold text-primary">Take a Look at Our Clinic</h4>
<p className="font-sans text-xs text-on-surface-variant mt-1">Tap a thumbnail, or let it play — {CLINIC_PHOTOS.length} real photos from our practice.</p>
</div>
<div
className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-cool-gray/5 select-none"
onMouseEnter={() => setIsPaused(true)}
onMouseLeave={() => setIsPaused(false)}
>
<AnimatePresence mode="wait">
<motion.img
key={CLINIC_PHOTOS[activePhoto].src}
src={CLINIC_PHOTOS[activePhoto].src}
alt={CLINIC_PHOTOS[activePhoto].alt}
initial={{ opacity: 0, scale: 1.03 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.45, ease: 'easeOut' }}
className="absolute inset-0 w-full h-full object-cover"
/>
</AnimatePresence>
<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/70 to-transparent px-4 py-3 pointer-events-none">
<span className="text-white text-xs font-sans font-medium">{CLINIC_PHOTOS[activePhoto].alt}</span>
</div>
<button onClick={() => goToPhoto(activePhoto - 1)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md transition-all cursor-pointer">
<ChevronLeft className="w-4 h-4" />
</button>
<button onClick={() => goToPhoto(activePhoto + 1)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md transition-all cursor-pointer">
<ChevronRight className="w-4 h-4" />
</button>
</div>
<div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
{CLINIC_PHOTOS.map((photo, i) => (
<button
key={photo.src}
onClick={() => goToPhoto(i)}
aria-label={`Show photo: ${photo.alt}`}
className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${i === activePhoto ? 'border-secondary' : 'border-transparent opacity-60 hover:opacity-100'}`}
>
<img src={photo.src} alt="" loading="lazy" className="w-full h-full object-cover" />
</button>
))}
</div>
</div>
</div>
</div>
</div>
</section>
);
}
