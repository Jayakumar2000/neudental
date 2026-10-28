// Patient guide for /treatments/dental-crowns-and-bridges. Fields are explained
// on TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'crowns-bridges',
  seoTitle: 'Dental Crowns & Bridges in Kodungaiyur: Cost | Neudental',
  metaDescription: 'Dental crowns and fixed bridges at Neudental, Kodungaiyur: when you need one, ceramic and metal-free options, visits, care and cost ({{price}}).',
  headline: 'Dental Crowns & Bridges in Kodungaiyur, Chennai',
  answer: 'A dental crown is a custom-made cap that covers and protects a weak, broken or root-canal-treated tooth. A fixed bridge replaces one or more missing teeth with false teeth held by crowns on the teeth either side of the gap. Treatment usually takes {{duration}}. At Neudental in Kodungaiyur, crowns and bridges cost {{price}}, depending on the material and the number of teeth involved.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'crown-or-bridge', text: 'What is the difference between a crown and a bridge?' },
    "A **dental crown** is a custom-made cap that fits over the whole visible part of a tooth. It restores the tooth's shape and strength, so a weak, cracked or heavily filled tooth can be used for chewing again. People often call it a tooth cap.",
    'A **fixed bridge** replaces one or more missing teeth. Crowns are placed on the teeth on either side of the gap, and these hold a false tooth (called a pontic) that fills the space. Unlike a denture, a bridge is cemented in place and is not taken out at home.',
    { type: 'heading', id: 'when-do-you-need-a-crown', text: 'When do you need a dental crown?' },
    'A crown is usually advised when a tooth is too weak or damaged to be repaired well with a filling alone, for example:',
    {
      type: 'list',
      items: [
        'A large cavity, or a big old filling that leaves little natural tooth behind',
        'A cracked or broken tooth, or a badly chipped one',
        'A back tooth after [root canal treatment](/treatments/root-canal-treatment), which can become brittle and crack',
        'A tooth badly worn down by grinding or acid erosion',
        'A badly discoloured or misshapen tooth, where a filling would not look natural',
        'To support a bridge, or to sit on top of a dental implant',
      ],
    },
    'A small or moderate cavity usually needs only a filling; your dentist will check how much healthy tooth is left.',
    { type: 'heading', id: 'when-is-a-bridge-right', text: 'When is a bridge the right choice?' },
    'When a tooth is missing, the teeth beside it can slowly tilt or drift into the gap, the opposite tooth can move into the space, and chewing becomes harder. A fixed bridge may suit you if:',
    {
      type: 'list',
      items: [
        'One tooth, or a few teeth next to each other, are missing',
        'The teeth on either side of the gap are strong, with healthy roots and gums',
        'You want a fixed replacement rather than a removable one, without surgery',
      ],
    },
    'If the gap is long, or the teeth beside it are weak, your dentist may suggest an implant or a denture instead.',
    { type: 'heading', id: 'crown-materials', text: 'Which crown material is right for you?' },
    'Neudental offers **ceramic crowns**, including **metal-free options**. Ceramic is tooth-coloured and shade-matched to your neighbouring teeth. A metal-free crown has no metal layer underneath, so no grey metal edge can show at the gumline, which is why it is often chosen for front teeth.',
    'Which material suits you depends on where the tooth is (front teeth need to look natural, back teeth take the heaviest chewing force), how much tooth is left, your bite, habits such as grinding, and your preferences on appearance and cost. Dr. Swetha will explain the options before treatment starts.',
    { type: 'heading', id: 'crown-and-bridge-procedure', text: 'How crowns and bridges are made and fitted at Neudental' },
    'Each crown or bridge is custom-made, so treatment usually takes {{duration}}.',
    {
      type: 'steps',
      items: [
        { title: 'Examination and X-ray', text: 'Dr. Swetha examines the tooth, or the gap and the teeth beside it, and takes an X-ray to check the roots, bone and any decay. A filling, root canal or gum treatment, if needed, is done first.' },
        { title: 'Preparing the tooth', text: 'Under local anaesthesia, a thin layer is removed from the outside of the tooth so the crown can fit over it. If a lot of the tooth is missing, it may first be built up with filling material. For a bridge, the teeth on both sides of the gap are prepared. This shaping cannot be undone, so the tooth will always need a crown.' },
        { title: 'Impression and shade', text: 'An impression (a precise mould) of your teeth and bite is taken, and the colour is matched to your neighbouring teeth.' },
        { title: 'Temporary crown or bridge', text: 'A temporary is fitted to protect the prepared teeth while your final crown or bridge is made.' },
        { title: 'Trial and fitting', text: 'At the next visit, the final crown or bridge is tried in and its fit, bite and colour are checked. The bite is adjusted if needed, and it is then cemented in place.' },
        { title: 'Review, if needed', text: 'Some patients return briefly to fine-tune the bite.' },
      ],
    },
    { type: 'heading', id: 'crown-and-bridge-cost', text: 'Crown and bridge cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Crown and bridge cost at Neudental',
      rows: [
        ['Crowns and bridges', '{{price}}'],
        ['What changes the cost', 'The crown material, and whether you need a single crown or a bridge (which includes crowns on the supporting teeth as well as the false tooth)'],
        ['Treatment needed first', 'A filling, root canal or gum treatment, if needed, is a separate step with its own cost'],
        ['When you will know your cost', 'After the examination and X-ray, before any treatment starts'],
      ],
    },
    { type: 'heading', id: 'caring-for-crowns-and-bridges', text: 'Aftercare and possible problems' },
    'Mild sensitivity to hot and cold, or a slightly tender gum, is common for a few days after fitting.',
    {
      type: 'list',
      items: [
        'With a temporary crown, avoid sticky and hard food on that side. If it comes loose, keep it and call the clinic.',
        'Brush twice a day and clean between your teeth daily. A crown cannot decay, but the tooth underneath can, usually starting at the edge near the gum.',
        'Clean under a bridge with a floss threader or a small interdental brush. Your dentist will show you how.',
        'Avoid biting very hard things such as ice, bones or bottle caps, which can chip ceramic. If you grind or clench your teeth, tell your dentist.',
        'Keep up a [regular dental check-up](/treatments/dental-checkup) every six months, so the crown edges and supporting teeth can be checked.',
      ],
    },
    'Crowns and bridges have limits too. A crown can loosen or chip over time, and occasionally a shaped tooth that still has its nerve becomes inflamed and later needs root canal treatment. A problem in one supporting tooth can affect the whole bridge.',
    { type: 'note', text: 'Call the clinic if your bite feels high once the numbness wears off, if a crown or bridge feels loose, or if pain, sensitivity or swelling gets worse or does not settle.' },
    { type: 'heading', id: 'bridge-or-implant', text: 'Bridge or implant: which should you choose?' },
    'A fixed bridge and a dental implant both give you a fixed tooth that is not taken out at home. They differ mainly in what happens to the teeth beside the gap, whether surgery is needed and how long treatment takes.',
    {
      type: 'table',
      caption: 'Fixed bridge and dental implant compared',
      rows: [
        ['Teeth beside the gap', 'Bridge: shaped to hold crowns. Implant: left untouched'],
        ['Surgery', 'Bridge: none. Implant: a minor surgical procedure to place a titanium post in the jawbone'],
        ['Treatment time', 'Bridge: usually {{duration}}. Implant: a few months, mostly healing time'],
        ['What it needs', 'Bridge: strong, healthy teeth on either side of the gap. Implant: enough healthy jawbone and healthy gums'],
        ['Bone under the gap', 'Bridge: can slowly shrink over time, as under any missing tooth. Implant: helps preserve it'],
        ['Cleaning', 'Bridge: under the false tooth with a floss threader or interdental brush. Implant: around it, much like a natural tooth'],
      ],
    },
    'If the teeth beside the gap are healthy and have no large fillings, an implant spares them from being shaped. A bridge is often the simpler choice when those teeth already need crowns, or when an implant does not suit your bone or health. When several teeth are missing, a removable [denture](/treatments/dentures) may suit you better.',
    'For all three options side by side, see [dental implants](/treatments/dental-implants), or ask [Dr. Swetha](/dr-swetha) to compare them for your mouth.',
  ],
  faqs: [
    { question: 'How much does a dental crown cost at Neudental?', answer: 'Crowns and bridges at Neudental in Kodungaiyur cost {{price}}. The exact amount depends on the material and, for a bridge, how many teeth are involved. It is confirmed after an examination and X-ray, before treatment starts.' },
    { question: 'How many visits does a crown or bridge need?', answer: 'Usually {{duration}}. The tooth is prepared and an impression is taken at the first visit, and a temporary crown protects it while the final one is made. The crown or bridge is fitted at the next visit, and a short review is sometimes needed for the bite. Any filling or root canal needed first adds visits.' },
    { question: 'Does getting a crown hurt?', answer: 'The tooth is numbed with local anaesthesia before it is shaped, so most people feel pressure and vibration rather than pain. Mild sensitivity or gum tenderness for a few days after fitting is common and usually settles on its own.' },
    { question: 'Will my crown look like a natural tooth?', answer: 'Ceramic and metal-free crowns are tooth-coloured, and the shade is matched to your neighbouring teeth, so they usually blend in well. Your dentist checks the colour and shape before the crown is fixed. Crowns do not change colour with whitening, so any whitening is done before the shade is chosen.' },
    { question: 'How long does a dental crown last?', answer: 'With good brushing, cleaning between the teeth and regular check-ups, a crown or bridge often lasts many years. How long yours lasts depends on the material, your bite, habits like grinding, and the health of the tooth and gums underneath.' },
    { question: 'Is a bridge better than an implant?', answer: 'Neither is right for everyone. A bridge is fixed without surgery but needs the neighbouring teeth to be shaped. An implant leaves those teeth untouched but needs enough healthy bone, a surgical procedure and a few months. Your dentist will advise which suits you after an examination.' },
    { question: 'What should I do if my crown comes off or chips?', answer: 'Keep the crown if it has come off, avoid chewing on that side and call the clinic. Do not try to fix it yourself with household glue. A loose crown can often be re-cemented if the tooth underneath is healthy. A chipped crown may be smoothed, repaired or replaced, depending on the damage.' },
  ],
  relatedPosts: ['root-canal-treatment-does-it-hurt', 'oral-hygiene-after-root-canal'],
  relatedTreatments: ['rct', 'implants', 'dentures', 'filling'],
  datePublished: '2026-10-26',
};

export default guide;
