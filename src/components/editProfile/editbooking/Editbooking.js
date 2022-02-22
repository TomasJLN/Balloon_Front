import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../../../contexts/TokenContext';
import { UserContext } from '../../../contexts/UserContext';
import { miniFetcher } from '../../../helpers/fetcher';
import { useUserBookings } from '../../../hooks/useUserBookings';
import { toast } from 'react-toastify';
import { OtherBookingV2 } from '../../../components/otherBookingV2/OtherBookingV2';
import './editbooking.css';

const Editbooking = () => {
  const { ticket } = useParams();
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [cancelStatus, setCancelStatus] = useState(null);
  const othersBookings = useUserBookings(ticket, token);

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
    <section>
      <div className="wrap-content">
        <h1 className="title-center">Mis reservas</h1>
        {othersBookings.map((oq) => (
          <OtherBookingV2
            oq={oq}
            key={oq.id}
            handleCancelBooking={handleCancelBooking}
          />
        ))}
      </div>

      <a href="#back">Volver a menú</a>
    </section>
  );
};

export default Editbooking;