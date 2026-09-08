import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface GallerySlide {
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY_SLIDES: GallerySlide[] = [
  { src: '/clinic/Entrance_neudental_clinic.jpeg', alt: 'neudental clinic storefront, Kodungaiyur, Chennai', caption: 'Our Clinic Entrance' },
  { src: '/clinic/Reception_Logo_Wall_neudental_clinic.jpeg', alt: 'neudental logo wall at the clinic entrance', caption: 'Reception & Welcome Area' },
  { src: '/clinic/Waiting_Area_Reception_neudental_clinic.jpeg', alt: 'Waiting area at neudental clinic', caption: 'Comfortable Waiting Lounge' },
  { src: '/clinic/Treatment_Room_Counter_neudental_clinic.jpeg', alt: 'Treatment room counter and workstation at neudental clinic', caption: 'Modern Treatment Room' },
  { src: '/clinic/Interior_Logo_Wall_neudental_clinic.jpeg', alt: 'neudental brand wall inside the clinic', caption: 'Inside neudental' },
];

// A real, natively-scrollable horizontal card carousel: drag/swipe/wheel-
// scroll it like any other horizontal-scroll site (snap points, momentum),
// plus a slow continuous auto-scroll that pauses the moment a visitor
// touches or hovers it, and resumes shortly after they let go. The slide
// list is duplicated so the auto-scroll loop is seamless. Matches the
// existing Testimonials strip's interaction pattern (no-scrollbar,
// snap-x, chevron buttons) for a consistent feel across the page.
export function ClinicGalleryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopSlides = [...GALLERY_SLIDES, ...GALLERY_SLIDES];

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-gallery-card]');
    const amount = (card?.offsetWidth ?? 260) + 24;
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const pauseAutoScroll = () => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const scheduleResume = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => { pausedRef.current = false; }, 2500);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    let last = performance.now();
    const SPEED_PX_PER_SEC = 34;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        el.scrollLeft += SPEED_PX_PER_SEC * dt;
        const halfway = el.scrollWidth / 2;
        if (el.scrollLeft >= halfway) {
          el.scrollLeft -= halfway;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto">
      <button
        type="button"
        onClick={() => { pauseAutoScroll(); scrollByCard(-1); scheduleResume(); }}
        aria-label="Previous photo"
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white premium-shadow border border-cool-gray/10 items-center justify-center text-primary hover:text-secondary hover:border-secondary/30 transition-all cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => { pauseAutoScroll(); scrollByCard(1); scheduleResume(); }}
        aria-label="Next photo"
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white premium-shadow border border-cool-gray/10 items-center justify-center text-primary hover:text-secondary hover:border-secondary/30 transition-all cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={scheduleResume}
        onPointerDown={pauseAutoScroll}
        onPointerUp={scheduleResume}
        onTouchStart={pauseAutoScroll}
        onTouchEnd={scheduleResume}
        className="flex gap-6 overflow-x-auto no-scrollbar px-4 sm:px-0 cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
      >
        {loopSlides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            data-gallery-card
            className="relative shrink-0 snap-start w-[210px] sm:w-[250px] md:w-[270px] aspect-[2/3] rounded-2xl overflow-hidden premium-shadow border border-cool-gray/10 select-none group"
          >
            <img src={slide.src} alt={slide.alt} draggable={false} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-white font-serif font-bold text-base leading-tight">{slide.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
