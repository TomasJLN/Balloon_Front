import React from 'react';
import { useFeatured } from '../../hooks/useFeatured';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './featured.css';

const Featured = () => {
  const featured = useFeatured();

  return (
    <div className="card-deck">
      {featured.map((cat) => (
        <ExperienceCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
};

export default Featured;
