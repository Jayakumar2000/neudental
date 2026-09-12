// Thin wrapper around the gtag.js snippet loaded in index.html. Every call is a
// no-op if the tag hasn't loaded yet (ad blockers, slow network) instead of
// throwing and breaking the feature that triggered it.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
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

// No trackPageView() here on purpose. GA4's Enhanced measurement has "Page
// changes based on browser history events" switched on for this stream, so it
// already emits a page_view on every pushState/popState. Sending our own as
// well double-counted every blog navigation.
