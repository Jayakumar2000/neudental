import React from 'react';
import { Star, Sparkles } from 'lucide-react';

export default function DoctorTrustBanner() {
  return (
    <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary to-secondary">
      <div className="w-14 h-14 rounded-full bg-white border-2 border-white/60 shrink-0 flex items-center justify-center p-2">
        <img src="/brand/neudental-mark.png" alt="neudental logo" className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-serif font-bold text-white text-sm leading-tight">Neudental Clinic, Chennai</p>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 fill-current text-[#FBBF24]" />
          <span className="text-[11px] font-bold text-white font-sans">5.0</span>
          <span className="text-[11px] text-white/80 font-sans">&middot; 150+ Reviews &middot; 3,000+ Patients</span>
        </div>
      </div>
      <Sparkles className="w-5 h-5 text-white/70 shrink-0 hidden sm:block" />
    </div>
  );
}
