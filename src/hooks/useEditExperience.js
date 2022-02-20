import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useEditExperience = (id, token) => {
  const [experience, setExperience] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(setExperience, setError, setLoading, `experience/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }, [id, token]);

  return { experience, loading, error };
};
