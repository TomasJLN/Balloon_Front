import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';
import { miniFetcher } from '../../helpers/fetcher';
import { useBookingDetails } from '../../hooks/useBookingDetails';
import { useBookingQRs } from '../../hooks/useBookingQRs';
import { useUserBookings } from '../../hooks/useUserBookings';

import './booking-details.css';

export const BookingDetails = () => {
  const { ticket } = useParams();
  const [token, setToken] = useContext(TokenContext);
  const [cancelStatus, setCancelStatus] = useState(null);

  const exDetails = useBookingDetails(ticket, token);
  const QRs = useBookingQRs(ticket, token);
  const othersBookings = useUserBookings(ticket, token);

  const handleCancelBooking = (e, ticket) => {
    e.preventDefault();
    console.log(ticket);
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
    cancelStatus && alert(cancelStatus[0]);
    setCancelStatus(null);
  }, [cancelStatus]);

  return (
    <div>
      <h1>Su compra de realizó satisfactoriamente</h1>
      {exDetails?.photo ? (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exDetails.photo}`}
          alt={exDetails?.title}
          className="card-thumbnail"
        />
      ) : (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
          alt={exDetails?.title}
          className="card-thumbnail"
        />
      )}
      <div className="booking-details">
        <p>{exDetails?.title}</p>
        <p>{exDetails?.ticket}</p>
        <p>{exDetails?.description}</p>
        <p>{exDetails?.createdAt}</p>
        <p>{exDetails?.dateExperience}</p>
      </div>
      <hr />
      <div className="qr-booking">
        <h2>Descargar ticket</h2>
        {QRs.map((q) =>
          q.qrPicture ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${q.qrPicture}`}
              alt={q.qrPicture?.title}
              className="card-thumbnail"
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
              alt={q?.qrPicture}
              className="card-thumbnail"
            />
          )
        )}
      </div>
      <hr />
      <div>
        <h2> Otras reservas del usuario</h2>
        <br />
        <div>
          {/* Pasar a componente */}
          {othersBookings.map((oq) => {
            return (
              <div className="other-card">
                <p className="btns-other-bookings">
                  {oq.ticket} {oq.title}
                </p>
                <div className="other-info">
                  {oq.photo ? (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${oq.photo}`}
                      alt={oq?.title}
                      className="card-thumbnail"
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                      alt={oq?.title}
                      className="card-thumbnail"
                    />
                  )}
                  <div className="btns-other-bookings">
                    <button
                      id={
                        moment().format() > oq.dateExperience
                          ? 'vota'
                          : 'no-vota'
                      }
                      className="btn-other-bookings"
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
          })}
        </div>
      </div>
    </div>
  );
};
