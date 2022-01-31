import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFiltered } from '../../hooks/useFiltered';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './show-results.css';

const ShowResults = () => {
  const location = useLocation();

  const q = location.search;

  const query = q;

  const { filtered, loading } = useFiltered(query);

  console.log('los filtrados ', filtered);

  return (
    <>
      {loading ? (
        <h1 className="loading fade_in">Loading...</h1>
      ) : (
        <div className="card-deck">
          {filtered.length > 0 ? (
            filtered.map((exp) => <ExperienceCard key={exp.ID} exp={exp} />)
          ) : (
            <h1 className="info fade_in">No se encontraron resultados</h1>
          )}
        </div>
      )}
    </>
  );
};

export default ShowResults;
