// neudental v1 - build-time renderer. Not shipped to browsers: `npm run build`
// compiles this for Node and scripts/prerender.mjs calls it once per page to
// write real HTML (content, head tags, structured data) into dist/, so every
// crawler -- including AI crawlers that never run JavaScript -- reads the full
// page. Everything a page needs comes from the same modules the browser uses.
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import App from './App-v1';
import { BLOGS, CLINIC, DOCTOR, FAQS, TREATMENTS } from './data';
import { DOCTOR_PATH, classifyRoute, normalizePath, prerenderPaths, type Route } from './lib/routes';
import { GUIDE_TOKENS, categoryLabel, fillTokens, formatPriceRange, guideFor, treatmentById, treatmentPath } from './lib/treatments';
import { TREATMENT_GUIDES } from './content/treatments';
import { getRouteMeta, renderHeadTags, type ImageInfo } from './lib/seo';
import { SITE_URL, absoluteUrl, contentTexts, plainText, postModifiedDate, postPublishedDate, postTextBlocks, postUrl } from './lib/schema';
import type { BlogBlock, Treatment } from './types';

export { classifyRoute, normalizePath, prerenderPaths };

export interface RenderedPage {
  path: string;
  routeType: string;
  noIndex: boolean;
  title: string;
  appHtml: string;
  headHtml: string;
  // Text and links the page's data says must be in its HTML (see expectedContent).
  expected: { texts: string[]; hrefs: string[] };
}

export async function renderPage(pathname: string, imageInfo?: ImageInfo): Promise<RenderedPage> {
  const path = normalizePath(pathname);
  const route = classifyRoute(path);
  const meta = getRouteMeta(route, path, imageInfo);
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
  return { path, routeType: route.type, noIndex: !!meta.noIndex, title: meta.title, appHtml, headHtml: renderHeadTags(meta), expected: expectedContent(route) };
}

// What the data says a page must contain, so the build can tell a page that
// rendered its header and footer but lost its content (an unknown block
// type, content moved behind useHydrated()) from a complete one. Texts are
// matched against the page's visible text with whitespace collapsed.
function expectedContent(route: Route): { texts: string[]; hrefs: string[] } {
  const clip = (text: string) => plainText(text).replace(/\s+/g, ' ').trim().slice(0, 60).trim();
  switch (route.type) {
    case 'blogPost': {
      const post = BLOGS.find((b) => b.id === route.blogId)!;
      return { texts: [post.title, ...postTextBlocks(post)].map(clip).filter(Boolean), hrefs: [] };
    }
    case 'blogsList':
      return { texts: BLOGS.map((post) => clip(post.title)), hrefs: BLOGS.map((post) => `/blogs/${post.id}`) };
    case 'home':
      return { texts: FAQS.flatMap((faq) => [clip(faq.question), clip(faq.answer)]), hrefs: ['/blogs', '/treatments', DOCTOR_PATH, ...TREATMENTS.map(treatmentPath)] };
    case 'treatment': {
      const treatment = treatmentById(route.treatmentId)!;
      const guide = guideFor(treatment.id);
      const fill = (text: string) => fillTokens(text, treatment);
      const texts = guide
        ? [guide.headline, guide.answer, ...contentTexts(guide.content, guide.faqs)].map(fill)
        : [treatment.name, treatment.description, ...treatment.features];
      return { texts: texts.map(clip).filter(Boolean), hrefs: ['/treatments', DOCTOR_PATH] };
    }
    case 'treatmentsList':
      return { texts: TREATMENTS.map((t) => clip(t.name)), hrefs: TREATMENTS.map(treatmentPath) };
    case 'doctor':
      return { texts: [clip(DOCTOR.name), clip(DOCTOR.bio)], hrefs: TREATMENTS.map(treatmentPath) };
    default:
      return { texts: [], hrefs: [] };
  }
}

export function blogImages(): { id: string; image: string }[] {
  return BLOGS.map((post) => ({ id: post.id, image: post.image }));
}

