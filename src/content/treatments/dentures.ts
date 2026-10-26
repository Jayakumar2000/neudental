// Patient guide for /treatments/dentures. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'dentures',
  seoTitle: 'Dentures in Kodungaiyur: Cost, Types & Care | Neudental',
  metaDescription: 'Partial and complete dentures at Neudental, Kodungaiyur: who they suit, how they are made over {{duration}}, aftercare and cost ({{price}}).',
  headline: 'Partial and Complete Dentures in Kodungaiyur, Chennai',
  answer: 'Dentures are custom-made, removable false teeth for people who have lost several or all of their teeth. A partial denture fills gaps between remaining natural teeth; a complete denture replaces every tooth in the upper or lower jaw. At Neudental in Kodungaiyur, a denture usually takes {{duration}} to make and fit, and costs {{price}}, depending on the type and how many teeth it replaces.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'who-needs-dentures', text: 'Who are dentures for?' },
    'Dentures are removable false teeth made to fit your mouth. They replace missing teeth, and some of the gum around them, so you can chew, speak and smile more comfortably. A denture may suit you if:',
    {
      type: 'list',
      items: [
        'You have lost several teeth, or all the teeth in one or both jaws, to decay, gum disease or injury',
        'The gaps make chewing or speaking difficult',
        'Your remaining teeth are not strong enough to support a fixed bridge',
        'You prefer to avoid surgery, or your general health or jawbone does not suit implants',
      ],
    },
    'Missing teeth are worth replacing even when they do not hurt. Over time, neighbouring teeth can drift into the gaps, the bite changes, and the cheeks and lips lose some of their support.',
    { type: 'heading', id: 'partial-or-complete-denture', text: 'Partial or complete denture: what is the difference?' },
    '**Partial dentures** replace one or more missing teeth when some natural teeth remain. They rest on the gums and are usually held in place by small clasps around neighbouring teeth, which also helps stop the remaining teeth from drifting. They can be made in more than one material, and your dentist will explain the choices.',
    '**Complete (full) dentures** replace all the teeth in the upper or lower jaw and rest on the gums. An upper denture is usually held by suction against the palate. A lower one sits on a narrower ridge and is moved by the tongue and cheeks, so it often feels less stable and takes longer to get used to.',
    { type: 'heading', id: 'denture-procedure', text: 'How dentures are made at Neudental' },
    'A denture is made in stages, usually over {{duration}}, so that the fit, bite and look can be checked before it is finished.',
    {
      type: 'steps',
      items: [
        { title: 'Examination and planning', text: '[Dr. Swetha](/dr-swetha) examines your gums, jaw and remaining teeth, and may take an X-ray, then advises whether a partial or complete denture suits you. Teeth that need fillings, gum treatment or [removal](/treatments/tooth-extraction) are usually treated first.' },
        { title: 'Impressions', text: 'Moulds of your upper and lower jaws are taken so the denture can be shaped to the contours of your mouth.' },
        { title: 'Recording your bite and choosing the teeth', text: 'The way your jaws meet is recorded, and the shade, size and shape of the teeth are chosen to suit your face and remaining teeth.' },
        { title: 'Try-in', text: 'You try a trial denture, usually with the teeth set in wax, so you and your dentist can check the look, the bite and your speech, and make changes before it is finished.' },
        { title: 'Fitting and review', text: 'The finished denture is fitted and adjusted, and you are shown how to put it in, take it out and clean it. A short follow-up eases any spots that rub.' },
      ],
    },
    { type: 'note', text: 'If teeth have to be removed first, the gums and bone change shape as they heal. Your dentist will advise when the final denture can be made and how to manage the gap in the meantime.' },
    { type: 'heading', id: 'denture-cost', text: 'Denture cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Denture cost at Neudental',
      rows: [
        ['Dentures', '{{price}}'],
        ['What changes the cost', 'Whether you need a partial or complete denture, for one jaw or both, how many teeth are replaced and the type of denture chosen'],
        ['Treatment needed first', 'Fillings, gum treatment or extractions on other teeth are separate treatments with their own cost'],
        ['When you will know your cost', 'After the examination, before any impressions are taken'],
      ],
    },
    { type: 'heading', id: 'getting-used-to-dentures', text: 'What is it like getting used to new dentures?' },
    'New dentures usually feel strange at first. For the first few weeks you may notice a bulky feeling, more saliva than usual, slight changes in how you say some words, and small sore spots where the denture presses on the gum. These usually settle as your mouth adapts. To help:',
    {
      type: 'list',
      items: [
        'Start with soft food cut into small pieces, and chew slowly on both sides at the same time so the denture stays balanced.',
        'Avoid very hard, sticky or chewy food until you feel confident.',
        'Practise speaking by reading aloud.',
        'If a spot rubs, do not file or bend the denture yourself. Book an adjustment instead.',
        'Ask your dentist whether a denture adhesive would help you.',
      ],
    },
    { type: 'heading', id: 'denture-care', text: 'How to clean and care for your dentures' },
    {
      type: 'list',
      items: [
        'Rinse the denture after meals, and brush it at least once a day with a soft brush and a denture cleaner or mild soap. Avoid harsh, gritty cleaners that can scratch it.',
        'Clean it over a basin of water or a folded towel, so it does not break if you drop it.',
        'Unless your dentist advises otherwise, take it out at night and keep it in water or a soaking solution so it does not dry out and lose its shape. Never use hot or boiling water, which can warp it.',
        'Brush your gums, tongue and any natural teeth twice a day, taking extra care with the teeth that the clasps of a partial denture hold on to.',
      ],
    },
    'Keep up [regular dental check-ups](/treatments/dental-checkup) even with no natural teeth left. The jaw slowly changes shape after teeth are lost, so a denture can become loose over the years and may need relining or remaking.',
    { type: 'heading', id: 'dentures-vs-implants', text: 'Dentures, bridge or implants: which suits you?' },
    'The right way to replace missing teeth depends on how many are missing, the health of your gums, teeth and jawbone, your general health and your budget.',
    {
      type: 'table',
      caption: 'Comparing ways to replace missing teeth',
      rows: [
        ['Dentures', 'Removable. Replace a few or all of the teeth in a jaw without surgery, and usually cost less than implants. They can move a little when eating, and need adjusting or remaking over time.'],
        ['Fixed bridge', 'Fixed. Replaces one or a few missing teeth by attaching to the teeth on either side, which are trimmed to hold crowns. See [crowns and bridges](/treatments/dental-crowns-and-bridges).'],
        ['Dental implants', 'Fixed. Titanium posts placed in the jawbone support teeth that feel and work much like natural ones and help preserve the bone, but they need surgery, enough healthy bone and several months to complete. See [dental implants](/treatments/dental-implants).'],
      ],
    },
    'Some people combine options, such as a denture that clips on to a small number of implants for extra stability. Ask your dentist whether this would suit you.',
    { type: 'heading', id: 'when-to-call', text: 'When should you call the clinic?' },
    'Call or book a visit if:',
    {
      type: 'list',
      items: [
        'A sore spot has not settled after a few days',
        'The denture feels loose, rocks or clicks when you talk or eat',
        'It cracks, or a tooth or clasp breaks off. Do not try to glue it at home.',
        'The gums under the denture look red and swollen, or feel sore or burning',
        'An ulcer, lump or patch in your mouth has not healed after two weeks',
      ],
    },
  ],
  faqs: [
    { question: 'How much do dentures cost at Neudental?', answer: 'Dentures at Neudental in Kodungaiyur cost {{price}}. The exact amount depends on whether you need a partial or complete denture, for one jaw or both, and how many teeth are replaced. It is confirmed after the examination, and any treatment needed first is charged separately.' },
    { question: 'How long does it take to get dentures?', answer: 'Making and fitting a denture usually takes {{duration}}, covering the examination, impressions, a try-in and the final fitting. It can take longer if other teeth need treatment or removal first, and you will know the plan before work begins.' },
    { question: 'Will my dentures look natural?', answer: 'They are made to look natural. The shade, size and shape of the teeth are chosen to suit your face and any remaining teeth, and you see the result at the try-in, when changes can still be made before the denture is finished.' },
    { question: 'Should I sleep with my dentures in?', answer: 'Usually not. Taking dentures out at night rests your gums and lowers the risk of soreness and infection under the denture. Keep them in water or a soaking solution so they do not dry out. Your dentist will tell you if your case is different.' },
    { question: 'How long do dentures last?', answer: 'With good care, dentures usually last several years. The gums and jawbone slowly change shape after teeth are lost, so a denture that once fitted well can become loose. Regular check-ups let your dentist check the fit and advise whether it needs adjusting, relining or replacing.' },
    { question: 'Can I get implants later if I start with dentures?', answer: 'Often, yes. Wearing a denture does not rule out implants later. However, the jawbone can shrink over the years after teeth are lost, so whether implants suit you depends on an assessment of your bone and general health.' },
  ],
  relatedTreatments: ['implants', 'crowns-bridges', 'tooth-extraction'],
  datePublished: '2026-10-26',
};

export default guide;
