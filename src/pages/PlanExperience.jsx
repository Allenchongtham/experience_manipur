import React, { useState, useEffect } from 'react';
import { fetchExperiences } from '../lib/api';
import { supabase } from '../lib/supabase';
import { matchExperiences, buildSimpleItinerary } from '../utils/matchExperiences';
import PlanLoadingState from '../components/PlanLoadingState';
import NoPlanResults from '../components/NoPlanResults';
import ManipurMomentTimeline from '../components/ManipurMomentTimeline';
import PlanAlternativeCard from '../components/PlanAlternativeCard';
import PointConciergeResponse from '../components/PointConciergeResponse';
import { Clock, IndianRupee, Wand2, Compass, Navigation, Zap, Coffee, Palette } from 'lucide-react';

export default function PlanExperience() {
  const [experiences, setExperiences] = useState([]);
  const [sessionSlots, setSessionSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);

  // Natural Language, GPS & Vibe State
  const [naturalQuery, setNaturalQuery] = useState('I have 5 hours left near my current location. I want something traditional but not too tiring.');
  const [currentGps, setCurrentGps] = useState({ name: 'Live GPS Location', lat: 24.8170, lng: 93.9368 });
  const [gpsStatus, setGpsStatus] = useState('📍 GPS Active (Accurate Location)');
  const [gpsLoading, setGpsLoading] = useState(false);

  // Vibe Tabs State
  const [selectedVibe, setSelectedVibe] = useState('all');

  // Manual Overrides
  const [currentTime, setCurrentTime] = useState('13:30');
  const [budget, setBudget] = useState('any');

  // Result & AI State
  const [itineraryResult, setItineraryResult] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function initData() {
      setLoading(true);
      const exps = await fetchExperiences();
      setExperiences(exps);

      const { data: slots, error } = await supabase.from('session_slots').select('*');
      if (!error && slots) {
        setSessionSlots(slots);
      }
      setLoading(false);

      if (navigator.geolocation) {
        setGpsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentGps({ name: 'Live GPS Location', lat: latitude, lng: longitude });
            setGpsStatus('📍 GPS Active (Accurate Location)');
            setGpsLoading(false);
          },
          () => {
            setGpsStatus('Default: Imphal Center (GPS unavailable)');
            setGpsLoading(false);
          },
          { timeout: 8000, maximumAge: 60000 }
        );
      }
    }
    initData();
  }, []);

  const handleManualGPSRequest = () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentGps({ name: 'Live GPS Location', lat: latitude, lng: longitude });
        setGpsStatus('📍 GPS Active (Accurate Location)');
        setGpsLoading(false);
      },
      () => setGpsLoading(false)
    );
  };

  const handlePlan = async (e) => {
    if (e) e.preventDefault();
    setCalculating(true);
    setHasSearched(true);

    // Default time based on text or fallback to 4 hours (240 mins) if user didn't specify
    let parsedTime = 240;
    const lowerQuery = naturalQuery.toLowerCase();
    if (lowerQuery.includes('6 hour')) parsedTime = 360;
    else if (lowerQuery.includes('5 hour')) parsedTime = 300;
    else if (lowerQuery.includes('4 hour')) parsedTime = 240;
    else if (lowerQuery.includes('3 hour')) parsedTime = 180;
    else if (lowerQuery.includes('2 hour')) parsedTime = 120;
    else if (lowerQuery.includes('1 hour')) parsedTime = 60;

    let categoryFilter = [];
    if (selectedVibe === 'calm') categoryFilter = ['craft'];
    if (selectedVibe === 'active') categoryFilter = ['sports', 'dance'];
    if (selectedVibe === 'cuisine') categoryFilter = ['cuisine'];

    // 1. Run Deterministic Engine First (Instant, Verified Results)
    const matches = matchExperiences({
      experiences,
      sessionSlots,
      currentLocation: currentGps,
      currentTime,
      timeAvailableMinutes: parsedTime,
      maxBudget: budget === 'any' ? null : Number(budget),
      selectedCategories: categoryFilter,
      beginnerFriendly: false
    });

    const itinerary = buildSimpleItinerary(matches, budget === 'any' ? null : Number(budget), parsedTime, currentTime);
    setItineraryResult(itinerary);
    setCalculating(false);

    // 2. Trigger Asynchronous AI Concierge Explanation (Non-blocking)
    setAiLoading(true);
    try {
      const { data: aiResponse, error } = await supabase.functions.invoke('moment-match-explainer', {
        body: {
          natural_query: naturalQuery,
          current_gps: currentGps,
          itinerary,
          alternatives: itinerary.alternatives
        }
      });

      if (!error && aiResponse?.success && aiResponse?.data) {
        setAiData(aiResponse.data);
      } else {
        throw new Error(error?.message || 'Failed to fetch AI explanation');
      }
    } catch (err) {
      console.warn('AI Concierge fallback triggered:', err);
      // Fallback display
      setAiData({
        reply: `Curated specifically to match your verified schedule around ${currentGps.name}.`,
        highlights: [
          `Aligned with your requested time frame (~${parsedTime / 60} hours)`,
          `Verified against real-time database slot availability`,
          `Integrated with travel buffers and local distance math`
        ],
        alternative_note: itinerary?.alternatives?.[0] ? `Alternative nearby: ${itinerary.alternatives[0].experience.title}` : ''
      });
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-medium">Loading cultural database...</div>;
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Wand2 className="w-3.5 h-3.5 text-amber-700" />
          Point AI Concierge & Vibe Matcher
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Plan Your Experience</h1>
        <p className="text-stone-600 mt-2 max-w-xl mx-auto text-sm">
          Select your vibe and write your plan in plain English. Deterministic engine verifies safety; Qwen-2.5 shapes the narrative.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-5">
          <h2 className="font-bold text-stone-900 flex items-center gap-2 text-base">
            <Wand2 className="w-4 h-4 text-amber-600" />
            Vibe & Intent Engine
          </h2>

          {/* Vibe Selection Tabs */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">Select Experience Vibe</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'all', label: 'All', icon: Compass },
                { id: 'calm', label: 'Calm', icon: Palette },
                { id: 'active', label: 'Active', icon: Zap },
                { id: 'cuisine', label: 'Cuisine', icon: Coffee }
              ].map(v => {
                const IconComponent = v.icon;
                const isSelected = selectedVibe === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVibe(v.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition ${
                      isSelected 
                        ? 'bg-amber-600 border-amber-600 text-white shadow-sm' 
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-stone-500'}`} />
                    <span className="text-[10px]">{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Natural Query (Include Duration)</label>
            <textarea 
              rows="3"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-medium"
              placeholder="e.g., I have 5 hours left near my current location..."
            />
          </div>

          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-wider">GPS Status</span>
              <span className="text-xs text-stone-700 font-medium">{gpsStatus}</span>
            </div>
            <button
              type="button"
              onClick={handleManualGPSRequest}
              disabled={gpsLoading}
              className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-amber-200 shadow-sm transition"
            >
              <Navigation className="w-3 h-3" />
              {gpsLoading ? 'Locating...' : 'Refresh'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Start Time
            </label>
            <input 
              type="time" 
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 font-medium focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Max Budget
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[500, 1000, 1500, 'any'].map(b => (
                <button
                  key={String(b)}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={`py-2 rounded-xl text-xs font-semibold transition ${
                    budget === b 
                      ? 'bg-amber-600 text-white shadow-sm' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {b === 'any' ? 'Any' : `₹${b}`}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePlan}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
          >
            <Compass className="w-4 h-4" />
            Ask Point AI Concierge
          </button>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7 space-y-6">
          {calculating && <PlanLoadingState />}

          {!calculating && !hasSearched && (
            <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-3 shadow-sm">
              <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-amber-600">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">Your AI Concierge is ready</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Select your experience vibe, write your time window, and click <strong>“Ask Point AI Concierge”</strong>.
              </p>
            </div>
          )}

          {!calculating && hasSearched && itineraryResult && itineraryResult.itineraryType === 'none' && (
            <NoPlanResults onAdjust={() => setNaturalQuery('I have 4 hours, what can I do?')} />
          )}

          {!calculating && hasSearched && itineraryResult && itineraryResult.itineraryType !== 'none' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Point AI Conversational Agent Response Component */}
              <PointConciergeResponse aiData={aiData} loading={aiLoading} />

              {/* Verified Deterministic Timeline Listing */}
              <ManipurMomentTimeline result={itineraryResult} currentLocation={currentGps.name} />

              {itineraryResult.alternatives && itineraryResult.alternatives.length > 0 && (
                <div>
                  <h3 className="font-bold text-stone-900 text-sm mb-3">Other Verified Alternatives Nearby</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {itineraryResult.alternatives.map((alt, idx) => (
                      <PlanAlternativeCard key={idx} alternative={alt} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}