import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useUserBookings = (ticket, token) => {
  const [otherBookings, setOtherBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setOtherBookings([]);
      return;
    }

    const setNormalizedOtherBookings = (data) => {
      setOtherBookings(Array.isArray(data) ? data : []);
    };

    fetcher(setNormalizedOtherBookings, setError, setLoading, `booking/view`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }, [ticket, token]);

  return otherBookings;
};
