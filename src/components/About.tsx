import React from 'react';
import { DOCTORS } from '../data';
import { GraduationCap, Camera, Award, Users, Activity, Sparkles, Home } from 'lucide-react';

const TRUST_STATS = [
  { icon: Award, value: '5+', label: 'Years of Trusted Dental Care' },
  { icon: Users, value: '3,000+', label: 'Happy Patients Treated' },
  { icon: Activity, value: '5,000+', label: 'Procedures Completed' },
  { icon: Home, value: '200+', label: 'Home Visits for Senior Citizens' },
  { icon: Sparkles, value: '99.8%', label: 'Sterilization Success Rate' },
];

interface GalleryPhoto {
  src: string;
  alt: string;
  position?: string;
}

const CLINIC_PHOTOS: GalleryPhoto[] = [
  { src: '/clinic/Entrance_neudental_clinic.jpeg', alt: 'neudental clinic storefront and signage, Kodungaiyur, Chennai', position: 'top' },
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
  { src: '/clinic/Waiting_Area_Reception_neudental_clinic.jpeg', alt: 'Waiting area and reception at neudental clinic' },
];

const CLINIC_ROW_1 = CLINIC_PHOTOS.filter((_, i) => i % 2 === 0);
const CLINIC_ROW_2 = CLINIC_PHOTOS.filter((_, i) => i % 2 === 1);

export default function About() {
const doc = DOCTORS[0];

return (
<section id="about" className="py-14 lg:py-20 bg-white px-6 md:px-10 lg:px-16">
<div className="max-w-[1280px] mx-auto w-full">
{/* Section Title */}
<div className="text-center max-w-2xl mx-auto mb-14">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">
Why Patients Trust Us
</span>
<h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">
Excellence You Can See In The Numbers
</h2>
<div className="w-12 h-1 bg-secondary mx-auto mt-6" />
</div>
{/* Trust Stats Strip */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto mb-20">
{TRUST_STATS.map((stat) => (
<div key={stat.label} className="bg-surface-container-low border border-cool-gray/5 rounded-2xl p-6 text-center hover:border-secondary/20 hover:-translate-y-0.5 transition-all">
<div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
<stat.icon className="w-5 h-5" />
</div>
<p className="font-serif text-2xl md:text-3xl font-bold text-primary leading-none">{stat.value}</p>
<p className="font-sans text-[11px] font-bold uppercase tracking-wider text-cool-gray mt-3 leading-snug">{stat.label}</p>
</div>
))}
</div>
{/* Meet the Doctor + Clinic Tour — one flowing composition, not two boxed-off panes */}
<div id="our-doctor" className="max-w-5xl mx-auto pt-8 scroll-mt-24">
<div className="text-center max-w-2xl mx-auto mb-10">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
<Camera className="w-4 h-4 text-secondary" /> Step Inside neudental
</span>
<h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-3 leading-tight">
Your Smile Deserves The Right Dentist
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
<img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position ?? 'center' }} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
</div>
))}
</div>
</div>
<div className="marquee-row mt-3">
<div className="marquee-track marquee-reverse gap-3 px-1.5">
{[...CLINIC_ROW_2, ...CLINIC_ROW_2].map((photo, i) => (
<div key={`${photo.src}-${i}`} className="relative shrink-0 w-48 h-32 sm:w-56 sm:h-36 rounded-2xl overflow-hidden group">
<img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position ?? 'center' }} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
