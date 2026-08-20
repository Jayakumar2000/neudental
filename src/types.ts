// neudental v1 - TypeScript Type Definitions
export interface Treatment {
  id: string;
  name: string;
  category: 'preventive' | 'restorative' | 'specialized' | 'cosmetic';
  description: string;
  seoKeywords: string[];
  duration: string;
  priceRange: string;
  startingPrice: number;
  highlightUrl?: string;
  iconName: string;
  features: string[];
}

export interface Doctor {
  name: string;
  title: string;
  specialty: string;
  experience: string;
  education: string;
  bio: string;
  imageAlt: string;
  avatarUrl: string;
  skills: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  treatmentRecceived: string;
  imgUrl: string;
  imgAlt: string;
  initials: string;
  sourceLogo?: 'google' | 'practo' | 'justdial';
}

export interface Symptom {
  id: string;
  expression: string;
  description: string;
  possibleCause: string;
  recommendedTreatment: string;
  urgency: 'routine' | 'moderate' | 'urgent';
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  treatmentId: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending' | 'completed';
  notes?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'treatment' | 'insurance' | 'appointment';
}
