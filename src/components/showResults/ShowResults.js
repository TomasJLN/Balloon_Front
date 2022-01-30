import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFiltered } from '../../hooks/useFiltered';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './show-results.css';

const ShowResults = () => {
  const location = useLocation();

  const q = location.search;

  const query = q;

  const filtered = useFiltered(query);
  return (
    <div className="card-deck">
      {filtered.map((exp) => (
        <ExperienceCard key={exp.ID} exp={exp} />
      ))}
    </div>
  );
};

export default ShowResults;
