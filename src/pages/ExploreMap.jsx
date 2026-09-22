import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchExperiences } from '../lib/api';
import L from 'leaflet';
import { Palette, Users, Utensils, Layers } from 'lucide-react';

const getMarkerIcon = (category) => {
  let colorClass = 'bg-blue-500';
  if (category === 'sports' || category === 'dance') {
    colorClass = 'bg-red-500';
  } else if (category === 'cuisine') {
    colorClass = 'bg-emerald-500';
  }

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-md ${colorClass}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

export default function ExploreMap() {
  const [experiences, setExperiences] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const imphalCenter = [24.8150, 93.9400]; 

  useEffect(() => {
    fetchExperiences().then(data => setExperiences(data));
  }, []);

  // Filter experiences based on user selection
  const filteredExperiences = experiences.filter(exp => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'handloom') return exp.category === 'handloom' || exp.category === 'craft';
    if (selectedCategory === 'participate') return exp.category === 'dance' || exp.category === 'sports';
    if (selectedCategory === 'cuisine') return exp.category === 'cuisine';
    return true;
  });

  return (
    <div className="fixed left-0 right-0 top-[73px] bottom-[48px] z-0">
      
      {/* Floating Category Filter Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-white/95 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-amber-50 shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          All
        </button>

        <button
          onClick={() => setSelectedCategory('handloom')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'handloom'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Handloom
        </button>

        <button
          onClick={() => setSelectedCategory('participate')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'participate'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Participate
        </button>

        <button
          onClick={() => setSelectedCategory('cuisine')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'cuisine'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          Taste
        </button>
      </div>

      <MapContainer 
        center={imphalCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredExperiences.map(exp => (
          <Marker 
            key={exp.id} 
            position={[exp.latitude, exp.longitude]}
            icon={getMarkerIcon(exp.category)}
          >
            <Popup className="custom-popup">
              <div className="w-64 bg-white rounded-xl overflow-hidden shadow-sm -m-3">
                <div className="h-32 w-full bg-stone-200 relative">
                  <img 
                    src={exp.image_url} 
                    alt={exp.title} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-stone-900/80 text-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {exp.category}
                  </span>
                </div>

                <div className="p-3">
                  <h3 className="font-bold text-stone-900 text-sm leading-snug mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-500 mb-3">
                    {exp.location_name}
                  </p>

                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-3 bg-stone-50 p-2 rounded-lg border border-stone-100">
                    <span>Price: <strong className="text-amber-700">₹{exp.price}</strong></span>
                    <span>{exp.duration_minutes ? `${exp.duration_minutes} mins` : 'Walk-in'}</span>
                  </div>

                  <button className="w-full bg-amber-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-amber-700 transition shadow-sm">
                    View Experience Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}