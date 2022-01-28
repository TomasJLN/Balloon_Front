import { useEffect, useState } from 'react';
import { TokenContext } from '../contexts/TokenContext';
import fetcher from '../helpers/fetcher';

export const useGetUserProfile = (token) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-${process.env.REACT_APP_BACKEND_URL}/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setUser, setError, 'user', {
      headers: {
        Authorization: token,
      },
    });
  }, [token]);

  return user;
};
