/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
 Compass, 
 Users, 
 Briefcase, 
 Heart, 
 Star, 
 MapPin, 
 Clock, 
 ArrowRight, 
 Phone, 
 Check, 
 X, 
 Info, 
 Award, 
 Calendar,
 Layers,
 Zap,
 Tag,
 ThumbsUp
} from 'lucide-react';
import { PaketTrip, Destinasi, Layanan, HargaPaket, ItineraryPaket, FasilitasPaket } from '../types';
import { getMediaAlt, responsiveImageProps } from '../data/media';

// Dynamic Icon Renderer
export const ServiceIcon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
 switch (name) {
 case 'Users': return <Users className={className} />;
 case 'Compass': return <Compass className={className} />;
 case 'Briefcase': return <Briefcase className={className} />;
 case 'Heart': return <Heart className={className} />;
 default: return <Compass className={className} />;
 }
};

interface TripCardProps {
 packageItem: PaketTrip;
 destinationsList: Destinasi[];
 onSelect: (slug: string) => void;
 onTanyaAdmin: (packageItem: PaketTrip, e: React.MouseEvent) => void;
 animateIndex?: number;
}

// 4. Trip Package Card
export const TripCard: React.FC<TripCardProps> = ({ packageItem, destinationsList, onSelect, onTanyaAdmin, animateIndex }) => {
 const matchedDests = destinationsList.filter(d => packageItem.destinasi_ids.includes(d.id));
 const prefersReducedMotion = useReducedMotion();

 const motionProps =
 animateIndex !== undefined && !prefersReducedMotion
 ? {
 initial: { opacity: 0, y: 16 },
 animate: { opacity: 1, y: 0 },
 transition: { duration: 0.35, delay: animateIndex * 0.05, ease: 'easeOut' as const },
 }
 : {};

 const cardClasses = "group bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-slate-200 transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden";

 const cardContent = (
 <>
 <div className="relative aspect-[4/3] w-full overflow-hidden">
 <img
 {...responsiveImageProps(packageItem.imageUrl)}
 alt={getMediaAlt(packageItem.imageUrl, `${packageItem.name} — paket ${packageItem.type}, ${packageItem.duration_label}`)}
 loading="lazy"
 decoding="async"
 className="absolute inset-0 h-full w-full object-cover img-cover-hover"
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
 <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm">
 {packageItem.type}
 </span>
 </div>

 <div className="flex flex-1 flex-col p-6 md:p-7">
 <div className="flex-1">
 <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
 <Clock className="h-4 w-4 text-amber-600" aria-hidden="true" />
 {packageItem.duration_label}
 </p>
 <h3 className="font-display text-2xl font-bold leading-tight text-slate-900 group-hover:text-brand-primary transition-colors">
 {packageItem.name}
 </h3>
 <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
 {matchedDests.length > 0 ? matchedDests.map(d => d.name).join(' + ') : packageItem.summary}
 </p>
 </div>

 <div className="mt-7 flex items-end justify-between gap-5 border-t border-slate-100 pt-6">
 <div>
 <p className="text-sm font-semibold text-slate-500">Mulai dari</p>
 <p className="font-display text-2xl font-bold text-slate-900">{packageItem.price_label}</p>
 </div>
 {/* Visual CTA only — the whole card is the link (no nested interactive). */}
 <span
 aria-hidden="true"
 className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-colors duration-[250ms] bg-brand-primary text-white shadow-sm text-xs py-2.5 px-5 tracking-wide min-h-[44px]"
 >
 Lihat
 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
 </span>
 </div>
 </div>
 </>
 );

 const handleCardClick = (e: React.MouseEvent) => {
 if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
 e.preventDefault();
 onSelect(packageItem.slug);
 };

 if (animateIndex !== undefined) {
 return (
 <motion.a
 id={`trip-card-${packageItem.id}`}
 href={`/produk/${packageItem.slug}`}
 onClick={handleCardClick}
 className={cardClasses}
 {...motionProps}
 >
 {cardContent}
 </motion.a>
 );
 }

 return (
 <a
 id={`trip-card-${packageItem.id}`}
 href={`/produk/${packageItem.slug}`}
 onClick={handleCardClick}
 className={cardClasses}
 >
 {cardContent}
 </a>
 );
};

