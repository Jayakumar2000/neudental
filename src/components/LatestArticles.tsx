// neudental v1 - "From the blog" on the homepage: the newest posts, so the
// site's strongest page links straight to its latest articles (for readers,
// and for crawlers deciding what to fetch next).
import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BLOGS } from '../data';
import { Link } from '../lib/navigation';
import { postPublishedDate } from '../lib/schema';

const LATEST_COUNT = 3;

export default function LatestArticles() {
  const latest = [...BLOGS]
    .sort((a, b) => (postPublishedDate(b) ?? '').localeCompare(postPublishedDate(a) ?? ''))
    .slice(0, LATEST_COUNT);
  if (!latest.length) return null;
  return (
    <section aria-labelledby="latest-articles" className="py-14 lg:py-20 bg-white px-6 md:px-10 lg:px-16">
      <div className="max-w-[1120px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">From the blog</span>
            <h2 id="latest-articles" className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">Dental health, explained</h2>
          </div>
          <Link to="/blogs" className="inline-flex items-center gap-1.5 font-sans text-sm font-bold text-primary hover:text-secondary transition-colors shrink-0">All articles <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post) => (
            <li key={post.id}>
              <Link to={`/blogs/${post.id}`} className="group h-full flex flex-col bg-surface-container-low border border-cool-gray/5 rounded-2xl overflow-hidden hover:border-secondary/20 transition-colors">
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img src={post.image} alt={post.imageAlt ?? post.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/5 px-2.5 py-1 rounded-full self-start mb-3">{post.category}</span>
                  <h3 className="font-serif font-bold text-lg text-primary leading-snug group-hover:text-secondary transition-colors">{post.title}</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed line-clamp-3 mt-2 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-[11px] text-cool-gray font-sans font-medium pt-4 mt-4 border-t border-cool-gray/10">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" aria-hidden="true" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
