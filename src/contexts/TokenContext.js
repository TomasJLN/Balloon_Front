import { createContext, useState } from 'react';

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};
