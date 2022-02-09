import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFiltered } from '../../hooks/useFiltered';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './show-results.css';

const ShowResults = () => {
  const expByPage = 10;

  const location = useLocation();

  const [lastIndex, setLastIndex] = useState(expByPage);

  const [btnMore, setBtnMore] = useState(false);

  const q = location.search;

  let query = q;

  query.length < 1 ? (query = '?experience=&featured=1') : (query = q);

  const { filtered, loading } = useFiltered(query);

  const pagFiltered = filtered.slice(0, lastIndex);

  useEffect(() => {
    setLastIndex(expByPage);
    setBtnMore(true);
  }, [query]);

  useEffect(() => {
    if (filtered.length > 0 && lastIndex >= filtered.length) {
      setBtnMore(false);
    }
  }, [filtered, lastIndex]);

  const handleLoadMore = () => {
    if (lastIndex > filtered.length) {
      setBtnMore(false);
    } else {
      setBtnMore(true);
      setLastIndex(lastIndex + expByPage);
    }
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <h1>Cargando...</h1>
          <div className="balloon_spinner"></div>
        </div>
      ) : (
        <>
          <div className="card-deck">
            {pagFiltered.length > 0 ? (
              pagFiltered.map((exp) => (
                <ExperienceCard key={exp.ID} exp={exp} />
              ))
            ) : (
              <h1 className="info fade_in">No se encontraron resultados</h1>
            )}
          </div>
          {btnMore && (
            <button onClick={handleLoadMore} className="show-more">
              Cargar más...
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ShowResults;
