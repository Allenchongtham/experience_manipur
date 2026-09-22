import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Palette, Users, Utensils, Sparkles, Compass } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path || (path === '/plan-my-trip' && location.pathname === '/plan');

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/explore" className="flex items-center gap-2">
            <div className="bg-amber-600 text-white p-2 rounded-xl shadow-sm">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-stone-900 text-base tracking-tight block">Experience Manipur</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Turn free time into living culture</span>
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/plan-my-trip"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                isActive('/plan-my-trip')
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Plan My Trip
            </Link>

            <Link
              to="/destinations"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/destinations') ? 'bg-stone-900 text-amber-50' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Destinations
            </Link>

            <Link
              to="/explore"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/explore') ? 'bg-stone-900 text-amber-50' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              Explore Map
            </Link>

            <Link
              to="/craft"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/craft') ? 'bg-stone-900 text-amber-50' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Craft & Loom
            </Link>

            <Link
              to="/participate"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/participate') ? 'bg-stone-900 text-amber-50' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Participate
            </Link>

            <Link
              to="/taste"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/taste') ? 'bg-stone-900 text-amber-50' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              Taste Local
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}