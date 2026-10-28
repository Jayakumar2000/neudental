// Patient guide for /treatments/gum-disease-treatment. Fields are explained on
// TreatmentGuide in src/types.ts. Never type a price: {{price}},
// {{startingPrice}} and {{duration}} are filled in from TREATMENTS.
import type { TreatmentGuide } from '../../types';

const guide: TreatmentGuide = {
  treatmentId: 'gum-disease',
  seoTitle: 'Gum Disease Treatment in Kodungaiyur: Cost | Neudental',
  metaDescription: 'Gum disease treatment at Neudental, Kodungaiyur: bleeding or receding gums, deep cleaning, gum surgery if needed, visits and cost ({{price}}).',
  headline: 'Gum Disease Treatment in Kodungaiyur, Chennai',
  answer: 'Gum disease treatment is for gums that bleed, swell or recede, or teeth that feel loose, because of gingivitis or periodontitis. After a gum assessment, a deep cleaning (scaling and root planing) removes tartar from below the gumline, with gum surgery only if needed and regular monitoring afterwards. At Neudental in Kodungaiyur a sitting usually takes {{duration}}, and treatment costs {{price}}.',
  content: [
    { type: 'contents' },
    { type: 'heading', id: 'what-is-gum-disease', text: 'What is gum disease?' },
    'Gum disease (periodontal disease) is inflammation and infection of the gums and the bone that hold your teeth in place. It starts when plaque, the sticky film of bacteria that forms on teeth every day, is left along the gumline and hardens into tartar. There are two main stages:',
    {
      type: 'table',
      caption: 'Gingivitis and periodontitis compared',
      rows: [
        ['Gingivitis (early stage)', 'Gums are red, puffy and bleed when you brush. The bone is not affected yet, and it is usually reversible with a professional cleaning and good brushing at home.'],
        ['Periodontitis (advanced stage)', 'Inflammation spreads below the gumline, forming pockets between the gum and tooth and slowly destroying the supporting bone. Gums recede, teeth can loosen and, left untreated, may eventually need removal. Lost bone usually does not grow back, but treatment can stop the disease getting worse.'],
      ],
    },
    'For mild bleeding from gingivitis, a [professional teeth cleaning](/treatments/teeth-cleaning) may be all you need. Gum disease treatment is for infection that has reached below the gumline. Your dentist will tell you which you need after checking your gums.',
    { type: 'heading', id: 'signs-of-gum-disease', text: 'Signs of gum disease to watch for' },
    {
      type: 'list',
      items: [
        'Gums that bleed when you brush, floss or eat',
        'Red, swollen or tender gums',
        'Bad breath or a bad taste that keeps coming back',
        'Gums pulling away from the teeth, so the teeth look longer (receding gums)',
        'Pus between the teeth and gums',
        'Teeth that feel loose, drift apart or meet differently when you bite',
        'Sensitivity to cold where the roots have become exposed',
      ],
    },
    { type: 'note', text: 'Gum disease is often painless until it is advanced, which is one reason [regular dental check-ups matter](/blogs/why-regular-checkups-matter) even when nothing hurts.' },
    { type: 'heading', id: 'causes-and-risk-factors', text: 'What causes gum disease, and who is at higher risk?' },
    'The main cause is plaque and tartar left along and under the gumline. Some things make gum disease more likely, or harder to control:',
    {
      type: 'list',
      items: [
        '**Smoking and chewing tobacco.** They reduce blood flow to the gums, which can hide the warning sign of bleeding, slow healing and make treatment less effective.',
        '**Diabetes.** High blood sugar makes the gums more prone to infection and slower to heal, and severe gum infection can in turn make blood sugar harder to control. Tell your dentist if you have diabetes.',
        'Hormonal changes during pregnancy and puberty, which make gums bleed more easily',
        'Crowded teeth, braces, or old fillings and crowns with rough edges that trap plaque',
        'Some medicines that cause a dry mouth or swollen gums (tell your dentist what you take)',
      ],
    },
    { type: 'heading', id: 'gum-treatment-procedure', text: 'How gum disease is treated at Neudental' },
    {
      type: 'steps',
      items: [
        { title: 'Comprehensive gum assessment', text: 'Dr. Swetha checks for bleeding, swelling, recession and loose teeth, and gently measures the pocket around each tooth with a thin probe. [Dental X-rays](/treatments/dental-x-ray) may be taken to see how much bone supports the teeth.' },
        { title: 'Your treatment plan', text: 'You are told how advanced the gum disease is, how many sittings are likely and what it will cost, before treatment starts.' },
        { title: 'Deep cleaning (scaling and root planing)', text: 'Tartar and bacteria are removed from the root surfaces below the gumline, and the roots are smoothed so the gums can heal and the pockets can shrink. The area is usually numbed with local anaesthesia first.' },
        { title: 'Daily care at home', text: 'You are shown how to brush along the gumline and clean between your teeth with floss or interdental brushes, which keeps the treatment working.' },
        { title: 'Review', text: 'After a few weeks, the pockets are measured again to see how your gums have responded. If deep pockets remain, surgery may be discussed.' },
        { title: 'Regular monitoring', text: 'Regular maintenance visits keep tartar under control and catch any area that becomes active again.' },
      ],
    },
    { type: 'heading', id: 'how-many-visits', text: 'How many visits will you need?' },
    'Each sitting usually takes {{duration}}. Milder gum disease may need one or two sittings; when many teeth are affected, deep cleaning is often done section by section over several sittings, so each area can be numbed and cleaned thoroughly. A review follows a few weeks later.',
    'After that, maintenance visits are often every three to four months at first, rather than every six. Your dentist sets the interval based on how your gums respond.',
    { type: 'heading', id: 'when-is-gum-surgery-needed', text: 'When is gum surgery needed?' },
    'Many people with gum disease are treated without surgery, as deep cleaning and good home care are often enough. Surgery may be suggested when deep pockets remain, or when tartar lies too deep to reach without gently lifting the gum, so the roots can be cleaned directly and the gum reshaped to be easier to keep clean.',
    'If surgery is recommended, Dr. Swetha will explain why, what it involves, how long healing takes and what it will cost. Some gum procedures can be done with a laser, which can mean less bleeding and a quicker recovery; read about [laser dentistry](/treatments/laser-dentistry) and ask whether it suits your case.',
    'Receded gum usually does not grow back on its own. Treating the disease helps stop further recession; ask your dentist if exposed roots feel sensitive.',
    { type: 'heading', id: 'gum-treatment-cost', text: 'Gum disease treatment cost in Kodungaiyur' },
    {
      type: 'table',
      caption: 'Gum disease treatment cost at Neudental',
      rows: [
        ['Gum disease treatment', '{{price}}'],
        ['What changes the cost', 'How advanced the gum disease is, how many teeth and areas need deep cleaning, and how many sittings it takes'],
        ['Gum surgery, if needed', 'Only considered if deep cleaning is not enough; its cost is explained before it is planned'],
        ['When you will know your cost', 'After the gum assessment, before any treatment starts'],
      ],
    },
    'Treating gum disease early is usually simpler and less costly than replacing teeth lost to it.',
    { type: 'heading', id: 'aftercare', text: 'After a deep cleaning: recovery and home care' },
    {
      type: 'list',
      items: [
        'Wait for the numbness to wear off before eating, so you do not bite your cheek or tongue.',
        'Gums may feel tender and bleed a little for a few days, and teeth may be sensitive to cold. Take only the pain relief your dentist advises.',
        'Keep brushing gently with a soft brush and cleaning between your teeth every day, even if the gums bleed a little.',
        'Avoid smoking and chewing tobacco while your gums heal.',
        'Call the clinic if you have swelling, pain that gets worse instead of better, or bleeding that does not stop.',
      ],
    },
  ],
  faqs: [
    { question: 'How much does gum disease treatment cost at Neudental?', answer: 'Gum disease treatment at Neudental in Kodungaiyur costs {{price}}. The exact amount depends on how advanced the disease is and how many areas need deep cleaning, and is confirmed after the gum assessment. If gum surgery is needed, your dentist explains its cost before it is planned.' },
    { question: 'How long does gum treatment take, and how many visits?', answer: 'Each sitting usually takes {{duration}}. Mild cases may need one or two sittings, while widespread gum disease is often treated section by section over several visits. A review follows a few weeks later, then regular maintenance visits.' },
    { question: 'Is deep cleaning painful?', answer: 'The area is usually numbed with local anaesthesia, so you should feel pressure and vibration rather than pain. Tender gums and some sensitivity to cold for a few days afterwards are common, and usually settle with good home care.' },
    { question: 'Can gum disease be reversed?', answer: 'Gingivitis, the early stage, can usually be reversed with a professional cleaning and good brushing. Periodontitis cannot be fully undone, because lost bone usually does not grow back, but treatment and regular care can stop it getting worse and help you keep your teeth.' },
    { question: 'Will my loose teeth become firm again?', answer: 'Teeth that are loose mainly because of swollen, infected gums may feel firmer once the inflammation settles. Where a lot of bone has been lost, some movement may remain. Your dentist will tell you which teeth can be kept and what can be done for the rest.' },
    { question: 'Why do my teeth look longer or have gaps after a deep cleaning?', answer: 'As swelling goes down, the gums shrink back to a healthier, tighter shape. This can make the teeth look longer or show small gaps that were hidden by swollen gums or tartar. It is a sign of healing, and sensitivity from it usually eases with time.' },
    { question: 'Should I stop brushing if my gums bleed?', answer: 'No. Bleeding gums are a sign of inflammation caused by plaque, and brushing less lets more plaque build up. Keep brushing gently twice a day with a soft brush. If the bleeding has not settled within a couple of weeks, book a gum check.' },
  ],
  relatedPosts: ['painless-laser-dentistry-explained', 'why-regular-checkups-matter'],
  relatedTreatments: ['cleaning', 'laser-dentistry', 'imaging', 'checkup'],
  datePublished: '2026-10-26',
};

export default guide;
