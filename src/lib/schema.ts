// neudental v1 - schema.org structured data for each kind of page.
// Built from src/data.ts, so the JSON-LD search engines and AI answer engines
// read always matches the text on the page -- nothing here is kept in sync by
// hand. siteJsonLd() is on every page and defines the nodes the per-page
// graphs point at by @id: the clinic (#dentist), the website (#website) and
// Dr. Swetha (#dr-swetha).
import { BLOGS, CLINIC, CLINIC_GOOGLE_URL, DOCTOR, FAQS, REVIEW_COUNT_LABEL, REVIEW_RATING, TREATMENTS } from '../data';
import type { BlogBlock, BlogFAQ, BlogPost, Treatment, TreatmentGuide } from '../types';
import { DOCTOR_PATH } from './routes';
import { fillTokens, priceBounds, treatmentPath } from './treatments';

export const SITE_URL = 'https://www.neudental.in';
const DENTIST_ID = `${SITE_URL}/#dentist`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DOCTOR_ID = `${SITE_URL}/#dr-swetha`;
const BLOG_ID = `${SITE_URL}/blogs#blog`;
const BLOG_NAME = 'Neudental Dental Health Blog';
const PRICE_LIST_ID = `${SITE_URL}/treatments#price-list`;

export function procedureId(treatment: Treatment) {
  return `${SITE_URL}${treatmentPath(treatment)}#procedure`;
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// Strips the **bold** / [link](/path) markers post text may use.
export function plainText(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

export function postUrl(post: BlogPost) {
  return `${SITE_URL}/blogs/${post.id}`;
}

export function absoluteUrl(path: string) {
  return /^https?:\/\//.test(path) ? path : SITE_URL + (path.startsWith('/') ? path : `/${path}`);
}

// datePublished when the post has one; otherwise its "Month YYYY" display
// date as an ISO year-month ("2026-08"), which is still a valid date for
// schema.org and sitemaps rather than an invented day.
export function postPublishedDate(post: BlogPost): string | undefined {
  if (post.datePublished) return post.datePublished;
  const match = post.date.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/);
  const month = match ? MONTHS.indexOf(match[1]) : -1;
  return match && month >= 0 ? `${match[2]}-${String(month + 1).padStart(2, '0')}` : undefined;
}

export function postModifiedDate(post: BlogPost): string | undefined {
  return post.dateModified ?? postPublishedDate(post);
}

// Every piece of readable text in a body of content blocks, in order,
// without markup, split the way the page shows it (a table's label and
// value are separate cells).
export function contentTexts(blocks: BlogBlock[], faqs?: BlogFAQ[]): string[] {
  const out: string[] = [];
  const add = (text: string) => out.push(plainText(text));
  blocks.forEach((block: BlogBlock) => {
    if (typeof block === 'string') return add(block);
    switch (block.type) {
      case 'heading':
      case 'subheading':
      case 'answer':
      case 'note':
      case 'quote':
        return add(block.text);
      case 'list':
        return block.items.forEach(add);
      case 'steps':
        return block.items.forEach((step) => { add(step.title); add(step.text); });
      case 'table':
        add(block.caption);
        return block.rows.forEach(([label, value]) => { add(label); add(value); });
      case 'cta':
        add(block.title);
        return add(block.text);
      default:
        return undefined;
    }
  });
  faqs?.forEach((faq) => { add(faq.question); add(faq.answer); });
  return out;
}

export function postTextBlocks(post: BlogPost): string[] {
  return contentTexts(post.content, post.faqs);
}

// The clinic, its lead dentist and the website: on every page.
export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dentist',
        '@id': DENTIST_ID,
        name: 'neudental',
        alternateName: [CLINIC.formerName, CLINIC.name, 'neudental Family Dental Clinic'],
        slogan: 'Modern Dental Care for Confident Smiles',
        description: 'Family dental clinic in Kodungaiyur, North Chennai offering painless root canal treatment, Invisalign clear aligners, teeth whitening, dental implants and pediatric dentistry.',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/brand/neudental-logo.png`,
        image: `${SITE_URL}/og-image.jpg`,
        telephone: CLINIC.phone.replace(/^\+91 (\d{5}) (\d{5})$/, '+91-$1-$2'),
        email: CLINIC.email,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINIC.streetAddress,
          addressLocality: CLINIC.locality,
          addressRegion: CLINIC.region,
          postalCode: CLINIC.postalCode,
          addressCountry: 'IN',
        },
        geo: { '@type': 'GeoCoordinates', ...CLINIC.geo },
        hasMap: CLINIC_GOOGLE_URL,
        areaServed: ['Kodungaiyur, Chennai', 'North Chennai', 'Chennai'].map((name) => ({ '@type': 'Place', name })),
        sameAs: [
          'https://www.facebook.com/profile.php?id=61589206920105',
          'https://www.instagram.com/neudental_clinic/',
          'https://www.youtube.com/channel/UCfyFaSu7_EJshABsfOuBbWw',
        ],
        employee: { '@id': DOCTOR_ID },
        // Each procedure is described in full on its own page (same @id).
        availableService: TREATMENTS.map((t) => ({ '@type': 'MedicalProcedure', '@id': procedureId(t), name: t.name, url: SITE_URL + treatmentPath(t) })),
        openingHoursSpecification: CLINIC.sessions.map(({ opens, closes }) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens,
          closes,
        })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: REVIEW_RATING,
          reviewCount: String(parseInt(REVIEW_COUNT_LABEL, 10)),
        },
      },
      {
        '@type': 'Person',
        '@id': DOCTOR_ID,
        name: DOCTOR.name,
        honorificSuffix: DOCTOR.title,
        jobTitle: DOCTOR.specialty,
        alumniOf: [DOCTOR.education, DOCTOR.experience].map((name) => ({ '@type': 'CollegeOrUniversity', name })),
        memberOf: { '@type': 'Organization', name: 'Indian Dental Association' },
        knowsAbout: DOCTOR.skills,
        url: SITE_URL + DOCTOR_PATH,
        image: `${SITE_URL}/doctor/dr-swetha.webp`,
        worksFor: { '@id': DENTIST_ID },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'neudental',
        alternateName: ['Neudental', CLINIC.formerName],
        inLanguage: 'en-IN',
        publisher: { '@id': DENTIST_ID },
      },
    ],
  };
}

function reviewer(reviewedBy: string | undefined) {
  if (!reviewedBy) return undefined;
  return reviewedBy.startsWith(DOCTOR.name) ? { '@id': DOCTOR_ID } : { '@type': 'Person', name: reviewedBy };
}

function breadcrumb(id: string, items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
}

function faqPage(id: string, url: string, faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    url,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) },
    })),
  };
}

// Homepage: the FAQ list shown on the page. The clinic itself is described
// by the sitewide #dentist node in index.html.
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [{ ...faqPage(`${SITE_URL}/#faq`, `${SITE_URL}/`, FAQS), about: { '@id': DENTIST_ID } }],
  };
}

