// neudental v1 - per-route document head: <title>, description, canonical,
// robots, Open Graph / Twitter cards and the page's own JSON-LD.
// One function, getRouteMeta(), decides all of it. The build writes its
// result into each prerendered HTML file (renderHeadTags), so crawlers that
// never run JavaScript -- GPTBot, ClaudeBot, PerplexityBot, social previews --
// see each page's real head; the browser applies the same result on in-app
// navigation (setPageMeta).
import { BLOGS, DOCTOR, TREATMENTS } from '../data';
import { DOCTOR_PATH } from './routes';
import { fillTokens, formatPriceRange, guideFor, treatmentById, treatmentPath } from './treatments';
import type { Route } from './routes';
import { SITE_URL, absoluteUrl, blogListJsonLd, blogPostJsonLd, doctorJsonLd, homeJsonLd, postModifiedDate, postPublishedDate, siteJsonLd, treatmentJsonLd, treatmentsListJsonLd } from './schema';

const DEFAULT_TITLE = 'Neudental | Family Dental Clinic in Kodungaiyur, Chennai';
const DEFAULT_DESCRIPTION = 'Neudental — a trusted family dental clinic in Kodungaiyur, Chennai, rated among the best dentists near you in North Chennai. Painless root canal treatment (RCT), Invisalign clear aligners, teeth whitening and dental implants, by Dr. Swetha BDS, FGDS.';
const SHARE_DESCRIPTION = 'Modern Dental Care for Confident Smiles. Painless Rotary RCT, Invisalign clear aligners and dental implants by Dr. Swetha BDS, FGDS.';
const DEFAULT_IMAGE = { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, type: 'image/jpeg', alt: 'neudental — Modern Dental Care for Confident Smiles' };
const BLOG_LIST_TITLE = 'Dental Health Blog | Neudental, Kodungaiyur, Chennai';
const BLOG_LIST_DESCRIPTION = 'Practical, patient-friendly dental health and clinic guidance from the Neudental team in Kodungaiyur, Chennai.';
const TREATMENTS_TITLE = 'Dental Treatments & Prices in Kodungaiyur | Neudental';
const TREATMENTS_DESCRIPTION = `All ${TREATMENTS.length} dental treatments at Neudental, Kodungaiyur, Chennai, with typical durations and indicative prices: root canal, implants, braces, aligners, whitening and more.`;
const DOCTOR_TITLE = `${DOCTOR.name}, ${DOCTOR.title}: Dentist in Kodungaiyur | Neudental`;
const DOCTOR_DESCRIPTION = `${DOCTOR.name} (${DOCTOR.title}), ${DOCTOR.specialty} at Neudental, Kodungaiyur, Chennai: qualifications, experience, areas of expertise and how to book.`;

export interface PageMeta {
  title: string;
  description: string;
  // Social card text; defaults to description.
  shareDescription?: string;
  path: string;
  noIndex?: boolean;
  ogType: 'website' | 'article' | 'profile';
  image: { url: string; width?: number; height?: number; type?: string; alt: string };
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: object;
}

// Size and type of an image under public/, when known. The build reads them
// from the files so share cards can state them; the browser doesn't need to.
export type ImageInfo = (src: string) => { width: number; height: number; type: string } | undefined;

export function getRouteMeta(route: Route, pathname = '/', imageInfo?: ImageInfo): PageMeta {
  switch (route.type) {
    case 'blogPost': {
      const post = BLOGS.find((b) => b.id === route.blogId);
      if (!post) return getRouteMeta({ type: 'notFound' }, pathname);
      return {
        title: post.seoTitle ?? `${post.title} | Neudental Blog`,
        description: post.excerpt,
        path: `/blogs/${post.id}`,
        ogType: 'article',
        image: { url: absoluteUrl(post.image), alt: post.imageAlt ?? post.title, ...imageInfo?.(post.image) },
        publishedTime: postPublishedDate(post),
        modifiedTime: postModifiedDate(post),
        jsonLd: blogPostJsonLd(post),
      };
    }
    case 'blogsList':
      return {
        title: BLOG_LIST_TITLE,
        description: BLOG_LIST_DESCRIPTION,
        path: '/blogs',
        ogType: 'website',
        image: DEFAULT_IMAGE,
        jsonLd: blogListJsonLd(BLOG_LIST_TITLE, BLOG_LIST_DESCRIPTION),
      };
    case 'treatment': {
      const treatment = treatmentById(route.treatmentId);
      if (!treatment) return getRouteMeta({ type: 'notFound' }, pathname);
      const guide = guideFor(treatment.id);
      const title = guide ? fillTokens(guide.seoTitle, treatment) : `${treatment.name} in Kodungaiyur: Cost & Procedure | Neudental`;
      const description = guide
        ? fillTokens(guide.metaDescription, treatment)
        : `${treatment.name} at Neudental, Kodungaiyur, Chennai: ${treatment.description}. Typical duration ${treatment.duration}, indicative cost ${formatPriceRange(treatment.priceRange)}.`;
      return {
        title,
        description,
        path: treatmentPath(treatment),
        ogType: guide ? 'article' : 'website',
        image: DEFAULT_IMAGE,
        publishedTime: guide?.datePublished,
        modifiedTime: guide?.dateModified ?? guide?.datePublished,
        jsonLd: treatmentJsonLd(treatment, guide, title, description),
      };
    }
    case 'treatmentsList':
      return {
        title: TREATMENTS_TITLE,
        description: TREATMENTS_DESCRIPTION,
        path: '/treatments',
        ogType: 'website',
        image: DEFAULT_IMAGE,
        jsonLd: treatmentsListJsonLd(TREATMENTS_TITLE, TREATMENTS_DESCRIPTION),
      };
    case 'doctor':
      return {
        title: DOCTOR_TITLE,
        description: DOCTOR_DESCRIPTION,
        path: DOCTOR_PATH,
        ogType: 'profile',
        image: { url: absoluteUrl('/doctor/dr-swetha.webp'), alt: `${DOCTOR.name}, ${DOCTOR.specialty} at neudental`, ...imageInfo?.('/doctor/dr-swetha.webp') },
        jsonLd: doctorJsonLd(DOCTOR_TITLE, DOCTOR_DESCRIPTION),
      };
    case 'admin':
      return { title: 'Admin | Neudental', description: DEFAULT_DESCRIPTION, path: '/admin', noIndex: true, ogType: 'website', image: DEFAULT_IMAGE };
    case 'notFound':
      return {
        title: 'Page Not Found | Neudental',
        description: 'The page you were looking for could not be found. Return to the Neudental homepage to explore our dental treatments and book an appointment.',
        path: pathname,
        // A broken/unknown link should never get indexed under its dead URL.
        noIndex: true,
        ogType: 'website',
        image: DEFAULT_IMAGE,
      };
    case 'home':
      return {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        shareDescription: SHARE_DESCRIPTION,
        path: '/',
        ogType: 'website',
        image: DEFAULT_IMAGE,
        jsonLd: homeJsonLd(),
      };
    default: {
      // A new Route type must get its own case: the type check fails here
      // until it does (and `npm run build` runs the type check).
      const unhandled: never = route;
      throw new Error(`No page meta for route ${JSON.stringify(unhandled)}`);
    }
  }
}

