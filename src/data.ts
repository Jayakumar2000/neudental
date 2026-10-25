// neudental v1 - Static Data
// NOTE: For the complete version with full SEO descriptions, refer to Google AI Studio project
import { Treatment, Doctor, Testimonial, Symptom, FAQItem, BlogPost } from './types';

export const TREATMENTS: Treatment[] = [
  // Preventive Dentistry
  { id: 'checkup', name: 'Regular Check-up', category: 'preventive', description: 'Early cavity & gum diagnosis', seoKeywords: ['dental checkup Kodungaiyur', 'dental exam Chennai'], duration: '30-45 minutes', priceRange: '₹200-₹500', startingPrice: 200, iconName: 'IconRegularCheckup', features: ['Early detection of dental problems', 'Complimentary X-ray', 'Oral hygiene advice'] },
  { id: 'cleaning', name: 'Dental Cleaning', category: 'preventive', description: 'Removes plaque & tartar buildup', seoKeywords: ['teeth cleaning Chennai', 'dental scaling Kodungaiyur'], duration: '30-45 minutes', priceRange: '₹1000-₹1500', startingPrice: 1000, iconName: 'IconDentalCleaning', features: ['Plaque & tartar removal', 'Gum health maintenance', 'Fluoride treatment', 'Oral hygiene instructions'] },
  { id: 'imaging', name: 'Dental Imaging', category: 'preventive', description: 'Digital X-ray & OPG scans', seoKeywords: ['dental X-ray Chennai', 'digital radiography'], duration: '10-15 minutes', priceRange: '₹200-₹800', startingPrice: 200, iconName: 'IconDentalImaging', features: ['Digital X-rays', 'Cavity & infection detection', 'Root & bone assessment', 'Precision treatment planning'] },
  // Restorative Dentistry
  { id: 'filling', name: 'Cavity Filling', category: 'restorative', description: 'Tooth-colored composite restoration', seoKeywords: ['tooth filling Chennai', 'composite filling Kodungaiyur'], duration: '20-30 minutes', priceRange: '₹1000-₹2000', startingPrice: 1000, iconName: 'IconCavityFilling', features: ['Tooth-colored material', 'Single sitting', 'Decay removal', 'Functional tooth repair'] },
  { id: 'rct', name: 'Root Canal Treatment (RCT)', category: 'restorative', description: 'Saves infected tooth, pain-free', seoKeywords: ['root canal treatment Chennai', 'RCT Kodungaiyur', 'single sitting RCT Chennai'], duration: '40-60 minutes', priceRange: '₹3500-₹8000', startingPrice: 3500, iconName: 'IconRootCanal', features: ['Single sitting possible', 'Pulp & infection assessment', 'Canal disinfection', 'Root canal sealing'] },
  { id: 'crowns-bridges', name: 'Crowns & Bridges', category: 'restorative', description: 'Restores broken or missing teeth', seoKeywords: ['dental crown Chennai', 'tooth bridge Kodungaiyur'], duration: '2-3 visits', priceRange: '₹4000-₹12000', startingPrice: 4000, iconName: 'IconCrownsAndBridges', features: ['Ceramic crowns', 'Metal-free options', 'Fixed dental bridges', 'Damaged tooth protection'] },
  { id: 'dentures', name: 'Dentures', category: 'restorative', description: 'Removable or complete false teeth replacement', seoKeywords: ['dentures Chennai', 'full denture Kodungaiyur'], duration: '3-4 visits', priceRange: '₹7000-₹15000', startingPrice: 7000, iconName: 'IconDentures', features: ['Custom fit', 'Removable & complete denture options', 'Improved chewing & function', 'Natural-looking smile restoration'] },
  // Cosmetic & Orthodontic Dentistry
  { id: 'cosmetic', name: 'Cosmetic Dentistry', category: 'cosmetic-ortho', description: 'Veneers & smile makeover', seoKeywords: ['dental veneers Kodungaiyur', 'smile makeover Chennai'], duration: '2-3 visits', priceRange: '₹5000+', startingPrice: 5000, iconName: 'IconDecay', features: ['Veneers', 'Smile design', 'Smile assessment', 'Tooth shape & colour enhancement'] },
  { id: 'whitening', name: 'Teeth Whitening', category: 'cosmetic-ortho', description: 'Instant brighter, whiter smile', seoKeywords: ['teeth whitening Chennai', 'smile brightening Kodungaiyur'], duration: '2-3 visits', priceRange: '₹4000-₹10000', startingPrice: 4000, iconName: 'IconTeethWhitening', features: ['Visible results in one sitting', 'Gentle, enamel-safe treatment', 'Surface stain removal', 'Personalised shade assessment'] },
  { id: 'ortho', name: 'Orthodontic Treatment', category: 'cosmetic-ortho', description: 'Braces for straighter teeth', seoKeywords: ['braces Chennai', 'orthodontic treatment Kodungaiyur'], duration: '12-24 months', priceRange: '₹30000-₹1,50,000', startingPrice: 30000, iconName: 'IconBraces', features: ['Metal & ceramic braces', 'Regular progress reviews', 'Teeth alignment correction', 'Bite correction'] },
  { id: 'invisalign', name: 'Invisalign / Clear Aligners', category: 'cosmetic-ortho', description: 'Invisible, removable tray option', seoKeywords: ['Invisalign Chennai', 'clear aligners Kodungaiyur'], duration: '6-18 months', priceRange: '₹70000-₹1,50,000', startingPrice: 70000, iconName: 'IconDentalSurgery', features: ['Virtually invisible', 'Removable trays', 'Digital smile planning'] },
  // Specialized & Advanced Care
  { id: 'extraction', name: 'Wisdom Tooth Impaction', category: 'specialized', description: 'Painless impacted tooth removal', seoKeywords: ['wisdom tooth extraction Chennai', 'painless extraction Kodungaiyur'], duration: '20-30 minutes', priceRange: '₹3000+', startingPrice: 3000, iconName: 'IconWisdomToothExtraction', features: ['Wisdom tooth assessment', 'Impacted tooth evaluation', 'Post-care instructions', 'Local anesthesia'] },
  { id: 'tooth-extraction', name: 'Tooth Extraction', category: 'specialized', description: 'Safe removal of damaged or infected teeth', seoKeywords: ['tooth extraction Chennai', 'tooth removal Kodungaiyur'], duration: '20-30 minutes', priceRange: '₹1000+', startingPrice: 1000, iconName: 'IconToothExtraction', features: ['Simple & surgical tooth extraction', 'Extraction for damaged & infected teeth', 'Comfort-focused extraction care', 'Post-extraction healing guidance'] },
  { id: 'gum-disease', name: 'Gum Disease Treatment', category: 'specialized', description: 'Treats bleeding & swollen gums', seoKeywords: ['gum disease treatment Chennai', 'periodontal therapy Kodungaiyur'], duration: '40-60 minutes', priceRange: '₹2000-₹5000', startingPrice: 2000, iconName: 'IconToothache', features: ['Comprehensive gum assessment', 'Deep cleaning', 'Gum surgery if needed', 'Regular monitoring'] },
  { id: 'implants', name: 'Dental Implants', category: 'specialized', description: 'Permanent tooth replacement', seoKeywords: ['dental implants Chennai', 'tooth implant Kodungaiyur'], duration: '3-6 months', priceRange: '₹30000-₹50000', startingPrice: 30000, iconName: 'IconToothDrill', features: ['Titanium implants', 'Bone preservation', 'Dental implant assessment', 'Digital implant planning'] },
  { id: 'laser-dentistry', name: 'Laser Dentistry', category: 'specialized', description: 'Bloodless, suture-free procedures', seoKeywords: ['laser dentistry Chennai', 'painless laser treatment Kodungaiyur'], duration: '30-60 minutes', priceRange: '₹2000-₹8000', startingPrice: 2000, iconName: 'IconTools', features: ['Reduced bleeding', 'Quicker recovery time', 'Laser gum procedures'] },
  // Kids / Pediatric Dentistry
  { id: 'kids-dentistry', name: 'Kids Dentistry', category: 'pediatric', description: 'Gentle, fear-free visits for children', seoKeywords: ['pediatric dentist Chennai', 'kids dentist Kodungaiyur'], duration: '20-40 minutes', priceRange: '₹500-₹2000', startingPrice: 500, iconName: 'IconDentalCare', features: ['Child-friendly approach', 'Cavity prevention & treatment', 'Dental habit guidance', 'Tooth & jaw development monitoring'] },
];

