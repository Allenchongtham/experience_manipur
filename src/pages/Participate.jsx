import React from 'react';
import { MOCK_EXPERIENCES } from '../lib/mockData';
import ExperienceCard from '../components/shared/ExperienceCard';
import Prototype from '../components/shared/Prototype';
import { Users } from 'lucide-react';

export default function Participate() {
  // Filter for dance and sports categories
  const participateExperiences = MOCK_EXPERIENCES.filter(
    exp => exp.category === 'dance' || exp.category === 'sports'
  );

  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-600" />
          Join & Participate
        </h2>
        <p className="text-stone-600 mt-1">Immersive cultural orientations in rhythm, movement, and heritage sports.</p>
      </div>

      <Prototype />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {participateExperiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}