import { supabase } from './supabase';

export async function fetchIntentParsedExplanation(naturalQuery, currentGps, availableExperiences) {
  try {
    const { data, error } = await supabase.functions.invoke('moment-match-explainer', {
      body: {
        natural_query: naturalQuery,
        current_gps: currentGps,
        available_experiences: availableExperiences,
      },
    });

    if (error) {
      console.warn('Edge function invocation warning, using fallback:', error);
      return getLocalFallbackExplanation(naturalQuery);
    }

    return data;
  } catch (err) {
    console.warn('Network or invocation failure, using fallback:', err);
    return getLocalFallbackExplanation(naturalQuery);
  }
}

function getLocalFallbackExplanation(query) {
  return {
    success: true,
    source: 'fallback',
    data: {
      extracted_filters: { time_minutes: 120, max_budget: 1000, category: 'all' },
      explanation: {
        headline: `Results for: "${query || 'Your request'}"`,
        recommendation: 'Selected based on your available time and proximity.',
        alternative_note: 'Explore alternative sessions below for a different experience style.',
      },
    },
  };
}