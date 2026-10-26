import React from 'react';
import { DOCTORS } from '../data';
import { SmileCurve } from './BrandShapes';
import { GraduationCap, Camera, Award, Users, Activity, Sparkles, Home, ArrowRight } from 'lucide-react';
import { Link } from '../lib/navigation';
import { DOCTOR_PATH } from '../lib/routes';

// `featured` gets the filled navy ring so the eye lands on it first.
export const TRUST_STATS = [
  { icon: Award, value: '5+', label: 'Years of trusted dental care' },
  { icon: Users, value: '3,000+', label: 'Happy patients treated', featured: true },
  { icon: Activity, value: '5,000+', label: 'Procedures completed' },
  { icon: Home, value: '200+', label: 'Home visits for senior citizens' },
  { icon: Sparkles, value: '99.8%', label: 'Sterilization success rate' },
];

interface GalleryPhoto {
  src: string;
  alt: string;
  position?: string;
}

const CLINIC_PHOTOS: GalleryPhoto[] = [
  { src: '/clinic/Entrance_neudental_clinic.webp', alt: 'neudental clinic storefront and signage, Kodungaiyur, Chennai', position: 'top' },
  { src: '/clinic/Signboard_neudental_clinic.webp', alt: 'neudental clinic signboard with address, timings and Dr. Swetha U details' },
  { src: '/clinic/Dental_Chair_neudental_clinic.webp', alt: 'Dental treatment chair and operatory at neudental clinic' },
  { src: '/clinic/Dental_Chair_Operatory_neudental_clinic.webp', alt: 'Fully equipped dental operatory at neudental clinic' },
  { src: '/clinic/Treatment_Room_neudental_clinic.webp', alt: 'Treatment room interior at neudental clinic' },
  { src: '/clinic/Treatment_Room_Wide_neudental_clinic.webp', alt: 'Wide view of the treatment room at neudental clinic' },
  { src: '/clinic/Treatment_Room_Counter_neudental_clinic.webp', alt: 'Treatment room counter and workstation at neudental clinic' },
  { src: '/clinic/Consultation_Desk_neudental_clinic.webp', alt: 'Consultation desk and waiting area at neudental clinic' },
  { src: '/clinic/Reception_Logo_Wall_neudental_clinic.webp', alt: 'neudental logo wall at the clinic entrance' },
  { src: '/clinic/Interior_Logo_Wall_neudental_clinic.webp', alt: 'neudental brand wall inside the clinic' },
  { src: '/clinic/Neudental_Clinic_logo_signage.webp', alt: 'neudental clinic logo signage close-up' },
  { src: '/clinic/Waiting_Area_Reception_neudental_clinic.webp', alt: 'Waiting area and reception at neudental clinic' },
];

const CLINIC_ROW_1 = CLINIC_PHOTOS.filter((_, i) => i % 2 === 0);
const CLINIC_ROW_2 = CLINIC_PHOTOS.filter((_, i) => i % 2 === 1);

