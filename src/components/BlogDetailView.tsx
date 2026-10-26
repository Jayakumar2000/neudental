// neudental v1 - BlogDetailView Component
import React from 'react';
import { BLOGS, DOCTOR } from '../data';
import { Calendar, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';
import type { BlogPost, Treatment } from '../types';
import { Link } from '../lib/navigation';
import { DOCTOR_PATH } from '../lib/routes';
import { postPublishedDate } from '../lib/schema';
import { treatmentById, treatmentPath } from '../lib/treatments';
import ContentBlocks, { formatIsoDate } from './ContentBlocks';
import Breadcrumbs from './Breadcrumbs';

interface BlogDetailViewProps {
  blogId: string;
  onBookAppointment?: () => void;
}

export default function BlogDetailView({ blogId, onBookAppointment }: BlogDetailViewProps) {
  const post = BLOGS.find((b) => b.id === blogId);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <p className="font-sans text-on-surface-variant mb-4">Article not found</p>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-secondary hover:text-primary font-sans font-bold text-sm transition-colors cursor-pointer">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const related = (post.related ?? [])
    .map((id) => BLOGS.find((b) => b.id === id))
    .filter((b): b is BlogPost => Boolean(b));
  const relatedTreatments = (post.relatedTreatments ?? [])
    .map(treatmentById)
    .filter((t): t is Treatment => Boolean(t));

  return (
    <article className="py-16 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-3xl mx-auto w-full">
        <Breadcrumbs items={[['Home', '/'], ['Blog', '/blogs'], [post.title, `/blogs/${post.id}`]]} className="mb-6" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/5 px-2.5 py-1 rounded-full">{post.category}</span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-4 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cool-gray font-sans font-medium mt-4 pb-6 border-b border-cool-gray/10">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> <time dateTime={postPublishedDate(post)}>{post.date}</time></span>
          {post.dateModified && (
            <span className="flex items-center gap-1.5">Updated <time dateTime={post.dateModified}>{formatIsoDate(post.dateModified)}</time></span>
          )}
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          {post.reviewedBy && (
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Reviewed by {post.reviewedBy.startsWith(DOCTOR.name) ? <Link to={DOCTOR_PATH} className="text-primary font-semibold hover:text-secondary">{post.reviewedBy}</Link> : <strong className="text-primary font-semibold">{post.reviewedBy}</strong>}</span>
          )}
        </div>
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mt-8">
          <img src={post.image} alt={post.imageAlt ?? post.title} className="w-full h-full object-cover" />
        </div>
        <div className="mt-8 space-y-5">
          <ContentBlocks blocks={post.content} faqs={post.faqs} linkLocation="blog_post" onBook={onBookAppointment} />
          {(related.length > 0 || relatedTreatments.length > 0) && (
            <div className="pt-6 mt-4 border-t border-cool-gray/10 font-sans text-sm grid gap-6 sm:grid-cols-2">
              {relatedTreatments.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">Treatment guides</p>
                  <ul className="space-y-1">
                    {relatedTreatments.map((t) => (
                      <li key={t.id}><Link to={treatmentPath(t)} className="text-secondary hover:text-primary underline underline-offset-2 transition-colors">{t.name}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
              {related.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">Related reading</p>
                  <ul className="space-y-1">
                    {related.map((r) => (
                      <li key={r.id}><Link to={`/blogs/${r.id}`} className="text-secondary hover:text-primary underline underline-offset-2 transition-colors">{r.title}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
