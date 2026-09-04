// neudental v1 - BlogDetailView Component
import React from 'react';
import { BLOGS } from '../data';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

interface BlogDetailViewProps {
  blogId: string;
  onBack: () => void;
}

export default function BlogDetailView({ blogId, onBack }: BlogDetailViewProps) {
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

  return (
    <article className="py-16 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-3xl mx-auto w-full">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary font-sans text-sm font-medium mb-8 transition-colors cursor-pointer">
          <ArrowLeft size={20} />
          Back to Blog
        </button>
        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/5 px-2.5 py-1 rounded-full">{post.category}</span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-5 text-xs text-cool-gray font-sans font-medium mt-4 pb-6 border-b border-cool-gray/10">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
        </div>
        <div className="mt-8 space-y-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="font-sans text-base text-on-surface-variant leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
