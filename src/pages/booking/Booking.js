import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { toast } from 'react-toastify';
import { formatDate } from '../../helpers/formatDate';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import { addDemoBooking } from '../../helpers/demoBookings';
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
  const [, setToken] = useContext(TokenContext);
  const [user] = useContext(UserContext);
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const routeLocation = useLocation();

  const occupied = places[0]?.occupied ?? 0;
  const maxFreePlaces = occupied > 0 ? totalPlaces - occupied : totalPlaces;
  const experiencePhoto = photo || 'NA.png';
  const isPlaceholderPhoto = !photo;

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

  const handleNewBooking = () => {
    const payMethodLabels = {
      paypal: 'Paypal simulado',
      creditCard: 'Tarjeta simulada',
      bizum: 'Bizum simulado',
    };

    addDemoBooking({
      idExperience: id,
      title,
      location,
      photo: experiencePhoto,
      dateExperience: new DateObject(bookingDate).format(),
      quantity: Number(numTickets),
      totalPrice: Number(price) * Number(numTickets),
      payMethod: payMethodLabels[pay] || 'Método simulado',
    });

    setPopUp(false);
    setDisable(true);
    toast.success('Reserva demo creada para esta sesión. No se ha realizado ningún cargo.');
    navigate('/profile');
  };

  const handlePopUp = () => {
    if (user.role !== 'user') {
      setToken('');
      navigate('/account', { state: { from: routeLocation.pathname } });
      return;
    }

    setPopUp(true);
  };

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
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${experiencePhoto}`}
                  alt={title}
                  className={`exp-pic${isPlaceholderPhoto ? ' exp-pic-placeholder' : ''}`}
                />
                <img
                  src={'/imgs/soldout.png'}
                  alt={title}
                  className={`${soldOut ? 'sold-out' : 'available-places'}`}
                />
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
                    <span className="date-range">
                      <span>
                        <small>Desde</small>
                        {formatDate(startDate, 'dd-MM-yyyy')}
                      </span>
                      <span>
                        <small>Hasta</small>
                        {formatDate(endDate, 'dd-MM-yyyy')}
                      </span>
                    </span>
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
                    <strong>Disponibilidad:</strong>
                    <span className="availability-dates">
                      <span>
                        Desde <strong>{formatDate(startDate, 'dd-MM-yyyy')}</strong>
                      </span>
                      <span>
                        Hasta <strong>{formatDate(endDate, 'dd-MM-yyyy')}</strong>
                      </span>
                    </span>
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
                  <p>Método de pago simulado</p>
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
                        Simulación de Paypal
                      </option>
                      <option
                        id="creditCard"
                        name="payMethod"
                        value="creditCard"
                      >
                        Simulación de tarjeta
                      </option>
                      <option id="bizum" name="payMethod" value="bizum">
                        Simulación de Bizum
                      </option>
                    </select>
                  </div>
                  <small className="booking-demo-hint">
                    No introduzcas datos de pago. Esta selección es únicamente visual.
                  </small>
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
                    Simular reserva
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
