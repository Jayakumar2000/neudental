// neudental v1 - one treatment's page, /treatments/{slug}: the facts from
// TREATMENTS (cost, duration, what's included) plus the long-form patient
// guide from src/content/treatments/, when there is one.
import React from 'react';
import { Clock, IndianRupee, Phone, ShieldCheck, CalendarCheck, Check, ArrowRight } from 'lucide-react';
import { BLOGS, CLINIC, DOCTOR, TREATMENTS } from '../data';
import { trackConversion } from '../lib/analytics';
import { Link } from '../lib/navigation';
import { DOCTOR_PATH, inAppClick } from '../lib/routes';
import { alternateNamesText, categoryLabel, fillTokens, formatPriceRange, guideFor, treatmentById, treatmentPath } from '../lib/treatments';
import type { BlogPost, Treatment } from '../types';
import Breadcrumbs from './Breadcrumbs';
import ContentBlocks, { InlineText, VisitCta, formatIsoDate } from './ContentBlocks';

interface TreatmentPageProps {
  treatmentId: string;
  // Opens the booking form with this treatment selected.
  onBookTreatment: (treatmentId: string) => void;
}

export default function TreatmentPage({ treatmentId, onBookTreatment }: TreatmentPageProps) {
  const treatment = treatmentById(treatmentId)!;
  const guide = guideFor(treatment.id);
  const fill = (text: string) => fillTokens(text, treatment);
  const book = () => onBookTreatment(treatment.id);
  const price = formatPriceRange(treatment.priceRange);

  const relatedPosts = (guide?.relatedPosts ?? [])
    .map((id) => BLOGS.find((b) => b.id === id))
    .filter((b): b is BlogPost => Boolean(b));
  const explicitRelated = (guide?.relatedTreatments ?? []).map(treatmentById).filter((t): t is Treatment => Boolean(t));
  const sameCategory = TREATMENTS.filter((t) => t.category === treatment.category && t.id !== treatment.id && !explicitRelated.includes(t));
  const otherTreatments = [...explicitRelated, ...sameCategory].slice(0, 6);
  const reviewedByDoctor = guide?.reviewedBy?.startsWith(DOCTOR.name);

  return (
    <article className="bg-white">
      <header className="relative overflow-hidden bg-gradient-to-br from-white via-surface-alt to-[#EEF5FC] pt-10 pb-12 md:pt-12 md:pb-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[['Home', '/'], ['Treatments', '/treatments'], [treatment.name, treatmentPath(treatment)]]} className="mb-6" />
          <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">{categoryLabel(treatment.category)}</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-primary font-bold leading-tight mt-3">{guide ? fill(guide.headline) : `${treatment.name} in Kodungaiyur, Chennai`}</h1>
          <p className="font-sans text-base md:text-lg text-on-surface-variant mt-4 leading-relaxed">{treatment.description}.</p>
          {treatment.alternateNames?.length ? <p className="font-sans text-sm text-cool-gray mt-2">Also known as {alternateNamesText(treatment)}.</p> : null}
          <div className="flex flex-wrap items-center gap-2.5 mt-6 font-sans text-xs font-bold text-primary">
            <span className="inline-flex items-center gap-1.5 bg-white border border-cool-gray/15 rounded-full px-3.5 py-2"><Clock className="w-3.5 h-3.5 text-secondary" aria-hidden="true" /> {treatment.duration}</span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-cool-gray/15 rounded-full px-3.5 py-2"><IndianRupee className="w-3.5 h-3.5 text-secondary" aria-hidden="true" /> {price}</span>
            {guide?.reviewedBy && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-cool-gray/15 rounded-full px-3.5 py-2"><ShieldCheck className="w-3.5 h-3.5 text-secondary" aria-hidden="true" /> Reviewed by {reviewedByDoctor ? <Link to={DOCTOR_PATH} className="hover:text-secondary">{guide.reviewedBy}</Link> : guide.reviewedBy}</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <a href="/#booking-section" onClick={inAppClick(book)} className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-colors"><CalendarCheck className="w-4 h-4" aria-hidden="true" /> Book this treatment</a>
            <a href={CLINIC.phoneHref} onClick={() => trackConversion('call_click', 'call', { link_location: 'treatment_page' })} className="inline-flex items-center justify-center gap-2 border border-cool-gray/20 bg-white hover:bg-surface-alt text-primary px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-colors"><Phone className="w-4 h-4" aria-hidden="true" /> Call {CLINIC.phone}</a>
          </div>
        </div>
      </header>

      <div className="px-6 md:px-10 lg:px-16 py-12 md:py-14">
        <div className="max-w-3xl mx-auto space-y-5">
          {guide && (
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">Quick answer</p>
              <p className="font-sans text-base text-on-surface leading-relaxed"><InlineText text={fill(guide.answer)} /></p>
            </div>
          )}

          <div className="overflow-x-auto border border-cool-gray/15 rounded-2xl">
            <table className="w-full text-left font-sans text-[15px]">
              <caption className="text-left px-5 pt-4 pb-1 font-bold text-primary text-sm">{treatment.name} at neudental: at a glance</caption>
              <tbody>
                <tr><th scope="row" className="px-3 sm:px-5 py-3 font-semibold text-primary align-top w-2/5">Indicative cost</th><td className="px-3 sm:px-5 py-3 text-on-surface-variant align-top">{price}<span className="block text-xs text-cool-gray mt-1">The final cost is confirmed after an examination, and depends on your case.</span></td></tr>
                <tr className="border-t border-cool-gray/10"><th scope="row" className="px-3 sm:px-5 py-3 font-semibold text-primary align-top">Typical duration</th><td className="px-3 sm:px-5 py-3 text-on-surface-variant align-top">{treatment.duration}</td></tr>
                <tr className="border-t border-cool-gray/10"><th scope="row" className="px-3 sm:px-5 py-3 font-semibold text-primary align-top">What's included</th><td className="px-3 sm:px-5 py-3 text-on-surface-variant align-top">
                  <ul className="space-y-1">{treatment.features.map((f) => <li key={f} className="flex gap-2"><Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />{f}</li>)}</ul>
                </td></tr>
                <tr className="border-t border-cool-gray/10"><th scope="row" className="px-3 sm:px-5 py-3 font-semibold text-primary align-top">Where</th><td className="px-3 sm:px-5 py-3 text-on-surface-variant align-top">{CLINIC.name}, {CLINIC.streetAddress}, {CLINIC.locality}. {CLINIC.hoursText}.</td></tr>
                <tr className="border-t border-cool-gray/10"><th scope="row" className="px-3 sm:px-5 py-3 font-semibold text-primary align-top">Dentist</th><td className="px-3 sm:px-5 py-3 text-on-surface-variant align-top"><Link to={DOCTOR_PATH} className="text-secondary hover:text-primary underline underline-offset-2">{DOCTOR.name}, {DOCTOR.title}</Link></td></tr>
              </tbody>
            </table>
          </div>

          {guide && <ContentBlocks blocks={guide.content} faqs={guide.faqs} transform={fill} linkLocation="treatment_page" onBook={book} />}

          {(relatedPosts.length > 0 || otherTreatments.length > 0) && (
            <div className="pt-6 mt-4 border-t border-cool-gray/10 font-sans text-sm grid gap-6 sm:grid-cols-2">
              {otherTreatments.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">Related treatments</p>
                  <ul className="space-y-1">
                    {otherTreatments.map((t) => (
                      <li key={t.id}><Link to={treatmentPath(t)} className="text-secondary hover:text-primary underline underline-offset-2 transition-colors">{t.name}</Link></li>
                    ))}
                    <li><Link to="/treatments" className="inline-flex items-center gap-1 text-primary font-semibold hover:text-secondary transition-colors">All treatments &amp; prices <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /></Link></li>
                  </ul>
                </div>
              )}
              {relatedPosts.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">Related reading</p>
                  <ul className="space-y-1">
                    {relatedPosts.map((p) => (
                      <li key={p.id}><Link to={`/blogs/${p.id}`} className="text-secondary hover:text-primary underline underline-offset-2 transition-colors">{p.title}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="pt-4">
            <VisitCta
              title={`Book ${treatment.name} in Kodungaiyur`}
              text={`Visit ${DOCTOR.name} at neudental for an examination and a clear treatment plan with costs, before anything is started.`}
              linkLocation="treatment_page"
              bookLabel="Book this treatment"
              onBook={book}
            />
          </div>

          <p className="font-sans text-xs text-cool-gray leading-relaxed pt-2">
            {guide && <>Last updated <time dateTime={guide.dateModified ?? guide.datePublished}>{formatIsoDate(guide.dateModified ?? guide.datePublished)}</time>. </>}
            This page is general information to help you understand the treatment, not a diagnosis. Whether it suits you, and what it will cost, is decided after an examination at the clinic.
          </p>
        </div>
      </div>
    </article>
  );
}
