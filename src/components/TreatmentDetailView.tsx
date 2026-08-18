// neudental v1 - TreatmentDetailView Component
import React, { useState } from 'react';
import { ArrowLeft, Phone, ChevronDown, ChevronUp, Check, Clock, ShieldCheck } from 'lucide-react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';
import BookingForm from './BookingForm';

interface TreatmentDetailViewProps {
  treatmentId: string;
  onBack: () => void;
  onNavigateToTreatment: (id: string) => void;
}

export default function TreatmentDetailView({ treatmentId, onBack, onNavigateToTreatment }: TreatmentDetailViewProps) {
  const [openFeatureId, setOpenFeatureId] = useState<number | null>(null);
  const treatment = TREATMENTS.find((t: Treatment) => t.id === treatmentId);

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Treatment not found</p>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
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
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-teal-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-4">{treatment.name}</h1>
          <p className="text-xl text-teal-100 max-w-2xl">{treatment.description}</p>
          <div className="flex items-center gap-6 mt-6">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">Duration: {treatment.duration}</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">From {treatment.priceRange}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Treatment Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-teal-50 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Pain-Free Treatment</h3>
              <p className="text-sm text-gray-600">Advanced techniques for a comfortable experience</p>
            </div>
          </div>
          <div className="bg-teal-50 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Efficient Care</h3>
              <p className="text-sm text-gray-600">Most procedures completed in minimal visits</p>
            </div>
          </div>
          <div className="bg-teal-50 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Expert Care</h3>
              <p className="text-sm text-gray-600">Dr. Swetha BDS, FGDS with years of expertise</p>
            </div>
          </div>
        </div>

        {/* Treatment Features */}
        {treatment.features && treatment.features.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatment Highlights</h2>
            <div className="space-y-3">
              {treatment.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-teal-600" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Treatments */}
        {otherTreatments.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Treatments</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherTreatments.map((t: Treatment) => (
                <button
                  key={t.id}
                  onClick={() => onNavigateToTreatment(t.id)}
                  className="p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:bg-teal-50 transition-all text-left"
                >
                  <span className="text-sm font-medium text-gray-900 block">{t.name}</span>
                  <span className="text-xs text-gray-500 mt-1">{t.priceRange}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Booking Section */}
        <div id="booking-section" className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book This Treatment</h2>
          <p className="text-gray-600 mb-6">Schedule your appointment with Dr. Swetha at neudental</p>
          <BookingForm preSelectedTreatmentId={treatmentId} />
        </div>

        {/* Contact CTA */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="tel:+919342367446"
            className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors font-medium"
          >
            <Phone size={18} />
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
}
