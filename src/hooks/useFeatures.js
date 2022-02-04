import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useFeatures = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-http://localhost:4000/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setFeatures, 'filters/featured', {});
  }, []);

  return features;
};
