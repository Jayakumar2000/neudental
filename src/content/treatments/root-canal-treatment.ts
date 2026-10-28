// Patient guide for /treatments/root-canal-treatment. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'rct',
  seoTitle: 'RCT in Kodungaiyur: Root Canal Cost & Steps | Neudental',
  metaDescription: 'Root canal treatment (RCT) at Neudental, Kodungaiyur: signs you need one, the steps, whether one sitting is enough, recovery and cost ({{price}}).',
  headline: 'Root Canal Treatment (RCT) in Kodungaiyur, Chennai',
  answer: 'Root canal treatment (RCT) treats a tooth whose inner pulp is infected or inflamed, often from deep decay, a crack or an injury, so the tooth can be kept. Under local anaesthesia, the pulp is removed and the canals are cleaned, disinfected and sealed, usually in {{duration}} per sitting. At Neudental in Kodungaiyur it typically costs {{price}}; a crown, if needed, is charged separately.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'when-is-a-root-canal-needed', text: 'When is a root canal needed?' },
    'Inside every tooth is the pulp: soft tissue with nerves and blood vessels. Deep decay, a crack or an injury can damage it or let bacteria in, and the pulp becomes inflamed or infected. Mild inflammation can sometimes settle once a cavity is cleaned and filled, but a badly inflamed or infected pulp cannot heal on its own, and the infection can spread to the bone around the root tip. A root canal removes that tissue so the tooth itself can be kept.',
    'Signs that a tooth may need a root canal include:',
    {
      type: 'list',
      items: [
        'Toothache that lingers, throbs or wakes you at night',
        'Sensitivity to hot or cold that stays after the drink or food is gone',
        'Pain when biting or chewing on one tooth',
        'Swelling of the gum or face, or a pimple-like bump (gum boil) near a tooth',
        'A tooth that has darkened after an injury',
        'A deep cavity, or infection around the root tip, seen on an X-ray',
      ],
    },
    { type: 'note', text: 'These signs can have other causes, and an infected tooth does not always hurt: pain can fade once the nerve dies even though the infection remains. Your dentist needs to examine the tooth and take an X-ray to know for sure. See [does a root canal hurt, and when do you need one](/blogs/root-canal-treatment-does-it-hurt) for more detail.' },
    { type: 'heading', id: 'root-canal-procedure', text: 'What happens during a root canal at Neudental?' },
    {
      type: 'steps',
      items: [
        { title: 'Examination and X-ray', text: 'Dr. Swetha examines the tooth and takes a digital X-ray to see the decay, the shape of the canals and any infection around the root, then explains whether a root canal is the right option.' },
        { title: 'Local anaesthesia', text: 'The tooth and surrounding gum are numbed, so you should feel pressure but not pain. If you do feel pain, tell your dentist, so more anaesthetic can be given.' },
        { title: 'Opening and cleaning the canals', text: 'A small opening is made in the tooth to reach the pulp, and the infected or inflamed tissue is removed from the canals with fine rotary instruments.' },
        { title: 'Disinfecting and shaping', text: 'The canals are shaped and rinsed with disinfecting solutions so they can be filled and sealed well. If there is an active infection, a medicated dressing may be left inside, under a temporary filling, until the next visit.' },
        { title: 'Filling and sealing', text: 'The clean canals are filled with a rubber-like material (gutta-percha) and a sealer, to help stop bacteria getting back in.' },
        { title: 'Restoring the tooth', text: 'The tooth is closed with a filling. Back teeth and teeth that have lost a lot of structure usually need a crown afterwards to help protect them from cracking.' },
      ],
    },
    { type: 'heading', id: 'how-many-visits', text: 'How many visits does a root canal take?' },
    'Many root canals can be finished in a single sitting of about {{duration}}. A tooth with an active infection, swelling or complex canals may need two or more visits, with a medicated dressing in between to let the infection settle. If a crown is needed, it is made and fitted at later visits, once the canals are sealed. Your dentist will explain the likely number of visits before treatment starts.',
    { type: 'heading', id: 'root-canal-cost', text: 'Root canal treatment cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Root canal treatment cost at Neudental',
      rows: [
        ['Root canal treatment', '{{price}}'],
        ['What changes the cost', 'Which tooth it is (molars usually have more canals than front teeth) and how curved, narrow or complex its canals are'],
        ['Crown, if needed', 'A separate treatment. See [crowns and bridges](/treatments/dental-crowns-and-bridges) for its cost'],
        ['When you will know your cost', 'After the examination and X-ray, before any treatment starts'],
      ],
    },
    { type: 'heading', id: 'does-it-hurt', text: 'Does a root canal hurt?' },
    'The procedure is done under local anaesthesia, so most patients feel pressure and vibration rather than pain. The toothache that brings many people in comes from the inflamed or infected pulp, and removing it usually relieves that pain. It is normal for the tooth to feel tender for a few days afterwards, especially if it was badly infected.',
    { type: 'heading', id: 'recovery', text: 'What is recovery like after a root canal?' },
    {
      type: 'list',
      items: [
        'Wait until the numbness wears off (usually a few hours) before eating, so you do not bite your cheek or tongue.',
        'Mild soreness for a few days is normal. Take only the pain relief your dentist advises.',
        'Avoid chewing hard or sticky food on the treated tooth until its final filling or crown is in place.',
        'Get the final filling or crown done when advised. A tooth left with only a temporary filling for too long can crack or become infected again.',
        'Keep brushing twice a day and cleaning between your teeth as usual.',
        'Call the clinic if you have swelling, pain that gets worse instead of better, a temporary filling that falls out, or a reaction to medicine. Swelling that spreads towards the eye or neck, or difficulty swallowing or breathing, needs urgent medical care.',
      ],
    },
    'For day-to-day habits that help the tooth last, read [5 habits to protect your smile after a root canal](/blogs/oral-hygiene-after-root-canal).',
    { type: 'heading', id: 'root-canal-or-extraction', text: 'Root canal or extraction?' },
    'Removing the tooth can seem quicker, but a gap left unfilled can let neighbouring teeth drift or tilt and make chewing harder. Replacing it later with a [dental implant](/treatments/dental-implants), bridge or denture means more treatment and time. When a tooth can be saved and restored, keeping it with a root canal is usually the better choice.',
    'A root canal is not always possible, though. A crack that runs down into the root, too little healthy tooth left to rebuild, or a tooth loosened by advanced gum disease may mean the tooth cannot be saved. If so, Dr. Swetha will tell you and discuss [extraction](/treatments/tooth-extraction) and replacement options.',
  ],
  faqs: [
    { question: 'How much does root canal treatment cost at Neudental?', answer: 'Root canal treatment at Neudental in Kodungaiyur typically costs {{price}}. The exact amount depends on the tooth and how complex its canals are, and is confirmed after the examination and X-ray. A crown, if needed, is charged separately.' },
    { question: 'How long does a root canal take?', answer: 'Each sitting usually takes {{duration}}. Many root canals are finished in one sitting; a tooth with an active infection or complex canals may need two or more. If a crown is needed, it is made and fitted at later visits.' },
    { question: 'Can I go back to work after a root canal?', answer: 'Most people return to work or college the same day. Your mouth may stay numb for a few hours, and the tooth may feel sore for a few days, especially if it was badly infected. Call the clinic if pain or swelling gets worse instead of better.' },
    { question: 'Do I need a crown after a root canal?', answer: 'Often, yes, for back teeth and for teeth that have lost a lot of structure to decay or large fillings, because they can crack under chewing pressure. Some front teeth with enough healthy structure only need a filling. Your dentist will advise based on how much healthy tooth remains.' },
    { question: 'How long does a root-canal-treated tooth last?', answer: 'With a well-sealed root filling, a proper filling or crown, and regular brushing and check-ups, a root-canal-treated tooth can last for many years. Occasionally it becomes infected again, for example through new decay or a leaking filling, and then needs further treatment or removal.' },
    { question: 'What happens if I delay a root canal?', answer: 'The infection can spread into the bone, cause an abscess and swelling, and damage the tooth so much that it can no longer be saved. Treating it early is simpler and keeps more options open.' },
  ],
  relatedPosts: ['root-canal-treatment-does-it-hurt', 'oral-hygiene-after-root-canal'],
  relatedTreatments: ['crowns-bridges', 'tooth-extraction', 'filling', 'imaging'],
  datePublished: '2026-10-26',
};

export default guide;
