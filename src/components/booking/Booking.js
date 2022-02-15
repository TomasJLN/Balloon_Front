import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Accordion from '../accordion/Accordion';
import { useExperience } from '../../hooks/useExperience';
import fetcher from '../../helpers/fetcher';
import { TokenContext } from '../../contexts/TokenContext';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import 'react-multi-date-picker/styles/layouts/mobile.css';

import './booking.css';
import { GiToaster } from 'react-icons/gi';

const Booking = () => {
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
  const [bookingDate, setBookingDate] = useState(
    new DateObject().add(1, 'days')
  );
  const [places, setPlaces] = useState([]);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);

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

  const handleNewBooking = (e) => {
    e.preventDefault();
    setResult('');
    const createBooking = async () => {
      await fetcher(setResult, setError, setLoading, 'booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          dateExperience:
            typeof bookingDate === 'string'
              ? bookingDate
              : bookingDate.format(),
          quantity: numTickets,
          idExperience: id,
        }),
      });
    };
    !usuario.role && navigate('/account');
    usuario.role === 'user' && createBooking();
    usuario.role === 'admin' &&
      toast.error('Un administrador no puede\nhacer reservas...');
  };

  useEffect(() => {
    result.length > 1 && navigate(`/bookingDetail/${result}`);
  }, [result, setResult, navigate]);

  useEffect(() => {
    if (error !== null) toast.error('algo salió mal... ', error);
    return () => {
      setError(null);
    };
  }, [error]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="reserved-card">
          <h1> ESTO YA ES LA RESERVA</h1>
          <div className="test">
            <div className="photo-thumbnail">
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
              <p className="description-text">{description}</p>
            </div>
          </div>
          <hr />
          <form>
            <div id="select-date">
              <label htmlFor="date">Escoger Fecha</label>
              <DatePicker
                value={bookingDate}
                onChange={setBookingDate}
                editable={false}
                minDate={new DateObject().add(1, 'days')}
              />
            </div>
            <div id="select-quantity">
              <label htmlFor="quantity">Cantidad</label>
              <button
                type="button"
                className="button-quantity"
                onClick={handleSubtractTicket}
              >
                -
              </button>
              <input
                type="text"
                name="quantity"
                id="quantity"
                className="input-quantity"
                value={numTickets}
                onChange={handleTicket}
              />
              <button
                type="button"
                className="button-quantity"
                onClick={handleAddTicket}
              >
                +
              </button>
              {<h5>Máximo disponible de: {maxFreePlaces}</h5>}
            </div>
          </form>

          <h2 className="precio">Precio: {price} €</h2>
          <h1 className="precio">Total: {(price * numTickets).toFixed(2)} €</h1>
          <div className="ratin-comprar">
            <p>🌟🌟🌟🌟🌟</p>
            <button className="btn-comprar" onClick={handleNewBooking}>
              RESERVAR
            </button>
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

export default Booking;
