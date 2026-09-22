// Location presets with demo coordinates in Imphal
export const LOCATION_PRESETS = {
  'Kangla Fort': { name: 'Kangla Fort', lat: 24.8170, lng: 93.9360 },
  'Imphal City Centre': { name: 'Imphal City Centre', lat: 24.8150, lng: 93.9400 },
  'Ima Keithel': { name: 'Ima Keithel', lat: 24.8110, lng: 93.9370 },
  'Imphal Airport': { name: 'Imphal Airport', lat: 24.7630, lng: 93.8970 }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getTravelBufferMinutes(distanceKm) {
  if (distanceKm <= 2) return 20;
  if (distanceKm <= 5) return 30;
  return 45;
}

export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(':');
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

export function minutesToTime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function matchExperiences({
  experiences = [],
  sessionSlots = [],
  currentLocation = LOCATION_PRESETS['Kangla Fort'],
  currentTime = '13:30',
  timeAvailableMinutes = 240,
  maxBudget = null,
  selectedCategories = [],
  beginnerFriendly = false
}) {
  const currentMin = timeToMinutes(currentTime);
  const maxEndMin = currentMin + timeAvailableMinutes;
  const validMatches = [];
  const locCoords = currentLocation || LOCATION_PRESETS['Kangla Fort'];

  const hoursDisplay = timeAvailableMinutes >= 60 
    ? `${(timeAvailableMinutes / 60).toFixed(timeAvailableMinutes % 60 === 0 ? 0 : 1)}-hour` 
    : `${timeAvailableMinutes}-minute`;

  // 1. Evaluate Scheduled Experiences
  sessionSlots.forEach(slot => {
    const exp = experiences.find(e => e.id === slot.experience_id);
    if (!exp) return;
    if (slot.status !== 'available' || slot.available_seats <= 0) return;
    if (maxBudget !== null && Number(exp.price) > Number(maxBudget)) return;

    if (selectedCategories.length > 0) {
      const matchCat = selectedCategories.some(cat => {
        if (cat === 'handloom' || cat === 'craft') return exp.category === 'handloom' || exp.category === 'craft';
        if (cat === 'participate') return exp.category === 'dance' || exp.category === 'sports';
        if (cat === 'cuisine') return exp.category === 'cuisine';
        return exp.category === cat;
      });
      if (!matchCat) return;
    }

    if (beginnerFriendly && !exp.beginner_friendly) return;

    const dist = calculateDistance(locCoords.lat, locCoords.lng, exp.latitude, exp.longitude);
    const travelBuffer = getTravelBufferMinutes(dist);
    const startMin = timeToMinutes(slot.start_time);
    const endMin = timeToMinutes(slot.end_time);

    if (startMin < currentMin + travelBuffer) return;
    if (endMin > maxEndMin) return;

    const reasons = [
      `Fits within your ${hoursDisplay} window`,
      ...(dist <= 3 ? [`Short travel distance (~${dist.toFixed(1)} km from ${locCoords.name})`] : []),
      ...(Number(exp.price) <= (maxBudget || 1500) ? [`Within budget (₹${exp.price})`] : []),
      ...(exp.beginner_friendly ? ['Beginner-friendly guidance'] : [])
    ];

    validMatches.push({
      type: 'scheduled',
      experience: exp,
      slot,
      distanceKm: dist,
      travelBufferMinutes: travelBuffer,
      startMinutes: startMin,
      endMinutes: endMin,
      startTimeStr: slot.start_time.slice(0, 5),
      endTimeStr: slot.end_time.slice(0, 5),
      matchScore: calculateScore(exp, dist, Number(exp.price)),
      reasons
    });
  });

  // 2. Evaluate Walk-in / Taste Local
  experiences.forEach(exp => {
    if (exp.experience_type !== 'walk_in' && exp.category !== 'cuisine') return;
    if (maxBudget !== null && Number(exp.price) > Number(maxBudget)) return;

    if (selectedCategories.length > 0 && !selectedCategories.includes('cuisine') && !selectedCategories.includes('Taste Local')) {
      return;
    }

    const dist = calculateDistance(locCoords.lat, locCoords.lng, exp.latitude, exp.longitude);
    const travelBuffer = getTravelBufferMinutes(dist);
    const visitDuration = exp.estimated_visit_minutes || 60;
    const startMin = currentMin + travelBuffer;
    const endMin = startMin + visitDuration;

    if (endMin > maxEndMin) return;

    validMatches.push({
      type: 'walk_in',
      experience: exp,
      slot: null,
      distanceKm: dist,
      travelBufferMinutes: travelBuffer,
      startMinutes: startMin,
      endMinutes: endMin,
      startTimeStr: minutesToTime(startMin),
      endTimeStr: minutesToTime(endMin),
      matchScore: calculateScore(exp, dist, Number(exp.price)),
      reasons: ['Flexible walk-in tasting option', `Approx. ${visitDuration} mins duration`, `~${dist.toFixed(1)} km from ${locCoords.name}`]
    });
  });

  validMatches.sort((a, b) => b.matchScore - a.matchScore);
  return validMatches;
}

function calculateScore(exp, distanceKm, price) {
  let score = 100;
  score -= distanceKm * 5;
  score -= price * 0.05;
  if (exp.beginner_friendly) score += 10;
  return score;
}

export function buildSimpleItinerary(matches, maxBudget, timeAvailableMinutes, currentTime) {
  if (!matches || matches.length === 0) {
    return { itineraryType: 'none', primary: null, secondary: null, alternatives: [] };
  }

  const primary = matches[0];
  const remainingBudget = maxBudget !== null ? maxBudget - Number(primary.experience.price) : 99999;
  const shouldTryDual = timeAvailableMinutes >= 180 && matches.length >= 2;

  if (shouldTryDual) {
    const secondary = matches.slice(1).find(m => {
      if (m.experience.id === primary.experience.id) return false;
      const requiredBuffer = Math.max(15, m.travelBufferMinutes || 15);
      const minStartNext = primary.endMinutes + requiredBuffer;
      return m.startMinutes >= minStartNext && Number(m.experience.price) <= remainingBudget;
    });

    if (secondary) {
      const totalCost = Number(primary.experience.price) + Number(secondary.experience.price);
      return {
        itineraryType: 'dual',
        primary,
        secondary,
        bufferBetweenMinutes: secondary.startMinutes - primary.endMinutes,
        totalCost,
        totalDurationMinutes: secondary.endMinutes - primary.startMinutes,
        alternatives: matches.filter(m => m !== primary && m !== secondary).slice(0, 2)
      };
    }
  }

  return {
    itineraryType: 'single',
    primary,
    secondary: null,
    totalCost: Number(primary.experience.price),
    totalDurationMinutes: primary.endMinutes - primary.startMinutes,
    alternatives: matches.slice(1, 3)
  };
}