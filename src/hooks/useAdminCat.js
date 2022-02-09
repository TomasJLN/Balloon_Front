import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useAdminCat = (id, token) => {
  const [cat, setCat] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(setCat, setError, setLoading, `category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }, [id, token]);

  return { cat, loading, error };
};
