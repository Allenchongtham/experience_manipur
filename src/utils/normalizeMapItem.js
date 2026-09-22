export function normalizeExperienceForMap(exp) {
  return {
    id: `exp-${exp.id}`,
    type: 'experience',
    title: exp.title || 'Untitled Experience',
    category: exp.category || 'general',
    categories: [exp.category],
    district: exp.district || 'Imphal',
    location_name: exp.location_name || exp.location_label || 'Imphal, Manipur',
    latitude: parseFloat(exp.latitude) || 24.8150,
    longitude: parseFloat(exp.longitude) || 93.9400,
    image_url: exp.image_url || '',
    description: exp.description || exp.short_description || '',
    price: exp.price || 300,
    duration_minutes: exp.duration_minutes || 60,
    source_name: exp.host?.name || 'Local Host'
  };
}

export function normalizeDestinationForMap(dest) {
  const rawCat = dest.category || dest.categories || 'Nature & Eco-Tourism';
  const categoriesArray = Array.isArray(rawCat) ? rawCat : [rawCat];
  const primaryCategory = categoriesArray[0] || 'Nature & Eco-Tourism';

  return {
    id: `dest-${dest.id}`,
    type: 'destination',
    title: dest.name || dest.title || 'Manipur Landmark',
    category: primaryCategory,
    categories: categoriesArray,
    district: dest.district || 'Manipur',
    location_name: dest.location_label || dest.location_name || 'Manipur',
    latitude: parseFloat(dest.latitude) || 24.8150,
    longitude: parseFloat(dest.longitude) || 93.9400,
    image_url: dest.image_url || '',
    description: dest.short_description || dest.description || '',
    price: dest.price || 0,
    duration_minutes: dest.duration_minutes || 90,
    source_name: dest.source_name || 'Manipur Tourism'
  };
}