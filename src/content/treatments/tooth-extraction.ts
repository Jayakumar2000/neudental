// Patient guide for /treatments/tooth-extraction. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
// This treatment's priceRange is open-ended, so {{price}} reads "From ₹..."
// with a capital F: running text says "starts at {{startingPrice}}" instead,
// and {{price}} is used in the cost table.
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
    'Your dentist will try to save a natural tooth first. Extraction is advised when a tooth cannot be repaired, or when keeping it would put the rest of your mouth at risk, for example:',
    {
      type: 'list',
      items: [
        'Decay or a break so deep that a filling or crown cannot rebuild the tooth',
        'An infection that root canal treatment cannot clear',
        'A crack that runs down into the root',
        'Advanced gum disease that has left a tooth very loose',
        'Crowding, when removing a tooth is part of a braces plan',
      ],
    },
    'Wisdom teeth often get stuck under the gum or grow at an angle, and need their own assessment. For those, see [wisdom tooth removal](/treatments/wisdom-tooth-removal).',
    { type: 'heading', id: 'save-or-extract', text: 'Can the tooth be saved instead?' },
    'A painful or infected tooth does not automatically need to come out. Many can be saved with [root canal treatment](/treatments/root-canal-treatment), often followed by a crown. Extraction ends the problem quickly, but it leaves a gap that usually needs replacing later, which often costs more and takes longer than keeping the tooth.',
    'Dr. Swetha checks the tooth, root, bone and gums and explains whether it can be saved. If not, extraction is usually the right choice, as a badly infected tooth left in place can spread the infection.',
    { type: 'heading', id: 'simple-or-surgical', text: 'Simple or surgical extraction: what is the difference?' },
    'Neudental offers both, under local anaesthesia. Your dentist decides which you need after the examination and X-ray.',
    {
      type: 'list',
      items: [
        '**Simple extraction:** for a tooth that is fully visible above the gum and in one piece. It is gently loosened and lifted out.',
        '**Surgical extraction:** for a tooth broken at the gum line, with long or curved roots, or not fully through the gum. A small opening is made in the gum, the tooth may be removed in pieces, and a few stitches are often placed.',
      ],
    },
    'A surgical extraction takes longer and may cause a little more swelling for a few days.',
    { type: 'heading', id: 'extraction-procedure', text: 'How a tooth is extracted at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Examination and X-ray', text: 'Dr. Swetha examines the tooth, takes an X-ray of the roots and bone, and explains the plan and the cost.' },
        { title: 'Your health and medicines', text: 'Tell your dentist about diabetes, heart problems, bleeding disorders, pregnancy and every medicine you take, especially blood thinners. Never stop a medicine on your own.' },
        { title: 'Local anaesthesia', text: 'The tooth and gum are numbed. You will feel pressure, but not sharp pain; if anything feels sharp, say so and more anaesthetic can be given.' },
        { title: 'Removing the tooth', text: 'The tooth is gently loosened from the ligament that holds it in the bone and lifted out. In a surgical extraction, the gum is opened first.' },
        { title: 'Cleaning and closing', text: 'The socket is checked and cleaned, and stitches are placed if needed.' },
        { title: 'Gauze and healing guidance', text: 'You bite on gauze while a blood clot forms, and are told how to care for the area as it heals.' },
      ],
    },
    'A straightforward extraction usually takes {{duration}} in a single visit; a surgical one can take longer. If the area is very swollen, your dentist will advise whether to remove the tooth straight away or settle the infection first.',
    { type: 'heading', id: 'extraction-cost', text: 'Tooth extraction cost in Kodungaiyur' },
    'Tooth extraction at Neudental starts at {{startingPrice}}. You will know your exact cost before the tooth is removed.',
    {
      type: 'table',
      caption: 'Tooth extraction cost at Neudental',
      rows: [
        ['Tooth extraction', '{{price}}'],
        ['What changes the cost', 'Simple or surgical extraction, which tooth it is and how many roots it has, whether it is broken below the gum line, and how many teeth are removed'],
        ['Replacing the tooth', 'A separate treatment, if you choose one'],
        ['When you will know your cost', 'After the examination and X-ray, before the extraction starts'],
      ],
    },
    { type: 'heading', id: 'aftercare', text: 'Aftercare in the first 24 to 48 hours' },
    'The blood clot in the socket protects the bone, so most aftercare is about keeping it in place.',
    {
      type: 'list',
      items: [
        'Keep biting on the gauze for as long as your dentist advises. Slight oozing for the rest of the day is normal.',
        'For the first 24 hours, do not rinse, spit forcefully or use a straw.',
        'Once the numbness wears off, eat soft, lukewarm food such as curd rice or idli on the other side. Avoid hot, spicy or crunchy food for a few days.',
        'Avoid smoking, tobacco, paan and alcohol for at least 48 hours; they slow healing and raise the risk of dry socket.',
        'Rest, skip heavy exercise, and use a cold pack on the cheek, on and off, on the first day.',
        'From the next day, rinse gently with warm salt water after meals, unless advised otherwise, and keep brushing your other teeth.',
        'Take only the pain relief your dentist advises, and any prescribed medicine exactly as directed.',
      ],
    },
    { type: 'heading', id: 'healing', text: 'How long does healing take?' },
    'Soreness and swelling usually peak in the first two or three days, then ease. The gum usually closes over within a few weeks, and the bone underneath fills in over the following months.',
    'Watch for **dry socket**, where the clot is lost early and the bone is exposed. It shows up a few days later as pain that gets worse instead of better, often with a bad taste. Your dentist can clean and dress the socket to ease it, so call rather than waiting.',
    'Also call the clinic for bleeding that does not slow after biting on gauze for half an hour, swelling that worsens after the third day, fever or pus, or numbness that lasts long after the anaesthetic should have worn off.',
    { type: 'note', text: 'If you have difficulty breathing or swallowing, or swelling spreading quickly across your face or neck, go to a hospital emergency department straight away.' },
    { type: 'heading', id: 'replacing-the-tooth', text: 'Should you replace an extracted tooth?' },
    'Over time, the teeth beside a gap can tilt into it, the opposite tooth can drift, chewing gets harder and the jawbone slowly shrinks. A missing tooth is usually worth replacing, especially one you smile or chew with, though not every gap at the very back needs filling. Neudental offers a [dental implant](/treatments/dental-implants), a [fixed bridge](/treatments/dental-crowns-and-bridges) or a [denture](/treatments/dentures).',
    {
      type: 'table',
      caption: 'Ways to replace an extracted tooth',
      rows: [
        ['Dental implant', 'A titanium post in the jawbone with a crown on top. It does not rely on the neighbouring teeth; takes a few months'],
        ['Fixed bridge', 'A false tooth held by crowns on the teeth either side. Cemented in, no surgery, but the neighbouring teeth are shaped for the crowns'],
        ['Denture', 'A removable plate with one or more false teeth; can replace several teeth at once'],
      ],
    },
    'Ask about replacement at your extraction visit, so you know the plan and timing in advance.',
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
