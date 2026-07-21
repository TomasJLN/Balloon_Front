import { createContext, useCallback, useState } from 'react';

export const TokenContext = createContext();
export const DEMO_TOKEN_KEY = 'balloon-demo-token';

export const TokenContextProvider = ({ children }) => {
  const [token, setTokenState] = useState(
    () => sessionStorage.getItem(DEMO_TOKEN_KEY) || '',
  );

  const setToken = useCallback((nextToken) => {
    setTokenState((currentToken) => {
      const value =
        typeof nextToken === 'function' ? nextToken(currentToken) : nextToken;
      const normalizedToken = value || '';

      if (normalizedToken) {
        sessionStorage.setItem(DEMO_TOKEN_KEY, normalizedToken);
      } else {
        sessionStorage.removeItem(DEMO_TOKEN_KEY);
      }

      return normalizedToken;
    });
  }, []);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};
