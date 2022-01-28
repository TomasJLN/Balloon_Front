import React from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '../../components/accordion/Accordion';
import { useExperience } from '../../hooks/useExperience';
import './experience.css';

const Experience = () => {
  const { id } = useParams();
  const {
    category,
    title,
    description,
    price,
    location,
    coords,
    photo,
    endDate,
    conditions,
    normatives,
  } = useExperience(id);

  let infoExperience = [];
  infoExperience.push({ title: 'Condiciones', content: conditions });
  infoExperience.push({ title: 'Normativas', content: conditions });

  console.log(infoExperience);
  return (
    <div className="single-card">
      <h1>{title}</h1>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
        alt={title}
        className="exp-picture"
      />
      <h2 id="precio">{price} €</h2>
      <p>{description}</p>
      <div className="ratin-comprar">
        <p>🌟🌟🌟🌟🌟</p>
        <button className="btn-comprar">Comprar</button>
      </div>
      <div className="accordion-section">
        {infoExperience.map(({ title, content }) => (
          <Accordion key={title} title={title} content={content} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
