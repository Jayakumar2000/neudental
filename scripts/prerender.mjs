// neudental v1 - build-time prerender (part of `npm run build`).
//
// Turns the client-side React app into real HTML files, one per page, so
// search engines, AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-
// Extended...) and link previews read the full content without running any
// JavaScript. In the browser React then hydrates that HTML as usual.
//
// Nothing here needs editing when posts or pages are added:
//   - pages come from prerenderPaths() in src/lib/routes.ts (every BLOGS post),
//     plus every internal link found on those pages (a link crawl), so a new
//     page that is linked from anywhere gets prerendered automatically;
//   - sitemap.xml, blogs/rss.xml, llms.txt and llms-full.txt are regenerated
//     from src/data.ts on every build.
//
// It fails the build (so Vercel keeps the last good deploy live) if any page
// would ship without its content, a title, a canonical URL or valid
// structured data, if a page links to a URL that doesn't exist, or if a blog
// post is malformed (see validateContent() in src/entry-server.tsx).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');
const SITE = 'https://www.neudental.in';
const OWN_HOST = /^(www\.)?neudental\.in$/;
const HEAD_START = '<!-- route-head:start -->';
const HEAD_END = '<!-- route-head:end -->';
const EMPTY_ROOT = '<div id="root"></div>';

const errors = [];
const fail = (message) => errors.push(message);
const exists = (file) => fs.stat(file).then((s) => s.isFile(), () => false);

const ssr = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href);

// 1. Content checks.
const content = ssr.validateContent();
content.warnings.forEach((w) => console.warn(`  warning: ${w}`));
content.errors.forEach(fail);

// 2. Every post's image must exist; its size and type go into share cards.
const imageInfoBySrc = new Map();
for (const { id, image } of ssr.blogImages()) {
  if (typeof image !== 'string') continue;
  const file = path.join(ROOT, 'public', image);
  if (!(await exists(file))) {
    fail(`Blog post "${id}": image ${image} not found in public/. Upload it, or fix the path.`);
    continue;
  }
  const info = imageSize(await fs.readFile(file));
  if (info) imageInfoBySrc.set(image, info);
}
for (const image of ssr.shareImages()) {
  const file = path.join(ROOT, 'public', image);
  if (!(await exists(file))) fail(`Share image ${image} not found in public/.`);
  else {
    const info = imageSize(await fs.readFile(file));
    if (info) imageInfoBySrc.set(image, info);
  }
}
const imageInfo = (src) => imageInfoBySrc.get(src);

// Width, height and MIME type from a PNG, JPEG or WebP header.
function imageSize(buf) {
  if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), type: 'image/png' };
  }
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, type: 'image/webp' };
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, type: 'image/webp' };
    }
    if (chunk === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1, type: 'image/webp' };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) return undefined;
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5), type: 'image/jpeg' };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return undefined;
}

// 3. The client build's index.html is the template every page is written into.
const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
const headStart = template.indexOf(HEAD_START);
const headEnd = template.indexOf(HEAD_END);
if (headStart < 0 || headEnd < headStart || template.indexOf(HEAD_START, headStart + 1) >= 0) {
  throw new Error(`index.html must contain one ${HEAD_START} ... ${HEAD_END} block.`);
}
if (template.split(EMPTY_ROOT).length !== 2) throw new Error(`index.html must contain exactly one ${EMPTY_ROOT}.`);

// Plain concatenation: page text may contain "$&" or "$'", which
// String.replace would treat as substitution patterns.
function fillTemplate(headHtml, appHtml) {
  const html = template.slice(0, headStart) + HEAD_START + '\n    ' + headHtml + '\n    ' + template.slice(headEnd);
  const at = html.indexOf(EMPTY_ROOT);
  return html.slice(0, at) + `<div id="root">${appHtml}</div>` + html.slice(at + EMPTY_ROOT.length);
}

// 4. Render every page, following internal links to pages not listed up front.
const queue = ssr.prerenderPaths().map((p) => ({ path: ssr.normalizePath(p), from: 'src/lib/routes.ts' }));
const seen = new Set(queue.map((q) => q.path));
const rendered = [];
const STATIC_FILE = /\.[a-z0-9]+$/i;

