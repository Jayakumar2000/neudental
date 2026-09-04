import React from 'react';
import { Star, Quote, Users, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data';

const featuredTestimonial = TESTIMONIALS.find((t) => t.id === 'test-2') || TESTIMONIALS[0];

export default function BookingTrustPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative rounded-3xl overflow-hidden premium-shadow border border-cool-gray/10">
        <div className="aspect-[4/3] bg-cool-gray/10">
          <img
            src="/doctor/dr-swetha.jpg"
            alt="Dr. Swetha consulting a patient at neudental clinic"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="text-white">
            <p className="font-serif font-bold text-lg leading-tight">Dr. Swetha</p>
            <p className="text-[11px] font-sans font-medium text-white/80 uppercase tracking-wide">BDS, FGDS &middot; Clinical Director</p>
          </div>
          <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg shrink-0">
            <div className="flex items-center gap-0.5 text-[#FBBF24]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="leading-tight">
              <span className="text-sm font-bold text-primary font-sans block">5.0</span>
              <span className="text-[9px] text-cool-gray font-sans font-bold uppercase tracking-wide whitespace-nowrap">150+ Reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-cool-gray/10">
          <img src="/clinic/Treatment_Room_neudental_clinic.jpeg" alt="Treatment room at neudental clinic" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-cool-gray/10">
          <img src="/clinic/Waiting_Area_Reception_neudental_clinic.jpeg" alt="Waiting area at neudental clinic" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-cool-gray/10 premium-shadow">
        <Quote className="w-5 h-5 text-secondary/40 mb-2" />
        <p className="font-sans text-sm text-on-surface-variant leading-relaxed italic">&ldquo;{featuredTestimonial.text}&rdquo;</p>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold font-sans shrink-0">{featuredTestimonial.initials}</div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-primary font-sans">{featuredTestimonial.name}</p>
            <p className="text-[11px] text-cool-gray font-sans">{featuredTestimonial.treatmentRecceived} Patient</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-cool-gray/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0"><Users className="w-4.5 h-4.5" /></div>
          <div className="leading-tight">
            <p className="font-serif font-bold text-primary text-base">3,000+</p>
            <p className="text-[10px] text-cool-gray font-sans font-bold uppercase tracking-wide">Happy Patients</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-cool-gray/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0"><ShieldCheck className="w-4.5 h-4.5" /></div>
          <div className="leading-tight">
            <p className="font-serif font-bold text-primary text-base">99.8%</p>
            <p className="text-[10px] text-cool-gray font-sans font-bold uppercase tracking-wide">Sterilization Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
