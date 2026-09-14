// neudental v1 - per-route document head updates.
// The app is a client-rendered SPA with a single static index.html, so
// without this every route (home, /blogs, /blogs/:id) shares the exact same
// <title>, description and canonical URL -- which tells Google every blog
// post is a duplicate of the homepage instead of its own indexable page.
const DEFAULT_TITLE = 'Neudental | Family Dental Clinic in Kodungaiyur, Chennai';
const DEFAULT_DESCRIPTION = 'Neudental — a trusted family dental clinic in Kodungaiyur, Chennai, rated among the best dentists near you in North Chennai. Painless root canal treatment (RCT), Invisalign clear aligners, teeth whitening and dental implants, by Dr. Swetha BDS, FGDS.';
const SITE_URL = 'https://www.neudental.in';

function setAttr(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

export function setPageMeta(opts: { title?: string; description?: string; path?: string } = {}) {
  if (typeof document === 'undefined') return;
  const title = opts.title ?? DEFAULT_TITLE;
  const description = opts.description ?? DEFAULT_DESCRIPTION;
  const url = SITE_URL + (opts.path ?? '/');

  document.title = title;
  setAttr('meta[name="description"]', 'content', description);
  setAttr('link[rel="canonical"]', 'href', url);
  setAttr('meta[property="og:title"]', 'content', title);
  setAttr('meta[property="og:description"]', 'content', description);
  setAttr('meta[property="og:url"]', 'content', url);
  setAttr('meta[name="twitter:title"]', 'content', title);
  setAttr('meta[name="twitter:description"]', 'content', description);
}

export function resetPageMeta() {
  setPageMeta();
}