// Images used as share cards besides blog images; the build reads their size.
export function shareImages(): string[] {
  return ['/doctor/dr-swetha.webp'];
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
    } else if (route.type === 'treatment') {
      const guide = guideFor(route.treatmentId);
      lastmod = guide && (guide.dateModified ?? guide.datePublished);
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

// RSS needs a full date; a post known only by month gets none rather than
// an invented day.
function rfc822(date: string | undefined): string | undefined {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toUTCString();
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
  return `- Name: Neudental (formerly ${CLINIC.formerName}), family dental clinic
- Address: ${CLINIC.streetAddress}, ${CLINIC.locality}, ${CLINIC.region} ${CLINIC.postalCode}, India (${CLINIC.landmark})
- Phone / WhatsApp: ${CLINIC.phone}
- Email: ${CLINIC.email}
- Hours: ${CLINIC.hoursText}
- Lead dentist: ${DOCTOR.name}, ${DOCTOR.title}, ${DOCTOR.specialty}. ${DOCTOR.bio}
- Areas served: Kodungaiyur, North Chennai (Perambur, Madhavaram, Kolathur, Vyasarpadi, Moolakadai, Korukkupet, Villivakkam) and Chennai
- Book: online at ${SITE_URL}/#booking-section, on WhatsApp or by phone; walk-ins welcome`;
}

function treatmentList(): string {
  return TREATMENTS.map((t) => `- ${t.name}: ${t.description}. Typical duration ${t.duration}; indicative price ${t.priceRange}.`).join('\n');
}

function treatmentMarkdown(treatment: Treatment): string {
  const guide = guideFor(treatment.id);
  const header = [
    `## ${treatment.name}`,
    '',
    `URL: ${SITE_URL}${treatmentPath(treatment)}`,
    `Category: ${categoryLabel(treatment.category)}`,
    `Typical duration: ${treatment.duration}`,
    `Indicative price at Neudental: ${formatPriceRange(treatment.priceRange)} (final cost confirmed after examination)`,
    `Includes: ${treatment.features.join('; ')}`,
    ...(guide?.reviewedBy ? [`Clinically reviewed by: ${guide.reviewedBy}`] : []),
    ...(guide ? [`Updated: ${guide.dateModified ?? guide.datePublished}`] : []),
  ].join('\n');
  if (!guide) return `${header}\n\n${treatment.description}.`;
  return fillTokens(`${header}\n\n> ${guide.answer}\n\n${postMarkdown(guide.content, guide.faqs)}`, treatment);
}

// llms.txt (https://llmstxt.org): H1, a blockquote summary, free text with no
// headings, then H2 sections that are lists of links.
export function llmsTxt(): string {
  return `# Neudental

> Neudental (formerly ${CLINIC.formerName}) is a family dental clinic in Kodungaiyur, North Chennai, India, led by ${DOCTOR.name} (${DOCTOR.title}). It offers painless root canal treatment, clear aligners, braces, teeth whitening, dental implants, kids dentistry and general dental care, open all 7 days.

**Clinic facts**

${clinicFacts()}

**Treatments and indicative prices (INR)**

${treatmentList()}

## Pages

- [Home](${SITE_URL}/): clinic overview, treatments, doctor, patient reviews, location, timings, FAQs and booking
- [Treatments and prices](${SITE_URL}/treatments): every treatment with typical duration and indicative price
- [${DOCTOR.name}, ${DOCTOR.title}](${SITE_URL}${DOCTOR_PATH}): the clinic's lead dentist, qualifications and expertise
- [Dental health blog](${SITE_URL}/blogs): all articles

## Treatment guides

${TREATMENTS.map((t) => `- [${t.name}](${SITE_URL}${treatmentPath(t)}): ${t.description}; ${t.duration}; indicative price ${formatPriceRange(t.priceRange)}`).join('\n')}

## Blog articles

${BLOGS.map((post) => `- [${post.title}](${postUrl(post)}): ${post.excerpt}`).join('\n')}

## Optional

- [Full text of every treatment guide and article, plus the clinic FAQ](${SITE_URL}/llms-full.txt)
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
  const faq = FAQS.map((item) => `**${item.question}**\n${item.answer}`).join('\n\n');
  const guides = TREATMENTS.map((t) => treatmentMarkdown(t)).join('\n\n---\n\n');
  return `# Neudental — full content\n\n## Clinic facts\n\n${clinicFacts()}\n\n## Treatments and indicative prices (INR)\n\n${treatmentList()}\n\n## Frequently asked questions\n\n${faq}\n\n# Treatment guides\n\n${guides}\n\n# Blog articles\n\n${posts.join('\n\n---\n\n')}\n`;
}

// Content checks the build runs before writing anything. Errors stop the
// deploy (the live site keeps the last good version); warnings are printed.
// Messages name the post and say what to change, for editors working in
// GitHub's web editor.
const POST_KEYS = new Set(['id', 'title', 'excerpt', 'category', 'date', 'readTime', 'image', 'content', 'seoTitle', 'imageAlt', 'datePublished', 'dateModified', 'reviewedBy', 'faqs', 'related', 'relatedTreatments']);
const GUIDE_KEYS = new Set(['treatmentId', 'seoTitle', 'metaDescription', 'headline', 'answer', 'content', 'faqs', 'relatedPosts', 'relatedTreatments', 'datePublished', 'dateModified', 'reviewedBy']);
const REQUIRED_TEXT = ['id', 'title', 'excerpt', 'category', 'date', 'readTime', 'image'] as const;
const BLOCK_TYPES = 'heading, subheading, list, steps, answer, note, quote, table, contents, faq, cta';

function blockProblem(block: unknown): string | undefined {
  if (typeof block === 'string') return block.trim() ? undefined : 'is an empty paragraph';
  if (!block || typeof block !== 'object') return 'is not a paragraph string or a { type: ... } block';
  const b = block as Record<string, unknown>;
  const isText = (v: unknown) => typeof v === 'string' && v.trim() !== '';
  const isTextList = (v: unknown) => Array.isArray(v) && v.length > 0 && v.every(isText);
  switch (b.type) {
    case 'heading': case 'subheading': case 'answer': case 'note': case 'quote':
      return isText(b.text) ? undefined : `(type '${b.type}') needs text: '...'`;
    case 'list':
      return isTextList(b.items) ? undefined : "(type 'list') needs items: ['...', '...']";
    case 'steps':
      return Array.isArray(b.items) && b.items.length > 0 && b.items.every((i) => i && isText((i as { title?: unknown }).title) && isText((i as { text?: unknown }).text))
        ? undefined : "(type 'steps') needs items: [{ title: '...', text: '...' }]";
    case 'table':
      return isText(b.caption) && Array.isArray(b.rows) && b.rows.length > 0 && b.rows.every((r) => Array.isArray(r) && r.length === 2 && r.every((c) => typeof c === 'string'))
        ? undefined : "(type 'table') needs caption: '...' and rows: [['Label', 'Value'], ...]";
    case 'cta':
      return isText(b.title) && isText(b.text) ? undefined : "(type 'cta') needs title: '...' and text: '...'";
    case 'contents': case 'faq':
      return undefined;
    default:
      return `has unknown type '${String(b.type)}'. Use one of: ${BLOCK_TYPES}, or a plain string for a paragraph`;
  }
}

export function validateContent(): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  BLOGS.forEach((post, index) => {
    const raw = post as unknown as Record<string, unknown>;
    const where = `Blog post "${typeof raw.id === 'string' ? raw.id : `#${index + 1} in BLOGS`}"`;
    for (const key of Object.keys(raw)) {
      if (!POST_KEYS.has(key)) errors.push(`${where}: unknown field "${key}". Check the spelling (fields are case-sensitive): ${[...POST_KEYS].join(', ')}.`);
    }
    const missing = REQUIRED_TEXT.filter((key) => typeof raw[key] !== 'string' || !(raw[key] as string).trim());
    missing.forEach((key) => errors.push(`${where}: "${key}" is missing or empty.`));
    if (!Array.isArray(raw.content) || raw.content.length === 0) errors.push(`${where}: "content" must be a list of paragraphs/blocks.`);
    if (missing.length || !Array.isArray(raw.content)) return;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id)) errors.push(`${where}: id must be lowercase letters, numbers and single hyphens (it is the URL slug).`);
    if (ids.has(post.id)) errors.push(`${where}: id is used by more than one post.`);
    ids.add(post.id);
    if (!/^\/[A-Za-z0-9._/-]+\.(webp|jpe?g|png|avif)$/i.test(post.image)) errors.push(`${where}: image must be a path like /blogs/my-photo.webp, with no spaces or special characters in the file name.`);
    post.content.forEach((block, i) => {
      const problem = blockProblem(block);
      if (problem) errors.push(`${where}: content block ${i + 1} ${problem}.`);
    });
    if (post.faqs !== undefined && !(Array.isArray(post.faqs) && post.faqs.every((f) => typeof f?.question === 'string' && f.question.trim() && typeof f?.answer === 'string' && f.answer.trim()))) {
      errors.push(`${where}: faqs must look like [{ question: '...', answer: '...' }].`);
    }
    if (post.datePublished !== undefined && !isoDate.test(post.datePublished)) errors.push(`${where}: datePublished must look like 2026-10-25.`);
    if (post.dateModified !== undefined && !isoDate.test(post.dateModified)) errors.push(`${where}: dateModified must look like 2026-10-25.`);
    if (!postPublishedDate(post)) errors.push(`${where}: add datePublished ('YYYY-MM-DD'), or write date as "Month YYYY".`);
    else if (!post.datePublished) warnings.push(`${where}: no datePublished, so only the month ("${post.date}") is known. Add the exact day ('YYYY-MM-DD') for better freshness signals.`);
    for (const rel of post.related ?? []) {
      if (!BLOGS.some((b) => b.id === rel)) errors.push(`${where}: related post "${rel}" does not exist.`);
    }
    for (const rel of post.relatedTreatments ?? []) {
      if (!treatmentById(rel)) errors.push(`${where}: related treatment "${rel}" does not exist (use an id from TREATMENTS in src/data.ts).`);
    }
    const title = post.seoTitle ?? `${post.title} | Neudental Blog`;
    if (title.length > 65) warnings.push(`${where}: page title is ${title.length} characters; search results cut off after about 60. Add a shorter seoTitle.`);
    if (post.excerpt.length > 170) warnings.push(`${where}: excerpt is ${post.excerpt.length} characters; search snippets show about 155.`);
  });
  validateTreatments(errors, warnings);
  return { errors, warnings };
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const words = (text: string) => plainText(text).split(/\s+/).filter(Boolean).length;