function decodeEntities(text) {
  return text.replace(/&(amp|lt|gt|quot|#x27|#39|nbsp);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#x27': "'", '#39': "'", nbsp: ' ' })[e]);
}
// Visible text: tags dropped without adding spaces (so "**bold**," stays
// "bold,"), then whitespace collapsed.
function textOf(html) {
  return decodeEntities(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

async function checkLinks(page) {
  for (const m of page.appHtml.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
    const href = decodeEntities(m[1]);
    let url;
    try {
      url = new URL(href, SITE + page.path);
    } catch {
      fail(`Page ${page.path}: link "${href}" is not a valid URL.`);
      continue;
    }
    if (!/^https?:$/.test(url.protocol) || !OWN_HOST.test(url.hostname)) continue;
    const linkPath = ssr.normalizePath(decodeURIComponent(url.pathname));
    if (STATIC_FILE.test(linkPath)) {
      if (!(await exists(path.join(DIST, linkPath)))) fail(`Page ${page.path}: links to ${linkPath}, which is not a file in public/.`);
      continue;
    }
    if (seen.has(linkPath) || linkPath === '/admin') continue;
    seen.add(linkPath);
    // A plain HTML page placed in public/ is served as-is.
    if (await exists(path.join(DIST, `${linkPath.slice(1)}.html`)) || await exists(path.join(DIST, linkPath.slice(1), 'index.html'))) continue;
    queue.push({ path: linkPath, from: page.path });
  }
}

function checkPage(page, html, homeAppHtml) {
  const where = `Page ${page.path}`;
  if (page.routeType === 'notFound') return fail(`${where} (linked from ${page.from}) is not a real page. Fix the link, or add the page to src/lib/routes.ts.`);
  const text = textOf(page.appHtml);
  if (!/<h1[\s>]/.test(page.appHtml)) fail(`${where}: has no <h1> heading.`);
  // <!--$?--> is a boundary still waiting on data; <!--$!--> one that errored
  // and fell back to client rendering. Either means content missing from the HTML.
  if (page.appHtml.includes('<!--$?-->') || page.appHtml.includes('<!--$!-->')) fail(`${where}: part of the page did not render at build time (a Suspense boundary fell back).`);
  const missingText = page.expected.texts.filter((t) => !text.includes(t));
  if (missingText.length) fail(`${where}: ${missingText.length} piece(s) of its content are missing from the HTML, e.g. "${missingText[0]}". Content must render without waiting for the browser.`);
  const missingLinks = page.expected.hrefs.filter((href) => !page.appHtml.includes(`href="${href}"`));
  if (missingLinks.length) fail(`${where}: missing crawlable links to ${missingLinks.join(', ')}.`);
  if (page.path !== '/' && homeAppHtml !== undefined && page.appHtml === homeAppHtml) fail(`${where}: renders exactly the home page. Its route needs its own view in App-v1.tsx.`);
  if (!/<title>[^<]{5,}<\/title>/.test(html)) fail(`${where}: missing <title>.`);
  if ((html.match(/<title>/g) ?? []).length !== 1) fail(`${where}: must have exactly one <title>.`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) fail(`${where}: missing meta description.`);
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((c) => c[1]);
  if (canonicals.length !== 1 || canonicals[0] !== SITE + page.path) fail(`${where}: needs exactly one canonical URL, ${SITE + page.path} (found ${canonicals.join(', ') || 'none'}).`);
  // Structured data: valid JSON, and every {"@id"} reference points at a node
  // defined somewhere on the same page.
  const defined = new Set();
  const referenced = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    const keys = Object.keys(node);
    if (typeof node['@id'] === 'string') (keys.length === 1 ? referenced : defined).add(node['@id']);
    keys.forEach((k) => walk(node[k]));
  };
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      walk(JSON.parse(m[1]));
    } catch (e) {
      fail(`${where}: structured data is not valid JSON (${e.message}).`);
    }
  }
  for (const id of referenced) if (!defined.has(id)) fail(`${where}: structured data refers to ${id}, which isn't defined on the page.`);
}

let homeAppHtml;
while (queue.length) {
  const { path: pagePath, from } = queue.shift();
  let page;
  try {
    page = { ...(await ssr.renderPage(pagePath, imageInfo)), from };
  } catch (e) {
    fail(`Page ${pagePath}: failed to render (${e?.stack ?? e}).`);
    continue;
  }
  if (pagePath === '/') homeAppHtml = page.appHtml;
  page.html = fillTemplate(page.headHtml, page.appHtml);
  checkPage(page, page.html, homeAppHtml);
  if (page.routeType === 'notFound') continue;
  rendered.push(page);
  await checkLinks(page);
}

if (errors.length) {
  console.error(`\nPrerender failed with ${errors.length} problem(s); nothing was deployed:\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

// 5. Write the pages. /blogs/x is served from blogs/x.html (cleanUrls in
//    vercel.json and firebase.json). /blogs also gets blogs/index.html, so it
//    resolves the same whether the host looks for the file or the folder first.
async function write(rel, data) {
  const file = path.join(DIST, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
}

// The staff console is not prerendered: it gets the empty app shell, noindex.
await write('admin.html', fillTemplate(ssr.adminHead(), ''));

for (const page of rendered) {
  if (page.path === '/') await write('index.html', page.html);
  else {
    await write(`${page.path.slice(1)}.html`, page.html);
    if (page.path === '/blogs') await write('blogs/index.html', page.html);
  }
}

// 6. Machine-readable companions.
const indexable = rendered.filter((p) => !p.noIndex).map((p) => p.path);
await write('sitemap.xml', ssr.sitemapXml(indexable));
await write('blogs/rss.xml', ssr.rssXml());
await write('llms.txt', ssr.llmsTxt());
await write('llms-full.txt', ssr.llmsFullTxt());

// 7. Build-only files never ship.
await fs.rm(SSR_DIR, { recursive: true, force: true });

console.log(`\nPrerendered ${rendered.length} pages: ${rendered.map((p) => p.path).join(', ')}`);
console.log('Generated sitemap.xml, blogs/rss.xml, llms.txt, llms-full.txt, admin.html');
