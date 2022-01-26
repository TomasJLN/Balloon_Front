import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import './experience-card.css';

export const ExperienceCard = ({ cat }) => {
  const coords = cat.coords.replace(/\s+/g, '');
  const url = `https://www.google.es/maps/@${coords},19z`;
  return (
    <div className="card">
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${cat.photo}`}
        alt={cat.title}
        className="card-thumbnail"
      />
      <div className="card-details">
        <h2 className="card-title">{cat.title}</h2>
        {
          <p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="card-location"
            >
              <FaSearchLocation className="icon-search" />
              UBICACIóN
            </a>
          </p>
        }
        <p>
          <span className="card-rating">🌟🌟🌟🌟</span>
        </p>
        <p className="card-price">{cat.price} €</p>
      </div>
    </div>
  );
};
