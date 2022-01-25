import { useEffect, useState } from 'react';
import { TokenContext } from '../contexts/TokenContext';
import fetcher from '../helpers/fetcher';

export const useGetUserProfile = (token) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-http://localhost:4000/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setUser, 'user', {
      headers: {
        Authorization: token,
      },
    });
  }, [token]);

  return user;
};
