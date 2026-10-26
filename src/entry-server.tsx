// neudental v1 - build-time renderer. Not shipped to browsers: `npm run build`
// compiles this for Node and scripts/prerender.mjs calls it once per page to
// write real HTML (content, head tags, structured data) into dist/, so every
// crawler -- including AI crawlers that never run JavaScript -- reads the full
// page. Everything a page needs comes from the same modules the browser uses.
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import App from './App-v1';
import { BLOGS, DOCTOR, FAQS, TREATMENTS } from './data';
import { classifyRoute, normalizePath, prerenderPaths } from './lib/routes';
import { getRouteMeta, renderHeadTags } from './lib/seo';
import { SITE_URL, absoluteUrl, postModifiedDate, postPublishedDate, postUrl } from './lib/schema';
import type { BlogBlock } from './types';

export { classifyRoute, normalizePath, prerenderPaths };

export interface RenderedPage {
  path: string;
  routeType: string;
  noIndex: boolean;
  title: string;
  appHtml: string;
  headHtml: string;
  // Lazily-loaded modules this page renders, so their chunks can be preloaded.
  lazyModules: string[];
}

export async function renderPage(pathname: string): Promise<RenderedPage> {
  const path = normalizePath(pathname);
  const route = classifyRoute(path);
  const meta = getRouteMeta(route, path);
  const { prelude } = await prerender(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
    // React normally moves large Suspense content (over ~12.8 KB, e.g. a long
    // blog post) to the end of the HTML in a hidden <div> and swaps it in
    // with a script. Crawlers that don't run scripts would then find the
    // article hidden after the footer, so keep every boundary inline, in
    // reading order.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  );
  const appHtml = await new Response(prelude).text();
  const lazyModules = route.type === 'blogPost'
    ? ['src/components/BlogDetailView.tsx']
    : route.type === 'blogsList'
      ? ['src/components/BlogsListView.tsx']
      : [];
  return { path, routeType: route.type, noIndex: !!meta.noIndex, title: meta.title, appHtml, headHtml: renderHeadTags(meta), lazyModules };
}

export function blogImages(): { id: string; image: string }[] {
  return BLOGS.map((post) => ({ id: post.id, image: post.image }));
}

export function adminHead(): string {
  return renderHeadTags(getRouteMeta({ type: 'admin' }));
}

// ---------------------------------------------------------------------------
// Machine-readable companions, all generated from src/data.ts on every build.

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function latestPostDate(): string | undefined {
  return BLOGS.map(postModifiedDate).filter((d): d is string => !!d).sort().at(-1);
}

export function sitemapXml(paths: string[]): string {
  const latest = latestPostDate();
  const entries = paths.map((path) => {
    const route = classifyRoute(path);
    let lastmod: string | undefined;
    if (route.type === 'blogPost') {
      const post = BLOGS.find((b) => b.id === route.blogId);
      lastmod = post && postModifiedDate(post);
    } else if (route.type === 'blogsList') {
      lastmod = latest;
    }
    return [
      '  <url>',
      `    <loc>${xmlEscape(SITE_URL + (path === '/' ? '/' : path))}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      '  </url>',
    ].join('\n');
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

function rfc822(date: string | undefined): string | undefined {
  if (!date) return undefined;
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toUTCString();
}

export function rssXml(): string {
  const posts = [...BLOGS].sort((a, b) => (postPublishedDate(b) ?? '').localeCompare(postPublishedDate(a) ?? ''));
  const items = posts.map((post) => {
    const pubDate = rfc822(postPublishedDate(post));
    return [
      '    <item>',
      `      <title>${xmlEscape(post.title)}</title>`,
      `      <link>${postUrl(post)}</link>`,
      `      <guid isPermaLink="true">${postUrl(post)}</guid>`,
      `      <description>${xmlEscape(post.excerpt)}</description>`,
      `      <category>${xmlEscape(post.category)}</category>`,
      ...(pubDate ? [`      <pubDate>${pubDate}</pubDate>`] : []),
      `      <enclosure url="${xmlEscape(absoluteUrl(post.image))}" type="${post.image.endsWith('.webp') ? 'image/webp' : post.image.endsWith('.png') ? 'image/png' : 'image/jpeg'}" length="0" />`,
      '    </item>',
    ].join('\n');
  });
  const lastBuild = rfc822(latestPostDate());
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Neudental Dental Health Blog</title>
    <link>${SITE_URL}/blogs</link>
    <atom:link href="${SITE_URL}/blogs/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical, patient-friendly dental health guidance from Neudental, a family dental clinic in Kodungaiyur, Chennai.</description>
    <language>en-in</language>
${lastBuild ? `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` : ''}${items.join('\n')}
  </channel>
</rss>
`;
}

// A post body as Markdown, for llms-full.txt.
function postMarkdown(blocks: BlogBlock[], faqs: { question: string; answer: string }[] | undefined): string {
  const out: string[] = [];
  const faqMd = () => {
    if (!faqs?.length) return;
    out.push('### Frequently asked questions');
    faqs.forEach((faq) => out.push(`**${faq.question}**\n${faq.answer}`));
  };
  let faqDone = false;
  blocks.forEach((block) => {
    if (typeof block === 'string') return void out.push(block);
    switch (block.type) {
      case 'heading': return void out.push(`### ${block.text}`);
      case 'subheading': return void out.push(`#### ${block.text}`);
      case 'answer': return void out.push(`> **Quick answer:** ${block.text}`);
      case 'note': return void out.push(`> ${block.text}`);
      case 'quote': return void out.push(`> ${block.text}`);
      case 'list': return void out.push(block.items.map((item, i) => (block.ordered ? `${i + 1}. ` : '- ') + item).join('\n'));
      case 'steps': return void out.push(block.items.map((step, i) => `${i + 1}. **${step.title}:** ${step.text}`).join('\n'));
      case 'table': return void out.push(`**${block.caption}**\n\n| | |\n|---|---|\n${block.rows.map(([l, v]) => `| ${l} | ${v} |`).join('\n')}`);
      case 'cta': return void out.push(`**${block.title}** ${block.text}`);
      case 'faq': faqDone = true; return void faqMd();
      default: return undefined;
    }
  });
  if (!faqDone) faqMd();
  // Site-relative links become absolute so they still work out of context.
  return out.join('\n\n').replace(/\]\((\/[^)]*)\)/g, (_, p: string) => `](${SITE_URL}${p})`);
}

function clinicFacts(): string {
  return `## Clinic facts

- Name: Neudental (formerly Bludental), family dental clinic
- Address: Door No. 13, Plot No. 26, 1st Main Road, Vasuki Nagar, Kodungaiyur, Chennai, Tamil Nadu 600118, India (near SIDCO Bus Stop)
- Phone / WhatsApp: +91 93423 67446
- Email: neudental26@gmail.com
- Hours: open all 7 days, 10:00 AM – 2:00 PM and 5:00 PM – 9:30 PM
- Lead dentist: ${DOCTOR.name}, ${DOCTOR.title} — ${DOCTOR.specialty}. ${DOCTOR.bio}
- Areas served: Kodungaiyur, North Chennai (Perambur, Madhavaram, Kolathur, Vyasarpadi, Moolakadai, Korukkupet, Villivakkam) and Chennai
- Book: ${SITE_URL}/#booking-section (online booking), WhatsApp or phone; walk-ins welcome

## Treatments and indicative prices

${TREATMENTS.map((t) => `- ${t.name}: ${t.description}. Typical duration ${t.duration}; indicative price ${t.priceRange}.`).join('\n')}

## Frequently asked questions

${FAQS.map((faq) => `**${faq.question}**\n${faq.answer}`).join('\n\n')}
`;
}

// llms.txt (https://llmstxt.org): a plain-text map of the site for LLMs.
export function llmsTxt(): string {
  return `# Neudental

> Neudental (formerly Bludental) is a family dental clinic in Kodungaiyur, North Chennai, India, led by ${DOCTOR.name} (${DOCTOR.title}). It offers painless root canal treatment, clear aligners, braces, teeth whitening, dental implants, kids dentistry and general dental care, open all 7 days.

${clinicFacts()}
## Pages

- [Home](${SITE_URL}/): clinic overview, treatments, doctor, patient reviews, location, timings and booking
- [Dental health blog](${SITE_URL}/blogs): all articles

## Blog articles

${BLOGS.map((post) => `- [${post.title}](${postUrl(post)}): ${post.excerpt}`).join('\n')}

## Optional

- [Full text of every article](${SITE_URL}/llms-full.txt)
`;
}

export function llmsFullTxt(): string {
  const posts = BLOGS.map((post) => {
    const published = postPublishedDate(post);
    const header = [
      `## ${post.title}`,
      '',
      `URL: ${postUrl(post)}`,
      ...(published ? [`Published: ${published}`] : []),
      ...(post.dateModified ? [`Updated: ${post.dateModified}`] : []),
      ...(post.reviewedBy ? [`Medically reviewed by: ${post.reviewedBy}`] : []),
      `Category: ${post.category}`,
      '',
      `> ${post.excerpt}`,
    ].join('\n');
    return `${header}\n\n${postMarkdown(post.content, post.faqs)}`;
  });
  return `# Neudental — full content\n\n${clinicFacts()}\n# Blog articles\n\n${posts.join('\n\n---\n\n')}\n`;
}

// Content checks the build runs before writing anything. Errors stop the
// deploy (the live site keeps the last good version); warnings are printed.
export function validateContent(): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  for (const post of BLOGS) {
    const where = `Blog post "${post.id}"`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id)) errors.push(`${where}: id must be lowercase letters, numbers and single hyphens (it is the URL slug).`);
    if (ids.has(post.id)) errors.push(`${where}: id is used by more than one post.`);
    ids.add(post.id);
    if (!post.title.trim()) errors.push(`${where}: title is empty.`);
    if (!post.excerpt.trim()) errors.push(`${where}: excerpt is empty (it is the page's meta description).`);
    if (!post.content.length) errors.push(`${where}: content is empty.`);
    if (!post.image.startsWith('/')) errors.push(`${where}: image must be a path starting with "/", e.g. /blogs/my-photo.webp.`);
    if (post.datePublished && !isoDate.test(post.datePublished)) errors.push(`${where}: datePublished must look like 2026-10-25.`);
    if (post.dateModified && !isoDate.test(post.dateModified)) errors.push(`${where}: dateModified must look like 2026-10-25.`);
    if (!postPublishedDate(post)) errors.push(`${where}: add datePublished ('YYYY-MM-DD'), or write date as "Month YYYY".`);
    else if (!post.datePublished) warnings.push(`${where}: no datePublished, so "${post.date}" is used as ${postPublishedDate(post)}. Add the exact day for better freshness signals.`);
    for (const rel of post.related ?? []) {
      if (!BLOGS.some((b) => b.id === rel)) errors.push(`${where}: related post "${rel}" does not exist.`);
    }
    const title = post.seoTitle ?? `${post.title} | Neudental Blog`;
    if (title.length > 65) warnings.push(`${where}: page title is ${title.length} characters; search results cut off after about 60. Add a shorter seoTitle.`);
    if (post.excerpt.length > 170) warnings.push(`${where}: excerpt is ${post.excerpt.length} characters; search snippets show about 155.`);
  }
  return { errors, warnings };
}
