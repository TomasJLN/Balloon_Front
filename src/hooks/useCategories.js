import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-http://localhost:4000/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setCategories, 'filters/featured', {});
  }, []);

  return categories;
};