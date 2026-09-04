import React, { useEffect, useState } from 'react';
import { Star, Quote, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import BookingForm from './BookingForm';

const featuredTestimonial = TESTIMONIALS.find((t) => t.id === 'test-2') || TESTIMONIALS[0];

export const SHOWCASE_SLIDES = [
  { src: '/doctor/dr-swetha.jpg', alt: 'Dr. Swetha, Clinical Director at neudental', caption: 'Dr. Swetha', subcaption: 'BDS, FGDS · Clinical Director', objectPosition: 'object-top' },
  { src: '/clinic/Treatment_Room_Wide_neudental_clinic.jpeg', alt: 'Modern treatment room at neudental clinic', caption: 'Modern Treatment Rooms', subcaption: 'Fully-equipped, Class-B sterilized', objectPosition: 'object-center' },
  { src: '/clinic/Dental_Chair_Operatory_neudental_clinic.jpeg', alt: 'Dental chair and operatory at neudental clinic', caption: 'Advanced Dental Chairs', subcaption: 'Comfort-first patient experience', objectPosition: 'object-center' },
  { src: '/clinic/Waiting_Area_Reception_neudental_clinic.jpeg', alt: 'Waiting area and reception at neudental clinic', caption: 'Welcoming Reception', subcaption: 'A calm space from the moment you arrive', objectPosition: 'object-center' },
  { src: '/clinic/Consultation_Desk_neudental_clinic.jpeg', alt: 'Consultation desk at neudental clinic', caption: 'One-on-one Consultation', subcaption: 'Personalized treatment planning', objectPosition: 'object-center' },
];

const SLIDE_DURATION_MS = 3800;

function useCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length), SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);
  return { activeSlide, setActiveSlide };
}

function CarouselImages({ activeSlide }: { activeSlide: number }) {
  return (
    <>
      {SHOWCASE_SLIDES.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover ${slide.objectPosition} transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </>
  );
}

function CarouselDots({ activeSlide, setActiveSlide }: { activeSlide: number; setActiveSlide: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
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
  );
}

// ---------------------------------------------------------------------------
// Variant 1: Full-height hero image with a glass overlay for trust content
// ---------------------------------------------------------------------------
export function BookingVariant1({ sticky = false }: { sticky?: boolean }) {
  const { activeSlide, setActiveSlide } = useCarousel();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-cool-gray/10 premium-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className={`relative order-2 lg:order-1 min-h-[520px] lg:min-h-0 ${sticky ? 'lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-7rem)]' : ''}`}>
          <CarouselImages activeSlide={activeSlide} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          <div className="absolute top-5 left-5">
            <CarouselDots activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-4">
            <div>
              <p className="font-serif font-bold text-2xl text-white leading-tight">{SHOWCASE_SLIDES[activeSlide].caption}</p>
              <p className="text-xs font-sans font-medium text-white/80 uppercase tracking-wide mt-1">{SHOWCASE_SLIDES[activeSlide].subcaption}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <Quote className="w-4 h-4 text-mint/70 mb-1.5" />
              <p className="font-sans text-xs text-white/90 leading-relaxed italic">&ldquo;{featuredTestimonial.text}&rdquo;</p>
              <p className="text-[11px] font-sans font-bold text-mint mt-2">{featuredTestimonial.name} &middot; {featuredTestimonial.treatmentRecceived} Patient</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
                <Star className="w-3.5 h-3.5 fill-current text-[#FBBF24]" />
                <span className="text-xs font-bold text-white font-sans">5.0 &middot; 150+ Reviews</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
                <Users className="w-3.5 h-3.5 text-mint" />
                <span className="text-xs font-bold text-white font-sans">3,000+ Patients</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
                <ShieldCheck className="w-3.5 h-3.5 text-mint" />
                <span className="text-xs font-bold text-white font-sans">99.8% Sterilized</span>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <BookingForm preSelectedTreatmentId="checkup" bare />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant 2: Same visual language as Variant 1, but the image panel sticks
// while the taller form scrolls beside it.
// ---------------------------------------------------------------------------
export function BookingVariant2() {
  return <BookingVariant1 sticky />;
}

// ---------------------------------------------------------------------------
// Variant 3: Wide cinematic carousel strip across the top, slim stat ticker,
// booking form centered below as its own card.
// ---------------------------------------------------------------------------
export function BookingVariant3() {
  const { activeSlide, setActiveSlide } = useCarousel();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden premium-shadow border border-cool-gray/10 h-72 mb-6">
        <CarouselImages activeSlide={activeSlide} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-serif font-bold text-2xl text-white leading-tight">{SHOWCASE_SLIDES[activeSlide].caption}</p>
            <p className="text-xs font-sans font-medium text-white/80 uppercase tracking-wide mt-1">{SHOWCASE_SLIDES[activeSlide].subcaption}</p>
          </div>
          <CarouselDots activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8 py-4 border-y border-cool-gray/10">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-current text-[#FBBF24]" />
          <span className="text-sm font-bold text-primary font-sans">5.0</span>
          <span className="text-xs text-cool-gray font-sans">(150+ Reviews)</span>
        </div>
        <span className="w-px h-4 bg-cool-gray/20 hidden sm:block" />
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary" />
          <span className="text-sm font-bold text-primary font-sans">3,000+</span>
          <span className="text-xs text-cool-gray font-sans">Happy Patients</span>
        </div>
        <span className="w-px h-4 bg-cool-gray/20 hidden sm:block" />
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span className="text-sm font-bold text-primary font-sans">99.8%</span>
          <span className="text-xs text-cool-gray font-sans">Sterilization Rate</span>
        </div>
        <span className="w-px h-4 bg-cool-gray/20 hidden sm:block" />
        <div className="flex items-center gap-2 max-w-xs">
          <Quote className="w-4 h-4 text-secondary shrink-0" />
          <span className="text-xs text-on-surface-variant font-sans italic">&ldquo;{featuredTestimonial.text.slice(0, 60)}&hellip;&rdquo; &mdash; {featuredTestimonial.name}</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <BookingForm preSelectedTreatmentId="checkup" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant 4: Minimal. One static doctor photo + a single trust strip, no
// carousel, no split panel -- the form stays the clear focal point.
// ---------------------------------------------------------------------------
export function BookingVariant4() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-cool-gray/10 premium-shadow overflow-hidden">
        <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary to-secondary">
          <img src="/doctor/dr-swetha.jpg" alt="Dr. Swetha, Clinical Director at neudental" className="w-14 h-14 rounded-full object-cover object-top border-2 border-white/60 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-serif font-bold text-white text-sm leading-tight">Dr. Swetha, BDS, FGDS</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-current text-[#FBBF24]" />
              <span className="text-[11px] font-bold text-white font-sans">5.0</span>
              <span className="text-[11px] text-white/80 font-sans">&middot; 150+ Reviews &middot; 3,000+ Patients &middot; 99.8% Sterilized</span>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-white/70 shrink-0 hidden sm:block" />
        </div>
        <BookingForm preSelectedTreatmentId="checkup" bare />
      </div>
    </div>
  );
}
