import React, { useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import DestinationDetailModal from '../components/DestinationDetailModal';
import { Sparkles, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 1. IMPORT LOCAL ASSET IMAGES
import loktakImg from '../assets/loktak.jpeg';
import kanglaImg from '../assets/kangla.jpeg';
import marketImg from '../assets/market.jpeg';
import keibulImg from '../assets/keibul.jpeg';
import kangeiImg from '../assets/kangei.jpeg';
// Note: Make sure the image filenames and extensions (.jpeg / .jpg) match your src/assets folder exact names

const CATEGORIES = [
  'All',
  'Nature & Eco-Tourism',
  'Heritage',
  'Culture',
  'Markets & Culture',
  'Sports Heritage',
  'Adventure'
];

// 2. ASSIGN IMPORTED VARIABLES TO DESTINATIONS
const INITIAL_DESTINATIONS = [
  {
    id: '1',
    name: 'Loktak Lake',
    category: ['Nature & Eco-Tourism'],
    district: 'Bishnupur',
    location_label: 'Moirang region, Bishnupur district',
    latitude: 24.5574,
    longitude: 93.8016,
    image: loktakImg,
    image_url: loktakImg,
    short_description: 'A major freshwater lake in Manipur, known for distinctive floating biomass formations called phumdis.',
    source_name: 'Manipur Tourism',
    source_url: 'https://manipurtourism.gov.in/places-to-see/'
  },
  {
    id: '2',
    name: 'Kangla Fort',
    category: ['Heritage'],
    district: 'Imphal West',
    location_label: 'Imphal city',
    latitude: 24.8170,
    longitude: 93.9360,
    image: kanglaImg,
    image_url: kanglaImg,
    short_description: 'The ancient citadel and traditional seat of the Meitei rulers, serving as a revered political and spiritual heart of Manipur.',
    source_name: 'Incredible India',
    source_url: 'https://www.incredibleindia.gov.in/en/manipur/imphal/kangla-fort'
  },
  {
    id: '3',
    name: 'Ima Keithel',
    category: ['Markets & Culture'],
    district: 'Imphal West',
    location_label: 'Imphal city',
    latitude: 24.8110,
    longitude: 93.9370,
    image: marketImg,
    image_url: marketImg,
    short_description: 'A unique historic women-only marketplace in Imphal, run entirely by thousands of women vendors selling traditional goods.',
    source_name: 'Manipur Tourism',
    source_url: 'https://manipurtourism.gov.in/exclusive-destination/'
  },
  {
    id: '4',
    name: 'Keibul Lamjao National Park',
    category: ['Nature & Eco-Tourism'],
    district: 'Bishnupur',
    location_label: 'Near Loktak Lake, Bishnupur district',
    latitude: 24.4750,
    longitude: 93.7650,
    image: keibulImg,
    image_url: keibulImg,
    short_description: 'The world’s only floating national park located on Loktak Lake, serving as the primary natural habitat for the endangered Sangai deer.',
    source_name: 'Manipur Tourism',
    source_url: 'https://manipurtourism.gov.in/places-to-see/'
  },
  {
    id: '5',
    name: 'Mapal Kangjeibung',
    category: ['Sports Heritage'],
    district: 'Imphal West',
    location_label: 'Imphal city',
    latitude: 24.8070,
    longitude: 93.9360,
    image: kangeiImg,
    image_url: kangeiImg,
    short_description: 'Recognized as the world’s oldest living polo ground, where modern polo (Sagol Kangjei) traces its historical roots.',
    source_name: 'Manipur Tourism',
    source_url: 'https://manipurtourism.gov.in/exclusive-destination/'
  },
  {
    id: '6',
    name: 'Khonghampat Orchidarium',
    category: ['Nature & Eco-Tourism'],
    district: 'Imphal West',
    location_label: 'Khonghampat, near Imphal',
    latitude: 24.8900,
    longitude: 93.9100,
    image: loktakImg, // Fallback asset if specific image not available
    image_url: loktakImg,
    short_description: 'A botanical garden sanctuary showcasing a wide variety of indigenous orchid species native to the hills and valleys of Manipur.',
    source_name: 'Manipur Tourism',
    source_url: 'https://manipurtourism.gov.in/places-to-see/'
  },
  {
    id: '7',
    name: 'Shirui Hills',
    category: ['Nature & Eco-Tourism', 'Adventure'],
    district: 'Ukhrul',
    location_label: 'Ukhrul district',
    latitude: 25.1150,
    longitude: 94.4450,
    image: keibulImg, // Fallback asset if specific image not available
    image_url: keibulImg,
    short_description: 'Scenic highland peaks in Ukhrul district renowned for scenic trekking routes and as the exclusive natural habitat of the rare Shirui Lily.',
    source_name: 'Manipur Tourism',
    source_url: 'https://manipurtourism.gov.in/places-to-see/'
  },
  {
    id: '8',
    name: 'Andro',
    category: ['Culture'],
    district: 'Imphal East',
    location_label: 'Andro area, Imphal East',
    latitude: 24.7650,
    longitude: 94.0200,
    image: marketImg, // Fallback asset if specific image not available
    image_url: marketImg,
    short_description: 'A historic heritage village known for traditional pottery traditions, cultural preservation, and the Shamilu Kolction cultural center.',
    source_name: 'Manipur Tourism',
    source_url: 'https://manipurtourism.gov.in/places-to-see/'
  }
];

export default function Destinations() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  const filteredDestinations = selectedCategory === 'All' 
    ? INITIAL_DESTINATIONS 
    : INITIAL_DESTINATIONS.filter(d => 
        Array.isArray(d.category) ? d.category.includes(selectedCategory) : d.category === selectedCategory
      );

  const handleZoomMap = (destination) => {
    navigate('/explore', { state: { targetLat: destination.latitude, targetLng: destination.longitude, targetName: destination.name } });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-20">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Official Tourism Discovery
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Destinations
        </h1>
        <p className="text-stone-600 max-w-xl text-xs md:text-sm leading-relaxed">
          From floating landscapes and heritage landmarks to living markets and sports traditions, explore destinations that shape the story of Manipur.
        </p>

        <div className="max-w-xl bg-amber-50/80 border border-amber-200/70 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0" />
          <p className="text-[11px] text-stone-700 leading-tight">
            Destination information is based on cited sources. Please confirm practical travel details through official channels before visiting.
          </p>
        </div>
      </div>

      {/* CATEGORY FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition shadow-xs ${
                  isSelected 
                    ? 'bg-stone-900 text-white shadow-sm' 
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* DESTINATIONS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDestinations.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-2">
            <h3 className="font-bold text-stone-900 text-base">No destinations found in this category</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map(dest => (
              <DestinationCard 
                key={dest.id} 
                destination={{
                  ...dest,
                  image: dest.image || dest.image_url,
                  image_url: dest.image_url || dest.image,
                  category: Array.isArray(dest.category) ? dest.category[0] : dest.category
                }} 
                onSelect={setSelectedDestination} 
                onZoomMap={handleZoomMap}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DestinationDetailModal 
        destination={selectedDestination ? {
          ...selectedDestination,
          category: Array.isArray(selectedDestination.category) ? selectedDestination.category.join(' • ') : selectedDestination.category
        } : null} 
        onClose={() => setSelectedDestination(null)} 
        onZoomMap={handleZoomMap}
      />
    </div>
  );
}