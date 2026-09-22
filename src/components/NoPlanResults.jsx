import React from 'react';
import { AlertCircle, PlusCircle, IndianRupee, Smile, RefreshCw } from 'lucide-react';

export default function NoPlanResults({ onAdjust }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
      <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-red-600">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-stone-900 text-base mb-1">No prototype session fits all of your constraints right now.</h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Try adjusting your time window, increasing your budget, or broadening your activity filters to find available sessions.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <button
          onClick={() => onAdjust('time')}
          className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5 text-amber-600" /> Add 1 more hour
        </button>
        <button
          onClick={() => onAdjust('budget')}
          className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
        >
          <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Increase budget (₹1,500)
        </button>
        <button
          onClick={() => onAdjust('calm')}
          className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
        >
          <Smile className="w-3.5 h-3.5 text-amber-600" /> Show calmer options
        </button>
        <button
          onClick={() => onAdjust('all')}
          className="bg-stone-900 hover:bg-stone-800 text-amber-50 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Show all experiences
        </button>
      </div>
    </div>
  );
}