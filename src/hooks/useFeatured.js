import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useFeatured = (experience = '') => {
  console.log('el path es ', experience);

  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher(setFeatures, setError, `allFilter${experience}`, {});
  }, [experience]);

  console.log(features);

  return features;
};
