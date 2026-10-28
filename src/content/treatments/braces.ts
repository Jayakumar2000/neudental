// Patient guide for /treatments/braces. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'ortho',
  seoTitle: 'Braces in Kodungaiyur: Cost, Types & Duration | Neudental',
  metaDescription: 'Braces at Neudental, Kodungaiyur: metal or ceramic, who needs them, the right age, treatment time, retainers and cost ({{price}}).',
  headline: 'Braces and Orthodontic Treatment in Kodungaiyur, Chennai',
  answer: 'Braces are fixed orthodontic appliances that gently move teeth into better positions over time, straightening crooked, crowded or gapped teeth and correcting the bite. They suit children once most adult teeth have come in, and adults whose gums and supporting bone are healthy. At Neudental in Kodungaiyur, metal and ceramic braces are available; treatment usually takes {{duration}} and costs {{price}}, depending on your case.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'who-needs-braces', text: 'Who needs braces?' },
    'Braces treat teeth that are out of line, or upper and lower teeth that do not meet properly, which dentists call malocclusion. It often runs in families, and can also follow habits such as long-term thumb sucking or losing baby teeth early. Signs include:',
    {
      type: 'list',
      items: [
        'Crowded, overlapping or crooked teeth',
        'Gaps between the teeth',
        'Upper front teeth that stick out',
        'An underbite, crossbite or open bite, where the teeth do not meet as they should',
        'Difficulty biting or chewing, or teeth that wear unevenly',
      ],
    },
    'Straightening is not only about looks: crowded teeth can be harder to clean, and an uneven bite can put extra load on some teeth.',
    { type: 'heading', id: 'right-age-for-braces', text: 'What is the right age for braces?' },
    'Braces work for both children and adults.',
    '**Children.** An orthodontic check by around the age of 7 is commonly recommended, as some bite and jaw problems are easier to guide while a child is still growing. Most children who need braces start them between about 10 and 14, once most adult teeth have come in. Regular [kids dentistry](/treatments/kids-dentistry) visits include watching how the teeth and jaws develop.',
    '**Adults.** Teeth can be moved at any age if the teeth, gums and supporting bone are healthy. Adult treatment can take a little longer, and any gum disease is treated first.',
    { type: 'heading', id: 'types-of-braces', text: 'Metal or ceramic braces: which suits you?' },
    'Neudental offers metal and ceramic braces. Both use a small bracket on each tooth and a thin wire that guides the teeth into place, and both move teeth in the same way. As a general guide:',
    {
      type: 'table',
      caption: 'Metal and ceramic braces compared',
      rows: [
        ['Metal braces', 'Stainless steel brackets. Sturdy and usually the lower-cost choice, but clearly visible.'],
        ['Ceramic braces', 'Tooth-coloured brackets that are less noticeable. They usually cost more, and the clear ties that hold the wire can stain from tea, coffee or turmeric.'],
      ],
    },
    'Fixed braces work without you having to remember to wear them, so they are often suggested for children and teenagers, and for more complex bite problems. If you would prefer removable, transparent trays, [clear aligners](/treatments/clear-aligners) may suit mild to moderate cases; that page compares them with braces in detail.',
    { type: 'heading', id: 'braces-procedure', text: 'How braces treatment works, step by step' },
    {
      type: 'steps',
      items: [
        { title: 'Consultation and X-rays', text: '[Dr. Swetha](/dr-swetha) examines your teeth, gums and bite. X-rays, usually a full-mouth OPG and sometimes other views, show the roots, the jaw bone and any teeth still to come in (see [dental X-rays and OPG scans](/treatments/dental-x-ray)). Photographs and moulds of the teeth may also be taken.' },
        { title: 'Treatment plan and cost', text: 'You are told which braces suit you, roughly how long treatment will take and what it will cost, before anything is fitted.' },
        { title: 'Getting the teeth ready', text: 'Cavities and gum problems are treated first. If the teeth are very crowded, removing some teeth (usually premolars) to make space is sometimes advised.' },
        { title: 'Fitting the braces', text: 'A small bracket is bonded to each tooth and a thin wire is held in the brackets with small ties or clips. This usually needs no injection.' },
        { title: 'Regular progress reviews', text: 'Usually every 4 to 8 weeks, as your dentist advises, the wire is adjusted or changed and progress is checked. Some patients also wear small elastic bands between the upper and lower teeth to correct the bite.' },
        { title: 'Removing the braces', text: 'Once the teeth reach their planned positions, the brackets are taken off, the leftover glue is polished away and a retainer is fitted.' },
      ],
    },
    { type: 'heading', id: 'how-long-do-braces-take', text: 'How long do braces take?' },
    'Most braces treatments take {{duration}}. Mild crowding or spacing is often at the shorter end, while severe crowding, a significant bite problem or adult treatment can take longer. Missed reviews, broken brackets and elastics not worn as advised can also slow progress.',
    { type: 'heading', id: 'braces-cost', text: 'Braces cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Braces cost at Neudental',
      rows: [
        ['Orthodontic treatment with braces', '{{price}}'],
        ['What changes the cost', 'Metal or ceramic brackets, how crowded the teeth are or how far the bite is off, whether one or both jaws need braces, and how long treatment is expected to take'],
        ['Worth asking at your consultation', 'Whether your quote covers X-rays, retainers, and any cleaning, fillings or extractions needed before the braces go on'],
        ['When you will know your cost', 'After the examination and X-rays, before any braces are fitted'],
      ],
    },
    { type: 'heading', id: 'living-with-braces', text: 'Living with braces: eating, cleaning and comfort' },
    'The teeth usually feel sore or tender for a few days after the braces are fitted and after each adjustment. Soft foods such as idli, pongal, curd rice and upma help, as does a little orthodontic wax over any bracket that rubs your cheek. Take only the pain relief your dentist advises.',
    'To protect the braces and your teeth:',
    {
      type: 'list',
      items: [
        'Avoid hard or sticky foods such as murukku, chikki, nuts, toffees and chewing gum, which can break brackets or bend the wire.',
        'Cut hard fruit like apple and guava into small pieces, and take corn off the cob.',
        'Brush with a fluoride toothpaste after every meal, and clean under the wire with an interdental brush or floss threader.',
        'Keep up regular [professional teeth cleaning](/treatments/teeth-cleaning) during treatment.',
      ],
    },
    { type: 'note', text: 'Call the clinic if a bracket comes loose, a wire pokes your cheek, or pain does not settle after a few days. Meanwhile, orthodontic wax can cover a sharp end. Do not try to cut or bend the wire yourself.' },
    { type: 'heading', id: 'risks-of-braces', text: 'Are there any risks with braces?' },
    'Braces are a well-established treatment, and many problems can be avoided with good cleaning and regular reviews. Be aware of:',
    {
      type: 'list',
      items: [
        '**White marks, cavities or swollen gums** around the brackets, if plaque is not cleaned away well',
        '**Slight shortening of the tooth roots** (root resorption) in some people, which your dentist watches for during treatment',
        '**A nickel or metal allergy**, which is uncommon; tell your dentist before treatment starts',
        '**Teeth moving back** after treatment, if retainers are not worn as advised',
      ],
    },
    'In adults, a large difference in jaw size or position may not be fully correctable with braces alone; your dentist will tell you if a specialist opinion is needed.',
    { type: 'heading', id: 'retainers-after-braces', text: 'Why do you need a retainer after braces?' },
    'Teeth tend to drift back towards their old positions after braces come off, and they keep shifting slowly with age. A retainer holds them in place. It may be **removable** (a clear tray or wire appliance you take out to eat and clean) or **fixed** (a thin wire bonded behind the front teeth); your dentist will advise which suits you.',
    'Removable retainers are often worn most of the day at first, then at night for as long as your dentist advises, often long-term. A fixed retainer needs careful cleaning around the wire and regular checks. Call the clinic if a retainer cracks, comes loose or stops fitting.',
  ],
  faqs: [
    { question: 'How much do braces cost at Neudental?', answer: 'Braces at Neudental in Kodungaiyur usually cost {{price}}. Where your treatment falls in that range depends on whether you choose metal or ceramic braces, how complex the crowding or bite problem is, and how long treatment will take. Your exact cost is confirmed after the examination and X-rays.' },
    { question: 'How often will I need to visit while wearing braces?', answer: 'Over the {{duration}} of a typical treatment, you will usually come in every 4 to 8 weeks for a short progress review and adjustment. Missed reviews and broken brackets can make treatment take longer, so try to keep to the schedule your dentist sets.' },
    { question: 'Do braces hurt?', answer: 'Putting braces on does not usually hurt. The teeth often feel sore for a few days after fitting and after each adjustment, and the brackets can rub the cheeks at first. Soft foods, orthodontic wax and the pain relief your dentist advises usually help.' },
    { question: 'Am I too old for braces?', answer: 'Usually not. Many adults have braces to fix crowding they have lived with for years or teeth that have shifted over time. What matters is healthy gums and supporting bone, which your dentist checks before advising. Ceramic braces and clear aligners are less noticeable options many adults ask about.' },
    { question: 'Will I need teeth removed before getting braces?', answer: 'Not always. When teeth are very crowded, removing some teeth, usually premolars, is sometimes the most practical way to make space; in many other cases there is enough room without it. Your dentist will explain whether extractions are needed after studying your X-rays and records.' },
    { question: 'Do ceramic braces work as well as metal braces?', answer: 'For most cases, yes: both move teeth in the same way. Ceramic brackets are less noticeable but usually cost more, are slightly bulkier and more brittle, and their clear ties can stain between reviews. Your dentist will advise which suits your teeth and bite.' },
  ],
  relatedTreatments: ['invisalign', 'kids-dentistry', 'cleaning', 'imaging'],
  datePublished: '2026-10-26',
};

export default guide;
