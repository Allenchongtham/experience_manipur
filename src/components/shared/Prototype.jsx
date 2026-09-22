import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Prototype() {
  return (
    <div className="bg-amber-100/50 border border-amber-200 text-amber-900 px-4 py-3 rounded-lg flex items-start gap-3 text-sm mb-6">
      <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
      <p>
        <strong>Prototype Mode:</strong> All listings, schedules, prices, host details, and availability are sample data for demonstration purposes only. Do not make real travel plans based on this data.
      </p>
    </div>
  );
}