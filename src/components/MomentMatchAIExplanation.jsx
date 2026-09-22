import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { fetchMomentMatchExplanation } from '../lib/momentMatchExplainerApi';

export default function MomentMatchAIExplanation({ context, topMatch, alternative }) {
  const [loading, setLoading] = useState(true);
  const [explanationData, setExplanationData] = useState(null);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const loadExplanation = async () => {
    if (!topMatch) return;
    setLoading(true);
    const result = await fetchMomentMatchExplanation(context, topMatch, alternative);
    setExplanationData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadExplanation();
  }, [topMatch]);

  const handleRefresh = async () => {
    if (hasRefreshed) return;
    setHasRefreshed(true);
    await loadExplanation();
  };

  if (!topMatch) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-stone-50 border border-amber-200/60 rounded-2xl p-5 shadow-sm mb-6 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Moment Match AI
        </div>
        
        {!loading && (
          <button
            onClick={handleRefresh}
            disabled={hasRefreshed}
            className={`text-[11px] font-medium flex items-center gap-1 text-stone-500 hover:text-stone-800 transition ${
              hasRefreshed ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            title={hasRefreshed ? 'Refreshed once for this result' : 'Refresh explanation'}
          >
            <RefreshCw className="w-3 h-3" />
            Refresh explanation
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-6 text-center text-xs text-stone-500 font-medium animate-pulse">
          Personalising your Moment Match…
        </div>
      ) : (
        <div className="space-y-2 animate-fadeIn">
          <h3 className="font-bold text-stone-900 text-base">
            {explanationData?.explanation?.headline}
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            {explanationData?.explanation?.recommendation}
          </p>
          {explanationData?.explanation?.alternative_note && (
            <p className="text-[11px] text-stone-500 italic pt-1 border-t border-stone-100">
              {explanationData.explanation.alternative_note}
            </p>
          )}
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-amber-100/60 text-[10px] text-stone-400">
        Explanation based on your selected preferences and prototype host-curated experience data.
      </div>
    </div>
  );
}