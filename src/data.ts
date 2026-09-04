// neudental v1 - Static Data
// NOTE: For the complete version with full SEO descriptions, refer to Google AI Studio project
import { Treatment, Doctor, Testimonial, Symptom, FAQItem, BlogPost } from './types';

export const TREATMENTS: Treatment[] = [
  // Preventive Dentistry
  { id: 'checkup', name: 'Regular Check-up', category: 'preventive', description: 'Early cavity & gum diagnosis', seoKeywords: ['dental checkup Kodungaiyur', 'dental exam Chennai'], duration: '30-45 minutes', priceRange: '₹300-₹500', startingPrice: 300, iconName: 'Search', features: ['Oral examination', 'X-ray review', 'Treatment planning', 'Oral hygiene advice'] },
  { id: 'cleaning', name: 'Dental Cleaning', category: 'preventive', description: 'Removes plaque & tartar buildup', seoKeywords: ['teeth cleaning Chennai', 'dental scaling Kodungaiyur'], duration: '45-60 minutes', priceRange: '₹800-₹1500', startingPrice: 800, iconName: 'Sparkles', features: ['Ultrasonic scaling', 'Polishing', 'Fluoride treatment', 'Oral hygiene instructions'] },
  { id: 'imaging', name: 'Dental Imaging', category: 'preventive', description: 'Digital X-ray & OPG scans', seoKeywords: ['dental X-ray Chennai', 'digital radiography'], duration: '15-30 minutes', priceRange: '₹200-₹800', startingPrice: 200, iconName: 'Scan', features: ['Digital X-rays', 'Low radiation', 'Instant results', 'High-resolution images'] },
  // Restorative Dentistry
  { id: 'filling', name: 'Cavity Filling', category: 'restorative', description: 'Tooth-colored composite restoration', seoKeywords: ['tooth filling Chennai', 'composite filling Kodungaiyur'], duration: '30-60 minutes', priceRange: '₹500-₹2000', startingPrice: 500, iconName: 'Shield', features: ['Tooth-colored material', 'Mercury-free', 'Single sitting', 'Natural appearance'] },
  { id: 'extraction', name: 'Wisdom Tooth Extraction', category: 'restorative', description: 'Painless impacted tooth removal', seoKeywords: ['wisdom tooth extraction Chennai', 'painless extraction Kodungaiyur'], duration: '20-45 minutes', priceRange: '₹300-₹1500', startingPrice: 300, iconName: 'Scissors', features: ['Local anesthesia', 'Minimal discomfort', 'Post-care instructions', 'Same day procedure'] },
  { id: 'crowns-bridges', name: 'Crowns & Bridges', category: 'restorative', description: 'Restores broken or missing teeth', seoKeywords: ['dental crown Chennai', 'tooth bridge Kodungaiyur'], duration: '2-3 visits', priceRange: '₹4000-₹12000', startingPrice: 4000, iconName: 'Crown', features: ['Ceramic crowns', 'Metal-free options', 'Natural appearance', 'Long lasting'] },
  { id: 'dentures', name: 'Dentures', category: 'restorative', description: 'Affordable false teeth replacement', seoKeywords: ['dentures Chennai', 'full denture Kodungaiyur'], duration: '3-5 visits', priceRange: '₹8000-₹30000', startingPrice: 8000, iconName: 'Smile', features: ['Custom fit', 'Natural appearance', 'Easy maintenance', 'Comfortable wear'] },
  // Cosmetic & Orthodontic Dentistry
  { id: 'cosmetic', name: 'Cosmetic Dentistry', category: 'cosmetic-ortho', description: 'Veneers & smile makeover', seoKeywords: ['dental veneers Kodungaiyur', 'smile makeover Chennai'], duration: 'Varies', priceRange: '₹5000+', startingPrice: 5000, iconName: 'Star', features: ['Veneers', 'Smile design', 'Natural results'] },
  { id: 'whitening', name: 'Teeth Whitening', category: 'cosmetic-ortho', description: 'Instant brighter, whiter smile', seoKeywords: ['teeth whitening Chennai', 'smile brightening Kodungaiyur'], duration: '45-60 minutes', priceRange: '₹4000-₹10000', startingPrice: 4000, iconName: 'Sun', features: ['In-clinic whitening', 'Visible results in one sitting', 'Safe for enamel', 'Long-lasting shade'] },
  { id: 'ortho', name: 'Orthodontic Treatment', category: 'cosmetic-ortho', description: 'Braces for straighter teeth', seoKeywords: ['braces Chennai', 'orthodontic treatment Kodungaiyur'], duration: '12-24 months', priceRange: '₹35000-₹1,50,000', startingPrice: 35000, iconName: 'GitBranch', features: ['Metal & ceramic braces', 'Expert planning', 'Regular progress reviews'] },
  { id: 'invisalign', name: 'Invisalign / Clear Aligners', category: 'cosmetic-ortho', description: 'Invisible, removable tray option', seoKeywords: ['Invisalign Chennai', 'clear aligners Kodungaiyur'], duration: '6-18 months', priceRange: '₹40000-₹1,50,000', startingPrice: 40000, iconName: 'Layers', features: ['Virtually invisible', 'Removable trays', 'Custom-fit planning', 'Fewer clinic visits'] },
  // Specialized & Advanced Care
  { id: 'rct', name: 'Root Canal Treatment (RCT)', category: 'specialized', description: 'Saves infected tooth, pain-free', seoKeywords: ['root canal treatment Chennai', 'RCT Kodungaiyur', 'single sitting RCT Chennai'], duration: '60-90 minutes', priceRange: '₹3000-₹8000', startingPrice: 3000, iconName: 'Activity', features: ['Rotary endodontics', 'Single sitting possible', 'Crown placement', 'Pain-free procedure'] },
  { id: 'gum-disease', name: 'Gum Disease Treatment', category: 'specialized', description: 'Treats bleeding & swollen gums', seoKeywords: ['gum disease treatment Chennai', 'periodontal therapy Kodungaiyur'], duration: '60-120 minutes', priceRange: '₹1500-₹5000', startingPrice: 1500, iconName: 'Heart', features: ['Deep cleaning', 'Antibiotic therapy', 'Gum surgery if needed', 'Regular monitoring'] },
  { id: 'implants', name: 'Dental Implants', category: 'specialized', description: 'Permanent tooth replacement', seoKeywords: ['dental implants Chennai', 'tooth implant Kodungaiyur'], duration: '3-6 months total', priceRange: '₹25000-₹50000', startingPrice: 25000, iconName: 'Anchor', features: ['Titanium implants', 'Permanent solution', 'Natural feel', 'Bone preservation'] },
  { id: 'laser-dentistry', name: 'Laser Dentistry', category: 'specialized', description: 'Bloodless, suture-free procedures', seoKeywords: ['laser dentistry Chennai', 'painless laser treatment Kodungaiyur'], duration: '30-60 minutes', priceRange: '₹2000-₹8000', startingPrice: 2000, iconName: 'Zap', features: ['Minimal discomfort', 'Reduced bleeding', 'Faster healing', 'Precision treatment'] },
  // Kids / Pediatric Dentistry
  { id: 'kids-dentistry', name: 'Kids Dentistry', category: 'pediatric', description: 'Gentle, fear-free visits for children', seoKeywords: ['pediatric dentist Chennai', 'kids dentist Kodungaiyur'], duration: '20-40 minutes', priceRange: '₹300-₹2000', startingPrice: 300, iconName: 'Baby', features: ['Child-friendly approach', 'Preventive & restorative care', 'Cavity treatment', 'Dental habit guidance'] },
];

