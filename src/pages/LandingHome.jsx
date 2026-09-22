import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, MapPin, Palette } from 'lucide-react';

export default function LandingHome() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-stone-950">
      
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626015493091-13768b64ce01?auto=format&fit=crop&w=2000&q=80" 
          alt="Manipur Hills and Loktak Lake" 
          className="w-full h-full object-cover scale-105 animate-fadeIn"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-stone-950/50" />
      </div>

      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-amber-600 text-white p-2 rounded-xl font-bold tracking-wider shadow-md">
            EM
          </div>
          <span className="font-extrabold tracking-tight text-lg drop-shadow-md">Experience Manipur</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium drop-shadow-sm">
          <button onClick={() => navigate('/destinations')} className="hover:text-amber-400 transition">Destinations</button>
          <button onClick={() => navigate('/craft')} className="hover:text-amber-400 transition">Craft & Loom</button>
          <button onClick={() => navigate('/participate')} className="hover:text-amber-400 transition">Participate</button>
          <button onClick={() => navigate('/taste')} className="hover:text-amber-400 transition">Taste Local</button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/plan-my-trip')}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide shadow-lg transition transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" /> Plan with Point
          </button>
        </div>
      </header>

      {/* Hero Center Content & Action Pills */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto pt-20">
        
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-amber-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Compass className="w-3.5 h-3.5" /> Turn Free Time Into Living Culture
        </div>

        {/* Massive Bold Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase drop-shadow-2xl mb-8 leading-none">
          Discover Manipur <br />
          <span className="text-amber-400">The Living Eden</span>
        </h1>

        {/* Quick Action Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button 
            onClick={() => navigate('/destinations')}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-stone-900 px-5 py-3 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm transition transform hover:-translate-y-0.5"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-700" /> See iconic landmarks
          </button>

          <button 
            onClick={() => navigate('/explore')}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-stone-900 px-5 py-3 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm transition transform hover:-translate-y-0.5"
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" /> Explore interactive map
          </button>

          <button 
            onClick={() => navigate('/craft')}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-stone-900 px-5 py-3 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm transition transform hover:-translate-y-0.5"
          >
            <Palette className="w-3.5 h-3.5 text-amber-700" /> Handloom & craft sessions
          </button>

          <button 
            onClick={() => navigate('/plan-my-trip')}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-full text-xs font-bold shadow-xl transition transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Plan trip with AI Concierge
          </button>
        </div>

      </div>

    </div>
  );
}