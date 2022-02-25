import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './other-booking.css';

export const OtherBooking = ({ oq, handleCancelBooking }) => {
  const navigate = useNavigate();
  return (
    <div className="wrap-booking">
      <div className="header-booking">
        <p>Reserva: {oq.ticket}</p>
        <p>Fecha Reserva: {moment(oq.dateExperience).format('YYYY-MM-DD')}</p>
      </div>
      <p className="title-booking">{oq.title}</p>
      <div className="options-booking">
        <figure className="photo-booking">
          {oq.photo ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${oq.photo}`}
              alt={oq?.title}
              className="card-img-booking"
              onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
              alt={oq?.title}
              className="card-img-booking"
              onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
            />
          )}
        </figure>
        <div className="btns-bookings">
          <button
            className="btn-booking"
            onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
          >
            Detalles
          </button>
          <button
            id={moment().format() > oq.dateExperience ? 'vota' : 'no-vota'}
            className="btn-booking"
            onClick={(e) => navigate(`/review/${oq.ticket}`)}
          >
            Valorar
          </button>
          <button
            className="btn-booking"
            onClick={(e) => handleCancelBooking(e, oq.ticket)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
