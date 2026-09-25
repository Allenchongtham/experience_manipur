import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { fetchExperiences } from '../lib/api';
import { fetchDestinations } from '../lib/destinationsData';
import { normalizeExperienceForMap, normalizeDestinationForMap } from '../utils/normalizeMapItem';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import { Palette, Users, Utensils, Layers, Compass, MessageSquare, X } from 'lucide-react';

// Import all local images from src/assets/
import androImg from '../assets/andro.jpeg';
import bambooImg from '../assets/bamboo.jpeg';
import chahaoImg from '../assets/chahao.jpeg';
import craftImg from '../assets/craft.jpeg';
import danceImg from '../assets/dance.jpeg';
import handloomImg from '../assets/handloom.jpeg';
import kangeiImg from '../assets/kangei.jpeg';
import kanglaImg from '../assets/kangla.jpeg';
import keibulImg from '../assets/keibul.jpeg';
import loktakImg from '../assets/loktak.jpeg';
import marketImg from '../assets/market.jpeg';
import orchImg from '../assets/orch.jpeg';
import pungImg from '../assets/pung.jpeg';
import sagolImg from '../assets/sagol.jpeg';
import shiruiImg from '../assets/shirui.jpeg';
import thaliImg from '../assets/thali.jpeg';
import thangImg from '../assets/thang.jpeg';
import yubiImg from '../assets/yubi.jpeg';

// Asset map helper to match titles/keywords to local asset files
function getAssetImage(item) {
  const title = (item.title || item.name || '').toLowerCase();
  const cat = (item.category || '').toLowerCase();

  if (title.includes('bamboo')) return bambooImg;
  if (title.includes('kouna') || title.includes('craft')) return craftImg;
  if (title.includes('motif') || title.includes('handloom') || title.includes('weaving')) return handloomImg;
  if (title.includes('dance') || title.includes('ras') || title.includes('jagoi')) return danceImg;
  if (title.includes('pung') || title.includes('drum') || title.includes('cholom')) return pungImg;
  if (title.includes('thang') || title.includes('ta') || title.includes('martial')) return thangImg;
  if (title.includes('sagol') || title.includes('kangjei') || title.includes('polo')) return sagolImg || kangeiImg;
  if (title.includes('yubi') || title.includes('lakpi')) return yubiImg;
  if (title.includes('chahao') || title.includes('kheer') || title.includes('rice')) return chahaoImg;
  if (title.includes('thali') || title.includes('meal') || title.includes('cuisine') || cat.includes('cuisine')) return thaliImg;
  if (title.includes('loktak')) return loktakImg;
  if (title.includes('kangla')) return kanglaImg;
  if (title.includes('keibul') || title.includes('sangai')) return keibulImg;
  if (title.includes('market') || title.includes('keithel')) return marketImg;
  if (title.includes('orchid') || title.includes('orch')) return orchImg;
  if (title.includes('shirui')) return shiruiImg;
  if (title.includes('andro')) return androImg;

  // Fallback to original image_url if provided, otherwise default to craftImg
  return item.image_url || craftImg;
}

function MapViewController({ target }) {
  const map = useMap();
  
  useEffect(() => {
    if (target && target.lat && target.lng) {
      map.setView([target.lat, target.lng], 15, { animate: true });
    }
  }, [target, map]);

  return null;
}