export const DOCTOR: Doctor = {
  name: 'Dr. Swetha',
  title: 'BDS, FGDS',
  specialty: 'Dental Surgeon & Clinical Director',
  experience: 'KSR Dental College',
  education: 'Saveetha Dental University',
  bio: 'Dr. Swetha is a dedicated dental professional with 5+ years of experience in general and cosmetic dentistry. A proud alumna of Saveetha Dental University and KSR Dental College, she has performed over 5,000+ dental procedures, from tooth fillings and tooth extractions to complex root canal treatments, implants, and orthodontics. Her patient-first approach, backed by the latest technology, ensures every treatment is comfortable, transparent, and of the highest clinical standard.',
  imageAlt: 'Dr. Swetha - Lead Dentist at neudental',
  avatarUrl: '',
  skills: ['Root Canal Treatment', 'Smile Designing', 'Clear Aligners', 'Dental Implants', 'Cosmetic Dentistry', 'Dentures', 'Pediatric/Kids Dentistry'],
};

// Public review figures shown on the site (hero badge, testimonials, booking
// panel); keep index.html's aggregateRating in step when they change.
export const REVIEW_RATING = '4.9';
export const REVIEW_COUNT_LABEL = '200+';

// The clinic's WhatsApp Business chat link (its greeting is set in the WhatsApp
// Business app). Every WhatsApp button on the site opens this.
export const WHATSAPP_URL = 'https://wa.me/message/B5KLDUABU2IFO1';

