// Patient guide for /treatments/root-canal-treatment. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'rct',
  seoTitle: 'RCT in Kodungaiyur: Root Canal Cost & Steps | Neudental',
  metaDescription: 'Root canal treatment (RCT) at Neudental, Kodungaiyur: signs you need one, each step, visits, recovery and cost ({{price}}).',
  headline: 'Root Canal Treatment (RCT) in Kodungaiyur, Chennai',
  answer: 'Root canal treatment (RCT) saves a tooth whose inner pulp is infected or inflamed. Under local anaesthesia, the infected tissue is removed and the canals are cleaned, disinfected and sealed, usually in {{duration}} per sitting. At Neudental in Kodungaiyur it costs {{price}}, depending on the tooth; a crown, if one is needed, is a separate step.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'when-is-a-root-canal-needed', text: 'When is a root canal needed?' },
    'Inside every tooth is the pulp: soft tissue with nerves and blood vessels. When deep decay, a crack or an injury lets bacteria reach it, the pulp becomes inflamed or infected. It cannot heal on its own, and the infection can spread to the bone around the root. A root canal removes that tissue so the tooth itself can be kept.',
    'You may need a root canal if you notice:',
    {
      type: 'list',
      items: [
        'Toothache that lingers, throbs or wakes you at night',
        'Sensitivity to hot or cold that stays after the drink or food is gone',
        'Pain when biting or chewing on one tooth',
        'Swelling of the gum, or a pimple-like bump (gum boil) near a tooth',
        'A tooth that has darkened after an injury',
        'A deep cavity or a cracked tooth seen on an X-ray',
      ],
    },
    { type: 'note', text: 'An infected tooth does not always hurt, and pain can fade once the nerve dies even though the infection remains. An examination and X-ray are the only reliable way to know. See [does a root canal hurt, and when do you need one](/blogs/root-canal-treatment-does-it-hurt) for more detail.' },
    { type: 'heading', id: 'root-canal-procedure', text: 'How root canal treatment is done at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Examination and X-ray', text: 'Dr. Swetha examines the tooth and takes a digital X-ray to see the decay, the shape of the canals and any infection around the root, then explains whether a root canal is the right option.' },
        { title: 'Local anaesthesia', text: 'The tooth and surrounding gum are numbed, so you feel pressure but not pain during the procedure.' },
        { title: 'Opening and cleaning the canals', text: 'A small opening is made in the top of the tooth, and the infected or inflamed pulp is removed from the canals with fine rotary instruments.' },
        { title: 'Disinfecting and shaping', text: 'The canals are rinsed with disinfecting solutions and shaped so they can be sealed completely. If there is an active infection, a medicated dressing may be left inside until the next visit.' },
        { title: 'Filling and sealing', text: 'The clean canals are filled with a rubber-like material (gutta-percha) and sealed, so bacteria cannot get back in.' },
        { title: 'Restoring the tooth', text: 'The tooth is closed with a filling. Back teeth and teeth that have lost a lot of structure usually need a [crown](/treatments/dental-crowns-and-bridges) afterwards to protect them from cracking.' },
      ],
    },
    { type: 'heading', id: 'how-many-visits', text: 'How many visits does a root canal take?' },
    'Many root canals can be finished in a single sitting of about {{duration}}. A tooth with an active infection, swelling or complex canals may need two or more visits, with a medicated dressing in between to let the infection settle. If a crown is needed, it is fitted at a later visit, once the tooth has been sealed. You will know the plan before treatment starts.',
    { type: 'heading', id: 'root-canal-cost', text: 'Root canal treatment cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Root canal treatment cost at Neudental',
      rows: [
        ['Root canal treatment', '{{price}}'],
        ['What changes the cost', 'Which tooth it is (molars have more canals than front teeth), how curved or narrow the canals are, and whether the tooth has been treated before'],
        ['Crown, if needed', 'A separate treatment. See [crowns and bridges](/treatments/dental-crowns-and-bridges) for its cost'],
        ['When you will know your cost', 'After the examination and X-ray, before any treatment starts'],
      ],
    },
    { type: 'heading', id: 'does-it-hurt', text: 'Does a root canal hurt?' },
    'The procedure is done under local anaesthesia, so most patients feel pressure and vibration rather than pain. The toothache that brings people in is caused by the infection, and removing the infected pulp is what relieves it. It is normal for the tooth to feel tender for a few days afterwards, especially if it was badly infected.',
    { type: 'heading', id: 'recovery', text: 'Recovery and aftercare' },
    {
      type: 'list',
      items: [
        'Wait until the numbness wears off (usually a few hours) before eating, so you do not bite your cheek or tongue.',
        'Mild soreness for a few days is normal. Take only the pain relief your dentist advises.',
        'Avoid chewing hard or sticky food on the treated tooth until its final filling or crown is in place.',
        'Keep brushing twice a day and cleaning between your teeth as usual.',
        'Call the clinic if you have swelling, pain that gets worse instead of better, or a reaction to medicine.',
      ],
    },
    'For day-to-day habits that help the tooth last, read [5 habits to protect your smile after a root canal](/blogs/oral-hygiene-after-root-canal).',
    { type: 'heading', id: 'root-canal-or-extraction', text: 'Root canal or extraction?' },
    'Removing the tooth can seem quicker, but a gap left unfilled lets neighbouring teeth drift and makes chewing harder. Replacing it later with a [dental implant](/treatments/dental-implants), bridge or [denture](/treatments/dentures) usually costs more and takes longer than saving the tooth. When a tooth can be saved and restored, a root canal is usually the better choice. If a tooth is too damaged to save, Dr. Swetha will tell you and discuss [extraction](/treatments/tooth-extraction) and replacement options.',
  ],
  faqs: [
    { question: 'How much does root canal treatment cost at Neudental?', answer: 'Root canal treatment at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on the tooth and how complex its canals are, and is confirmed after the examination and X-ray. A crown, if needed, is charged separately.' },
    { question: 'How long does a root canal take?', answer: 'Each sitting usually takes {{duration}}. Many root canals are finished in one sitting; a tooth with an active infection may need two or more visits.' },
    { question: 'Is root canal treatment painful?', answer: 'It is done under local anaesthesia, so you should feel pressure but not pain. Mild tenderness for a few days afterwards is normal and usually settles with the pain relief your dentist recommends.' },
    { question: 'Do I need a crown after a root canal?', answer: 'Often, yes, for back teeth and for teeth that have lost a lot of structure, because a root-canal-treated tooth can become brittle. Some front teeth with enough healthy structure only need a filling. Your dentist will advise after treatment.' },
    { question: 'How long does a root-canal-treated tooth last?', answer: 'With a good seal, a proper filling or crown, and regular brushing and check-ups, a root-canal-treated tooth can last for many years, often for life.' },
    { question: 'What happens if I delay a root canal?', answer: 'The infection can spread into the bone, cause an abscess and swelling, and damage the tooth so much that it can no longer be saved. Treating it early is simpler and keeps more options open.' },
  ],
  relatedPosts: ['root-canal-treatment-does-it-hurt', 'oral-hygiene-after-root-canal'],
  relatedTreatments: ['crowns-bridges', 'tooth-extraction', 'imaging'],
  datePublished: '2026-10-26',
};

export default guide;
