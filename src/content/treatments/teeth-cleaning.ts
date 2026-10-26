// Patient guide for /treatments/teeth-cleaning. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'cleaning',
  seoTitle: 'Teeth Cleaning in Kodungaiyur: Cost & Scaling | Neudental',
  metaDescription: 'Teeth cleaning (scaling and polishing) at Neudental, Kodungaiyur: bleeding gums, tartar, sensitivity, how often to go and cost ({{price}}).',
  headline: 'Teeth Cleaning (Scaling and Polishing) in Kodungaiyur, Chennai',
  answer: 'Professional teeth cleaning, also called scaling and polishing, removes the plaque and hardened tartar that brushing cannot, and helps gums that bleed from early gum inflammation (gingivitis) settle. It is usually recommended every six months, or sooner if your gums bleed or tartar builds up. At Neudental in Kodungaiyur it takes about {{duration}} and costs {{price}}, including fluoride treatment.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-teeth-cleaning', text: 'What is professional teeth cleaning?' },
    'Plaque is a soft, sticky film of bacteria that forms on your teeth every day. Brushing and cleaning between the teeth remove most of it, but whatever is missed can harden within a few days into **tartar** (also called calculus). Tartar sticks firmly to the tooth, usually along the gumline and behind the lower front teeth, and no toothbrush can remove it.',
    "Tartar's rough surface collects even more plaque, and the bacteria irritate the gums. That is how **gingivitis**, the early and reversible stage of gum disease, begins. A professional cleaning removes the tartar (scaling) and smooths the tooth surfaces (polishing), so your gums can heal and your daily brushing works properly again.",
    { type: 'heading', id: 'signs-you-need-a-cleaning', text: 'Do you need a teeth cleaning?' },
    'Almost everyone builds up some tartar, even with careful brushing. Book a cleaning if you notice:',
    {
      type: 'list',
      items: [
        'Gums that bleed when you brush or floss',
        'Red, puffy or tender gums',
        'Hard yellow or brown deposits along the gumline',
        'Bad breath that keeps coming back',
        'Stains from tea, coffee, smoking, tobacco or paan',
        'Teeth that feel rough or furry even after brushing',
        'It has been more than six months since your last cleaning',
      ],
    },
    { type: 'note', text: 'Bleeding gums are usually a sign of inflammation caused by plaque, not something to ignore or to treat by brushing less. Gentle, regular brushing and a professional cleaning often help them settle within a couple of weeks.' },
    { type: 'heading', id: 'teeth-cleaning-procedure', text: 'What happens during a teeth cleaning?' },
    {
      type: 'steps',
      items: [
        { title: 'Checking your teeth and gums', text: 'Dr. Swetha looks at where tartar has built up, how your gums are and whether anything else, such as a cavity, needs attention. If something needs a closer look, she will tell you before going ahead.' },
        { title: 'Scaling', text: 'Plaque and tartar are gently removed from the tooth surfaces and just under the gumline with scaling instruments. You will feel vibration or scraping, and water is used to rinse the debris away.' },
        { title: 'Polishing', text: 'The teeth are polished to remove surface stains and leave a smooth finish, which makes it harder for new plaque to stick.' },
        { title: 'Fluoride treatment', text: 'Fluoride is applied to help strengthen the enamel and protect against cavities. Your dentist will tell you how long to wait before eating or drinking.' },
        { title: 'Oral hygiene advice', text: 'You are shown how to brush and clean between your teeth in the areas where tartar tends to collect, and told when to come back.' },
      ],
    },
    'Most cleanings are done in a single sitting of about {{duration}}. If there is a lot of tartar or the gums are very inflamed, your dentist may suggest a second visit or a deeper gum treatment.',
    { type: 'heading', id: 'sensitivity-after-cleaning', text: 'Does it hurt? Sensitivity and bleeding afterwards' },
    'Most people find a cleaning comfortable. Areas where the gums are swollen or the roots are exposed can feel sensitive while they are cleaned, so tell your dentist if you have sensitive teeth or feel anxious; they can work more slowly and pause whenever you need.',
    'Afterwards, it is common to have:',
    {
      type: 'list',
      items: [
        'Sensitivity to cold for a few days, because tooth surfaces that were covered by tartar are now exposed',
        'Slightly tender gums that bleed a little when you brush for a day or two',
        'Small gaps between the teeth that you can now feel, where tartar used to fill the space',
      ],
    },
    'These usually settle within a few days to a week as the gums heal and tighten. If sensitivity or bleeding gets worse, or lasts beyond two weeks, call the clinic.',
    { type: 'heading', id: 'how-often', text: 'How often should you get your teeth cleaned?' },
    'At Neudental, a check-up and professional cleaning every six months is recommended for most people. Cleaning is often done at the same visit as a [routine dental check-up](/treatments/dental-checkup), where your teeth are examined for cavities and other problems. Dr. Swetha may suggest more frequent cleanings if you:',
    {
      type: 'list',
      items: [
        'Build up tartar quickly, even with good brushing',
        'Smoke or chew tobacco',
        'Have diabetes',
        'Wear braces or other dental appliances',
        'Are pregnant, as hormonal changes can make gums bleed more easily',
      ],
    },
    'Read more on [why regular dental check-ups matter](/blogs/why-regular-checkups-matter), even when nothing hurts.',
    { type: 'heading', id: 'teeth-cleaning-cost', text: 'Teeth cleaning cost in Kodungaiyur' },
    'A cleaning every six months is usually simpler and less costly than treating the cavities and gum problems that develop when tartar is left in place.',
    {
      type: 'table',
      caption: 'Teeth cleaning cost at Neudental',
      rows: [
        ['Professional teeth cleaning', '{{price}}'],
        ['What changes the cost', 'How much tartar and staining has built up, how inflamed the gums are, and how long the cleaning takes'],
        ['If you need more than a cleaning', 'Fillings or deeper gum treatment, if you need them, are separate treatments with their own cost'],
        ['When you will know your cost', 'After your teeth and gums are checked, before the cleaning starts'],
      ],
    },
    { type: 'heading', id: 'cleaning-or-gum-treatment', text: 'Routine cleaning or treatment for gum disease?' },
    'A routine cleaning removes plaque and tartar from the teeth and just under the gumline. For gingivitis, it is usually enough, together with good brushing at home, to bring the gums back to health.',
    'If inflammation has been present for a long time, it can spread deeper and loosen the gum and bone that hold the teeth. Signs include gums that are receding, pockets between the gum and tooth, teeth that feel loose, or bad breath that does not go away after a cleaning. Tartar on the roots below the gumline then needs [gum disease treatment](/treatments/gum-disease-treatment), which includes a deep cleaning and regular monitoring. Your dentist will tell you which one you need after checking your gums.',
    { type: 'heading', id: 'aftercare', text: 'Keeping your teeth clean between visits' },
    {
      type: 'list',
      items: [
        'Brush twice a day for two minutes with a soft brush and fluoride toothpaste, angling the bristles towards the gumline.',
        'Clean between your teeth once a day with floss or small interdental brushes, as your dentist shows you.',
        'If your teeth stay sensitive, ask your dentist whether a toothpaste for sensitive teeth would help.',
        'Cut down on sugary snacks between meals, and on smoking or chewing tobacco, which add to tartar and stains.',
      ],
    },
  ],
  faqs: [
    { question: 'How much does teeth cleaning cost at Neudental?', answer: 'Teeth cleaning at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on how much tartar and staining there is and is confirmed after your teeth and gums are checked. Any other treatment you need, such as a filling or deeper gum care, is charged separately.' },
    { question: 'How long does a scaling appointment take?', answer: 'A cleaning usually takes {{duration}} and is finished in one visit. If there is heavy tartar or the gums are very inflamed, your dentist may plan a second sitting or a deeper gum treatment instead.' },
    { question: 'Does scaling damage enamel or make teeth loose?', answer: 'Scaling done properly removes deposits, not enamel. The gaps you may feel afterwards were filled with tartar, and they are not new. Teeth that already feel loose usually point to deeper gum disease, which needs its own assessment and treatment.' },
    { question: 'Will a cleaning make my teeth whiter?', answer: 'Polishing removes surface stains from tea, coffee and tobacco, so teeth often look brighter and cleaner. It does not change the natural colour of your teeth. For that, ask about [professional teeth whitening](/treatments/teeth-whitening).' },
    { question: 'Can I eat and drink straight after a teeth cleaning?', answer: 'Usually yes, but if fluoride has been applied your dentist will tell you how long to wait before eating or drinking. If your teeth feel sensitive, choose lukewarm food and drinks for the first few days.' },
    { question: 'Is teeth cleaning safe during pregnancy?', answer: 'Routine cleaning is generally considered safe during pregnancy and can help, because hormonal changes make the gums more prone to swelling and bleeding. Tell your dentist that you are pregnant and how far along you are, so any other treatment can be planned around it.' },
  ],
  relatedPosts: ['why-regular-checkups-matter'],
  relatedTreatments: ['checkup', 'gum-disease', 'whitening'],
  datePublished: '2026-10-26',
};

export default guide;
