// Patient guide for /treatments/teeth-whitening. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'whitening',
  seoTitle: 'Teeth Whitening in Kodungaiyur: Cost & Results | Neudental',
  metaDescription: 'Teeth whitening at Neudental, Kodungaiyur: what causes stains, how in-clinic whitening works, sensitivity, how long it lasts and cost ({{price}}).',
  headline: 'Professional Teeth Whitening in Kodungaiyur, Chennai',
  answer: 'Professional teeth whitening uses a dentist-applied whitening gel to lighten teeth that have yellowed or stained from tea, coffee, tobacco or age. It suits adults with healthy teeth and gums; crowns and fillings do not change colour. At Neudental in Kodungaiyur it is planned over {{duration}}, often with a visible difference after one sitting, and costs {{price}}.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-causes-stains', text: 'What causes teeth to stain or turn yellow?' },
    'Discolouration usually falls into two groups, and knowing which one you have tells your dentist what whitening can do:',
    {
      type: 'list',
      items: [
        '**Surface stains** build up on the enamel from tea, coffee, colas, turmeric-rich curries, smoking, chewing tobacco and paan.',
        '**Deeper discolouration** sits inside the tooth. Teeth naturally look more yellow with age, as enamel thins and the yellower dentine beneath shows through. An injury, some medicines taken while the teeth were forming in childhood, and too much fluoride in childhood (fluorosis) can also change the colour from within.',
      ],
    },
    'Whitening works well on yellow and brown shades. Grey, patchy or very deep discolouration responds less predictably, and your dentist may suggest other options.',
    { type: 'heading', id: 'is-whitening-right-for-you', text: 'Is teeth whitening right for you?' },
    'Whitening usually suits adults with healthy teeth and gums who want their own teeth a few shades lighter. It may not be suitable, or may not give the result you expect, with:',
    {
      type: 'list',
      items: [
        '**Crowns, veneers or fillings on front teeth, or dentures.** These do not change colour, so after whitening they may look darker and need replacing to match, for example with new [crowns](/treatments/dental-crowns-and-bridges).',
        '**Pregnancy or breastfeeding.** As a precaution, whitening is usually postponed until afterwards.',
        '**Children and young teenagers.** Whitening is generally not advised while the teeth and gums are still developing.',
        '**Untreated cavities or gum disease.** These are treated first, because whitening gel can cause pain on damaged teeth or inflamed gums.',
        '**Very sensitive teeth, worn enamel or exposed roots.** Your dentist will advise whether whitening is suitable.',
      ],
    },
    { type: 'note', text: 'A single tooth that has turned dark, often after a knock or injury, may have a damaged nerve. It needs an examination, usually with an X-ray, before any whitening, and may need [root canal treatment](/treatments/root-canal-treatment) first.' },
    { type: 'heading', id: 'whitening-procedure', text: 'How in-clinic teeth whitening works at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Examination and shade assessment', text: 'Dr. Swetha checks your teeth and gums for cavities, gum problems and old fillings or crowns, records your current shade, and talks you through a realistic shade for your teeth.' },
        { title: 'Removing surface stains', text: 'Plaque and surface stains are cleaned away so the gel reaches the enamel evenly. Heavy tartar may need a [professional teeth cleaning](/treatments/teeth-cleaning) first.' },
        { title: 'Protecting your gums', text: 'Your lips and cheeks are gently held back, and a protective barrier is placed over the gums.' },
        { title: 'Applying the whitening gel', text: 'Whitening gel is applied to the front of the teeth for a set time, and may be reapplied in the same sitting while your comfort is checked.' },
        { title: 'Checking the new shade', text: 'The gel is removed and your new shade is compared with your starting shade. Most people see a visible difference after one sitting.' },
        { title: 'Review or further sitting', text: 'If your teeth need more lightening to reach the planned shade, a further sitting is arranged.' },
      ],
    },
    'Whitening at Neudental is usually planned over {{duration}}, including the first examination. How many whitening sittings you need depends on your starting shade and staining; your dentist will tell you before you begin.',
    'Teeth often look extra white straight after a sitting because they lose some moisture during whitening. The shade settles slightly over the next few days, and that settled shade is your real result.',
    { type: 'heading', id: 'sensitivity-after-whitening', text: 'Does teeth whitening cause sensitivity?' },
    'Whitening at Neudental is planned as a gentle, enamel-safe treatment: your teeth and gums are checked first, the gums are protected, and the gel is used for a controlled time. Even so, some people notice:',
    {
      type: 'list',
      items: [
        'Short, sharp twinges or sensitivity to cold for a day or a few days',
        'A patch of gum that looks white or feels sore where gel touched it, which usually fades within hours',
      ],
    },
    'Tell your dentist beforehand if your teeth are sensitive; they may suggest a toothpaste for sensitive teeth or more time between sittings. Call the clinic if the pain is severe or lasts more than a few days.',
    { type: 'heading', id: 'how-long-whitening-lasts', text: 'How long do whitening results last?' },
    'Whitening is not permanent. Results often last from several months to a few years, depending mostly on your habits: tea, coffee, tobacco and paan bring stains back sooner. To help your new shade last:',
    {
      type: 'list',
      items: [
        'For the first 48 hours, avoid strongly coloured food and drinks (tea, coffee, colas, turmeric-rich curries, beetroot), smoking and paan.',
        'After that, rinse your mouth with water after tea or coffee.',
        'Brush twice a day with a fluoride toothpaste and clean between your teeth daily.',
        'Keep up a professional cleaning every six months to remove new surface stains.',
        'Ask your dentist about a touch-up sitting rather than whitening often on your own.',
      ],
    },
    { type: 'heading', id: 'home-kits-vs-professional', text: 'Home whitening kits or professional whitening?' },
    'Whitening toothpastes mostly remove surface stains and change the natural colour of teeth very little. Over-the-counter strips and gels are weaker and work more slowly, their one-size fit can let gel sit on the gums, and nobody checks first for cavities, gum disease or fillings that will not whiten.',
    'Charcoal powder, baking soda and lemon are abrasive or acidic. Used often, they can wear enamel, which can make teeth more sensitive and even more yellow over time. Professional whitening starts with an examination, protects your gums and is adjusted to your teeth and your comfort.',
    { type: 'heading', id: 'whitening-cleaning-or-veneers', text: 'Whitening, cleaning or veneers: which do you need?' },
    {
      type: 'table',
      caption: 'What each treatment changes',
      rows: [
        ['Teeth cleaning (scaling and polishing)', 'Removes plaque, tartar and surface stains. Teeth look cleaner and brighter, but their natural colour does not change'],
        ['Teeth whitening', 'Lightens the natural colour of your own healthy teeth. Suits yellow or brown discolouration'],
        ['Veneers and smile design', 'Thin coverings bonded to the front of the teeth, for discolouration whitening cannot lift, or for chipped or uneven teeth. See [cosmetic dentistry](/treatments/cosmetic-dentistry)'],
      ],
    },
    { type: 'heading', id: 'teeth-whitening-cost', text: 'Teeth whitening cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Teeth whitening cost at Neudental',
      rows: [
        ['Professional teeth whitening', '{{price}}'],
        ['What changes the cost', 'Your starting shade, the type of staining, and how many whitening sittings you need to reach the shade you want'],
        ['If you need other treatment', 'Fillings, gum treatment, or replacing old fillings and crowns to match your new shade, are separate treatments with their own cost'],
        ['When you will know your cost', 'After your teeth are examined and your shade is assessed, before whitening starts'],
      ],
    },
  ],
  faqs: [
    { question: 'How much does teeth whitening cost at Neudental?', answer: 'Teeth whitening at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on your starting shade, the type of staining and how many sittings you need, and is confirmed after your examination and shade assessment, before treatment begins.' },
    { question: 'How many visits does teeth whitening take?', answer: 'Whitening is usually completed over {{duration}}, including the first examination and shade assessment. Most people see a visible difference after one whitening sitting; a further sitting may be planned if your teeth need more lightening to reach the agreed shade.' },
    { question: 'Does professional whitening damage enamel?', answer: "When it is done under a dentist's supervision on healthy teeth, professional whitening is generally considered safe for enamel. Temporary sensitivity is the most common side effect. Enamel damage is more of a risk with overuse of home products or abrasive and acidic home remedies." },
    { question: 'How white will my teeth become?', answer: 'It depends on your natural shade and the type of staining. Whitening aims for a brighter shade that still looks natural with your skin tone and smile, not an artificial white. Your dentist will discuss a realistic result during the shade assessment.' },
    { question: 'Can I whiten my teeth during pregnancy?', answer: 'Dentists usually advise waiting until after pregnancy and breastfeeding, as a precaution. In the meantime, a routine cleaning can remove surface stains from tea and coffee. Always tell your dentist if you are pregnant before any dental treatment.' },
    { question: 'Will whitening make my fillings and crowns match?', answer: 'No. Fillings, crowns, veneers and dentures keep their original colour. If you have them on your front teeth, your dentist may suggest whitening first and then replacing visible ones to match your new shade, so plan this together before you start.' },
  ],
  relatedTreatments: ['cleaning', 'cosmetic', 'crowns-bridges'],
  datePublished: '2026-10-26',
};

export default guide;
