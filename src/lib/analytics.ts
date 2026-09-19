// Thin wrapper around the gtag.js snippet loaded in index.html. Every call is a
// no-op if the tag hasn't loaded yet (ad blockers, slow network) instead of
// throwing and breaking the feature that triggered it.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

// Google Ads conversion labels (Google Ads > Goals > Conversions). The Ads tag
// AW-18023171134 is configured alongside GA4 in index.html; `send_to` routes an
// event to the matching conversion action so Search campaigns can bid on it.
// Booking + call are Primary actions (used for bidding), WhatsApp is Secondary
// (reported only).
export const ADS_CONVERSIONS = {
  booking: 'AW-18023171134/NC_gCKqYxfUcEL6Ij5JD',
  call: 'AW-18023171134/nPg_CK2YxfUcEL6Ij5JD',
  whatsapp: 'AW-18023171134/FdHXCLCYxfUcEL6Ij5JD',
} as const;

export type AdsConversion = keyof typeof ADS_CONVERSIONS;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

// Sends the Google Ads conversion only. Prefer trackConversion() at call sites so
// GA4 and Ads stay in step; this is exported for anywhere that already reports to
// GA4 by other means.
export function trackAdsConversion(action: AdsConversion) {
  trackEvent('conversion', {
    send_to: ADS_CONVERSIONS[action],
    value: 1.0,
    currency: 'INR',
  });
}

// One lead action -> two destinations: a readable GA4 event for reporting, and
// the Google Ads conversion that bidding actually optimises against.
export function trackConversion(
  name: string,
  action: AdsConversion,
  params?: Record<string, unknown>,
) {
  trackEvent(name, params);
  trackAdsConversion(action);
}

// Manual page_view dispatch. index.html sets send_page_view: false on the
// GA4 config call, which -- per Google's own SPA integration guidance --
// disables GA4's automatic page_view tracking entirely, both the one on load
// and the history-based one it would otherwise fire on every pushState. That
// hands page_view fully to the app, which is the only thing that knows
// whether a /blogs/:id slug is a real post; App-v1.tsx calls this once per
// route change and never for a route it classifies as Not Found, so a bot
// probing a fake blog slug no longer counts as a pageview at all.
export function trackPageView(path: string, title: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_location: window.location.origin + path,
      page_path: path,
      page_title: title,
    });
  }
}

// Clarity has no GA4-style send_page_view hand-off -- it starts recording as
// soon as its script loads, before the app has classified the current route.
// So a bot probing a fake /blogs/:id slug still gets a Clarity session
// started; this is the best available correction, called from App-v1.tsx the
// moment it lands on Not Found, to cut that recording short instead of
// letting it run for the rest of the visit. window.clarity is defined
// synchronously by the loader snippet in index.html (calls queue until the
// real script finishes loading), so this is safe to call immediately.
export function stopClarityRecording() {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('stop');
  }
}
