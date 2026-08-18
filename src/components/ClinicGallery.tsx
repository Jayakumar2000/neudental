import React from 'react';
import { Camera } from 'lucide-react';

interface GalleryPhoto {
  src: string;
  alt: string;
}

const PHOTOS: GalleryPhoto[] = [
  { src: '/clinic/Entrance_neudental_clinic.jpeg', alt: 'neudental clinic storefront and signage, Kodungaiyur, Chennai' },
  { src: '/clinic/Signboard_neudental_clinic.jpeg', alt: 'neudental clinic signboard with address, timings and Dr. Swetha U details' },
  { src: '/clinic/Dental_Chair_neudental_clinic.jpeg', alt: 'Dental treatment chair and operatory at neudental clinic' },
  { src: '/clinic/Dental_Chair_Operatory_neudental_clinic.jpeg', alt: 'Fully equipped dental operatory at neudental clinic' },
  { src: '/clinic/Treatment_Room_neudental_clinic.jpeg', alt: 'Treatment room interior at neudental clinic' },
  { src: '/clinic/Treatment_Room_Wide_neudental_clinic.jpeg', alt: 'Wide view of the treatment room at neudental clinic' },
  { src: '/clinic/Treatment_Room_Counter_neudental_clinic.jpeg', alt: 'Treatment room counter and workstation at neudental clinic' },
  { src: '/clinic/Consultation_Desk_neudental_clinic.jpeg', alt: 'Consultation desk and waiting area at neudental clinic' },
  { src: '/clinic/Reception_Logo_Wall_neudental_clinic.jpeg', alt: 'neudental logo wall at the clinic entrance' },
  { src: '/clinic/Interior_Logo_Wall_neudental_clinic.jpeg', alt: 'neudental brand wall inside the clinic' },
  { src: '/clinic/Neudental_Clinic_logo_signage.jpeg', alt: 'neudental clinic logo signage close-up' },
];

export default function ClinicGallery() {
  return (
    <section id="clinic-gallery" className="py-24 bg-white px-margin-mobile md:px-margin-desktop border-b border-cool-gray/5">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
            <Camera className="w-4 h-4 text-secondary" /> Inside neudental
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-primary font-bold leading-tight">Take a Look at Our Clinic</h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-6" />
          <p className="font-sans text-sm text-on-surface-variant mt-4 leading-relaxed">
            Real photos from our Kodungaiyur practice, so you know exactly what to expect when you walk in.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="group relative aspect-square rounded-2xl overflow-hidden border border-cool-gray/10 premium-shadow">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
