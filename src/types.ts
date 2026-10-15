// neudental v1 - TypeScript Type Definitions
export interface Treatment {
  id: string;
  name: string;
  category: 'preventive' | 'restorative' | 'cosmetic-ortho' | 'specialized' | 'pediatric';
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

// 'pending' only exists on bookings made before confirmation was automated;
// 'completed' is shown to staff as "Done" (patient showed up).
export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'rescheduled'
  | 'completed'
  | 'no_show'
  | 'no_response'
  | 'cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  treatmentId: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'treatment' | 'insurance' | 'appointment';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}
