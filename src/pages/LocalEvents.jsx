import React, { useState } from 'react';
import { Sparkles, Compass, MapPin, Music, Calendar, Clock, IndianRupee } from 'lucide-react';
import { matchLocalEvents } from '../utils/matchLocalEvents';
import { generateLocalEventResponse } from '../utils/generateLocalEventResponse';

export default function LocalEvents() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'agent',
      heading: 'Welcome to Imphal Live Music Concierge',
      explanation: 'Tell us what kind of live music you’re in the mood for. Try searching things like:',
      suggestions: [
        '“traditional folk music tonight”',
        '“heavy rock concert this weekend”',
        '“something chill and acoustic”'
      ],
      events: []
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    const match = matchLocalEvents(userText);
    const response = generateLocalEventResponse(match, userText);

    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'agent', ...response }
    ]);

    setQuery('');
  };

  const handleSuggestionClick = (suggestionText) => {
    const cleanText = suggestionText.replace(/[“”]/g, '');
    setQuery(cleanText);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FDFBF7] text-stone-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5" /> Agentic RAG Concierge
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900">Local Events in Imphal</h1>
            <p className="text-xs text-stone-500">Discover authentic live music performances curated for travelers.</p>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="space-y-6">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              
              {msg.sender === 'user' ? (
                <div className="bg-amber-800 text-white rounded-2xl rounded-br-none px-4 py-3 text-xs shadow-sm max-w-[85%]">
                  {msg.text}
                </div>
              ) : (
                <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> Point Agent Response
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900">{msg.heading}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{msg.explanation}</p>

                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {msg.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(s)}
                          className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs px-3 py-1.5 rounded-xl font-medium transition"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Event Cards Grid */}
                  {msg.events && msg.events.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                      {msg.events.map((ev) => (
                        <div key={ev.id} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                                {ev.type === 'folk' ? 'Traditional Folk' : 'Rock & Metal'}
                              </span>
                              <span className="text-xs font-extrabold text-stone-900 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                                {ev.cost}
                              </span>
                            </div>
                            <h4 className="font-bold text-stone-900 text-sm">{ev.title}</h4>
                            <p className="text-[11px] text-stone-600 line-clamp-2">{ev.description}</p>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs text-stone-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-amber-700" />
                              <span>{ev.date} • {ev.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-700" />
                              <span className="truncate">{ev.venue}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSearch} className="bg-white border border-stone-200 rounded-2xl p-2 shadow-sm flex items-center gap-2 sticky bottom-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. I love heavy music and want a rock concert tonight..."
            className="flex-1 px-4 py-2.5 text-xs text-stone-900 focus:outline-hidden"
          />
          <button
            type="submit"
            className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Find Events
          </button>
        </form>

      </div>
    </div>
  );
}