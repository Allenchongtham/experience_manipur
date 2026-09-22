import React from 'react';
import { MOCK_EXPERIENCES } from '../lib/mockData';
import ExperienceCard from '../components/shared/ExperienceCard';
import Prototype from '../components/shared/Prototype';
import { Palette } from 'lucide-react';

export default function CraftAndLoom() {
  // Filter for handloom and craft categories
  const craftExperiences = MOCK_EXPERIENCES.filter(
    exp => exp.category === 'handloom' || exp.category === 'craft'
  );

  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Palette className="w-6 h-6 text-amber-600" />
          Craft & Loom
        </h2>
        <p className="text-stone-600 mt-1">Discover Manipur's rich handloom and artisanal heritage.</p>
      </div>

      <Prototype />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {craftExperiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}