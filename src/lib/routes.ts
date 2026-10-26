// neudental v1 - the one list of public URLs the site has.
// Both the browser (App-v1.tsx) and the build-time prerenderer
// (scripts/prerender.mjs, via src/entry-server.tsx) read this file, so a page
// the app can show is always a page the build writes out as real HTML. A new
// kind of page needs a Route here, a branch in classifyRoute(), and its URLs
// in prerenderPaths(); anything the pages link to is also found and
// prerendered automatically by the build's link crawl.
import { BLOGS } from '../data';

export type Route =
  | { type: 'home' }
  | { type: 'admin' }
  | { type: 'blogsList' }
  | { type: 'blogPost'; blogId: string }
  | { type: 'notFound' };

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

// The sole authority for whether a URL is a real page: a bot probing
// /blogs/some-fake-slug gets Not Found (and, on the live site, a real 404
// status, since no file was ever generated for it).
export function classifyRoute(pathname: string): Route {
  const clean = normalizePath(pathname);
  if (clean === '/') return { type: 'home' };
  if (clean === '/admin') return { type: 'admin' };
  const detailMatch = clean.match(/^\/blogs\/([^/]+)$/);
  if (detailMatch) {
    const blogId = detailMatch[1];
    return BLOGS.some((post) => post.id === blogId) ? { type: 'blogPost', blogId } : { type: 'notFound' };
  }
  if (clean === '/blogs') return { type: 'blogsList' };
  return { type: 'notFound' };
}

// Every public, indexable URL. Blog posts come straight from BLOGS, so a new
// post is prerendered, added to the sitemap, RSS feed and llms.txt with no
// other change.
export function prerenderPaths(): string[] {
  return ['/', '/blogs', ...BLOGS.map((post) => `/blogs/${post.id}`)];
}

// For <a href> links the app handles itself: a plain left click navigates
// in-app, while ctrl/cmd/shift/middle clicks keep the browser's own
// behaviour (new tab, new window). The href stays a real URL either way,
// which is what lets crawlers follow it.
export function inAppClick(handler: () => void) {
  return (e: { button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; defaultPrevented: boolean; preventDefault: () => void }) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    handler();
  };
}
