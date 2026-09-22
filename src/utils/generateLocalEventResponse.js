export function generateLocalEventResponse(matchResult, userQuery) {
  if (matchResult.mode === 'single') {
    const event = matchResult.matchedEvent;
    return {
      heading: `Found the ideal match for: "${userQuery}"`,
      explanation: `Based on your request, our agent analyzed Imphal's community schedule and selected "${event.title}". It features an intensity level of "${event.intensity}" and is tailored for ${event.audience.join(', ')}.`,
      events: [event],
      cta: 'Open Google Maps for route and live navigation.'
    };
  } else {
    return {
      heading: `Live Music Events in Imphal`,
      explanation: `We found two distinct music gatherings matching your inquiry: an intimate traditional folk night and an energetic underground rock gig. Choose the one that fits your mood!`,
      events: matchResult.allEvents,
      cta: 'Open Google Maps for route and live navigation.'
    };
  }
}