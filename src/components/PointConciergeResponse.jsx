import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PointConciergeResponse({ aiData, loading }) {
  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/60 to-white border border-amber-200 rounded-2xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Point AI Concierge
        </div>
        <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">
          {loading ? 'Thinking...' : 'Qwen-2.5 Live'}
        </span>
      </div>

      {loading ? (
        <div className="py-4 text-center text-xs text-stone-500 animate-pulse font-medium">
          Point is shaping your plan...
        </div>
      ) : aiData ? (
        <>
          <h3 className="font-extrabold text-stone-900 text-base">
            {aiData.headline || aiData.reply?.slice(0, 50)}
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            {aiData.recommendation || aiData.reply}
          </p>

          {aiData.highlights && aiData.highlights.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-amber-200/50">
              {aiData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-800 font-medium">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {aiData.alternative_note && (
            <p className="text-[11px] text-stone-500 italic pt-1">
              {aiData.alternative_note}
            </p>
          )}
        </>
      ) : null}

      <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-100 italic">
        Plan based on prototype session data and your selected preferences.
      </div>
    </div>
  );
}