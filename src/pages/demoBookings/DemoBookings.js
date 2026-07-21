import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  FaCalendarAlt,
  FaClock,
  FaEuroSign,
  FaFlask,
  FaHistory,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaTrashAlt,
  FaUsers,
} from 'react-icons/fa';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import { formatDate } from '../../helpers/formatDate';
import {
  getDemoBookings,
  removeDemoBooking,
} from '../../helpers/demoBookings';
import { useUserBookings } from '../../hooks/useUserBookings';
import './demo-bookings.css';

const DemoBookings = () => {
  const [token] = useContext(TokenContext);
  const [user] = useContext(UserContext);
  const [sessionBookings, setSessionBookings] = useState(getDemoBookings);
  const accountBookings = useUserBookings(null, token);

  const sortedAccountBookings = useMemo(
    () =>
      [...accountBookings].sort(
        (a, b) => new Date(b.dateExperience) - new Date(a.dateExperience),
      ),
    [accountBookings],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!token) {
    return <Navigate to="/account" state={{ from: '/profile' }} replace />;
  }

  if (!user.role) {
    return <div className="loading"><h1>Cargando...</h1></div>;
  }

  if (user.role !== 'user') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleCancel = (ticket) => {
    setSessionBookings(removeDemoBooking(ticket));
    toast.info('Reserva simulada eliminada de esta sesión.');
  };

  return (
    <section className="demo-bookings-page">
      <div className="demo-bookings-container">
        <div className="demo-bookings-header">
          <div>
            <p className="demo-bookings-kicker">
              <FaFlask aria-hidden="true" /> Área de demostración
            </p>
            <h1>Mis reservas demo</h1>
            <p>
              Hola, {user.name}. Aquí puedes consultar tanto las simulaciones
              de esta sesión como el histórico ficticio de la cuenta demo.
            </p>
          </div>
          <div
            className="demo-bookings-count"
            aria-label={`${sessionBookings.length + sortedAccountBookings.length} reservas visibles`}
          >
            <FaTicketAlt aria-hidden="true" />
            <strong>{sessionBookings.length + sortedAccountBookings.length}</strong>
            <span>reservas visibles</span>
          </div>
        </div>

        <section className="demo-bookings-section" aria-labelledby="session-bookings-title">
          <div className="demo-bookings-section-heading">
            <div>
              <p className="demo-bookings-kicker">Sesión actual</p>
              <h2 id="session-bookings-title">Reservas que has simulado</h2>
            </div>
            <span>{sessionBookings.length}</span>
          </div>

          <div className="demo-bookings-session-note">
            <FaClock aria-hidden="true" />
            Estas reservas solo existen en este navegador y desaparecerán al
            cerrar la pestaña. No tienen validez comercial.
          </div>

          {sessionBookings.length === 0 ? (
            <div className="demo-bookings-empty demo-bookings-empty--compact">
              <FaCalendarAlt aria-hidden="true" />
              <h3>Todavía no has simulado ninguna reserva</h3>
              <p>Explora una experiencia y completa el proceso de demostración.</p>
              <Link to="/" className="demo-bookings-primary">
                Explorar experiencias
              </Link>
            </div>
          ) : (
            <div className="demo-bookings-grid">
              {sessionBookings.map((booking) => (
                <article className="demo-booking-card" key={booking.ticket}>
                  <figure>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${booking.photo || 'NA.png'}`}
                      alt={booking.title}
                    />
                    <span>Reserva simulada</span>
                  </figure>

                  <div className="demo-booking-content">
                    <p className="demo-booking-ticket">
                      <FaTicketAlt aria-hidden="true" /> {booking.ticket}
                    </p>
                    <h3>{booking.title}</h3>
                    <p className="demo-booking-location">
                      <FaMapMarkerAlt aria-hidden="true" /> {booking.location}
                    </p>

                    <dl className="demo-booking-details">
                      <div>
                        <dt><FaCalendarAlt aria-hidden="true" /> Fecha</dt>
                        <dd>{booking.dateExperience}</dd>
                      </div>
                      <div>
                        <dt><FaUsers aria-hidden="true" /> Participantes</dt>
                        <dd>{booking.quantity}</dd>
                      </div>
                      <div>
                        <dt><FaEuroSign aria-hidden="true" /> Total simulado</dt>
                        <dd>{Number(booking.totalPrice).toFixed(2)} €</dd>
                      </div>
                      <div>
                        <dt>Método</dt>
                        <dd>{booking.payMethod}</dd>
                      </div>
                    </dl>

                    <div className="demo-booking-actions">
                      <Link
                        to={`/booking/${booking.idExperience}`}
                        className="demo-bookings-primary"
                      >
                        Ver experiencia
                      </Link>
                      <button
                        type="button"
                        className="demo-bookings-remove"
                        onClick={() => handleCancel(booking.ticket)}
                      >
                        <FaTrashAlt aria-hidden="true" />
                        Cancelar simulación
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="demo-bookings-section" aria-labelledby="account-history-title">
          <div className="demo-bookings-section-heading">
            <div>
              <p className="demo-bookings-kicker">
                <FaHistory aria-hidden="true" /> Cuenta maria.lopez@demo.com
              </p>
              <h2 id="account-history-title">Reservas e histórico demostrativo</h2>
            </div>
            <span>{sortedAccountBookings.length}</span>
          </div>
          <p className="demo-bookings-section-copy">
            Son datos ficticios preparados para mostrar cómo sería el área de
            cliente. No se pueden modificar ni cancelar.
          </p>

          {sortedAccountBookings.length === 0 ? (
            <div className="demo-bookings-empty demo-bookings-empty--compact">
              <FaHistory aria-hidden="true" />
              <h3>No hay reservas históricas disponibles</h3>
              <p>Comprueba que el servidor de demostración esté conectado.</p>
            </div>
          ) : (
            <div className="demo-history-grid">
              {sortedAccountBookings.map((booking) => {
                const isPast = new Date(booking.dateExperience) < new Date();

                return (
                  <article className="demo-history-card" key={booking.ticket}>
                    <figure>
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${booking.photo || 'NA.png'}`}
                        alt={booking.title}
                      />
                      <span>{isPast ? 'Histórico demo' : 'Próxima demo'}</span>
                    </figure>
                    <div className="demo-history-content">
                      <p className="demo-booking-ticket">
                        <FaTicketAlt aria-hidden="true" /> {booking.ticket}
                      </p>
                      <h3>{booking.title}</h3>
                      <p className="demo-booking-location">
                        <FaMapMarkerAlt aria-hidden="true" /> {booking.location}
                      </p>
                      <dl className="demo-history-details">
                        <div>
                          <dt>Fecha de la experiencia</dt>
                          <dd>{formatDate(booking.dateExperience, 'dd/MM/yyyy')}</dd>
                        </div>
                        <div>
                          <dt>Participantes</dt>
                          <dd>{booking.quantity || '—'}</dd>
                        </div>
                        <div>
                          <dt>Total ficticio</dt>
                          <dd>
                            {booking.totalPrice === undefined
                              ? '—'
                              : `${Number(booking.totalPrice).toFixed(2)} €`}
                          </dd>
                        </div>
                      </dl>
                      <Link
                        to={`/booking/${booking.idExperience}`}
                        className="demo-bookings-secondary"
                      >
                        Ver experiencia
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default DemoBookings;
