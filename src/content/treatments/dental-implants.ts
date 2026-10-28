// Patient guide for /treatments/dental-implants. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'implants',
  seoTitle: 'Dental Implants in Kodungaiyur: Cost & Process | Neudental',
  metaDescription: 'Dental implants at Neudental, Kodungaiyur: who suits them, each step, healing time, implant vs bridge vs denture, and cost ({{price}}).',
  headline: 'Dental Implants in Kodungaiyur, Chennai',
  answer: 'A dental implant replaces a missing tooth with a titanium post placed in the jawbone, acting as a root for a custom-made crown. It suits adults who have lost one or more teeth and have healthy gums and enough bone. Treatment usually takes {{duration}}, mostly healing time. At Neudental in Kodungaiyur, implant treatment costs {{price}}, confirmed after an assessment and X-ray.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-a-dental-implant', text: 'What is a dental implant?' },
    'A **dental implant** replaces the root of a missing tooth. A small titanium post is placed in the jawbone, and over the following months the bone grows around it and holds it firmly. A connector (called an abutment) and a custom-made crown are then fixed on top, giving you a fixed tooth that you brush like a natural one.',
    'Because the implant sits in the bone like a root, it also helps with **bone preservation**. The jawbone under a gap slowly shrinks after a tooth is lost, and the chewing forces passed through an implant help preserve it.',
    { type: 'heading', id: 'who-can-get-implants', text: 'Who is a good candidate for dental implants?' },
    'Implants usually suit adults who have:',
    {
      type: 'list',
      items: [
        'One or more missing teeth, or a tooth that cannot be saved',
        'A jaw that has finished growing, so implants are generally not placed in children or young teenagers',
        'Enough healthy jawbone. The longer a gap has been there, the more bone may have been lost',
        'Healthy gums. Active gum disease needs [gum disease treatment](/treatments/gum-disease-treatment) first',
        'Reasonable general health, and the ability to clean the area every day',
      ],
    },
    '**Smoking** slows healing and makes it more likely that an implant fails to bond, so cutting down or stopping helps. Poorly controlled **diabetes** can also slow healing. Tell your dentist about any health conditions and medicines. If there is too little bone, it can sometimes be built up first with a bone graft; ask your dentist whether this suits you.',
    { type: 'heading', id: 'implant-procedure', text: 'How dental implant treatment is done at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Implant assessment', text: 'Dr. Swetha examines the gap, your gums, bite and neighbouring teeth, asks about your health and medicines, and takes a [digital X-ray or OPG scan](/treatments/dental-x-ray) to check the bone. Any decay or gum problems are treated first.' },
        { title: 'Digital implant planning', text: "The implant's position, length and angle are planned digitally from your X-ray images, so it sits in sound bone, clear of nerves, the sinus and the roots of nearby teeth." },
        { title: 'Removing the tooth, if needed', text: 'A damaged tooth that is still in place is removed first with a [tooth extraction](/treatments/tooth-extraction). Your dentist will advise when the implant can go in.' },
        { title: 'Placing the implant', text: 'Under local anaesthesia, a small opening is made in the gum and the titanium post is placed in the bone. The gum is closed around it, sometimes with a few stitches.' },
        { title: 'Healing and bonding', text: 'Over the next few months, the bone bonds to the implant and fixes it firmly. You carry on with daily life, with a review visit to check the healing.' },
        { title: 'Abutment and crown', text: 'Once the implant is firm, the abutment is attached and an impression (a precise mould) is taken. The custom crown is then tried in, checked for colour, shape and bite, and fixed in place.' },
      ],
    },
    { type: 'heading', id: 'how-long-does-it-take', text: 'How long does implant treatment take?' },
    'From the first assessment to the final crown, implant treatment usually takes {{duration}}. Most of that is healing time, not time in the chair: the implant must bond with the bone before it can take chewing forces. The upper jaw, where the bone is usually softer, often needs a little longer than the lower jaw.',
    'It can take longer if a tooth has to be removed first, if bone needs building up, or if gum disease needs treating. For a gap at the front of the mouth, ask your dentist about a temporary tooth to wear while the implant heals.',
    { type: 'heading', id: 'dental-implant-cost', text: 'Dental implant cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Dental implant cost at Neudental',
      rows: [
        ['Dental implant treatment', '{{price}}'],
        ['What changes the cost', 'How many implants you need, where in the mouth they go, the type of crown, and whether bone needs building up'],
        ['Treatment needed first', 'An extraction, gum treatment or fillings, if needed, are separate steps with their own cost'],
        ['What your quote covers', 'Ask which stages are included, such as the implant, the abutment and the crown'],
        ['When you will know your cost', 'After the assessment and X-ray, before any treatment starts'],
      ],
    },
    { type: 'heading', id: 'implant-surgery-recovery', text: 'Does implant surgery hurt? Recovery and aftercare' },
    'The implant is placed under local anaesthesia, so most people feel pressure and vibration rather than pain. Some swelling, mild bruising and soreness for a few days afterwards are common. To help healing:',
    {
      type: 'list',
      items: [
        'Hold a cold pack against your cheek, on and off, on the first day to limit swelling.',
        'Eat soft, lukewarm food and chew on the other side for the first few days.',
        'Avoid smoking while the implant heals.',
        'Keep the area clean as your dentist shows you, and take only the pain relief your dentist advises.',
        'Call the clinic if pain, swelling or bleeding gets worse instead of better after the first few days, or if you have a fever.',
      ],
    },
    { type: 'heading', id: 'implant-care-and-longevity', text: 'How long do dental implants last?' },
    'With good care, a well-placed implant can last for many years. The crown on top takes the wear of chewing and may need replacing at some point.',
    'An implant cannot decay, but the gum and bone around it can become infected, much like gum disease around a natural tooth. This is called **peri-implantitis**, and if it is not treated it can loosen the implant. To keep your implant healthy:',
    {
      type: 'list',
      items: [
        'Brush twice a day and clean around the implant daily with floss or a small interdental brush.',
        'Avoid smoking, and keep diabetes and other health conditions well controlled.',
        'Have a check-up and professional cleaning every six months.',
        'Tell your dentist if you grind or clench your teeth, as this can overload the crown.',
      ],
    },
    { type: 'heading', id: 'implant-bridge-or-denture', text: 'Implant, bridge or denture: which suits you?' },
    {
      type: 'table',
      caption: 'Comparing ways to replace missing teeth',
      rows: [
        ['Dental implant', 'Fixed, and leaves the neighbouring teeth untouched. Helps preserve the jawbone. Needs minor surgery, enough healthy bone and {{duration}} to complete, and usually costs more at the start.'],
        ['Fixed bridge', 'Fixed, with no surgery, and usually finished sooner. The teeth on either side of the gap are shaped to hold crowns. See [crowns and bridges](/treatments/dental-crowns-and-bridges).'],
        ['Removable denture', 'Taken out for cleaning. Can replace many or all teeth without surgery and usually costs less, but can move slightly when eating and may need refitting as the jaw changes. See [dentures](/treatments/dentures).'],
      ],
    },
    'An implant is often a good choice when the teeth beside a gap are healthy and you would rather not have them shaped. A bridge may suit you better if those teeth already need crowns, or if there is too little bone. When many teeth are missing, a few implants can sometimes hold a bridge or keep a denture steady; ask your dentist whether this suits you.',
  ],
  faqs: [
    { question: 'How much does a dental implant cost at Neudental?', answer: 'Dental implant treatment at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on how many implants you need, where they go, the crown and whether bone needs building up. It is confirmed after the assessment and X-ray; an extraction or gum treatment needed first is charged separately.' },
    { question: 'How many visits does a dental implant need?', answer: 'The whole process usually takes {{duration}}, but most of that is healing time, not time at the clinic. Expect visits for the assessment, placing the implant, a healing review, and then the impression and crown fitting. An extraction, bone building or gum treatment can add visits.' },
    { question: 'Am I too old for dental implants?', answer: 'Usually not. For adults, age on its own is rarely the deciding factor. Your general health, the amount of jawbone, the health of your gums and your ability to keep the area clean matter more. Your dentist will assess these before advising whether implants suit you.' },
    { question: 'Can I get dental implants if I have diabetes?', answer: 'Often, yes, if your diabetes is well controlled. High blood sugar can slow healing and raise the risk of infection around the implant. Tell your dentist about your condition and your recent sugar readings; they may advise checking with your doctor before surgery.' },
    { question: 'Can I get an implant years after losing a tooth?', answer: 'Often, yes. The jawbone slowly shrinks after a tooth is lost, so after a long gap there may be less bone to hold an implant. An X-ray assessment shows how much is left. Sometimes bone can be built up first; otherwise a bridge or denture may suit you better.' },
    { question: 'Can a dental implant fail?', answer: 'Occasionally an implant does not bond with the bone, or loosens later because of infection around it. Smoking, poorly controlled diabetes and poor cleaning raise the risk. If it happens, the implant is usually removed and, once the area heals, your dentist will discuss trying again or another option.' },
    { question: 'Will an implant look like a natural tooth?', answer: 'The crown is made to match the colour, shape and size of your neighbouring teeth, so it usually blends in well. Because it is fixed in the bone, it does not move when you talk or eat, and you clean it much like a natural tooth.' },
  ],
  relatedTreatments: ['crowns-bridges', 'dentures', 'tooth-extraction', 'imaging'],
  datePublished: '2026-10-26',
};

export default guide;
