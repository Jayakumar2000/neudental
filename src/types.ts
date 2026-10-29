// neudental v1 - TypeScript Type Definitions
export interface Treatment {
  id: string;
  // The treatment page's address, /treatments/{slug}. Permanent once
  // published: search engines and AI assistants cite it.
  slug: string;
  // Earlier slugs of this treatment, if it was ever renamed: their old
  // addresses keep working (the build writes a redirect for each).
  formerSlugs?: string[];
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
  // Dental council registration, shown on the profile page when set.
  registration?: string;
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
  // Words from `text` (verbatim) marked like a highlighter in the story card.
  highlight: string;
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

// One piece of a blog post's body. A plain string is a paragraph (the only
// kind older posts use); the object forms add structure for longer guides.
// Text inside any of them may use **bold** and [link text](/path).
export type BlogBlock =
  | string
  | { type: 'heading'; text: string; id?: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'answer'; text: string }
  | { type: 'note'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'table'; caption: string; rows: [string, string][] }
  | { type: 'contents' }
  | { type: 'faq' }  // where the post's `faqs` appear; omitted = at the end
  | { type: 'cta'; title: string; text: string };

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: BlogBlock[];
  // Optional extras for SEO-focused posts.
  seoTitle?: string;         // <title> tag; defaults to "{title} | Neudental Blog"
  imageAlt?: string;         // hero image alt text; defaults to the title
  datePublished?: string;    // ISO date (YYYY-MM-DD) for structured data
  dateModified?: string;     // ISO date (YYYY-MM-DD) of the last real content update
  reviewedBy?: string;       // shown in the byline, e.g. "Dr. Swetha, BDS, FGDS"
  faqs?: BlogFAQ[];          // rendered as an FAQ section + FAQPage schema
  related?: string[];        // ids of other posts to link at the end
  relatedTreatments?: string[]; // treatment ids whose pages to link at the end
}

// The long-form patient guide on a treatment's page (/treatments/{slug}),
// one file per treatment in src/content/treatments/. Price and duration are
// never typed into the text: write {{price}}, {{duration}} or
// {{startingPrice}} and they are filled in from TREATMENTS, so the guide can't
// disagree with the price list.
export interface TreatmentGuide {
  treatmentId: string;       // matches a Treatment.id in src/data.ts
  seoTitle: string;          // <title>, at most ~60 characters
  metaDescription: string;   // search snippet, ~120-155 characters
  headline: string;          // the page's <h1>
  answer: string;            // 40-70 word direct answer shown first
  content: BlogBlock[];      // the guide body, same blocks as blog posts
  faqs: BlogFAQ[];           // shown on the page and published as FAQ schema
  relatedPosts?: string[];   // blog post ids
  relatedTreatments?: string[]; // treatment ids
  datePublished: string;     // 'YYYY-MM-DD'
  dateModified?: string;     // 'YYYY-MM-DD', last real content update
  reviewedBy?: string;       // set only once the clinician has reviewed it
}
