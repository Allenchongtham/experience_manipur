import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, MapPin, Bookmark, RotateCcw, Check, MessageSquare, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_EXPERIENCES } from '../lib/mockData';
import { STATIC_DESTINATIONS } from '../lib/destinationsData';

// Asset Imports
import bambooImg from '../assets/bamboo.jpeg';
import craftImg from '../assets/craft.jpeg';
import handloomImg from '../assets/handloom.jpeg';
import danceImg from '../assets/dance.jpeg';
import pungImg from '../assets/pung.jpeg';
import thangImg from '../assets/thang.jpeg';
import sagolImg from '../assets/sagol.jpeg';
import yubiImg from '../assets/yubi.jpeg';
import chahaoImg from '../assets/chahao.jpeg';
import thaliImg from '../assets/thali.jpeg';
import loktakImg from '../assets/loktak.jpeg';
import kanglaImg from '../assets/kangla.jpeg';
import keibulImg from '../assets/keibul.jpeg';
import marketImg from '../assets/market.jpeg';
import orchImg from '../assets/orch.jpeg';
import shiruiImg from '../assets/shirui.jpeg';
import androImg from '../assets/andro.jpeg';

function resolveImage(item) {
  if (!item) return craftImg;
  const title = (item.title || item.name || '').toLowerCase();
  const cat = (item.category || '').toString().toLowerCase();

  if (title.includes('bamboo')) return bambooImg;
  if (title.includes('kouna') || title.includes('craft')) return craftImg;
  if (title.includes('motif') || title.includes('handloom') || title.includes('weaving')) return handloomImg;
  if (title.includes('dance') || title.includes('ras') || title.includes('jagoi')) return danceImg;
  if (title.includes('pung') || title.includes('drum') || title.includes('cholom')) return pungImg;
  if (title.includes('thang') || title.includes('ta') || title.includes('martial')) return thangImg;
  if (title.includes('sagol') || title.includes('kangjei') || title.includes('polo')) return sagolImg;
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

  return item.image_url || item.image || craftImg;
}

