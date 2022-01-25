import React, { createContext } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useSessionStorage('token', '');

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};
