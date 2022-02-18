import { createContext, useContext, useEffect, useState } from 'react';
import { miniFetcher } from '../helpers/fetcher';
import { TokenContext } from './TokenContext';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    if (token && token !== '') {
      const getUser = async () => {
        setUsuario(
          await miniFetcher('user', { headers: { Authorization: token } })
        );
      };
      getUser();
    }
  }, [token]);

  return (
    <UserContext.Provider value={[usuario, setUsuario]}>
      {children}
    </UserContext.Provider>
  );
};
