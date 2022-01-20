import React from 'react';
import './experience-card.css';

export const ExperienceCard = ({ cat }) => {
  const url = `https://www.google.es/maps/@${cat.coords},19z`;
  return (
    <div className="card">
      <img
        src={`http://localhost:4000/uploads/${cat.photo}`}
        alt={cat.title}
        className="card-thumbnail"
      />
      <div className="card-details">
        <h2 className="card-title">{cat.title}</h2>
        <p className="card-description">{cat.description}</p>
        {
          <p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="card-location"
            >
              UBICACION
            </a>
          </p>
        }
        <span className="card-rating">🌟🌟🌟🌟🌟</span>
        <p className="card-price">{cat.price} €</p>
      </div>
    </div>
  );
};
