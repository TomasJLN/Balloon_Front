import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useGetUserProfile = (token) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher(setUser, setError, 'user', {
      headers: {
        Authorization: token,
      },
    });
  }, [token]);

  return user;
};
