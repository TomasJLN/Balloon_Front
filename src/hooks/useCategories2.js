import { useEffect, useState } from 'react';
import fetcher from '../helpers/oldFetcher';

export const useCategories2 = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-http://localhost:4000/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setCategories, 'category', {});
  }, []);

  return categories;
};
