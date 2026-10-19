import React from 'react';
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

interface TestimonialsProps {
  onScrollToBooking?: () => void;
}

export default function Testimonials({ onScrollToBooking }: TestimonialsProps) {
  const [featured, ...rest] = TESTIMONIALS;
  const at = featured.text.indexOf(featured.highlight);
  const before = at >= 0 ? featured.text.slice(0, at) : featured.text;
  const marked = at >= 0 ? featured.highlight : '';
  const after = at >= 0 ? featured.text.slice(at + featured.highlight.length) : '';

  const goToBooking = () => {
    if (onScrollToBooking) onScrollToBooking();
    else document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-primary text-white py-16 lg:py-24 scroll-mt-24">
      <Rings className="hidden md:block -right-56 -top-64 w-[720px] h-[720px] opacity-[0.07]" />
      <Rings count={2} className="hidden md:block -left-64 -bottom-72 w-[560px] h-[560px] opacity-[0.05]" />

      <div className="relative max-w-[1120px] mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[#00fff2] font-sans text-xs font-bold tracking-[0.2em] uppercase">
              Genuine Patient Stories
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-[52px] leading-[1.12] mt-3">
              Loved by{' '}
              <span className="relative inline-block italic font-semibold">
                families
                <SmileCurve className="absolute -left-[4%] -bottom-3 md:-bottom-4 w-[108%] h-5 md:h-6" />
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
        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-flow-dense gap-4">
          <article className="md:col-span-2 lg:row-span-2 bg-white text-primary rounded-[28px] p-7 md:p-10 flex flex-col justify-between gap-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase bg-[#00fff2] text-primary px-3 py-1.5 rounded-full">
                  Featured story
                </span>
                <svg aria-hidden="true" width="48" height="36" viewBox="0 0 64 48">
                  <path d="M0 48V28C0 12 8 3 24 0l3 7C17 10 13 16 13 24h12v24zm36 0V28c0-16 8-25 24-28l3 7c-10 3-14 9-14 17h12v24z" fill="#0557BC" opacity="0.14" />
                </svg>
              </div>
              <p className="font-serif italic text-xl md:text-[25px] leading-relaxed md:leading-[1.55]">
                {before}
                {marked && <mark className="highlight-mark bg-transparent text-inherit not-italic font-semibold">{marked}</mark>}
                {after}
              </p>
            </div>
            <div className="flex items-center gap-3.5 border-t border-[#E2E8F0] pt-5">
              <span aria-hidden="true" className="w-13 h-13 rounded-full bg-secondary text-white flex items-center justify-center font-display font-bold text-xl shrink-0">
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

          {/* Rating: the same size as the featured story */}
          <div className="md:col-span-2 lg:row-span-2 relative overflow-hidden rounded-[28px] px-6 py-10 md:px-10 md:pt-11 md:pb-9 bg-[radial-gradient(120%_90%_at_50%_0%,#0A6BE0_0%,#0557BC_32%,#0B1341_88%)] border border-[#00fff2]/40 shadow-[0_0_0_8px_rgba(0,255,242,0.05),0_30px_60px_-24px_rgba(0,0,0,0.55)] flex flex-col items-center justify-between gap-7 text-center">
            <Rings count={4} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] w-[640px] h-[640px] opacity-[0.13]" />
            <span className="relative font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#00fff2]">
              Average patient rating
            </span>
            <div className="relative flex flex-col items-center gap-4">
              <p className="flex items-start gap-2" aria-label={`${REVIEW_RATING} out of 5`}>
                <span className="font-display font-bold text-[112px] md:text-[150px] lg:text-[176px] leading-[0.82] tracking-[-0.05em] [text-shadow:0_10px_40px_rgba(0,255,242,0.25)]">
                  {REVIEW_RATING}
                </span>
                <span aria-hidden="true" className="font-display font-medium text-2xl md:text-[30px] text-[#9FB3E8] mt-2.5">/5</span>
              </p>
              <SmileCurve className="w-52 md:w-64 h-6 -mt-1" />
              <Stars className="w-8 h-8 md:w-[38px] md:h-[38px]" />
              <p className="font-sans text-base md:text-[17px] text-[#E2E8F8] mt-1">
                from <strong className="font-display text-[22px] text-white">{REVIEW_COUNT_LABEL}</strong> verified patient reviews
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

          {rest.map((t) => (
            <article
              key={t.id}
              className={`${t.text.length > WIDE_REVIEW_CHARS ? 'md:col-span-2' : ''} rounded-3xl p-6 md:p-7 bg-white/[0.06] border border-white/[0.12] flex flex-col justify-between gap-5 transition-colors duration-300 hover:border-[#00fff2]/45 hover:bg-white/[0.08] motion-safe:transition-[transform,background-color,border-color] motion-safe:hover:-translate-y-1`}
            >
              <div className="flex flex-col gap-3">
                <h3 className="flex items-center gap-2 font-serif italic text-xl text-[#00fff2]">
                  <Star aria-hidden="true" className="w-3.5 h-3.5 fill-current text-[#F5B942] shrink-0" />
                  &ldquo;{t.praise}&rdquo;
                </h3>
                <p className="font-sans text-[14.5px] leading-relaxed text-[#C7CDE6]">{t.text}</p>
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
          ))}

          <div className="md:col-span-2 rounded-3xl border-2 border-dashed border-[#00fff2]/45 p-7 md:px-8 flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-1.5">
              <p className="font-serif text-2xl md:text-[26px] font-bold">
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
