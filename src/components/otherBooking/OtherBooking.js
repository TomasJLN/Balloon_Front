import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './other-booking.css';

export const OtherBooking = ({ oq, handleCancelBooking }) => {
  const navigate = useNavigate();
  return (
    <div key={oq.id} className="other-card">
      <p className="btns-other-bookings">
        {oq.ticket} {oq.title}
      </p>
      <div key={oq.id} className="other-info">
        {oq.photo ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${oq.photo}`}
            alt={oq?.title}
            className="card-thumbnail"
            onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
          />
        ) : (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
            alt={oq?.title}
            className="card-thumbnail"
            onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
          />
        )}
        <div className="btns-other-bookings">
          <button
            id={moment().format() > oq.dateExperience ? 'vota' : 'no-vota'}
            className="btn-other-bookings"
            onClick={(e) => navigate(`/review/${oq.ticket}`)}
          >
            Valorar
          </button>
          <button
            className="btn-other-bookings"
            onClick={(e) => handleCancelBooking(e, oq.ticket)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