export default function PointPlanner() {
  const navigate = useNavigate();
  
  const [planningMode, setPlanningMode] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: 'point',
      text: "Hi, I'm Point. Your Manipur Travel Concierge. Are you already in Manipur, or are you planning before you arrive?",
      options: [
        { label: "I’m in Manipur Now", value: 'now' },
        { label: "Plan Before I Arrive", value: 'pre_arrival' }
      ],
      field: 'mode'
    }
  ]);
  
  const [step, setStep] = useState('select_mode');
  const [wishlistItems, setWishlistItems] = useState({ destinations: [], experiences: [] });
  const [liveResults, setLiveResults] = useState([]);
  const [savedWishlist, setSavedWishlist] = useState(false);
  const [activeDetailModal, setActiveDetailModal] = useState(null);
  
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filterDataByInterest = (interestKey) => {
    const rawDestinations = Array.isArray(STATIC_DESTINATIONS) ? STATIC_DESTINATIONS : [];
    const rawExperiences = Array.isArray(MOCK_EXPERIENCES) ? MOCK_EXPERIENCES : [];

    const formattedDests = rawDestinations.map(d => ({ ...d, image_url: resolveImage(d) }));
    const formattedExps = rawExperiences.map(e => ({ ...e, image_url: resolveImage(e) }));

    if (interestKey === 'destinations') {
      return { destinations: formattedDests, experiences: [] };
    } else if (interestKey === 'craft') {
      return {
        destinations: [],
        experiences: formattedExps.filter(e => e.category === 'craft' || e.category === 'handloom')
      };
    } else if (interestKey === 'participate') {
      return {
        destinations: [],
        experiences: formattedExps.filter(e => e.category === 'dance' || e.category === 'sports')
      };
    } else if (interestKey === 'cuisine') {
      return {
        destinations: [],
        experiences: formattedExps.filter(e => e.category === 'cuisine')
      };
    }

    return {
      destinations: formattedDests.slice(0, 3),
      experiences: formattedExps
    };
  };

  const handleChoice = (optionLabel, field, value) => {
    const newMessages = [...messages, { sender: 'user', text: optionLabel }];

    if (step === 'select_mode') {
      if (value === 'now') {
        setPlanningMode('now');
        setStep('ask_live_category');
        setMessages([
          ...newMessages,
          {
            sender: 'point',
            text: "Let's design your live itinerary. What category are you interested in exploring right now?",
            options: [
              { label: 'Destinations & Nature', value: 'destinations' },
              { label: 'Craft & Loom', value: 'craft' },
              { label: 'Participate (Dance & Sports)', value: 'participate' },
              { label: 'Taste Local (Cuisine)', value: 'cuisine' },
              { label: 'Mix It Up (All)', value: 'all' }
            ],
            field: 'interest'
          }
        ]);
      } else {
        setPlanningMode('pre_arrival');
        setStep('ask_interests');
        setMessages([
          ...newMessages,
          {
            sender: 'point',
            text: "Great! Building a wish list beforehand is the best way to prepare. Which category would you like your trip to focus on?",
            options: [
              { label: 'Destinations', value: 'destinations' },
              { label: 'Craft & Loom', value: 'craft' },
              { label: 'Participate', value: 'participate' },
              { label: 'Taste Local', value: 'cuisine' },
              { label: 'All Experiences', value: 'all' }
            ],
            field: 'interests'
          }
        ]);
      }
    } else if (step === 'ask_interests') {
      setStep('show_wishlist');
      const results = filterDataByInterest(value);
      setWishlistItems(results);

      setMessages([
        ...newMessages,
        {
          sender: 'point',
          text: `Based on your choice (${optionLabel}), here are verified sessions and destinations for your upcoming trip.`,
          isWishlistResult: true
        }
      ]);
    } else if (step === 'ask_live_category') {
      setStep('show_live_results');
      const results = filterDataByInterest(value);
      const combined = [...results.destinations, ...results.experiences];
      setLiveResults(combined);

      setMessages([
        ...newMessages,
        {
          sender: 'point',
          text: `Here are matching live session stops for ${optionLabel}.`,
          isLiveResult: true
        }
      ]);
    }
  };

  const handleReset = () => {
    setPlanningMode(null);
    setStep('select_mode');
    setSavedWishlist(false);
    setLiveResults([]);
    setWishlistItems({ destinations: [], experiences: [] });
    setMessages([
      {
        sender: 'point',
        text: "Hi, I'm Point. Your Manipur Travel Concierge. Are you already in Manipur, or are you planning before you arrive?",
        options: [
          { label: "I’m in Manipur Now", value: 'now' },
          { label: "Plan Before I Arrive", value: 'pre_arrival' }
        ],
        field: 'mode'
      }
    ]);
  };

  const handleZoomMap = (lat, lng, name) => {
    navigate('/explore', { state: { targetLat: lat, targetLng: lng, targetName: name } });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FDFBF7] text-stone-900 flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT PANEL: Conversational Interface */}
      <div className="w-full lg:w-[45%] flex flex-col h-[calc(100vh-4rem)] border-r border-stone-200 bg-white">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-amber-800 text-white p-1.5 rounded-xl shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-extrabold text-stone-900 text-sm tracking-tight">Plan your Manipur trip with Point</h1>
              <p className="text-[11px] text-stone-500">Your Manipur Travel Concierge</p>
            </div>
          </div>
          {step !== 'select_mode' && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Start Over
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-800 text-white rounded-br-none shadow-sm'
                  : 'bg-stone-100 text-stone-800 rounded-bl-none border border-stone-200/60'
              }`}>
                {msg.text}
              </div>

              {msg.options && idx === messages.length - 1 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleChoice(opt.label, msg.field, opt.value)}
                      className="bg-white hover:bg-amber-50 text-stone-800 border border-stone-200 hover:border-amber-300 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        <div className="p-3 bg-stone-50 border-t border-stone-100 text-[10px] text-stone-500 text-center">
          Point uses verified destination records. Confirm practical details before visiting.
        </div>
      </div>

      {/* RIGHT PANEL: Results Panel */}
      <div className="w-full lg:w-[55%] flex flex-col h-[calc(100vh-4rem)] bg-[#FDFBF7] p-6 overflow-y-auto">
        <div className="max-w-xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                {step === 'show_wishlist' ? 'My Manipur Wish List' : step === 'show_live_results' ? 'Live Verified Itinerary' : 'Concierge Discovery Panel'}
              </h2>
              <p className="text-xs text-stone-500">
                {step === 'show_wishlist' ? 'Saved landmarks and cultural experiences for your upcoming journey.' : step === 'show_live_results' ? 'Active session stops matching your live schedule and choice.' : 'Your personalized recommendations will appear here.'}
              </p>
            </div>
            {step === 'show_wishlist' && (
              <button
                onClick={() => setSavedWishlist(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                  savedWishlist ? 'bg-emerald-700 text-white' : 'bg-amber-800 hover:bg-amber-900 text-white'
                }`}
              >
                {savedWishlist ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {savedWishlist ? 'Wish List Saved!' : 'Save Wish List'}
              </button>
            )}
          </div>

          {step !== 'show_wishlist' && step !== 'show_live_results' ? (
            <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-3 shadow-xs">
              <Compass className="w-10 h-10 text-stone-300 mx-auto animate-pulse" />
              <h3 className="font-bold text-stone-800 text-sm">Tell Point your travel plans</h3>
              <p className="text-xs text-stone-500">Select whether you are in Manipur now or planning ahead to view matching sessions.</p>
            </div>
          ) : step === 'show_wishlist' ? (
            <div className="space-y-6">
              {wishlistItems.destinations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">1. Destinations to Explore</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {wishlistItems.destinations.map((dest, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-4">
                        <img src={dest.image_url} alt={dest.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded-md">{dest.category} • {dest.district}</span>
                          <h4 className="font-bold text-stone-900 text-sm mt-1">{dest.name}</h4>
                          <p className="text-xs text-stone-600 line-clamp-1">{dest.short_description || dest.desc}</p>
                        </div>
                        <button
                          onClick={() => handleZoomMap(dest.latitude, dest.longitude, dest.name)}
                          className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" /> View on Map
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {wishlistItems.experiences.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">2. Cultural & Activity Sessions</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {wishlistItems.experiences.map((exp, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
                        <div className="flex items-start gap-4">
                          <img src={exp.image_url} alt={exp.title} className="w-20 h-20 rounded-xl object-cover shrink-0 bg-stone-100" />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                                Session • {exp.category}
                              </span>
                              <span className="text-sm font-extrabold text-stone-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                                ₹{exp.price || 300}
                              </span>
                            </div>
                            <h4 className="font-bold text-stone-900 text-sm">{exp.title}</h4>
                            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-amber-700" />
                              <span>{exp.location_name || 'Imphal Cultural Center'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                          <button
                            onClick={() => handleZoomMap(exp.latitude || 24.8170, exp.longitude || 93.9360, exp.title)}
                            className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5" /> View on Map
                          </button>
                          <button
                            onClick={() => setActiveDetailModal(exp)}
                            className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> View Details & WhatsApp
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {liveResults.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-start gap-4">
                    <img src={item.image_url} alt={item.title || item.name} className="w-20 h-20 rounded-xl object-cover shrink-0 bg-stone-100" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                          Stop #{idx + 1} • {item.category}
                        </span>
                        <span className="text-sm font-extrabold text-stone-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          ₹{item.price || 0}
                        </span>
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm">{item.title || item.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-700" />
                        <span>{item.location_name || item.location_label || 'Imphal'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                    <button
                      onClick={() => handleZoomMap(item.latitude || 24.8170, item.longitude || 93.9360, item.title || item.name)}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" /> View on Map
                    </button>
                    <button
                      onClick={() => setActiveDetailModal(item)}
                      className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> View Details & WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Modal */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase">{activeDetailModal.category}</span>
                <h3 className="font-extrabold text-stone-900 text-base">{activeDetailModal.title || activeDetailModal.name}</h3>
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
                <p className="text-stone-600">Duration: {activeDetailModal.duration_minutes || 60} minutes</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-1">
                <span className="font-bold text-stone-800 block text-[11px] uppercase">Host & Location</span>
                <p className="text-stone-600">{activeDetailModal.location_name || activeDetailModal.location_label}</p>
                <p className="text-stone-600 font-medium">Price: ₹{activeDetailModal.price || 0} per participant</p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
              <a
                href={`https://wa.me/919876543210?text=Hello,%20I%20would%20like%20to%20inquire%20about%20booking%20${encodeURIComponent(activeDetailModal.title || activeDetailModal.name)}`}
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