import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useBookingDetails = (ticket, token) => {
  const [bookingDetail, setBookingDetail] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(ticket);

  useEffect(() => {
    fetcher(setBookingDetail, setError, setLoading, `booking/view/${ticket}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }, [ticket, token]);

  return bookingDetail[0];
};
