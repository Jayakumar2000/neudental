import React, { useEffect, useState } from 'react';
import { Star, Quote, Users, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data';

const featuredTestimonial = TESTIMONIALS.find((t) => t.id === 'test-2') || TESTIMONIALS[0];

const SHOWCASE_SLIDES = [
  { src: '/doctor/dr-swetha.jpg', alt: 'Dr. Swetha, Clinical Director at neudental', caption: 'Dr. Swetha', subcaption: 'BDS, FGDS · Clinical Director', objectPosition: 'object-top' },
  { src: '/clinic/Treatment_Room_Wide_neudental_clinic.jpeg', alt: 'Modern treatment room at neudental clinic', caption: 'Modern Treatment Rooms', subcaption: 'Fully-equipped, Class-B sterilized', objectPosition: 'object-center' },
  { src: '/clinic/Dental_Chair_Operatory_neudental_clinic.jpeg', alt: 'Dental chair and operatory at neudental clinic', caption: 'Advanced Dental Chairs', subcaption: 'Comfort-first patient experience', objectPosition: 'object-center' },
  { src: '/clinic/Waiting_Area_Reception_neudental_clinic.jpeg', alt: 'Waiting area and reception at neudental clinic', caption: 'Welcoming Reception', subcaption: 'A calm space from the moment you arrive', objectPosition: 'object-center' },
  { src: '/clinic/Consultation_Desk_neudental_clinic.jpeg', alt: 'Consultation desk at neudental clinic', caption: 'One-on-one Consultation', subcaption: 'Personalized treatment planning', objectPosition: 'object-center' },
];

const SLIDE_DURATION_MS = 3800;

export default function BookingTrustPanel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-6 h-full">
      <div className="relative rounded-2xl overflow-hidden border border-cool-gray/10 aspect-[4/3] bg-cool-gray/10">
        {SHOWCASE_SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover ${slide.objectPosition} transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="text-white">
            <p className="font-serif font-bold text-lg leading-tight">{SHOWCASE_SLIDES[activeSlide].caption}</p>
            <p className="text-[11px] font-sans font-medium text-white/80 uppercase tracking-wide">{SHOWCASE_SLIDES[activeSlide].subcaption}</p>
          </div>
          <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg shrink-0">
            <div className="flex items-center gap-0.5 text-[#FBBF24]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="leading-tight">
              <span className="text-sm font-bold text-primary font-sans block">5.0</span>
              <span className="text-[9px] text-cool-gray font-sans font-bold uppercase tracking-wide whitespace-nowrap">150+ Reviews</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {SHOWCASE_SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${index + 1}: ${slide.caption}`}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === activeSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'}`}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-cool-gray/10 pt-5">
        <Quote className="w-5 h-5 text-secondary/40 mb-2" />
        <p className="font-sans text-sm text-on-surface-variant leading-relaxed italic">&ldquo;{featuredTestimonial.text}&rdquo;</p>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold font-sans shrink-0">{featuredTestimonial.initials}</div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-primary font-sans">{featuredTestimonial.name}</p>
            <p className="text-[11px] text-cool-gray font-sans">{featuredTestimonial.treatmentRecceived} Patient</p>
          </div>
        </div>
      </div>

      <div className="border-t border-cool-gray/10 pt-5 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0"><Users className="w-4.5 h-4.5" /></div>
          <div className="leading-tight">
            <p className="font-serif font-bold text-primary text-base">3,000+</p>
            <p className="text-[10px] text-cool-gray font-sans font-bold uppercase tracking-wide">Happy Patients</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0"><ShieldCheck className="w-4.5 h-4.5" /></div>
          <div className="leading-tight">
            <p className="font-serif font-bold text-primary text-base">99.8%</p>
            <p className="text-[10px] text-cool-gray font-sans font-bold uppercase tracking-wide">Sterilization Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
