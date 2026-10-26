// neudental v1 - renders long-form content: blog posts and treatment guides
// share the same blocks (paragraphs, headings, lists, steps, tables, quick
// answer, FAQ...). See BlogBlock in src/types.ts and BLOG_GUIDE.md.
import React from 'react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import { CLINIC, WHATSAPP_URL } from '../data';
import { trackConversion } from '../lib/analytics';
import { Link, useNavigate } from '../lib/navigation';
import { classifyRoute, inAppClick } from '../lib/routes';
import type { BlogBlock, BlogFAQ } from '../types';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function headingId(block: { text: string; id?: string }) {
  return block.id ?? slugify(block.text);
}

// "2026-10-25" -> "25 October 2026". Written out by hand rather than with
// Intl so the build server and every browser produce identical text.
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function formatIsoDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return d ? `${d} ${MONTH_NAMES[m - 1]} ${y}` : iso;
}

// Renders the small inline syntax content may use: **bold** and
// [link text](/path). A plain link to another page of the site switches page
// in-app; anything else (a #section, ?query, another site) is left to the
// browser.
export function InlineText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  const linkClass = 'text-secondary underline underline-offset-2 hover:text-primary transition-colors';
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={match.index} className="font-semibold text-primary">{match[1]}</strong>);
    } else {
      const href = match[3];
      const internalPage = /^\/[^?#]*$/.test(href) && classifyRoute(href).type !== 'notFound';
      parts.push(internalPage
        ? <Link key={match.index} to={href} className={linkClass}>{match[2]}</Link>
        : <a key={match.index} href={href} className={linkClass}>{match[2]}</a>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export const FAQ_HEADING = 'Frequently asked questions';

export function FaqList({ faqs, transform = (t) => t }: { faqs: BlogFAQ[]; transform?: (text: string) => string }) {
  return (
    <section aria-labelledby="faq" className="space-y-3">
      <h2 id="faq" className="font-serif text-xl sm:text-2xl text-primary font-bold leading-snug pt-4 pb-1 scroll-mt-28">{FAQ_HEADING}</h2>
      {faqs.map((faq, j) => (
        <details key={j} open={j === 0} className="group border border-cool-gray/15 rounded-xl px-5">
          <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-sans font-semibold text-primary [&::-webkit-details-marker]:hidden">
            {transform(faq.question)}
            <ChevronDown className="w-4 h-4 shrink-0 text-secondary transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="pb-4 font-sans text-base text-on-surface-variant leading-relaxed"><InlineText text={transform(faq.answer)} /></p>
        </details>
      ))}
    </section>
  );
}

// The navy "visit us" box: address, hours, phone, Book and WhatsApp. Used by
// the `cta` content block and at the end of treatment and doctor pages.
// `onBook` overrides the default (scroll to the booking form), e.g. to
// preselect a treatment.
export function VisitCta({ title, text, linkLocation, bookLabel = 'Book an appointment', onBook }: { title: string; text: React.ReactNode; linkLocation: string; bookLabel?: string; onBook?: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="bg-primary rounded-2xl p-6 sm:p-8 text-white">
      <h2 className="font-serif text-2xl font-bold leading-snug">{title}</h2>
      <p className="font-sans text-base text-white/80 mt-2 leading-relaxed">{text}</p>
      <div className="mt-5 space-y-2 font-sans text-sm text-white/85 leading-relaxed">
        <p className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-white">{CLINIC.name}</strong>, {CLINIC.streetAddress}, {CLINIC.locality} {CLINIC.postalCode} ({CLINIC.landmark}). {CLINIC.hoursText}.</span></p>
        <p className="flex gap-2"><Phone className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" /><a href={CLINIC.phoneHref} onClick={() => trackConversion('call_click', 'call', { link_location: linkLocation })} className="font-bold text-white">{CLINIC.phone}</a></p>
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        <a href="/#booking-section" onClick={inAppClick(onBook ?? (() => navigate('/#booking-section')))} className="bg-white text-primary font-sans font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-mint transition-colors cursor-pointer">{bookLabel}</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: linkLocation })} className="border border-white/40 text-white font-sans font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">Chat on WhatsApp</a>
      </div>
    </div>
  );
}

interface ContentBlocksProps {
  blocks: BlogBlock[];
  faqs?: BlogFAQ[];
  // Applied to every piece of text before rendering (treatment guides fill
  // in {{price}} etc. this way).
  transform?: (text: string) => string;
  // Where the `cta` block's clicks are attributed in analytics.
  linkLocation: string;
  onBook?: () => void;
}