export const DOCTOR: Doctor = {
  name: 'Dr. Swetha',
  title: 'BDS, FGDS',
  specialty: 'Dental Surgeon & Clinical Director',
  experience: '5+ years of clinical experience',
  education: 'Saveetha Dental University',
  bio: 'Dr. Swetha is a dedicated dental professional with 5+ years of experience in general and cosmetic dentistry. A proud alumna of Saveetha Dental University, she specializes in providing gentle, comprehensive dental care using the latest technology. Her patient-first approach ensures every treatment is comfortable, transparent, and of the highest clinical standard.',
  imageAlt: 'Dr. Swetha - Lead Dentist at neudental',
  avatarUrl: '',
  skills: ['Root Canal Treatment', 'Smile Design', 'Clear Aligners', 'Dental Implants', 'Cosmetic Dentistry'],
};

export const TESTIMONIALS: Testimonial[] = [
  { id: 'test-1', name: 'Viji', role: 'Patient', rating: 5, text: 'I had a fantastic experience getting my teeth cleaned here! Dr. Swetha was extremely friendly, and the hygienist did a thorough job while making sure I was completely comfortable. The clinic is spotless, and I received great advice for my daily routine. Highly recommend!', treatmentRecceived: 'Dental Cleaning', imgUrl: '', imgAlt: 'Viji - neudental patient', initials: 'V', sourceLogo: 'practo' },
  { id: 'test-2', name: 'Thamizhselvi', role: 'Patient', rating: 5, text: 'Had my filling done here. The treatment was quick and completely painless. Doctor is very skilled and polite. I strongly recommend this clinic.', treatmentRecceived: 'Cavity Filling', imgUrl: '', imgAlt: 'Thamizhselvi - neudental patient', initials: 'T', sourceLogo: 'google' },
  { id: 'test-3', name: 'Aadhithya S', role: 'Patient', rating: 5, text: 'I visited Dr.Swetha and did my tooth cleaning and root canal treatment along with crown fixing. The treatment plan was good and loved the minimal clinic setup.', treatmentRecceived: 'Root Canal Treatment', imgUrl: '', imgAlt: 'Aadhithya S - neudental patient', initials: 'A', sourceLogo: 'justdial' },
  { id: 'test-4', name: 'Geetha Rajasekaran', role: 'Patient', rating: 5, text: 'Excellent service! Dr. Swetha is very professional and made my root canal completely painless. The clinic is clean and modern. Would definitely recommend to family and friends.', treatmentRecceived: 'Root Canal Treatment', imgUrl: '', imgAlt: 'Geetha Rajasekaran - neudental patient', initials: 'G', sourceLogo: 'justdial' },
  { id: 'test-5', name: 'Mathiyazhagan S', role: 'Patient', rating: 5, text: 'I was in unbearable pain, and a government hospital advised extraction. I decided to try neudental clinic instead, and I’m so glad I did — Dr. Swetha saved my tooth! She was kind, patient, and caring throughout. Truly grateful for the wonderful care. ❤️🦷', treatmentRecceived: 'Root Canal Treatment', imgUrl: '', imgAlt: 'Mathiyazhagan S - neudental patient', initials: 'M', sourceLogo: 'google' },
  { id: 'test-6', name: 'Rekha', role: "Parent of a 7-year-old patient", rating: 5, text: 'My 7-year-old had improper spacing and alignment in his teeth, and I was worried how he’d cope with treatment. Dr. Swetha made his ortho experience so kid-friendly and patient that he now looks forward to his visits! His smile has improved beautifully. Truly grateful to neudental.', treatmentRecceived: 'Orthodontic Treatment', imgUrl: '', imgAlt: 'Rekha - neudental patient', initials: 'R', sourceLogo: 'practo' },
];

