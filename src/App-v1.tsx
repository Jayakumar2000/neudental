// neudental v1 - Root Application Component
// See README.md for full setup instructions
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SymptomChecker from './components/SymptomChecker';
import BookingVisitPanel from './components/BookingVisitPanel';
import { SmileCurve } from './components/BrandShapes';
import Testimonials from './components/Testimonials';
import LocationDetails from './components/LocationDetails';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import NotFound from './components/NotFound';
import BlogsListView from './components/BlogsListView';
import BlogDetailView from './components/BlogDetailView';
import TreatmentPage from './components/TreatmentPage';
import TreatmentsIndex from './components/TreatmentsIndex';
import DoctorPage from './components/DoctorPage';
import LatestArticles from './components/LatestArticles';
import { FAQS, WHATSAPP_URL } from './data';
import { ChevronDown, ChevronUp, ArrowLeft, Phone, RefreshCw } from 'lucide-react';
import type { FAQItem } from './types';
import { trackConversion, trackPageView, stopClarityRecording } from './lib/analytics';
import { getRouteMeta, setPageMeta } from './lib/seo';
import { classifyRoute, normalizePath, routePath, type Route } from './lib/routes';
import { NavigationProvider } from './lib/navigation';
import { useHydrated } from './lib/useHydrated';

// Code-split: the staff-only admin CRM is never opened by patients, so it
// isn't in their download. The blog views are part of the main bundle (their
// text already is, through data.ts): a prerendered post must never depend on
// a second file arriving before it can hydrate.
const AdminView = lazy(() => import('./components/AdminView'));
// The booking form works off the visitor's own clock ("today", past slots)
// and Firebase, so it can't be part of the build-time HTML: it loads in the
// browser straight after the prerendered page hydrates -- on every page, so
// a reader who arrives on a blog post already has it when they tap "Book".
// Keeping it (and the Firebase SDK) out of the first download also speeds up
// that hydration.
const loadBookingForm = () => import('./components/BookingForm');
const BookingForm = lazy(loadBookingForm);

// Blog subpages get a real URL (/blogs, /blogs/{blog-id}) via manual
// history.pushState + a popstate listener below, since the app has no
// router. Which URLs are real pages is decided by classifyRoute() in
// src/lib/routes.ts -- the same list the build prerenders into static HTML.
// On the live site a made-up URL has no file and gets a real 404; Not Found
// here covers in-app navigation and the dev server.

// If the booking form's code can't be fetched (a dropped mobile connection),
// only the form is replaced -- by the clinic's phone and WhatsApp -- instead
// of the error taking the whole page down with it.
class BookingFormBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  // The project has no @types/react, so the inherited props need declaring.
  declare readonly props: { children: React.ReactNode };
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error('Booking form failed to load:', error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-[560px] flex flex-col items-center justify-center text-center gap-4 p-8">
        <p className="font-serif text-xl text-primary font-bold">The booking form didn't load</p>
        <p className="font-sans text-sm text-on-surface-variant max-w-sm">Check your connection and reload the page, or book straight away by phone or WhatsApp.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="tel:+919342367446" onClick={() => trackConversion('call_click', 'call', { link_location: 'booking_form_fallback' })} className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-colors"><Phone className="w-4 h-4" /> Call the clinic</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: 'booking_form_fallback' })} className="inline-flex items-center gap-2 border border-cool-gray/20 text-primary text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl hover:bg-surface-alt transition-colors">Chat on WhatsApp</a>
        </div>
      </div>
    );
  }
}

function BookingFormSlot({ preSelectedTreatmentId, preSelectNonce }: { preSelectedTreatmentId: string; preSelectNonce: number }) {
  const hydrated = useHydrated();
  // Reserves the form's measured height (about 1370px on phones, 1030px from
  // tablet width up), so scrolling to #location or a section below lands in
  // the right place even if the form arrives mid-scroll.
  const placeholder = (
    <div className="min-h-[1370px] md:min-h-[1030px] flex items-center justify-center" aria-busy="true">
      <RefreshCw className="w-6 h-6 text-secondary animate-spin" aria-hidden="true" />
      <span className="sr-only">Loading the booking form</span>
    </div>
  );
  if (!hydrated) return placeholder;
  return (
    <BookingFormBoundary>
      <Suspense fallback={placeholder}>
        <BookingForm preSelectedTreatmentId={preSelectedTreatmentId} preSelectNonce={preSelectNonce} bare />
      </Suspense>
    </BookingFormBoundary>
  );
}

