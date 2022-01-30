import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useFiltered = (experience = '') => {
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher(setFiltered, setError, `allFilter${experience}`, {});
  }, [experience]);

  console.log(filtered);

  return filtered;
};
