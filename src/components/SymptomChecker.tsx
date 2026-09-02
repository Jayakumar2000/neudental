import React, { useState } from 'react';
import { SYMPTOMS, TREATMENTS } from '../data';
import { Symptom } from '../types';
import { AlertCircle, ArrowRight, HelpCircle, Activity, HeartCrack } from 'lucide-react';

interface SymptomCheckerProps {
onSelectTreatment: (treatmentId: string) => void;
}

export default function SymptomChecker({ onSelectTreatment }: SymptomCheckerProps) {
const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(SYMPTOMS[0]);

const getRecommendedTreatment = (symptom: Symptom) =>
TREATMENTS.find((t) => t.id === symptom.recommendedTreatment);

return (
<section id="symptom-finder" className="py-24 bg-white px-6 md:px-10 lg:px-16">
<div className="max-w-[1280px] mx-auto w-full">
<div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
<div className="max-w-xl">
<span className="text-secondary font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2"><Activity className="w-4 h-4 text-secondary" /> Interactive Symptom Guide</span>
<h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-3 leading-tight">Symptom Checker &amp; Action Plan</h2>
<p className="font-sans text-sm text-on-surface-variant mt-4 leading-relaxed">Dental discomfort or teeth spacing can trigger several worries. Match your symptoms with diagnostic recommendations below.</p>
</div>
<div className="bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500 rounded-xl p-4 max-w-sm text-xs font-medium leading-relaxed font-sans">Disclaimer: This digital analyzer does not replace formal visual clinical diagnosis by Dr. Swetha. Book a slot below for complete evaluation.</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
<div className="lg:col-span-5 space-y-3">
<p className="text-xs font-bold uppercase tracking-wider text-cool-gray mb-4">What worries you today?</p>
{SYMPTOMS.map((symp) => (
<button key={symp.id} onClick={() => setSelectedSymptom(symp)} className={`w-full p-5 text-left rounded-xl border font-sans text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${selectedSymptom?.id === symp.id ? 'bg-primary text-white border-primary shadow-lg shadow-primary/15' : 'bg-surface hover:bg-surface-container border-cool-gray/10 hover:border-cool-gray/30 text-on-surface'}`}>
<span>{symp.expression}</span>
<HelpCircle className={`w-4 h-4 shrink-0 ml-4 ${selectedSymptom?.id === symp.id ? 'text-mint' : 'text-cool-gray'}`} />
</button>
))}
</div>
<div className="lg:col-span-7">
{selectedSymptom ? (
<div className="bg-[#F8FAFC] border border-cool-gray/10 rounded-3xl p-8 premium-shadow">
<div className="flex items-center justify-between gap-4 border-b border-cool-gray/10 pb-6 mb-6">
<div><span className="text-[10px] text-cool-gray font-bold uppercase tracking-widest font-sans">Diagnostic Opinion</span><h4 className="font-serif font-bold text-xl text-primary mt-1">{selectedSymptom.expression}</h4></div>
<span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${selectedSymptom.urgency === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200' : selectedSymptom.urgency === 'moderate' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}`}>
{selectedSymptom.urgency === 'urgent' ? 'Immediate Appointment advised' : selectedSymptom.urgency === 'moderate' ? 'Prompt Evaluation Advised' : 'Routine Hygiene Appointment'}
</span>
</div>
<div className="space-y-6 font-sans">
<div><h5 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Patient Concern Description:</h5><p className="text-sm text-on-surface-variant leading-relaxed">{selectedSymptom.description}</p></div>
<div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10"><h5 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-amber-600" /> Probable Clinical Root Cause:</h5><p className="text-xs text-amber-900 leading-relaxed">{selectedSymptom.possibleCause}</p></div>
<div className="pt-4 border-t border-cool-gray/10">
<h5 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Recommended Clinical Treatment:</h5>
<p className="text-sm text-secondary font-bold font-serif mb-4">{getRecommendedTreatment(selectedSymptom)?.name ?? selectedSymptom.recommendedTreatment}</p>
<button onClick={() => onSelectTreatment(getRecommendedTreatment(selectedSymptom)?.id ?? 'rct')} className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-lg transition-all">Configure Recommended Therapy <ArrowRight className="w-3.5 h-3.5" /></button>
</div>
</div>
</div>
) : (
<div className="bg-[#F8FAFC] rounded-3xl p-12 text-center text-cool-gray border border-dashed border-cool-gray/20 font-sans"><p>Click a symptom on the left to see our recommended clinical path.</p></div>
)}
</div>
</div>
</div>
</section>
);
}
