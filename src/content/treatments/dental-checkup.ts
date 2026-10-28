// Patient guide for /treatments/dental-checkup. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'checkup',
  seoTitle: 'Dental Checkup in Kodungaiyur: Cost & How Often | Neudental',
  metaDescription: 'Regular dental check-up at Neudental, Kodungaiyur: what the dentist checks, what happens at the visit, how often to come, and cost ({{price}}).',
  headline: 'Regular Dental Check-up in Kodungaiyur, Chennai',
  answer: 'A regular dental check-up is a routine examination of your teeth, gums and mouth to find cavities, gum disease and other problems early, often before they hurt. Neudental recommends one every six months, even if you have no pain. At the clinic in Kodungaiyur it takes {{duration}}, costs {{price}}, and includes a complimentary X-ray if your dentist needs one, plus oral hygiene advice.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-a-dental-check-up', text: 'What is a dental check-up?' },
    'A dental check-up is a routine examination of your teeth, gums and the rest of your mouth. Its main purpose is **early detection**: finding cavities, gum problems and other changes while they are small, simple to treat and often still painless.',
    'A check-up is worth booking if:',
    {
      type: 'list',
      items: [
        'It has been more than six months since your last dental visit',
        'You have a small concern, such as sensitivity, bleeding gums or bad breath',
      ],
    },
    "Children need regular check-ups too, starting when the first tooth comes in or by the first birthday. See [kids dentistry](/treatments/kids-dentistry) for what a child's visit involves.",
    { type: 'heading', id: 'what-is-checked', text: 'What does the dentist check?' },
    {
      type: 'list',
      items: [
        '**Teeth:** early cavities, cracks, worn or chipped teeth, and the condition of old fillings and crowns',
        '**Gums:** bleeding and swelling (early signs of gum disease), tartar, and deeper pockets between the gums and teeth, which can mean gum disease has progressed',
        '**The rest of your mouth:** your tongue, cheeks, lips and palate, for ulcers, white or red patches or lumps that need a closer look',
        '**Bite and jaw:** how your teeth meet, signs of clenching or grinding, and any clicking or pain in the jaw joints',
        '**Your home care:** where plaque is collecting, which shows the spots your brushing is missing',
      ],
    },
    'Some problems, such as decay between teeth or under an old filling, infection at the tip of a root or bone loss around the teeth, often cannot be seen by eye. Your check-up at Neudental includes a complimentary X-ray when your dentist needs one. To learn when digital X-rays or a full-mouth OPG scan are used, see [dental X-rays and OPG scans](/treatments/dental-x-ray).',
    { type: 'heading', id: 'check-up-procedure', text: 'What happens at a dental check-up?' },
    {
      type: 'steps',
      items: [
        { title: 'Your health and concerns', text: 'Dr. Swetha asks about any pain, sensitivity or bleeding you have noticed, your general health, the medicines you take, and whether you are pregnant. Conditions such as diabetes or heart problems can affect your mouth and how your care is planned.' },
        { title: 'Examination', text: 'Using a small mirror and a fine probe, your dentist checks each tooth, your gums, the rest of your mouth, your bite and your jaw joints. You may feel gentle pressure, but it is not usually painful.' },
        { title: 'X-ray, if needed', text: 'If your dentist needs to see what cannot be checked by eye, such as between two teeth or around the root of a sensitive tooth, an X-ray is taken. It usually takes only a few minutes.' },
        { title: 'Findings and plan', text: 'Your dentist explains what was found: what needs treatment now, what can be planned for later and what simply needs watching.' },
        { title: 'Oral hygiene advice', text: 'You get advice suited to your mouth, such as brushing technique, cleaning between teeth, diet and habits like tobacco, and when to come back.' },
      ],
    },
    'If tartar has built up, your dentist may recommend a [professional teeth cleaning](/treatments/teeth-cleaning) (scaling and polishing). It is a separate treatment with its own cost, and Neudental recommends it every six months along with your check-up. Ask whether it can be done at the same visit.',
    { type: 'heading', id: 'how-often', text: 'How often should you have a dental check-up?' },
    'Neudental recommends a check-up every six months for most people. This gap is usually short enough to catch a new cavity or early gum problem before it becomes serious. Your dentist may suggest coming more often if you:',
    {
      type: 'list',
      items: [
        'Have gum disease, or gums that bleed often',
        'Get new cavities frequently, or have many fillings or crowns',
        'Have diabetes, or smoke or chew tobacco, which raise the risk of gum disease',
        'Are pregnant, or are in the middle of ongoing dental treatment',
      ],
    },
    { type: 'heading', id: 'why-check-ups-matter', text: 'Why have a check-up if nothing hurts?' },
    'Many common dental problems do not hurt in their early stages. Early cavities, the first signs of gum disease and leaking fillings can go unnoticed for months, and by the time a tooth aches, the decay has often reached deep inside it. Found early, most problems need simpler, quicker and less costly treatment:',
    {
      type: 'list',
      items: [
        '**A small cavity** can usually be repaired with a [tooth-coloured filling](/treatments/tooth-filling) in a single sitting. Left alone, it can reach the nerve and need a root canal, or the tooth may have to be removed.',
        '**Bleeding gums** from early gum disease (gingivitis) can usually be reversed with a professional cleaning and better brushing. If it progresses, the bone around the teeth is slowly lost and teeth can become loose.',
        '**A worn or cracked filling** can be replaced before decay gets underneath it.',
      ],
    },
    'For more on this, read [why regular dental check-ups matter](/blogs/why-regular-checkups-matter).',
    { type: 'heading', id: 'check-up-cost', text: 'Dental check-up cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Dental check-up cost at Neudental',
      rows: [
        ['Regular check-up', '{{price}}'],
        ['What the visit covers', 'Examination of your teeth, gums and mouth, a complimentary X-ray if your dentist needs one, and oral hygiene advice'],
        ['Time needed', '{{duration}}, usually in a single visit'],
        ['Your exact fee', 'Depends on what your visit needs to cover. Ask the clinic when you book'],
        ['Treatment, if any is needed', 'Cleaning, fillings and other treatment are priced separately, and the cost is explained before anything is started'],
      ],
    },
    { type: 'heading', id: 'preparing', text: 'How to prepare for your check-up' },
    {
      type: 'list',
      items: [
        'Bring a list of the medicines you take, and any recent dental X-rays or reports.',
        'Tell your dentist if you are pregnant, have diabetes, a heart condition or a bleeding problem, or take blood-thinning medicines.',
        'Note down any symptoms you have noticed and when they started. Otherwise, just brush as usual; no other preparation is needed.',
      ],
    },
    { type: 'heading', id: 'when-not-to-wait', text: 'When not to wait for your next check-up' },
    'A check-up is for routine care. Call the clinic sooner if you notice:',
    {
      type: 'list',
      items: [
        'Toothache, or pain when you bite',
        'Swelling of the gum or face',
        'Sensitivity to hot or cold that lingers after the food or drink is gone',
        'Gums that bleed every time you brush',
        'A broken tooth, or a filling or crown that has come out',
        'A mouth ulcer, white or red patch, or lump that has not gone away within two to three weeks',
        'An adult tooth that feels loose',
      ],
    },
    { type: 'note', text: 'Facial swelling with fever needs to be seen by a dentist or doctor the same day. If swelling makes it hard to swallow, breathe or open your mouth, go to a hospital emergency department straight away.' },
  ],
  faqs: [
    { question: 'How much does a dental check-up cost at Neudental?', answer: 'A regular check-up at Neudental in Kodungaiyur costs {{price}}. It includes the examination, a complimentary X-ray if your dentist needs one, and oral hygiene advice. Any treatment found to be needed, such as a cleaning or filling, is priced separately and explained before it is started.' },
    { question: 'How long does a dental check-up take?', answer: 'A check-up usually takes {{duration}}. That includes time to hear your concerns, examine your teeth and gums, take an X-ray if needed and explain what was found. It is normally a single visit. If you need treatment, your dentist will tell you how many visits it will take.' },
    { question: 'My teeth feel fine. Do I still need a check-up?', answer: 'Yes. Early cavities, gum disease and worn fillings often cause no pain until they are advanced. A check-up every six months lets your dentist find them while treatment is still small and simple, and gives you advice to help prevent new problems.' },
    { question: 'Is teeth cleaning part of the check-up?', answer: 'The check-up is an examination with advice. Professional cleaning (scaling and polishing) is a separate treatment with its own cost. Neudental recommends both every six months, and your dentist will tell you at the check-up whether you need a cleaning now.' },
    { question: 'Will I need an X-ray at my check-up?', answer: 'Only if your dentist needs to see something that cannot be checked by eye, such as decay between teeth, under a filling or around a root. A complimentary X-ray is included with your check-up when it is needed. Tell your dentist if you are or might be pregnant.' },
    { question: 'Is a dental check-up uncomfortable?', answer: 'A check-up is usually quick and comfortable. Your dentist looks at each tooth and your gums with a small mirror and a fine probe, and you may feel gentle pressure. If you have sensitive teeth or feel anxious, say so, and your dentist can take it slowly.' },
    { question: 'Can I have a dental check-up during pregnancy?', answer: 'Yes. A routine check-up is generally safe during pregnancy, and hormonal changes can make gums swell and bleed more easily, so it is a useful time to have one. Tell your dentist you are pregnant, so any X-rays and treatment can be planned with that in mind.' },
  ],
  relatedPosts: ['why-regular-checkups-matter'],
  relatedTreatments: ['cleaning', 'imaging', 'filling', 'gum-disease'],
  datePublished: '2026-10-26',
};

export default guide;
