// Patient guide for /treatments/wisdom-tooth-removal. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'extraction',
  seoTitle: 'Wisdom Tooth Removal in Kodungaiyur: Cost & Care | Neudental',
  metaDescription: 'Impacted wisdom tooth removal at Neudental, Kodungaiyur: symptoms, X-ray assessment, the procedure, dry socket care and cost (from {{startingPrice}}).',
  headline: 'Impacted Wisdom Tooth Removal in Kodungaiyur, Chennai',
  answer: 'An impacted wisdom tooth is a back molar stuck partly or fully under the gum because the jaw lacks room. It can cause pain, swollen gums, infection or decay in the next tooth, and removal is then usually advised. After an examination and X-ray, it is removed under local anaesthesia, usually in {{duration}}. At Neudental in Kodungaiyur, removal starts at {{startingPrice}}, depending on how the tooth lies.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-an-impacted-wisdom-tooth', text: 'What is an impacted wisdom tooth?' },
    'Wisdom teeth are the third and last molars at the very back of the mouth. They usually come through between the late teens and mid-twenties, long after the other adult teeth. By then there is often not enough room left in the jaw, so a wisdom tooth may come through only partly, or stay stuck under the gum or in the bone. A tooth that cannot reach its normal place is called **impacted**.',
    'An impacted wisdom tooth may be:',
    {
      type: 'list',
      items: [
        '**Partly erupted:** part of the tooth shows, with a flap of gum still covering the rest',
        '**Fully impacted:** the tooth stays completely under the gum or inside the jaw bone',
        '**Angled:** tilted forwards into the tooth in front, tilted backwards, or lying on its side in the jaw',
      ],
    },
    'Some people have all four wisdom teeth, some have fewer and some have none. Lower wisdom teeth get stuck more often than upper ones.',
    { type: 'heading', id: 'symptoms-of-an-impacted-wisdom-tooth', text: 'Symptoms of an impacted wisdom tooth' },
    'Many impacted wisdom teeth cause no trouble for years. Problems usually start when the tooth is partly through the gum, because food and bacteria collect under the gum flap where a toothbrush cannot reach. Common signs include:',
    {
      type: 'list',
      items: [
        'Pain or a dull ache at the back of the jaw, sometimes felt in the ear or the side of the head',
        'Swollen, red or tender gum behind your last tooth',
        'A bad taste or bad breath that keeps coming back',
        'Difficulty opening your mouth fully, or pain while chewing or swallowing',
        'Swelling of the cheek or jaw on one side',
        'Food getting stuck behind your last molar, or decay in that tooth',
      ],
    },
    { type: 'note', text: 'Infection of the gum flap over a partly erupted wisdom tooth is called **pericoronitis**. It often settles and then flares up again. If swelling spreads towards your eye or neck, or you have a fever or difficulty swallowing or breathing, go to the nearest hospital emergency department straight away.' },
    { type: 'heading', id: 'does-every-wisdom-tooth-need-removal', text: 'Does every wisdom tooth need to come out?' },
    'No. A wisdom tooth that has come through fully, bites properly and can be kept clean may never need treatment. One that is completely buried and causing no harm is often monitored on X-rays at your [regular check-ups](/treatments/dental-checkup) instead.',
    'Removal is usually advised when an impacted wisdom tooth:',
    {
      type: 'list',
      items: [
        'Causes repeated bouts of pericoronitis',
        'Has decay that cannot be repaired, or is causing decay in the tooth in front',
        'Is causing gum problems or bone loss around the neighbouring molar',
        'Is linked with a cyst or another change in the jaw seen on an X-ray',
      ],
    },
    "To decide, [Dr. Swetha](/dr-swetha) examines the area and takes an X-ray, often a full-mouth OPG scan. It shows the tooth's position, depth and angle, the shape of its roots, and how close it lies to the nerve in the lower jaw or the sinus above the upper teeth. Read more about [dental X-rays and OPG scans](/treatments/dental-x-ray). If a tooth sits very close to the nerve, a 3D scan (CBCT) or an oral surgeon's opinion may be advised.",
    { type: 'heading', id: 'how-wisdom-tooth-removal-is-done', text: 'How an impacted wisdom tooth is removed at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Assessment and planning', text: 'Your dentist checks the tooth, the gum and your X-ray, and explains how the tooth will be removed and what recovery involves. Tell your dentist about any medical condition, pregnancy or medicines you take, especially blood thinners, and do not stop any medicine on your own.' },
        { title: 'Treating infection first, if needed', text: 'If the gum around the tooth is badly infected or you cannot open your mouth well, the area may be cleaned and treated first, and the tooth removed once the swelling settles.' },
        { title: 'Local anaesthesia', text: 'The tooth and the gum around it are numbed with an injection. You stay awake and should feel pressure and pushing, but not sharp pain. If anything hurts, tell your dentist so more anaesthetic can be given.' },
        { title: 'Reaching and removing the tooth', text: 'If the tooth is covered by gum or bone, a small cut is made in the gum and, where needed, a little bone around the tooth is removed. A tooth lying at an angle is often divided into smaller pieces, so it can come out through a smaller opening with less force.' },
        { title: 'Cleaning and closing', text: 'The socket is cleaned, and stitches may be placed to help the gum heal. You bite on a gauze pad to control the bleeding.' },
        { title: 'Post-care instructions', text: 'Before you leave, you are told how to eat, clean and manage pain over the next few days, and whether you need a review visit.' },
      ],
    },
    'The removal itself usually takes {{duration}}. A deeply impacted lower tooth can take longer, while upper wisdom teeth are often simpler to remove. You may need an assessment visit before the removal, and a short review about a week later if your stitches need to be taken out. If more than one wisdom tooth needs removing, your dentist will advise whether to remove them together or at separate visits.',
    { type: 'heading', id: 'wisdom-tooth-removal-cost', text: 'Wisdom tooth removal cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Impacted wisdom tooth removal cost at Neudental',
      rows: [
        ['Impacted wisdom tooth removal', '{{price}}'],
        ['What changes the cost', 'How deep the tooth sits (partly through the gum or fully in bone), its angle, the shape of its roots, whether bone needs to be removed or the tooth divided, and how many teeth are removed'],
        ['X-ray or OPG scan', 'Usually needed first to plan the removal. See [dental X-rays and OPG scans](/treatments/dental-x-ray)'],
        ['When you will know your cost', 'After the examination and X-ray, before the tooth is removed'],
      ],
    },
    'Removing an impacted wisdom tooth is usually more involved than a routine extraction. For other teeth, such as a broken or badly decayed tooth that cannot be saved, see [tooth extraction](/treatments/tooth-extraction).',
    { type: 'heading', id: 'recovery-after-wisdom-tooth-removal', text: 'Recovery after wisdom tooth removal' },
    'Most people feel sore for a few days. Swelling and jaw stiffness are usually worst on the second or third day and then ease, and some people get mild bruising on the cheek. Many return to work or college within a few days, while the gum takes a few weeks to heal fully.',
    'In the first 24 hours:',
    {
      type: 'list',
      items: [
        'Keep biting gently on the gauze for as long as your dentist advises. A little oozing or pink saliva on the first day is normal.',
        'Hold a cold pack, wrapped in a cloth, against your cheek on and off to limit swelling.',
        'Once the numbness wears off, eat soft, lukewarm food such as curd rice or idli, and chew on the other side.',
        'Rest with your head raised, and avoid heavy exercise.',
        'Take only the pain relief your dentist advises.',
      ],
    },
    'From the next day, rinse gently with warm salt water after meals if your dentist advises it, and brush your other teeth as usual, taking care around the area.',
    { type: 'heading', id: 'how-to-prevent-dry-socket', text: 'How to prevent dry socket' },
    'After the tooth is removed, a blood clot forms in the socket and protects the bone while it heals. If the clot is dislodged or breaks down too early, the bone is left exposed. This is called **dry socket**. It usually shows up two to four days after removal as pain that gets worse instead of better, often spreading to the ear, with a bad taste or smell. It is more common after lower wisdom teeth and in people who smoke.',
    {
      type: 'list',
      items: [
        'Do not smoke or use tobacco for at least the first few days; the longer you stay off it, the better the socket heals.',
        'Do not drink through a straw, spit forcefully or rinse hard for the first 24 hours.',
        'Avoid very hot drinks, such as hot tea or coffee, on the first day.',
        'Keep your tongue and fingers away from the socket.',
      ],
    },
    'Dry socket is not usually an infection, but it is painful. If you think you have it, call the clinic. Your dentist can clean the socket and place a soothing dressing, which usually brings relief.',
    { type: 'heading', id: 'risks-and-when-to-call', text: 'Possible risks, and when to call the clinic' },
    'Wisdom tooth removal is a common procedure, but like any surgery it carries some risks. Besides swelling, soreness and dry socket, the socket can occasionally become infected. When a lower wisdom tooth lies close to the nerve, the lip, chin or tongue may feel numb or tingly afterwards; this is uncommon and usually temporary, but rarely lasts longer. Removing an upper wisdom tooth can occasionally affect the sinus above it. Your dentist will explain your own risks from your X-ray before you decide.',
    'Call the clinic if you have:',
    {
      type: 'list',
      items: [
        'Bleeding that does not slow after pressing firmly on gauze for about half an hour',
        'Pain or swelling that gets worse after the third day',
        'Fever, pus, or a foul taste from the socket',
        'Numbness that continues the day after the removal',
      ],
    },
  ],
  faqs: [
    { question: 'How much does impacted wisdom tooth removal cost at Neudental?', answer: 'At Neudental in Kodungaiyur, impacted wisdom tooth removal starts at {{startingPrice}}. The final cost depends on how deep and angled the tooth is, whether bone needs removing or the tooth dividing, and how many teeth are taken out. It is confirmed after your examination and X-ray, before treatment starts.' },
    { question: 'How long does it take to remove a wisdom tooth?', answer: 'The removal usually takes {{duration}}, plus a little time for the anaesthetic to work and for your aftercare instructions. A deeply buried or sideways tooth can take longer. Your dentist will give you an idea of the time after looking at your X-ray.' },
    { question: 'Will I be awake during wisdom tooth removal?', answer: 'Yes. The tooth is removed under local anaesthesia, so you stay awake while the area is numb. You should feel pressure, not sharp pain. If you are nervous, tell your dentist beforehand; you can ask to pause at any time during the procedure.' },
    { question: 'When can I go back to work or college?', answer: 'Many people return within a few days, depending on their work and how the tooth came out. Swelling is usually greatest around the second or third day, so plan a quieter few days, and avoid heavy exercise until your dentist says it is fine.' },
    { question: 'What can I eat after wisdom tooth removal?', answer: 'Once the numbness wears off, choose soft, lukewarm food such as curd rice, idli, pongal, khichdi or mashed vegetables. Avoid hot, spicy, crunchy or hard food, like chips, nuts or murukku, for the first few days, chew on the other side, and do not use a straw.' },
    { question: 'Should I remove a wisdom tooth that does not hurt?', answer: 'Not always. A healthy wisdom tooth that has come through fully, or one buried deep without causing harm, can often be left and checked at regular visits. Removal may still be advised if an X-ray shows decay, gum problems or damage to the tooth in front.' },
    { question: 'Can a swollen wisdom tooth be removed straight away?', answer: 'Sometimes. If the gum is badly infected or you cannot open your mouth well, your dentist may first clean the area and treat the infection, then remove the tooth once the swelling settles. Do not ignore it when the pain eases, as pericoronitis often comes back.' },
  ],
  relatedTreatments: ['imaging', 'tooth-extraction', 'checkup'],
  datePublished: '2026-10-26',
};

export default guide;
