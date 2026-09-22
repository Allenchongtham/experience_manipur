import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PlanLoadingState() {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
      <div className="relative w-12 h-12 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-amber-200 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-4 border-amber-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-amber-600">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-stone-900 text-sm">Checking cultural experiences...</h3>
        <p className="text-xs text-stone-500">Matching time, budget, and activity preferences...</p>
        <p className="text-[11px] text-amber-700 font-medium">Building your Manipur Moment...</p>
      </div>
    </div>
  );
}