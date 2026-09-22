import { supabase } from './supabase';
import { MOCK_EXPERIENCES } from './mockData';

export async function fetchExperiences() {
  try {
    const { data, error } = await supabase.from('experiences').select('*');
    
    if (error) {
      console.warn('Supabase fetch failed, falling back to mock data:', error.message);
      return MOCK_EXPERIENCES;
    }
    
    return data && data.length > 0 ? data : MOCK_EXPERIENCES;
  } catch (err) {
    console.warn('Using mock data due to network/config error:', err);
    return MOCK_EXPERIENCES;
  }
}