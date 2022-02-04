import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Accordion from '../../components/accordion/Accordion';
import { useExperience } from '../../hooks/useExperience';
import './experience-reserve.css';
import { getTomorrow } from '../../helpers/getTomorrow';
import fetcher from '../../helpers/fetcher';

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
    totalPlaces,
    conditions,
    normatives,
  } = useExperience(id);

  const [numTickets, setNumTickets] = useState(1);
  const [bookingDate, setBookingDate] = useState(getTomorrow());
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(id, bookingDate);
  let maxFreePlaces = 10;

  useEffect(() => {
    fetcher(
      setPlaces,
      setError,
      setLoading,
      `filters/occupied?experienceID=${id}&date=${bookingDate}`,
      {}
    );
    setNumTickets(1);
  }, [bookingDate, id, maxFreePlaces]);

  const { occupied } = places[0] || { occupied: 0 };

  occupied > 0
    ? (maxFreePlaces = totalPlaces - occupied)
    : (maxFreePlaces = totalPlaces);

  let infoExperience = [];
  infoExperience.push({ title: 'Condiciones', content: conditions });
  infoExperience.push({ title: 'Normativas', content: normatives });

  const navigate = useNavigate();

  const handleSubtractTicket = () => {
    if (numTickets > 1) setNumTickets(numTickets - 1);
  };

  const handleAddTicket = () => {
    if (numTickets < maxFreePlaces) setNumTickets(numTickets + 1);
  };

  const handleTicket = (e) => {
    if (e.target.value > maxFreePlaces) setNumTickets(maxFreePlaces);
    else {
      setNumTickets(e.target.value.replace(/\D/, ''));
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="reserved-card">
          <div className="test">
            <div>
              {photo ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
                  alt={title}
                  className="exp-picture"
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                  alt={title}
                  className="exp-picture"
                />
              )}
            </div>
            <div className="title-description">
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
          <hr />
          <form>
            <div>
              <label htmlFor="date">Escoger Fecha</label>
              <input
                type="text"
                name="date"
                id="date"
                value={bookingDate}
                placeholder="Escoger fecha"
                onChange={(e) => {
                  setBookingDate(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="quantity">Cantidad</label>
              <button type="button" onClick={handleSubtractTicket}>
                -
              </button>
              <input
                type="text"
                name="quantity"
                id="quantity"
                value={numTickets}
                onChange={handleTicket}
              />
              <button type="button" onClick={handleAddTicket}>
                +
              </button>
            </div>
          </form>

          <h2 id="precio">{price} €</h2>
          <div className="ratin-comprar">
            <p>🌟🌟🌟🌟🌟</p>
            <button className="btn-comprar">Comprar</button>
          </div>
          <div className="accordion-section">
            {infoExperience.map(({ title, content }) => (
              <Accordion key={title} title={title} content={content} />
            ))}
          </div>
          <div className="back-div">
            <button
              className="btn-back"
              onClick={() => {
                navigate(-1);
                console.log('un click');
              }}
            >
              ↩️ back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;
