import React, { useState } from 'react';
import fetcher from '../../helpers/fetcher';
import { useSearchExperience } from '../../hooks/useSearchExperience';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './featured.css';

const ExperienceResults = ({ experience = 'delf' }) => {
  console.log('lo que nos llega ', experience);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState(null);

  const results = fetcher(
    setFilteredResults,
    setError,
    `allFilter?experience=${experience}`,
    {}
  );

  return (
    <div className="card-deck">
      {results.map((expe) => (
        <ExperienceCard key={expe.ID} exp={expe} />
      ))}
    </div>
  );
};

export default ExperienceResults;