export function blogListJsonLd(title: string, description: string) {
  const url = `${SITE_URL}/blogs`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url,
        url,
        name: title,
        description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': BLOG_ID },
      },
      {
        '@type': 'Blog',
        '@id': BLOG_ID,
        name: BLOG_NAME,
        url,
        publisher: { '@id': DENTIST_ID },
        blogPost: BLOGS.map((post) => {
          const published = postPublishedDate(post);
          return {
            '@type': 'BlogPosting',
            '@id': `${postUrl(post)}#article`,
            headline: post.title,
            url: postUrl(post),
            ...(published ? { datePublished: published } : {}),
            image: absoluteUrl(post.image),
          };
        }),
      },
      breadcrumb(`${url}#breadcrumb`, [['Home', `${SITE_URL}/`], ['Blog', url]]),
    ],
  };
}

export function blogPostJsonLd(post: BlogPost) {
  const url = postUrl(post);
  const published = postPublishedDate(post);
  const modified = postModifiedDate(post);
  const reviewedBy = reviewer(post.reviewedBy);
  const image = absoluteUrl(post.image);
  const wordCount = postTextBlocks(post).join(' ').split(/\s+/).filter(Boolean).length;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: post.seoTitle ?? post.title,
      description: post.excerpt,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      primaryImageOfPage: { '@type': 'ImageObject', url: image },
      ...(reviewedBy ? { reviewedBy, ...(modified ? { lastReviewed: modified } : {}) } : {}),
    },
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      url,
      mainEntityOfPage: { '@id': url },
      isPartOf: { '@type': 'Blog', '@id': BLOG_ID, name: BLOG_NAME, url: `${SITE_URL}/blogs` },
      image,
      ...(published ? { datePublished: published } : {}),
      ...(modified ? { dateModified: modified } : {}),
      inLanguage: 'en-IN',
      articleSection: post.category,
      wordCount,
      author: { '@id': DENTIST_ID },
      publisher: { '@id': DENTIST_ID },
    },
    breadcrumb(`${url}#breadcrumb`, [['Home', `${SITE_URL}/`], ['Blog', `${SITE_URL}/blogs`], [post.title, url]]),
  ];
  if (post.faqs?.length) graph.push(faqPage(`${url}#faq`, url, post.faqs));
  return { '@context': 'https://schema.org', '@graph': graph };
}

