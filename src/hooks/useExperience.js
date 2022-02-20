import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useExperience = (id) => {
  const [experience, setExperience] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-${process.env.REACT_APP_BACKEND_URL}/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(setExperience, setError, setLoading, `experience/${id}`, {});
  }, [id]);

  return experience;
};
