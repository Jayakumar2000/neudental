// Patient guide for /treatments/kids-dentistry. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'kids-dentistry',
  seoTitle: 'Kids Dentist in Kodungaiyur: Cost & First Visit | Neudental',
  metaDescription: 'Kids dentistry at Neudental, Kodungaiyur: first visit age, why milk teeth matter, cavity prevention, habits, fear-free visits and cost ({{price}}).',
  headline: 'Kids Dentistry in Kodungaiyur, Chennai',
  answer: 'Kids dentistry is dental care for children from their first tooth: check-ups, cavity prevention and treatment, guidance on habits such as thumb sucking and bottle feeding, and monitoring how the teeth and jaws develop. A first visit is usually advised by the first birthday. At Neudental in Kodungaiyur, a visit usually takes {{duration}} and costs {{price}}, depending on what your child needs.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'first-dental-visit', text: 'When should your child first see a dentist?' },
    "Children's dental guidelines commonly advise a first visit within about six months of the first tooth appearing, and by the first birthday at the latest. The first milk tooth usually comes in between six months and a year, and all 20 milk teeth are usually in by about age three.",
    "A first visit for a baby or toddler is short and simple. The dentist looks at the teeth and gums, often with your child sitting on your lap, checks for early signs of decay and shows you how to clean the teeth. It also means your child's first experience of the dentist is a calm one, not a visit for toothache.",
    'After that, Neudental recommends [regular dental check-ups](/treatments/dental-checkup) every six months, or as often as your dentist advises.',
    { type: 'heading', id: 'why-milk-teeth-matter', text: 'Why do milk teeth matter if they fall out?' },
    'Milk teeth (baby teeth) do important work for years before they are replaced:',
    {
      type: 'list',
      items: [
        '**Eating:** comfortable teeth let children chew a full range of foods.',
        '**Speech:** the front teeth help children form many sounds clearly.',
        '**Holding space:** each milk tooth keeps a place for the adult tooth growing beneath it. If one is lost early, neighbouring teeth can drift into the gap and crowd the adult teeth.',
        '**Protecting the adult teeth:** an infected milk tooth can cause pain and swelling, and may affect the adult tooth developing underneath.',
      ],
    },
    'The back milk teeth often stay until about 10 to 12 years of age. And the first adult molars come in at around six, behind the milk teeth, without replacing any of them. Parents often mistake them for milk teeth, but they are permanent and need careful brushing from the start.',
    { type: 'heading', id: 'kids-dental-visit', text: 'What happens at a kids dental visit at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'A relaxed start', text: '[Dr. Swetha](/dr-swetha) talks with you and your child, asks about brushing, food and drinks, habits and any pain, and explains what will happen in simple words.' },
        { title: 'Gentle examination', text: 'Each tooth and the gums are checked for early cavities, plaque and swelling, along with how the teeth meet and how the jaws are growing.' },
        { title: 'X-rays, only if needed', text: 'If the dentist needs to see between the teeth or check the adult teeth forming below, a [dental X-ray](/treatments/dental-x-ray) may be taken. It is not needed at every visit.' },
        { title: 'Prevention and habit advice', text: 'You get practical advice on brushing, toothpaste, snacks and drinks, and on habits such as thumb sucking or a bottle at night.' },
        { title: 'A clear plan', text: 'If treatment is needed, you are told what it involves, how many visits it may take and what it will cost before anything is started. Your dentist may suggest splitting longer treatment into shorter visits so your child does not get tired.' },
      ],
    },
    { type: 'heading', id: 'fear-free-visits', text: 'How can you make dental visits fear-free?' },
    "Many children are nervous at the dentist, often because of stories they have heard. A child-friendly approach means going at your child's pace, explaining each step in simple words and showing instruments before they are used. At home, you can help too:",
    {
      type: 'list',
      items: [
        'Start with routine check-ups, so the first visit is not for a toothache.',
        'Talk about the visit simply and positively, and avoid words like "hurt", "pain" or "injection".',
        'Never use the dentist as a threat, such as "the doctor will give you an injection if you eat sweets".',
        'Choose a time when your child is rested and has eaten.',
        "Stay calm yourself; children quickly pick up on a parent's worry.",
        'Praise your child afterwards for being brave, with a hug or a sticker rather than a sweet.',
      ],
    },
    { type: 'heading', id: 'preventing-cavities', text: 'How to prevent cavities in children' },
    {
      type: 'list',
      items: [
        "**Clean from the start.** Before teeth appear, wipe your baby's gums with a soft, clean, damp cloth. Once the first tooth comes in, brush twice a day with a small, soft toothbrush.",
        '**Use the right amount of toothpaste.** A fluoride toothpaste is commonly advised: a smear the size of a grain of rice for children under three, and a pea-sized amount from three to six. Ask your dentist which suits your child.',
        '**Help with brushing** until about seven or eight years of age. Younger children cannot yet clean every surface well on their own, especially the back teeth.',
        '**Watch how often sugar is eaten.** Frequent sweets, biscuits, chocolates, juice and cool drinks between meals give decay more chances to start. Keep sweet foods to mealtimes and offer water in between.',
      ],
    },
    'Your dentist may also suggest extra protection, such as fluoride applied to the teeth or sealants (a thin protective coating on the grooves of the back teeth). Ask whether either suits your child.',
    { type: 'heading', id: 'habits', text: 'Thumb sucking, bottle feeding and other habits' },
    'Habits are a normal part of growing up, and most can be handled with gentle guidance rather than scolding.',
    {
      type: 'list',
      items: [
        '**Thumb or finger sucking and pacifiers.** Most children stop on their own between about two and four. If the habit continues once the adult front teeth start coming in, it can push the front teeth forward, leave a gap between the upper and lower front teeth when biting, or narrow the upper jaw. Praise and gentle reminders usually work better than scolding.',
        '**A bottle at bedtime.** Falling asleep with a bottle of milk, juice or any sweet drink leaves sugar on the teeth for hours, a common cause of decay in the upper front teeth. If your child needs a bottle at night, use plain water, and start moving to a cup around the first birthday, as your paediatrician advises.',
        "**Other habits** such as mouth breathing, pushing the tongue against the front teeth when swallowing, nail biting or grinding the teeth at night are worth mentioning at your child's visit.",
      ],
    },
    { type: 'heading', id: 'cavity-signs-and-treatment', text: 'Signs of a cavity, and how it is treated' },
    'Early decay often shows as chalky white spots or lines near the gums, especially on the upper front teeth. Later it turns brown or black and forms a hole. Also look out for:',
    {
      type: 'list',
      items: [
        'Pain when eating sweets, or with cold food and drinks',
        'Food getting stuck in one spot, or chewing only on one side',
        'A swelling or pimple-like bump on the gum near a tooth',
      ],
    },
    'Treatment depends on how deep the decay is. A small cavity can usually be repaired with a [tooth-coloured filling](/treatments/tooth-filling). If decay has reached the nerve of a milk tooth, nerve treatment (a simpler form of root canal treatment for milk teeth) may be needed, sometimes followed by a crown. A tooth too damaged to save may have to be removed, and if a back milk tooth is lost early, your dentist may suggest a space maintainer, a small appliance that holds the gap for the adult tooth.',
    { type: 'note', text: 'Milk teeth have thinner enamel than adult teeth, so decay can spread faster; do not wait for a decayed tooth to fall out. Facial swelling with fever, or a tooth injury, needs attention the same day. After a fall, check for a head injury first, and seek medical help straight away if your child is drowsy, vomiting or has fainted.' },
    { type: 'heading', id: 'tooth-and-jaw-development', text: 'Watching how the teeth and jaws develop' },
    'At each check-up, the dentist keeps an eye on how the teeth are coming in and how the jaws are growing. This helps spot crowding, a crossbite, teeth that are missing or late, and milk teeth that are not falling out when they should. An orthodontic check by around age seven is commonly advised; if your child may need straightening later, see [braces for children and adults](/treatments/braces).',
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
    'Every child is different, and teeth coming in a few months early or late is common.',
    { type: 'heading', id: 'kids-dentistry-cost', text: 'Kids dentistry cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Kids dentistry cost at Neudental',
      rows: [
        ['Kids dentistry', '{{price}}'],
        ['What changes the cost', 'Whether the visit is a check-up with advice or includes treatment such as a filling, how many teeth need care, and whether an X-ray is needed'],
        ['If more treatment is needed', 'Your dentist explains the plan and its cost before anything is started. Braces, if needed later, are a separate treatment with their own cost'],
        ['When you will know your cost', 'After your child has been examined, before any treatment starts'],
      ],
    },
  ],
  faqs: [
    { question: 'How much does kids dentistry cost at Neudental?', answer: 'At Neudental in Kodungaiyur, kids dentistry costs {{price}}. Where a visit falls in that range depends on whether it is a check-up with advice or includes treatment, and how many teeth need care. The exact cost is confirmed after your child is examined, before any treatment starts.' },
    { question: "How long will my child's dental appointment take?", answer: 'Most visits take {{duration}}. A first check-up for a young child is often at the shorter end. If several teeth need treatment, your dentist may plan it over a few short visits, so your child stays comfortable and cooperative.' },
    { question: 'Is it worth filling a cavity in a milk tooth?', answer: 'Usually, yes. Back milk teeth often stay until about 10 to 12 years of age, and untreated decay can cause pain, infection and early loss of the tooth, which can affect the adult tooth and the space it needs. If a tooth is about to fall out anyway, your dentist may advise simply watching it.' },
    { question: 'What should I do if my child knocks out a tooth?', answer: 'If it is a milk tooth, do not try to put it back, as this can harm the adult tooth underneath. If it is an adult tooth, hold it by the white crown, not the root, keep it in a little milk and see a dentist straight away. If you are unsure which it is, do the same.' },
    { question: "My child's adult teeth are coming in behind the milk teeth. Is that normal?", answer: 'It is common, especially with the lower front teeth. Often the milk tooth loosens and falls out on its own, and the adult tooth moves forward into place. If the milk tooth is still firm after a few weeks, or your child has pain or swelling, book a visit, as it may need to be removed.' },
    { question: 'Why does my child get cavities even though they brush?', answer: 'Brushing is only part of it. Frequent snacking on sweets, biscuits or juice, a bottle of milk at night, sticky foods and missed spots on the back teeth all raise the risk. Your dentist can look at your child\'s diet and brushing and suggest extra prevention if needed.' },
  ],
  relatedPosts: ['why-regular-checkups-matter'],
  relatedTreatments: ['checkup', 'filling', 'ortho', 'imaging'],
  datePublished: '2026-10-26',
};

export default guide;