// 5. Destination Card
interface DestinationCardProps {
 destination: Destinasi;
 tripCount: number;
 onSelect: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, tripCount, onSelect }) => {
 return (
 <button
 type="button"
 id={`destination-card-${destination.id}`}
 onClick={onSelect}
 className="group relative h-64 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block cursor-pointer w-full text-left overflow-hidden"
 >
 <img 
 {...responsiveImageProps(destination.imageUrl)}
 alt=""
 loading="lazy"
 decoding="async"
 aria-hidden="true"
 className="w-full h-full object-cover transition-transform duration-700 ease-out"
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 flex flex-col justify-end text-white">
 <span className="text-amber-600 text-xs font-semibold mb-2 block">
 {destination.region}
 </span>
 <h3 className="font-display font-bold text-2xl leading-tight mb-2">
 {destination.name}
 </h3>
 <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4 font-sans max-w-[90%]">
 {destination.summary}
 </p>
 <div className="mt-auto flex items-center justify-between">
 <span className="bg-white/10 backdrop-blur-md text-white text-xs font-bold py-1.5 px-3 rounded-full border border-white/20 tracking-wider">
 {tripCount} Paket
 </span>
 <span className="text-amber-500 bg-white/10 backdrop-blur-md p-2 rounded-full group-hover:translate-x-1 duration-200 transition-transform">
 <ArrowRight className="w-4 h-4" aria-hidden="true" />
 </span>
 </div>
 </div>
 </button>
 );
};

// 6. Service Card
interface ServiceCardProps {
 layanan: Layanan;
 tripCount: number;
 onSelect: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ layanan, tripCount, onSelect }) => {
 return (
 <div 
 id={`service-card-${layanan.id}`}
 onClick={onSelect}
 className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 p-6 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-amber-300 transition-all duration-400 flex flex-col justify-between h-full group cursor-pointer"
 >
 <div>
 <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 shrink-0 rounded-lg bg-white/70 border border-amber-300/40 flex items-center justify-center text-slate-900 group-hover:bg-brand-primary group-hover:text-amber-500 transition-all duration-300 shadow-sm">
        <ServiceIcon name={layanan.iconName} className="w-5 h-5" />
      </div>
      <h3 className="font-display font-bold text-slate-900 text-lg md:text-xl group-hover:text-brand-primary transition-colors">
        {layanan.name}
      </h3>
    </div>
 
 <p className="text-slate-500 text-sm font-sans leading-relaxed mb-6">
 {layanan.summary}
 </p>
 </div>

 <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
 <span className="text-slate-700 text-xs font-bold tracking-wide bg-white/70 px-2.5 py-1 rounded-full border border-amber-300/40">
 {tripCount} Paket
 </span>
 <span className="text-slate-900 font-bold tracking-wider text-xs flex items-center gap-1.5 group-hover:text-brand-primary transition-colors ">
 Eksplor
 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
 </span>
 </div>
 </div>
 );
};

