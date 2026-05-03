import { formatDate } from "../../helpers/formatDate";
import { useNavigate } from "react-router";
import { FaCalendarAlt, FaInfoCircle, FaStar, FaTicketAlt, FaTimes } from "react-icons/fa";
import "./other-booking.css";
import React, { useEffect } from "react";

export const OtherBooking = ({ oq, handleCancelBooking }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [oq]);

  const navigate = useNavigate();
  const isPastExperience = new Date(oq.dateExperience) < new Date();
  const bookingDetailPath = `/bookingDetail/${oq.ticket}`;
  const reviewPath = `/review/${oq.ticket}`;

  return (
    <article className="booking-card fade_in">
      <figure className="booking-card-media" onClick={() => navigate(bookingDetailPath)}>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${oq.photo || "NA.png"}`}
          alt={oq?.title}
          className="booking-card-image"
        />
        <figcaption
          className={`booking-card-badge ${
            isPastExperience ? "booking-card-badge-review" : "booking-card-badge-upcoming"
          }`}
        >
          {isPastExperience ? "Experiencia por valorar" : "Reserva próxima"}
        </figcaption>
      </figure>

      <div className="booking-card-body" onClick={() => navigate(bookingDetailPath)}>
        <h3 className="booking-card-title">
          {oq.title.length > 100 ? `${oq.title.slice(0, 100)}...` : oq.title}
        </h3>

        <div className="booking-card-meta">
          <span>
            <FaTicketAlt aria-hidden="true" />
            Reserva {oq.ticket}
          </span>
          <span>
            <FaCalendarAlt aria-hidden="true" />
            {formatDate(oq.dateExperience, "yyyy-MM-dd")}
          </span>
        </div>
      </div>

      <div className="booking-card-actions">
        <button
          className="booking-card-button booking-card-button-secondary"
          onClick={() => navigate(bookingDetailPath)}
        >
          <FaInfoCircle aria-hidden="true" />
          Detalles
        </button>
        <button
          id={new Date().toISOString() > oq.dateExperience ? "vota" : "no-vota"}
          className="booking-card-button booking-card-button-primary"
          onClick={() => navigate(reviewPath)}
        >
          <FaStar aria-hidden="true" />
          Valorar
        </button>
        <button
          className="booking-card-button booking-card-button-danger"
          onClick={(e) => {
            handleCancelBooking(e, oq.ticket);
            navigate(`/profile#reservas`);
          }}
        >
          <FaTimes aria-hidden="true" />
          Cancelar
        </button>
      </div>
    </article>
  );
};
