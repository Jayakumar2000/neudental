// Patient guide for /treatments/dentures. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'dentures',
  seoTitle: 'Dentures in Kodungaiyur: Cost, Types & Care | Neudental',
  metaDescription: 'Partial and complete dentures at Neudental, Kodungaiyur: who they suit, how they are made over {{duration}}, aftercare and cost ({{price}}).',
  headline: 'Partial and Complete Dentures in Kodungaiyur, Chennai',
  answer: 'Dentures are custom-made, removable false teeth for people who have lost some or all of their teeth. A partial denture fills gaps between remaining natural teeth; a complete denture replaces every tooth in the upper or lower jaw. At Neudental in Kodungaiyur, a denture usually takes {{duration}} to make and fit, and typically costs {{price}}, depending on the type and how many teeth it replaces.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'who-needs-dentures', text: 'Who are dentures for?' },
    'Dentures replace missing teeth, and some of the gum around them, so you can chew, speak and smile more comfortably. A denture may suit you if:',
    {
      type: 'list',
      items: [
        'You have lost one or more teeth, or all the teeth in one or both jaws, to decay, gum disease or injury',
        'The gaps make chewing or speaking difficult',
        'Your remaining teeth are not strong enough to support a fixed bridge',
        'You prefer to avoid surgery, or your general health or jawbone does not suit implants',
      ],
    },
    'Missing teeth are worth replacing even when they do not hurt. Over time, neighbouring teeth can drift into the gaps, the bite can change, and the cheeks and lips can lose some of their support.',
    { type: 'heading', id: 'partial-or-complete-denture', text: 'Partial or complete denture: what is the difference?' },
    '**Partial dentures** replace one or more missing teeth when some natural teeth remain. They rest on the gums, and in some designs partly on the remaining teeth, and are usually held in place by small clasps around neighbouring teeth. They can be made from different materials; your dentist will advise which suits you.',
    '**Complete (full) dentures** replace all the teeth in the upper or lower jaw, or both, and rest on the gums. An upper denture is usually held by suction against the palate. A lower one sits on a narrower ridge and is moved by the tongue and cheeks, so it often feels less stable and takes longer to get used to.',
    { type: 'heading', id: 'denture-procedure', text: 'How are dentures made at Neudental?' },
    'A denture is made in stages, usually over {{duration}}, so that the fit, bite and look can be checked before it is finished. Some of the steps below may be done at the same visit.',
    {
      type: 'steps',
      items: [
        { title: 'Examination and planning', text: '[Dr. Swetha](/dr-swetha) examines your gums, jaw and remaining teeth, and may take an X-ray, then advises whether a partial or complete denture suits you. Teeth that need fillings, gum treatment or [tooth extraction](/treatments/tooth-extraction) are usually treated first.' },
        { title: 'Impressions', text: 'Moulds of your upper and lower jaws are taken so the denture can be shaped to the contours of your mouth. A second, more detailed impression is sometimes taken.' },
        { title: 'Recording your bite and choosing the teeth', text: 'The way your jaws meet is recorded, and the shade, size and shape of the teeth are chosen to suit your face and remaining teeth.' },
        { title: 'Try-in', text: 'You try a trial denture, usually with the teeth set in wax, so you and your dentist can check the look, the bite and your speech, and make changes before it is finished.' },
        { title: 'Fitting and review', text: 'The finished denture is fitted and adjusted, and you are shown how to put it in, take it out and clean it. Short follow-up visits are usually needed to ease any spots that rub.' },
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
        ['Treatment needed first', 'Fillings, gum treatment or extractions needed before the denture is made are separate treatments with their own cost'],
        ['When you will know your cost', 'After the examination, before treatment starts'],
      ],
    },
    { type: 'heading', id: 'getting-used-to-dentures', text: 'What is it like getting used to new dentures?' },
    'For the first few weeks, new dentures may feel bulky, and you may notice more saliva than usual, slight changes in how you say some words and small sore spots where the denture presses on the gum. These usually settle as your mouth adapts. To help:',
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
    { type: 'heading', id: 'denture-care', text: 'How do you clean and care for dentures?' },
    {
      type: 'list',
      items: [
        'Rinse the denture after meals, and brush it at least once a day with a soft brush and a denture cleaner or mild soap. Avoid gritty cleaners, which can scratch it, and bleach, which can weaken or discolour it.',
        'Clean it over a basin of water or a folded towel, so it does not break if you drop it.',
        'Unless your dentist advises otherwise, take it out at night and keep it in water or a soaking solution so it does not dry out and lose its shape. Never use hot or boiling water, which can warp it.',
        'Brush your gums, tongue and any natural teeth twice a day, taking extra care with the teeth that the clasps of a partial denture hold on to.',
      ],
    },
    'Keep up [regular dental check-ups](/treatments/dental-checkup) even with no natural teeth left. The jaw slowly changes shape after teeth are lost, so a denture can become loose over the years and may need relining or remaking.',
    { type: 'heading', id: 'dentures-or-implants', text: 'Dentures or implants: which suits you?' },
    'The right choice depends on how many teeth are missing, the health of your gums, remaining teeth and jawbone, your general health and your budget.',
    {
      type: 'table',
      caption: 'Dentures and dental implants compared',
      rows: [
        ['Fixed or removable', 'Dentures: removable, taken out for cleaning and usually at night. Implants: fixed in the jawbone'],
        ['Surgery', 'Dentures: none. Implants: a minor surgical procedure to place them'],
        ['Treatment time', 'Dentures: usually {{duration}}. Implants: a few months, mostly healing time'],
        ['Stability', 'Dentures: can move a little when eating, especially a lower denture. Implants: do not move, and feel and work much like natural teeth'],
        ['The jawbone', 'Dentures: the bone slowly shrinks, so the fit changes and relining or remaking is needed over time. Implants: help preserve the bone'],
        ['Cost', 'Dentures usually cost less. See [dental implants](/treatments/dental-implants) for implant costs'],
      ],
    },
    'When only one or a few teeth are missing and the teeth beside the gap are strong, a [fixed bridge](/treatments/dental-crowns-and-bridges) is another option. Some people combine options, such as a denture that clips on to a few implants for extra stability. Ask your dentist whether this would suit you.',
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
    { question: 'How much do dentures cost at Neudental?', answer: 'Dentures at Neudental in Kodungaiyur typically cost {{price}}. The exact amount depends on whether you need a partial or complete denture, for one jaw or both, and how many teeth are replaced. It is confirmed after the examination, and any treatment needed first is charged separately.' },
    { question: 'How long does it take to get dentures?', answer: 'Making and fitting a denture usually takes {{duration}}, covering the examination, impressions, a try-in and the final fitting. It can take longer if other teeth need treatment or removal first, and you will know the plan before work begins.' },
    { question: 'Will my dentures look natural?', answer: 'They are designed to look natural. The shade, size and shape of the teeth are chosen to suit your face and any remaining teeth, and you see the result at the try-in, when changes can still be made before the denture is finished.' },
    { question: 'Should I sleep with my dentures in?', answer: 'Usually not. Taking dentures out at night rests your gums and lowers the risk of soreness and infection under the denture. Keep them in water or a soaking solution so they do not dry out. Your dentist will tell you if your case is different.' },
    { question: 'How long do dentures last?', answer: 'With good care, dentures usually last several years. The gums and jawbone slowly change shape after teeth are lost, so a denture that once fitted well can become loose. Regular check-ups let your dentist check the fit and advise whether it needs adjusting, relining or replacing.' },
    { question: 'Can I get implants later if I start with dentures?', answer: 'Often, yes. Wearing a denture does not rule out implants, and a few implants can sometimes be added later to hold a denture more firmly. Because the jawbone can shrink over the years after teeth are lost, have your bone assessed sooner rather than later if you are thinking about implants.' },
  ],
  relatedTreatments: ['implants', 'crowns-bridges', 'tooth-extraction'],
  datePublished: '2026-10-26',
};

export default guide;
