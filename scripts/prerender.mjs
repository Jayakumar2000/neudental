// neudental v1 - build-time prerender (last step of `npm run build`).
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
// would ship without crawlable content, a title, a canonical URL or valid
// structured data, if a post's image is missing, or if a page links to a URL
// that doesn't exist.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');
const HEAD_START = '<!-- route-head:start -->';
const HEAD_END = '<!-- route-head:end -->';
const EMPTY_ROOT = '<div id="root"></div>';

const errors = [];
const fail = (message) => errors.push(message);

const ssr = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href);

// 1. Content checks.
const content = ssr.validateContent();
content.warnings.forEach((w) => console.warn(`  warning: ${w}`));
content.errors.forEach(fail);

// 2. The client build's index.html is the template every page is written into.
const templatePath = path.join(DIST, 'index.html');
const template = await fs.readFile(templatePath, 'utf8');
const headStart = template.indexOf(HEAD_START);
const headEnd = template.indexOf(HEAD_END);
if (headStart < 0 || headEnd < headStart || template.indexOf(HEAD_START, headStart + 1) >= 0) {
  throw new Error(`index.html must contain one ${HEAD_START} ... ${HEAD_END} block.`);
}
if (template.split(EMPTY_ROOT).length !== 2) throw new Error(`index.html must contain exactly one ${EMPTY_ROOT}.`);

function fillTemplate(headHtml, appHtml, extraHead = '') {
  const head = template.slice(0, headStart) + HEAD_START + '\n    ' + headHtml + '\n    ' + template.slice(headEnd);
  return head.replace('</head>', `${extraHead}</head>`).replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`);
}

// 3. Chunks to preload for pages whose content sits in a lazily-loaded
//    component, so hydration doesn't wait on a second round trip.
let manifest = {};
try {
  manifest = JSON.parse(await fs.readFile(path.join(DIST, '.vite', 'manifest.json'), 'utf8'));
} catch {
  console.warn('  warning: no Vite manifest; lazy chunks will not be preloaded.');
}
function preloadTags(modules) {
  const files = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || chunk.isEntry || files.has(chunk.file)) return;
    files.add(chunk.file);
    (chunk.imports ?? []).forEach(visit);
  };
  modules.forEach(visit);
  return [...files].map((file) => `  <link rel="modulepreload" crossorigin href="/${file}">\n  `).join('');
}

// 4. Render every page, following internal links to pages not listed up front.
const queue = ssr.prerenderPaths().map((p) => ({ path: ssr.normalizePath(p), from: 'routes.ts' }));
const seen = new Set(queue.map((q) => q.path));
const rendered = [];
const STATIC_FILE = /\.[a-z0-9]+$/i;

function textOf(html) {
  return html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function checkPage(page) {
  const where = `Page ${page.path}`;
  if (page.routeType === 'notFound') return fail(`${where} (linked from ${page.from}) is not a real page. Fix the link, or add the page to src/lib/routes.ts.`);
  if (!page.appHtml || textOf(page.appHtml).length < 200) fail(`${where}: rendered almost no text; crawlers would see an empty page.`);
  if (!/<h1[\s>]/.test(page.appHtml)) fail(`${where}: has no <h1> heading.`);
  // <!--$?--> is a boundary still waiting on data; <!--$!--> one that errored
  // and fell back to client rendering. Either means content missing from the HTML.
  if (page.appHtml.includes('<!--$?-->') || page.appHtml.includes('<!--$!-->')) fail(`${where}: part of the page did not render at build time (a Suspense boundary fell back).`);
  if (!/<title>[^<]{5,}<\/title>/.test(page.headHtml)) fail(`${where}: missing <title>.`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(page.headHtml)) fail(`${where}: missing meta description.`);
  if (!page.headHtml.includes(`<link rel="canonical" href="https://www.neudental.in${page.path === '/' ? '/' : page.path}"`)) fail(`${where}: canonical URL does not match the page.`);
  for (const m of page.headHtml.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      fail(`${where}: structured data is not valid JSON (${e.message}).`);
    }
  }
}

while (queue.length) {
  const { path: pagePath, from } = queue.shift();
  let page;
  try {
    page = { ...(await ssr.renderPage(pagePath)), from };
  } catch (e) {
    fail(`Page ${pagePath}: failed to render (${e?.stack ?? e}).`);
    continue;
  }
  checkPage(page);
  if (page.routeType === 'notFound') continue;
  rendered.push(page);
  for (const m of page.appHtml.matchAll(/href="([^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const linkPath = ssr.normalizePath(href.split(/[?#]/)[0]);
    if (STATIC_FILE.test(linkPath) || seen.has(linkPath) || linkPath === '/admin') continue;
    seen.add(linkPath);
    queue.push({ path: linkPath, from: pagePath });
  }
}

// 5. Every post's image must exist, or the page and its share card break.
for (const { id, image } of ssr.blogImages()) {
  try {
    await fs.access(path.join(ROOT, 'public', image));
  } catch {
    fail(`Blog post "${id}": image ${image} not found in public/.`);
  }
}

if (errors.length) {
  console.error(`\nPrerender failed with ${errors.length} problem(s); nothing was deployed:\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

// 6. Write the pages. /blogs/x is served from blogs/x.html (cleanUrls in
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
  const html = fillTemplate(page.headHtml, page.appHtml, preloadTags(page.lazyModules));
  if (page.path === '/') await write('index.html', html);
  else {
    await write(`${page.path.slice(1)}.html`, html);
    if (page.path === '/blogs') await write('blogs/index.html', html);
  }
}

// 7. Machine-readable companions.
const indexable = rendered.filter((p) => !p.noIndex).map((p) => p.path);
await write('sitemap.xml', ssr.sitemapXml(indexable));
await write('blogs/rss.xml', ssr.rssXml());
await write('llms.txt', ssr.llmsTxt());
await write('llms-full.txt', ssr.llmsFullTxt());

// 8. Build-only files never ship.
await fs.rm(path.join(DIST, '.vite'), { recursive: true, force: true });
await fs.rm(SSR_DIR, { recursive: true, force: true });

console.log(`\nPrerendered ${rendered.length} pages: ${rendered.map((p) => p.path).join(', ')}`);
console.log('Generated sitemap.xml, blogs/rss.xml, llms.txt, llms-full.txt, admin.html');
