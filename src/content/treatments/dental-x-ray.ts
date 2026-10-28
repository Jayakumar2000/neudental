// Patient guide for /treatments/dental-x-ray. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'imaging',
  seoTitle: 'Dental X-Ray in Kodungaiyur: OPG, Cost & Safety | Neudental',
  metaDescription: 'Digital dental X-rays and OPG scans at Neudental, Kodungaiyur: when you need one, which type, how safe it is, pregnancy advice and cost ({{price}}).',
  headline: 'Dental X-Ray and OPG Scan in Kodungaiyur, Chennai',
  answer: 'A dental X-ray shows what your dentist cannot see by eye: decay between teeth, infection at a root tip, bone loss and impacted teeth. It is often advised for toothache and before root canals, extractions, implants or braces. Neudental in Kodungaiyur offers digital X-rays and full-mouth OPG scans, which use a low dose of radiation. An X-ray visit usually takes {{duration}} and costs {{price}}.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-does-a-dental-x-ray-show', text: 'What does a dental X-ray show?' },
    'Your dentist can see the surfaces of your teeth and gums, but much happens out of sight: between teeth that touch, under old fillings and in the bone around the roots. A dental X-ray (radiograph) shows these areas, so problems can be found early, often before they hurt, and treatment planned carefully.',
    'A dental X-ray can help your dentist find:',
    {
      type: 'list',
      items: [
        'Decay between teeth, or under an existing filling',
        'Infection or an abscess at the tip of a root',
        'Bone loss around teeth caused by gum disease',
        'Wisdom teeth or other teeth stuck (impacted) in the jaw',
        'The shape and length of roots and canals before a root canal or extraction',
        'In children, the adult teeth developing under the milk teeth',
        'Cysts or other changes in the jaw bone',
      ],
    },
    { type: 'heading', id: 'intraoral-x-ray-or-opg', text: 'Intraoral X-ray or OPG: which one do you need?' },
    'Neudental offers two kinds of dental imaging: digital intraoral X-rays, which look closely at one area, and OPG scans, which show the whole mouth in one picture. Your dentist chooses the one that answers the question about your teeth.',
    {
      type: 'table',
      caption: 'Intraoral X-ray and OPG scan compared',
      rows: [
        ['Intraoral X-ray: what it shows', 'A small area of one to a few teeth in fine detail, with the bone around them'],
        ['Intraoral X-ray: common uses', 'Toothache, cavities between teeth, root canal treatment, infection at a root'],
        ['OPG: what it shows', 'All your teeth, both jaws and the jaw joints in one wide image, in less fine detail'],
        ['OPG: common uses', 'Wisdom teeth, planning braces or implants, tooth development in children, an overall view of the mouth'],
      ],
    },
    'Intraoral X-rays include **periapical (IOPA)** views, which show one or a few teeth from the crown down to the root tip, and **bitewing** views of the back teeth, which help spot decay between them and check the bone level. Sometimes you need both: an OPG for the overall picture and an intraoral X-ray for detail on one tooth.',
    { type: 'note', text: 'A few complex cases, such as some implant or wisdom tooth assessments, may call for a 3D scan known as CBCT. Ask your dentist whether you need one.' },
    { type: 'heading', id: 'when-do-you-need-a-dental-x-ray', text: 'When might you need a dental X-ray?' },
    'Your dentist will usually advise an X-ray when:',
    {
      type: 'list',
      items: [
        'A tooth hurts or is sensitive, and the cause cannot be seen by eye',
        'There is swelling or a gum boil near a tooth',
        'You need [root canal treatment](/treatments/root-canal-treatment), where X-rays are usually taken before, during and after treatment to check the canals',
        'A tooth needs to come out, especially a [wisdom tooth](/treatments/wisdom-tooth-removal) whose position and roots must be checked first',
        'You are planning braces, clear aligners or [dental implants](/treatments/dental-implants), which need a clear view of the roots and bone',
        'There are signs of gum disease, such as receding gums or loose teeth, and the bone support needs checking',
        'You have had a fall or an injury to the teeth or jaw',
      ],
    },
    { type: 'heading', id: 'how-a-dental-x-ray-is-taken', text: 'What happens during a dental X-ray or OPG?' },
    {
      type: 'steps',
      items: [
        { title: 'Tell your dentist first', text: 'Mention if you are or might be pregnant, or if you gag easily, and bring any recent dental X-rays or reports you have.' },
        { title: 'Remove metal items', text: 'For an OPG, take off earrings, nose pins, chains, hairpins, spectacles and any removable denture, because metal shows up on the image and can hide what is behind it.' },
        { title: 'Getting into position', text: 'For an intraoral X-ray, a small sensor is placed inside your mouth and you bite gently on a holder. For an OPG, you stand or sit at the machine, rest your chin on a support and bite on a small guide while its arm moves slowly around your head.' },
        { title: 'Keeping still', text: 'An intraoral X-ray is taken in a moment; an OPG takes a few seconds longer while the arm circles your head. If the sensor makes you want to gag, breathe slowly through your nose.' },
        { title: 'Reviewing the image', text: 'Digital X-rays need no film developing, so the image is ready on screen shortly afterwards. Dr. Swetha goes through it with you and explains what it shows and what treatment, if any, is needed.' },
      ],
    },
    'A dental X-ray does not hurt and needs no injection. The whole visit usually takes {{duration}}.',
    { type: 'heading', id: 'are-dental-x-rays-safe', text: 'Are dental X-rays safe?' },
    'Dental X-rays use a very small dose of radiation, often compared to the natural background radiation we all receive over a day or a few days, depending on the type of X-ray. Digital X-rays usually need less radiation than older film X-rays, and the beam is limited to the area being checked.',
    'Even so, every X-ray should have a clear reason. Your dentist takes X-rays only when the information will guide your care, and avoids repeating them without need. No radiation stays in your body afterwards.',
    { type: 'heading', id: 'x-rays-in-pregnancy-and-for-children', text: 'X-rays during pregnancy and for children' },
    '**Always tell your dentist if you are, or might be, pregnant.** Routine X-rays are often put off until after the baby is born. If you have pain, swelling or an infection that needs a diagnosis, your dentist may still advise one, because the beam is aimed at the mouth, well away from the abdomen, and an untreated dental infection carries its own risks. The decision is made together with you.',
    'Children may need X-rays to find decay between milk teeth or to check that adult teeth are developing in the right place. Children are more sensitive to radiation than adults, so their X-rays are taken only when needed. See [dental care for children](/treatments/kids-dentistry) for more on their visits.',
    { type: 'heading', id: 'dental-x-ray-cost', text: 'Dental X-ray and OPG cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Dental X-ray and OPG scan cost at Neudental',
      rows: [
        ['Digital X-ray or OPG scan', '{{price}}'],
        ['What changes the cost', 'Which scan you need (an intraoral X-ray of one area or a full-mouth OPG) and how many images are taken'],
        ['X-ray at a check-up', 'A [regular check-up](/treatments/dental-checkup) includes a complimentary X-ray if your dentist needs one. Your dentist will tell you before any further scan is taken'],
        ['When you will know your cost', 'Before the X-ray is taken, once your dentist has decided which scan you need'],
      ],
    },
    'An X-ray is a diagnostic step. If it shows that you need treatment, such as a filling or a root canal, your dentist will explain the options and their costs before anything is started. If a treatment such as a root canal needs several X-rays, ask whether they are included in its cost.',
    { type: 'heading', id: 'what-x-rays-cannot-show', text: 'What a dental X-ray cannot tell you' },
    'An X-ray is one part of the diagnosis, not all of it. Very early decay, fine cracks and gum inflammation often do not show clearly, so your dentist reads the image together with the examination and your symptoms. If pain continues after a clear X-ray, tell your dentist; a follow-up X-ray or a different view is sometimes needed.',
  ],
  faqs: [
    { question: 'How much does a dental X-ray cost at Neudental?', answer: 'A digital X-ray or OPG scan at Neudental in Kodungaiyur costs {{price}}. The amount depends on which scan you need and how many images are taken, and your dentist tells you before it is taken. A regular check-up includes a complimentary X-ray if your dentist needs one.' },
    { question: 'How long does a dental X-ray or OPG take?', answer: 'Usually {{duration}}, including getting into position and looking at the result. The exposure itself lasts only a moment, or a few seconds for an OPG, and because the X-ray is digital, the image is ready to view shortly afterwards, during the same visit.' },
    { question: 'I have already had an OPG. Why do I need another X-ray?', answer: 'An OPG gives an overall view of all your teeth and jaws, but in less fine detail. To look closely at one tooth, for example during a root canal or to check a cavity between teeth, your dentist may also need an intraoral X-ray of that area.' },
    { question: 'Can I have a dental X-ray while pregnant or breastfeeding?', answer: 'Tell your dentist if you are, or might be, pregnant. Routine X-rays are often postponed, but one may be advised if you have pain or an infection that needs diagnosing. Breastfeeding is not affected: dental X-rays leave no radiation in your body or breast milk.' },
    { question: 'Does a dental X-ray hurt?', answer: 'No. There is no injection, and you feel nothing during the exposure. The edge of the intraoral sensor may feel a little awkward for a moment. If you gag easily, tell your dentist beforehand; breathing slowly through your nose usually helps.' },
    { question: 'How often should I have dental X-rays?', answer: 'There is no fixed schedule for everyone. It depends on your age, your dental history and your risk of decay or gum disease. Someone who gets cavities often may need X-rays more often than someone who rarely does. Your dentist will advise what you need.' },
    { question: 'Can I bring X-rays taken at another clinic?', answer: 'Yes, bring any recent dental X-rays or OPG reports, printed or digital. If they are recent and clear enough, your dentist may be able to use them and avoid a repeat X-ray. If not, your dentist will explain why a new one is needed.' },
  ],
  relatedPosts: ['why-regular-checkups-matter', 'root-canal-treatment-does-it-hurt'],
  relatedTreatments: ['checkup', 'rct', 'extraction', 'implants'],
  datePublished: '2026-10-26',
};

export default guide;
