// neudental v1 - schema.org structured data for each kind of page.
// Built from src/data.ts, so the JSON-LD search engines and AI answer engines
// read always matches the text on the page -- nothing here is kept in sync by
// hand. index.html carries the sitewide nodes these point at by @id: the
// clinic (#dentist), the website (#website) and Dr. Swetha (#dr-swetha).
import { BLOGS, DOCTOR, FAQS } from '../data';
import type { BlogBlock, BlogPost } from '../types';

export const SITE_URL = 'https://www.neudental.in';
const DENTIST_ID = `${SITE_URL}/#dentist`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DOCTOR_ID = `${SITE_URL}/#dr-swetha`;
const BLOG_ID = `${SITE_URL}/blogs#blog`;

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

// Every piece of readable text in a post, in order, without markup.
export function postTextBlocks(post: BlogPost): string[] {
  const out: string[] = [];
  const add = (text: string) => out.push(plainText(text));
  post.content.forEach((block: BlogBlock) => {
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
        return block.items.forEach((step) => add(`${step.title}: ${step.text}`));
      case 'table':
        add(block.caption);
        return block.rows.forEach(([label, value]) => add(`${label}: ${value}`));
      case 'cta':
        add(block.title);
        return add(block.text);
      default:
        return undefined;
    }
  });
  post.faqs?.forEach((faq) => { add(faq.question); add(faq.answer); });
  return out;
}

function reviewer(post: BlogPost) {
  if (!post.reviewedBy) return undefined;
  return post.reviewedBy.startsWith(DOCTOR.name) ? { '@id': DOCTOR_ID } : { '@type': 'Person', name: post.reviewedBy };
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
        name: 'Neudental Dental Health Blog',
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
  const reviewedBy = reviewer(post);
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
      isPartOf: { '@id': BLOG_ID },
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