export default function About({ onScrollToBooking }: { onScrollToBooking?: () => void }) {
const doc = DOCTORS[0];

return (
<section id="about" className="py-14 lg:py-20 bg-white px-6 md:px-10 lg:px-16 scroll-mt-24">
<div className="max-w-[1280px] mx-auto w-full">
{/* Section Title */}
<div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">
Why Patients Trust Us
</span>
<h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">
Excellence you can see in the{' '}
<span className="relative inline-block italic font-semibold">
numbers
<SmileCurve stroke="#00D4C9" className="absolute -left-[4%] -bottom-2.5 w-[108%] h-4" />
</span>
</h2>
</div>
{/* Trust stats: milestone rings joined by a dotted smile curve (desktop),
a vertical timeline of small rings (phones and tablets). */}
<div className="max-w-6xl mx-auto mb-20">
<ul className="relative flex flex-col gap-4 max-w-sm mx-auto lg:max-w-none lg:flex-row lg:justify-between lg:gap-4">
<svg aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="none" className="hidden lg:block absolute left-[8%] w-[84%] top-[39px] xl:top-[45px] h-[60px] pointer-events-none">
<path d="M0 30 C 125 -10, 125 70, 250 30 S 375 -10, 500 30 S 625 70, 750 30 S 875 -10, 1000 30" fill="none" stroke="#00D4C9" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
</svg>
<span aria-hidden="true" className="lg:hidden absolute left-[33px] top-9 bottom-9 border-l-[3px] border-dotted border-[#00D4C9]" />
{TRUST_STATS.map((stat) => (
<li key={stat.label} className="relative flex items-center gap-4 lg:flex-1 lg:flex-col lg:gap-0 lg:text-center">
<div className={`shrink-0 rounded-full border-2 flex flex-col items-center justify-center w-[68px] h-[68px] lg:w-[132px] lg:h-[132px] xl:w-[150px] xl:h-[150px] lg:gap-1.5 shadow-[0_20px_40px_-20px_rgba(11,19,65,0.4)] ${stat.featured ? 'bg-primary border-[#00fff2] ring-8 ring-[#00fff2]/12' : 'bg-white border-[#00D4C9] ring-8 ring-[#00D4C9]/8'}`}>
<stat.icon aria-hidden="true" className={`w-5 h-5 lg:w-[18px] lg:h-[18px] ${stat.featured ? 'text-[#00fff2]' : 'text-secondary'}`} />
<span className={`hidden lg:block font-display font-bold leading-none lg:text-[27px] xl:text-[31px] ${stat.featured ? 'text-white' : 'text-primary'}`}>{stat.value}</span>
</div>
<div className="lg:mt-6">
<p className="lg:hidden font-display font-bold text-2xl text-primary leading-none">{stat.value}</p>
<p className="font-sans text-[13px] lg:text-sm font-semibold lg:font-bold text-cool-gray lg:text-primary mt-1 lg:mt-0 leading-snug lg:max-w-[170px] lg:mx-auto">{stat.label}</p>
</div>
</li>
))}
</ul>
{onScrollToBooking && (
<div className="mt-10 lg:mt-12 flex justify-center">
<p className="inline-flex items-center gap-3 bg-white border border-cool-gray/15 rounded-full py-2 pl-5 max-[359px]:pl-2 pr-2 font-sans text-sm text-on-surface-variant whitespace-nowrap">
<span className="hidden sm:inline">Be one of the next 3,000 smiles</span>
<span className="sm:hidden max-[359px]:hidden">Join 3,000+ happy patients</span>
<button type="button" onClick={onScrollToBooking} className="bg-primary hover:bg-secondary text-white rounded-full min-h-10 px-4 font-bold text-[13px] transition-colors cursor-pointer">Book your visit</button>
</p>
</div>
)}
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
A modern, fully-equipped dental practice in the heart of Kodungaiyur — take a look inside, and meet the surgeon behind every treatment.
</p>
</div>

<div className="rounded-[2rem] border border-cool-gray/10 premium-shadow overflow-hidden bg-white">
{/* Doctor Bio */}
<div className="p-5 sm:p-8 md:p-10">
<div className="flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8">
<div className="w-full sm:w-56 md:w-64 shrink-0">
<div className="aspect-[4/5] rounded-2xl overflow-hidden bg-cool-gray/10 premium-shadow">
<img
src="/doctor/dr-swetha.webp"
alt="Dr. Swetha U, Lead Dental Surgeon at neudental"
loading="lazy"
className="w-full h-full object-cover object-top"
/>
</div>
</div>
<div className="flex-1 text-left">
<span className="text-secondary font-sans text-xs tracking-wider uppercase font-bold font-display block mb-1">
{doc.specialty}
</span>
<h4 className="font-serif text-xl sm:text-2xl font-bold text-primary">
{doc.name}, <span className="text-[14px] sm:text-[18px]">{doc.title}</span>
</h4>
<p className="font-sans text-sm font-medium text-cool-gray mt-1 flex items-start gap-1.5">
<GraduationCap className="w-4 h-4 text-secondary shrink-0 mt-0.5" /> <span>{doc.education} &amp; {doc.experience}</span>
</p>
<p className="font-sans text-base text-on-surface-variant leading-relaxed mt-4">
{doc.bio}
</p>
<div className="flex flex-wrap justify-start gap-1.5 mt-5 pt-5 border-t border-cool-gray/10">
{doc.skills.map((skill) => (
<span key={skill} className="bg-surface-alt border border-cool-gray/20 text-on-surface text-sm px-2.5 py-1 rounded-full flex items-center gap-1">
<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
{skill}
</span>
))}
</div>
<Link to={DOCTOR_PATH} className="inline-flex items-center gap-1.5 mt-5 font-sans text-sm font-bold text-primary hover:text-secondary transition-colors">Read {doc.name}'s full profile <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
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
<img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.position ?? 'center' }} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
</div>
))}
</div>
</div>
<div className="marquee-row mt-3">
<div className="marquee-track marquee-reverse gap-3 px-1.5">
{[...CLINIC_ROW_2, ...CLINIC_ROW_2].map((photo, i) => (
<div key={`${photo.src}-${i}`} className="relative shrink-0 w-48 h-32 sm:w-56 sm:h-36 rounded-2xl overflow-hidden group">
<img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.position ?? 'center' }} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
