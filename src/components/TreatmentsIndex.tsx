// neudental v1 - /treatments: every treatment by category, with its page,
// typical duration and indicative price. Doubles as the clinic's public price
// list, which is what people (and AI assistants) look for in "cost of ... in
// Chennai" questions.
import React from 'react';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';
import { CLINIC, DOCTOR, TREATMENTS } from '../data';
import { Link } from '../lib/navigation';
import { DOCTOR_PATH } from '../lib/routes';
import { TREATMENT_CATEGORIES, formatPriceRange, hasGuide, treatmentPath } from '../lib/treatments';
import Breadcrumbs from './Breadcrumbs';
import { VisitCta } from './ContentBlocks';

export default function TreatmentsIndex() {
  return (
    <section className="bg-white">
      <header className="bg-gradient-to-br from-white via-surface-alt to-[#EEF5FC] pt-10 pb-12 md:pt-12 md:pb-14 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[['Home', '/'], ['Treatments', '/treatments']]} className="mb-6" />
          <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Treatments &amp; prices</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary font-bold leading-tight mt-3">Dental treatments at neudental, Kodungaiyur</h1>
          <p className="font-sans text-base md:text-lg text-on-surface-variant mt-4 leading-relaxed max-w-3xl">
            Every treatment offered at {CLINIC.name} in Kodungaiyur, North Chennai, with its typical duration and indicative price, and a page explaining who needs it, what happens, recovery and costs. All treatment is carried out by <Link to={DOCTOR_PATH} className="text-secondary hover:text-primary underline underline-offset-2">{DOCTOR.name}, {DOCTOR.title}</Link>.
          </p>
        </div>
      </header>

      <div className="px-6 md:px-10 lg:px-16 py-12 md:py-14">
        <div className="max-w-5xl mx-auto space-y-12">
          {TREATMENT_CATEGORIES.map((category) => {
            const items = TREATMENTS.filter((t) => t.category === category.key);
            if (!items.length) return null;
            return (
              <div key={category.key}>
                <h2 className="font-serif text-2xl text-primary font-bold mb-5">{category.label}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((t) => (
                    <li key={t.id}>
                      <Link to={treatmentPath(t)} className="group h-full flex flex-col bg-surface-container-low border border-cool-gray/10 hover:border-secondary/30 rounded-2xl p-5 transition-colors">
                        <h3 className="font-serif font-bold text-lg text-primary leading-snug group-hover:text-secondary transition-colors">{t.name}</h3>
                        <p className="font-sans text-sm text-on-surface-variant mt-1.5 leading-relaxed flex-1">{t.description}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 font-sans text-xs font-semibold text-primary">
                          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />{t.duration}</span>
                          <span className="inline-flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />{formatPriceRange(t.priceRange)}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 mt-4 font-sans text-xs font-bold text-secondary">{hasGuide(t) ? 'Patient guide' : 'Cost & details'} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div>
            <h2 id="price-list" className="font-serif text-2xl text-primary font-bold mb-2 scroll-mt-28">Price list</h2>
            <p className="font-sans text-sm text-on-surface-variant mb-5 leading-relaxed">Indicative prices at neudental, Kodungaiyur. The final cost depends on your case and is confirmed after an examination, before treatment starts.</p>
            <div className="overflow-x-auto border border-cool-gray/15 rounded-2xl">
              <table className="w-full text-left font-sans text-[15px]">
                <caption className="sr-only">Dental treatment prices and durations at neudental, Kodungaiyur, Chennai</caption>
                <thead className="bg-surface-alt text-xs uppercase tracking-wider text-primary">
                  <tr><th scope="col" className="px-3 sm:px-5 py-3">Treatment</th><th scope="col" className="px-3 sm:px-5 py-3">Typical duration</th><th scope="col" className="px-3 sm:px-5 py-3">Indicative price</th></tr>
                </thead>
                <tbody>
                  {TREATMENTS.map((t) => (
                    <tr key={t.id} className="border-t border-cool-gray/10">
                      <th scope="row" className="px-3 sm:px-5 py-3 font-semibold text-primary"><Link to={treatmentPath(t)} className="hover:text-secondary">{t.name}</Link></th>
                      <td className="px-3 sm:px-5 py-3 text-on-surface-variant">{t.duration}</td>
                      <td className="px-3 sm:px-5 py-3 text-on-surface-variant">{formatPriceRange(t.priceRange)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <VisitCta
            title="Not sure which treatment you need?"
            text={`Book a check-up with ${DOCTOR.name}. You'll get a diagnosis and a clear treatment plan with costs before anything is started.`}
            linkLocation="treatments_index"
          />
        </div>
      </div>
    </section>
  );
}
