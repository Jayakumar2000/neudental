// Patient guide for /treatments/kids-dentistry. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'kids-dentistry',
  seoTitle: 'Kids Dentist in Kodungaiyur: Cost & First Visit | Neudental',
  metaDescription: 'Kids dentistry at Neudental, Kodungaiyur: first visit age, why milk teeth matter, cavity prevention, habits, fear-free visits and cost ({{price}}).',
  headline: 'Kids Dentistry in Kodungaiyur, Chennai',
  answer: 'Kids dentistry is dental care for children from their first tooth: check-ups, cavity prevention and treatment, guidance on habits such as thumb sucking and bottle feeding, and monitoring how the teeth and jaws develop. A first visit is usually advised by the first birthday. At Neudental in Kodungaiyur, a visit usually takes {{duration}} and typically costs {{price}}, depending on what your child needs.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'first-dental-visit', text: 'When should your child first see a dentist?' },
    'Dental guidelines commonly advise a first visit soon after the first tooth appears, and no later than the first birthday. The first milk tooth usually comes in between six months and a year.',
    "A first visit is short and simple. The dentist checks the teeth and gums for early signs of decay, often with your child on your lap, and shows you how to clean them. Your child's first dental visit is then a calm one, not one for toothache.",
    'After that, Neudental recommends [regular dental check-ups](/treatments/dental-checkup) every six months, or as often as your dentist advises.',
    { type: 'heading', id: 'why-milk-teeth-matter', text: 'Why do milk teeth matter if they fall out?' },
    'Milk teeth (baby teeth) do important work for years before they are replaced:',
    {
      type: 'list',
      items: [
        '**Eating:** comfortable teeth let children chew a full range of foods.',
        '**Speech:** the front teeth help children form many sounds clearly.',
        '**Holding space:** each milk tooth keeps room for the adult tooth beneath it. If one is lost early, nearby teeth can drift into the gap and crowd the adult tooth.',
        '**Protecting the adult teeth:** an infected milk tooth can cause pain and swelling, and may affect the adult tooth developing underneath.',
      ],
    },
    'The back milk teeth often stay until about 10 to 12 years of age. The first adult molars come in at around six, behind the milk teeth, without replacing any of them. Parents often mistake them for milk teeth, but they are permanent and need careful brushing from the start.',
    { type: 'heading', id: 'kids-dental-visit', text: "What happens at a child's dental visit at Neudental?" },
    {
      type: 'steps',
      items: [
        { title: 'A relaxed start', text: '[Dr. Swetha](/dr-swetha) talks with you and your child about brushing, food, habits and any pain, and explains what will happen in simple words.' },
        { title: 'Gentle examination', text: 'The teeth and gums are checked for early cavities and plaque, along with how the teeth meet and how the jaws are growing.' },
        { title: 'X-rays, only if needed', text: 'A [dental X-ray](/treatments/dental-x-ray) may be taken to see between the teeth or check the adult teeth forming below. It is not needed at every visit.' },
        { title: 'Prevention and habit advice', text: 'You get practical advice on brushing, toothpaste, snacks and drinks, and habits.' },
        { title: 'A clear plan', text: 'If treatment is needed, you are told what it involves, how many visits it may take and what it will cost before anything is started. Longer treatment may be split into shorter visits.' },
      ],
    },
    { type: 'heading', id: 'fear-free-visits', text: 'How can you make dental visits fear-free?' },
    "Many children are nervous at the dentist. A child-friendly approach means going at your child's pace and explaining each step in simple words. At home, you can help too:",
    {
      type: 'list',
      items: [
        'Talk about the visit simply and positively, and avoid words like "hurt", "pain" or "injection".',
        'Never use the dentist as a threat, such as "the doctor will give you an injection if you eat sweets".',
        'Stay calm yourself, and praise your child afterwards with a hug or a sticker rather than a sweet.',
      ],
    },
    { type: 'heading', id: 'preventing-cavities', text: 'How can you prevent cavities in children?' },
    {
      type: 'list',
      items: [
        "**Clean from the start.** Before teeth appear, wipe your baby's gums with a soft, clean, damp cloth. Once the first tooth comes in, brush twice a day with a small, soft toothbrush.",
        '**Use the right amount of toothpaste.** A fluoride toothpaste is commonly advised: a smear the size of a grain of rice under age three, and a pea-sized amount from three to six. Teach your child to spit it out, and ask your dentist what suits your child.',
        '**Help with brushing** until about seven or eight, as younger children cannot yet clean every surface well.',
        '**Watch how often sugar is eaten.** Frequent sweets, biscuits, juice and cool drinks between meals give decay more chances to start. Keep sweet foods to mealtimes and offer water in between.',
      ],
    },
    'Ask your dentist whether extra protection, such as fluoride applied to the teeth or sealants (a thin protective coating on the grooves of the back teeth), suits your child.',
    { type: 'heading', id: 'habits', text: 'Do thumb sucking and bottle feeding affect the teeth?' },
    'Most habits respond better to praise and gentle reminders than to scolding.',
    {
      type: 'list',
      items: [
        '**Thumb or finger sucking and pacifiers.** Most children stop on their own between about two and four. If the habit continues once the adult front teeth start coming in, it can push the front teeth forward, leave a gap between the upper and lower front teeth, or narrow the upper jaw.',
        '**A bottle at bedtime.** Falling asleep with a bottle of milk, juice or any sweet drink leaves sugar on the teeth for hours, a common cause of decay in the upper front teeth. If a night bottle is needed, use plain water, and start moving to a cup around the first birthday, as your paediatrician advises.',
        '**Other habits**, such as mouth breathing, nail biting or grinding the teeth at night, are worth mentioning at the visit.',
      ],
    },
    { type: 'heading', id: 'cavity-signs-and-treatment', text: 'How can you spot a cavity in your child, and how is it treated?' },
    'Early decay often shows as chalky white spots or lines near the gums, especially on the upper front teeth. Later it turns brown or black and forms a hole. Also look out for:',
    {
      type: 'list',
      items: [
        'Pain when eating sweets, or with cold food and drinks',
        'Food getting stuck in one spot, or chewing only on one side',
        'A swelling or pimple-like bump on the gum near a tooth',
      ],
    },
    'Treatment depends on how deep the decay is. A small cavity can usually be repaired with a [tooth-coloured filling](/treatments/tooth-filling). Decay that reaches the nerve of a milk tooth may need nerve treatment adapted for milk teeth, often followed by a crown. A tooth too damaged to save may need removal; if a back milk tooth is lost early, ask your dentist whether a space maintainer (a small appliance that holds the gap) is needed.',
    { type: 'note', text: 'Milk teeth have thinner enamel than adult teeth, so decay can spread faster; do not wait for a decayed tooth to fall out. A swollen face, a fever with toothache or a tooth injury should be seen by a dentist the same day, and a knocked-out adult tooth straight away. Swelling spreading towards the eye, difficulty swallowing or breathing, or a head injury with drowsiness, vomiting or loss of consciousness needs urgent medical care.' },
    { type: 'heading', id: 'when-teeth-come-in', text: "When do children's teeth come in and fall out?" },
    'Teeth coming in a few months early or late is common, but most children follow this pattern:',
    {
      type: 'table',
      caption: "When children's teeth usually come in",
      rows: [
        ['Six months to one year', 'The first milk tooth appears, usually a lower front tooth'],
        ['By about three years', 'All 20 milk teeth are usually in'],
        ['Around six years', 'The first adult molars come in behind the milk teeth, and the lower front milk teeth start to loosen'],
        ['About six to twelve years', 'Milk teeth fall out one by one and adult teeth take their place'],
        ['Around twelve to thirteen years', 'The second adult molars come in'],
      ],
    },
    'At each check-up, the dentist watches how the teeth and jaws are developing, to spot crowding, a crossbite, missing or late teeth, and milk teeth that are not falling out on time. An orthodontic check by around age seven is commonly advised; if your child may need straightening later, see [braces for children and adults](/treatments/braces).',
    { type: 'heading', id: 'kids-dentistry-cost', text: 'Kids dentistry cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Kids dentistry cost at Neudental',
      rows: [
        ['Kids dentistry', '{{price}}'],
        ['What changes the cost', 'Whether the visit is a check-up with advice or includes treatment, such as a filling'],
        ['If more treatment is needed', 'Your dentist explains the plan and its cost before anything is started. Braces, if needed later, are a separate treatment'],
        ['When you will know your cost', 'After your child has been examined, before any treatment starts'],
      ],
    },
  ],
  faqs: [
    { question: 'How much does kids dentistry cost at Neudental?', answer: 'At Neudental in Kodungaiyur, kids dentistry typically costs {{price}}. The cost depends on whether the visit is a check-up with advice or includes treatment, such as a filling. If your child needs more treatment, the plan and its exact cost are explained after the examination, before anything is started.' },
    { question: "How long will my child's dental appointment take?", answer: 'Most visits take {{duration}}. A first check-up for a young child is often at the shorter end. If several teeth need treatment, your dentist may plan it over a few short visits, so your child stays comfortable and cooperative.' },
    { question: 'Is it worth filling a cavity in a milk tooth?', answer: 'Usually, yes. Back milk teeth often have to last for several more years, and untreated decay can cause pain, infection and early loss of the tooth, which can affect the adult tooth and the space it needs. If a tooth is close to falling out anyway, your dentist may advise simply watching it.' },
    { question: 'Will my child need an injection for a filling?', answer: 'Not always. Some small cavities can be treated without numbing, but for deeper decay the tooth is numbed with local anaesthesia, so your child should feel pressure rather than pain. Afterwards, watch that your child does not bite or chew the numb lip or cheek until the feeling returns.' },
    { question: 'What should I do if my child knocks out a tooth?', answer: 'Do not put back a milk tooth, as this can harm the adult tooth underneath, but do have the area checked by a dentist. If it is, or may be, an adult tooth, hold it by the white crown, not the root, do not scrub it, keep it in a little milk and see a dentist straight away.' },
    { question: "My child's adult teeth are coming in behind the milk teeth. Is that normal?", answer: 'It is common, especially with the lower front teeth. Often the milk tooth loosens and falls out on its own, and the adult tooth moves forward into place. If the milk tooth is still firm after a few weeks, or your child has pain or swelling, book a visit, as it may need to be removed.' },
    { question: 'Why does my child get cavities even though they brush?', answer: "Brushing is only part of it. Frequent snacking on sweets, biscuits or juice, a bottle of milk at night, sticky foods and missed spots on the back teeth all raise the risk. Your dentist can look at your child's diet and brushing and suggest extra prevention if needed." },
  ],
  relatedPosts: ['why-regular-checkups-matter'],
  relatedTreatments: ['checkup', 'filling', 'ortho', 'imaging'],
  datePublished: '2026-10-26',
};

export default guide;
