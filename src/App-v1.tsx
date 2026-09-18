// neudental v1 - Root Application Component
// See README.md for full setup instructions
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SymptomChecker from './components/SymptomChecker';
import BookingForm from './components/BookingForm';
import DoctorTrustBanner from './components/DoctorTrustBanner';
import Testimonials from './components/Testimonials';
import LocationDetails from './components/LocationDetails';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import { FAQS, BLOGS } from './data';
import { ChevronDown, ChevronUp, ArrowLeft, Phone, RefreshCw } from 'lucide-react';
import type { FAQItem } from './types';
import { trackConversion, trackPageView } from './lib/analytics';
import { setPageMeta, resetPageMeta } from './lib/seo';

// Code-split: the staff-only admin CRM and the blog views are never opened by
// most patients on a mobile data plan, so they shouldn't be in the same
// download as the homepage. Lazy-loaded on first visit to their own route.
const AdminView = lazy(() => import('./components/AdminView'));
const BlogsListView = lazy(() => import('./components/BlogsListView'));
const BlogDetailView = lazy(() => import('./components/BlogDetailView'));

function RouteLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <RefreshCw className="w-6 h-6 text-secondary animate-spin" />
    </div>
  );
}

// Blog subpages get a real URL (/blogs, /blogs/{blog-id}) via manual
// history.pushState + a popstate listener below, since the app has no
// router. vercel.json rewrites /blogs and everything under /blogs/* to
// index.html -- it can't tell a real slug from an invented one, since that
// list only exists in this app's own data. This classifier is what actually
// draws that line: it's the client-side mirror of the edge allow-list for
// paths outside /blogs entirely, and the sole authority for whether a given
// blog slug is real, so a bot probing /blogs/some-fake-slug lands on the same
// Not Found view (and never fires a page_view -- see the effect below) as
// one probing a made-up top-level path.
type Route =
  | { type: 'home' }
  | { type: 'admin' }
  | { type: 'blogsList' }
  | { type: 'blogPost'; blogId: string }
  | { type: 'notFound' };

function classifyRoute(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/';
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

const initialRoute: Route = typeof window !== 'undefined' ? classifyRoute(window.location.pathname) : { type: 'home' };

export default function App() {
  const [preSelectedTreatmentId, setPreSelectedTreatmentId] = useState<string>('checkup');
  const [symptomCheckerOpen, setSymptomCheckerOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(initialRoute.type === 'blogsList' || initialRoute.type === 'blogPost');
  const [activeBlogId, setActiveBlogId] = useState<string | null>(initialRoute.type === 'blogPost' ? initialRoute.blogId : null);
  const [notFoundOpen, setNotFoundOpen] = useState(initialRoute.type === 'notFound');
  const [faqOpenId, setFaqOpenId] = useState<string | null>(null);

  if (typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/admin') {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-surface-alt"><RefreshCw className="w-6 h-6 text-secondary animate-spin" /></div>}>
        <AdminView />
      </Suspense>
    );
  }

  const goToPath = (path: string) => {
    if (typeof window === 'undefined') return;
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    if (currentPath !== path) {
      window.history.pushState(null, '', path);
    }
  };

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

  // Every route shares one static index.html, so <title>/description/canonical
  // never change on their own -- without this, a blog post would carry the
  // homepage's canonical URL and tell Google it's a duplicate of "/" instead
  // of its own indexable page. Also fires the one and only page_view for this
  // route (see analytics.ts) -- skipped entirely when notFoundOpen, which is
  // the actual fix for a bot probing a fake /blogs/:id slug still counting
  // as a pageview.
  useEffect(() => {
    if (notFoundOpen) {
      setPageMeta({
        title: 'Page Not Found | Neudental',
        description: 'The page you were looking for could not be found. Return to the Neudental homepage to explore our dental treatments and book an appointment.',
        path: window.location.pathname,
        noIndex: true,
      });
      return;
    }
    if (activeBlogId) {
      const post = BLOGS.find((b) => b.id === activeBlogId);
      if (post) {
        const path = `/blogs/${post.id}`;
        const title = `${post.title} | Neudental Blog`;
        setPageMeta({ title, description: post.excerpt, path });
        trackPageView(path, title);
        return;
      }
    }
    if (blogsOpen) {
      const title = 'Dental Health Blog | Neudental, Kodungaiyur, Chennai';
      setPageMeta({
        title,
        description: 'Practical, patient-friendly dental health and clinic guidance from the Neudental team in Kodungaiyur, Chennai.',
        path: '/blogs',
      });
      trackPageView('/blogs', title);
      return;
    }
    resetPageMeta();
    trackPageView(window.location.pathname.replace(/\/+$/, '') || '/', document.title);
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
        <Suspense fallback={<RouteLoading />}>
          <BlogDetailView blogId={activeBlogId} onBack={handleBackToBlogsList} />
        </Suspense>
        <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      </div>
    );
  }

  if (blogsOpen) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={handleCloseBlogs} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
        <Suspense fallback={<RouteLoading />}>
          <BlogsListView onSelectBlog={handleSelectBlog} />
        </Suspense>
        <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
      <Hero onScrollToBooking={handleScrollToBooking} />
      <About />
      <Services onSelectTreatment={handleSelectTreatment} selectedTreatmentId={preSelectedTreatmentId} />
      <section id="booking-section" className="py-14 lg:py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-cool-gray/10 premium-shadow overflow-hidden">
            <DoctorTrustBanner />
            <BookingForm preSelectedTreatmentId={preSelectedTreatmentId} bare />
          </div>
        </div>
      </section>
      <Testimonials />
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
            <a href="https://wa.me/919342367446" target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: 'faq_talk_to_us' })} className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0"><Phone className="w-4 h-4" /> Talk to Us</a>
          </div>
        </div>
      </section>
      <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      <a href="https://wa.me/919342367446?text=Hello%20neudental%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: 'floating_button' })} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center gap-2 w-14 h-14 sm:w-auto sm:h-auto bg-green-500 hover:bg-green-600 text-white sm:px-4 sm:py-3 rounded-full shadow-lg transition-all hover:scale-105" aria-label="Book via WhatsApp">
        <svg className="w-6 h-6 sm:w-5 sm:h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="hidden sm:inline text-sm font-medium">Book via WhatsApp</span>
      </a>
    </div>
  );
    }
