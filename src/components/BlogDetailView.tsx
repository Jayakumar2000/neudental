// neudental v1 - BlogDetailView Component
import React from 'react';
import { BLOGS, CLINIC, WHATSAPP_URL } from '../data';
import { Calendar, Clock, ArrowLeft, ShieldCheck, ChevronDown, MapPin, Phone } from 'lucide-react';
import { trackConversion } from '../lib/analytics';
import type { BlogBlock, BlogPost } from '../types';
import { classifyRoute, inAppClick } from '../lib/routes';
import { postPublishedDate } from '../lib/schema';

// "2026-10-25" -> "25 October 2026". Written out by hand rather than with
// Intl so the build server and every browser produce identical text.
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function formatIsoDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return d ? `${d} ${MONTH_NAMES[m - 1]} ${y}` : iso;
}

interface BlogDetailViewProps {
  blogId: string;
  onBack: () => void;
  onSelectBlog?: (blogId: string) => void;
  onBookAppointment?: () => void;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function headingId(block: { text: string; id?: string }) {
  return block.id ?? slugify(block.text);
}

// Renders the small inline syntax post text may use: **bold** and
// [link text](/path). Plain links to other posts stay inside the app instead
// of reloading the page; anything else (a #section, ?query, another page or
// site) is left to the browser.
function InlineText({ text, onSelectBlog }: { text: string; onSelectBlog?: (blogId: string) => void }) {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={match.index} className="font-semibold text-primary">{match[1]}</strong>);
    } else {
      const href = match[3];
      const route = /^\/[^?#]*$/.test(href) ? classifyRoute(href) : null;
      const blogId = route?.type === 'blogPost' ? route.blogId : null;
      parts.push(
        <a
          key={match.index}
          href={href}
          onClick={blogId && onSelectBlog ? inAppClick(() => onSelectBlog(blogId)) : undefined}
          className="text-secondary underline underline-offset-2 hover:text-primary transition-colors"
        >
          {match[2]}
        </a>
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function BlogDetailView({ blogId, onBack, onSelectBlog, onBookAppointment }: BlogDetailViewProps) {
  const post = BLOGS.find((b) => b.id === blogId);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <p className="font-sans text-on-surface-variant mb-4">Article not found</p>
          <button onClick={onBack} className="inline-flex items-center gap-2 text-secondary hover:text-primary font-sans font-bold text-sm transition-colors cursor-pointer">
            <ArrowLeft size={18} />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const faqHeading = 'Frequently asked questions';
  const hasFaqBlock = post.content.some((b) => typeof b === 'object' && b.type === 'faq');
  const tocEntries: { id: string; text: string }[] = [];
  for (const b of post.content) {
    if (typeof b !== 'object') continue;
    if (b.type === 'heading') tocEntries.push({ id: headingId(b), text: b.text });
    if (b.type === 'faq' && post.faqs?.length) tocEntries.push({ id: 'faq', text: faqHeading });
  }
  if (post.faqs?.length && !hasFaqBlock) tocEntries.push({ id: 'faq', text: faqHeading });

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const text = (value: string) => <InlineText text={value} onSelectBlog={onSelectBlog} />;

  const faqSection = post.faqs?.length ? (
    <section key="faq" aria-labelledby="faq" className="space-y-3">
      <h2 id="faq" className="font-serif text-xl sm:text-2xl text-primary font-bold leading-snug pt-4 pb-1 scroll-mt-28">{faqHeading}</h2>
      {post.faqs.map((faq, j) => (
        <details key={j} open={j === 0} className="group border border-cool-gray/15 rounded-xl px-5">
          <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-sans font-semibold text-primary [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown className="w-4 h-4 shrink-0 text-secondary transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="pb-4 font-sans text-base text-on-surface-variant leading-relaxed">{text(faq.answer)}</p>
        </details>
      ))}
    </section>
  ) : null;

  const renderBlock = (block: BlogBlock, i: number) => {
    if (typeof block === 'string') {
      return <p key={i} className="font-sans text-base text-on-surface-variant leading-relaxed">{text(block)}</p>;
    }
    switch (block.type) {
      case 'heading':
        return <h2 key={i} id={headingId(block)} className="font-serif text-xl sm:text-2xl text-primary font-bold leading-snug pt-4 scroll-mt-28">{block.text}</h2>;
      case 'subheading':
        return <h3 key={i} className="font-sans text-lg text-primary font-bold leading-snug">{block.text}</h3>;
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
                  <h3 className="font-bold text-primary">{step.title}</h3>
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
              <caption className="text-left px-5 pt-4 pb-1 font-bold text-primary text-sm">{block.caption}</caption>
              <tbody>
                {block.rows.map(([label, value], j) => (
                  <tr key={j} className={j > 0 ? 'border-t border-cool-gray/10' : ''}>
                    <th scope="row" className="px-5 py-3 font-semibold text-primary align-top w-2/5">{label}</th>
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
        return (
          <div key={i} className="bg-primary rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="font-serif text-2xl font-bold leading-snug">{block.title}</h2>
            <p className="font-sans text-base text-white/80 mt-2 leading-relaxed">{text(block.text)}</p>
            <div className="mt-5 space-y-2 font-sans text-sm text-white/85 leading-relaxed">
              <p className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-white">{CLINIC.name}</strong>, {CLINIC.streetAddress}, {CLINIC.locality} {CLINIC.postalCode} ({CLINIC.landmark}). {CLINIC.hoursText}.</span></p>
              <p className="flex gap-2"><Phone className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" /><a href={CLINIC.phoneHref} onClick={() => trackConversion('call_click', 'call', { link_location: 'blog_post' })} className="font-bold text-white">{CLINIC.phone}</a></p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="/#booking-section" onClick={onBookAppointment ? inAppClick(onBookAppointment) : undefined} className="bg-white text-primary font-sans font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-mint transition-colors cursor-pointer">Book an appointment</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', 'whatsapp', { link_location: 'blog_post' })} className="border border-white/40 text-white font-sans font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">Chat on WhatsApp</a>
            </div>
          </div>
        );
      case 'faq':
        return faqSection;
      default:
        return null;
    }
  };


  const related = (post.related ?? [])
    .map((id) => BLOGS.find((b) => b.id === id))
    .filter((b): b is BlogPost => Boolean(b));

  return (
    <article className="py-16 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-3xl mx-auto w-full">
        <a href="/blogs" onClick={inAppClick(onBack)} className="flex w-fit items-center gap-2 text-on-surface-variant hover:text-secondary font-sans text-sm font-medium mb-6 transition-colors cursor-pointer">
          <ArrowLeft size={20} />
          Back to Blog
        </a>
        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/5 px-2.5 py-1 rounded-full">{post.category}</span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-4 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cool-gray font-sans font-medium mt-4 pb-6 border-b border-cool-gray/10">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> <time dateTime={postPublishedDate(post)}>{post.date}</time></span>
          {post.dateModified && (
            <span className="flex items-center gap-1.5">Updated <time dateTime={post.dateModified}>{formatIsoDate(post.dateModified)}</time></span>
          )}
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          {post.reviewedBy && (
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Reviewed by <strong className="text-primary font-semibold">{post.reviewedBy}</strong></span>
          )}
        </div>
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mt-8">
          <img src={post.image} alt={post.imageAlt ?? post.title} className="w-full h-full object-cover" />
        </div>
        <div className="mt-8 space-y-5">
          {post.content.map((block, i) => renderBlock(block, i))}
          {!hasFaqBlock && faqSection}
          {related.length > 0 && (
            <div className="pt-6 mt-4 border-t border-cool-gray/10 font-sans text-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">Related reading</p>
              <ul className="space-y-1">
                {related.map((r) => (
                  <li key={r.id}>
                    <a href={`/blogs/${r.id}`} onClick={onSelectBlog ? inAppClick(() => onSelectBlog(r.id)) : undefined} className="text-secondary hover:text-primary underline underline-offset-2 transition-colors">{r.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
