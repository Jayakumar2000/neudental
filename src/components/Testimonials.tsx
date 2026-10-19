import React, { useEffect, useRef, useState } from 'react';
import type { Testimonial } from '../types';
import { TESTIMONIALS, REVIEW_RATING, REVIEW_COUNT_LABEL, CLINIC_GOOGLE_URL } from '../data';
import { Star, ArrowUpRight } from 'lucide-react';

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

const SOURCES = ['google', 'practo', 'justdial'] as const;

// Reviews longer than this take two columns so their tile isn't a tall sliver.
const WIDE_REVIEW_CHARS = 200;

// Concentric rings echoing the brand mark, purely decorative.
function Rings({ className, count = 3 }: { className: string; count?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 720 720" className={`absolute pointer-events-none ${className}`}>
      {[340, 270, 200, 130].slice(4 - count).map((r) => (
        <circle key={r} cx="360" cy="360" r={r} fill="none" stroke="#00fff2" strokeWidth="2" />
      ))}
    </svg>
  );
}

// Hand-drawn smile, the section's signature underline.
function SmileCurve({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 28" preserveAspectRatio="none" className={className}>
      <path d="M4 6 C 60 30, 160 30, 216 6" fill="none" stroke="#00fff2" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function Stars({ className }: { className: string }) {
  return (
    <span className="flex gap-[0.2em] text-[#F5B942]" role="img" aria-label="Rated 5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden="true" className={`fill-current ${className}`} />)}
    </span>
  );
}

// The first testimonial, on a white card with its key words highlighted.
function FeaturedCard({ className }: { className: string }) {
  const featured = TESTIMONIALS[0];
  const at = featured.text.indexOf(featured.highlight);
  const before = at >= 0 ? featured.text.slice(0, at) : featured.text;
  const marked = at >= 0 ? featured.highlight : '';
  const after = at >= 0 ? featured.text.slice(at + featured.highlight.length) : '';
  return (
    <article className={`${className} bg-white text-primary rounded-[28px] p-7 md:p-10 flex flex-col justify-between gap-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1`}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase bg-[#00fff2] text-primary px-3 py-1.5 rounded-full">
            Featured story
          </span>
          <svg aria-hidden="true" width="48" height="36" viewBox="0 0 64 48">
            <path d="M0 48V28C0 12 8 3 24 0l3 7C17 10 13 16 13 24h12v24zm36 0V28c0-16 8-25 24-28l3 7c-10 3-14 9-14 17h12v24z" fill="#0557BC" opacity="0.14" />
          </svg>
        </div>
        <p className="font-serif italic text-lg md:text-xl leading-relaxed">
          {before}
          {marked && <mark className="highlight-mark bg-transparent text-inherit not-italic font-semibold">{marked}</mark>}
          {after}
        </p>
      </div>
      <div className="flex items-center gap-3.5 border-t border-[#E2E8F0] pt-5">
        <span aria-hidden="true" className="w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center font-display font-bold text-lg shrink-0">
          {featured.initials}
        </span>
        <div className="font-sans leading-tight">
          <h3 className="font-bold text-base">{featured.name}</h3>
          <p className="flex items-center gap-1.5 text-[13px] text-on-surface-variant mt-1">
            {featured.sourceLogo && <img src={SOURCE_LOGOS[featured.sourceLogo]} alt="" className="w-4 h-4 object-contain" />}
            Verified on {featured.sourceLogo ? SOURCE_LABELS[featured.sourceLogo] : 'review'} · {featured.treatmentRecceived}
          </p>
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ t, className }: { t: Testimonial; className: string }) {
  return (
    <article
      className={`${className} rounded-3xl p-6 md:p-7 bg-white/[0.06] border border-white/[0.12] flex flex-col justify-between gap-5 transition-colors duration-300 hover:border-[#00fff2]/45 hover:bg-white/[0.08] motion-safe:transition-[transform,background-color,border-color] motion-safe:hover:-translate-y-1`}
    >
      <div className="flex flex-col gap-3">
        <h3 className="flex items-center gap-2 font-serif italic text-lg text-[#00fff2]">
          <Star aria-hidden="true" className="w-3.5 h-3.5 fill-current text-[#F5B942] shrink-0" />
          &ldquo;{t.praise}&rdquo;
        </h3>
        <p className="font-sans text-sm leading-relaxed text-[#C7CDE6]">{t.text}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="flex items-center gap-2 font-sans text-sm font-bold">
          {t.sourceLogo && (
            <span className="w-6 h-6 rounded-full bg-white overflow-hidden flex items-center justify-center p-1 shrink-0">
              <img src={SOURCE_LOGOS[t.sourceLogo]} alt={`Review on ${SOURCE_LABELS[t.sourceLogo]}`} loading="lazy" className="w-full h-full object-contain" />
            </span>
          )}
          {t.name}
        </span>
        <span className="font-sans text-[11px] font-bold text-[#00fff2] bg-[#00fff2]/[0.12] px-2.5 py-1 rounded-full">
          {t.treatmentRecceived}
        </span>
      </div>
    </article>
  );
}

const AUTOPLAY_MS = 4500;
// After a swipe or tap, wait this long before advancing on its own again.
const RESUME_AFTER_MS = 6000;

// Phones only: every story in one swipeable row that advances on its own
// while it's on screen. It pauses while being touched or focused, and never
// moves by itself for prefers-reduced-motion.
function MobileReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.5 });
    io.observe(track);
    return () => io.disconnect();
  }, []);

  // Scrolls the row itself, never the page.
  const showCard = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    if (paused || !onScreen || reducedMotion) return;
    const id = window.setTimeout(() => showCard((active + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, onScreen, reducedMotion]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  const hold = () => {
    window.clearTimeout(resumeTimer.current);
    setPaused(true);
  };
  const release = () => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  };

  // The card nearest the middle of the row is the current one.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const middle = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    Array.from(track.children).forEach((el, i) => {
      const c = el as HTMLElement;
      const best = track.children[nearest] as HTMLElement;
      if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - middle) < Math.abs(best.offsetLeft + best.offsetWidth / 2 - middle)) nearest = i;
    });
    if (nearest !== active) setActive(nearest);
  };

  return (
    <div className="md:hidden -mx-6" role="region" aria-roledescription="carousel" aria-label="Patient reviews">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={hold}
        onTouchEnd={release}
        onPointerDown={hold}
        onPointerUp={release}
        onFocus={hold}
        onBlur={release}
        className="relative flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 pb-2 no-scrollbar"
      >
        {TESTIMONIALS.map((t, i) => (
          <div key={t.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} className="snap-center shrink-0 w-[86%] flex">
            {i === 0 ? <FeaturedCard className="flex w-full" /> : <ReviewCard t={t} className="flex w-full" />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-1">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => { hold(); showCard(i); release(); }}
            aria-label={`Show review ${i + 1} of ${count}`}
            aria-current={i === active ? 'true' : undefined}
            className="p-2 cursor-pointer"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-[#00fff2]' : 'w-2 bg-white/30'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

interface TestimonialsProps {
  onScrollToBooking?: () => void;
}

export default function Testimonials({ onScrollToBooking }: TestimonialsProps) {
  const rest = TESTIMONIALS.slice(1);

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

        {/* The wall: featured story and rating side by side, then the rest.
        One column on phones, two on tablets, four on desktop. */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-flow-dense gap-4">
          <FeaturedCard className="hidden md:flex md:col-span-2 lg:row-span-2" />

          {/* Rating: the same size as the featured story */}
          <div className="md:col-span-2 lg:row-span-2 relative overflow-hidden rounded-[28px] px-6 py-9 md:px-10 md:py-9 bg-[radial-gradient(120%_90%_at_50%_0%,#0A6BE0_0%,#0557BC_32%,#0B1341_88%)] border border-[#00fff2]/40 shadow-[0_0_0_8px_rgba(0,255,242,0.05),0_30px_60px_-24px_rgba(0,0,0,0.55)] flex flex-col items-center justify-between gap-7 text-center">
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
                <li key={src} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 px-2 py-3 rounded-2xl bg-white/[0.08] border border-white/[0.14] font-sans text-sm font-semibold">
                  <span className="w-[30px] h-[30px] rounded-full bg-white overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                    <img src={SOURCE_LOGOS[src]} alt="" loading="lazy" className="w-full h-full object-contain" />
                  </span>
                  {SOURCE_LABELS[src]}
                </li>
              ))}
            </ul>
          </div>

          {/* Phones: rating first, then every story in one auto-advancing row */}
          <MobileReviewCarousel />

          {rest.map((t) => (
            <React.Fragment key={t.id}>
              <ReviewCard t={t} className={`hidden md:flex ${t.text.length > WIDE_REVIEW_CHARS ? 'md:col-span-2' : ''}`} />
            </React.Fragment>
          ))}

          <div className="md:col-span-2 rounded-3xl border-2 border-dashed border-[#00fff2]/45 p-7 md:px-8 flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-1.5">
              <p className="font-serif text-xl md:text-2xl font-bold">
                Your smile could be <em className="text-[#00fff2]">next.</em>
              </p>
              <p className="font-sans text-sm text-[#C7CDE6]">One patient per slot, so there's no waiting around.</p>
            </div>
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
