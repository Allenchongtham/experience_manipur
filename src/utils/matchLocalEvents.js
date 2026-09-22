import { LOCAL_EVENTS } from '../data/localEventsData';

export function matchLocalEvents(userQuery) {
  if (!userQuery || typeof userQuery !== 'string') {
    return { mode: 'both', allEvents: LOCAL_EVENTS, reason: 'Showing all available events.' };
  }

  const query = userQuery.toLowerCase().trim();
  
  const folkKeywords = ['folk', 'traditional', 'peena', 'pena', 'acoustic', 'chill', 'calm', 'heritage', 'culture', 'song', 'family'];
  const rockKeywords = ['rock', 'metal', 'heavy', 'loud', 'concert', 'gig', 'guitar', 'underground', 'student', 'youth', 'fast'];

  let folkScore = 0;
  let rockScore = 0;

  folkKeywords.forEach(word => {
    if (query.includes(word)) folkScore += 2;
  });

  rockKeywords.forEach(word => {
    if (query.includes(word)) rockScore += 2;
  });

  // Check vibe tags directly
  LOCAL_EVENTS[0].vibeTags.forEach(tag => {
    if (query.includes(tag)) folkScore += 1;
  });

  LOCAL_EVENTS[1].vibeTags.forEach(tag => {
    if (query.includes(tag)) rockScore += 1;
  });

  if (folkScore > rockScore) {
    return {
      mode: 'single',
      matchedEvent: LOCAL_EVENTS[0],
      reason: `Matched based on your interest in traditional, acoustic, or calm cultural settings.`
    };
  } else if (rockScore > folkScore) {
    return {
      mode: 'single',
      matchedEvent: LOCAL_EVENTS[1],
      reason: `Matched based on your interest in high-energy rock, metal, or gig culture.`
    };
  } else {
    // If ambiguous or equal score
    return {
      mode: 'both',
      allEvents: LOCAL_EVENTS,
      reason: `Your request covers multiple vibes, so here are both our featured live music sessions in Imphal.`
    };
  }
}