// Every managed head tag, as [kind, key, value]. A null value means the tag
// must not be present on this page (e.g. image dimensions only known for the
// default share card), so moving between pages never leaves a stale one.
type HeadEntry = ['name' | 'property', string, string | null] | ['canonical', string, string];

function headEntries(meta: PageMeta): HeadEntry[] {
  const url = SITE_URL + meta.path;
  const share = meta.shareDescription ?? meta.description;
  const article = meta.ogType === 'article';
  return [
    ['name', 'description', meta.description],
    ['name', 'robots', meta.noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'],
    ['canonical', 'canonical', url],
    ['property', 'og:type', meta.ogType],
    ['property', 'og:url', url],
    ['property', 'og:title', meta.title],
    ['property', 'og:description', share],
    ['property', 'og:image', meta.image.url],
    ['property', 'og:image:width', meta.image.width ? String(meta.image.width) : null],
    ['property', 'og:image:height', meta.image.height ? String(meta.image.height) : null],
    ['property', 'og:image:type', meta.image.type ?? null],
    ['property', 'og:image:alt', meta.image.alt],
    ['property', 'article:published_time', article && meta.publishedTime ? meta.publishedTime : null],
    ['property', 'article:modified_time', article && meta.modifiedTime ? meta.modifiedTime : null],
    ['name', 'twitter:title', meta.title],
    ['name', 'twitter:description', share],
    ['name', 'twitter:image', meta.image.url],
    ['name', 'twitter:image:alt', meta.image.alt],
  ];
}

const JSON_LD_ID = 'route-jsonld';
const SITE_JSON_LD_ID = 'site-jsonld';

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// JSON inside <script> must never contain "</script" or an HTML comment opener.
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// Build time: the managed block of <head> for a prerendered page.
export function renderHeadTags(meta: PageMeta): string {
  const lines = [`<title>${escapeHtml(meta.title)}</title>`];
  for (const [kind, key, value] of headEntries(meta)) {
    if (value === null) continue;
    if (kind === 'canonical') lines.push(`<link rel="canonical" href="${escapeHtml(value)}" />`);
    else lines.push(`<meta ${kind}="${key}" content="${escapeHtml(value)}" />`);
  }
  lines.push(`<script type="application/ld+json" id="${SITE_JSON_LD_ID}">${serializeJsonLd(siteJsonLd())}</script>`);
  if (meta.jsonLd) lines.push(`<script type="application/ld+json" id="${JSON_LD_ID}">${serializeJsonLd(meta.jsonLd)}</script>`);
  return lines.join('\n    ');
}

// Set by main-v1.tsx when React attaches to a prerendered page: the first
// setPageMeta() call (the initial route) then leaves the build's head alone.
let keepHeadOnce = false;
export function keepPrerenderedHead() {
  keepHeadOnce = true;
}

// In the browser: apply the same head on in-app navigation.
export function setPageMeta(meta: PageMeta) {
  if (typeof document === 'undefined') return;
  if (keepHeadOnce) {
    keepHeadOnce = false;
    return;
  }
  document.title = meta.title;
  for (const [kind, key, value] of headEntries(meta)) {
    const selector = kind === 'canonical' ? 'link[rel="canonical"]' : `meta[${kind}="${key}"]`;
    let el = document.head.querySelector(selector);
    if (value === null) {
      el?.remove();
      continue;
    }
    if (!el) {
      el = document.createElement(kind === 'canonical' ? 'link' : 'meta');
      if (kind === 'canonical') el.setAttribute('rel', 'canonical');
      else el.setAttribute(kind, key);
      document.head.appendChild(el);
    }
    el.setAttribute(kind === 'canonical' ? 'href' : 'content', value);
  }
  const existing = document.getElementById(JSON_LD_ID);
  if (!meta.jsonLd) {
    existing?.remove();
    return;
  }
  const json = serializeJsonLd(meta.jsonLd);
  if (existing?.textContent === json) return;
  const script = existing ?? document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.id = JSON_LD_ID;
  script.textContent = json;
  if (!existing) document.head.appendChild(script);
}
