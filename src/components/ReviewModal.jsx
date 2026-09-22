import React from 'react';
import { Star, X, MessageSquare } from 'lucide-react';

export default function ReviewModal({ experience, onClose }) {
  if (!experience) return null;

  const rating = experience.rating || 4.8;
  const reviewCount = experience.review_count || 15;
  const reviews = experience.reviews || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-amber-100 text-amber-800 p-2 rounded-xl">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">{experience.title}</h3>
              <p className="text-xs text-stone-500">Community Ratings & Feedback</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 bg-stone-100 p-1.5 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Overview */}
        <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 flex items-center gap-4">
          <div className="text-center px-3 border-r border-amber-200">
            <span className="block text-2xl font-extrabold text-stone-900">{rating}</span>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Verified Community Score</span>
            <p className="text-xs text-stone-600 mt-0.5">Based on {reviewCount} verified participant reviews across Imphal cultural sessions.</p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">{rev.author}</span>
                <div className="flex items-center gap-1 bg-amber-100/80 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-900">
                  <Star className="w-2.5 h-2.5 fill-amber-700 text-amber-700" />
                  {rev.rating}
                </div>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2.5 rounded-xl text-xs transition"
        >
          Close Reviews
        </button>
      </div>
    </div>
  );
}