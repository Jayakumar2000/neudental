// neudental v1 - the one list of public URLs the site has.
// Both the browser (App-v1.tsx) and the build-time prerenderer
// (scripts/prerender.mjs, via src/entry-server.tsx) read this file, so a page
// the app can show is always a page the build writes out as real HTML. A new
// kind of page needs a Route here, a branch in classifyRoute(), and its URLs
// in prerenderPaths(); anything the pages link to is also found and
// prerendered automatically by the build's link crawl.
import { BLOGS, TREATMENTS } from '../data';

export type Route =
  | { type: 'home' }
  | { type: 'admin' }
  | { type: 'blogsList' }
  | { type: 'blogPost'; blogId: string }
  | { type: 'treatmentsList' }
  | { type: 'treatment'; treatmentId: string }
  | { type: 'doctor' }
  | { type: 'notFound' };

// Dr. Swetha's profile page.
export const DOCTOR_PATH = '/dr-swetha';

// "/treatments//braces/", "/dr%2Dswetha" -> the path the host serves the
// page from, so the browser recognises every URL the host answers.
export function normalizePath(pathname: string): string {
  let path = pathname;
  try {
    path = decodeURI(path);
  } catch {
    // Malformed escapes: leave the path as it is.
  }
  return path.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';
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
  const treatmentMatch = clean.match(/^\/treatments\/([^/]+)$/);
  if (treatmentMatch) {
    const treatment = TREATMENTS.find((t) => t.slug === treatmentMatch[1]);
    return treatment ? { type: 'treatment', treatmentId: treatment.id } : { type: 'notFound' };
  }
  if (clean === '/treatments') return { type: 'treatmentsList' };
  if (clean === DOCTOR_PATH) return { type: 'doctor' };
  return { type: 'notFound' };
}

// The URL of a route (the reverse of classifyRoute).
export function routePath(route: Route): string {
  switch (route.type) {
    case 'home': return '/';
    case 'admin': return '/admin';
    case 'blogsList': return '/blogs';
    case 'blogPost': return `/blogs/${route.blogId}`;
    case 'treatmentsList': return '/treatments';
    case 'treatment': return `/treatments/${TREATMENTS.find((t) => t.id === route.treatmentId)?.slug ?? route.treatmentId}`;
    case 'doctor': return DOCTOR_PATH;
    case 'notFound': return '/404';
    default: {
      const unhandled: never = route;
      throw new Error(`No path for route ${JSON.stringify(unhandled)}`);
    }
  }
}

// Every public, indexable URL. Blog posts and treatments come straight from
// BLOGS and TREATMENTS, so a new post or treatment is prerendered and added
// to the sitemap and llms.txt with no other change.
export function prerenderPaths(): string[] {
  return [
    '/',
    '/blogs',
    ...BLOGS.map((post) => `/blogs/${post.id}`),
    '/treatments',
    ...TREATMENTS.map((t) => `/treatments/${t.slug}`),
    DOCTOR_PATH,
  ];
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
