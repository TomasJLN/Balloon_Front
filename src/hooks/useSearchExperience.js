import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useSearchExperience = (experience) => {
  const [experiencesFound, setExperiencesFound] = useState([]);
  const [error, setError] = useState(null);

  console.log('lo que coge como query ', experience);

  useEffect(() => {
    //fetcher(elSetDeUseState, ruta-de-la-petición-sin-${process.env.REACT_APP_BACKEND_URL}/, {objeto con las opcionesdelfetchpara los post y demás})
    fetcher(
      setExperiencesFound,
      setError,
      `allFilter?experience=${experience}`,
      {}
    );
  }, [experience]);

  console.log(experiencesFound);

  if (experiencesFound.length < 1)
    return ['No se encontraron experiencias a mostrar'];

  return experiencesFound;
};
