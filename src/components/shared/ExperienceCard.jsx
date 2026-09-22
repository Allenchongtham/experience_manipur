import React, { useState } from 'react';
import { Clock, IndianRupee, Activity, Calendar, ShieldCheck, DoorOpen } from 'lucide-react';
import ContactModal from './ContactModal';

export default function ExperienceCard({ experience }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nextSlot = experience.slots?.[0];
  const isCuisine = experience.category === 'cuisine';

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col transition-all hover:shadow-md">
        {/* Image & Category Badge */}
        <div className="relative h-48 bg-stone-200">
          <img 
            src={experience.image_url} 
            alt={experience.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-stone-800 uppercase tracking-wide">
            {experience.category}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-stone-900 leading-tight mb-2">
            {experience.title}
          </h3>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mb-4">
            {!isCuisine && experience.duration_minutes && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {experience.duration_minutes} min
              </div>
            )}
            <div className="flex items-center gap-1 font-medium text-amber-700">
              <IndianRupee className="w-3.5 h-3.5" />
              {experience.price}
            </div>
            
            {!isCuisine && (
              <>
                <div className="flex items-center gap-1 capitalize">
                  <Activity className="w-3.5 h-3.5" />
                  {experience.activity_level}
                </div>
                {experience.beginner_friendly && (
                  <div className="flex items-center gap-1 text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Beginner
                  </div>
                )}
              </>
            )}
          </div>

          {/* Slot OR Walk-in Box */}
          {nextSlot ? (
            <div className="mt-auto bg-stone-50 rounded-lg p-3 border border-stone-100 flex items-start gap-2">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-stone-800">Next Demo Session</p>
                <p className="text-xs text-stone-600">
                  {nextSlot.date} • {nextSlot.start_time} - {nextSlot.end_time}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-auto bg-emerald-50/50 rounded-lg p-3 border border-emerald-100 flex items-start gap-2">
              <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-stone-800">Walk-in Experience</p>
                <p className="text-xs text-stone-600">
                  {experience.opening_hours ? `Hours: ${experience.opening_hours}` : 'Open during business hours'}
                </p>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full bg-stone-900 text-amber-50 font-medium text-sm py-2.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            {isCuisine ? 'View Details' : 'View Experience'}
          </button>
        </div>
      </div>

      {/* Render Contact Modal */}
      {isModalOpen && (
        <ContactModal experience={experience} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}