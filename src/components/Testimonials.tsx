import React, { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS, REVIEW_RATING, REVIEW_COUNT_LABEL, CLINIC_GOOGLE_URL } from '../data';
import { Star, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

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

// The spotlight opens on the most moving story: a tooth saved after another
// hospital advised extraction.
const FEATURED_ID = 'test-5';

// Two praise ribbons: every review's first phrase on the top row, its second
// on the bottom, so each row links to all the stories once.
const RIBBONS = [0, 1].map((row) => TESTIMONIALS.map((t, index) => ({ label: t.praise[row], name: t.name, index })));

interface TestimonialsProps {
  onScrollToBooking?: () => void;
}

export default function Testimonials({ onScrollToBooking }: TestimonialsProps) {
  const count = TESTIMONIALS.length;
  const [active, setActive] = useState(() => Math.max(0, TESTIMONIALS.findIndex((t) => t.id === FEATURED_ID)));
  const [reducedMotion, setReducedMotion] = useState(false);
  const spotlightRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // A phrase tapped on a phone can sit well above the card, so bring the
  // story into view; 'nearest' leaves the page alone when it's already shown.
  const openStory = (index: number) => {
    setActive(index);
    spotlightRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  };

  const story = TESTIMONIALS[active];
  const at = story.text.indexOf(story.highlight);
  const before = at >= 0 ? story.text.slice(0, at) : story.text;
  const marked = at >= 0 ? story.highlight : '';
  const after = at >= 0 ? story.text.slice(at + story.highlight.length) : '';
  const sourceLabel = story.sourceLogo ? SOURCE_LABELS[story.sourceLogo] : undefined;
  const sourceLogo = story.sourceLogo ? SOURCE_LOGOS[story.sourceLogo] : undefined;

  const goToBooking = () => {
    if (onScrollToBooking) onScrollToBooking();
    else document.getElementById('booking-section')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-primary text-white py-16 lg:py-24 scroll-mt-24">
      {/* Concentric rings echoing the brand mark, purely decorative */}
      <svg aria-hidden="true" viewBox="0 0 720 720" className="hidden md:block absolute -right-56 -top-64 w-[720px] h-[720px] opacity-[0.07] pointer-events-none">
        <circle cx="360" cy="360" r="300" fill="none" stroke="#00fff2" strokeWidth="2" />
        <circle cx="360" cy="360" r="220" fill="none" stroke="#00fff2" strokeWidth="2" />
        <circle cx="360" cy="360" r="140" fill="none" stroke="#00fff2" strokeWidth="2" />
      </svg>

      {/* Title + rating */}
      <div className="relative max-w-[1120px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div className="max-w-xl">
          <span className="text-[#00fff2] font-sans text-xs font-bold tracking-[0.2em] uppercase">
            Genuine Patient Stories
          </span>
          <h2 className="font-serif font-bold text-4xl md:text-[54px] leading-[1.1] md:leading-[1.08] mt-3">
            Loved by{' '}
            <span className="relative inline-block italic font-semibold">
              families
              {/* Hand-drawn smile under the word */}
              <svg aria-hidden="true" viewBox="0 0 220 28" preserveAspectRatio="none" className="absolute -left-[4%] -bottom-3 md:-bottom-4 w-[108%] h-5 md:h-6">
                <path d="M4 6 C 60 30, 160 30, 216 6" fill="none" stroke="#00fff2" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            across Chennai
          </h2>
          <p className="font-sans text-base text-[#C7CDE6] leading-relaxed mt-7 max-w-md">
            Real words from real visits, verified on Google, Practo and Justdial. Tap any phrase to read the full story.
          </p>
        </div>

        <div className="self-start lg:self-auto flex items-center gap-6 px-6 py-5 rounded-3xl bg-white/[0.06] border border-white/[0.12]">
          <div>
            <strong className="block font-display font-bold text-6xl md:text-7xl leading-none tracking-tight">{REVIEW_RATING}</strong>
            <div className="flex gap-0.5 mt-2 text-[#F5B942]" role="img" aria-label="Rated 5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden="true" className="w-4 h-4 fill-current" />)}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-sans text-sm font-semibold">{REVIEW_COUNT_LABEL} verified reviews</span>
            <div className="flex gap-2">
              {(['google', 'practo', 'justdial'] as const).map((src) => (
                <span key={src} className="w-8 h-8 rounded-full bg-white overflow-hidden flex items-center justify-center p-1.5">
                  <img src={SOURCE_LOGOS[src]} alt={SOURCE_LABELS[src]} loading="lazy" className="w-full h-full object-contain" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Praise ribbons: drift in opposite directions, pause on hover/focus,
      and become swipeable rows for prefers-reduced-motion. The second copy
      only exists to make the loop seamless, so it's hidden from assistive
      tech and the tab order. */}
      <div className="relative mt-12 md:mt-14 space-y-3" role="group" aria-label="Highlights from patient reviews">
        {RIBBONS.map((row, r) => (
          <div key={r} className="marquee-row marquee-swipe no-scrollbar">
            <div className={`marquee-track gap-3 px-1.5 py-1 ${r ? 'marquee-reverse' : ''}`} style={{ animationDuration: r ? '52s' : '46s' }}>
              {[0, 1].map((copy) => row.map((chip) => {
                const isActive = chip.index === active;
                return (
                  <button
                    key={`${copy}-${chip.index}`}
                    type="button"
                    onClick={() => openStory(chip.index)}
                    aria-label={copy ? undefined : `${chip.label}: read ${chip.name}'s review`}
                    aria-hidden={copy ? true : undefined}
                    tabIndex={copy ? -1 : undefined}
                    className={`${copy ? 'marquee-copy ' : ''}shrink-0 inline-flex items-center gap-2.5 px-5 py-3 rounded-full border font-serif italic text-base md:text-[19px] whitespace-nowrap cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00fff2]/70 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#00fff2] ${isActive ? 'border-[#00fff2] bg-[#00fff2]/15' : 'border-white/15 bg-white/[0.04]'}`}
                  >
                    <Star aria-hidden="true" className="w-3.5 h-3.5 fill-current text-[#F5B942] shrink-0" />
                    &ldquo;{chip.label}&rdquo;
                  </button>
                );
              }))}
            </div>
          </div>
        ))}
      </div>

      {/* Spotlight */}
      <div className="relative max-w-[1120px] mx-auto px-6 md:px-10 mt-10 md:mt-12">
        <article
          ref={spotlightRef}
          aria-live="polite"
          className="scroll-mt-28 bg-white text-primary rounded-[28px] p-7 md:p-11 flex flex-col md:flex-row gap-8 md:gap-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
        >
          <div className="flex-1 min-w-0">
            <svg aria-hidden="true" width="56" height="42" viewBox="0 0 64 48" className="mb-3">
              <path d="M0 48V28C0 12 8 3 24 0l3 7C17 10 13 16 13 24h12v24zm36 0V28c0-16 8-25 24-28l3 7c-10 3-14 9-14 17h12v24z" fill="#0557BC" opacity="0.14" />
            </svg>
            <p className="font-serif italic text-lg md:text-[25px] leading-relaxed md:leading-[1.55]">
              {before}
              {marked && <mark className="highlight-mark bg-transparent text-inherit not-italic font-semibold">{marked}</mark>}
              {after}
            </p>
          </div>

          <div className="md:w-64 shrink-0 flex flex-col justify-between gap-7 border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-6 md:pt-0 md:pl-8">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3.5">
                <span className="w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center font-display font-bold text-xl shrink-0" aria-hidden="true">
                  {story.initials}
                </span>
                <div className="font-sans leading-tight">
                  <h3 className="font-bold text-[17px]">{story.name}</h3>
                  <p className="text-[13px] text-on-surface-variant mt-1">{story.role}</p>
                </div>
              </div>
              {sourceLabel && (
                <p className="flex items-center gap-2 font-sans text-[13px] text-on-surface-variant">
                  {sourceLogo && <img src={sourceLogo} alt="" className="w-[18px] h-[18px] object-contain" />}
                  Verified review on {sourceLabel}
                </p>
              )}
              <span className="self-start font-sans text-xs font-bold text-[#0F766E] bg-mint px-3 py-1.5 rounded-full">
                {story.treatmentRecceived}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="font-display font-bold text-[15px] text-on-surface-variant" aria-label={`Story ${active + 1} of ${count}`}>
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setActive((active + count - 1) % count)}
                  aria-label="Previous story"
                  className="w-12 h-12 rounded-full border border-[#CBD5E1] bg-white text-primary flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive((active + 1) % count)}
                  aria-label="Next story"
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
          <button
            type="button"
            onClick={goToBooking}
            className="inline-flex items-center min-h-12 px-7 rounded-xl bg-[#00fff2] text-primary font-sans text-xs font-bold uppercase tracking-[0.12em] hover:bg-white transition-colors cursor-pointer"
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
    </section>
  );
}
