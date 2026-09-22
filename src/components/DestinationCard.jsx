import React from 'react';
import { MapPin, ExternalLink, Compass } from 'lucide-react';

export default function DestinationCard({ destination, onSelect, onZoomMap }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-stone-100">
          <img 
            src={destination.image_url || 'https://images.unsplash.com/photo-1626015493091-13768b64ce01?auto=format&fit=crop&w=800&q=80'} 
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute top-3 left-3 bg-amber-100/90 backdrop-blur-sm text-amber-900 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
            {destination.category}
          </div>
          {destination.district && (
            <div className="absolute top-3 right-3 bg-stone-900/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-medium">
              {destination.district} District
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition">
            {destination.name}
          </h3>
          
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>{destination.location_label || destination.district}</span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
            {destination.short_description}
          </p>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between mt-auto">
        <div className="text-[10px] text-stone-400 font-medium">
          Source: <span className="text-stone-600">{destination.source_name || 'Manipur Tourism'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onZoomMap(destination)}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
            title="View on Map"
          >
            <Compass className="w-4 h-4 text-stone-800" />
          </button>
          
          <button
            onClick={() => onSelect(destination)}
            className="px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}