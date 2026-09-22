import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, IndianRupee, ShieldCheck, BookOpen, ArrowRight, Navigation, PhoneCall, ExternalLink } from 'lucide-react';
import ContactModal from './shared/ContactModal';
import { useNavigate } from 'react-router-dom';

export default function ManipurMomentTimeline({ result, currentLocation, aiBullets }) {
  const [selectedExperienceForModal, setSelectedExperienceForModal] = useState(null);
  const navigate = useNavigate();

  const isDual = result.itineraryType === 'dual';

  const renderItemCard = (item, titleLabel) => {
    const exp = item.experience;
    // Use AI bullets if provided, otherwise fallback to item.reasons
    const displayReasons = (aiBullets && aiBullets.length > 0) ? aiBullets : item.reasons;

    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {titleLabel} • {exp.category}
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
            ₹{exp.price}
          </span>
        </div>

        <div className="flex gap-4 items-start">
          <img src={exp.image_url} alt={exp.title} className="w-20 h-20 rounded-xl object-cover shrink-0 bg-stone-100" />
          <div className="space-y-1">
            <h4 className="font-bold text-stone-900 text-base leading-tight">{exp.title}</h4>
            <p className="text-xs text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> {exp.location_name}
            </p>
            <p className="text-xs font-semibold text-stone-700 flex items-center gap-2 pt-1">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-600" /> {item.startTimeStr} - {item.endTimeStr}</span>
              <span>•</span>
              <span>~{item.distanceKm.toFixed(1)} km from {currentLocation}</span>
            </p>
          </div>
        </div>

        {/* Why this fits - Powered by AI Bullets */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60 text-xs text-stone-700 space-y-1">
          <p className="font-semibold text-stone-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Why this fits:
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-stone-600 pl-1">
            {displayReasons.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <button
            onClick={() => navigate('/explore')}
            className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-amber-600" /> View on Map
          </button>
          <button
            onClick={() => setSelectedExperienceForModal(exp)}
            className="flex-1 bg-stone-900 hover:bg-stone-800 text-amber-50 text-xs font-semibold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Details & WhatsApp
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl p-6 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" />
            Your Manipur Moment Itinerary
          </h2>
          <span className="bg-white/20 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full">
            {isDual ? 'Dual Session Itinerary' : 'Best Single Match'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="bg-black/10 backdrop-blur-sm p-2.5 rounded-xl">
            <span className="block text-amber-200 text-[10px] uppercase font-bold">Total Cost</span>
            <strong className="text-sm">₹{result.totalCost}</strong>
          </div>
          <div className="bg-black/10 backdrop-blur-sm p-2.5 rounded-xl">
            <span className="block text-amber-200 text-[10px] uppercase font-bold">Total Duration</span>
            <strong className="text-sm">{result.totalDurationMinutes} mins</strong>
          </div>
          <div className="bg-black/10 backdrop-blur-sm p-2.5 rounded-xl">
            <span className="block text-amber-200 text-[10px] uppercase font-bold">Travel Buffer</span>
            <strong className="text-sm">~{result.primary.travelBufferMinutes} mins</strong>
          </div>
          <div className="bg-black/10 backdrop-blur-sm p-2.5 rounded-xl">
            <span className="block text-amber-200 text-[10px] uppercase font-bold">Finish Time</span>
            <strong className="text-sm">{isDual ? result.secondary.endTimeStr : result.primary.endTimeStr}</strong>
          </div>
        </div>
      </div>

      {/* Timeline flow */}
      <div className="space-y-4">
        {renderItemCard(result.primary, 'Session 1')}

        {isDual && result.secondary && (
          <>
            <div className="flex items-center justify-center gap-2 py-1 text-xs font-bold text-amber-800 bg-amber-50/80 border border-amber-200 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{result.bufferBetweenMinutes} mins travel & rest buffer</span>
            </div>
            {renderItemCard(result.secondary, 'Session 2')}
          </>
        )}
      </div>

      {/* Render ContactModal if selected */}
      {selectedExperienceForModal && (
        <ContactModal experience={selectedExperienceForModal} onClose={() => setSelectedExperienceForModal(null)} />
      )}
    </div>
  );
}