// The blocks in order, with the FAQ where a `faq` block puts it (or at the
// end), and an "In this article" list where a `contents` block is.
export default function ContentBlocks({ blocks, faqs, transform = (t) => t, linkLocation, onBook }: ContentBlocksProps) {
  const hasFaqBlock = blocks.some((b) => typeof b === 'object' && b.type === 'faq');
  const tocEntries: { id: string; text: string }[] = [];
  for (const b of blocks) {
    if (typeof b !== 'object') continue;
    if (b.type === 'heading') tocEntries.push({ id: headingId(b), text: transform(b.text) });
    if (b.type === 'faq' && faqs?.length) tocEntries.push({ id: 'faq', text: FAQ_HEADING });
  }
  if (faqs?.length && !hasFaqBlock) tocEntries.push({ id: 'faq', text: FAQ_HEADING });

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const text = (value: string) => <InlineText text={transform(value)} />;
  const faqSection = faqs?.length ? <React.Fragment key="faq"><FaqList faqs={faqs} transform={transform} /></React.Fragment> : null;

  const renderBlock = (block: BlogBlock, i: number) => {
    if (typeof block === 'string') {
      return <p key={i} className="font-sans text-base text-on-surface-variant leading-relaxed">{text(block)}</p>;
    }
    switch (block.type) {
      case 'heading':
        return <h2 key={i} id={headingId(block)} className="font-serif text-xl sm:text-2xl text-primary font-bold leading-snug pt-4 scroll-mt-28">{transform(block.text)}</h2>;
      case 'subheading':
        return <h3 key={i} className="font-sans text-lg text-primary font-bold leading-snug">{transform(block.text)}</h3>;
      case 'list': {
        const ListTag = block.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={i} className={`${block.ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-2 font-sans text-base text-on-surface-variant leading-relaxed marker:text-secondary`}>
            {block.items.map((item, j) => <li key={j}>{text(item)}</li>)}
          </ListTag>
        );
      }
      case 'steps':
        return (
          <ol key={i} className="space-y-4">
            {block.items.map((step, j) => (
              <li key={j} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white font-sans font-bold text-sm flex items-center justify-center mt-0.5" aria-hidden="true">{j + 1}</span>
                <div className="font-sans text-base text-on-surface-variant leading-relaxed">
                  <h3 className="font-bold text-primary">{transform(step.title)}</h3>
                  <p>{text(step.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        );
      case 'answer':
        return (
          <div key={i} className="bg-secondary/5 border border-secondary/10 rounded-2xl p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">Quick answer</p>
            <p className="font-sans text-base text-on-surface leading-relaxed">{text(block.text)}</p>
          </div>
        );
      case 'note':
        return <p key={i} className="bg-amber-50 text-amber-900 rounded-xl px-5 py-4 font-sans text-[15px] leading-relaxed">{text(block.text)}</p>;
      case 'quote':
        return <blockquote key={i} className="border-l-4 border-secondary pl-5 font-serif italic text-xl text-primary leading-snug">{text(block.text)}</blockquote>;
      case 'table':
        return (
          <div key={i} className="overflow-x-auto border border-cool-gray/15 rounded-2xl">
            <table className="w-full text-left font-sans text-[15px]">
              <caption className="text-left px-5 pt-4 pb-1 font-bold text-primary text-sm">{transform(block.caption)}</caption>
              <tbody>
                {block.rows.map(([label, value], j) => (
                  <tr key={j} className={j > 0 ? 'border-t border-cool-gray/10' : ''}>
                    <th scope="row" className="px-5 py-3 font-semibold text-primary align-top w-2/5">{transform(label)}</th>
                    <td className="px-5 py-3 text-on-surface-variant align-top">{text(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'contents':
        return tocEntries.length ? (
          <nav key={i} aria-label="In this article" className="border-l-2 border-mint pl-5 py-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">In this article</p>
            <ol className="list-decimal pl-5 space-y-1 font-sans text-sm marker:text-cool-gray">
              {tocEntries.map((entry) => (
                <li key={entry.id}><a href={`#${entry.id}`} onClick={scrollTo(entry.id)} className="text-secondary hover:text-primary transition-colors">{entry.text}</a></li>
              ))}
            </ol>
          </nav>
        ) : null;
      case 'cta':
        return <React.Fragment key={i}><VisitCta title={transform(block.title)} text={text(block.text)} linkLocation={linkLocation} onBook={onBook} /></React.Fragment>;
      case 'faq':
        return faqSection;
      default:
        return null;
    }
  };

  return (
    <>
      {blocks.map((block, i) => renderBlock(block, i))}
      {!hasFaqBlock && faqSection}
    </>
  );
}
