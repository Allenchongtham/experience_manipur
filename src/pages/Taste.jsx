import React from 'react';
import { MOCK_EXPERIENCES } from '../lib/mockData';
import ExperienceCard from '../components/shared/ExperienceCard';
import Prototype from '../components/shared/Prototype';
import { Utensils } from 'lucide-react';

export default function Taste() {
  // Filter for both 'cuisine' and 'taste' categories directly from mockData
  const tasteExperiences = MOCK_EXPERIENCES.filter(
    exp => exp.category === 'cuisine' || exp.category === 'taste'
  );

  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Utensils className="w-6 h-6 text-amber-600" />
          Taste Local
        </h2>
        <p className="text-stone-600 mt-1">Discover authentic Manipuri cuisine and local delicacies.</p>
      </div>

      <Prototype />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasteExperiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}