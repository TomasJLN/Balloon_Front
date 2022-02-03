import { useEffect, useState } from 'react';
import fetcher from '../helpers/oldFetcher';

export const usePrice = () => {
  const [price, setPrice] = useState('');

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-http://localhost:4000/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setPrice, 'experience/list', {});
  }, []);

  return price;
};
