// neudental v1 - BlogsListView Component
import React from 'react';
import { BLOGS } from '../data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogsListViewProps {
  onSelectBlog: (blogId: string) => void;
}

export default function BlogsListView({ onSelectBlog }: BlogsListViewProps) {
  return (
    <section className="min-h-[60vh] py-16 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Dental Health &amp; Patient Resources</span>
          <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">From Our Blog</h1>
          <div className="w-12 h-1 bg-secondary mx-auto mt-6" />
          <p className="font-sans text-base text-on-surface-variant mt-4 leading-relaxed">Practical, patient-friendly guidance from the neudental team &mdash; with more articles on the way.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOGS.map((post) => (
            <button
              key={post.id}
              onClick={() => onSelectBlog(post.id)}
              className="text-left bg-surface-container-low border border-cool-gray/5 rounded-2xl p-6 hover:border-secondary/20 hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/5 px-2.5 py-1 rounded-full self-start mb-4">{post.category}</span>
              <h3 className="font-serif font-bold text-lg text-primary mb-2 leading-snug">{post.title}</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-[11px] text-cool-gray font-sans font-medium pt-4 border-t border-cool-gray/10">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-secondary mt-4"><span>Read Article</span><ArrowRight className="w-3.5 h-3.5" /></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
