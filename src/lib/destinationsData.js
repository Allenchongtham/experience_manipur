export const STATIC_DESTINATIONS = [
  {
    id: '1',
    name: 'Loktak Lake',
    category: ['Nature & Eco-Tourism'],
    district: 'Bishnupur',
    location_label: 'Moirang region, Bishnupur district',
    latitude: 24.5574,
    longitude: 93.8016,
    image_url: 'https://images.unsplash.com/photo-1626015493091-13768b64ce01?auto=format&fit=crop&w=1200&q=80',
    short_description: 'A major freshwater lake in Manipur, known for distinctive floating biomass formations called phumdis.',
    source_name: 'Manipur Tourism'
  },
  {
    id: '2',
    name: 'Kangla Fort',
    category: ['Heritage'],
    district: 'Imphal West',
    location_label: 'Imphal city',
    latitude: 24.8170,
    longitude: 93.9360,
    image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    short_description: 'The ancient citadel and traditional seat of the Meitei rulers.',
    source_name: 'Incredible India'
  },
  {
    id: '3',
    name: 'Ima Keithel',
    category: ['Markets & Culture'],
    district: 'Imphal West',
    location_label: 'Imphal city',
    latitude: 24.8110,
    longitude: 93.9370,
    image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80',
    short_description: 'A unique historic women-only marketplace in Imphal.',
    source_name: 'Manipur Tourism'
  },
  {
    id: '4',
    name: 'Keibul Lamjao National Park',
    category: ['Nature & Eco-Tourism'],
    district: 'Bishnupur',
    location_label: 'Near Loktak Lake',
    latitude: 24.4750,
    longitude: 93.7650,
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    short_description: 'The world’s only floating national park.',
    source_name: 'Manipur Tourism'
  },
  {
    id: '5',
    name: 'Mapal Kangjeibung',
    category: ['Sports Heritage'],
    district: 'Imphal West',
    location_label: 'Imphal city',
    latitude: 24.8070,
    longitude: 93.9360,
    image_url: 'https://images.unsplash.com/photo-1517649763962-0c6232662000?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Recognized as the world’s oldest living polo ground.',
    source_name: 'Manipur Tourism'
  },
  {
    id: '6',
    name: 'Khonghampat Orchidarium',
    category: ['Nature & Eco-Tourism'],
    district: 'Imphal West',
    location_label: 'Khonghampat',
    latitude: 24.8900,
    longitude: 93.9100,
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    short_description: 'A botanical garden showcasing indigenous orchid species.',
    source_name: 'Manipur Tourism'
  },
  {
    id: '7',
    name: 'Shirui Hills',
    category: ['Nature & Eco-Tourism', 'Adventure'],
    district: 'Ukhrul',
    location_label: 'Ukhrul district',
    latitude: 25.1150,
    longitude: 94.4450,
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Scenic highland peaks renowned for trekking and the Shirui Lily.',
    source_name: 'Manipur Tourism'
  },
  {
    id: '8',
    name: 'Andro',
    category: ['Culture'],
    district: 'Imphal East',
    location_label: 'Andro area',
    latitude: 24.7650,
    longitude: 94.0200,
    image_url: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=1200&q=80',
    short_description: 'A historic heritage village known for traditional pottery.',
    source_name: 'Manipur Tourism'
  }
];

export async function fetchDestinations() {
  // Simulating async fetch matching fetchExperiences pattern safely
  return STATIC_DESTINATIONS;
}