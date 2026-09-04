import React, { useState, useEffect } from 'react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';
import { ShieldAlert, Sparkles, Scissors, Smile, Check, Clock, ArrowRight, Search, Activity, Scan, Shield, Heart, Crown, GitBranch, Star, Anchor } from 'lucide-react';

interface ServicesProps {
onSelectTreatment: (treatmentId: string) => void;
selectedTreatmentId: string;
onViewDetailSubpage?: (treatmentId: string) => void;
}

export default function Services({ onSelectTreatment, selectedTreatmentId, onViewDetailSubpage }: ServicesProps) {
const [activeCategory, setActiveCategory] = useState<'all' | 'preventive' | 'restorative' | 'specialized' | 'cosmetic'>('all');
const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(TREATMENTS.find(t => t.id === selectedTreatmentId) || TREATMENTS[0]);

useEffect(() => {
const found = TREATMENTS.find(t => t.id === selectedTreatmentId);
if (found) { setSelectedTreatment(found); setActiveCategory('all'); }
}, [selectedTreatmentId]);

const getIcon = (name: string) => {
switch (name) {
case 'Search': return <Search className="w-5 h-5" />;
case 'Sparkles': return <Sparkles className="w-5 h-5" />;
case 'Scan': return <Scan className="w-5 h-5" />;
case 'Shield': return <Shield className="w-5 h-5" />;
case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
case 'Scissors': return <Scissors className="w-5 h-5" />;
case 'Activity': return <Activity className="w-5 h-5" />;
case 'Heart': return <Heart className="w-5 h-5" />;
case 'Crown': return <Crown className="w-5 h-5" />;
case 'GitBranch': return <GitBranch className="w-5 h-5" />;
case 'Star': return <Star className="w-5 h-5" />;
case 'Anchor': return <Anchor className="w-5 h-5" />;
case 'Smile': return <Smile className="w-5 h-5" />;
default: return <Smile className="w-5 h-5" />;
}
};

const filteredTreatments = activeCategory === 'all' ? TREATMENTS : TREATMENTS.filter(t => t.category === activeCategory);

return (
<section id="services" className="py-24 bg-surface-alt px-6 md:px-10 lg:px-16">
<div className="max-w-[1280px] mx-auto w-full">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Comprehensive Clinical Care</span>
<h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">Treatments Offered at neudental</h2>
<div className="w-12 h-1 bg-secondary mx-auto mt-6" />
<p className="font-sans text-base text-on-surface-variant mt-4 leading-relaxed">From routine checkups and cleaning to advanced orthodontics and permanent implants, explore our full spectrum of specialized dental treatments.</p>
</div>
<div className="flex flex-wrap items-center justify-center gap-2 mb-12">
{['all', 'preventive', 'restorative', 'specialized', 'cosmetic'].map((cat) => (
<button key={cat} onClick={() => setActiveCategory(cat as any)} className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'bg-white border border-cool-gray/20 text-on-surface hover:border-primary'}`}>
{cat === 'all' ? 'All Treatments' : cat}
</button>
))}
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
{filteredTreatments.map((treatment) => (
<div key={treatment.id} onClick={() => setSelectedTreatment(treatment)} className={`p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${selectedTreatment?.id === treatment.id ? 'bg-white border-secondary premium-shadow ring-2 ring-secondary/10' : 'bg-white/80 hover:bg-white border-cool-gray/10 hover:border-cool-gray/30'}`}>
<div className="flex items-center justify-between mb-4">
<div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedTreatment?.id === treatment.id ? 'bg-secondary text-white' : 'bg-secondary/5 text-secondary'}`}>{getIcon(treatment.iconName)}</div>
<span className="text-[10px] uppercase tracking-wider font-sans font-bold text-secondary bg-secondary/5 px-2.5 py-1 rounded-full">{treatment.category}</span>
</div>
<h4 className="font-serif font-bold text-base md:text-lg text-primary mb-2">{treatment.name}</h4>
<p className="font-sans text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">{treatment.description}</p>
<div className="flex items-center gap-1.5 text-xs text-secondary font-bold font-sans"><span>View Details &amp; Highlights</span><ArrowRight className="w-3.5 h-3.5" /></div>
</div>
))}
</div>
{selectedTreatment && (
<div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl p-8 premium-shadow sticky top-36">
{selectedTreatment.highlightUrl && (
<div className="aspect-[1.8] rounded-xl overflow-hidden mb-6 select-none bg-white/10 border border-white/10">
<img alt={selectedTreatment.name} className="w-full h-full object-cover" src={selectedTreatment.highlightUrl} />
</div>
)}
<div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4 mb-4">
<div><span className="text-mint font-sans text-[11px] uppercase tracking-widest font-bold">{selectedTreatment.category} Treatment Info</span><h3 className="font-serif font-bold text-xl sm:text-2xl text-white mt-1">{selectedTreatment.name}</h3></div>
</div>
<p className="font-sans text-sm text-white/80 leading-relaxed mb-6">{selectedTreatment.description}</p>
<div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/10 border border-white/10 mb-6 text-xs">
<div className="flex items-center gap-2"><Clock className="w-4 h-4 text-white/60" /><div><p className="text-white/60 font-medium">Duration</p><p className="font-bold text-white">{selectedTreatment.duration}</p></div></div>
<div className="flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-white/60" /><div><p className="text-white/60 font-medium">Safety Standard</p><p className="font-bold text-white">Class-B Sterilized</p></div></div>
</div>
<div className="space-y-3 mb-8">
<p className="text-xs font-bold uppercase tracking-wider text-white">Key Treatment Protocols:</p>
{selectedTreatment.features.map((feat) => (
<div key={feat} className="flex items-start gap-2.5 text-xs text-white/80"><div className="w-4 h-4 rounded-full bg-mint/90 text-primary flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" /></div><span className="leading-normal">{feat}</span></div>
))}
</div>
<div className="space-y-3">
<button onClick={() => onSelectTreatment(selectedTreatment.id)} className="w-full bg-white text-primary hover:bg-mint cursor-pointer py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200">Book Appointment</button>
{onViewDetailSubpage && (<button onClick={() => onViewDetailSubpage(selectedTreatment.id)} className="w-full bg-white/10 border border-white/20 hover:bg-white/15 text-white cursor-pointer py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-1.5"><span>View Comprehensive Patient Guide</span><ArrowRight className="w-3.5 h-3.5" /></button>)}
</div>
</div>
)}
</div>
</div>
</section>
);
}
