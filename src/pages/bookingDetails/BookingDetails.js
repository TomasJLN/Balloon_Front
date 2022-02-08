import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';
import { useBookingDetails } from '../../hooks/useBookingDetails';

import './booking-details.css';

export const BookingDetails = () => {
  const { ticket } = useParams();
  const [token, setToken] = useContext(TokenContext);
  const [detail, setDetail] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const exDetails = useBookingDetails(ticket, token);

  console.log(exDetails);

  return (
    <div>
      <h1>detalles del booking</h1>
      {ticket}
      {exDetails?.title}
    </div>
  );
};