// 7. Pricing Card
export const PricingCard: React.FC<{ tier: HargaPaket }> = ({ tier }) => {
 return (
 <div className={`p-6 sm:p-6 rounded-lg border transition-all duration-300 relative  ${
 tier.is_primary 
 ? 'bg-amber-100/65 border-2 border-amber-500 shadow-md shadow-amber-500/10' 
 : 'bg-white text-slate-500 border-slate-100 shadow-sm hover:border-slate-200'
 }`}>
 {tier.is_primary && (
 <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-bold px-4 py-1.5 rounded-bl-lg tracking-wide ">
 REKOMENDASI
 </div>
 )}
 <div className="mb-2 pr-20">
 <h4 className={`font-display font-bold text-xl mb-1 ${tier.is_primary ? 'text-slate-900' : 'text-slate-700'}`}>{tier.name}</h4>
 <p className="text-xs text-slate-500 leading-relaxed max-w-[90%]">{tier.label}</p>
 </div>
 
 <div className="flex items-baseline gap-2 mt-6">
 <span className={`text-2xl font-bold font-display tracking-tight ${tier.is_primary ? 'text-amber-600' : 'text-slate-900'}`}>
 Rp {tier.price.toLocaleString('id-ID')}
 </span>
 <span className="text-sm font-semibold text-slate-500">{tier.price_suffix}</span>
 </div>
 
 <div className="mt-6 flex flex-col gap-2 text-[11px] text-slate-500 border-t border-slate-100 pt-6">
 <div className="flex justify-between items-center">
 <span className="font-medium text-slate-500">Min. Peserta</span>
 <strong className="text-slate-900 bg-slate-50 px-3 py-1 rounded-full">{tier.min_pax} pax</strong>
 </div>
 <div className="flex justify-between items-center">
 <span className="font-medium text-slate-500">Max. Peserta</span>
 <strong className="text-slate-900 bg-slate-50 px-3 py-1 rounded-full">{tier.max_pax} pax</strong>
 </div>
 </div>
 </div>
 );
};

// 8. Itinerary Timeline
export const ItineraryTimeline: React.FC<{ itineraries: ItineraryPaket[] }> = ({ itineraries }) => {
 const sorted = [...itineraries].sort((a,b) => a.sort_order - b.sort_order);

 // Group by day for beautiful timeline
 const days = Array.from(new Set(sorted.map(i => i.day_number)));

 return (
 <div className="relative pl-6 border-l border-dashed border-slate-300 space-y-8 font-sans">
 {sorted.map((item, index) => (
 <div key={index} className="relative group/timeline">
 {/* Bullet point indicator */}
 <div className="absolute -left-[33px] top-1 bg-brand-primary text-white border-4 border-white w-6.5 h-6.5 flex items-center justify-center rounded-full text-[9px] font-bold shadow-xs transition-colors duration-200">
 {item.day_number}
 </div>

 <div className="flex items-center gap-2 mb-1 shrink-0">
 <span className=" text-slate-900 text-[9px] px-2 py-0.5 rounded-md font-bold border border-slate-200">
 HARI {item.day_number}
 </span>
 <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
 <Clock className="w-3.5 h-3.5 text-amber-600" />
 {item.time}
 </span>
 </div>

 <h4 className="text-slate-900 font-display font-bold text-sm md:text-base leading-tight mb-1 group-hover/timeline:text-amber-600 transition-colors">
 {item.title}
 </h4>

 <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
 {item.description}
 </p>
 </div>
 ))}
 </div>
 );
};

// Features Bullet Block
export const FeaturesBlock: React.FC<{ features: FasilitasPaket[], type: 'included' | 'excluded' | 'note' }> = ({ features, type }) => {
 const filtered = features.filter(f => f.type === type).sort((a,b) => a.sort_order - b.sort_order);
 
 if (filtered.length === 0) {
 return <p className="text-xs text-slate-500 italic">Tidak ada infomasi.</p>;
 }

 return (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 {filtered.map((feat, i) => (
 <div 
 key={i} 
 className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs md:text-sm ${
 type === 'included' 
 ? 'bg-emerald-50/20 border-emerald-100 text-emerald-900' 
 : type === 'excluded' 
 ? 'bg-rose-50/20 border-rose-100 text-rose-900' 
 : 'bg-amber-50/20 border-amber-100 text-amber-900'
 }`}
 >
 <div className="mt-0.5 shrink-0">
 {type === 'included' ? (
 <Check className="w-4 h-4 text-emerald-600 font-extrabold" />
 ) : type === 'excluded' ? (
 <X className="w-4 h-4 text-rose-500 font-extrabold" />
 ) : (
 <Info className="w-4 h-4 text-amber-600 font-extrabold" />
 )}
 </div>
 <div>
 <p className="font-bold text-slate-800 text-xs md:text-sm mb-0.5">{feat.label}</p>
 {feat.description && (
 <p className="text-slate-500 text-xs leading-relaxed">{feat.description}</p>
 )}
 </div>
 </div>
 ))}
 </div>
 );
};
