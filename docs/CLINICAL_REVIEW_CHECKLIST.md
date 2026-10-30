# Clinical review checklist for the treatment guides

The 17 treatment guides in `src/content/treatments/` were written for the
clinic and then checked, one by one, by a reviewer looking for medical
inaccuracy, invented claims about the clinic and overstatement. 205 problems
were fixed that way. They have **not** been reviewed by a dentist.

What's left is listed below. These are statements in the guides that only the
clinic can confirm, mostly "is this how *we* do it?" questions, plus a few
general clinical statements a clinician should sign off. Nothing here is
known to be wrong.

## How to use this list

For each guide:

1. Open the live page (`https://www.neudental.in/treatments/<page>`) or the
   guide file on GitHub.
2. Read the page, then go through its questions below.
3. Correct anything that doesn't match how the clinic works by editing the
   guide file on GitHub (see `BLOG_GUIDE.md`, "Treatment pages"). Never type a
   price: use `{{price}}`.
4. When Dr. Swetha is happy with the whole page, add these two lines to the
   guide file and commit:

   ```ts
     reviewedBy: 'Dr. Swetha, BDS, FGDS',
     dateModified: 'YYYY-MM-DD',   // the day of the review
   ```

   The page then shows "Reviewed by Dr. Swetha", and search engines and AI
   assistants see that it has been medically reviewed.

## Questions that affect more than one page

- [x] **Does a check-up include a professional cleaning?** No (confirmed by
      the clinic, 30 Oct 2026). Cleaning is a separate treatment with its own
      price. The blog post *Why Regular Dental Checkups Matter* has been
      corrected to say so; the check-up and cleaning guides already did.
- [ ] **Dr. Swetha's Tamil Nadu State Dental Council registration number**:
      add `registration: '...'` to `DOCTOR` in `src/data.ts`. It appears on
      her profile page.
- [ ] **Exact publish dates of the three older blog posts**: add
      `datePublished: 'YYYY-MM-DD'` to each (the build warns until you do).
- [ ] **"Wisdom Tooth Impaction" was renamed "Wisdom Tooth Removal"** in the
      treatment list (the procedure, not the condition, is what people search
      for and what the page describes). The address and existing bookings are
      unchanged. Rename it back in `src/data.ts` if the clinic prefers.
