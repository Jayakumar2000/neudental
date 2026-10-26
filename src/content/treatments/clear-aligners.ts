// Patient guide for /treatments/clear-aligners. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'invisalign',
  seoTitle: 'Clear Aligners in Kodungaiyur: Cost & Timeline | Neudental',
  metaDescription: 'Clear aligners at Neudental, Kodungaiyur: nearly invisible removable trays, who they suit, daily wear, {{duration}} and cost ({{price}}).',
  headline: 'Clear Aligners in Kodungaiyur, Chennai',
  answer: 'Clear aligners are a series of custom-made, transparent, removable trays that gradually straighten teeth and close gaps without wires or brackets. They suit many adults and teenagers with mild to moderate crowding or spacing, and need to be worn about 20-22 hours a day. Treatment usually takes {{duration}}. At Neudental in Kodungaiyur, clear aligners cost {{price}}, depending on how much your teeth need to move.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-are-clear-aligners', text: 'What are clear aligners?' },
    'Clear aligners are thin, transparent plastic trays made to fit snugly over your teeth. You receive a series of them, each shaped slightly differently from the last. Wearing each set in turn applies gentle, steady pressure that moves your teeth a little at a time towards the position planned at the start.',
    'The trays are hard to notice at a normal speaking distance, and you take them out to eat and brush. Treatment at Neudental is planned by [Dr. Swetha](/dr-swetha), whose work includes clear aligners and smile designing.',
    { type: 'heading', id: 'who-are-clear-aligners-for', text: 'Are clear aligners right for you?' },
    'Clear aligners can correct many common alignment problems, such as:',
    {
      type: 'list',
      items: [
        'Mild to moderate crowding, where teeth overlap or are slightly twisted',
        'Gaps between the teeth',
        'Front teeth that stick out a little',
        'Some mild bite problems, which your dentist will assess',
        'Teeth that have shifted again after braces in the past',
      ],
    },
    'They may not suit severe crowding, teeth that need large movements, or a bite problem that comes from the position of the jaws; fixed [braces](/treatments/braces) usually give more control there. Aligners also depend on you: trays left in their case do not move teeth.',
    { type: 'heading', id: 'clear-aligners-procedure', text: 'How clear aligner treatment works at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Consultation and examination', text: 'Dr. Swetha examines your teeth, gums and bite, asks what you would like to change, and checks whether aligners can achieve it. [Dental X-rays](/treatments/dental-x-ray) are taken if needed to check the roots and bone.' },
        { title: 'Treatment needed first', text: 'Cavities, gum problems and tartar are treated first, because teeth should be healthy before they are moved. A [professional teeth cleaning](/treatments/teeth-cleaning) is often a good start.' },
        { title: 'Digital smile planning', text: 'Impressions and photographs of your teeth are taken, and the movements are planned step by step on a computer model. You can usually see the expected result and an estimated timeline before you decide.' },
        { title: 'Fitting your first trays', text: 'Your first aligners are fitted and checked. Small tooth-coloured bumps called attachments may be bonded to some teeth to help the trays grip. If your plan needs extra space, a very small amount of enamel may be polished from between some teeth; your dentist will explain this beforehand.' },
        { title: 'Changing trays and reviews', text: 'You move to each new set of trays on the schedule your dentist sets, often every one to two weeks, with short review visits to check progress. Retainers follow once your teeth reach their planned position.' },
      ],
    },
    { type: 'heading', id: 'how-long-do-clear-aligners-take', text: 'How long does clear aligner treatment take?' },
    'Treatment usually takes {{duration}}. Small corrections, such as closing a minor gap, sit at the shorter end; more crowding or bite correction takes longer.',
    'The trays only work while they are in your mouth, so they need to be worn for about **20-22 hours a day**, coming out only to eat, to drink anything other than plain water, and to brush. Leaving them out longer slows progress and can mean the next set no longer fits, adding time to treatment.',
    { type: 'heading', id: 'clear-aligners-cost', text: 'Clear aligners cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Clear aligner cost at Neudental',
      rows: [
        ['Clear aligner treatment', '{{price}}'],
        ['What changes the cost', 'How much your teeth need to move, whether one or both jaws are treated, and how many sets of trays your plan needs'],
        ['Treatment needed first', 'Cleaning, fillings or gum treatment, if needed, are charged separately'],
        ['Worth asking', 'What your quote includes, such as review visits, replacement trays and retainers'],
        ['When you will know your cost', 'After your examination and treatment plan, before any trays are made'],
      ],
    },
    { type: 'heading', id: 'living-with-clear-aligners', text: 'What is daily life with aligners like?' },
    'Most people get used to aligners within a few days. A new set often feels tight for a day or two, and speech may sound slightly different at first; both usually settle quickly.',
    {
      type: 'list',
      items: [
        'Take the trays out to eat and for any drink other than plain water. Hot drinks can warp them, and tea, coffee and sugary drinks can stain them or trap sugar against your teeth.',
        'Brush and clean between your teeth before putting the trays back in.',
        'Clean the trays gently with a soft brush and cool water, as your dentist advises.',
        'Keep the trays in their case when they are out. Trays wrapped in a tissue are easily thrown away by mistake.',
        'Frequent snacking means more time with the trays out, so planned mealtimes make wear time easier.',
      ],
    },
    { type: 'note', text: 'Call the clinic if a tray cracks, is lost or stops fitting, if an attachment comes off, or if a tray edge rubs your gum or cheek. Check with your dentist before moving to the next set early.' },
    { type: 'heading', id: 'clear-aligners-vs-braces', text: 'Clear aligners or braces: which suits you?' },
    'Both move teeth with gentle, steady pressure and can give good results in suitable cases. The main differences are in how they look and how you live with them:',
    {
      type: 'table',
      caption: 'Clear aligners and fixed braces compared',
      rows: [
        ['Appearance', 'Aligners are clear and hard to notice; metal braces are visible, and ceramic braces are tooth-coloured but still visible up close'],
        ['Eating and cleaning', 'Aligners come out, so you eat and brush as usual; braces stay fixed, so hard and sticky foods are avoided and cleaning around them takes extra care'],
        ['Discipline needed', 'Aligners only work if worn 20-22 hours a day; braces work all the time without you having to remember'],
        ['Complex cases', 'Braces usually give more control for severe crowding and some bite problems'],
        ['Cost', 'Clear aligners at Neudental: {{price}}. See [braces](/treatments/braces) for the cost of metal and ceramic braces'],
      ],
    },
    'If you are unsure, ask about both at your consultation. Your dentist will explain which suits your teeth and your routine.',
    { type: 'heading', id: 'retainers-after-aligners', text: 'Why are retainers needed after aligners?' },
    'After teeth have moved, the bone and gums around them need time to settle, and teeth naturally tend to drift back. Retainers, either removable clear trays or a thin wire fixed behind the front teeth, hold them in place. Your dentist will advise which type suits you and how long to wear it; many people are advised to wear retainers at night for years. Without them, teeth can move back.',
  ],
  faqs: [
    { question: 'How much do clear aligners cost at Neudental?', answer: 'Clear aligner treatment at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on how much your teeth need to move, whether one or both jaws are treated and how many trays your plan needs. It is confirmed after your examination and treatment plan, before any trays are made.' },
    { question: 'How many months and visits does aligner treatment need?', answer: 'Treatment usually takes {{duration}}, depending on how much your teeth need to move. You switch to a new set of trays every one to two weeks, as your dentist advises, and come in for short review visits along the way. Retainers are worn afterwards.' },
    { question: 'Are clear aligners the same as Invisalign?', answer: 'Invisalign is the brand name of one clear aligner system, and many people use the word to mean all clear aligners. Different systems work in a similar way, using a series of custom-made transparent trays. Ask your dentist which aligner system your treatment plan uses.' },
    { question: 'Do clear aligners hurt?', answer: 'Aligners do not usually hurt, but each new set of trays can feel tight or cause mild soreness for a day or two as the teeth start to move. This usually settles on its own. If a tray edge rubs your gum or cheek, tell your dentist, as it can often be adjusted.' },
    { question: 'Can adults get clear aligners?', answer: 'Yes. Teeth can be moved at any age as long as the teeth, gums and supporting bone are healthy, and many adults choose aligners because they are discreet and removable. Any gum disease or cavities are treated first. Your dentist will check before advising whether aligners suit you.' },
    { question: 'What if I lose or break a tray?', answer: 'Call the clinic as soon as you can. Depending on where you are in treatment, your dentist may ask you to wear your previous or next set until a replacement is arranged. Try not to go without trays for long, as teeth can start to move back.' },
  ],
  relatedTreatments: ['ortho', 'cosmetic', 'cleaning'],
  datePublished: '2026-10-26',
};

export default guide;
