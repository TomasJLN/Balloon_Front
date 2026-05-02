import { formatDate } from "../../helpers/formatDate";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { OtherBooking } from "../../components/otherBooking/OtherBooking";
import { QrTicket } from "../../components/qr_ticket/QrTicket";
import { TokenContext } from "../../contexts/TokenContext";
import { miniFetcher } from "../../helpers/fetcher";
import { useBookingDetails } from "../../hooks/useBookingDetails";
import { useBookingQRs } from "../../hooks/useBookingQRs";
import { useUserBookings } from "../../hooks/useUserBookings";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaQrcode, FaReceipt } from "react-icons/fa";

import "./booking-details.css";

export const BookingDetails = () => {
  const { ticket } = useParams();
  const [token] = useContext(TokenContext);
  const [cancelStatus, setCancelStatus] = useState(null);

  const exDetails = useBookingDetails(ticket, token);
  const QRs = useBookingQRs(ticket, token);
  const othersBookings = useUserBookings(ticket, token);

  const handleCancelBooking = (e, ticket) => {
    e.preventDefault();
    const cancelBooking = async () => {
      setCancelStatus(
        await miniFetcher(`booking/${ticket}`, {
          method: "DELETE",
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
    <section className="booking-details-page">
      <div className="booking-details-container">
        <header className="booking-details-hero">
          <figure>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exDetails?.photo || "NA.png"}`}
              alt={exDetails?.title || "Reserva"}
            />
          </figure>

          <div className="booking-details-summary">
            <p className="booking-details-kicker">Resumen de tu pedido</p>
            <h1>{exDetails?.title}</h1>
            <div className="booking-details-chips">
              <span>
                <FaReceipt /> Pedido {exDetails?.ticket || ticket}
              </span>
              <span>
                <FaMapMarkerAlt /> {exDetails?.location || "Ubicación pendiente"}
              </span>
            </div>
            <p>{exDetails?.description}</p>
          </div>
        </header>

        <section className="booking-details-panel">
          <div className="booking-details-section-title">
            <FaCalendarAlt />
            <h2>Datos de la reserva</h2>
          </div>
          <div className="booking-details-grid">
            <div>
              <span>Fecha experiencia</span>
              <strong>{formatDate(exDetails?.dateExperience, "yyyy-MM-dd")}</strong>
            </div>
            <div>
              <span>Fecha de reserva</span>
              <strong>{formatDate(exDetails?.createdAt, "yyyy-MM-dd")}</strong>
            </div>
            <div>
              <span>Número de pedido</span>
              <strong>{exDetails?.ticket || ticket}</strong>
            </div>
          </div>
        </section>

        <section className="booking-details-panel">
          <div className="booking-details-section-heading">
            <div className="booking-details-section-title">
              <FaQrcode />
              <h2>Códigos QR de participantes</h2>
            </div>
            <p>Descarga cada QR y conserva la referencia para el día de la experiencia.</p>
          </div>

          <div className="qr-booking">
            {QRs.length > 0 ? (
              QRs.map((q, index) => <QrTicket key={q?.qrPicture || index} q={q} />)
            ) : (
              <p className="booking-details-empty">No hay códigos QR disponibles para esta reserva.</p>
            )}
          </div>
        </section>

        <div className="back-to-profile">
          <Link
            to="/profile#reservas"
            onClick={() => {
              setTimeout(() => {
                document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            <button className="booking-details-secondary">
              <FaArrowLeft /> Mis reservas
            </button>
          </Link>
        </div>

        <section className="booking-details-panel">
          <div className="booking-details-section-title">
            <FaReceipt />
            <h2>Otras reservas del usuario</h2>
          </div>
          <div className="other-bookings-wrap">
            {othersBookings.length > 0 ? (
              othersBookings.map((oq) => (
                <OtherBooking
                  oq={oq}
                  key={oq.id}
                  handleCancelBooking={handleCancelBooking}
                />
              ))
            ) : (
              <p className="booking-details-empty">No hay otras reservas disponibles.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};
