import React from 'react';
import { useFeatures } from '../../hooks/useFeatures';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './featured.css';

const Featured = () => {
  const featured = useFeatures();

  return (
    <div className="card-deck">
      {featured.map((cat) => (
        <ExperienceCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
};

export default Featured;
