// Patient guide for /treatments/wisdom-tooth-removal. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
// This treatment's priceRange is open-ended, so {{price}} reads "From ₹..."
// with a capital F: running text says "starts at {{startingPrice}}" instead,
// and {{price}} is used in the cost table.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'extraction',
  seoTitle: 'Wisdom Tooth Removal in Kodungaiyur: Cost & Care | Neudental',
  metaDescription: 'Impacted wisdom tooth removal at Neudental, Kodungaiyur: symptoms, X-ray assessment, the procedure, dry socket care and cost (from {{startingPrice}}).',
  headline: 'Impacted Wisdom Tooth Removal in Kodungaiyur, Chennai',
  answer: 'An impacted wisdom tooth is a back molar stuck partly or fully in the gum or jawbone, usually because there is not enough room. If it causes pain, swollen gums, infection or decay in the next tooth, removal is usually advised. After an examination and X-ray, it is removed under local anaesthesia, usually in {{duration}}. At Neudental in Kodungaiyur, removal starts at {{startingPrice}}.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-an-impacted-wisdom-tooth', text: 'What is an impacted wisdom tooth?' },
    'Wisdom teeth (third molars) are the last molars at the back of the mouth, usually coming through between the late teens and mid-twenties. By then the jaw often has no room left, so one may come through only partly, or stay stuck under the gum or in the bone. Such a tooth is called **impacted**. It may be:',
    {
      type: 'list',
      items: [
        '**Partly erupted:** part of the tooth shows, with a flap of gum over the rest',
        '**Fully impacted:** the tooth stays under the gum or inside the jawbone',
        '**Angled:** tilted into the tooth in front, tilted backwards, or lying on its side',
      ],
    },
    { type: 'heading', id: 'symptoms-of-an-impacted-wisdom-tooth', text: 'What are the symptoms of an impacted wisdom tooth?' },
    'Many impacted wisdom teeth cause no trouble. Problems usually start when one is partly through, because food and bacteria collect under the gum flap where a toothbrush cannot reach. Watch for:',
    {
      type: 'list',
      items: [
        'Pain at the back of the jaw, sometimes felt in the ear',
        'Swollen, red or tender gum behind your last tooth',
        'A bad taste or bad breath that keeps coming back',
        'Difficulty opening your mouth, or pain while chewing or swallowing',
        'Swelling of the cheek or jaw on one side',
      ],
    },
    { type: 'note', text: 'Infection of the gum flap over a partly erupted wisdom tooth is called **pericoronitis**, and it often comes back. A fever with a swollen face needs to be seen by a dentist the same day. If swelling spreads towards your eye or neck, or you have difficulty swallowing or breathing, go to the nearest hospital emergency department straight away.' },
    { type: 'heading', id: 'does-every-wisdom-tooth-need-removal', text: 'Does every wisdom tooth need to come out?' },
    'No. A wisdom tooth that has come through fully and can be kept clean may never need treatment, and one buried deep without causing harm is often simply monitored at your [regular check-ups](/treatments/dental-checkup). Removal is usually advised when an impacted tooth causes repeated or severe pericoronitis, has decay that cannot be repaired, is damaging the gum, bone or tooth in front of it, or has a cyst forming around it.',
    "To decide, [Dr. Swetha](/dr-swetha) examines the area and takes an X-ray, often a full-mouth OPG scan, to see the tooth's depth, angle and roots, and how close it lies to the nerve in the lower jaw or the sinus above the upper back teeth. If it sits very close to the nerve, a 3D scan (CBCT) or an oral surgeon's opinion may be advised.",
    { type: 'heading', id: 'how-wisdom-tooth-removal-is-done', text: 'What happens during wisdom tooth extraction at Neudental?' },
    {
      type: 'steps',
      items: [
        { title: 'Planning', text: 'Your dentist explains the removal, its risks and the recovery. Mention any medical condition, pregnancy or medicines you take, especially blood thinners, and do not stop any medicine on your own.' },
        { title: 'Local anaesthesia', text: 'The area is numbed with an injection. You stay awake and should feel pressure, not sharp pain. If anything hurts, tell your dentist so more anaesthetic can be given.' },
        { title: 'Reaching and removing the tooth', text: 'If gum or bone covers the tooth, a small cut is made in the gum and a little bone may be removed. An angled tooth is often divided into pieces, so it comes out with less force.' },
        { title: 'Cleaning and closing', text: 'The socket is cleaned, stitches may be placed, and you bite on gauze to control the bleeding.' },
        { title: 'Post-care instructions', text: 'You are told how to eat, clean and manage pain over the next few days, and whether you need a review visit.' },
      ],
    },
    'The removal itself usually takes {{duration}}, though a deeply impacted tooth, especially a lower one, can take longer. If your stitches need taking out, a short review may be advised about a week later. If several wisdom teeth need removing, your dentist will advise whether to do them together or separately.',
    { type: 'heading', id: 'wisdom-tooth-removal-cost', text: 'Wisdom tooth removal cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Impacted wisdom tooth removal cost at Neudental',
      rows: [
        ['Impacted wisdom tooth removal', '{{price}}'],
        ['What changes the cost', 'How deep the tooth sits, its angle and roots, whether bone needs removing or the tooth dividing, and how many teeth are removed'],
        ['X-ray or OPG scan', 'Usually needed first to plan the removal. See [dental X-rays and OPG scans](/treatments/dental-x-ray)'],
        ['When you will know your cost', 'After the examination and X-ray, before the tooth is removed'],
      ],
    },
    'Removing an impacted wisdom tooth is usually more involved than a routine extraction. For other teeth that cannot be saved, see [tooth extraction](/treatments/tooth-extraction).',
    { type: 'heading', id: 'recovery-after-wisdom-tooth-removal', text: 'How long does recovery take after wisdom tooth removal?' },
    'Expect soreness for a few days. Swelling and jaw stiffness usually peak on the second or third day and then ease, while the gum takes a few weeks to heal fully. To help it settle:',
    {
      type: 'list',
      items: [
        'Bite firmly on the gauze for as long as your dentist advises. Slight oozing on the first day is normal.',
        'On the first day, hold a cold pack, wrapped in a cloth, against your cheek on and off.',
        'Once the numbness wears off, eat soft, lukewarm food and chew on the other side.',
        'Rest with your head raised, and avoid heavy exercise for the first day or two.',
        'Take only the pain relief your dentist advises.',
        'From the next day, rinse gently with warm salt water after meals if your dentist advises it, and keep brushing your other teeth, gently near the socket.',
      ],
    },
    { type: 'heading', id: 'how-to-prevent-dry-socket', text: 'How to prevent dry socket' },
    '**Dry socket** happens when the blood clot that protects the healing socket is lost or breaks down too early, leaving the bone exposed. It usually shows up two to four days after removal as pain that gets worse instead of better, often spreading to the ear, with a bad taste. It is more common after lower wisdom teeth and in smokers. To protect the clot:',
    {
      type: 'list',
      items: [
        'Do not smoke or use tobacco, including paan or gutka, for at least the first few days.',
        'Do not spit forcefully or rinse hard for the first 24 hours, and avoid drinking through a straw for the first few days.',
        'Avoid very hot drinks, such as tea or coffee, on the first day.',
        'Keep your tongue and fingers away from the socket.',
      ],
    },
    'If you think you have dry socket, call the clinic. Your dentist can clean the socket and place a soothing dressing, which usually brings relief.',
    { type: 'heading', id: 'risks-and-when-to-call', text: 'Possible risks, and when to call the clinic' },
    'Like any surgery, wisdom tooth removal carries some risks. Besides swelling, soreness and dry socket, the socket can occasionally become infected. Lower wisdom teeth lie near the nerves that give feeling to the lip, chin and tongue, so these can feel numb or tingly afterwards, more often when the tooth sits close to a nerve. This is uncommon and usually temporary, but in rare cases it can be long-lasting or permanent. Your dentist will explain your own risks, based on your X-ray, before you decide. Call the clinic if you have:',
    {
      type: 'list',
      items: [
        'Bleeding that does not slow after pressing firmly on gauze for about half an hour',
        'Pain or swelling that gets worse after the third day',
        'Fever, pus or a foul taste from the socket',
        'Numbness that continues the day after the removal',
      ],
    },
    'If swelling spreads towards your eye or neck, or you have difficulty swallowing or breathing, go to a hospital emergency department straight away.',
  ],
  faqs: [
    { question: 'How much does impacted wisdom tooth removal cost at Neudental?', answer: 'At Neudental in Kodungaiyur, impacted wisdom tooth removal starts at {{startingPrice}}. The final cost depends on how deep and angled the tooth is, whether bone needs removing or the tooth dividing, and how many teeth are taken out. It is confirmed after your examination and X-ray, before treatment starts.' },
    { question: 'How long does it take to remove a wisdom tooth?', answer: 'The removal usually takes {{duration}}, plus a little time for the anaesthetic to work and for your aftercare instructions. A deeply buried or sideways tooth can take longer. It is usually done in one visit, sometimes with a short review about a week later to check healing or remove stitches.' },
    { question: 'Will I be awake during wisdom tooth removal?', answer: 'Yes. The tooth is removed under local anaesthesia, so you stay awake while the area is numb. You should feel pressure, not sharp pain. If you feel nervous, tell your dentist beforehand; knowing what to expect at each step often helps.' },
    { question: 'When can I go back to work or college?', answer: 'Many people return within a few days, depending on their work and how the tooth came out. Swelling is usually greatest around the second or third day, so plan a quieter few days, and avoid heavy exercise until your dentist says it is fine.' },
    { question: 'What can I eat after wisdom tooth removal?', answer: 'Once the numbness wears off, choose soft, lukewarm food such as curd rice, idli, pongal, khichdi or mashed vegetables. Avoid hot, spicy, crunchy or hard food, like chips, nuts or murukku, for the first few days, chew on the other side, and avoid using a straw.' },
    { question: 'Should I remove a wisdom tooth that does not hurt?', answer: 'Not always. A wisdom tooth that does not hurt can still cause hidden problems, such as decay or gum pockets around the tooth in front of it, which show up only on an examination and X-ray. If nothing like that is found, it can usually be left and checked at your regular visits.' },
    { question: 'Can a swollen wisdom tooth be removed straight away?', answer: 'Sometimes. If the gum is badly infected or you cannot open your mouth well, your dentist may first clean the area and treat the infection, then remove the tooth once the swelling settles. Do not ignore it when the pain eases, as pericoronitis often comes back.' },
  ],
  relatedTreatments: ['imaging', 'tooth-extraction', 'checkup'],
  datePublished: '2026-10-26',
};

export default guide;