// The clinic's Google Business listing: reviews, map and directions.
export const CLINIC_GOOGLE_URL = 'https://www.google.com/maps/place/Neudental+Clinic+(Formerly+Bludental)+%7C+Dentist+in+Chennai+%7C+Dental+Clinic+in+Kodungaiyur/@13.1309218,80.2535879,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52659b841d30d3:0xc53ff4dcde940735!8m2!3d13.1309218!4d80.2535879!16s%2Fg%2F11z2d1y0y6';

// Order the testimonials section's story card rotates through, first shown first.
export const TESTIMONIALS: Testimonial[] = [
  { id: 'test-5', name: 'Mathiyazhagan S', role: 'Patient', rating: 5, text: 'I was in unbearable pain, and a government hospital advised extraction. I decided to try neudental clinic instead, and I’m so glad I did — Dr. Swetha saved my tooth! She was kind, patient, and caring throughout. Truly grateful for the wonderful care. ❤️🦷', treatmentRecceived: 'Root Canal Treatment', imgUrl: '', imgAlt: 'Mathiyazhagan S - neudental patient', initials: 'M', sourceLogo: 'google', highlight: 'Dr. Swetha saved my tooth!' },
  { id: 'test-6', name: 'Rekha', role: "Parent of a 7-year-old patient", rating: 5, text: 'My 7-year-old had improper spacing and alignment in his teeth, and I was worried how he’d cope with treatment. Dr. Swetha made his ortho experience so kid-friendly and patient that he now looks forward to his visits! His smile has improved beautifully. Truly grateful to neudental.', treatmentRecceived: 'Orthodontic Treatment', imgUrl: '', imgAlt: 'Rekha - neudental patient', initials: 'R', sourceLogo: 'practo', highlight: 'he now looks forward to his visits!' },
  { id: 'test-1', name: 'Viji', role: 'Patient', rating: 5, text: 'I had a fantastic experience getting my teeth cleaned here! Dr. Swetha was extremely friendly, and the hygienist did a thorough job while making sure I was completely comfortable. The clinic is spotless, and I received great advice for my daily routine. Highly recommend!', treatmentRecceived: 'Dental Cleaning', imgUrl: '', imgAlt: 'Viji - neudental patient', initials: 'V', sourceLogo: 'practo', highlight: 'The clinic is spotless' },
  { id: 'test-2', name: 'Thamizhselvi', role: 'Patient', rating: 5, text: 'Had my filling done here. The treatment was quick and completely painless. Doctor is very skilled and polite. I strongly recommend this clinic.', treatmentRecceived: 'Cavity Filling', imgUrl: '', imgAlt: 'Thamizhselvi - neudental patient', initials: 'T', sourceLogo: 'google', highlight: 'quick and completely painless' },
  { id: 'test-3', name: 'Aadhithya S', role: 'Patient', rating: 5, text: 'I visited Dr.Swetha and did my tooth cleaning and root canal treatment along with crown fixing. The treatment plan was good and loved the minimal clinic setup.', treatmentRecceived: 'Root Canal Treatment', imgUrl: '', imgAlt: 'Aadhithya S - neudental patient', initials: 'A', sourceLogo: 'justdial', highlight: 'loved the minimal clinic setup' },
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
  { id: 'faq-5', question: 'How do I book an appointment?', answer: 'You can book an appointment using any of the options we offer — the booking form on this website, chatting with us on WhatsApp, or calling us directly. Walk-ins are also welcome during clinic hours.', category: 'appointment' },
  { id: 'faq-6', question: 'Is Neudental the same as Bludental?', answer: 'Yes — Neudental was formerly known as Bludental. It is the same clinic, at the same location in Kodungaiyur, with the same team led by Dr. Swetha. Only the name has changed.', category: 'general' },
];