- [ ] Similar questions appear on several pages on purpose, each answered for
      that treatment ("Does it hurt?", "Is it safe in pregnancy?", "Will it look
      natural?"). It's worth reading those answers side by side.


## Regular Check-up — `/treatments/dental-checkup`

Guide file: `src/content/treatments/dental-checkup.ts`

- [ ] Complimentary X-ray: the guide says it is included 'when your dentist needs one', which fits taking X-rays only when there is a clinical reason. The data.ts feature just says 'Complimentary X-ray', and the dental-x-ray guide says a check-up 'includes a complimentary X-ray' with no condition. Please confirm whether it is given at every check-up or only when indicated, and whether it is a single intraoral X-ray or can be an OPG, so the two pages can be made to match.
- [x] Cleaning and check-up: confirmed by the clinic that a check-up does not include a professional cleaning, which is a separate treatment with its own cost, as this guide says. The blog post why-regular-checkups-matter has been corrected to match.
- [ ] What moves the check-up fee within the listed range (for example, a first full examination versus a six-monthly review)? The guide only says it 'depends on what your visit needs to cover' and to ask when booking.
- [ ] Step 1 names Dr. Swetha as the person taking the history. Does she see every check-up patient, or do other dentists or a hygienist sometimes do it (a testimonial mentions a hygienist)?
- [ ] 'Your dentist may suggest coming more often if you are pregnant, or are in the middle of ongoing dental treatment': confirm this matches the clinic's practice.
- [ ] The 'two to three weeks' threshold for a mouth ulcer, patch or lump that has not gone away is a mainstream guideline figure I added. Please confirm the clinic is happy to state it, especially for patients who chew tobacco.
- [ ] The emergency note now tells patients to go to a hospital emergency department straight away if swelling makes it hard to swallow, breathe or open the mouth. Confirm the wording, and whether the clinic wants to add its own phone number or WhatsApp route for same-day dental swelling.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Dental Cleaning — `/treatments/teeth-cleaning`

Guide file: `src/content/treatments/teeth-cleaning.ts`

- [ ] Fluoride at every cleaning: the answer says the cost includes fluoride treatment, and step 4 says fluoride is applied. This follows the 'Fluoride treatment' feature, which the page shows as what's included. Confirm it is given to every adult at every cleaning, and whether it is varnish or gel, since that decides the eating and drinking wait.
- [ ] Polishing: the headline, the answer and step 3 describe scaling AND polishing. data.ts lists only 'Plaque & tartar removal', so confirm polishing is part of every Neudental cleaning.
- [ ] Who does the cleaning: the guide says Dr. Swetha does the check and gives advice. A testimonial mentions a hygienist. Confirm the wording.
- [ ] Price drivers: the cost table lists the amount of tartar and staining, how inflamed the gums are, and how long the cleaning takes as what changes the price within {{price}}. Confirm this matches clinic practice.
- [ ] Second sitting: the guide says very heavy tartar or badly inflamed gums 'may need a second visit' (or deeper gum treatment). Confirm whether a second sitting has an extra cost or moves to gum disease treatment pricing.
- [ ] Comfort measures: the guide only says the dentist can go more slowly and pause. It does not offer local anaesthesia for sensitive areas. Confirm whether to mention that.
- [ ] Timelines: plaque hardening 'within a few days', bleeding settling 'within a couple of weeks', sensitivity settling in 'a few days to a week' and the 'call if beyond two weeks' threshold are mainstream but generic. Confirm they match clinic advice.
- [ ] Medical-history prompt: step 1 asks patients to mention blood-thinning medicines, heart conditions, diabetes or pregnancy. Confirm the clinic is comfortable with this list. The guide does not discuss antibiotic cover or stopping any medicine.
- [ ] More-frequent-cleaning list (previous gum disease treatment, smoking or chewing tobacco, diabetes, braces, pregnancy): confirm Dr. Swetha agrees, and whether to give a typical interval for gum-disease maintenance patients (none is stated).
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Dental Imaging — `/treatments/dental-x-ray`

Guide file: `src/content/treatments/dental-x-ray.ts`

- [ ] OPG on-site or referred? The guide says Neudental offers OPG scans (from data.ts 'Digital X-ray & OPG scans') and describes the patient standing or sitting at 'the machine'. If OPGs are referred to an imaging centre, these lines and the meta description must change.
- [ ] Is the clinic's 'digital X-ray' intraoral (a sensor/RVG or phosphor plate)? The body says 'Neudental offers ... digital intraoral X-rays' and 'a small sensor is placed inside your mouth'. Confirm this matches the equipment.
- [ ] Does the clinic take bitewing X-rays? The guide names IOPA and bitewing views as kinds of intraoral X-ray, in general terms.
- [ ] Price coverage: the guide says 'A digital X-ray or OPG scan ... costs {{price}}' (₹200-₹800), with the type of scan and the number of images changing the cost. Confirm the range covers both a single IOPA and a full OPG.
- [ ] Check-up's 'Complimentary X-ray': the guide now says a check-up 'includes a complimentary X-ray if your dentist needs one'. Confirm the scope (one IOPA? could it be an OPG?).
- [ ] The guide tells patients to ask whether X-rays during a treatment such as a root canal are included in that treatment's cost. Confirm the clinic's policy so this can be stated directly.
- [ ] FAQ: outside X-rays 'may' be usable to avoid a repeat. Confirm the clinic accepts them.
- [ ] Radiation wording: 'often compared to the natural background radiation we all receive over a day or a few days, depending on the type of X-ray'; 'No radiation stays in your body afterwards'; and the breastfeeding FAQ ('dental X-rays leave no radiation in your body or breast milk'). These are mainstream, but a clinician should sign off on them.
- [ ] Pregnancy: 'Routine X-rays are often put off until after the baby is born ... your dentist may still advise one' for pain, swelling or infection. Confirm this matches clinic practice.
- [ ] Step 5 says 'Dr. Swetha goes through it with you'. Confirm she personally reviews the X-rays with each patient.
- [ ] Lead apron or thyroid collar: deliberately not mentioned, either way. Add it only if the clinic confirms its practice.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Cavity Filling — `/treatments/tooth-filling`

Guide file: `src/content/treatments/tooth-filling.ts`

- [ ] Is the {{price}} range (₹1,000-₹2,000) per filling (per tooth)? The answer and the cost FAQ say 'a filling ... costs {{price}}', and the cost table says the total for several cavities is explained before treatment starts.
- [ ] Is the {{duration}} (20-30 minutes) per filling? The guide says 'a filling usually takes {{duration}} in a single sitting'.
- [ ] Is an X-ray taken for a filling included in the filling price, or charged separately as Dental Imaging? The guide only says 'an X-ray if needed' and is silent on who pays for it.
- [ ] Please confirm the cost factors listed in the cost table and the cost FAQ: size and depth of the cavity, number of surfaces, which tooth it is, and whether an old filling must be removed first. These describe how the clinic prices fillings and are not stated in data.ts.
- [ ] Step 1 says Dr. Swetha examines the tooth. Please confirm she does all fillings herself; if not, change it to 'your dentist'.
- [ ] Only tooth-coloured composite is described. Please confirm whether the clinic also uses other materials, such as glass ionomer for children's teeth; the kids dentistry guide links to this page as 'tooth-coloured filling'.
- [ ] Please check the procedure wording: shade matched at the examination, tooth kept clean and dry, composite placed usually in thin layers and hardened with a special light, bite checked with marking paper, and 'a very small, shallow cavity may not need' anaesthesia.
- [ ] Please check the sensitivity wording: cold sensitivity for a few days, which can last a few weeks after a deep filling; 'pain when you bite often means the filling is slightly high, which does not settle by itself'.
- [ ] The table row 'Deep cavity close to the nerve: a filling, sometimes with a protective layer placed underneath' describes general practice only. Please confirm or adjust.
- [ ] FAQ 2: 'you can usually go back to work or college straight afterwards'.
- [ ] Silver (amalgam) filling FAQ: intact fillings can usually be left in place; cracked or leaking ones can often be replaced with a tooth-coloured filling, or a crown if little tooth is left.
- [ ] Pregnancy FAQ: fillings can usually be done during pregnancy; tell your dentist so the anaesthesia, any X-rays and the timing of non-urgent treatment can be planned.
- [ ] FAQ 'Can a cavity heal on its own?': very early decay (a chalky white spot) can sometimes be stopped with fluoride, better brushing and less sugar.
- [ ] The answer says the filling 'suits cavities that have not reached the nerve', and the guide says a filled tooth with decay in the pulp 'usually' needs root canal treatment then a filling or crown. These are adult rules of thumb and leave out pulp treatments for milk teeth, which the kids dentistry page covers.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Root Canal Treatment (RCT) — `/treatments/root-canal-treatment`

Guide file: `src/content/treatments/root-canal-treatment.ts`

- [ ] The procedure steps say canals are cleaned 'with fine rotary instruments'. This is backed only by the FAQ in data.ts ('rotary endodontics'). Please confirm rotary files are used routinely at Neudental.
- [ ] The procedure steps say Dr. Swetha takes a digital X-ray as the first step. Please confirm digital X-rays are taken for every root canal case, and whether the X-ray cost is included in the root canal price range or charged separately.
- [ ] The duration '40-60 minutes per sitting' comes from TREATMENTS. Molars with complex canals often take longer than 60 minutes. Please confirm this range, or update TREATMENTS.duration.
- [ ] Please confirm the cost factors (which tooth it is and how complex the canals are), and whether visits needed after a medicated dressing are included in the same price.
- [ ] Root canal re-treatment (redoing an old root canal) was removed from the cost factors. Please confirm whether Neudental offers re-treatment and whether it falls within the listed range; if so, it can be added back.
- [ ] Please confirm the crown advice: back teeth and teeth that have lost a lot of structure usually need a crown, while some front teeth with enough healthy structure only need a filling. Please also confirm that the crown is charged separately (the original guide stated this; data.ts does not).
- [ ] Please confirm the new safety advice: swelling that spreads towards the eye or neck, or difficulty swallowing or breathing, needs urgent medical care. Please also confirm the line that most people can return to work or college the same day.
- [ ] Please confirm the new limits paragraph: a crack running into the root, too little tooth left to rebuild, or a tooth loosened by advanced gum disease may mean the tooth cannot be saved.
- [ ] Outside this file, other copy contradicts the guide's cautious tone and was not changed. The TREATMENTS description in data.ts ('Saves infected tooth, pain-free') appears under the page heading, and FAQS faq-1 ('virtually painless', 'advanced local anesthesia') is site-wide. Please consider softening both to match the guide.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Crowns & Bridges — `/treatments/dental-crowns-and-bridges`

Guide file: `src/content/treatments/dental-crowns-and-bridges.ts`

- [ ] Price scope: the answer, the cost FAQ and the cost table say 'crowns and bridges cost {{price}}' (₹4,000 – ₹12,000) and that the cost depends on the material and the number of teeth involved. If this range is per crown or unit, a multi-unit bridge will cost more than the top of the range, and AI engines may quote a misleading bridge price. Confirm whether the range covers a whole bridge. If it is per unit, the price list (TREATMENTS.priceRange) or the wording should change.
- [ ] Materials: the guide says Neudental offers 'ceramic crowns, including metal-free options', and that metal-free crowns avoid a grey metal edge at the gum line. This implies some ceramic crowns have a metal base (porcelain-fused-to-metal). Confirm which crown materials are actually offered, for example PFM or zirconia.
- [ ] Process: confirm the visit sequence matches clinic practice: exam and X-ray; shaping under local anaesthesia, with a core build-up if needed; impression (a conventional mould is assumed, no scanner claimed) and shade; a temporary crown; fitting at the next visit; an optional bite review. Also confirm that temporaries are always provided.
- [ ] Clinical statements to confirm: a back tooth after a root canal can become brittle and usually needs a crown; occasionally a shaped tooth that still has its nerve becomes inflamed and later needs root canal treatment; a loose crown can often be re-cemented if the tooth is healthy; a chipped crown may be smoothed, repaired or replaced; any whitening is done before the crown shade is chosen.
- [ ] Aftercare: the guide says 'your dentist will show you how' to clean under a bridge with a floss threader or interdental brush, and advises patients who grind or clench to tell their dentist. It does not mention night guards as a service. Confirm, or add one if the clinic offers it.
- [ ] The crown list includes 'a badly discoloured or misshapen tooth' as a reason for a crown. Confirm the clinician is comfortable with this, given that veneers (cosmetic-dentistry page) may be preferred for appearance-only cases.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Dentures — `/treatments/dentures`

Guide file: `src/content/treatments/dentures.ts`

- [ ] Price scope: does {{price}} cover one denture (one jaw) or a full upper and lower set? The guide says only that 'one jaw or both' changes the cost.
- [ ] Follow-up visits: are the adjustment visits after fitting included in the 3-4 visits and in the fee? The guide says 'Short follow-up visits are usually needed to ease any spots that rub' and does not mention charges.
- [ ] Visit structure: please confirm that the 5 steps (examination, impressions, possibly a second detailed impression, bite record and tooth selection, wax try-in, fitting) are combined into 3-4 visits at Neudental, as the guide now says.
- [ ] Materials and types: which partial denture materials does Neudental offer (acrylic, flexible, cast metal framework)? Are immediate or temporary dentures given after extractions? The guide only says 'They can be made from different materials; your dentist will advise' and that your dentist will advise how to manage the gap while extraction sites heal.
- [ ] Implant-retained dentures (overdentures) are mentioned only as general information ('ask your dentist'). Confirm whether Neudental offers them before anything stronger is said.
- [ ] Relining, repairs and remakes are mentioned as things a denture 'may need' over the years, not as Neudental services. Please confirm whether they are offered and how they are charged.
- [ ] Medical statements to confirm: upper dentures held by suction, lower dentures less stable; take dentures out at night unless advised otherwise, because this lowers soreness and infection risk; clean with a soft brush and denture cleaner or mild soap, and avoid gritty cleaners, bleach and hot or boiling water; chew on both sides with soft food at first; ask about denture adhesive; dentures 'usually last several years'.
- [ ] Red-flag threshold: the guide says to see a dentist about an ulcer, lump or patch that has not healed after two weeks. Some guidance uses three weeks. Please confirm the threshold Dr. Swetha prefers.
- [ ] Comparison claims: dentures 'usually cost less than implants'; implants 'help preserve the bone' (from the implants features list) and need 'several months'.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Cosmetic Dentistry — `/treatments/cosmetic-dentistry`

Guide file: `src/content/treatments/cosmetic-dentistry.ts`

- [ ] Veneer materials: does Neudental offer ceramic (porcelain), composite or both? Both are described as general information. The steps now cover both a lab-made path (impression, temporaries, try-in) and a composite path built directly on the tooth. Remove whichever the clinic does not offer.
- [ ] What 'Tooth shape & colour enhancement' means in practice (for example composite bonding, smoothing tooth edges, closing small gaps). The guide lists the problems it fixes ('a chipped edge, an uneven tooth, a small gap or a tooth darker than the rest') but not the method. Confirm that a single darker tooth belongs on that 'smaller corrections' list. The page's note says such a tooth may need an X-ray or root canal first.
- [ ] Temporary veneers: the guide says temporary covers 'may be placed' while lab-made veneers are made. Confirm whether the clinic does this.
- [ ] Waiting after whitening: the guide says there is 'a short wait for the shade to settle' before veneers are matched. Confirm that this matches the clinic's practice.
- [ ] Visit count: the guide gives 2-3 visits for a veneer makeover, from TREATMENTS, and says smaller corrections 'may need fewer visits'. Confirm whether simple shape or colour corrections can be done in one sitting. If they can, it could be stated.
- [ ] Night guard: the aftercare section says 'a protective night guard may be advised' for people who grind their teeth. This is general advice, not presented as a clinic service. Confirm or remove it.
- [ ] Pricing: the '₹5000+' price shows as 'From ₹5,000'. Confirm what the starting price covers (for example one small correction or the start of a veneer case), and whether the clinic wants to publish an upper limit so {{price}} reads as a range.
- [ ] Billing: the cost table says fillings, cleaning, gum treatment and whitening done first 'are separate treatments with their own cost'. Confirm that is how the clinic bills.
- [ ] Mainstream statements to confirm before setting reviewedBy: most veneers need a thin layer of enamel removed and this cannot be undone; ceramic usually resists staining better, while composite needs less tooth removed and is easier to repair; veneers do not lighten with whitening; mild sensitivity for a few days after fitting is common; a tooth darkened after an injury should be checked with an X-ray first.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Teeth Whitening — `/treatments/teeth-whitening`

Guide file: `src/content/treatments/teeth-whitening.ts`

- [ ] What happens at each of the '2-3 visits'? The guide no longer says the first examination counts as one of them. Confirm whether the examination and the first whitening sitting can be on the same day, and how far apart further sittings usually are (the guide says only 'after a gap your dentist advises').
- [ ] Confirm the method described in the steps fits the clinic's system: cheek retraction, a gum barrier ('usually'), and dentist-applied gel that may be reapplied within one sitting. No light or lamp and no take-home trays are mentioned, because data.ts lists neither.
- [ ] Is the 'Surface stain removal' polish included in the whitening price, and is heavy tartar charged as a separate cleaning? The guide says heavy tartar 'may need a professional teeth cleaning first' and links to that page.
- [ ] What moves the price from the bottom to the top of the range? The guide names starting shade, type of staining and number of sittings. It also says fillings, gum treatment and replacing restorations are charged separately.
- [ ] Minimum age for cosmetic whitening. The guide says it is generally not advised for children and young teenagers and that the dentist will advise on a suitable age.
- [ ] Aftercare: avoiding coloured food and drinks, smoking and paan for 48 hours after each sitting is general advice. Confirm the time the clinic gives patients.
- [ ] Medical statements to check: results often last 'several months to a few years'; sensitivity usually lasts 'a day or a few days'; gum whitening where gel touched 'usually fades within hours'; the shade 'settles slightly over the next few days'; pregnancy and breastfeeding, so postpone; a single dark tooth after injury needs an exam and X-ray and may need root canal treatment before any whitening.
- [ ] Touch-ups: the guide says 'Ask your dentist about a touch-up sitting'. Confirm the clinic offers them.
- [ ] Outside this file: TREATMENTS.description in src/data.ts for whitening is 'Instant brighter, whiter smile' and shows right under the h1. 'Instant' is a mild overclaim next to a guide that says the shade settles over a few days and may need more than one sitting. Consider changing the data entry.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Orthodontic Treatment — `/treatments/braces`

Guide file: `src/content/treatments/braces.ts`

- [ ] Who provides braces at Neudental: Dr. Swetha herself (her bio mentions orthodontics, but her skills list names only Clear Aligners) or a visiting orthodontist? The guide only says Dr. Swetha examines and plans, and it says 'your dentist will tell you if a specialist opinion is needed' for jaw-size problems.
- [ ] Review interval: the guide now says 'usually every 4 to 8 weeks, as your dentist advises' (steps and FAQ). Confirm this matches the clinic's actual schedule.
- [ ] Orthodontic records: the guide says X-rays are 'usually a full-mouth OPG and sometimes other views', plus 'photographs and moulds'. Confirm whether a lateral cephalogram is taken in-house or referred out, and whether impressions or digital scans are used for braces.
- [ ] Price coverage: does {{price}} cover one or both jaws, X-rays, retainers, and any cleaning, fillings or extractions done first? The cost table tells patients to ask about these rather than stating them. Confirm that ceramic braces usually cost more than metal at the clinic (the table and FAQ say so).
- [ ] Extractions: the guide says removing some teeth, usually premolars, is sometimes advised for severe crowding. Confirm the wording.
- [ ] Ages: 'an orthodontic check by around age 7 is commonly recommended' and 'most children who need braces start between about 10 and 14'. Also confirm whether the clinic offers early (interceptive) appliances, which the guide does not mention.
- [ ] Retainers: the guide describes removable (clear tray or wire) and fixed bonded retainers generally, worn 'most of the day at first, then at night ... often long-term'. Confirm which types the clinic provides, the wear protocol, and whether the first retainer is included.
- [ ] Safety statements to confirm: fitting brackets 'usually needs no injection'; root resorption is something 'your dentist watches for during treatment' (this implies progress X-rays); the nickel or metal allergy advice; orthodontic wax for a poking wire (the guide does not say the clinic supplies wax).
- [ ] Timeline: 'severe crowding, a significant bite problem or adult treatment can take longer' than the listed 12-24 months. Confirm the clinic is comfortable saying this.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Invisalign / Clear Aligners — `/treatments/clear-aligners`

Guide file: `src/content/treatments/clear-aligners.ts`

- [ ] Brand and system: TREATMENTS names this 'Invisalign / Clear Aligners' with the keyword 'Invisalign Chennai', and that name appears in the page's breadcrumb and at-a-glance table. The guide stays generic and says Invisalign is one brand. Confirm which aligner system Neudental uses before any brand is named or the treatment name is kept as it is.
- [ ] Who designs the digital plan (in-house, or by the aligner lab with Dr. Swetha's approval), and whether records are taken with impressions or an intraoral scan. The guide says 'impressions and photographs' and 'overseen by Dr. Swetha'.
- [ ] Whether X-rays (for example an OPG) are routinely taken before aligner treatment. The guide now says they are 'usually taken'.
- [ ] The clinic's tray-change interval and how often review visits happen. The guide says 'often every one to two weeks' and 'short review visits'.
- [ ] What the {{price}} range covers: one jaw or both, attachments and enamel smoothing, refinement or replacement trays, review visits, retainers. Also whether cleaning, fillings or gum treatment before aligners are charged separately, as the cost table states.
- [ ] Whether the clinic offers aligners to teenagers, and from what age. The answer says aligners suit 'many adults and teenagers', which is accurate as general information.
- [ ] Which retainer types the clinic provides and the wear routine it recommends. The guide mentions removable clear and fixed wire retainers in general terms and says 'many people are advised to wear retainers at night for years'.
- [ ] Whether a jaw-position (skeletal) bite problem is treated in-house or referred. The guide says only 'your dentist will explain the options'.
- [ ] General statements to confirm: 'Most people get used to aligners within a few days'; a new set feels tight 'for a day or two'; take trays out for any drink other than plain water; clean trays with a soft brush and cool water.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Wisdom Tooth Removal — `/treatments/wisdom-tooth-removal`

Guide file: `src/content/treatments/wisdom-tooth-removal.ts`

- [ ] Duration: the guide repeats TREATMENTS' '20-30 minutes' as the usual removal time, with the caveat that a deeply impacted tooth, especially a lower one, can take longer. Please confirm this is realistic for impacted (surgical) wisdom tooth removal at the clinic, and whether the time includes waiting for the anaesthetic to work.
- [ ] Cost: is the '₹3000+' starting price per tooth? Is the X-ray or OPG included or charged separately (the guide only says one is usually needed first and links to the X-ray page)? Are the review visit and stitch removal included?
- [ ] Referral: does Dr. Swetha remove all impacted wisdom teeth in-clinic, or are complex cases (roots near the inferior alveolar nerve) referred for CBCT or to an oral and maxillofacial surgeon? The guide says only that these 'may be advised'.
- [ ] Anaesthesia: the guide says the tooth is removed under local anaesthesia with the patient awake ('Will I be awake?' answers 'Yes'). Confirm that no sedation or general anaesthesia is offered or arranged.
- [ ] Visits: please confirm the wording 'usually done in one visit, sometimes with a short review about a week later to check healing or remove stitches', and whether removal can sometimes be done at the same visit as the assessment.
- [ ] Emergency triage wording: please confirm (a) a fever with a swollen face means 'see a dentist the same day', and (b) swelling spreading to the eye or neck, or difficulty swallowing or breathing, means 'go to a hospital emergency department straight away'.
- [ ] Nerve risk wording: please confirm 'uncommon and usually temporary, but in rare cases it can be long-lasting or permanent' matches what the clinic tells patients when taking consent.
- [ ] Aftercare timings: please confirm no smoking, tobacco, paan or gutka for 'at least the first few days'; no forceful spitting or hard rinsing for 24 hours; avoiding straws 'for the first few days'; warm salt-water rinses from the next day if advised.
- [ ] Outside this file: the data.ts description 'Painless impacted tooth removal' (shown under the h1) and the seoKeyword 'painless extraction Kodungaiyur' read as guarantees on YMYL content. Consider softening the description, e.g. 'Impacted wisdom tooth removal under local anaesthesia'.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Tooth Extraction — `/treatments/tooth-extraction`

Guide file: `src/content/treatments/tooth-extraction.ts`

- [ ] Duration: the guide says a straightforward extraction 'usually takes {{duration}}' (20-30 minutes) in one visit and that a surgical one can take longer. Confirm what the 20-30 minutes covers: chair time only, or also the examination, X-ray and waiting for the anaesthetic.
- [ ] Price: the open-ended '₹1000+' shows as 'From ₹1,000'. Confirm that it applies to a simple extraction and that surgical, broken-below-the-gum or multiple extractions usually cost more, as the cost FAQ now says. Confirm whether the X-ray (or Dental Imaging charge) and any review or stitch-removal visit are included. Adding an upper limit to priceRange would let {{price}} show a full range.
- [ ] Surgical extraction: confirm the clinic does these in-house (the features say 'Simple & surgical tooth extraction') and that the description is right (a small opening in the gum, the tooth sometimes removed in pieces, stitches often placed).
- [ ] Medical history step: confirm the list asked about before extraction: diabetes, high blood pressure, heart problems, bleeding disorders, pregnancy, blood thinners and osteoporosis medicines (newly added). Also confirm the pregnancy/diabetes/blood-thinner FAQ statement that 'your dentist may check with your doctor first'.
- [ ] Aftercare advice to confirm: bite on gauze as long as advised; slight oozing for the rest of the day is normal; no rinsing, forceful spitting or straws for 24 hours; soft, lukewarm food once numbness wears off; no smoking for at least 48 hours; avoid chewing tobacco, paan and alcohol for the first few days; cold pack on and off on day one; warm salt-water rinses from the next day; keep brushing, taking care around the socket.
- [ ] When-to-call thresholds: bleeding that does not slow after half an hour of biting on gauze; swelling that worsens after the third day; fever or pus; numbness not worn off by the next day (newly worded); dry socket usually at two to four days with pain spreading to the ear. Emergency department for difficulty breathing or swallowing, or fast-spreading swelling. Is there an out-of-hours contact for these?
- [ ] Healing timeline: swelling and soreness peak in two to three days; most people feel much better within a week or so (newly added); gum closes over in a few weeks; bone fills in over months.
- [ ] Stitches: the duration FAQ says patients 'may be asked to come back briefly' to check healing or remove stitches. Confirm whether the clinic usually uses dissolving stitches and whether the review visit is included.
- [ ] Replacement timing FAQ: bridge or denture once the gum has settled (a few weeks to a few months); implant often after a few months, sometimes sooner. Confirm this matches the clinic's practice, and whether it offers immediate dentures or immediate implants (the guide does not claim either).
- [ ] Return-to-work FAQ: many people return to desk work the next day, some the same day after a simple extraction; avoid heavy work and exercise for a day or two.
- [ ] Scope: should baby-tooth extractions be mentioned here or left to Kids Dentistry? Dr. Swetha's bio mentions extractions but her skills list does not; should it?
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Gum Disease Treatment — `/treatments/gum-disease-treatment`

Guide file: `src/content/treatments/gum-disease-treatment.ts`

- [ ] Cost scope: does {{price}} (₹2,000 – ₹5,000) cover a whole course of deep cleaning, or is it charged per sitting or per area? Is gum surgery inside that range or charged separately? The page now says 'typically costs {{price}}' and only says surgery's cost 'is explained before it is planned'.
- [ ] Which gum surgeries are done at Neudental (e.g. surgery to clean deep pockets) and which are referred to a specialist? The page says Dr. Swetha 'will explain why, what it involves, the healing time and the cost', and describes surgery as lifting the gum to clean the roots, then reshaping it.
- [ ] Laser use in gum disease: the page says some gum procedures can be done with a laser, often with less bleeding and a quicker recovery, but that a laser does not replace cleaning the roots. Confirm this matches how the clinic uses its laser.
- [ ] Maintenance interval: the page says maintenance visits are 'often every three to four months at first, rather than every six', and the review comes 'a few weeks' after deep cleaning. Confirm these match clinic practice.
- [ ] Visit pattern: the page says mild cases may need one or two sittings, and widespread disease is cleaned 'one section of the mouth at a time over several sittings', each lasting {{duration}} (40-60 minutes). Confirm this matches how deep cleaning is scheduled.
- [ ] Local anaesthesia for deep cleaning is described as 'usually' given. Confirm this is the clinic's normal practice.
- [ ] Who does the deep cleaning (Dr. Swetha or a hygienist)? The page names Dr. Swetha only for the assessment and for explaining surgery. Deep-cleaning steps are written in the passive voice.
- [ ] Systemic claims to confirm: diabetes is described as a two-way link (poorly controlled blood sugar worsens gum disease, and severe gum infection can make blood sugar harder to control). Smoking is said to mask bleeding, and chewing tobacco to cause recession where it is held.
- [ ] Whether the clinic splints loose teeth or treats receding gums (e.g. grafts) is not stated. The page says only that receded gum usually does not grow back and that the dentist will advise.
- [ ] reviewedBy and dateModified are deliberately left unset until Dr. Swetha reviews the page.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Dental Implants — `/treatments/dental-implants`

Guide file: `src/content/treatments/dental-implants.ts`

- [ ] Does {{price}} (₹30,000-₹50,000) cover the whole treatment for one implant (implant, abutment and crown), or is the crown or abutment charged separately? Is the range per implant? The guide only tells patients to ask what the quote covers, and to ask for a full-plan quote if they need more than one implant.
- [ ] Cost table and FAQ: confirm that an extraction, gum treatment or fillings needed before an implant are charged as separate treatments.
- [ ] Confirm that the 3-6 month timeline is right from assessment to final crown, and that the upper jaw often needs longer than the lower jaw.
- [ ] Confirm what 'Digital implant planning' involves at Neudental. The guide says planning is done digitally 'from your scans' and that 'a 3D scan (CBCT) may also be advised'. Is CBCT taken in-house or referred, and are surgical guides used? The guide makes no claim either way.
- [ ] Who places the implant: Dr. Swetha or a visiting implantologist? The guide names Dr. Swetha only for the assessment step.
- [ ] Bone grafting, temporary teeth while the implant heals, and implants that hold a bridge or a denture are described only as 'ask your dentist whether this suits you'. Confirm whether Neudental offers any of these, so they can be stated, or removed if never offered.
- [ ] Confirm the usual visit pattern given in the visits FAQ: assessment, placing the implant, checking the healing, then impression and crown fitting. Also confirm whether review visits and stitch removal are routine.
- [ ] Confirm the medical-history wording added for safety: blood thinners, osteoporosis medicines and past head or neck radiotherapy 'can affect whether and how an implant is placed', and well-controlled diabetes 'often' allows implants.
- [ ] Confirm the aftercare red flags: a loose implant, lip or chin numbness that does not wear off, and spreading swelling or difficulty swallowing or breathing needing urgent care.
- [ ] In data.ts (not this file), the implants description 'Permanent tooth replacement' appears under the h1 and conflicts with the no-guarantee rule; consider rewording it, e.g. 'Fixed, long-term tooth replacement'.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Laser Dentistry — `/treatments/laser-dentistry`

Guide file: `src/content/treatments/laser-dentistry.ts`

- [ ] Which laser gum procedures does Neudental actually do? The answer and body give 'trimming or reshaping overgrown or uneven gum' (gingivectomy or gum contouring), gummy-smile reshaping, laser use alongside deep cleaning in gum disease, and trimming gum before a filling or crown as examples of 'laser gum procedures'. Remove any the clinic does not offer.
- [ ] What type of laser does the clinic use (soft-tissue diode, or erbium hard/soft-tissue)? The 'what it feels like' text was made generic (warmth, slight smell). Confirm it matches what patients actually feel and hear.
- [ ] Is a numbing gel alone really enough for some minor laser procedures at this clinic? The table and step 2 say so.
- [ ] Inconsistency with existing clinic content. The linked blog post painless-laser-dentistry-explained says lasers are used for 'cavity treatment' and calls 'painless dentistry' a 'realistic promise'. This guide's FAQ says most cavities are treated with conventional instruments and that Neudental offers laser gum procedures. Please reconcile the blog post, or confirm whether the clinic uses a laser on teeth.
- [ ] The TREATMENTS description 'Bloodless, suture-free procedures' appears directly under the h1. The guide says 'usually less bleeding' and 'often no stitches; larger procedures may still need them'. Consider softening the description in data.ts, e.g. 'Gum procedures with less bleeding'. The seoKeyword 'painless laser treatment' also conflicts with the guide's 'not always pain-free'.
- [ ] Is a review visit routinely offered, and is it included in the {{price}} range? When the laser is one step of a gum disease plan, is it charged separately? The guide only says a review 'may be suggested' and that the dentist explains what each part costs.
- [ ] Are there patients for whom the clinic avoids the laser (e.g. certain medical conditions or medicines that make the skin sensitive to light)? The guide only says Dr. Swetha asks about health and medicines and will explain the conventional option.
- [ ] Confirm the new limits/risks bullets fit the clinic's practice: overgrown gum can recur if plaque, braces or a medicine are still a factor, and healing is sometimes slower than expected.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.

## Kids Dentistry — `/treatments/kids-dentistry`

Guide file: `src/content/treatments/kids-dentistry.ts`

- [ ] Cost scope: confirm what the Kids Dentistry range ({{price}}) covers. Does a child's filling fall inside it, or is it billed at the Cavity Filling price? Are milk-tooth nerve treatment, crowns and extractions charged separately? The guide now says only that the cost depends on whether the visit is a check-up or includes treatment such as a filling.
- [ ] Confirm the clinic does milk-tooth nerve treatment (pulpotomy/pulpectomy) and crowns for milk teeth. The guide mentions them as general treatment ('may need ... often followed by a crown') without listing them as Neudental services.
- [ ] Space maintainers, sealants and fluoride application are mentioned only as 'ask your dentist whether ... suits your child'. If the clinic offers them, the wording could be firmer. If it does not, confirm this general mention is acceptable.
- [ ] Whether X-rays for a child cost extra or are complimentary, as on the check-up page. Any mention of X-rays as a cost factor has been removed.
- [ ] Knocked-out adult tooth: the guide tells parents to keep the tooth in milk and see a dentist straight away. It does not tell them to put the tooth back themselves, although current trauma guidelines prefer that when possible. Confirm this conservative advice is what the clinic wants.
- [ ] Typical ages and timings: first visit soon after the first tooth and by the first birthday; rice-grain amount of fluoride toothpaste under 3 and pea-sized from 3 to 6; help with brushing until about 7 or 8; thumb sucking usually stops by 2 to 4; move to a cup around the first birthday; orthodontic check by about age 7; and the eruption table (6-12 months, all 20 by about 3, first molars at about 6, second molars at about 12-13).
- [ ] New FAQ on injections: 'Some small cavities can be treated without numbing'. Confirm this matches how Dr. Swetha treats children.
- [ ] 'Neudental recommends check-ups every six months' (from FAQS faq-2) and 'you are told the plan and cost before anything is started' (from the page's booking box text). Confirm both apply to children's visits.
- [ ] Steps describe Dr. Swetha seeing the child and a 'child-friendly approach' (going at the child's pace, explaining each step). Confirm this describes the clinic's practice.
- [ ] Whole page read and approved by Dr. Swetha → add `reviewedBy` and `dateModified`.
