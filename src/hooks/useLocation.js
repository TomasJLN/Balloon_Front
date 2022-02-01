import { useEffect, useState } from 'react';
import fetcher from '../helpers/oldFetcher';

export const useLocation = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-http://localhost:4000/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setLocations, 'experience/list', {});
  }, []);

  return locations;
};
