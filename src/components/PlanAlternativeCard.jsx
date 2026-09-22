import React, { useState } from 'react';
import { MapPin, Clock, IndianRupee, ExternalLink } from 'lucide-react';
import ContactModal from './shared/ContactModal';

export default function PlanAlternativeCard({ alternative }) {
  const [showModal, setShowModal] = useState(false);
  const exp = alternative.experience;

  return (
    <>
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition">
        <div className="flex gap-3 items-start">
          <img src={exp.image_url} alt={exp.title} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-stone-100" />
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">{exp.category}</span>
            <h4 className="font-bold text-stone-900 text-sm leading-tight">{exp.title}</h4>
            <p className="text-[11px] text-stone-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-600" /> {exp.location_name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
          <span className="font-bold text-amber-700">₹{exp.price}</span>
          <button
            onClick={() => setShowModal(true)}
            className="text-stone-900 hover:text-amber-700 font-semibold text-xs flex items-center gap-1 transition"
          >
            Details <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {showModal && (
        <ContactModal experience={exp} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}