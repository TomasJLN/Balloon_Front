import React from 'react';
import { useFiltered } from '../../hooks/useFiltered';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './featured.css';

const Featured = () => {
  const featured = useFiltered();

  console.log('todo', featured);

  return (
    <div className="card-deck">
      {featured.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} />
      ))}
    </div>
  );
};

export default Featured;