const getMarkerIcon = (item, isTarget) => {
  let colorClass = 'bg-blue-500'; 
  
  if (item.type === 'destination') {
    colorClass = 'bg-amber-400'; 
  } else if (item.category === 'dance' || item.category === 'sports') {
    colorClass = 'bg-red-500'; 
  } else if (item.category === 'cuisine') {
    colorClass = 'bg-emerald-500'; 
  }

  const ringEffect = isTarget ? 'ring-4 ring-amber-500 scale-125 animate-pulse' : '';

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-md ${colorClass} ${ringEffect}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

export default function ExploreMap() {
  const [experiences, setExperiences] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDetailModal, setActiveDetailModal] = useState(null);
  
  const locationState = useLocation().state;
  const targetLocation = locationState ? { lat: locationState.targetLat, lng: locationState.targetLng, name: locationState.targetName } : null;

  const imphalCenter = [24.8150, 93.9400]; 

  useEffect(() => {
    let isMounted = true;

    async function loadMapData() {
      try {
        const [rawExp, rawDest] = await Promise.all([
          fetchExperiences(),
          fetchDestinations()
        ]);

        if (isMounted) {
          const normExp = rawExp.map(normalizeExperienceForMap).map(item => ({
            ...item,
            image_url: getAssetImage(item)
          }));

          const normDest = rawDest.map(normalizeDestinationForMap).map(item => ({
            ...item,
            image_url: getAssetImage(item)
          }));

          setExperiences(normExp);
          setDestinations(normDest);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load map data:', err);
        if (isMounted) setLoading(false);
      }
    }

    loadMapData();

    return () => {
      isMounted = false;
    };
  }, []);

  const allMapItems = [...destinations, ...experiences];

  const filteredItems = allMapItems.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'destination') return item.type === 'destination';
    if (selectedCategory === 'handloom') return item.category === 'handloom' || item.category === 'craft';
    if (selectedCategory === 'participate') return item.category === 'dance' || item.category === 'sports';
    if (selectedCategory === 'cuisine') return item.category === 'cuisine';
    return true;
  });

  return (
    <div className="fixed left-0 right-0 top-\[73px\] bottom-\[48px\] z-0">
      
      {/* Floating Category Filter Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-\[400\] bg-white/95 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'all' ? 'bg-stone-900 text-amber-50 shadow-sm' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> All
        </button>

        <button
          onClick={() => setSelectedCategory('destination')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'destination' ? 'bg-amber-500 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Compass className="w-3.5 h-3.5" /> Destinations
        </button>

        <button
          onClick={() => setSelectedCategory('handloom')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'handloom' ? 'bg-blue-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5" /> Handloom
        </button>

        <button
          onClick={() => setSelectedCategory('participate')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'participate' ? 'bg-red-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" /> Participate
        </button>

        <button
          onClick={() => setSelectedCategory('cuisine')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedCategory === 'cuisine' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" /> Taste
        </button>
      </div>

      <MapContainer 
        center={targetLocation ? [targetLocation.lat, targetLocation.lng] : imphalCenter} 
        zoom={targetLocation ? 15 : 10} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapViewController target={targetLocation} />
        
        {!loading && filteredItems.map(item => {
          const isTarget = targetLocation && item.title === targetLocation.name;

          return (
            <Marker 
              key={item.id} 
              position={[item.latitude, item.longitude]}
              icon={getMarkerIcon(item, isTarget)}
              eventHandlers={{
                add: (e) => {
                  if (isTarget) {
                    e.target.openPopup();
                  }
                }
              }}
            >
              <Popup className="custom-popup">
                <div 
                  className="w-64 bg-white rounded-xl overflow-hidden shadow-sm -m-3"
                  onClick={(e) => L.DomEvent.stopPropagation(e)}
                >
                  <div className="h-32 w-full bg-stone-200 relative">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-stone-900/80 text-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3">
                    <h3 className="font-bold text-stone-900 text-sm leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 mb-3">
                      {item.location_name}
                    </p>

                    <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-3 bg-stone-50 p-2 rounded-lg border border-stone-100">
                      <span>Price: <strong className="text-amber-700">₹{item.price}</strong></span>
                      <span>{item.duration_minutes ? `${item.duration_minutes} mins` : 'Walk-in'}</span>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDetailModal(item);
                      }}
                      className="w-full bg-amber-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-amber-700 transition shadow-sm cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Custom Details & WhatsApp Handoff Modal */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-\[9999\] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn border border-stone-200 text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase">{activeDetailModal.type === 'destination' ? 'Destination' : 'Session'} • {activeDetailModal.category}</span>
                <h3 className="font-extrabold text-stone-900 text-base">{activeDetailModal.title}</h3>
              </div>
              <button 
                onClick={() => setActiveDetailModal(null)}
                className="bg-stone-100 hover:bg-stone-200 p-2 rounded-full text-stone-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-3.5 space-y-1">
                <span className="font-bold text-amber-900 block text-[11px] uppercase">Timing & Availability</span>
                <p className="text-stone-600">Daily Access: 10:00 AM – 4:00 PM</p>
                <p className="text-stone-600">Duration / Visit Time: {activeDetailModal.duration_minutes || 60} minutes</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-1">
                <span className="font-bold text-stone-800 block text-[11px] uppercase">Host & Location</span>
                <p className="text-stone-600">{activeDetailModal.location_name}</p>
                <p className="text-stone-600 font-medium">Price: ₹{activeDetailModal.price || 0} per participant</p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
              <a
                href={`https://wa.me/919876543210?text=Hello,%20I%20would%20like%20to%20inquire%20about%20visiting%20/${encodeURIComponent(activeDetailModal.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> Open WhatsApp Handoff
              </a>
              <button
                onClick={() => setActiveDetailModal(null)}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}