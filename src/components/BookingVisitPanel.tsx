import React from 'react';
import { Star } from 'lucide-react';
import { DOCTOR, REVIEW_RATING, REVIEW_COUNT_LABEL } from '../data';
import { trackConversion } from '../lib/analytics';
import { Rings } from './BrandShapes';

const NEXT_STEPS = [
  { title: 'Pick an open time', text: 'Only free slots are shown, one patient per 30 minutes.' },
  { title: 'Confirmed instantly', text: 'The slot is held for you as soon as you book.' },
  { title: 'Walk straight in', text: "Your time is yours, so there's no waiting around." },
];

// The navy half of the booking card: who you'll see, what happens after you
// book, opening hours and the clinic's number.
export default function BookingVisitPanel({ className = '' }: { className?: string }) {
  return (
    <aside className={`relative overflow-hidden bg-[radial-gradient(120%_80%_at_0%_0%,#0A6BE0_0%,#0557BC_30%,#0B1341_85%)] text-white p-7 md:p-9 flex flex-col gap-7 ${className}`}>
      <Rings className="-right-64 -bottom-60 w-[520px] h-[520px] opacity-[0.12]" />

      <div className="relative flex items-center gap-4">
        <img src="/doctor/dr-swetha.webp" alt={DOCTOR.imageAlt} loading="lazy" className="w-16 h-16 rounded-full object-cover object-top border-[3px] border-[#00fff2] shrink-0" />
        <div className="font-sans">
          <p className="font-serif text-xl font-bold">{DOCTOR.name}</p>
          <p className="text-[13px] text-[#C7CDE6] mt-0.5">{DOCTOR.title} · {DOCTOR.specialty}</p>
        </div>
      </div>

      <div className="relative self-start flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/[0.08] border border-white/[0.14] font-sans">
        <span className="font-display font-bold text-xl">{REVIEW_RATING}</span>
        <span className="flex gap-0.5 text-[#F5B942]" role="img" aria-label="Rated 5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden="true" className="w-3.5 h-3.5 fill-current" />)}
        </span>
        <span className="text-[13px] text-[#E2E8F8]">{REVIEW_COUNT_LABEL} verified reviews</span>
      </div>

      <div className="relative">
        <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#00fff2] mb-4">What happens next</p>
        <ol className="flex flex-col gap-4">
          {NEXT_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3.5 font-sans">
              <span aria-hidden="true" className="w-8 h-8 shrink-0 rounded-full border-[1.5px] border-[#00fff2] text-[#00fff2] flex items-center justify-center font-display font-bold text-sm">{i + 1}</span>
              <span>
                <strong className="block text-[15px]">{step.title}</strong>
                <span className="text-[13px] text-[#C7CDE6]">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative mt-auto pt-5 border-t border-white/[0.14] flex flex-col gap-2.5 font-sans text-sm">
        <p className="flex flex-wrap justify-between gap-x-3 gap-y-1">
          <span className="text-[#C7CDE6]">Open all 7 days</span>
          <span className="font-semibold">10 AM – 2 PM &amp; 5 PM – 10 PM</span>
        </p>
        <p className="text-[#C7CDE6]">
          Prefer to talk?{' '}
          <a href="tel:+919342367446" onClick={() => trackConversion('call_click', 'call', { link_location: 'booking_panel' })} className="font-bold text-[#00fff2] hover:text-white whitespace-nowrap">
            +91 93423 67446
          </a>
        </p>
      </div>
    </aside>
  );
}