export const SYMPTOMS: Symptom[] = [
  { id: 'symp-1', expression: 'Toothache or Throbbing Pain', description: 'Persistent pain in one or more teeth, especially when biting.', possibleCause: 'Tooth decay, abscess, or pulp infection', recommendedTreatment: 'rct', urgency: 'urgent' },
  { id: 'symp-2', expression: 'Bleeding or Swollen Gums', description: 'Gums that bleed during brushing or appear red and swollen.', possibleCause: 'Gingivitis or periodontal disease', recommendedTreatment: 'gum-disease', urgency: 'moderate' },
  { id: 'symp-3', expression: 'Crooked or Crowded Teeth', description: 'Misaligned teeth affecting your bite and appearance.', possibleCause: 'Malocclusion or overcrowding', recommendedTreatment: 'ortho', urgency: 'routine' },
  { id: 'symp-4', expression: 'Discolored or Stained Teeth', description: 'Yellow, brown or grey discoloration affecting your smile confidence.', possibleCause: 'Staining, aging, or enamel erosion', recommendedTreatment: 'cosmetic', urgency: 'routine' },
];

export const FAQS: FAQItem[] = [
  { id: 'faq-1', question: 'Is root canal treatment painful?', answer: 'No! Modern root canal treatment using rotary endodontics is virtually painless. Dr. Swetha uses advanced local anesthesia and gentle techniques to ensure you are comfortable throughout the procedure. Most patients are surprised at how easy it is.', category: 'treatment' },
  { id: 'faq-2', question: 'How often should I visit the dentist?', answer: 'We recommend visiting neudental every 6 months for a regular check-up and professional cleaning. However, if you have specific dental concerns or ongoing treatments, Dr. Swetha may recommend more frequent visits.', category: 'appointment' },
  { id: 'faq-3', question: 'Do you offer clear aligners / Invisalign?', answer: 'Yes! We offer modern orthodontic solutions including clear aligners for straightening teeth discreetly. Dr. Swetha will assess your case and recommend the best treatment plan during a consultation.', category: 'treatment' },
  { id: 'faq-4', question: 'What are your clinic timings?', answer: 'We are open all 7 days, Monday to Sunday: 10:00 AM - 2:00 PM and 5:00 PM - 9:30 PM. You can book appointments via WhatsApp or our online form.', category: 'appointment' },
  { id: 'faq-5', question: 'How do I book an appointment?', answer: 'You can book an appointment by: (1) Using the booking form on this website, (2) WhatsApp at +91 9342367446, or (3) Calling us directly. Walk-ins are also welcome during clinic hours.', category: 'appointment' },
];

