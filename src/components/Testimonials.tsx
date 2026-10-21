import React, { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS, REVIEW_RATING, REVIEW_COUNT_LABEL, CLINIC_GOOGLE_URL } from '../data';
import { Star, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Rings, SmileCurve } from './BrandShapes';

// Only platforms with a real, square icon-only mark on file go here — a full
// wordmark logo doesn't fit these small circular slots legibly.
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

// Each source logo on its white 30px circle, pre-rendered at 4x (see the rating tile).
const SOURCE_CIRCLES: Record<string, string> = {
  google: '/logos/google-circle.png',
  practo: '/logos/practo-circle.png',
  justdial: '/logos/justdial-circle.png',
};

const SOURCES = ['google', 'practo', 'justdial'] as const;

function Stars({ className }: { className: string }) {
  return (
    <span className="flex gap-[0.2em] text-[#F5B942]" role="img" aria-label="Rated 5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden="true" className={`fill-current ${className}`} />)}
    </span>
  );
}

const ROTATE_MS = 5000;

// Every testimonial in one white card, cross-fading to the next every 5s
// while it's on screen. It pauses on hover, touch and keyboard focus, and
// never rotates by itself for prefers-reduced-motion. All stories share one
// grid cell, so the card keeps the tallest story's height and the page below
// never jumps.
function StoryCard() {
  const cardRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = TESTIMONIALS.length;
  const autoplay = !paused && onScreen && !reducedMotion;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 });
    io.observe(card);
    return () => io.disconnect();
  }, []);

  // Restarts on every change of story, so a manual step gets a full 5s too.
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % count), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, autoplay, count]);

  return (
    <article
      ref={cardRef}
      aria-roledescription="carousel"
      aria-label="Patient stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="bg-white text-primary rounded-[28px] p-7 md:p-10 flex flex-col justify-between gap-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase bg-[#00fff2] text-primary px-3 py-1.5 rounded-full">
          Patient stories
        </span>
        <svg aria-hidden="true" width="48" height="36" viewBox="0 0 64 48">
          <path d="M0 48V28C0 12 8 3 24 0l3 7C17 10 13 16 13 24h12v24zm36 0V28c0-16 8-25 24-28l3 7c-10 3-14 9-14 17h12v24z" fill="#0557BC" opacity="0.14" />
        </svg>
      </div>

      {/* Announce a new story only when someone stepped to it themselves */}
      <div className="grid flex-1" aria-live={autoplay ? 'off' : 'polite'}>
        {TESTIMONIALS.map((t, i) => {
          const at = t.text.indexOf(t.highlight);
          const shown = i === active;
          return (
            <div
              key={t.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!shown}
              className={`[grid-area:1/1] flex flex-col justify-between gap-6 transition-opacity duration-700 ${shown ? 'opacity-100' : 'opacity-0 invisible'}`}
            >
              <p className="font-serif italic text-lg md:text-xl leading-relaxed">
                {at >= 0 ? (
                  <>
                    {t.text.slice(0, at)}
                    <mark className="highlight-mark bg-transparent text-inherit not-italic font-semibold">{t.highlight}</mark>
                    {t.text.slice(at + t.highlight.length)}
                  </>
                ) : t.text}
              </p>
              <div className="flex items-center gap-3.5 border-t border-[#E2E8F0] pt-5">
                <span aria-hidden="true" className="w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center font-display font-bold text-lg shrink-0">
                  {t.initials}
                </span>
                <div className="font-sans leading-tight">
                  <h3 className="font-bold text-base">{t.name}</h3>
                  <p className="flex items-center gap-1.5 text-[13px] text-on-surface-variant mt-1">
                    {t.sourceLogo && <img src={SOURCE_LOGOS[t.sourceLogo]} alt="" className="w-4 h-4 object-contain" />}
                    Verified on {t.sourceLogo ? SOURCE_LABELS[t.sourceLogo] : 'review'} · {t.treatmentRecceived}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center -ml-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show story ${i + 1} of ${count}`}
              aria-current={i === active ? 'true' : undefined}
              className="p-2 cursor-pointer"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-secondary' : 'w-2 bg-[#CBD5E1]'}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setActive((active + count - 1) % count)}
            aria-label="Previous story"
            className="w-11 h-11 rounded-full border border-[#CBD5E1] bg-white text-primary flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setActive((active + 1) % count)}
            aria-label="Next story"
            className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

interface TestimonialsProps {
  onScrollToBooking?: () => void;
}

export default function Testimonials({ onScrollToBooking }: TestimonialsProps) {
  const goToBooking = () => {
    if (onScrollToBooking) onScrollToBooking();
    else document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-primary text-white py-14 lg:py-20 scroll-mt-24">
      <Rings className="hidden md:block -right-56 -top-64 w-[720px] h-[720px] opacity-[0.07]" />
      <Rings count={2} className="hidden md:block -left-64 -bottom-72 w-[560px] h-[560px] opacity-[0.05]" />

      <div className="relative max-w-[1120px] mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[#00fff2] font-sans text-xs font-bold tracking-[0.2em] uppercase">
              Genuine Patient Stories
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl leading-tight mt-3">
              Loved by{' '}
              <span className="relative inline-block italic font-semibold">
                families
                <SmileCurve className="absolute -left-[4%] -bottom-2.5 w-[108%] h-4" />
              </span>{' '}
              across Chennai
            </h2>
          </div>
          <p className="font-sans text-base text-[#C7CDE6] leading-relaxed lg:max-w-sm">
            Real words from real visits, verified on Google, Practo and Justdial.
          </p>
        </div>


        {/* Stories and rating side by side (rating first on phones), then
        the booking tile across the full width. */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <StoryCard />

          {/* Rating: first on phones, beside the stories from tablets up */}
          <div className="order-first md:order-none relative overflow-hidden rounded-[28px] px-6 py-9 md:px-10 md:py-9 bg-[radial-gradient(120%_90%_at_50%_0%,#0A6BE0_0%,#0557BC_32%,#0B1341_88%)] border border-[#00fff2]/40 shadow-[0_0_0_8px_rgba(0,255,242,0.05),0_30px_60px_-24px_rgba(0,0,0,0.55)] flex flex-col items-center justify-between gap-7 text-center">
            <Rings count={4} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] w-[520px] h-[520px] opacity-[0.13]" />
            <span className="relative font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#00fff2]">
              Average patient rating
            </span>
            <div className="relative flex flex-col items-center gap-4">
              <p className="flex items-start gap-2" aria-label={`${REVIEW_RATING} out of 5`}>
                <span className="font-display font-bold text-7xl md:text-[96px] lg:text-[104px] leading-[0.85] tracking-[-0.04em] [text-shadow:0_10px_40px_rgba(0,255,242,0.25)]">
                  {REVIEW_RATING}
                </span>
                <span aria-hidden="true" className="font-display font-medium text-lg md:text-xl text-[#9FB3E8] mt-1.5">/5</span>
              </p>
              <SmileCurve className="w-36 md:w-44 h-4 -mt-1" />
              <Stars className="w-6 h-6 md:w-7 md:h-7" />
              <p className="font-sans text-sm md:text-base text-[#E2E8F8]">
                from <strong className="font-display text-lg text-white">{REVIEW_COUNT_LABEL}</strong> verified patient reviews
              </p>
            </div>
            <ul className="relative w-full grid grid-cols-3 gap-2.5">
              {SOURCES.map((src) => (
                <li key={src} className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-2.5 px-2 py-3 rounded-2xl bg-white/[0.08] border border-white/[0.14] font-sans text-sm font-semibold">
                  {/* The white circle is part of the image, so a browser dark mode can't turn it dark. */}
                  <img src={SOURCE_CIRCLES[src]} alt="" loading="lazy" className="w-[30px] h-[30px] shrink-0" />
                  {SOURCE_LABELS[src]}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 rounded-3xl border-2 border-dashed border-[#00fff2]/45 p-7 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="font-serif text-xl md:text-2xl font-bold">
              Your smile could be <em className="text-[#00fff2]">next.</em>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={goToBooking}
                className="inline-flex items-center min-h-12 px-6 rounded-xl bg-[#00fff2] text-primary font-sans text-xs font-bold uppercase tracking-[0.12em] hover:bg-white transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#00fff2]"
              >
                Book your visit
              </button>
              <a
                href={CLINIC_GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#00fff2] hover:text-white transition-colors"
              >
                Read all reviews on Google <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
