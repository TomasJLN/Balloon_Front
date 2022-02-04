import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useGetUserProfile = (token) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(setUser, setError, setLoading, 'user', {
      headers: {
        Authorization: token,
      },
    });
  }, [token]);

  return user;
};
