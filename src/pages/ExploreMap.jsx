import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchExperiences } from '../lib/api';
import L from 'leaflet';
import { Palette, Users, Utensils, Layers, Compass } from 'lucide-react';

const STATIC_DESTINATIONS = [
  {
    id: 'd1',
    title: 'Loktak Lake',
    category: 'destination',
    district: 'Bishnupur',
    location_name: 'Moirang region, Bishnupur district',
    latitude: 24.5574,
    longitude: 93.8016,
    image_url: 'https://images.unsplash.com/photo-1626015493091-13768b64ce01?auto=format&fit=crop&w=1200&q=80',
    description: 'A major freshwater lake in Manipur, known for distinctive floating biomass formations called phumdis.',
    price: 0,
    duration_minutes: 120
  },
  {
    id: 'd2',
    title: 'Kangla Fort',
    category: 'destination',
    district: 'Imphal West',
    location_name: 'Imphal city',
    latitude: 24.8170,
    longitude: 93.9360,
    image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    description: 'The ancient citadel and traditional seat of the Meitei rulers, serving as a revered political and spiritual heart of Manipur.',
    price: 50,
    duration_minutes: 90
  },
  {
    id: 'd3',
    title: 'Ima Keithel',
    category: 'destination',
    district: 'Imphal West',
    location_name: 'Imphal city',
    latitude: 24.8110,
    longitude: 93.9370,
    image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80',
    description: 'A unique historic women-only marketplace in Imphal, run entirely by thousands of women vendors selling traditional goods.',
    price: 0,
    duration_minutes: 60
  },
  {
    id: 'd4',
    title: 'Keibul Lamjao National Park',
    category: 'destination',
    district: 'Bishnupur',
    location_name: 'Near Loktak Lake, Bishnupur district',
    latitude: 24.4750,
    longitude: 93.7650,
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    description: 'The world’s only floating national park located on Loktak Lake, serving as the primary natural habitat for the endangered Sangai deer.',
    price: 100,
    duration_minutes: 150
  },
  {
    id: 'd5',
    title: 'Mapal Kangjeibung',
    category: 'destination',
    district: 'Imphal West',
    location_name: 'Imphal city',
    latitude: 24.8070,
    longitude: 93.9360,
    image_url: 'https://images.unsplash.com/photo-1517649763962-0c6232662000?auto=format&fit=crop&w=1200&q=80',
    description: 'Recognized as the world’s oldest living polo ground, where modern polo (Sagol Kangjei) traces its historical roots.',
    price: 0,
    duration_minutes: 45
  },
  {
    id: 'd6',
    title: 'Khonghampat Orchidarium',
    category: 'destination',
    district: 'Imphal West',
    location_name: 'Khonghampat, near Imphal',
    latitude: 24.8900,
    longitude: 93.9100,
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    description: 'A botanical garden sanctuary showcasing a wide variety of indigenous orchid species native to the hills and valleys of Manipur.',
    price: 30,
    duration_minutes: 60
  },
  {
    id: 'd7',
    title: 'Shirui Hills',
    category: 'destination',
    district: 'Ukhrul',
    location_name: 'Ukhrul district',
    latitude: 25.1150,
    longitude: 94.4450,
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    description: 'Scenic highland peaks in Ukhrul district renowned for scenic trekking routes and as the exclusive natural habitat of the rare Shirui Lily.',
    price: 0,
    duration_minutes: 240
  },
  {
    id: 'd8',
    title: 'Andro',
    category: 'destination',
    district: 'Imphal East',
    location_name: 'Andro area, Imphal East',
    latitude: 24.7650,
    longitude: 94.0200,
    image_url: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=1200&q=80',
    description: 'A historic heritage village known for traditional pottery traditions, cultural preservation, and the Shamilu Kolction cultural center.',
    price: 50,
    duration_minutes: 90
  }
];

const getMarkerIcon = (category) => {
  let colorClass = 'bg-blue-500'; // Handloom (Blue)
  if (category === 'sports' || category === 'dance') {
    colorClass = 'bg-red-500'; // Participate (Red)
  } else if (category === 'cuisine') {
    colorClass = 'bg-emerald-500'; // Taste (Emerald)
  } else if (category === 'destination') {
    colorClass = 'bg-amber-400'; // Destinations (Yellow)
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
    fetchExperiences().then(data => {
      // Merge backend/mock data with static destinations so yellow pins render
      setExperiences([...data, ...STATIC_DESTINATIONS]);
    });
  }, []);

  // Filter items based on active category
  const filteredExperiences = experiences.filter(exp => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'handloom') return exp.category === 'handloom' || exp.category === 'craft';
    if (selectedCategory === 'participate') return exp.category === 'dance' || exp.category === 'sports';
    if (selectedCategory === 'cuisine') return exp.category === 'cuisine';
    if (selectedCategory === 'destination') return exp.category === 'destination';
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
          onClick={() => setSelectedCategory('destination')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'destination'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Destinations
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