import { createContext, useContext, useEffect, useState } from 'react';
import { miniFetcher } from '../helpers/fetcher';
import { TokenContext } from './TokenContext';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    let active = true;

    if (!token) {
      setUsuario({});
      return () => {
        active = false;
      };
    }

    const getUser = async () => {
      const user = await miniFetcher('user', {
        headers: { Authorization: token },
      });

      if (!active) return;

      const isValidUser =
        user &&
        typeof user === 'object' &&
        ['admin', 'user', 'viewer'].includes(user.role);

      if (isValidUser) {
        setUsuario(user);
        return;
      }

      setUsuario({});
      setToken('');
    };

    getUser();

    return () => {
      active = false;
    };
  }, [token, setToken]);

  return (
    <UserContext.Provider value={[usuario, setUsuario]}>
      {children}
    </UserContext.Provider>
  );
};
