import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useAdminCat = (id, token, setLoading, setError) => {
  const [cat, setCat] = useState({});

  useEffect(() => {
    fetcher(setCat, setError, setLoading, `category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }, [id, token, setLoading, setError]);

  return { cat };
};
