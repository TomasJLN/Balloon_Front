import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useFeatured = () => {
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-${process.env.REACT_APP_BACKEND_URL}/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setFeatures, setError, 'filters/featured', {});
  }, []);

  return features;
};
