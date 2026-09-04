// neudental v1 - Root Application Component
// See README.md for full setup instructions
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SymptomChecker from './components/SymptomChecker';
import BookingForm from './components/BookingForm';
import BookingTrustPanel from './components/BookingTrustPanel';
import { BookingVariant1, BookingVariant2, BookingVariant3, BookingVariant4 } from './components/BookingSectionVariants';

// PROTOTYPE ONLY: swap this to preview each design variant locally.
const BOOKING_VARIANT: 1 | 2 | 3 | 4 = 4;
import Testimonials from './components/Testimonials';
import LocationDetails from './components/LocationDetails';
import Footer from './components/Footer';
import BlogsListView from './components/BlogsListView';
import BlogDetailView from './components/BlogDetailView';
import AdminView from './components/AdminView';
import { FAQS } from './data';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import type { FAQItem } from './types';

// Blog subpages get a real URL (/blogs, /blogs/{blog-id}) via manual
// history.pushState + a popstate listener below, since the app has no
// router. Vercel's catch-all rewrite (vercel.json) serves index.html for
// any path, so this is what turns that path into the right view.
function parseBlogRoute(pathname: string): { blogsOpen: boolean; blogId: string | null } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const detailMatch = clean.match(/^\/blogs\/([^/]+)$/);
  if (detailMatch) return { blogsOpen: true, blogId: detailMatch[1] };
  if (clean === '/blogs') return { blogsOpen: true, blogId: null };
  return { blogsOpen: false, blogId: null };
}

const initialBlogRoute = typeof window !== 'undefined' ? parseBlogRoute(window.location.pathname) : { blogsOpen: false, blogId: null };

export default function App() {
  const [preSelectedTreatmentId, setPreSelectedTreatmentId] = useState<string>('checkup');
  const [symptomCheckerOpen, setSymptomCheckerOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(initialBlogRoute.blogsOpen);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(initialBlogRoute.blogId);
  const [faqOpenId, setFaqOpenId] = useState<string | null>(null);

  if (typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/admin') {
    return <AdminView />;
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
      const route = parseBlogRoute(window.location.pathname);
      setSymptomCheckerOpen(false);
      setBlogsOpen(route.blogsOpen);
      setActiveBlogId(route.blogId);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scrolls to a section that lives on the home page. If we're currently on a
  // subpage (so the section isn't mounted yet), close that view first and
  // retry once it renders, instead of scrolling to the top and then to the
  // section as two separate, competing animations.
  const navigateToSection = (sectionId: string) => {
    const existing = document.getElementById(sectionId);
    if (existing) {
      existing.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSymptomCheckerOpen(false);
    setBlogsOpen(false);
    setActiveBlogId(null);
    goToPath('/');
    // Wait for the home page to actually render before scrolling to it.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      });
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
  // pre-selects it and scrolls to the Treatments Offered section instead,
  // so visitors land on the treatment's info snapshot rather than skipping
  // straight to booking.
  const handleViewTreatmentInServices = (treatmentId: string) => {
    setPreSelectedTreatmentId(treatmentId);
    navigateToSection('services');
  };

  const handleOpenSymptomChecker = () => {
    setBlogsOpen(false);
    setActiveBlogId(null);
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
    setBlogsOpen(true);
    goToPath('/blogs');
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

  if (activeBlogId) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onSelectTreatment={handleViewTreatmentInServices} onScrollToBooking={handleScrollToBooking} onLogoClick={handleCloseBlogs} onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} />
        <BlogDetailView blogId={activeBlogId} onBack={handleBackToBlogsList} />
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
      <About />
      <Services onSelectTreatment={handleSelectTreatment} selectedTreatmentId={preSelectedTreatmentId} />
      <section id="booking-section" className="py-14 lg:py-20 bg-gray-50">
        {BOOKING_VARIANT === 1 && <BookingVariant1 />}
        {BOOKING_VARIANT === 2 && <BookingVariant2 />}
        {BOOKING_VARIANT === 3 && <BookingVariant3 />}
        {BOOKING_VARIANT === 4 && <BookingVariant4 />}
      </section>
      <Testimonials />
      <LocationDetails onScrollToBooking={handleScrollToBooking} />
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">FAQs</span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq: FAQItem) => (
              <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors" onClick={() => setFaqOpenId(faqOpenId === faq.id ? null : faq.id)}>
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {faqOpenId === faq.id ? <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {faqOpenId === faq.id && <div className="px-6 py-4 bg-blue-50 text-gray-700 text-sm leading-relaxed">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer onNavigateSection={navigateToSection} onOpenBlogs={handleOpenBlogs} onSelectTreatment={handleViewTreatmentInServices} />
      <a href="https://wa.me/919342367446?text=Hello%20neudental%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center gap-2 w-12 h-12 sm:w-auto sm:h-auto bg-green-500 hover:bg-green-600 text-white sm:px-4 sm:py-3 rounded-full shadow-lg transition-all hover:scale-105" aria-label="Book via WhatsApp">
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="hidden sm:inline text-sm font-medium">Book via WhatsApp</span>
      </a>
    </div>
  );
    }