function priceSpecification(treatment: Treatment) {
  const { min, max } = priceBounds(treatment.priceRange);
  if (min !== undefined && max === min) return { '@type': 'PriceSpecification', priceCurrency: 'INR', price: min };
  return {
    '@type': 'PriceSpecification',
    priceCurrency: 'INR',
    ...(min !== undefined ? { minPrice: min } : {}),
    ...(max !== undefined ? { maxPrice: max } : {}),
  };
}

function treatmentOffer(treatment: Treatment, id?: string) {
  return {
    '@type': 'Offer',
    ...(id ? { '@id': id } : {}),
    itemOffered: { '@id': procedureId(treatment) },
    offeredBy: { '@id': DENTIST_ID },
    priceCurrency: 'INR',
    priceSpecification: priceSpecification(treatment),
    url: SITE_URL + treatmentPath(treatment),
  };
}

// A treatment page: the page (reviewed by Dr. Swetha once she has), the
// procedure, its price at the clinic, breadcrumbs and the guide's FAQs.
export function treatmentJsonLd(treatment: Treatment, guide: TreatmentGuide | undefined, title: string, description: string) {
  const url = SITE_URL + treatmentPath(treatment);
  const fill = (text: string) => plainText(fillTokens(text, treatment));
  const reviewedBy = reviewer(guide?.reviewedBy);
  const modified = guide?.dateModified ?? guide?.datePublished;
  const steps = guide?.content.find((b): b is Extract<BlogBlock, { type: 'steps' }> => typeof b === 'object' && b.type === 'steps');
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'MedicalWebPage',
      '@id': url,
      url,
      name: title,
      description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      about: { '@id': procedureId(treatment) },
      mainEntity: { '@id': procedureId(treatment) },
      ...(guide ? { datePublished: guide.datePublished } : {}),
      ...(modified ? { dateModified: modified } : {}),
      ...(reviewedBy ? { reviewedBy, ...(modified ? { lastReviewed: modified } : {}) } : {}),
    },
    {
      '@type': 'MedicalProcedure',
      '@id': procedureId(treatment),
      name: treatment.name,
      ...(treatment.alternateNames?.length ? { alternateName: treatment.alternateNames } : {}),
      description: guide ? fill(guide.answer) : treatment.description,
      url,
      ...(steps ? { howPerformed: steps.items.map((step, i) => `${i + 1}. ${fill(step.title)}: ${fill(step.text)}`).join(' ') } : {}),
    },
    treatmentOffer(treatment, `${url}#offer`),
    breadcrumb(`${url}#breadcrumb`, [['Home', `${SITE_URL}/`], ['Treatments', `${SITE_URL}/treatments`], [treatment.name, url]]),
  ];
  if (guide?.faqs.length) graph.push(faqPage(`${url}#faq`, url, guide.faqs.map((f) => ({ question: fill(f.question), answer: fillTokens(f.answer, treatment) }))));
  return { '@context': 'https://schema.org', '@graph': graph };
}

// /treatments: the list of treatment pages and the clinic's price list.
export function treatmentsListJsonLd(title: string, description: string) {
  const url = `${SITE_URL}/treatments`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url,
        url,
        name: title,
        description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': DENTIST_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': PRICE_LIST_ID },
      },
      {
        '@type': 'OfferCatalog',
        '@id': PRICE_LIST_ID,
        name: 'Dental treatments and prices at neudental, Kodungaiyur',
        itemListElement: TREATMENTS.map((t) => treatmentOffer(t, `${SITE_URL}${treatmentPath(t)}#offer`)),
      },
      breadcrumb(`${url}#breadcrumb`, [['Home', `${SITE_URL}/`], ['Treatments', url]]),
    ],
  };
}

// /dr-swetha: a profile page whose subject is the sitewide #dr-swetha node.
export function doctorJsonLd(title: string, description: string) {
  const url = SITE_URL + DOCTOR_PATH;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': url,
        url,
        name: title,
        description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': DOCTOR_ID },
      },
      breadcrumb(`${url}#breadcrumb`, [['Home', `${SITE_URL}/`], [DOCTOR.name, url]]),
    ],
  };
}
