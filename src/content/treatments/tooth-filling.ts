// Patient guide for /treatments/tooth-filling. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'filling',
  seoTitle: 'Tooth Filling in Kodungaiyur: Cost & Procedure | Neudental',
  metaDescription: 'Tooth-coloured cavity fillings at Neudental, Kodungaiyur: signs of a cavity, the single-sitting procedure, how long they last and cost ({{price}}).',
  headline: 'Tooth-Coloured Cavity Filling in Kodungaiyur, Chennai',
  answer: 'A cavity filling repairs a tooth damaged by decay. The decayed part is removed and the space is rebuilt with a tooth-coloured composite material that is bonded to the tooth and shaped to your bite. It suits cavities that have not reached the nerve. At Neudental in Kodungaiyur, a filling usually takes {{duration}} in a single sitting and costs {{price}}.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-a-tooth-filling', text: 'What is a tooth-coloured filling?' },
    'A cavity is a hole in a tooth caused by decay: bacteria in plaque feed on sugars and make acids that slowly dissolve the tooth. Once a hole has formed, the tooth cannot repair it on its own, and the decay usually keeps spreading if it is left alone.',
    'A filling stops the damage. The decayed part is removed and the space is rebuilt with **tooth-coloured composite**, a resin matched to the shade of your tooth and bonded to it, so the repair blends in and you can chew normally again. It suits small to moderate cavities that have not reached the nerve, and is also used to replace old fillings that have cracked or have decay underneath.',
    { type: 'heading', id: 'signs-of-a-cavity', text: 'Signs you may have a cavity' },
    'Early cavities often cause no symptoms. As the decay gets deeper, you may notice:',
    {
      type: 'list',
      items: [
        'A short, sharp twinge with sweet, cold or hot food and drinks',
        'A dark spot, chalky white patch or visible hole on a tooth',
        'A rough edge you can feel with your tongue, or food catching between the same two teeth',
        'Discomfort when you bite on one particular tooth',
        'An old filling that has cracked, chipped or fallen out',
      ],
    },
    'Cavities between teeth or under old fillings are often hidden from view, and are found during an examination, sometimes with a [dental X-ray](/treatments/dental-x-ray). That is why a [regular dental check-up](/treatments/dental-checkup) can catch decay while it still needs only a small filling.',
    { type: 'heading', id: 'filling-procedure', text: 'How a cavity filling is done at Neudental' },
    'A tooth-coloured filling is usually completed in a single sitting of about {{duration}}.',
    {
      type: 'steps',
      items: [
        { title: 'Examination', text: 'Dr. Swetha checks the tooth and takes an X-ray if needed, to see how deep the decay goes and confirm that a filling is the right treatment.' },
        { title: 'Numbing, if needed', text: 'The tooth is usually numbed with local anaesthesia, so you feel pressure but not pain. A very small, shallow cavity may not need it.' },
        { title: 'Removing the decay', text: 'The decayed part of the tooth is removed and the cavity is cleaned, keeping as much healthy tooth as possible.' },
        { title: 'Bonding and filling', text: 'A shade is chosen to match your tooth. A bonding agent is applied and the composite is placed in thin layers, each hardened with a special light, so the filling is set before you leave the chair.' },
        { title: 'Shaping and polishing', text: 'The filling is shaped to your bite, checked with a thin marking paper that you bite on, and polished smooth.' },
      ],
    },
    'If you have several cavities, your dentist may fill them in one visit or plan more than one sitting, and will explain the plan before starting.',
    { type: 'heading', id: 'does-a-filling-hurt', text: 'Does getting a filling hurt?' },
    'With the tooth numbed, most people feel pressure and vibration rather than pain. If you feel any discomfort, tell your dentist, who can pause or give more anaesthetic.',
    'Mild sensitivity to cold or to biting pressure for a few days, sometimes a little longer after a deep filling, is common and usually settles on its own. If your bite feels high once the numbness wears off, come back for a quick adjustment.',
    { type: 'heading', id: 'filling-or-root-canal', text: 'Filling or root canal: when is a cavity too deep?' },
    'A tooth has three layers: hard enamel outside, softer dentine beneath it, and the pulp at the centre, which holds the nerve and blood vessels. A filling works while decay is limited to the enamel and dentine. Once decay reaches the pulp, the pulp becomes inflamed or infected, and a filling alone cannot fix the problem.',
    'Warning signs include toothache that throbs or wakes you at night, hot or cold sensitivity that lingers after the food or drink is gone, swelling of the gum, or a pimple-like bump near the tooth. The tooth then usually needs [root canal treatment](/treatments/root-canal-treatment), followed by a filling or crown.',
    {
      type: 'table',
      caption: 'Which treatment does a decayed tooth need?',
      rows: [
        ['Small to moderate cavity', 'A tooth-coloured filling, usually in one sitting'],
        ['Deep cavity close to the nerve', 'A filling, often with a protective layer placed underneath'],
        ['Decay has reached the pulp', 'Root canal treatment, then a filling or crown'],
        ['Much of the tooth broken or lost', 'Often a [dental crown](/treatments/dental-crowns-and-bridges), which protects a weak tooth better than a very large filling'],
        ['Tooth too damaged to restore', '[Tooth extraction](/treatments/tooth-extraction), then a discussion of replacement options'],
      ],
    },
    { type: 'note', text: 'Only an examination, often with an X-ray, shows how deep a cavity is. Do not wait for pain: decay treated early usually needs only a filling.' },
    { type: 'heading', id: 'filling-cost', text: 'Tooth filling cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Cavity filling cost at Neudental',
      rows: [
        ['Tooth-coloured filling', '{{price}}'],
        ['What changes the cost', 'The size and depth of the cavity, how many surfaces of the tooth it covers (a cavity between two teeth involves more than one), which tooth it is, and whether an old filling must be removed first'],
        ['Several cavities', 'The total for your treatment plan is explained before anything is started'],
        ['Root canal or crown, if needed', 'Separate treatments, each with its own cost'],
        ['When you will know your cost', 'After the examination, and an X-ray if one is needed, before treatment starts'],
      ],
    },
    { type: 'heading', id: 'how-long-do-fillings-last', text: 'How long do tooth-coloured fillings last?' },
    'With good care, a composite filling usually lasts many years. How long yours lasts depends on its size and position, how hard you bite, whether you clench or grind your teeth, and how well you clean around it. Large fillings on back teeth take the most chewing force.',
    'Fillings can wear, chip or stain over time, and new decay can start at their edges, usually without pain at first. Your dentist checks them at each check-up, so a filling can be repaired or replaced before the tooth underneath is damaged.',
    { type: 'heading', id: 'aftercare', text: 'Aftercare and when to call the clinic' },
    {
      type: 'list',
      items: [
        'Wait for the numbness to wear off before eating or having hot drinks, so you do not bite or burn your cheek or tongue. The composite is already set, so you can then chew normally.',
        'Brush twice a day with a fluoride toothpaste and clean between your teeth, because a filled tooth can still decay at its edges.',
        'Cut down on frequent sugary snacks and drinks between meals.',
        'Avoid biting on ice, bones or pen caps, which can chip fillings and natural teeth alike.',
      ],
    },
    'Call the clinic if your bite still feels high after a day or two, if sensitivity gets worse instead of better, if pain throbs or lingers, or if a filling cracks or falls out.',
  ],
  faqs: [
    { question: 'How much does a tooth filling cost at Neudental?', answer: 'A tooth-coloured cavity filling at Neudental in Kodungaiyur costs {{price}}. Where your cost falls in that range depends on the size and depth of the cavity, how many surfaces of the tooth it involves and which tooth it is. It is confirmed after the examination, before treatment starts.' },
    { question: 'How long does it take to fill a cavity?', answer: 'A filling usually takes {{duration}} and is done in a single sitting. If you have several cavities, your dentist may fill some of them together or spread them over more than one visit, and will tell you the plan beforehand.' },
    { question: 'Can a cavity heal on its own?', answer: 'No. Once decay has made a hole, the tooth cannot grow back, and the cavity usually gets bigger over time. Very early decay, seen as a chalky white spot before a hole forms, can sometimes be stopped with fluoride, better brushing and less sugar. Your dentist will tell you which you have.' },
    { question: 'Will a tooth-coloured filling look natural?', answer: "Usually, yes. The composite is matched to your tooth's shade so it blends in, though like natural teeth it can stain from tea, coffee or tobacco over time. Fillings do not lighten with teeth whitening, so if you plan to whiten, ask your dentist about doing it before fillings in front teeth." },
    { question: 'Should I replace my old silver fillings with tooth-coloured ones?', answer: 'Not always. A silver (amalgam) filling that is intact, with no decay around it, can usually be left in place. If one is cracked, leaking or has decay underneath, it can usually be replaced with a tooth-coloured filling. Your dentist will check your old fillings and advise.' },
    { question: 'Can I get a filling during pregnancy?', answer: 'Fillings can usually be done during pregnancy, and leaving a cavity untreated is not advisable. Tell your dentist that you are pregnant, so the anaesthesia, any X-rays and the timing of non-urgent treatment can be planned with that in mind.' },
  ],
  relatedPosts: ['why-regular-checkups-matter'],
  relatedTreatments: ['rct', 'crowns-bridges', 'checkup', 'kids-dentistry'],
  datePublished: '2026-10-26',
};

export default guide;
