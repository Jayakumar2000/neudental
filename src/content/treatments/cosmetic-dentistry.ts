// Patient guide for /treatments/cosmetic-dentistry. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'cosmetic',
  seoTitle: 'Cosmetic Dentistry in Kodungaiyur: Veneers, Cost | Neudental',
  metaDescription: 'Cosmetic dentistry and smile makeovers at Neudental, Kodungaiyur: veneers, smile design, who it suits, what happens over {{duration}} and cost from {{startingPrice}}.',
  headline: 'Cosmetic Dentistry in Kodungaiyur, Chennai',
  answer: 'Cosmetic dentistry improves the look of your smile by changing the colour, shape, size or balance of your teeth. At Neudental in Kodungaiyur it includes a smile assessment, smile design, veneers, and tooth shape and colour enhancement, for healthy teeth that are chipped, discoloured, uneven or slightly gapped. Treatment usually takes {{duration}}. Prices start at {{startingPrice}}; the total depends on the treatment and how many teeth are involved.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-cosmetic-dentistry-includes', text: 'What does cosmetic dentistry include at Neudental?' },
    'Cosmetic dentistry focuses on how your teeth look, while keeping them healthy and working well. At Neudental, a smile makeover is planned from four parts, and not everyone needs all of them:',
    {
      type: 'list',
      items: [
        '**Smile assessment**: a check of your teeth, gums and bite, and a talk about what you would like to change.',
        '**Smile design**: planning the shape, length and shade of your teeth so the result suits your face and looks natural rather than overdone.',
        '**Veneers**: thin, tooth-coloured shells bonded to the front of the teeth.',
        '**Tooth shape and colour enhancement**: smaller corrections to one or a few teeth, such as a chipped edge, an uneven tooth, a small gap or a tooth darker than the rest.',
      ],
    },
    'Treatment is planned by [Dr. Swetha](/dr-swetha), whose work includes smile designing and cosmetic dentistry.',
    { type: 'heading', id: 'who-is-it-for', text: 'Is a smile makeover right for you?' },
    'Cosmetic treatment may suit you if your teeth and gums are healthy and you would like to change:',
    {
      type: 'list',
      items: [
        'Teeth that are chipped, worn down or uneven in length',
        'Small gaps between the front teeth',
        'Teeth that look too small, pointed or oddly shaped',
        'Discolouration that whitening has not improved, or one tooth darker than the others',
        'Old fillings on front teeth that have stained or no longer match',
      ],
    },
    'It may not be the right first step if you have cavities, gum disease or loose teeth, which are treated first. If your teeth are noticeably crooked or your bite is off, moving the teeth may work better than covering them.',
    { type: 'heading', id: 'which-treatment', text: 'Veneers, whitening or braces: which do you need?' },
    'As a general guide (your dentist will advise what suits your teeth):',
    {
      type: 'table',
      caption: 'Which treatment usually suits which concern',
      rows: [
        ['Yellow or stained teeth that are otherwise healthy', 'Professional [teeth whitening](/treatments/teeth-whitening) is usually tried first, as no enamel is removed'],
        ['Chipped, worn or uneven front teeth', 'Tooth shape enhancement or veneers, depending on how much needs to change'],
        ['Small gaps between front teeth', 'Veneers or tooth shape enhancement; larger gaps may need the teeth moved first'],
        ['Deep stains, or a single dark tooth, that whitening cannot lift', 'Veneers or colour enhancement, once the tooth has been checked and any problem treated'],
        ['Crooked or crowded teeth, or a bite problem', '[Braces](/treatments/braces) or [clear aligners](/treatments/clear-aligners), which move the teeth themselves'],
        ['A broken, weak or heavily filled tooth', 'A [crown](/treatments/dental-crowns-and-bridges), which covers and protects the whole tooth'],
      ],
    },
    { type: 'note', text: 'A tooth that has darkened after an injury should be examined, usually with an X-ray, before any cosmetic treatment, because it may need a root canal first.' },
    { type: 'heading', id: 'what-are-veneers', text: 'What are veneers and what do they involve?' },
    'A veneer is a thin, tooth-coloured shell bonded to the front surface of a tooth to change its colour, shape or size. Veneers are mostly used on the teeth that show when you smile.',
    'In general, veneers are made either from **ceramic (porcelain)** in a dental laboratory, using an impression of your teeth, or from **tooth-coloured composite resin**. Ceramic usually resists staining better, while composite usually needs less tooth removed and is easier to repair. Ask your dentist which type suits your teeth.',
    'Before choosing veneers, know that:',
    {
      type: 'list',
      items: [
        'Most veneers need a thin layer of enamel removed from the front of the tooth. This cannot be undone, so that tooth will need a veneer or crown over it from then on.',
        'Veneers can chip or come loose if you bite very hard things or grind your teeth.',
        'The natural tooth underneath can still decay, usually at the edge near the gum.',
      ],
    },
    { type: 'heading', id: 'smile-makeover-procedure', text: 'What happens during a smile makeover at Neudental?' },
    'A smile makeover with veneers usually takes {{duration}}. Smaller shape or colour corrections may need fewer visits.',
    {
      type: 'steps',
      items: [
        { title: 'Smile assessment', text: 'Dr. Swetha examines your teeth, gums and bite, checks for decay, gum problems and signs of grinding, and asks what you would like to change. An X-ray is taken if needed.' },
        { title: 'Smile design and plan', text: 'You plan the shape, length and shade of the teeth together, and are told which option fits, how many visits it needs and what it will cost.' },
        { title: 'Treatment needed first', text: 'Cavities and gum problems are treated first. If you want whiter teeth overall, whitening is usually done now, with a short wait for the shade to settle, so new work can match it.' },
        { title: 'Preparing the teeth', text: 'For most veneers, a thin layer of enamel is removed from the front of each tooth, usually under local anaesthesia. If the veneers are made in a laboratory, an impression is taken, the shade recorded and temporary covers may be placed meanwhile.' },
        { title: 'Fitting', text: 'Lab-made veneers are tried in to check the fit, shape and colour, then bonded. Composite veneers are usually built up and shaped directly on the tooth. The bite is checked and the edges are polished.' },
        { title: 'Review, if needed', text: 'A short follow-up may be advised to check your bite and gums.' },
      ],
    },
    { type: 'heading', id: 'cosmetic-dentistry-cost', text: 'Cosmetic dentistry cost in Kodungaiyur' },
    'Each smile makeover is planned individually, so there is no single fixed price. Cosmetic treatment at Neudental starts at {{startingPrice}}.',
    {
      type: 'table',
      caption: 'Cosmetic dentistry cost at Neudental',
      rows: [
        ['Cosmetic dentistry', '{{price}}'],
        ['What changes the cost', 'How many teeth are treated, whether you need veneers or a smaller shape or colour correction, and the type of veneer your dentist recommends'],
        ['Treatment needed first', 'Fillings, teeth cleaning, gum treatment or whitening, if needed, are separate treatments with their own cost'],
        ['When you will know your cost', 'After the smile assessment, before any treatment starts'],
      ],
    },
    { type: 'heading', id: 'aftercare', text: 'How do you care for veneers?' },
    'Mild sensitivity to hot and cold is common for a few days after veneers are fitted, and your bite may feel slightly different at first.',
    {
      type: 'list',
      items: [
        'Brush twice a day and clean between your teeth daily, especially where each veneer meets the gum.',
        'Avoid biting ice, bones or bottle caps, and do not open packets with your teeth.',
        'Tea, coffee, paan and tobacco can stain the edges of veneers, composite ones in particular.',
        'Tell your dentist if you grind or clench your teeth, especially at night; a protective night guard may be advised.',
        'Keep up a dental check-up every six months.',
      ],
    },
    { type: 'note', text: 'Call the clinic if a veneer chips, feels loose or comes off (keep it and bring it with you), if your bite feels high after the numbness wears off, or if sensitivity or soreness gets worse instead of better.' },
  ],
  faqs: [
    { question: 'How much does cosmetic dentistry cost at Neudental?', answer: 'Cosmetic treatment at Neudental in Kodungaiyur starts at {{startingPrice}}. The total depends on how many teeth are treated, whether you need veneers or a smaller shape or colour correction, and any treatment needed first. Your cost is confirmed after the smile assessment, before anything is started.' },
    { question: 'How many visits does a smile makeover need?', answer: 'A smile makeover with veneers usually takes {{duration}}. These cover the assessment and smile plan, preparing the teeth (with impressions if the veneers are lab-made) and fitting the veneers. Smaller shape or colour corrections may need fewer visits. Fillings, gum treatment or whitening needed first add to the timeline.' },
    { question: 'Do veneers damage your natural teeth?', answer: 'Fitting most veneers means removing a thin layer of enamel so they sit naturally, and enamel does not grow back, so the choice is not reversible. Some cases need very little reshaping. The tooth underneath can still decay at the edges, so careful cleaning and check-ups matter. Your dentist will explain what your teeth need before you decide.' },
    { question: 'Should I whiten my teeth before getting veneers?', answer: 'Usually, if you would like your other teeth lighter too. Veneers keep the shade they are made in, so whitening your natural teeth is normally done first. After a short wait for the new shade to settle, the veneers are matched to it. Your dentist will plan the order with you at the smile assessment.' },
    { question: 'How long do veneers last?', answer: 'With good care, veneers often last many years. How long yours last depends on the type of veneer, your bite, habits such as grinding or biting hard objects, and the health of the teeth and gums underneath. Like any dental work, they may eventually need repair or replacement.' },
    { question: 'Does getting veneers hurt?', answer: 'Preparing teeth for most veneers is done under local anaesthesia, so it should not be painful, although you may notice vibration. Smaller corrections, such as reshaping a chipped edge, may need little or no numbing. For a few days after fitting, the teeth can feel sensitive to hot and cold, which usually passes.' },
    { question: 'Will my veneers look natural?', answer: 'Smile design aims for a result that suits your face rather than a uniform, overly white look. The shape and shade are planned with you, and lab-made veneers are tried in so you can see them before they are bonded. Tell your dentist if you prefer a subtle or a brighter result.' },
  ],
  relatedTreatments: ['whitening', 'ortho', 'invisalign', 'crowns-bridges'],
  datePublished: '2026-10-26',
};

export default guide;