// Alias for backward compatibility with components using DOCTORS (plural)
export const DOCTORS = [DOCTOR];

export const BLOGS: BlogPost[] = [
  {
    id: 'root-canal-treatment-does-it-hurt',
    title: 'Root Canal Treatment: When Do You Need It and Does It Hurt?',
    seoTitle: 'Root Canal Treatment: Does It Hurt? Signs & Steps | Neudental',
    excerpt: 'Does root canal treatment hurt? Learn the signs you need an RCT, what happens step by step, how many visits it takes and when a crown is needed.',
    category: 'Patient Care',
    date: 'October 2026',
    datePublished: '2026-10-25',
    readTime: '8 min read',
    image: '/blogs/root-canal-treatment-banner.webp',
    imageAlt: 'Root canal treatment guide by Neudental dental clinic, Kodungaiyur, Chennai',
    content: [
      { type: 'answer', text: 'Root canal treatment (RCT) removes infected or inflamed pulp from inside a tooth, then cleans, disinfects and seals the canals so your natural tooth can be saved. It is usually needed for deep decay, a cracked tooth, lingering hot or cold sensitivity, pain while chewing or a gum abscess. It is done under local anaesthesia, so most patients feel pressure but not significant pain. Mild soreness for a few days afterwards is normal.' },
      'A toothache can start as something small: a little sensitivity while drinking tea, pain when chewing, or a tooth that suddenly feels different. Many people ignore it until the pain becomes difficult to tolerate.',
      "One of the most common treatments recommended for an infected or badly damaged tooth is **root canal treatment (RCT)**. But what exactly is a root canal? Is it painful? Why is a crown sometimes needed afterward? And can the natural tooth actually be saved? Let's make it simple.",
      { type: 'contents' },
      {
        type: 'table',
        caption: 'Root canal treatment at a glance',
        rows: [
          ['What it treats', 'Infected or inflamed pulp (the soft tissue inside the tooth)'],
          ['Is it painful?', 'Done under local anaesthesia. You may feel pressure, not significant pain'],
          ['Number of visits', 'One to two or more, depending on the tooth and infection'],
          ['Afterwards', 'Mild soreness or sensitivity for a few days is normal'],
          ['Crown needed?', 'Often for back teeth or weakened teeth. Your dentist decides case by case'],
          ['Main benefit', 'Saves your natural tooth instead of extracting it'],
        ],
      },
      { type: 'heading', id: 'what-is-root-canal-treatment', text: 'What is root canal treatment?' },
      '**Root canal treatment is a dental procedure that treats a tooth when the soft tissue inside it, called the pulp, becomes inflamed or infected.** The infected pulp is removed, and the canals are cleaned, shaped, disinfected and sealed to remove the infection while preserving your natural tooth.',
      'Pulp infection can happen because of deep dental decay, a cracked or broken tooth, repeated dental procedures on the same tooth, or trauma. If it is left untreated, the infection can progress and may eventually cause an abscess or damage the surrounding bone.',
      { type: 'heading', id: 'signs-you-need-a-root-canal', text: 'Signs you may need a root canal' },
      'Not every toothache needs a root canal. Your dentist will examine the tooth, check your symptoms and usually take an X-ray before deciding on treatment. Root canal treatment may be recommended when there is:',
      {
        type: 'list',
        items: [
          'Deep tooth decay',
          'Severe or lingering sensitivity to hot or cold',
          'Pain while biting or chewing',
          'A cracked or fractured tooth',
          'Swelling around the tooth or gums',
          'A dental abscess or pus-filled gum swelling (gum boil)',
          'Trauma or injury to the tooth',
          'Infection around the root of the tooth',
        ],
      },
      { type: 'note', text: 'An infected tooth does not always hurt. Some infections cause no noticeable pain at all, which is why [regular dental check-ups](/blogs/why-regular-checkups-matter) matter.' },
      { type: 'heading', id: 'does-root-canal-hurt', text: 'Does root canal treatment hurt?' },
      '**Most patients are comfortable during a modern root canal because it is done under local anaesthesia.** You may feel some pressure or movement, but you should not feel significant pain during treatment.',
      'This is usually the first question patients ask:',
      { type: 'quote', text: '"Doctor, root canal treatment will be painful, right?"' },
      'After treatment, it is normal for the tooth to feel slightly sore or sensitive for a few days, particularly if there was an infection before the procedure. So a root canal is not something you need to avoid out of fear of pain. The infection it treats is usually what causes the pain in the first place.',
      { type: 'heading', id: 'root-canal-steps', text: 'What happens during a root canal? Step by step' },
      'Every tooth is different, but root canal treatment generally follows these six steps:',
      {
        type: 'steps',
        items: [
          { title: 'Examination and X-ray', text: 'Your dentist identifies the cause of the problem and checks how far the infection or damage has spread.' },
          { title: 'Local anaesthesia', text: 'The area around the tooth is numbed to keep you comfortable throughout the procedure.' },
          { title: 'Accessing the tooth', text: 'A small opening is made in the tooth to reach the infected pulp and root canals.' },
          { title: 'Cleaning the canals', text: 'The infected tissue is removed, and the canals are carefully cleaned and disinfected.' },
          { title: 'Filling and sealing', text: 'The cleaned canals are filled with root canal filling material and sealed to reduce the chance of reinfection.' },
          { title: 'Restoring the tooth', text: 'Depending on how much tooth structure remains, a permanent filling or a dental crown is placed to protect the tooth and restore its function.' },
        ],
      },
      { type: 'heading', id: 'how-many-visits', text: 'How many visits does root canal treatment take?' },
      '**A root canal can take one visit or two or more, depending on the tooth.** The number of visits depends on which tooth it is, the number and shape of its canals, whether there is an active infection, and how complex the case is.',
      'Molars (back teeth), for example, generally have more complex root canal anatomy than front teeth, so they may need more time.',
      { type: 'heading', id: 'crown-after-root-canal', text: 'Why is a crown needed after root canal treatment?' },
      '**A crown protects a root-treated tooth that has lost a lot of its natural structure.** A root canal removes the infected pulp, but the tooth may already have been weakened by decay, cracks or previous fillings. A crown helps restore its strength, shape and chewing function.',
      'Not every tooth needs a crown. Your dentist will assess the remaining tooth structure and recommend the right restoration for your tooth.',
      { type: 'heading', id: 'can-a-root-canal-save-my-tooth', text: 'Can a root canal save my natural tooth?' },
      '**In many cases, yes.** One of the biggest advantages of root canal treatment is that you keep your natural tooth instead of having it extracted. A properly treated and restored tooth can continue to function for many years, and some root-treated teeth last a lifetime with good care.',
      'Keeping your natural tooth also helps you chew normally and avoids having to replace a missing tooth with an implant, bridge or denture right away.',
      { type: 'heading', id: 'untreated-tooth-infection', text: "What happens if you don't treat an infected tooth?" },
      '**An untreated tooth infection can spread and may lead to an abscess, swelling, bone damage or eventually losing the tooth.** Tooth pain sometimes comes and goes, but that does not mean the problem has gone away.',
      'If you have persistent tooth pain, swelling, a gum boil, or sensitivity that lingers after something hot or cold, get the tooth examined before the symptoms become severe.',
      { type: 'heading', id: 'after-a-root-canal', text: 'What should you do after a root canal?' },
      {
        type: 'list',
        items: [
          "Follow your dentist's instructions.",
          'If advised, avoid chewing hard foods on the treated tooth until your permanent filling or crown is placed.',
          'Keep brushing and flossing as usual.',
          'Attend your follow-up appointment.',
          'Get the recommended permanent filling or crown done on time.',
          'Contact your dentist if pain or swelling persists or gets worse.',
        ],
      },
      'A root canal treats the infection inside the tooth, but the tooth still needs good oral hygiene and regular dental care. For a detailed recovery routine, read [5 simple habits to protect your smile after a root canal](/blogs/oral-hygiene-after-root-canal).',
      { type: 'heading', id: 'when-to-see-a-dentist', text: 'When should you see a dentist?' },
      "Don't wait until tooth pain becomes unbearable. Book a dental examination if you have:",
      {
        type: 'list',
        items: [
          'Tooth pain while chewing',
          'Hot or cold sensitivity that lingers',
          'Swelling of the face or gums',
          'A cracked tooth',
          'A gum boil that keeps coming back',
        ],
      },
      'Early evaluation can sometimes save a tooth before the problem becomes more complicated.',
      { type: 'faq' },
      { type: 'heading', id: 'root-canal-treatment-kodungaiyur', text: 'Looking for root canal treatment in Kodungaiyur, Chennai?' },
      'If you are searching for root canal treatment in Kodungaiyur, an RCT dentist near Madhavaram, or a dentist for persistent tooth pain in and around Vasuki Nagar, getting the tooth examined is the right first step.',
      'At Neudental, Kodungaiyur, every root canal is planned around the condition of the individual tooth, a clinical examination and dental X-rays. The focus is on relieving infection and pain while preserving the natural tooth whenever it can be safely saved.',
      { type: 'cta', title: "Don't ignore a tooth that keeps hurting", text: 'Treating the problem early can make all the difference. Book a dental examination at Neudental, Kodungaiyur.' },
    ],
    faqs: [
      { question: 'Is root canal treatment painful?', answer: 'No, not significantly. RCT is done under local anaesthesia, so most patients feel only pressure or movement. Mild soreness for a few days afterwards is normal, especially if the tooth was infected.' },
      { question: 'How long does a root canal appointment take?', answer: 'A single sitting usually takes about 40 to 60 minutes. Complex teeth such as molars, or teeth with an active infection, may need more than one sitting.' },
      { question: 'Can a root canal be done in one sitting?', answer: 'Yes, many root canals can be completed in a single visit. Whether yours can depends on the tooth, its canal anatomy and whether there is an active infection. Your dentist will advise you after examining the tooth and X-ray.' },
      { question: 'Do I always need a crown after a root canal?', answer: 'No. Crowns are often recommended for back teeth and teeth that have lost a lot of structure. Some teeth, especially front teeth with enough healthy structure, can be restored with a permanent filling.' },
      { question: 'Can I eat after a root canal?', answer: "Wait until the numbness wears off before eating, so you don't bite your cheek or tongue. Until your permanent filling or crown is placed, avoid chewing hard or sticky food on the treated tooth." },
      { question: 'Is it better to remove the tooth instead of doing a root canal?', answer: 'When a tooth can be safely saved and restored, keeping it is usually the better option. It preserves your natural bite and avoids the need for an implant, bridge or denture. Your dentist will tell you honestly if a tooth cannot be saved.' },
    ],
    related: ['oral-hygiene-after-root-canal', 'why-regular-checkups-matter'],
  },
  {
    id: 'oral-hygiene-after-root-canal',
    title: '5 Simple Habits to Protect Your Smile After a Root Canal',
    excerpt: 'A root canal saves your tooth, but the days right after matter just as much as the procedure itself. Here is what actually helps recovery go smoothly.',
    category: 'Patient Care',
    date: 'August 2026',
    readTime: '4 min read',
    image: '/blogs/root-canal-operatory-banner.webp',
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
    image: '/blogs/regular-checkups-banner.webp',
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
    image: '/blogs/laser-dentistry-banner.webp',
    content: [
      'Laser dentistry uses a focused beam of light instead of traditional drills for many common procedures, including cavity treatment, gum reshaping, and some soft-tissue work. For patients, the appeal is straightforward: many of these procedures can be done with less discomfort, less bleeding, and a noticeably calmer experience overall.',
      'The reason it feels different comes down to precision. A laser can target only the affected tissue with very fine control, which often means less vibration, less pressure, and in many cases, less need for local anesthesia than a conventional approach would require.',
      'Recovery tends to be faster too. Because the laser seals small blood vessels and nerve endings as it works, many patients experience less swelling and bleeding afterward compared to traditional instruments, which can mean a shorter, more comfortable healing period.',
      'Laser treatment is not the right fit for every single procedure, your dentist will always recommend whichever method is safest and most effective for your specific case. But for the procedures where it applies, it is a big part of why the phrase "painless dentistry" has become a realistic promise rather than just a marketing line.',
    ],
  },
];

export const APPOINTMENT_SLOT_GROUPS = [
  { label: 'Morning Slots (10:00 AM - 1:30 PM)', times: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'] },
  { label: 'Evening Slots (5:00 PM - 9:30 PM)', times: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'] },
];
