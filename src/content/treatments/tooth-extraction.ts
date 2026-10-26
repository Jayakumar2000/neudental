// Patient guide for /treatments/tooth-extraction. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
// Note: this treatment's priceRange is open-ended, so {{price}} reads
// "From ₹..." with a capital F. In running text, write "starts at
// {{startingPrice}}" instead; {{price}} is used in the cost table.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'tooth-extraction',
  seoTitle: 'Tooth Extraction in Kodungaiyur: Cost & Recovery | Neudental',
  metaDescription: "Tooth extraction at Neudental, Kodungaiyur: when a tooth can't be saved, simple vs surgical removal, aftercare, healing and cost from {{startingPrice}}.",
  headline: 'Tooth Extraction in Kodungaiyur, Chennai',
  answer: 'Tooth extraction is the removal of a tooth that is too damaged, decayed or infected to be saved. It is done under local anaesthesia, either as a simple extraction or, for a broken or hard-to-reach tooth, a surgical one. A straightforward extraction usually takes {{duration}}. At Neudental in Kodungaiyur it starts at {{startingPrice}}; the exact cost depends on the tooth and is confirmed after an examination.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'when-is-extraction-needed', text: 'When does a tooth need to be removed?' },
    'Your dentist will always try to save a natural tooth first, because it is usually worth keeping. Extraction is advised when a tooth cannot be repaired, or when keeping it would put the rest of your mouth at risk. Common reasons include:',
    {
      type: 'list',
      items: [
        'Decay so deep, or a break so far below the gum, that a filling or crown cannot rebuild the tooth',
        'An infection that root canal treatment cannot clear, or a root-canal-treated tooth that has become infected again and cannot be retreated',
        'A crack that runs down into the root',
        'Advanced gum disease that has destroyed the bone around a tooth, leaving it very loose',
        'Crowding, when removing a tooth is part of a braces plan to make space',
      ],
    },
    'Wisdom teeth are a different case: they often get stuck under the gum or grow at an angle, and they need their own assessment. If the problem is at the very back of your mouth, see [wisdom tooth removal](/treatments/wisdom-tooth-removal).',
    { type: 'heading', id: 'save-or-extract', text: 'Can the tooth be saved instead?' },
    'A painful or infected tooth does not automatically need to come out. Many can be saved with [root canal treatment](/treatments/root-canal-treatment), often followed by a crown. Extraction ends the problem quickly, but it leaves a gap that usually needs replacing later, which often costs more and takes longer than keeping the tooth.',
    'Dr. Swetha looks at how much healthy tooth is left, the root and the bone around it, and your gums, and explains clearly whether the tooth can be saved. If it cannot, extraction is usually the right choice, because leaving a badly infected tooth in place can let the infection spread.',
    { type: 'heading', id: 'simple-or-surgical', text: 'Simple or surgical extraction: what is the difference?' },
    'Neudental offers both kinds of extraction. Which one you need depends on the tooth, and your dentist will decide after examining it and checking the X-ray.',
    {
      type: 'list',
      items: [
        '**Simple extraction:** for a tooth that is fully visible above the gum and still in one piece. After numbing, the tooth is gently loosened and lifted out.',
        '**Surgical extraction:** for a tooth that has broken off at the gum line, has long, curved or fragile roots, or has not fully come through the gum. A small opening is made in the gum, and the tooth may be divided into pieces so it can be removed with less force. A few stitches are often placed afterwards.',
      ],
    },
    'A surgical extraction takes longer and can mean a little more swelling for the first few days, but it is still done under local anaesthesia, so you should feel pressure rather than pain.',
    { type: 'heading', id: 'extraction-procedure', text: 'How a tooth is extracted at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Examination and X-ray', text: 'Dr. Swetha examines the tooth and takes an X-ray to see the roots and the bone around them. She explains why the tooth needs to come out, whether it will be a simple or surgical extraction, and what it will cost.' },
        { title: 'Your health and medicines', text: 'Tell your dentist about conditions such as diabetes, heart problems or a bleeding disorder, whether you are pregnant, and every medicine you take, especially blood thinners. Some need planning before an extraction. Never stop a medicine on your own.' },
        { title: 'Local anaesthesia', text: 'The tooth and the gum around it are numbed. You will feel pressure and pushing, but not sharp pain. If you feel anything sharp, tell the dentist so more anaesthetic can be given.' },
        { title: 'Removing the tooth', text: 'Fine instruments gently widen the socket and loosen the tooth from the ligament that holds it in the bone, and the tooth is lifted out. In a surgical extraction, the gum is opened first and the tooth may come out in sections.' },
        { title: 'Cleaning and closing', text: 'The empty socket is checked and cleaned. If stitches are needed, they are placed now, and your dentist will tell you whether they dissolve on their own or need removing at a later visit.' },
        { title: 'Gauze and healing guidance', text: 'You bite on a gauze pad to control bleeding while a blood clot forms in the socket. Before you leave, you are told how to care for the area and what is normal while it heals.' },
      ],
    },
    'A straightforward extraction usually takes {{duration}}, including the time for the anaesthetic to work, and is done in one visit. A surgical extraction can take longer. If the area is very swollen or infected, your dentist will advise whether to remove the tooth straight away or settle the infection first.',
    { type: 'heading', id: 'extraction-cost', text: 'Tooth extraction cost in Kodungaiyur' },
    'Tooth extraction at Neudental starts at {{startingPrice}}. The final cost depends on how complex the extraction is, and you will know it before the tooth is removed.',
    {
      type: 'table',
      caption: 'Tooth extraction cost at Neudental',
      rows: [
        ['Tooth extraction', '{{price}}'],
        ['What changes the cost', 'Whether it is a simple or surgical extraction, which tooth it is and how many roots it has, whether the tooth is broken at or below the gum line, and how many teeth are removed'],
        ['Replacing the tooth', 'A separate treatment, if you choose one. Each option has its own page and price'],
        ['When you will know your cost', 'After the examination and X-ray, before the extraction starts'],
      ],
    },
    { type: 'heading', id: 'aftercare', text: 'Aftercare in the first 24 to 48 hours' },
    'The blood clot that forms in the socket protects the bone underneath and is the start of healing. Most aftercare is about keeping that clot in place.',
    {
      type: 'list',
      items: [
        'Keep biting firmly on the gauze for as long as your dentist advises. A little oozing or pink saliva for the rest of the day is normal.',
        'For the first 24 hours, do not rinse your mouth, spit forcefully or drink through a straw, as these can dislodge the clot.',
        'Wait until the numbness wears off before eating. Then choose soft, lukewarm food such as curd rice, idli or mashed vegetables, and chew on the other side. Avoid very hot, spicy or crunchy food for the first few days.',
        'Do not smoke, chew tobacco or paan, or drink alcohol for at least the first 48 hours. They slow healing and raise the risk of dry socket.',
        'Rest for the day and avoid heavy exercise. An extra pillow to keep your head raised on the first night can help.',
        'A cold pack held against the cheek, on and off, during the first day can reduce swelling.',
        'From the next day, rinse gently with warm salt water after meals, unless your dentist advises otherwise. Keep brushing your other teeth, taking care around the socket.',
        'Take only the pain relief your dentist advises, and take any prescribed medicine exactly as directed.',
        'If bleeding starts again, place a fresh folded gauze pad over the socket and bite down firmly for about half an hour.',
      ],
    },
    { type: 'heading', id: 'healing', text: 'How long does healing take, and what is normal?' },
    'Soreness and swelling are usually at their worst in the first two or three days and then ease steadily. The gum usually closes over the socket within a few weeks, while the bone underneath fills in over the following months. A surgical extraction may take a little longer to settle.',
    'The main problem to watch for is **dry socket**, where the clot is lost too early and the bone is left exposed. It usually shows up a few days after the extraction as pain that gets worse instead of better, sometimes spreading towards the ear, often with a bad taste or smell. It is not usually serious, but it is painful, and your dentist can clean and dress the socket to ease it, so call rather than waiting it out.',
    'Call the clinic if you notice:',
    {
      type: 'list',
      items: [
        'Bleeding that does not slow down after biting on gauze for half an hour',
        'Pain or swelling that gets worse after the third day instead of better',
        'Fever, pus, or a bad taste that does not go away',
        'Numbness of the lip, chin or tongue that lasts long after the anaesthetic should have worn off',
      ],
    },
    { type: 'note', text: 'If you have difficulty breathing or swallowing, or swelling that spreads quickly across your face or neck, go to a hospital emergency department straight away.' },
    { type: 'heading', id: 'replacing-the-tooth', text: 'Should you replace an extracted tooth?' },
    'A gap may not bother you at first, but over time the teeth beside it can tilt into the space, the opposite tooth can drift towards it, and chewing on that side gets harder. The jawbone where the tooth used to be also slowly shrinks. A missing tooth is usually worth replacing, especially one that shows when you smile or that you chew with. Not every gap needs filling, for example at the very back of the mouth, and your dentist will advise.',
    'There are three main ways to replace a tooth, all offered at Neudental: a [dental implant](/treatments/dental-implants), a [fixed bridge](/treatments/dental-crowns-and-bridges) or a [denture](/treatments/dentures).',
    {
      type: 'table',
      caption: 'Ways to replace an extracted tooth',
      rows: [
        ['Dental implant', 'A titanium post placed in the jawbone, with a crown on top. It stands on its own without relying on the teeth beside it, and helps preserve the bone. Treatment takes a few months.'],
        ['Fixed bridge', 'A false tooth held by crowns on the teeth either side of the gap. It is cemented in and needs no surgery, but the neighbouring teeth have to be shaped for the crowns.'],
        ['Denture', 'A removable plate carrying one or more false teeth. It can replace several missing teeth at once and is taken out for cleaning.'],
        ['Which one suits you', 'It depends on how many teeth are missing, the health of the neighbouring teeth, gums and bone, and your budget. Your dentist will go through the options with you.'],
      ],
    },
    'Ask about replacement before or at your extraction visit, so you know the plan and the timing in advance.',
  ],
  faqs: [
    { question: 'How much does a tooth extraction cost at Neudental?', answer: 'Tooth extraction at Neudental in Kodungaiyur starts at {{startingPrice}}. A surgical extraction, a tooth broken at the gum line or a tooth with several curved roots costs more than a simple one. The exact cost is explained after the examination and X-ray, before anything is done.' },
    { question: 'How long does a tooth extraction take?', answer: 'A straightforward extraction usually takes {{duration}}, including the time for the anaesthetic to work, and is done in one visit. A surgical extraction can take longer. You may be asked to come back briefly so the dentist can check healing or remove stitches.' },
    { question: 'Does having a tooth pulled out hurt?', answer: 'The tooth and gum are numbed with local anaesthesia, so you should feel pressure and movement but not sharp pain. Some soreness for a few days afterwards is normal and usually settles with the pain relief your dentist advises.' },
    { question: 'Is it better to extract a tooth or get a root canal?', answer: 'If the tooth can be restored, saving it with a root canal is usually the better long-term choice, because replacing a missing tooth later costs more and takes longer. If the tooth is too damaged or the infection too advanced, extraction is the right step.' },
    { question: 'Can I go to work after a tooth extraction?', answer: 'Many people return to desk work the next day, and some the same day after a simple extraction. Avoid heavy physical work and exercise for a day or two, and allow a little longer after a surgical extraction. Your dentist will advise for your case.' },
    { question: 'What if I am pregnant, diabetic or on blood thinners?', answer: 'Tell your dentist before treatment. An extraction can often still be done with the right planning, but the timing or precautions may change, and your dentist may check with your doctor first. Do not stop any medicine on your own.' },
    { question: 'How soon can a missing tooth be replaced after extraction?', answer: 'It depends on the option and on how the area heals. Some replacements can be planned within weeks, while an implant usually waits until the bone is ready, which can take a few months. Your dentist will advise the timing for you.' },
  ],
  relatedPosts: ['root-canal-treatment-does-it-hurt'],
  relatedTreatments: ['extraction', 'rct', 'implants', 'crowns-bridges'],
  datePublished: '2026-10-26',
};

export default guide;
