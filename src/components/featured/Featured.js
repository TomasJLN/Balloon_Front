import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './featured.css';

const Featured = () => {
  const categories = useCategories();

  return (
    <div className="card-deck">
      {categories.map((cat) => (
        <ExperienceCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
};

export default Featured;
