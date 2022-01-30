import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFeatured } from '../../hooks/useFeatured';
import { ExperienceCard } from '../experienceCard/ExperienceCard';
import './show-results.css';
import queryString from 'query-string';

const ShowResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location en ShowResults ', location.search);
  // const { experience = '' } = queryString.parse(location.search);
  const que = location.search;
  // const query = queryString.parse(location.search);

  console.log('lo que vamos a enviar a useFeatured ', que);
  const consulta = que;
  // console.log('en showresults es ', experience);
  console.log(consulta);
  const filtered = useFeatured(consulta);
  return (
    <div className="card-deck">
      {filtered.map((exp) => (
        <ExperienceCard key={exp.ID} exp={exp} />
      ))}
    </div>
  );
};

export default ShowResults;
