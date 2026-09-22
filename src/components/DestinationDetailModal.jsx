import React from 'react';
import { X, MapPin, ExternalLink, Compass, ShieldAlert } from 'lucide-react';

export default function DestinationDetailModal({ destination, onClose, onZoomMap }) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn border border-stone-200">
        
        {/* Header Image */}
        <div className="relative h-72 w-full bg-stone-100">
          <img 
            src={destination.image_url} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white text-stone-800 p-2 rounded-full shadow-md transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
            {destination.category}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                {destination.district} District
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              {destination.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2 font-medium">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>{destination.location_label || destination.district}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Overview</h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {destination.short_description}
            </p>
          </div>

          {/* Source Attribution Box */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-bold text-stone-400 uppercase">Verified Data Reference</span>
              <span className="text-xs font-semibold text-stone-800">{destination.source_name || 'Manipur Tourism'}</span>
            </div>
            {destination.source_url && (
              <a
                href={destination.source_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 transition"
              >
                Official Source <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Accuracy Note */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p className="text-[11px] text-stone-600 leading-normal">
              <strong>Practical Note:</strong> Destination information is based on cited sources. Please confirm practical travel details through official channels before visiting.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                onZoomMap(destination);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition flex items-center gap-2"
            >
              <Compass className="w-4 h-4" /> Locate on Map
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}