// Alias for backward compatibility with components using DOCTORS (plural)
export const DOCTORS = [DOCTOR];

export const BLOGS: BlogPost[] = [
  {
    id: 'oral-hygiene-after-root-canal',
    title: '5 Simple Habits to Protect Your Smile After a Root Canal',
    excerpt: 'A root canal saves your tooth, but the days right after matter just as much as the procedure itself. Here is what actually helps recovery go smoothly.',
    category: 'Patient Care',
    date: 'August 2026',
    readTime: '4 min read',
    content: [
      'A root canal has one job: save a tooth that would otherwise need to come out. Once the infected pulp is removed and the tooth is sealed, most of the hard work is already done. What happens in the next few days, though, still makes a real difference to how comfortable your recovery is.',
      'First, expect mild soreness for a day or two. This is normal and usually responds well to the pain relief your dentist prescribes. Avoid chewing directly on the treated tooth until any temporary filling has been replaced with a permanent crown or restoration.',
      'Stick to soft, lukewarm foods for the first 24 hours, and steer clear of anything very hard, sticky, or crunchy on that side of your mouth. Continue brushing and flossing as usual everywhere else in your mouth. Skipping oral hygiene near the treated tooth out of caution is a common mistake, gentle brushing is still safe and important.',
      'If you notice swelling, a bad taste that will not go away, or pain that gets worse instead of better after a few days, contact your dentist. These are the exceptions rather than the rule, but they are worth checking on quickly rather than waiting it out.',
      'Finally, book your follow-up for the permanent crown or filling as soon as it is recommended. A tooth left with only a temporary seal for too long is more vulnerable to reinfection, undoing the very problem the root canal was meant to fix.',
    ],
  },
  {
    id: 'why-regular-checkups-matter',
    title: 'Why Regular Dental Checkups Matter More Than You Think',
    excerpt: "Most dental problems don't announce themselves with pain until they've already become serious. Here's why a six-month checkup is one of the highest-value habits for your health.",
    category: 'Preventive Care',
    date: 'July 2026',
    readTime: '3 min read',
    content: [
      'It is easy to assume a dental visit is only necessary when something hurts. In reality, some of the most common dental problems, early cavities, the first stages of gum disease, and cracked fillings, cause little to no pain until they have progressed significantly.',
      'A routine checkup lets your dentist catch these issues while they are still small, simple, and inexpensive to treat. A cavity caught early might need a small filling; the same cavity left unchecked for a year could mean a root canal or an extraction.',
      'Checkups also include a professional cleaning that removes hardened plaque (tartar) that a toothbrush at home simply cannot reach. Left in place, this buildup is one of the leading causes of gum disease, which has been linked to broader health concerns well beyond the mouth.',
      'A six-month visit is also a chance to ask questions, about sensitivity, whitening, a nagging habit like teeth grinding, or anything else you have been putting off mentioning. Prevention is almost always more comfortable, faster, and cheaper than treatment after the fact.',
    ],
  },
  {
    id: 'painless-laser-dentistry-explained',
    title: 'Understanding Painless Laser Dentistry: What to Expect',
    excerpt: 'Laser-assisted treatment is one of the biggest reasons modern dental visits feel nothing like they used to. Here is a plain-language look at how it works.',
    category: 'Modern Dentistry',
    date: 'June 2026',
    readTime: '4 min read',
    content: [
      'Laser dentistry uses a focused beam of light instead of traditional drills for many common procedures, including cavity treatment, gum reshaping, and some soft-tissue work. For patients, the appeal is straightforward: many of these procedures can be done with less discomfort, less bleeding, and a noticeably calmer experience overall.',
      'The reason it feels different comes down to precision. A laser can target only the affected tissue with very fine control, which often means less vibration, less pressure, and in many cases, less need for local anesthesia than a conventional approach would require.',
      'Recovery tends to be faster too. Because the laser seals small blood vessels and nerve endings as it works, many patients experience less swelling and bleeding afterward compared to traditional instruments, which can mean a shorter, more comfortable healing period.',
      'Laser treatment is not the right fit for every single procedure, your dentist will always recommend whichever method is safest and most effective for your specific case. But for the procedures where it applies, it is a big part of why the phrase "painless dentistry" has become a realistic promise rather than just a marketing line.',
    ],
  },
];
