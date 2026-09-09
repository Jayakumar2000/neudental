import React, { useState, useEffect } from 'react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';
import { ShieldAlert, Sparkles, Scissors, Smile, Check, Clock, ArrowRight, Search, Activity, Scan, Shield, Heart, Crown, GitBranch, Star, Anchor, Sun, Layers, Zap, Baby, IndianRupee, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { IconWisdomToothExtraction, IconCrownsAndBridges, IconCavityFilling, IconDentures, IconTeethWhitening, IconRegularCheckup, IconDentalCleaning, IconDentalImaging, IconBraces, IconRootCanal, IconGumDisease, IconToothDrill, IconDentalSurgery, IconTools, IconDentalCare, IconCrownSmile } from './icons/DentalIcons';

interface ServicesProps {
onSelectTreatment: (treatmentId: string) => void;
selectedTreatmentId: string;
onViewDetailSubpage?: (treatmentId: string) => void;
}

const CATEGORIES = [
{ key: 'all', label: 'All Treatments' },
{ key: 'preventive', label: 'Preventive' },
{ key: 'restorative', label: 'Restorative' },
{ key: 'cosmetic-ortho', label: 'Cosmetic & Ortho' },
{ key: 'specialized', label: 'Specialized' },
{ key: 'pediatric', label: 'Kids Dentistry' },
] as const;

export default function Services({ onSelectTreatment, selectedTreatmentId, onViewDetailSubpage }: ServicesProps) {
const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]['key']>('all');
const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(TREATMENTS.find(t => t.id === selectedTreatmentId) || TREATMENTS[0]);
// Mobile-only card-stack position -- separate from desktop's selectedTreatment
// so switching category always restarts the deck from its first card.
const [stackIndex, setStackIndex] = useState(0);

useEffect(() => {
const found = TREATMENTS.find(t => t.id === selectedTreatmentId);
if (found) { setSelectedTreatment(found); setActiveCategory('all'); }
}, [selectedTreatmentId]);

// Tapping a tile in the icon-grid overview jumps the deck below straight to
// that treatment, switching to "All Treatments" first so the index lines up.
const jumpToTreatment = (treatmentId: string) => {
setActiveCategory('all');
const idx = TREATMENTS.findIndex((t) => t.id === treatmentId);
setStackIndex(idx >= 0 ? idx : 0);
requestAnimationFrame(() => {
document.getElementById('treatments-deck')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
};

const getIcon = (name: string, customSize = 'w-[76px] h-[76px] shrink-0') => {
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
case 'Sun': return <Sun className="w-5 h-5" />;
case 'Layers': return <Layers className="w-5 h-5" />;
case 'Zap': return <Zap className="w-5 h-5" />;
case 'Baby': return <Baby className="w-5 h-5" />;
case 'IconWisdomToothExtraction': return <IconWisdomToothExtraction className={customSize} />;
case 'IconCrownsAndBridges': return <IconCrownsAndBridges className={customSize} />;
case 'IconCavityFilling': return <IconCavityFilling className={customSize} />;
case 'IconDentures': return <IconDentures className={customSize} />;
case 'IconTeethWhitening': return <IconTeethWhitening className={customSize} />;
case 'IconRegularCheckup': return <IconRegularCheckup className={customSize} />;
case 'IconDentalCleaning': return <IconDentalCleaning className={customSize} />;
case 'IconDentalImaging': return <IconDentalImaging className={customSize} />;
case 'IconBraces': return <IconBraces className={customSize} />;
case 'IconRootCanal': return <IconRootCanal className={customSize} />;
case 'IconGumDisease': return <IconGumDisease className={customSize} />;
case 'IconToothDrill': return <IconToothDrill className={customSize} />;
case 'IconDentalSurgery': return <IconDentalSurgery className={customSize} />;
case 'IconTools': return <IconTools className={customSize} />;
case 'IconDentalCare': return <IconDentalCare className={customSize} />;
case 'IconCrownSmile': return <IconCrownSmile className={customSize} />;
default: return <Smile className="w-5 h-5" />;
}
};

// Custom multi-color icons (from the dentistry icon pack) carry their own
// fixed palette instead of inheriting currentColor, so they can't invert to
// white the way the plain lucide icons do when a card is selected -- forcing
// that would leave them sitting oddly on a solid teal square.
const isCustomPackIcon = (name: string) => name.startsWith('Icon');

const getCategoryLabel = (key: string) => CATEGORIES.find((c) => c.key === key)?.label ?? key;

const filteredTreatments = activeCategory === 'all' ? TREATMENTS : TREATMENTS.filter(t => t.category === activeCategory);

return (
<section id="services" className="py-14 lg:py-20 bg-surface-alt px-6 md:px-10 lg:px-16">
<div className="max-w-[1280px] mx-auto w-full">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase">Comprehensive Clinical Care</span>
<h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">Treatments Offered at Neudental</h2>
<div className="w-12 h-1 bg-secondary mx-auto mt-6" />
<p className="font-sans text-base text-on-surface-variant mt-4 leading-relaxed">From routine checkups and cleaning to advanced orthodontics and permanent implants, explore our full spectrum of specialized dental treatments.</p>
</div>
{/* Mobile & tablet (<lg): category select + an animated stack of cards instead
of 16 stacked cards or a treatment dropdown -- tapping a peeking card, or the
Prev/Next controls, cycles through the deck so the count itself ("4 of 16")
does the job of telling patients how much the clinic actually offers. */}
<div className="lg:hidden mb-3">
<div className="relative">
<select
value={activeCategory}
onChange={(e) => { setActiveCategory(e.target.value as (typeof CATEGORIES)[number]['key']); setStackIndex(0); }}
className="w-full appearance-none bg-white border border-cool-gray/20 text-on-surface font-sans text-sm font-bold rounded-xl px-4 py-3.5 pr-10 cursor-pointer"
>
{CATEGORIES.map((cat) => (<option key={cat.key} value={cat.key}>{cat.label}</option>))}
</select>
<ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
</div>
</div>
{/* Mobile icon-grid overview: every treatment at a glance, icon + name,
tapping one jumps the deck below straight to it. */}
<div className="lg:hidden grid grid-cols-3 gap-3 mb-8">
{TREATMENTS.map((treatment) => (
<button
key={treatment.id}
type="button"
onClick={() => jumpToTreatment(treatment.id)}
className="bg-white border border-secondary/15 rounded-2xl p-3 flex flex-col items-center gap-2 text-center active:border-secondary/40 active:bg-secondary/5 transition-colors cursor-pointer"
>
<div className="w-14 h-14 flex items-center justify-center shrink-0">{getIcon(treatment.iconName, 'w-14 h-14 shrink-0')}</div>
<span className="font-sans text-[11px] font-bold text-primary leading-tight">{treatment.name}</span>
</button>
))}
</div>
<div id="treatments-deck" className="lg:hidden mb-2">
<div className="relative h-[460px]" style={{ perspective: '1200px' }}>
{filteredTreatments.map((treatment, i) => {
const depth = i - stackIndex;
if (depth < 0 || depth > 2) return null;
const isFront = depth === 0;
return (
<div
key={treatment.id}
onClick={() => { if (!isFront) setStackIndex(i); }}
style={{
zIndex: 30 - depth * 10,
transform: `translateY(${depth * 18}px) scaleX(${1 - depth * 0.05})`,
transformOrigin: 'top center',
opacity: isFront ? 1 : depth === 1 ? 0.9 : 0.75,
}}
className={`absolute inset-0 rounded-3xl premium-shadow bg-gradient-to-br from-primary via-primary to-secondary transition-all duration-500 ease-out ${isFront ? 'p-6 overflow-y-auto flex flex-col' : 'p-6 cursor-pointer overflow-hidden'}`}
>
<span className="text-mint font-sans text-[11px] uppercase tracking-widest font-bold block mb-1">{getCategoryLabel(treatment.category)} Treatment Info</span>
<h3 className="font-serif font-bold text-xl text-white mb-2">{treatment.name}</h3>
{isFront && (<>
<p className="font-sans text-sm text-white/80 leading-relaxed mb-5">{treatment.description}</p>
<div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/10 border border-white/10 mb-5 text-xs">
<div className="flex items-center gap-2"><Clock className="w-4 h-4 text-white/60" /><div><p className="text-white/60 font-medium">Duration</p><p className="font-bold text-white">{treatment.duration}</p></div></div>
<div className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-white/60" /><div><p className="text-white/60 font-medium">Treatment Cost</p><p className="font-bold text-white">{treatment.startingPrice.toLocaleString('en-IN')}</p></div></div>
</div>
<div className="space-y-3 mb-6">
<p className="text-xs font-bold uppercase tracking-wider text-white">Treatment Highlights:</p>
{treatment.features.map((feat) => (
<div key={feat} className="flex items-start gap-2.5 text-xs text-white/80"><div className="w-4 h-4 rounded-full bg-mint/90 text-primary flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" /></div><span className="leading-normal">{feat}</span></div>
))}
</div>
{/* Pinned to the bottom of the fixed-height card via mt-auto so the CTA
sits in the same place regardless of how many highlights a treatment
has, instead of leaving dead space below it for shorter lists. */}
<div className="space-y-3 mt-auto">
<button onClick={() => onSelectTreatment(treatment.id)} className="w-full bg-white text-primary active:bg-mint cursor-pointer py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200">Book Appointment</button>
{onViewDetailSubpage && (<button onClick={() => onViewDetailSubpage(treatment.id)} className="w-full bg-white/10 border border-white/20 active:bg-white/15 text-white cursor-pointer py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-1.5"><span>View Comprehensive Patient Guide</span><ArrowRight className="w-3.5 h-3.5" /></button>)}
</div>
</>)}
</div>
);
})}
</div>
<div className="flex items-center justify-center gap-6 mt-10">
<button
type="button"
aria-label="Previous treatment"
disabled={stackIndex === 0}
onClick={() => setStackIndex((i) => Math.max(i - 1, 0))}
className="w-11 h-11 rounded-full bg-white border border-cool-gray/15 premium-shadow flex items-center justify-center text-primary active:bg-surface-alt disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-opacity"
>
<ChevronLeft className="w-5 h-5" />
</button>
<span className="font-sans text-xs font-bold text-on-surface-variant tabular-nums w-16 text-center">{stackIndex + 1} of {filteredTreatments.length}</span>
<button
type="button"
aria-label="Next treatment"
disabled={stackIndex >= filteredTreatments.length - 1}
onClick={() => setStackIndex((i) => Math.min(i + 1, filteredTreatments.length - 1))}
className="w-11 h-11 rounded-full bg-white border border-cool-gray/15 premium-shadow flex items-center justify-center text-primary active:bg-surface-alt disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-opacity"
>
<ChevronRight className="w-5 h-5" />
</button>
</div>
</div>
{/* Desktop (lg+): category pills + full card grid + sticky summary panel */}
<div className="hidden lg:flex flex-wrap items-center justify-center gap-2 mb-12">
{CATEGORIES.map((cat) => (
<button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer ${activeCategory === cat.key ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'bg-white border border-cool-gray/20 text-on-surface hover:border-primary'}`}>
{cat.label}
</button>
))}
</div>
<div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
{filteredTreatments.map((treatment) => (
<div key={treatment.id} onClick={() => setSelectedTreatment(treatment)} className={`p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${selectedTreatment?.id === treatment.id ? 'bg-white border-secondary premium-shadow ring-2 ring-secondary/10' : 'bg-white/80 hover:bg-white border-cool-gray/10 hover:border-cool-gray/30'}`}>
<div className="flex items-center justify-between mb-4">
<div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${selectedTreatment?.id === treatment.id && !isCustomPackIcon(treatment.iconName) ? 'bg-secondary text-white' : 'bg-secondary/5 text-secondary'}`}>{getIcon(treatment.iconName)}</div>
<span className="text-[10px] uppercase tracking-wider font-sans font-bold text-secondary bg-secondary/5 px-2.5 py-1 rounded-full">{getCategoryLabel(treatment.category)}</span>
</div>
<h4 className="font-serif font-bold text-base md:text-lg text-primary mb-2">{treatment.name}</h4>
<p className="font-sans text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">{treatment.description}</p>
<div className="flex items-center gap-1.5 text-xs text-secondary font-bold font-sans"><span>View Details &amp; Highlights</span><ArrowRight className="w-3.5 h-3.5" /></div>
</div>
))}
</div>
{selectedTreatment && (
<div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl p-8 premium-shadow sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
{selectedTreatment.highlightUrl && (
<div className="aspect-[1.8] rounded-xl overflow-hidden mb-6 select-none bg-white/10 border border-white/10">
<img alt={selectedTreatment.name} className="w-full h-full object-cover" src={selectedTreatment.highlightUrl} />
</div>
)}
<div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4 mb-4">
<div><span className="text-mint font-sans text-[11px] uppercase tracking-widest font-bold">{getCategoryLabel(selectedTreatment.category)} Treatment Info</span><h3 className="font-serif font-bold text-xl sm:text-2xl text-white mt-1">{selectedTreatment.name}</h3></div>
</div>
<p className="font-sans text-sm text-white/80 leading-relaxed mb-6">{selectedTreatment.description}</p>
<div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/10 border border-white/10 mb-6 text-xs">
<div className="flex items-center gap-2"><Clock className="w-4 h-4 text-white/60" /><div><p className="text-white/60 font-medium">Duration</p><p className="font-bold text-white">{selectedTreatment.duration}</p></div></div>
<div className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-white/60" /><div><p className="text-white/60 font-medium">Treatment Cost</p><p className="font-bold text-white">{selectedTreatment.startingPrice.toLocaleString('en-IN')}</p></div></div>
</div>
<p className="text-[10px] text-white/50 font-sans -mt-4 mb-6">*Indicative starting price, not the final charge — actual cost is confirmed after clinical consultation.</p>
<div className="space-y-3 mb-8">
<p className="text-xs font-bold uppercase tracking-wider text-white">Treatment Highlights:</p>
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
