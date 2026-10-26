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
import { FAQS, BLOGS, WHATSAPP_URL } from './data';
import { ChevronDown, ChevronUp, ArrowLeft, Phone, RefreshCw } from 'lucide-react';
import type { FAQItem } from './types';
import { trackConversion, trackPageView, stopClarityRecording } from './lib/analytics';
import { getRouteMeta, setPageMeta } from './lib/seo';
import { classifyRoute, normalizePath, type Route } from './lib/routes';
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
  const [initialRoute] = useState<Route>(() => classifyRoute(initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')));
  const [preSelectedTreatmentId, setPreSelectedTreatmentId] = useState<string>('checkup');
  // Counts treatment picks, so picking the same treatment again still
  // reaches the booking form after the patient changed its dropdown.
  const [treatmentPick, setTreatmentPick] = useState(0);
  const [symptomCheckerOpen, setSymptomCheckerOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(initialRoute.type === 'blogsList' || initialRoute.type === 'blogPost');
  const [activeBlogId, setActiveBlogId] = useState<string | null>(initialRoute.type === 'blogPost' ? initialRoute.blogId : null);
  const [notFoundOpen, setNotFoundOpen] = useState(initialRoute.type === 'notFound');
  const [faqOpenId, setFaqOpenId] = useState<string | null>(null);

  if (initialRoute.type === 'admin') {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-surface-alt"><RefreshCw className="w-6 h-6 text-secondary animate-spin" /></div>}>
        <AdminView />
      </Suspense>
    );
  }

  const goToPath = (path: string) => {
    if (typeof window === 'undefined') return;
    const currentPath = normalizePath(window.location.pathname);
    if (currentPath !== path) {
      window.history.pushState(null, '', path);
    }
  };

  // Fetch the booking form right after hydration on every page (see
  // loadBookingForm above). A failed fetch is retried when the form mounts.
  useEffect(() => {
    loadBookingForm().catch(() => {});
  }, []);

  // Keep state in sync with the browser's own back/forward navigation.
  useEffect(() => {
    const handlePopState = () => {
      const route = classifyRoute(window.location.pathname);
      setSymptomCheckerOpen(false);
      setBlogsOpen(route.type === 'blogsList' || route.type === 'blogPost');
      setActiveBlogId(route.type === 'blogPost' ? route.blogId : null);
      setNotFoundOpen(route.type === 'notFound');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Each prerendered page already ships its own <title>, description,
  // canonical and JSON-LD; this keeps the head in step as the visitor moves
  // between pages in-app (same getRouteMeta() the build uses). Also fires the
  // one and only page_view for this route (see analytics.ts) -- skipped
  // entirely for Not Found, so a bot probing a fake /blogs/:id slug never
  // counts as a pageview.
  useEffect(() => {
    const route: Route = notFoundOpen
      ? { type: 'notFound' }
      : activeBlogId
        ? { type: 'blogPost', blogId: activeBlogId }
        : blogsOpen
          ? { type: 'blogsList' }
          : { type: 'home' };
    const meta = getRouteMeta(route, normalizePath(window.location.pathname));
    setPageMeta(meta);
    if (route.type === 'notFound') {
      // Clarity already started recording by the time index.html's own
      // exclusion check could run (that only knows about /admin and
      // ?gtm_latency=, not a fake blog slug -- only the app can tell). Cut
      // it short here instead of letting a bot-probed dead link run a full
      // session.
      stopClarityRecording();
      return;
    }
    trackPageView(meta.path, meta.title);
  }, [notFoundOpen, blogsOpen, activeBlogId]);

  // Scrolls to a section that lives on the home page. If we're currently on a
  // subpage (so the section isn't mounted yet), close that view first and
  // retry once it renders, instead of scrolling to the top and then to the
  // section as two separate, competing animations. `resolveTarget`, once the
  // section is confirmed mounted, can redirect the scroll to a specific
  // element inside it instead of the section's own top.
  const navigateToSection = (sectionId: string, resolveTarget?: () => HTMLElement | null) => {
    const scrollToTarget = () => (resolveTarget?.() ?? document.getElementById(sectionId))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const existing = document.getElementById(sectionId);
    if (existing) {
      scrollToTarget();
      return;
    }
    setSymptomCheckerOpen(false);
    setBlogsOpen(false);
    setActiveBlogId(null);
    setNotFoundOpen(false);
    goToPath('/');
    // Wait for the home page to actually render before scrolling to it.
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTarget);
    });
  };

  const handleScrollToBooking = () => navigateToSection('booking-section');

  // Treatment resource pages are a phase 2 feature -- for phase 1, selecting a
  // treatment from the Services bento cards or the Symptom Checker
  // pre-selects it and scrolls to the booking form.
  const handleSelectTreatment = (treatmentId: string) => {
    setPreSelectedTreatmentId(treatmentId);
    setTreatmentPick((n) => n + 1);
    handleScrollToBooking();
  };

  // Clicking a treatment from the header nav dropdown or the footer list
  // pre-selects it. On mobile that should land on the treatment's full
  // detail card (cost, duration, highlights) in the swipeable deck further
  // down the Services section -- not just the section's heading -- matching
  // what tapping a tile in the mobile icon-grid overview already does.
  // Desktop keeps landing on the section top: the selected treatment's
  // detail sits in the sticky side panel right there already.
  const handleViewTreatmentInServices = (treatmentId: string) => {
    setPreSelectedTreatmentId(treatmentId);
    setTreatmentPick((n) => n + 1);
    navigateToSection('services', () => {
      const deck = document.getElementById('treatments-deck');
      // Services.tsx only renders the deck below the lg breakpoint (its
      // `lg:hidden` wrapper) -- offsetParent is null there once that media
      // query hides it, which is how desktop is told apart from mobile here.
      return deck && deck.offsetParent !== null ? deck : null;
    });
  };

  const handleOpenSymptomChecker = () => {
    setBlogsOpen(false);
    setActiveBlogId(null);
    setNotFoundOpen(false);
    setSymptomCheckerOpen(true);
    goToPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseSymptomChecker = () => {
    setSymptomCheckerOpen(false);
    goToPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSymptomCheckerSelectTreatment = (treatmentId: string) => {
    setSymptomCheckerOpen(false);
    handleSelectTreatment(treatmentId);
  };

  const handleOpenBlogs = () => {
    setSymptomCheckerOpen(false);
    setActiveBlogId(null);
    setNotFoundOpen(false);
    setBlogsOpen(true);
    goToPath('/blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Used by the 404 view's "Back to Home" button and its Navbar logo click.
  const handleGoHome = () => {
    setSymptomCheckerOpen(false);
    setBlogsOpen(false);
    setActiveBlogId(null);
    setNotFoundOpen(false);
    goToPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseBlogs = () => {
    setBlogsOpen(false);
    setActiveBlogId(null);
    goToPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = (blogId: string) => {
    setActiveBlogId(blogId);
    goToPath(`/blogs/${blogId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogsList = () => {
    setActiveBlogId(null);
    goToPath('/blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (symptomCheckerOpen) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={handleCloseSymptomChecker} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
        <div className="max-w-[1280px] mx-auto w-full px-6 md:px-10 lg:px-16 pt-8">
          <button onClick={handleCloseSymptomChecker} className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary font-sans text-sm font-medium transition-colors cursor-pointer">
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
        <SymptomChecker onSelectTreatment={handleSymptomCheckerSelectTreatment} />
        <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      </div>
    );
  }

  if (notFoundOpen) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={handleGoHome} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
        <NotFound onGoHome={handleGoHome} />
        <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      </div>
    );
  }

  if (activeBlogId) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={handleCloseBlogs} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
        <BlogDetailView blogId={activeBlogId} onBack={handleBackToBlogsList} onSelectBlog={handleSelectBlog} onBookAppointment={handleScrollToBooking} />
        <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      </div>
    );
  }

  if (blogsOpen) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={handleCloseBlogs} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
        <BlogsListView onSelectBlog={handleSelectBlog} />
        <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
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
      <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      <FloatingWhatsApp />
    </div>
  );
    }
