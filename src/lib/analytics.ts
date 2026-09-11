// Thin wrapper around the gtag.js snippet loaded in index.html. Every call is a
// no-op if the tag hasn't loaded yet (ad blockers, slow network) instead of
// throwing and breaking the feature that triggered it.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

// The app navigates blog routes via history.pushState instead of a full page
// load, so GA4's automatic page_view (which only fires once, on initial load)
// never sees these — this sends the equivalent manually.
export function trackPageView(path: string) {
  trackEvent('page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}
