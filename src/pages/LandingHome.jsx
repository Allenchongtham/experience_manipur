import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, MapPin, Calendar } from 'lucide-react';
import landingCardImg from '../assets/manipur_landing_card.jpg';
import bgHeroImg from '../assets/background.jpg';

export default function LandingHome() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden flex items-center justify-center py-12 px-6 sm:px-12 lg:px-24">
      
      {/* Background Image & Overlay Layer stretching full width */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgHeroImg} 
          alt="Manipur Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/65 backdrop-blur-[2px]" />
      </div>

      {/* Main Content Grid spanning full width */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Bold Typography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm">
            <Compass className="w-3.5 h-3.5" /> Discover the real Manipur
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white drop-shadow-lg">
            Experience <br />
            <span className="text-amber-400">Manipur</span> <br />
            differently.
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-xl leading-relaxed font-medium drop-shadow">
            Tell us how much time you have, what you enjoy, and what you want to experience. Use our AI-integrated tabs above to plan a custom trip or discover live community events instantly.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/destinations')}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3.5 rounded-2xl text-xs font-bold shadow-xl transition transform hover:-translate-y-0.5"
            >
              <MapPin className="w-4 h-4 text-white" /> Explore Destinations
            </button>
          </div>
        </div>

        {/* Right Column: Immersive Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20">
            <div className="absolute inset-0 z-0">
              <img
                src={landingCardImg}
                alt="Manipur Culture & Landscape"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
            </div>

            <div className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-[11px] font-bold text-stone-900">
              <MapPin className="w-3 h-3 text-amber-700" /> Imphal & beyond
            </div>

            <div className="relative z-10 p-8 pt-64 flex flex-col justify-end space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                MANIPUR
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Culture, People & Stories
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-medium">
                Discover authentic traditions, local music gigs, and handloom craftsmanship beyond the usual tourist path.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}