// initialPath is passed by the build-time prerenderer (src/entry-server.tsx);
// in the browser the current URL is used.
export default function App({ initialPath }: { initialPath?: string } = {}) {
  // The page being shown. One value, decided by classifyRoute() from the URL
  // (src/lib/routes.ts) -- the same function the build uses to prerender
  // each page, so the browser and the static HTML always agree.
  // (Typed explicitly: the project has no @types/react, so useState is untyped.)
  const [route, setRoute]: [Route, (next: Route) => void] = useState<Route>(() => classifyRoute(initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')));
  const [preSelectedTreatmentId, setPreSelectedTreatmentId] = useState<string>('checkup');
  // Counts treatment picks, so picking the same treatment again still
  // reaches the booking form after the patient changed its dropdown.
  const [treatmentPick, setTreatmentPick] = useState(0);
  const [symptomCheckerOpen, setSymptomCheckerOpen] = useState(false);
  const [faqOpenId, setFaqOpenId] = useState<string | null>(null);

  if (route.type === 'admin') {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-surface-alt"><RefreshCw className="w-6 h-6 text-secondary animate-spin" /></div>}>
        <AdminView />
      </Suspense>
    );
  }

  // Fetch the booking form right after hydration on every page (see
  // loadBookingForm above). A failed fetch is retried when the form mounts.
  useEffect(() => {
    loadBookingForm().catch(() => {});
  }, []);

  // Keep the page in sync with the browser's own back/forward navigation.
  useEffect(() => {
    const handlePopState = () => {
      setSymptomCheckerOpen(false);
      setRoute(classifyRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Each prerendered page already ships its own <title>, description,
  // canonical and JSON-LD; this keeps the head in step as the visitor moves
  // between pages in-app (same getRouteMeta() the build uses). Also fires the
  // one and only page_view for this route (see analytics.ts) -- skipped
  // entirely for Not Found, so a bot probing a fake URL never counts as a
  // pageview.
  useEffect(() => {
    const meta = getRouteMeta(route, normalizePath(window.location.pathname));
    setPageMeta(meta);
    if (route.type === 'notFound') {
      // Clarity already started recording by the time index.html's own
      // exclusion check could run (that only knows about /admin and
      // ?gtm_latency=, not a fake URL -- only the app can tell). Cut it short
      // here instead of letting a bot-probed dead link run a full session.
      stopClarityRecording();
      return;
    }
    trackPageView(meta.path, meta.title);
  }, [route]);

  // Scrolls to a section that lives on the home page. If we're currently on a
  // subpage (so the section isn't mounted yet), switch to the home page first
  // and scroll once it renders, instead of scrolling to the top and then to
  // the section as two separate, competing animations. `resolveTarget`, once
  // the section is confirmed mounted, can redirect the scroll to a specific
  // element inside it instead of the section's own top.
  const navigateToSection = (sectionId: string, resolveTarget?: () => HTMLElement | null) => {
    const scrollToTarget = () => (resolveTarget?.() ?? document.getElementById(sectionId))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const existing = document.getElementById(sectionId);
    if (existing) {
      scrollToTarget();
      return;
    }
    setSymptomCheckerOpen(false);
    setRoute({ type: 'home' });
    if (normalizePath(window.location.pathname) !== '/') window.history.pushState(null, '', '/');
    // Wait for the home page to actually render before scrolling to it.
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTarget);
    });
  };

  // Switches page in-app; every <Link> on the site goes through this. A
  // "/#section" target scrolls to that section of the home page.
  const navigate = (to: string) => {
    const url = new URL(to, window.location.href);
    const next = classifyRoute(url.pathname);
    if (url.origin !== window.location.origin || next.type === 'admin') {
      window.location.assign(url.href);
      return;
    }
    if (next.type === 'home' && url.hash.length > 1) {
      navigateToSection(decodeURIComponent(url.hash.slice(1)));
      return;
    }
    setSymptomCheckerOpen(false);
    if (routePath(next) !== routePath(route) || next.type === 'notFound') setRoute(next);
    const path = normalizePath(url.pathname);
    if (normalizePath(window.location.pathname) !== path || window.location.hash) window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleScrollToBooking = () => navigateToSection('booking-section');

  // Picking a treatment to book (Services cards, a treatment page, the
  // Symptom Checker) pre-selects it and scrolls to the booking form.
  const handleSelectTreatment = (treatmentId: string) => {
    setPreSelectedTreatmentId(treatmentId);
    setTreatmentPick((n) => n + 1);
    handleScrollToBooking();
  };

  const handleOpenSymptomChecker = () => {
    navigate('/');
    setSymptomCheckerOpen(true);
  };

  const handleCloseSymptomChecker = () => {
    setSymptomCheckerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSymptomCheckerSelectTreatment = (treatmentId: string) => {
    setSymptomCheckerOpen(false);
    handleSelectTreatment(treatmentId);
  };

  // Header and footer around every page.
  const page = (content: React.ReactNode, extra?: React.ReactNode) => (
    <NavigationProvider value={navigate}>
      <div className="min-h-screen bg-white">
        <Navbar onScrollToBooking={handleScrollToBooking} onNavigateSection={navigateToSection} />
        {content}
        <Footer onNavigateSection={navigateToSection} />
        {extra}
      </div>
    </NavigationProvider>
  );

  switch (route.type) {
    case 'notFound':
      return page(<NotFound onGoHome={() => navigate('/')} />);
    case 'blogsList':
      return page(<BlogsListView />);
    case 'blogPost':
      return page(<BlogDetailView blogId={route.blogId} onBookAppointment={handleScrollToBooking} />);
    case 'treatmentsList':
      return page(<TreatmentsIndex />);
    case 'treatment':
      return page(<TreatmentPage treatmentId={route.treatmentId} onBookTreatment={handleSelectTreatment} />);
    case 'doctor':
      return page(<DoctorPage />);
    case 'home':
      break;
    default: {
      // A new page type must be handled above: the type check fails here
      // until it is (and `npm run build` runs the type check).
      const unhandled: never = route;
      throw new Error(`No view for route ${JSON.stringify(unhandled)}`);
    }
  }

  if (symptomCheckerOpen) {
    return page(<>
      <div className="max-w-[1280px] mx-auto w-full px-6 md:px-10 lg:px-16 pt-8">
        <button onClick={handleCloseSymptomChecker} className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary font-sans text-sm font-medium transition-colors cursor-pointer">
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>
      <SymptomChecker onSelectTreatment={handleSymptomCheckerSelectTreatment} />
    </>);
  }

  return page(<>
        <Hero onScrollToBooking={handleScrollToBooking} />
        <About onScrollToBooking={handleScrollToBooking} />
        <Services onSelectTreatment={handleSelectTreatment} selectedTreatmentId={preSelectedTreatmentId} />
        <section id="booking-section" className="py-14 lg:py-20 bg-surface-alt scroll-mt-24">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Book an Appointment</span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">
                Book your visit in under a{' '}
                <span className="relative inline-block italic font-semibold">
                  minute
                  <SmileCurve stroke="#00D4C9" className="absolute -left-[4%] -bottom-2.5 w-[108%] h-4" />
                </span>
              </h2>
              <p className="font-sans text-base text-on-surface-variant mt-5 leading-relaxed">Pick a real, open time. Your slot is confirmed the moment you book.</p>
            </div>
            {/* The visit panel sits above the form on phones and tablets, beside it from lg up. */}
            <div className="mt-10 md:mt-12 flex flex-col lg:flex-row bg-white rounded-[32px] border border-[#E2E8F0] overflow-hidden shadow-[0_30px_70px_-30px_rgba(11,19,65,0.35)]">
              <BookingVisitPanel className="lg:w-[38%] shrink-0" />
              <div className="flex-1 min-w-0">
                <BookingFormSlot preSelectedTreatmentId={preSelectedTreatmentId} preSelectNonce={treatmentPick} />
              </div>
            </div>
          </div>
        </section>
        <Testimonials onScrollToBooking={handleScrollToBooking} />
        <LocationDetails onScrollToBooking={handleScrollToBooking} />
        <LatestArticles />
        <section className="py-14 lg:py-20 bg-surface-alt px-6 md:px-10 lg:px-16 border-b border-cool-gray/5">
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Common Questions</span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">Frequently Asked Questions</h2>
              <div className="w-12 h-1 bg-secondary mx-auto mt-6" />
            </div>
            <div className="bg-white rounded-3xl border border-cool-gray/10 premium-shadow overflow-hidden divide-y divide-cool-gray/10">
              {FAQS.map((faq: FAQItem) => {
                const isOpen = faqOpenId === faq.id;
                return (
                  <div key={faq.id} className={`border-l-4 transition-colors duration-300 ${isOpen ? 'border-secondary bg-secondary/5' : 'border-transparent'}`}>
                    <button type="button" className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer" onClick={() => setFaqOpenId(isOpen ? null : faq.id)}>
                      <span className="font-sans font-bold text-sm sm:text-base text-primary flex-1">{faq.question}</span>
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary'}`}>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 font-sans text-sm text-on-surface-variant leading-relaxed">{faq.answer}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-cool-gray/10 premium-shadow p-6">
              <div className="text-center sm:text-left">
                <p className="font-serif font-bold text-primary">Still have questions?</p>
                <p className="font-sans text-xs text-on-surface-variant mt-1">Our team is happy to help — reach out directly.</p>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: 'faq_talk_to_us' })} className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0"><Phone className="w-4 h-4" /> Talk to Us</a>
            </div>
          </div>
        </section>
  </>, <FloatingWhatsApp />);
}
