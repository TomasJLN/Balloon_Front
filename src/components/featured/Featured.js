import React from 'react';
import { ExperienceCard2 } from '../experienceCard2/ExperienceCard2';
import { useCategories } from '../../hooks/useCategories';
// import { ExperienceCard } from './experienceCard/ExperienceCard';
import './featured.css';

const Featured = () => {
  const categories = useCategories();

  return (
    <div className="card-deck">
      {categories.map((cat) => (
        <ExperienceCard2 key={cat.id} cat={cat} />
      ))}
    </div>
  );
};

export default Featured;
