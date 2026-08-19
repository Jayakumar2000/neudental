import React, { useRef } from 'react';
import { TESTIMONIALS } from '../data';
import { Star, ShieldCheck, ThumbsUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-testimonial-card]');
    const amount = (card?.offsetWidth ?? 340) + 32; // card width + gap
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="py-24 bg-white px-6 md:px-10 lg:px-16 border-b border-cool-gray/5">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">
            Genuine Patient Stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">
            Loved By Families Across Chennai
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-6" />
          <p className="font-sans text-base text-on-surface-variant mt-4 leading-relaxed">
            Read transparent, unedited stories path-checked directly from Google Maps reviews of our Kodungaiyur practice.
          </p>
        </div>

        {/* Rating Metrics Header */}
        <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-cool-gray/10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16 items-center">
          <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-cool-gray/10 pb-6 md:pb-0">
            <span className="text-sm font-sans font-medium text-cool-gray block uppercase tracking-widest">Aggregate Rating</span>
            <strong className="text-4xl font-display font-extrabold text-primary block">4.9 / 5.0</strong>
            <div className="flex gap-1 justify-center text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-cool-gray/10 pb-6 md:pb-0">
            <span className="text-sm font-sans font-medium text-cool-gray block uppercase tracking-widest">Verified Reviews</span>
            <strong className="text-4xl font-display font-extrabold text-primary block">125+</strong>
            <span className="font-sans text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
              100% Patient Authenticated
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-sm font-sans font-medium text-cool-gray block uppercase tracking-widest">Post-Procedure Comfort</span>
            <p className="text-base font-bold text-primary">No Pain Guarantee</p>
            <p className="font-sans text-xs text-on-surface-variant px-4">
              98% of patients report zero pain following root canals (RCT).
            </p>
          </div>
        </div>

        {/* Testimonials — horizontal scroll strip with prev/next controls, no card left hanging alone on its own row */}
        <div className="relative max-w-6xl mx-auto">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous review"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white premium-shadow border border-cool-gray/10 items-center justify-center text-primary hover:text-secondary hover:border-secondary/30 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next review"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white premium-shadow border border-cool-gray/10 items-center justify-center text-primary hover:text-secondary hover:border-secondary/30 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2"
          >
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              data-testimonial-card
              className="bg-white border border-cool-gray/10 rounded-2xl p-8 premium-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group shrink-0 snap-start w-[300px] sm:w-[360px]"
            >
              {/* Giant quote layout background absolute */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-cool-gray/5 select-none pointer-events-none group-hover:text-secondary/5 transition-colors duration-300" />
              
              <div>
                {/* 5 Stars */}
                <div className="flex text-amber-500 gap-1 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-sans text-sm text-primary italic leading-relaxed mb-6 select-text">
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>

              {/* Bottom bio info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-cool-gray/5 mt-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden select-none bg-cool-gray/10 border border-cool-gray/5 relative flex items-center justify-center shrink-0">
                  {test.imgUrl ? (
                    <img
                      alt={test.imgAlt}
                      src={test.imgUrl}
                      className="w-full h-full object-cover absolute inset-0 z-10"
                      onError={(e) => {
                        // Fallback if avatar doesn't resolve or loads poorly
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  {/* Fallback Initials */}
                  <div className="w-full h-full bg-secondary text-white text-xs font-bold flex items-center justify-center">
                    {test.initials}
                  </div>
                </div>

                <div className="font-sans leading-tight">
                  <h4 className="font-bold text-sm text-primary">
                    {test.name}
                  </h4>
                  <p className="text-[10px] text-cool-gray font-medium mt-0.5">
                    {test.role}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1">
                    ✓ {test.treatmentRecceived}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
