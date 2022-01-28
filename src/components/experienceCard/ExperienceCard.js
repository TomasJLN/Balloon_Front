import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import Experience from '../../pages/experience/Experience';
import './experience-card.css';
import { useNavigate } from 'react-router-dom';

export const ExperienceCard = ({ exp }) => {
  const coords = exp.coords.replace(/\s+/g, '');
  const url = `https://www.google.es/maps/@${coords},19z`;
  const navigate = useNavigate();
  console.log(exp);
  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/experience/${exp.id}`);
      }}
    >
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exp.photo}`}
        alt={exp.title}
        className="card-thumbnail"
      />
      <div className="card-details">
        <h2 className="card-title">{exp.title}</h2>
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
        <p className="card-price">{exp.price} €</p>
      </div>
    </div>
  );
};