function validateTreatments(errors: string[], warnings: string[]) {
  const slugs = new Set<string>();
  for (const t of TREATMENTS) {
    const where = `Treatment "${t.id}"`;
    if (typeof t.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.slug)) errors.push(`${where}: slug must be lowercase letters, numbers and single hyphens (it is the page address /treatments/{slug}).`);
    else if (slugs.has(t.slug)) errors.push(`${where}: slug "${t.slug}" is used by another treatment.`);
    slugs.add(t.slug);
    if (!guideFor(t.id)) warnings.push(`${where}: no guide in src/content/treatments/, so its page only shows the basic facts.`);
  }

  const seen = new Set<string>();
  TREATMENT_GUIDES.forEach((guide, index) => {
    const raw = guide as unknown as Record<string, unknown>;
    const treatment = typeof raw.treatmentId === 'string' ? treatmentById(raw.treatmentId) : undefined;
    const where = `Treatment guide ${treatment ? `"${treatment.slug}"` : `#${index + 1} (treatmentId "${String(raw.treatmentId)}")`}`;
    if (!treatment) {
      errors.push(`${where}: treatmentId must be one of the ids in TREATMENTS (src/data.ts).`);
      return;
    }
    if (seen.has(treatment.id)) errors.push(`${where}: there is more than one guide for this treatment.`);
    seen.add(treatment.id);
    for (const key of Object.keys(raw)) {
      if (!GUIDE_KEYS.has(key)) errors.push(`${where}: unknown field "${key}". Fields: ${[...GUIDE_KEYS].join(', ')}.`);
    }
    for (const key of ['seoTitle', 'metaDescription', 'headline', 'answer', 'datePublished'] as const) {
      if (typeof raw[key] !== 'string' || !(raw[key] as string).trim()) errors.push(`${where}: "${key}" is missing or empty.`);
    }
    if (!Array.isArray(raw.content) || !raw.content.length) errors.push(`${where}: "content" must be a list of paragraphs/blocks.`);
    if (!Array.isArray(raw.faqs)) errors.push(`${where}: "faqs" must be a list of { question, answer }.`);
    if (errors.some((e) => e.startsWith(where))) return;

    guide.content.forEach((block, i) => {
      const problem = blockProblem(block);
      if (problem) errors.push(`${where}: content block ${i + 1} ${problem}.`);
      if (typeof block === 'object' && block.type === 'answer') warnings.push(`${where}: content block ${i + 1} is an 'answer' block; the guide's "answer" field is already shown first, so this repeats it.`);
    });
    if (!guide.faqs.every((f) => typeof f?.question === 'string' && f.question.trim() && typeof f?.answer === 'string' && f.answer.trim())) errors.push(`${where}: faqs must look like [{ question: '...', answer: '...' }].`);

    // Placeholders, and no typed prices (they would drift from TREATMENTS).
    const texts = [guide.seoTitle, guide.metaDescription, guide.headline, guide.answer, ...contentTexts(guide.content, guide.faqs)];
    for (const text of texts) {
      for (const m of text.matchAll(/\{\{(\w+)\}\}/g)) {
        if (!(GUIDE_TOKENS as readonly string[]).includes(m[1])) errors.push(`${where}: unknown placeholder {{${m[1]}}}. Use one of: ${GUIDE_TOKENS.map((t) => `{{${t}}}`).join(', ')}.`);
      }
      if (/(₹|\bRs\.?|\bINR)\s?\d/.test(text)) errors.push(`${where}: a price is typed into the text ("${text.match(/(₹|\bRs\.?|\bINR)\s?[\d,]+/)?.[0]}"). Write {{price}} or {{startingPrice}} so it always matches the price list in TREATMENTS.`);
    }
    for (const id of guide.relatedPosts ?? []) {
      if (!BLOGS.some((b) => b.id === id)) errors.push(`${where}: related post "${id}" does not exist.`);
    }
    for (const id of guide.relatedTreatments ?? []) {
      if (!treatmentById(id) || id === treatment.id) errors.push(`${where}: related treatment "${id}" must be the id of another treatment in TREATMENTS.`);
    }
    if (!isoDate.test(guide.datePublished)) errors.push(`${where}: datePublished must look like 2026-10-25.`);
    if (guide.dateModified !== undefined && !isoDate.test(guide.dateModified)) errors.push(`${where}: dateModified must look like 2026-10-25.`);

    const title = fillTokens(guide.seoTitle, treatment);
    if (title.length > 65) warnings.push(`${where}: seoTitle is ${title.length} characters; search results cut off after about 60.`);
    const description = fillTokens(guide.metaDescription, treatment);
    if (description.length < 70 || description.length > 170) warnings.push(`${where}: metaDescription is ${description.length} characters; aim for 120-155.`);
    const answerWords = words(fillTokens(guide.answer, treatment));
    if (answerWords < 30 || answerWords > 90) warnings.push(`${where}: answer is ${answerWords} words; 40-70 is the length answer engines quote.`);
    if (guide.faqs.length < 3) warnings.push(`${where}: only ${guide.faqs.length} FAQs; 4-8 is recommended.`);
  });
}
