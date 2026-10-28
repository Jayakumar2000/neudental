// Patient guide for /treatments/teeth-cleaning. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'cleaning',
  seoTitle: 'Teeth Cleaning in Kodungaiyur: Cost & Scaling | Neudental',
  metaDescription: 'Teeth cleaning (scaling and polishing) at Neudental, Kodungaiyur: bleeding gums, tartar, sensitivity, how often to go and cost ({{price}}).',
  headline: 'Teeth Cleaning (Scaling and Polishing) in Kodungaiyur, Chennai',
  answer: 'Professional teeth cleaning, also called scaling and polishing, removes hardened tartar that brushing cannot shift, along with plaque and surface stains, and helps gums that bleed from early gum inflammation (gingivitis) to settle. It is usually recommended every six months, or sooner if your gums bleed or tartar builds up. At Neudental in Kodungaiyur it takes about {{duration}} and costs {{price}}, including fluoride treatment.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-teeth-cleaning', text: 'What is professional teeth cleaning?' },
    'Plaque is a soft, sticky film of bacteria that forms on your teeth every day. Brushing and cleaning between the teeth remove most of it, but whatever is missed can harden within a few days into **tartar** (also called calculus). Tartar sticks firmly to the tooth, usually along the gumline and behind the lower front teeth, and no toothbrush can remove it.',
    "The bacteria in plaque irritate the gums, and tartar's rough surface holds even more plaque against them. That is how **gingivitis**, the early and reversible stage of gum disease, begins. A professional cleaning removes the tartar (scaling) and smooths the tooth surfaces (polishing), so your gums can heal and your daily brushing works properly again.",
    { type: 'heading', id: 'signs-you-need-a-cleaning', text: 'Do you need a teeth cleaning?' },
    'Almost everyone builds up some tartar, even with careful brushing. Book a cleaning if you notice:',
    {
      type: 'list',
      items: [
        'Gums that bleed when you brush or floss',
        'Red, puffy or tender gums',
        'Hard yellow or brown deposits along the gumline',
        'Bad breath that keeps coming back',
        'Stains from tea, coffee, smoking, chewing tobacco or paan',
        'Teeth that feel rough along the gumline, even after brushing',
        'It has been more than six months since your last cleaning',
      ],
    },
    { type: 'note', text: 'Bleeding gums are usually a sign of inflammation caused by plaque, not something to ignore or to treat by brushing less. Gentle, regular brushing and a professional cleaning often help them settle within a couple of weeks.' },
    { type: 'heading', id: 'teeth-cleaning-procedure', text: 'What happens during a teeth cleaning?' },
    {
      type: 'steps',
      items: [
        { title: 'Checking your teeth and gums', text: 'Dr. Swetha asks about your health, then checks where tartar has built up, how your gums are and whether anything else, such as a cavity, needs attention. Tell her if you take blood-thinning medicines, have a heart condition or diabetes, or are pregnant.' },
        { title: 'Scaling', text: 'Plaque and tartar are gently removed from the tooth surfaces and just under the gumline with scaling instruments. You may feel vibration or scraping, and water is used to rinse the debris away.' },
        { title: 'Polishing', text: 'The teeth are polished to remove surface stains and leave them feeling smooth and clean.' },
        { title: 'Fluoride treatment', text: 'Fluoride is applied to help strengthen the enamel and protect against cavities. Your dentist will tell you how long to wait before eating or drinking.' },
        { title: 'Oral hygiene advice', text: 'You are shown how to brush and clean between your teeth in the areas where tartar tends to collect, and told when to come back.' },
      ],
    },
    'Most cleanings are done in a single sitting of about {{duration}}. Very heavy tartar or badly inflamed gums may need a second visit.',
    { type: 'heading', id: 'sensitivity-after-cleaning', text: 'Does it hurt? Sensitivity and bleeding afterwards' },
    'Most people do not find a cleaning painful. Areas where the gums are swollen or the roots are exposed can feel sensitive while they are cleaned, so tell your dentist if you have sensitive teeth or feel anxious; they can go more slowly and pause when you need a break.',
    'Afterwards, it is common to have:',
    {
      type: 'list',
      items: [
        'Sensitivity to cold for a few days, because tooth surfaces that were covered by tartar are now exposed',
        'Slightly tender gums that bleed a little when you brush for a day or two',
        'Small gaps between the teeth that you can now feel, where tartar or swollen gum used to fill the space',
      ],
    },
    'Sensitivity and tenderness usually settle within a few days to a week as the gums heal. The gaps were already there, hidden by tartar or swollen gum; they are not new damage. If sensitivity or bleeding gets worse, or lasts beyond two weeks, call the clinic.',
    { type: 'heading', id: 'how-often', text: 'How often should you get your teeth cleaned?' },
    'At Neudental, a check-up and professional cleaning every six months is recommended for most people. The cleaning is separate from the [routine dental check-up](/treatments/dental-checkup), which examines your teeth for cavities and other problems, but both follow the same six-monthly schedule. Dr. Swetha may suggest more frequent cleanings if you:',
    {
      type: 'list',
      items: [
        'Build up tartar quickly, even with good brushing',
        'Have been treated for gum disease before',
        'Smoke or chew tobacco',
        'Have diabetes',
        'Wear braces or other dental appliances',
        'Are pregnant, as hormonal changes can make gums bleed more easily',
      ],
    },
    'Read more on [why regular dental check-ups matter](/blogs/why-regular-checkups-matter), even when nothing hurts.',
    { type: 'heading', id: 'teeth-cleaning-cost', text: 'Teeth cleaning cost in Kodungaiyur' },
    'A cleaning every six months is usually simpler and less costly than treating the gum problems that can develop when tartar is left in place.',
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
    'If gingivitis is left untreated, in some people it spreads deeper and damages the gum attachment and bone that hold the teeth in place (periodontitis). Signs include receding gums, deep pockets between the gum and tooth found at your check-up, teeth that feel loose, or bad breath that does not go away after a cleaning. Tartar on the roots below the gumline then needs [gum disease treatment](/treatments/gum-disease-treatment), which includes a deep cleaning and regular monitoring. Your dentist will tell you which one you need after checking your gums.',
    { type: 'heading', id: 'aftercare', text: 'Keeping your teeth clean between visits' },
    {
      type: 'list',
      items: [
        'Brush twice a day for two minutes with a soft brush and fluoride toothpaste, angling the bristles towards the gumline.',
        'Clean between your teeth once a day with floss or small interdental brushes, as your dentist shows you.',
        'If your teeth stay sensitive, ask your dentist whether a toothpaste for sensitive teeth would help.',
        'Limit sugary snacks between meals, and avoid smoking and chewing tobacco, which stain the teeth and harm the gums.',
      ],
    },
  ],
  faqs: [
    { question: 'How much does teeth cleaning cost at Neudental?', answer: 'Teeth cleaning at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on how much tartar and staining there is and is confirmed after your teeth and gums are checked. Any other treatment you need, such as a filling or deeper gum care, is charged separately.' },
    { question: 'How long does a scaling appointment take?', answer: 'A cleaning usually takes {{duration}} and is finished in one visit. The time depends mostly on how much tartar has built up since your last cleaning. With very heavy tartar or inflamed gums, your dentist may plan a second sitting or a deeper gum treatment.' },
    { question: 'Does scaling damage enamel or make teeth loose?', answer: 'Scaling done properly removes deposits, not enamel. Heavy tartar can fill the spaces between teeth and even hold them together, so once it is removed you may notice gaps or slight movement that were already there. Teeth that feel loose usually point to deeper gum disease, which needs its own assessment.' },
    { question: 'Will a cleaning make my teeth whiter?', answer: 'Polishing removes surface stains from tea, coffee and tobacco, so teeth often look brighter and cleaner. It does not change the natural colour of your teeth. For that, ask about [professional teeth whitening](/treatments/teeth-whitening).' },
    { question: 'Can I eat and drink straight after a teeth cleaning?', answer: 'Usually yes, but if fluoride has been applied your dentist will tell you how long to wait before eating or drinking. If your teeth feel sensitive, choose lukewarm food and drinks for the first few days.' },
    { question: 'Is teeth cleaning safe during pregnancy?', answer: 'Routine cleaning is generally considered safe during pregnancy and can help, because hormonal changes make the gums more prone to swelling and bleeding. Tell your dentist that you are pregnant and how far along you are, so any other treatment can be planned around it.' },
  ],
  relatedPosts: ['why-regular-checkups-matter'],
  relatedTreatments: ['checkup', 'gum-disease', 'whitening'],
  datePublished: '2026-10-26',
};

export default guide;
