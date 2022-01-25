import React, { createContext, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useSessionStorage('token', 'PEPE');

  useEffect(() => {
    sessionStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};
