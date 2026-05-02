import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { toast } from 'react-toastify';
import { formatDate } from '../../helpers/formatDate';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import { useExperience } from '../../hooks/useExperience';
import fetcher from '../../helpers/fetcher';
import { useGetReviews } from '../../hooks/useGetReviews';
import { Reviews } from '../../components/reviews/Reviews';
import { CarouselSimilar } from '../../components/carouselSimilar/CarouselSimilar';
import Mapa from '../../components/Mapa';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCalendarAlt, FaEuroSign, FaMapMarkerAlt, FaTicketAlt, FaUsers } from 'react-icons/fa';
import PopUpBooking from './PopUpBooking';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import './booking.css';
import '../experience/experience.css';

const Booking = () => {
  const { id } = useParams();
  const { reviews } = useGetReviews(id);

  const {
    idCategory,
    title,
    description,
    price,
    location,
    coords,
    photo,
    startDate,
    endDate,
    totalPlaces,
    conditions,
    normatives,
  } = useExperience(id);

  const url = `https://www.google.es/maps/@${coords},19z`.replace(/ +/g, '');

  const [places, setPlaces] = useState([]);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [pay, setPay] = useState(null);
  const [avgRatin, setAvgRatin] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [disable, setDisable] = useState(true);
  const [storage, setStorage] = useState({
    selectDate:
      JSON.parse(sessionStorage.getItem('selectDate')) ||
      new DateObject().add(1, 'days'),
    nTickets: JSON.parse(sessionStorage.getItem('nTickets')) || 1,
  });
  const [numTickets, setNumTickets] = useState(storage.nTickets);
  const [bookingDate, setBookingDate] = useState(storage.selectDate);
  const [soldOut, setSoldOut] = useState(false);
  const navigate = useNavigate();

  const occupied = places[0]?.occupied ?? 0;
  const maxFreePlaces = occupied > 0 ? totalPlaces - occupied : totalPlaces;

  useEffect(() => {
    setDisable(true);
    const dateF = new DateObject(bookingDate).format();
    fetcher(
      setPlaces,
      setError,
      setLoading,
      `filters/occupied?experienceID=${id}&date=${dateF}`,
      {},
    );
    sessionStorage.setItem('selectDate', JSON.stringify(bookingDate));
    soldOut && sessionStorage.removeItem('nTickets', JSON.stringify(1));
  }, [bookingDate, id, soldOut]);

  useEffect(() => {
    maxFreePlaces > 0 &&
      numTickets > maxFreePlaces &&
      toast.info('Plazas insuficientes en este día');
  }, [maxFreePlaces, numTickets]);

  useEffect(() => {
    sessionStorage.setItem('nTickets', JSON.stringify(numTickets));
  }, [numTickets, setNumTickets]);

  useEffect(() => {
    maxFreePlaces < 1 ? setSoldOut(true) : setSoldOut(false);
  }, [soldOut, maxFreePlaces]);

  const infoExperience = [
    { title: 'Condiciones', content: conditions },
    { title: 'Normativas', content: normatives },
  ];

  const handleSubtractTicket = () => {
    if (numTickets > 1) {
      setNumTickets(numTickets - 1);
    }
  };

  const handleAddTicket = () => {
    if (numTickets < maxFreePlaces) {
      setNumTickets(numTickets + 1);
    }
  };

  const handleTicket = (e) => {
    if (e.target.value > maxFreePlaces) {
      setNumTickets(maxFreePlaces);
    } else {
      setNumTickets(e.target.value.replace(/\D/, ''));
    }
  };

  const handleNewBooking = (e) => {
    setResult('');
    if (pay) {
      const createBooking = async () => {
        await fetcher(setResult, setError, setLoading, 'booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            dateExperience: new DateObject(bookingDate).format(),
            quantity: numTickets,
            idExperience: id,
          }),
        });
      };
      createBooking();
    }
  };
  const handlePopUp = () => {
    !usuario.role && navigate('/account');
    usuario.role === 'user' && setPopUp(true);
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

  useEffect(() => {
    reviews.length !== 0 &&
      setAvgRatin(
        reviews.reduce((acc, exp) => acc + exp.score, 0) / reviews.length,
      );
    reviews.length === 0 && setAvgRatin(0);
  }, [reviews]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <h1 className="spinner-container">Cargando...</h1>
      ) : (
        <div className="wrap-content booking-page">
          <div className="experience-data">
            <div className="initial-wrap experience-overview">
              <div className="photo-thumbnail">
                {photo ? (
                  <>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
                      alt={title}
                      className="exp-pic"
                    />
                    <img
                      src={'/imgs/soldout.png'}
                      alt={title}
                      className={`${soldOut ? 'sold-out' : 'available-places'}`}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                      alt={title}
                      className="exp-pic"
                    />
                    <img
                      src={'/imgs/soldout.png'}
                      alt={title}
                      className={`${soldOut ? 'sold-out' : 'available-places'}`}
                    />
                  </>
                )}
              </div>

              <div className="title-description">
                <p className="experience-kicker">Ver experiencia</p>
                <h2>{title}</h2>
                <p className="description-text">{description}</p>
                <div className="experience-highlights">
                  <span>
                    <FaMapMarkerAlt aria-hidden="true" />
                    {location}
                  </span>
                  <span>
                    <FaCalendarAlt aria-hidden="true" />
                    {formatDate(startDate, 'dd-MM-yyyy')} -{' '}
                    {formatDate(endDate, 'dd-MM-yyyy')}
                  </span>
                  <span>
                    <FaUsers aria-hidden="true" />
                    {maxFreePlaces < 1 ? 'Agotada' : `${maxFreePlaces} plazas`}
                  </span>
                </div>
                <ul className="normatives-list">
                  <li>
                    <strong>Localización:</strong>
                    <a href={url} target="blank">
                      {' '}
                      {location}
                    </a>
                  </li>
                  <li>
                    <strong>Disponibilidad:</strong> Desde{' '}
                    <strong>{formatDate(startDate, 'dd-MM-yyyy')}</strong> hasta{' '}
                    <strong>{formatDate(endDate, 'dd-MM-yyyy')}</strong>
                  </li>

                  <li>
                    <strong>Plazas disponibles</strong>:{' '}
                    {maxFreePlaces < 1 ? 'AGOTADAS' : maxFreePlaces}
                  </li>

                  {infoExperience.map(({ title, content }) => (
                    <li key={title}>
                      <strong>{title}</strong>: {content}
                    </li>
                  ))}
                </ul>
                <div className="precio-unidad">
                  <FaEuroSign aria-hidden="true" />
                  <p>{price}</p>
                </div>
              </div>
            </div>
            <div className="info-checkout-container">
              <form className="booking-form">
                <div id="select-date">
                  <label htmlFor="date">Escoger Fecha</label>
                  <DatePicker
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '120px',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      border: 'none',
                      boxShadow: '2px 2px 4px grey',
                    }}
                    id="date"
                    value={bookingDate}
                    onChange={setBookingDate}
                    editable={false}
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                  />
                </div>
                <div className="tickets-booking">
                  <label htmlFor="quantity">
                    <FaTicketAlt aria-hidden="true" />
                    Tickets
                  </label>
                  <div id="select-quantity">
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
                  </div>
                  {}
                </div>
                <div className="pay-method">
                  <p>Forma de pago</p>
                  <div
                    className="pay-option"
                    onChange={(e) => {
                      setPay(e.target.value);
                      !soldOut &&
                        maxFreePlaces >= numTickets &&
                        setDisable(false);
                    }}
                  >
                    <select className="booking-select">
                      <option value=""> Seleccionar</option>
                      <option id="paypal" name="payMethod" value="paypal">
                        Paypal
                      </option>
                      <option
                        id="creditCard"
                        name="payMethod"
                        value="creditCard"
                      >
                        Tarjeta de crédito
                      </option>
                      <option id="bizum" name="payMethod" value="bizum">
                        Bizum
                      </option>
                    </select>
                  </div>
                </div>
                <div className="check-out">
                  <div style={{ display: 'flex' }}>
                    <p>Total :</p> {(price * numTickets).toFixed(2)} €
                  </div>
                  <button
                    className={
                      disable ? 'generalButton-disabled' : 'generalButton'
                    }
                    disabled={disable}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePopUp();
                    }}
                  >
                    Reservar
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="rating-back">
            <button
              className="btn-back"
              onClick={() => {
                navigate(-1);
              }}
              aria-label="Volver"
            >
              <FiArrowLeft className="btn-back-icon" />
              <span className="btn-back-text">Volver</span>
            </button>
          </div>
          <div className="ratin-info">
            {avgRatin !== 0 ? (
              <Reviews id={id} reviews={reviews} />
            ) : (
              <h2 id="ex-sim">Experiencia sin valoraraciones</h2>
            )}
          </div>
          <h2 id="map-title">¿Cómo llegar?</h2>
          <Mapa photo={photo} title={title} coords={coords} url={url} />

          <div>
            <h2 id="ex-sim">Otras experiencias que podrían interesarte</h2>
            <div>
              <CarouselSimilar
                id={id}
                reviews={reviews}
                avgRatin={avgRatin}
                idCategory={idCategory}
              />
            </div>
          </div>
          <div className="booking-popup">
            {popUp && pay && (
              <PopUpBooking
                bookingInfo={{
                  price,
                  location,
                  title,
                  photo,
                  numTickets,
                }}
                setPopUp={setPopUp}
                handleNewBooking={handleNewBooking}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
