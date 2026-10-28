// Patient guide for /treatments/laser-dentistry. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'laser-dentistry',
  seoTitle: 'Laser Dentistry in Kodungaiyur: Cost & Uses | Neudental',
  metaDescription: 'Laser dentistry at Neudental, Kodungaiyur: laser gum procedures with less bleeding and quicker recovery, how it feels, limits and cost ({{price}}).',
  headline: 'Laser Dentistry in Kodungaiyur, Chennai',
  answer: 'Laser dentistry uses a focused beam of light, instead of a scalpel, to treat soft tissue such as the gums. At Neudental in Kodungaiyur it is used for laser gum procedures, for example on overgrown, uneven or inflamed gums, and usually means less bleeding and a quicker recovery. A sitting usually takes {{duration}}, and treatment costs {{price}}, depending on the procedure.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-laser-dentistry', text: 'What is laser dentistry?' },
    'A dental laser produces a fine, focused beam of light energy. Guided by the dentist through a thin tip, it can gently remove or reshape soft tissue such as the gums. As it works, it seals small blood vessels, which is why laser procedures usually cause less bleeding than cutting with a scalpel, and often need no stitches.',
    'At Neudental, the laser is used for **laser gum procedures**. It is a tool that can make certain treatments gentler, so your dentist will use it only where it suits your case. For a plain-language overview, read [what to expect from laser dentistry](/blogs/painless-laser-dentistry-explained).',
    { type: 'heading', id: 'what-lasers-can-treat', text: 'Which gum problems can a laser help with?' },
    'Depending on what your dentist finds, a laser may be suggested for:',
    {
      type: 'list',
      items: [
        '**Overgrown or swollen gum tissue** that covers part of a tooth. This can happen with long-standing inflammation, with braces, or as a side effect of some medicines.',
        '**An uneven gum line or a gummy smile**, where extra gum can be trimmed and reshaped so the teeth look more even. This is often planned alongside [cosmetic dentistry](/treatments/cosmetic-dentistry).',
        '**Inflamed gum pockets in gum disease**, where a laser may be used alongside deep cleaning. It does not replace [gum disease treatment](/treatments/gum-disease-treatment), which cleans tartar and bacteria off the roots.',
        '**Gum tissue in the way of a filling or crown**, which may need trimming so the edge of the tooth can be reached.',
      ],
    },
    'In general, dental lasers are also used for jobs such as releasing a tight tongue-tie or easing some mouth ulcers. If you have read about one of these, ask your dentist whether a laser is an option for you.',
    { type: 'heading', id: 'laser-vs-conventional', text: 'Laser or conventional treatment: what is the difference?' },
    {
      type: 'table',
      caption: 'Laser gum procedures compared with conventional gum surgery',
      rows: [
        ['Bleeding', 'Usually less with a laser, because it seals small blood vessels as it works'],
        ['Stitches', 'Often not needed after small laser gum procedures; conventional gum surgery more often needs them'],
        ['Healing', 'Often quicker for small procedures, though the gum still needs time to heal fully'],
        ['Numbing', 'A numbing gel is enough for some minor laser procedures; others still need local anaesthesia'],
      ],
    },
    { type: 'heading', id: 'laser-procedure', text: 'How a laser gum procedure is done at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Examination and assessment', text: 'Dr. Swetha examines your gums and teeth, and may take an X-ray. She explains whether a laser suits your case, the alternatives and the cost, before anything is started.' },
        { title: 'Getting comfortable', text: 'You wear protective glasses while the laser is in use, as is standard with dental lasers. Depending on the procedure, the area is numbed with a gel or with local anaesthesia.' },
        { title: 'Laser treatment', text: 'The dentist guides a fine laser tip along the gum to remove or reshape tissue. Small blood vessels are sealed as it works, so there is usually little bleeding.' },
        { title: 'Checking and aftercare advice', text: 'The treated area is checked, and you are told how to eat, brush and look after the gum while it heals.' },
        { title: 'Review', text: 'A short follow-up visit may be suggested to check healing.' },
      ],
    },
    'Many laser gum procedures are finished in one sitting of about {{duration}}. Treating several areas, or a longer gum disease plan, can take more sittings. You will know the plan before treatment starts.',
    { type: 'heading', id: 'does-it-hurt', text: 'Does laser dentistry hurt? What it feels like' },
    'Most people find laser gum procedures comfortable. You may feel warmth or a light tapping, hear a soft snapping sound, and notice a slight smell as the tissue is treated. If anything feels uncomfortable, tell the dentist, and more numbing can be given.',
    'Laser treatment is often gentler than conventional surgery, but it is not always pain-free. Many procedures still need local anaesthesia, and the gum is usually a little tender for a few days afterwards.',
    { type: 'heading', id: 'laser-dentistry-cost', text: 'Laser dentistry cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Laser dentistry cost at Neudental',
      rows: [
        ['Laser dentistry', '{{price}}'],
        ['What changes the cost', 'Which procedure you need, how much gum tissue is treated, how many teeth or areas are involved, and how many sittings it takes'],
        ['As part of other treatment', 'If the laser is one step of a wider plan, such as gum disease care, your dentist explains what each part costs'],
        ['When you will know your cost', 'After the examination, before any treatment starts'],
      ],
    },
    { type: 'heading', id: 'recovery', text: 'Recovery and aftercare after laser gum treatment' },
    'Small laser procedures usually heal quickly. To help the gum heal:',
    {
      type: 'list',
      items: [
        'Wait until any numbness wears off before eating, so you do not bite your cheek or tongue.',
        'For the first day or two, choose soft, lukewarm food and avoid very hot, spicy, hard or crunchy food near the treated area.',
        'Brush gently around the treated gum with a soft brush.',
        'Avoid smoking and chewing tobacco while the gum heals.',
        'Mild tenderness is normal. Take only the pain relief your dentist advises.',
        'Call the clinic if you have bleeding that does not stop, swelling that increases, fever, or pain that gets worse instead of better.',
      ],
    },
    { type: 'note', text: 'For the first few days the treated gum may look white or yellowish. This is a normal part of healing, not a sign of infection.' },
    { type: 'heading', id: 'limits-of-laser-dentistry', text: 'When is a laser not the right choice?' },
    'A laser does not suit every problem, and it has clear limits:',
    {
      type: 'list',
      items: [
        'It does not replace deep cleaning of the roots in gum disease, or regular [teeth cleaning](/treatments/teeth-cleaning) to remove tartar.',
        'It cannot regrow gum that has receded or bone that has been lost to gum disease.',
        'In most cases, fillings, root canals and extractions are still done with conventional instruments.',
      ],
    },
    'Tell your dentist about any health conditions and medicines you take. If a laser is not suitable, [Dr. Swetha](/dr-swetha) will explain the conventional option.',
  ],
  faqs: [
    { question: 'How much does laser dentistry cost at Neudental?', answer: 'Laser dentistry at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on the procedure, how much gum tissue is treated and how many areas are involved, and is confirmed after your examination, before any treatment starts.' },
    { question: 'How long does a laser gum procedure take?', answer: 'A sitting usually takes {{duration}}. Small procedures are often completed in a single visit. Treating several areas, or combining the laser with gum disease care, can take more sittings, and a short review may be suggested to check healing.' },
    { question: 'Is laser dentistry safe?', answer: 'Dental lasers are widely used and are considered safe when used with the right precautions, such as protective glasses for the patient and the dental team. Your dentist will check your health history and tell you whether a laser suits your case.' },
    { question: 'Will I need stitches after laser gum treatment?', answer: 'Often not. Because the laser seals small blood vessels as it works, many small laser gum procedures heal without stitches. Larger procedures may still need them. Your dentist will tell you what to expect before treatment starts.' },
    { question: 'Can a laser treat cavities?', answer: 'Some types of dental laser can remove decay, but most cavities are still treated with conventional instruments and a tooth-coloured filling. Neudental offers laser gum procedures; for a cavity, ask your dentist which approach suits your tooth.' },
    { question: 'Can laser treatment fix a gummy smile?', answer: 'It can help when the gummy look is caused by extra gum covering the teeth, because that gum can be trimmed and reshaped with a laser. If the cause is the jaw bone or the way the upper lip moves, a laser alone is not enough. Your dentist will assess the cause first.' },
  ],
  relatedPosts: ['painless-laser-dentistry-explained'],
  relatedTreatments: ['gum-disease', 'cleaning', 'cosmetic'],
  datePublished: '2026-10-26',
};

export default guide;
