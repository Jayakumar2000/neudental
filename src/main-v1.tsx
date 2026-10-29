// neudental v1 - Application Entry Point
import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App-v1.tsx';
import { trackEvent } from './lib/analytics';
import { classifyRoute } from './lib/routes';
import { keepPrerenderedHead } from './lib/seo';
import { loadTreatmentGuide } from './lib/treatments';
import './index.css';

// Every deploy renames the code-split files. A tab opened before a deploy
// then asks for a file that no longer exists (the booking form, the admin
// console). Every URL is a complete prerendered page, so reloading it once
// fetches the new build. The guard stops a reload loop if a file is missing
// for some other reason; the booking form's error boundary covers that case.
window.addEventListener('vite:preloadError', (event) => {
  // Only a file that couldn't be downloaded (Chrome / Firefox / Safari
  // wording) is fixed by a reload; an error thrown while a module runs is not.
  const message = String((event as Event & { payload?: unknown }).payload ?? '');
  if (!/dynamically imported module|Importing a module script failed|Unable to preload/i.test(message)) return;
  const key = 'neudental:chunkReload';
  try {
    const last = JSON.parse(sessionStorage.getItem(key) ?? 'null') as { path: string; at: number } | null;
    if (last && last.path === location.pathname && Date.now() - last.at < 60_000) return;
    sessionStorage.setItem(key, JSON.stringify({ path: location.pathname, at: Date.now() }));
  } catch {
    return;
  }
  event.preventDefault();
  location.reload();
});

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production pages arrive as complete HTML from the build-time prerender
// (scripts/prerender.mjs), so React attaches to that markup instead of
// redrawing it. The dev server and the /admin shell send an empty root.
function start() {
  if (!container.firstElementChild) {
    createRoot(container).render(app);
    return;
  }
  // The prerendered <head> is already right for this page (and carries
  // details only the build knows, like image sizes).
  keepPrerenderedHead();
  hydrateRoot(container, app, {
    // A page whose first browser render differs from its prerendered HTML
    // still works (React redraws it), but it means something renders from
    // the visitor's clock or browser during render. Reported to GA4 as
    // `hydration_error` so it gets noticed and moved behind useHydrated().
    onRecoverableError(error) {
      console.error(error);
      trackEvent('hydration_error', {
        page_path: location.pathname,
        message: String((error as Error)?.message ?? error).slice(0, 100),
      });
    },
  });
}

// A treatment page needs its guide (a separate file, preloaded by the page's
// HTML) before React can attach: its first render must match the HTML.
const initialRoute = classifyRoute(location.pathname);
if (initialRoute.type === 'treatment') {
  loadTreatmentGuide(initialRoute.treatmentId).catch(() => undefined).then(start);
} else {
  start();
}
