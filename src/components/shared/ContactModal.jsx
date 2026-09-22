import React from 'react';
import { X, MapPin, IndianRupee, Clock, ShieldAlert, BookOpen, User, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactModal({ experience, onClose }) {
  if (!experience) return null;

  const nextSlot = experience.slots?.[0];
  const isCuisine = experience.category === 'cuisine';

  // Helper to generate a pre-filled WhatsApp link
  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210"; // Replace with real default or dynamic host number if available
    const message = encodeURIComponent(`Hi ${experience.host?.name || 'Host'}, I'm interested in booking "${experience.title}" via Experience Manipur.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[90vh]">
        
        {/* Header Image */}
        <div className="relative h-48 bg-stone-200 shrink-0">
          <img 
            src={experience.image_url} 
            alt={experience.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 bg-stone-900/70 hover:bg-stone-900 text-white p-2 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-800 uppercase tracking-wide">
            {experience.category}
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-1">{experience.title}</h2>
            <p className="text-sm text-stone-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              {experience.location_name}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center justify-around bg-stone-50 p-3 rounded-xl border border-stone-200/60 text-xs font-semibold text-stone-800">
            {!isCuisine && experience.duration_minutes && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-amber-600" />
                {experience.duration_minutes} mins
              </div>
            )}
            <div className="flex items-center gap-1 text-amber-700 text-sm">
              <IndianRupee className="w-4 h-4" />
              {experience.price}
            </div>
            {experience.activity_level && (
              <div className="flex items-center gap-1 capitalize">
                Level: {experience.activity_level}
              </div>
            )}
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {experience.description}
          </p>

          {/* Timing / Slot Information */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3.5 text-xs text-stone-800">
            <p className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-600" />
              {nextSlot ? 'Scheduled Availability' : 'Walk-in Hours'}
            </p>
            {nextSlot ? (
              <p className="text-stone-700">
                Next Session: <strong>{nextSlot.date}</strong> from <strong>{nextSlot.start_time} - {nextSlot.end_time}</strong>
              </p>
            ) : (
              <p className="text-stone-700">
                Opening Hours: <strong>{experience.opening_hours || 'Open during regular business hours'}</strong>
              </p>
            )}
          </div>

          {/* Cultural Etiquette & Safety Notes */}
          <div className="space-y-3 text-xs">
            {experience.etiquette_note && (
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60 flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block mb-0.5">Cultural Etiquette</span>
                  <p className="text-stone-600">{experience.etiquette_note}</p>
                </div>
              </div>
            )}

            {experience.safety_note && (
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-100 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-red-900 block mb-0.5">Safety & Dietary Note</span>
                  <p className="text-red-700">{experience.safety_note}</p>
                </div>
              </div>
            )}
          </div>

          {/* Host WhatsApp Contact Box */}
          {experience.host && (
            <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-stone-100 p-2 rounded-full text-stone-700">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">{experience.host.name}</p>
                  <p className="text-[11px] text-stone-500">{experience.host.contact_label}</p>
                </div>
              </div>
              <button 
                onClick={handleWhatsAppClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}