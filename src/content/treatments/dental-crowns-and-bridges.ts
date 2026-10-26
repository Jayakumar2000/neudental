// Patient guide for /treatments/dental-crowns-and-bridges. Fields are explained
// on TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'crowns-bridges',
  seoTitle: 'Dental Crowns & Bridges in Kodungaiyur: Cost | Neudental',
  metaDescription: 'Dental crowns and fixed bridges at Neudental, Kodungaiyur: when you need one, ceramic and metal-free options, visits, care and cost ({{price}}).',
  headline: 'Dental Crowns & Bridges in Kodungaiyur, Chennai',
  answer: 'A dental crown is a custom-made cap that covers and protects a weak, broken or root-canal-treated tooth. A fixed bridge replaces one or more missing teeth by attaching a false tooth to crowns on the teeth either side of the gap. Treatment usually takes {{duration}}. At Neudental in Kodungaiyur, crowns and bridges cost {{price}}, depending on the material and the number of teeth involved.',
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
        'A cracked, chipped or broken tooth',
        'A back tooth after [root canal treatment](/treatments/root-canal-treatment), which can become brittle and crack',
        'A tooth badly worn down by grinding or acid erosion',
        'A badly discoloured or misshapen tooth, where a filling would not look natural',
        'To support a bridge, or to cover a dental implant',
      ],
    },
    'A small or moderate cavity usually needs only a filling. Your dentist will check whether enough healthy tooth is left for one.',
    { type: 'heading', id: 'when-is-a-bridge-right', text: 'When is a bridge the right choice?' },
    'When a tooth is missing, the teeth beside it can slowly tilt or drift into the gap, the opposite tooth can grow towards it, and chewing on that side becomes harder. A fixed bridge may suit you if:',
    {
      type: 'list',
      items: [
        'One tooth, or a few teeth next to each other, are missing',
        'The teeth on either side of the gap are strong, with healthy roots and gums, so they can carry the extra load',
        'You want a fixed replacement rather than a removable one, without surgery',
      ],
    },
    { type: 'heading', id: 'crown-materials', text: 'Which crown material is right for you?' },
    'Neudental offers **ceramic crowns**, including **metal-free options**. Ceramic is tooth-coloured and is matched to the shade of your neighbouring teeth. A metal-free crown has no metal layer underneath, so there is no dark line at the gum edge, which is why it is often chosen for front teeth.',
    'Which material suits you depends on where the tooth is (front teeth need to look natural, back teeth take the heaviest chewing force), how much tooth is left, how your teeth meet when you bite, habits such as grinding, and your preferences on appearance and cost. Dr. Swetha will explain the options for your tooth before anything is started.',
    { type: 'heading', id: 'crown-and-bridge-procedure', text: 'How crowns and bridges are made and fitted at Neudental' },
    'Because each crown or bridge is custom-made for your mouth, treatment usually takes {{duration}}.',
    {
      type: 'steps',
      items: [
        { title: 'Examination and X-ray', text: 'Dr. Swetha examines the tooth, or the gap and the teeth beside it, and takes an X-ray to check the roots, bone and any decay. A filling, root canal or gum treatment, if needed, is done first.' },
        { title: 'Preparing the tooth', text: 'Under local anaesthesia, a thin layer is removed from the outside of the tooth so the crown can fit over it. For a bridge, the teeth on both sides of the gap are prepared. This shaping cannot be undone, so the tooth will always need a crown.' },
        { title: 'Impression and shade', text: 'An impression (a precise mould) of your teeth and bite is taken, and the colour is matched to your neighbouring teeth.' },
        { title: 'Temporary crown or bridge', text: 'A temporary is fitted to protect the prepared teeth while your final crown or bridge is made.' },
        { title: 'Trial and fitting', text: 'At the next visit, the final crown or bridge is tried in, its fit, bite and colour are checked and adjusted, and it is cemented firmly in place.' },
        { title: 'Review, if needed', text: 'Some patients return briefly to fine-tune the bite. Your dentist will tell you if this is needed.' },
      ],
    },
    { type: 'heading', id: 'crown-and-bridge-cost', text: 'Crown and bridge cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Crown and bridge cost at Neudental',
      rows: [
        ['Crowns and bridges', '{{price}}'],
        ['What changes the cost', 'The crown material you choose, which tooth it is, and whether you need a single crown or a bridge, which includes crowns on the supporting teeth as well as the replacement tooth'],
        ['Treatment needed first', 'A filling, root canal or gum treatment, if needed, is a separate step with its own cost'],
        ['When you will know your cost', 'After the examination and X-ray, before any treatment starts'],
      ],
    },
    { type: 'heading', id: 'caring-for-crowns-and-bridges', text: 'Caring for your crown or bridge' },
    'Mild sensitivity to hot and cold, or a slightly tender gum, is common for a few days after fitting.',
    {
      type: 'list',
      items: [
        'With a temporary crown, avoid sticky and hard food on that side. If it comes loose, keep it and call the clinic.',
        'Brush twice a day and clean between your teeth daily. A crown cannot decay, but the tooth underneath can, usually starting at the edge near the gum.',
        'Clean under a bridge with a floss threader or a small interdental brush. Your dentist will show you how.',
        'Avoid biting very hard things such as ice, bones or bottle caps, which can chip ceramic.',
        'Keep up a [regular dental check-up](/treatments/dental-checkup) every six months, so the crown edges and supporting teeth can be checked.',
      ],
    },
    { type: 'note', text: 'Call the clinic if your bite feels high once the numbness wears off, if a crown or bridge feels loose, or if pain or swelling gets worse instead of better.' },
    { type: 'heading', id: 'bridge-implant-or-denture', text: 'Bridge, implant or denture: which should you choose?' },
    {
      type: 'table',
      caption: 'Ways to replace a missing tooth',
      rows: [
        ['Fixed bridge', 'Does not come out. The neighbouring teeth are shaped to hold crowns. No surgery, usually completed in {{duration}}.'],
        ['Dental implant', 'A titanium post in the jawbone, topped with a crown. Leaves neighbouring teeth untouched and helps preserve the bone, but needs enough healthy bone, a surgical procedure and a few months of healing.'],
        ['Removable denture', 'Taken out for cleaning. Can replace several teeth at once without shaping healthy teeth, but takes some getting used to.'],
      ],
    },
    'If the teeth beside the gap are healthy and untouched, ask whether an implant suits you, so they need not be shaped. A bridge can be the simpler choice when those teeth already need crowns, or when there is too little bone for an implant. Smoking and poorly controlled diabetes can slow healing after implant surgery, so mention them to your dentist.',
    'Read more about [dental implants](/treatments/dental-implants) and [dentures](/treatments/dentures), or ask [Dr. Swetha](/dr-swetha) to compare the options for your mouth.',
  ],
  faqs: [
    { question: 'How much does a dental crown cost at Neudental?', answer: 'Crowns and bridges at Neudental in Kodungaiyur cost {{price}}. The exact amount depends on the material, which tooth it is and, for a bridge, how many teeth are involved. It is confirmed after an examination and X-ray, before treatment starts.' },
    { question: 'How many visits does a crown or bridge need?', answer: 'Usually {{duration}}. The tooth is prepared and an impression is taken at the first visit, and a temporary crown protects it while the final one is made. The crown or bridge is fitted at the next visit, and a short review is sometimes needed for the bite.' },
    { question: 'Does getting a crown hurt?', answer: 'The tooth is numbed with local anaesthesia before it is shaped, so most people feel pressure and vibration rather than pain. Mild sensitivity or gum tenderness for a few days after fitting is common and usually settles on its own.' },
    { question: 'Will my crown look like a natural tooth?', answer: 'Ceramic and metal-free crowns are tooth-coloured, and the shade is matched to your neighbouring teeth, so they usually blend in well. Your dentist checks the colour and shape at the trial, before the crown is fixed in place.' },
    { question: 'How long does a dental crown last?', answer: 'With good brushing, cleaning between the teeth and regular check-ups, a crown or bridge often lasts many years. How long yours lasts depends on the material, your bite, habits like grinding, and the health of the tooth and gums underneath.' },
    { question: 'Is a bridge better than an implant?', answer: 'Neither is right for everyone. A bridge is fixed without surgery but needs the neighbouring teeth to be shaped. An implant leaves those teeth untouched but needs enough healthy bone, a surgical procedure and a few months. Your dentist will advise which suits you after an examination.' },
    { question: 'What should I do if my crown comes off or chips?', answer: 'Keep the crown if it has come off, avoid chewing on that side and call the clinic. Do not try to fix it yourself with household glue. A loose crown can often be re-cemented if the tooth underneath is healthy.' },
  ],
  relatedPosts: ['root-canal-treatment-does-it-hurt'],
  relatedTreatments: ['rct', 'implants', 'dentures', 'filling'],
  datePublished: '2026-10-26',
};

export default guide;
