// neudental v1 - TreatmentDetailView Component
import React from 'react';
import { ArrowLeft, Phone, Check, Clock, ShieldCheck, Zap, BadgeCheck } from 'lucide-react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';
import BookingForm from './BookingForm';

interface TreatmentDetailViewProps {
  treatmentId: string;
  onBack: () => void;
  onNavigateToTreatment: (id: string) => void;
}

export default function TreatmentDetailView({ treatmentId, onBack, onNavigateToTreatment }: TreatmentDetailViewProps) {
  const treatment = TREATMENTS.find((t: Treatment) => t.id === treatmentId);

  if (!treatment) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <p className="font-sans text-on-surface-variant mb-4">Treatment not found</p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-secondary hover:text-primary font-sans font-bold text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const otherTreatments = TREATMENTS.filter((t: Treatment) => t.id !== treatmentId).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-alt to-[#EEF5FC] py-16 px-6 md:px-10 lg:px-16">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-mint/35 blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary font-sans text-sm font-medium mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">{treatment.category} Treatment</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary font-bold leading-tight mt-3">{treatment.name}</h1>
          <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mt-4 leading-relaxed">{treatment.description}</p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="inline-flex items-center gap-2 bg-white border border-cool-gray/15 rounded-full px-4 py-2 text-xs font-sans font-bold text-primary premium-shadow">Duration: {treatment.duration}</span>
            <span className="inline-flex items-center gap-2 bg-white border border-cool-gray/15 rounded-full px-4 py-2 text-xs font-sans font-bold text-primary premium-shadow">From {treatment.priceRange}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 py-16">
        {/* Treatment Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-surface-container-low border border-cool-gray/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-primary mb-1">Pain-Free Treatment</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Advanced techniques for a comfortable experience</p>
            </div>
          </div>
          <div className="bg-surface-container-low border border-cool-gray/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-primary mb-1">Efficient Care</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Most procedures completed in minimal visits</p>
            </div>
          </div>
          <div className="bg-surface-container-low border border-cool-gray/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-primary mb-1">Expert Care</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Dr. Swetha BDS, FGDS with years of expertise</p>
            </div>
          </div>
        </div>

        {/* Treatment Features */}
        {treatment.features && treatment.features.length > 0 && (
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Treatment Highlights</h2>
            <div className="space-y-3">
              {treatment.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-surface-alt rounded-xl border border-cool-gray/5">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <p className="font-sans text-sm text-on-surface leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Treatments */}
        {otherTreatments.length > 0 && (
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Explore Other Treatments</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherTreatments.map((t: Treatment) => (
                <button
                  key={t.id}
                  onClick={() => onNavigateToTreatment(t.id)}
                  className="p-4 bg-white border border-cool-gray/10 rounded-xl hover:border-secondary hover:premium-shadow transition-all text-left cursor-pointer"
                >
                  <span className="font-sans text-sm font-bold text-primary block">{t.name}</span>
                  <span className="font-sans text-xs text-cool-gray mt-1 block">{t.priceRange}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Booking Section */}
        <div id="booking-section" className="bg-surface-alt rounded-3xl p-6 md:p-8 border border-cool-gray/10">
          <div className="flex items-center gap-2 mb-2"><BadgeCheck className="w-5 h-5 text-secondary" /><h2 className="font-serif text-2xl font-bold text-primary">Book This Treatment</h2></div>
          <p className="font-sans text-sm text-on-surface-variant mb-6">Schedule your appointment with Dr. Swetha at neudental</p>
          <BookingForm preSelectedTreatmentId={treatmentId} />
        </div>

        {/* Contact CTA */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="tel:+919342367446"
            className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200"
          >
            <Phone size={16} />
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
}
