// neudental v1 - Dr. Swetha's profile page (/dr-swetha). Search engines and
// AI assistants weigh who stands behind medical advice; this page is the one
// place that says it, and every treatment guide and reviewed article links
// here. Everything shown comes from DOCTOR, TRUST_STATS and the site's
// existing clinic details -- nothing is stated here that isn't elsewhere.
import React from 'react';
import { GraduationCap, ShieldCheck, Stethoscope, BadgeCheck, ArrowRight } from 'lucide-react';
import { BLOGS, DOCTOR, TREATMENTS } from '../data';
import { Link } from '../lib/navigation';
import { treatmentPath } from '../lib/treatments';
import { TRUST_STATS } from './About';
import Breadcrumbs from './Breadcrumbs';
import { VisitCta } from './ContentBlocks';
import { DOCTOR_PATH } from '../lib/routes';

// Shown in the site footer as the clinic's professional standing.
export const DOCTOR_MEMBERSHIPS = ['Member of the Indian Dental Association', 'Registered with the Tamil Nadu State Dental Council'];

export default function DoctorPage() {
  const reviewed = BLOGS.filter((post) => post.reviewedBy?.startsWith(DOCTOR.name));
  return (
    <article className="bg-white">
      <header className="bg-gradient-to-br from-white via-surface-alt to-[#EEF5FC] pt-10 pb-12 md:pt-12 md:pb-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[['Home', '/'], [DOCTOR.name, DOCTOR_PATH]]} className="mb-6" />
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start">
            <div className="w-40 sm:w-52 md:w-60 shrink-0 aspect-[4/5] rounded-2xl overflow-hidden bg-cool-gray/10 premium-shadow">
              <img src="/doctor/dr-swetha.webp" alt={`${DOCTOR.name}, ${DOCTOR.specialty} at neudental, Kodungaiyur, Chennai`} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1">
              <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">{DOCTOR.specialty}</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary font-bold leading-tight mt-3">{DOCTOR.name}, <span className="text-2xl sm:text-3xl">{DOCTOR.title}</span></h1>
              <p className="font-sans text-base md:text-lg text-on-surface-variant mt-3 leading-relaxed">Lead dentist at neudental, a family dental clinic in Kodungaiyur, North Chennai.</p>
              <ul className="mt-5 space-y-2 font-sans text-sm text-on-surface-variant">
                <li className="flex gap-2"><GraduationCap className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" /><span>{DOCTOR.education} &amp; {DOCTOR.experience}</span></li>
                {DOCTOR_MEMBERSHIPS.map((m) => (
                  <li key={m} className="flex gap-2"><BadgeCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" /><span>{m}</span></li>
                ))}
                {DOCTOR.registration && <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" /><span>Registration: {DOCTOR.registration}</span></li>}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 md:px-10 lg:px-16 py-12 md:py-14">
        <div className="max-w-3xl mx-auto space-y-10">
          <section aria-labelledby="about-doctor">
            <h2 id="about-doctor" className="font-serif text-2xl text-primary font-bold mb-3">About {DOCTOR.name}</h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">{DOCTOR.bio}</p>
          </section>

          <section aria-labelledby="doctor-numbers">
            <h2 id="doctor-numbers" className="font-serif text-2xl text-primary font-bold mb-4">At a glance</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="bg-surface-container-low border border-cool-gray/10 rounded-2xl p-4 flex flex-col-reverse">
                  <dt className="font-sans text-xs text-cool-gray font-semibold leading-snug mt-1">{stat.label}</dt>
                  <dd className="font-display font-bold text-2xl text-primary">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="doctor-expertise">
            <h2 id="doctor-expertise" className="font-serif text-2xl text-primary font-bold mb-4">Areas of expertise</h2>
            <ul className="flex flex-wrap gap-2">
              {DOCTOR.skills.map((skill) => (
                <li key={skill} className="inline-flex items-center gap-1.5 bg-secondary/5 border border-secondary/10 text-primary font-sans text-sm font-semibold rounded-full px-3.5 py-1.5"><Stethoscope className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />{skill}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="doctor-treatments">
            <h2 id="doctor-treatments" className="font-serif text-2xl text-primary font-bold mb-2">Treatments at neudental</h2>
            <p className="font-sans text-sm text-on-surface-variant mb-4 leading-relaxed">Every treatment at the clinic is planned and carried out by {DOCTOR.name}. Each guide explains the procedure, recovery and typical cost.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 font-sans text-sm">
              {TREATMENTS.map((t) => (
                <li key={t.id}><Link to={treatmentPath(t)} className="text-secondary hover:text-primary underline underline-offset-2 transition-colors">{t.name}</Link></li>
              ))}
            </ul>
            <Link to="/treatments" className="inline-flex items-center gap-1 mt-4 font-sans text-sm font-bold text-primary hover:text-secondary">All treatments &amp; prices <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </section>

          {reviewed.length > 0 && (
            <section aria-labelledby="doctor-articles">
              <h2 id="doctor-articles" className="font-serif text-2xl text-primary font-bold mb-4">Articles reviewed by {DOCTOR.name}</h2>
              <ul className="space-y-2 font-sans text-sm">
                {reviewed.map((post) => (
                  <li key={post.id}><Link to={`/blogs/${post.id}`} className="text-secondary hover:text-primary underline underline-offset-2 transition-colors">{post.title}</Link></li>
                ))}
              </ul>
            </section>
          )}

          <VisitCta
            title={`Book a consultation with ${DOCTOR.name}`}
            text="Check-ups, second opinions and treatment planning, all 7 days a week in Kodungaiyur."
            linkLocation="doctor_page"
          />
        </div>
      </div>
    </article>
  );
}
