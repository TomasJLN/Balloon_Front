import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OtherBooking } from '../../components/otherBooking/OtherBooking';
import { QrTicket } from '../../components/qr_ticket/QrTicket';
import { TokenContext } from '../../contexts/TokenContext';
import { miniFetcher } from '../../helpers/fetcher';
import { useBookingDetails } from '../../hooks/useBookingDetails';
import { useBookingQRs } from '../../hooks/useBookingQRs';
import { useUserBookings } from '../../hooks/useUserBookings';
import { toast } from 'react-toastify';
import './booking-details.css';

export const BookingDetails = () => {
  const { ticket } = useParams();
  const [token, setToken] = useContext(TokenContext);
  const [cancelStatus, setCancelStatus] = useState(null);

  const exDetails = useBookingDetails(ticket, token);
  const QRs = useBookingQRs(ticket, token);
  const othersBookings = useUserBookings(ticket, token);
  const navigate = useNavigate();

  const handleCancelBooking = (e, ticket) => {
    e.preventDefault();
    const cancelBooking = async () => {
      setCancelStatus(
        await miniFetcher(`booking/${ticket}`, {
          method: 'DELETE',
          headers: { Authorization: token },
        })
      );
    };
    cancelBooking();
  };

  useEffect(() => {
    cancelStatus && toast.success(cancelStatus);
    setCancelStatus(null);
  }, [cancelStatus]);

  return (
    <div className="wrap-content">
      <h1 className="title-center">{exDetails?.title}</h1>
      <div className="picture-back">
        <figure className="photo-booking">
          {exDetails?.photo ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exDetails.photo}`}
              alt={exDetails?.title}
              className="card-img-booking"
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
              alt={exDetails?.title}
              className="card-img-booking"
            />
          )}
          <button
            className="btn-back"
            onClick={() => {
              navigate(-1);
            }}
          >
            ↩️ back
          </button>
        </figure>
      </div>
      <div className="booking-details">
        <p>Ticket: {exDetails?.ticket}</p>
        <p>Descripción: {exDetails?.description}</p>
        <p>
          Fecha experiencia:
          {moment(exDetails?.dateExperience).format('YYYY-MM-DD')}
        </p>
        <p>
          Fecha de la reserva:{' '}
          {moment(exDetails?.createdAt).format('YYYY-MM-DD')}
        </p>
      </div>
      <hr />
      <h2>Descargar ticket</h2>
      <div className="qr-booking">
        {QRs.map((q) => (
          <QrTicket key={q.qrPicture} q={q} />
        ))}
      </div>
      <div className="back-div"></div>
      <hr />
      <div>
        <h2> Otras reservas del usuario</h2>
        <button
          className="btn-back"
          onClick={() => {
            navigate(`/profile`);
          }}
        >
          🎟️ Mis reservas
        </button>
        <div>
          {othersBookings.map((oq) => (
            <OtherBooking
              oq={oq}
              key={oq.id}
              handleCancelBooking={handleCancelBooking}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
