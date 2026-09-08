import React, { useEffect, useState } from 'react';

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

// ---------------------------------------------------------------------------
// Variant A: Continuous auto-scrolling marquee strip (no buttons, no pause
// points -- photos glide past in a seamless infinite loop).
// ---------------------------------------------------------------------------
export function GalleryVariantMarquee() {
  const loopSlides = [...GALLERY_SLIDES, ...GALLERY_SLIDES];
  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex gap-6 w-max animate-[gallery-marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {loopSlides.map((slide, i) => (
          <div key={`${slide.src}-${i}`} className="relative w-[280px] md:w-[340px] aspect-[4/3] rounded-2xl overflow-hidden premium-shadow border border-cool-gray/10 shrink-0 group">
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-4 right-4 text-white font-sans font-bold text-sm">{slide.caption}</p>
          </div>
        ))}
      </div>
      <style>{`@keyframes gallery-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant B: Auto-advancing multi-card slider (3 cards visible on desktop,
// 1 on mobile), sliding forward every few seconds with dot indicators.
// ---------------------------------------------------------------------------
export function GalleryVariantSlider() {
  const [index, setIndex] = useState(0);
  const perView = 3;

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % GALLERY_SLIDES.length), 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {[...GALLERY_SLIDES, ...GALLERY_SLIDES.slice(0, perView)].map((slide, i) => (
            <div key={`${slide.src}-${i}`} className="w-full sm:w-1/3 shrink-0 px-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden premium-shadow border border-cool-gray/10">
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 right-4 text-white font-sans font-bold text-sm">{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-6">
        {GALLERY_SLIDES.map((slide, i) => (
          <span key={slide.src} className={`h-1.5 rounded-full transition-all duration-300 ${i === index % GALLERY_SLIDES.length ? 'w-6 bg-secondary' : 'w-1.5 bg-cool-gray/20'}`} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant C: One large, highly visible hero card at a time (crossfade),
// with a bold caption overlay and big dot navigation -- maximizes size and
// impact per photo instead of showing several smaller ones at once.
// ---------------------------------------------------------------------------
export function GalleryVariantBigCards() {
  const [index, setIndex] = useState(0);
  const total = GALLERY_SLIDES.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="flex items-center justify-center px-4">
      {/* Previous photo, blurred peek -- hints there's a stack behind the main card */}
      <div className="w-14 sm:w-20 aspect-[2/3] rounded-2xl overflow-hidden -mr-3 sm:-mr-5 shrink-0 blur-[2px] opacity-50 scale-95 transition-all duration-700">
        <img src={GALLERY_SLIDES[prevIndex].src} alt="" aria-hidden="true" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 w-[220px] sm:w-[280px] aspect-[2/3] rounded-3xl overflow-hidden premium-shadow border border-cool-gray/10 shrink-0">
        {GALLERY_SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-serif font-bold text-xl md:text-2xl text-white leading-tight">{GALLERY_SLIDES[index].caption}</p>
        </div>
        <div className="absolute top-5 right-5 flex items-center gap-2">
          {GALLERY_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show photo ${i + 1}: ${slide.caption}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'}`}
            />
          ))}
        </div>
      </div>

      {/* Next photo, blurred peek */}
      <div className="w-14 sm:w-20 aspect-[2/3] rounded-2xl overflow-hidden -ml-3 sm:-ml-5 shrink-0 blur-[2px] opacity-50 scale-95 transition-all duration-700">
        <img src={GALLERY_SLIDES[nextIndex].src} alt="" aria-hidden="true" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
