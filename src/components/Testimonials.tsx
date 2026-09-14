import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Star, ShieldCheck, ThumbsUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const AUTOPLAY_MS = 4500;
const TRANSITION_MS = 600;

// Three back-to-back copies so the strip can move a few steps in either
// direction from any position without running out of cards -- looping back to
// copy 2 (index === count) happens with the same transition as any other
// step, instead of visibly resetting to look like a first-review jump-cut.
const LOOPED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

// Only platforms with a real, square icon-only mark on file go here — a full
// wordmark logo doesn't fit this avatar-sized circular slot legibly.
const SOURCE_LOGOS: Partial<Record<string, string>> = {
  google: '/logos/google-icon.png',
  practo: '/logos/practo-icon.jpeg',
  justdial: '/logos/justdial-icon.png',
};

const SOURCE_LABELS: Partial<Record<string, string>> = {
  google: 'Google',
  practo: 'Practo',
  justdial: 'Justdial',
};

export default function Testimonials() {
  const count = TESTIMONIALS.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(count); // start in the middle copy
  const [step, setStep] = useState(392); // card width + gap, measured below
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Measure the real card width (it changes at the sm: breakpoint) instead of
  // hard-coding it, so the slide distance always matches what's on screen.
  useLayoutEffect(() => {
    const measure = () => {
      const card = trackRef.current?.querySelector<HTMLElement>('[data-testimonial-card]');
      if (card) setStep(card.offsetWidth + 32); // + gap-8
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const goTo = (nextIndex: number) => {
    setAnimate(true);
    setIndex(nextIndex);
  };
  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  // Once a step lands on the outer copies, snap back to the equivalent card
  // in the middle copy with the transition switched off for one frame --
  // invisible, since every copy holds identical cards in the same order.
  const handleTransitionEnd = () => {
    if (index >= count * 2) {
      setAnimate(false);
      setIndex(index - count);
    } else if (index < count) {
      setAnimate(false);
      setIndex(index + count);
    }
  };
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  // Auto-advance at a steady, readable pace; pauses on hover/focus so a
  // visitor mid-review isn't fighting the carousel, and never runs at all for
  // prefers-reduced-motion (manual prev/next still work either way).
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reducedMotion]);

  return (
    <section id="testimonials" className="py-14 lg:py-20 bg-white px-6 md:px-10 lg:px-16 border-b border-cool-gray/5 scroll-mt-24">
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
            Real reviews from our patients at Neudental Clinic that are verified directly from the sources - Google, Practo, and Justdial.
          </p>
        </div>

        {/* Rating Metrics Header */}
        <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-cool-gray/10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16 items-center">
          <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-cool-gray/10 pb-6 md:pb-0">
            <span className="text-sm font-sans font-medium text-cool-gray block uppercase tracking-widest">Aggregate Rating</span>
            <strong className="text-4xl font-display font-extrabold text-primary block">4.97 / 5.0</strong>
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
            <strong className="text-4xl font-display font-extrabold text-primary block">150+</strong>
            <span className="font-sans text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
              100% Patient Authenticated
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-sm font-sans font-medium text-cool-gray block uppercase tracking-widest">Post-Procedure Comfort</span>
            <strong className="text-4xl font-display font-extrabold text-primary block">98%</strong>
            <span className="font-sans text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
              Zero Pain After RCT
            </span>
          </div>
        </div>

        {/* Testimonials — seamless auto-rolling carousel, three looped copies
        of the deck so it can always step in either direction without a
        visible reset; pauses on hover/focus and for prefers-reduced-motion. */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous review"
            className="flex absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-11 md:h-11 rounded-full bg-white premium-shadow border border-cool-gray/10 items-center justify-center text-primary hover:text-secondary hover:border-secondary/30 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next review"
            className="flex absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-11 md:h-11 rounded-full bg-white premium-shadow border border-cool-gray/10 items-center justify-center text-primary hover:text-secondary hover:border-secondary/30 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="overflow-hidden pb-2">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className="flex gap-8"
            style={{
              transform: `translateX(-${index * step}px)`,
              transition: animate && !reducedMotion ? `transform ${TRANSITION_MS}ms ease` : 'none',
            }}
          >
          {LOOPED_TESTIMONIALS.map((test, i) => (
            <div
              key={`${test.id}-${i}`}
              data-testimonial-card
              className="bg-white border border-cool-gray/10 rounded-2xl p-8 premium-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group shrink-0 w-[300px] sm:w-[360px]"
            >
              {/* Giant quote layout background absolute */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-cool-gray/5 select-none pointer-events-none group-hover:text-secondary/5 transition-colors duration-300" />
              
              <div>
                <p className="font-sans text-sm text-primary italic leading-relaxed mb-6 select-text">
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>

              {/* Bottom bio info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-cool-gray/5 mt-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden select-none bg-cool-gray/10 border border-cool-gray/15 relative flex items-center justify-center shrink-0">
                  {test.imgUrl ? (
                    <img
                      alt={test.imgAlt}
                      src={test.imgUrl}
                      loading="lazy"
                      className="w-full h-full object-cover absolute inset-0 z-10"
                      onError={(e) => {
                        // Fallback if avatar doesn't resolve or loads poorly
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  {test.sourceLogo && SOURCE_LOGOS[test.sourceLogo] ? (
                    <div className="w-full h-full bg-white flex items-center justify-center p-1">
                      <img src={SOURCE_LOGOS[test.sourceLogo]} alt={`Review sourced from ${test.sourceLogo}`} loading="lazy" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    /* Fallback Initials */
                    <div className="w-full h-full bg-secondary text-white text-xs font-bold flex items-center justify-center">
                      {test.initials}
                    </div>
                  )}
                </div>

                <div className="font-sans leading-tight">
                  <h4 className="font-bold text-sm text-primary">
                    {test.name}
                  </h4>
                  <p className="text-[10px] text-cool-gray font-medium mt-0.5">
                    {test.sourceLogo && SOURCE_LABELS[test.sourceLogo] ? `via ${SOURCE_LABELS[test.sourceLogo]} Review` : test.role}
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
      </div>
    </section>
  );
}
